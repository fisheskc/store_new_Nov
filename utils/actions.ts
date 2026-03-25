'use server';

import "dotenv/config";
import { prisma } from "@/utils/db";
import { auth, currentUser} from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from './schemas';
import {deleteImage, uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';
import { Cart } from "@prisma/client";

const getAuthUser = async () => {
  const user = await currentUser();
    if (!user) redirect('/');
    //  if (user.id !== process.env.ADMIN_USER_ID) return null;
    return user as NonNullable<typeof user>;

};

export const requireAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return user as NonNullable<typeof user>;

};


// const getOptionalUser = async () => {
//   return await currentUser()
// }

export const getAdminUser = async () => {
  const user = await getAuthUser();
    // If there is no user, we are going to redirect back to the home page
    if (!user) return null;
    if (user.id !== process.env.ADMIN_USER_ID) redirect('/');
      // If everything is correct, we are going to return the user
  return user
}

export const requireAdmin = async () => {
  const user = await getAuthUser();
   // We are going to check for admin user
  // If the ID does not match, then essentially, we are going to redirect to the homepage
  // We only want the admin user to have access to the data
  // If a user gets access to the page, they will not be able to see any data
  // You can force your way to the admin product, but you are not going to see any data
  // because your ID does not match the admin one. You will just be directed to the homepage
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/')
  // If everything is correct we return a user
  // In some cases we are going to use the user value
  return user;
}

const renderError = (error:unknown): {message:string} => {
// We access the error class, if that is the case, we use error.message
  console.log(error)
      return {message:error instanceof Error ? error.message : 'an error occurred'}
}   

export const fetchFeaturedProducts = async () => {
// We get the products where the featured flag is set to true
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
}

// We set up a function to fetch all of the prodcut
// We will set this as the default value, empty string
// If this is going to be undefined, we will have no products
// If there is no value, we want to provide all of the product
// We want to set up the type & we will use search
export const fetchAllProducts = async({ search = '' }: { search: string }) => {
    // We want to return the DB
    return prisma.product.findMany({
        where:{
        // Make sure the mode is set to equal to insensitive
          OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
        // In this case, we want to set up the order
         // The newest product is going to be displayed first
         orderBy: {
            createdAt: 'desc'
         }
    })
   
}
// We will provide the productId & we will get it from the searchParams
export const fetchSingleProduct = async(productId:string) => {
    const product = await prisma.product.findUnique({
    // We have two options, we have the entire product or it is going to be null
        where: {
            id:productId
        }
    })
    if(!product) {
      redirect('/products')
    }
        return product
}
// This is equal to async since we will make a callback to the database
// We will pass this as a action prop into the form container
// If the type are not going to match, typescript will complain
// We setup the object & this is what we are going to be returning regardless of the error
// We will return an object with a message property
// This is going to be a promise that is going to resolve to an object with a message property - <{message:string}
export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // This is coming from the clerk server
  // Notice how the user can be either a user type or it can be a null
  // There is no way for TypeScript to know that this is a protected route
  // If we add the clerkId below in db.product.create & set it equal to our user, it is not going to work
  // eg: clerkId:user.id - user potentially can be null. Our model is actually a string
  // How can we handle that?
  // There is going to be a helper function
  // There should definitely be a user & we can access the user.id
    //  const user = await currentUser()
    // typescript sees that if there is no user, we stop the execution
  //  if(!user redirect('/'))
    // We want to get the values out of the form data
    // We will use the get method & we will provide the name of the input
    // We are going to communicate with the database
const user = await getAuthUser();
  if (!user) throw new Error("Unauthorized");

    try {
    // Unlike the previous inputs, we do not want to access it from rawData
      const rawData = Object.fromEntries(formData)
    // // We do want to access actually image manually.
      const file = formData.get('image') as File
       // // In order to do that, we need to use as a file
      console.log(rawData)
      // This will throw the error immediately if the values do not match
      // If we are successful, we will have a toast message created
      // If not we will have a big error message. 
      // First, we will need to use the safeParse, since we want to iterate over the array
      // Remember, in this case the data is actually located in .data property
      // const validatedFields = productSchema.safeParse(rawData)
      // With our custom method, we validate with the Zode schema, & provide the product schema 
      // & the raw data
      const validatedFields = validateWithZodSchema(productSchema, rawData)
       // We will pass everything correctly in as an object
      // We will use image, because that is the property
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      console.log(validatedFile)
      // Unlike the previous inputs, we do not want to access it from the rawData
      // We will pass everything in as an object
      // We are getting back an object & it is located in the image property
      const fullPath = await uploadImage(validatedFile.image);
         await prisma.product.create({
         data: {
            ...validatedFields,
            image: fullPath,
            clerkId: user.id
          }
        })
       // return {message: 'product created'}
      // return {message: 'product created'}
    } catch(error) {
       return renderError(error);
    }
     // If we are successful, We will redirect the admin user to the product page
    // where we display right away all of the products
    // If not, then we are going to display the error message in the toast
   redirect('/admin/products')
  }

export const fetchAdminProducts = async () => {
 // We fetch the product by its unique ID.
 // We want to look for all of the products
  await getAdminUser();
   const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return products;
}

// We know that we are going to be passing in the product ID
export const deleteProductAction = async(prevState:{productId:string}) => {
  // We destructure this
  const {productId} = prevState
   await getAdminUser();
  try {
   const product =  await prisma.product.delete({
      where: {
        id: productId
      }
    })
    await deleteImage(product.image);
    revalidatePath('/admin/products');
    return {message: 'product removed'}
  } catch(error) {
    return renderError(error)
    }
  }

  export const fetchAdminProductDetails = async(productId:string) =>{
    await getAdminUser();
    // We fetch the product by its unique ID.
    const product = await prisma.product.findUnique({
       where: {
      // We cannot find the product, we will navigate to /admin/products
        id:productId
    },
  });
   // If its in correct, then we will redirect back to /admin/products
      if (!product) redirect('/admin/products');
    return product;
  }
   
    export const updateProductAction = async(prevState:any, formData:FormData) => {
         // We return an object with a message
         await getAdminUser();
      try {
        const productId = formData.get('id') as string
        const rawData = Object.fromEntries(formData)
        const validatedFields = validateWithZodSchema(productSchema, rawData)
        await prisma.product.update({
          where: {
            id:productId
          },
          data: {
            ...validatedFields  
          }
        })
        revalidatePath(`/admin/products/${productId}/edit`)
        return {message:'Product updated successfully'}
      } catch(error) {
        return renderError(error)
      }
    }

    export const updateProductImageAction = async(prevState:any, formData:FormData) => {
      // We return an object with a message
     await getAuthUser();
     // We are going to start by accessing the image as a file, a product ID, an old image URL
      try {
        const image = formData.get('image') as File
        const productId = formData.get('id') as string
        const oldImageUrl = formData.get('url') as string
        const validatedFile = validateWithZodSchema(imageSchema, {image})
         // We want to use the full path from the supabase & we need to run our upload image
        // If we are successful, we want to delete the old image
        // We will use another helper function from supabase, deleteImage
        const fullPath = await uploadImage(validatedFile.image)
        await deleteImage(oldImageUrl);
        await prisma.product.update({
          where: {
            id: productId
          },
          data: {
            image: fullPath
          }
        })
       revalidatePath(`/admin/products/${productId}/edit`) 
      return {message:'Product Image updated successfully'}
      } catch(error) {
        return renderError(error)
      }
    }

    export async function fetchFavoriteId({ productId }: { productId: string }) {
           const user = await getAuthUser();
          if (!user) return null; // logged-out users simply have no favorites
          // ⭐ Prevent Prisma from ever receiving null
          // if (!userId) {
          //   return null;
          // }

       const favorite = await prisma.favorite.findFirst({  
          where: {
          productId,
          clerkId: user.id,
     },
          select:{
             id: true,
    },
  });
  return favorite?.id ?? null;
};   

 export const toggleFavoriteAction = async(prevState: {
     productId: string;
    favoriteId: string | null;
    pathname: string;
  })  => {
      const user = await requireAuthUser();
      if (!user) throw new Error("Unauthorized");
      const { productId, favoriteId, pathname } = prevState;
      //  const { userId } = await auth();
    
    try {
        if (favoriteId) {
          await prisma.favorite.delete({
            where: { id: favoriteId }
        });
        } else {
          await prisma.favorite.create({
            data: {
              productId,
              clerkId: user.id
        } 
        });
      }
        revalidatePath(pathname);
        return { message: favoriteId ? 'removed from faves' : 'added to faves' };
      } catch (error) {
        return renderError(error);
    }
};

 export const fetchUserFavorites = async () => {
   const user = await getAuthUser();
   if (!user) throw new Error("Unauthorized");
   const favorites = await prisma.favorite.findMany({
     where: {
       clerkId: user.id,
     },
    include: {
      product: true,
    },
  });
  return favorites;
}

export const createReviewAction = async(prevState:any,formData:FormData) => {
  // We are going to use the user ID as our clerk ID.
  // Only the user who has logged in can perform submit review funtionality
  const user = await getAuthUser()
  try {
    // We want to pass in our data.
    // We want to validate with Zod schema
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateWithZodSchema(reviewSchema,rawData)
    // We create the review
    await prisma.review.create({
      data: {
        ...validatedFields,
        clerkId:user.id,
      }
    })
    // We also want to revalidate the path
    // We will fetch all of the reviews for the product & we want to add the latest one
    // it is going to be dynamic. We are going to use a template string, then product &
    // then we want to access the validateed field
    revalidatePath(`/products/${validatedFields.productId}`)
    return {message:'review submitted successfully'}
  }
    catch(error) {
      return renderError(error)
    }
  }
 // For all our actions, what do we want to do?
 


// This is something we are going to call in that product details page.
// We want to display all of the reviews for the product
export const fetchProductReviews = async(productId:string) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt:'desc'
    }
  })
  return reviews
}

export const fetchProductRating = async(productId:string) => {
  // We wiil use the groupBy method provide by Prisma
  const result = await prisma.review.groupBy({
    by:['productId'],
    _avg: {
      rating: true,
      // We want gto know how many reviews we have.
    },
    _count: {
      rating: true,
    },
    where: {
      productId
    }
  })
  // it might be a case where we do not have any reviews
  // Why do we need to set some default values, some fallback values?
    return {
      // We are going to look here for a result, we have rating.
      // We are accessing the first thing.
      // This is going to return an array of objects & it might be undefined
      // We are going to use optional chaining
      // If there is no value, then we fall back to zero
      rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
      count: result[0]?._count.rating?? 0,
      // We will set up the default if there is no rating
    }
  }

export const fetchProductReviewsByUser = async() => {
  const user = await getAuthUser()
  const reviews = await prisma.review.findMany({
    where: {
      clerkId:user.id
      // We do want to access the product image & product name
    },
    select: {
      id:true,
      rating:true,
      comment: true,
      product:  {
       select: {
          image: true,
          name: true
       }
      }
    }
  })
    return reviews
}
// We will use the define option, prevState
// The value is going to be the prevState
export const deleteReviewAction = async(prevState:{reviewId:string}) => {
  const {reviewId} = prevState
  const user = await getAuthUser()
  try {
    await prisma.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id
      }
    })
    revalidatePath('/reviews')
    return {message: 'review deleted successfully'}
  } catch(error) {
    return renderError(error)
  }
}
// It is looking for two things, the user Id, string & also the product ID
export const findExistingReview = async(userId:string, productId:string) => {
  return prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    }
  })
  // The result we are looking for in this case, is null.
  // If this returns some value, it means that the user already left the review.
  // So in that case, we will hide the button.
  // Then we want to navigate to our single product page & we want to restrict access 
  // to our submit review. We are going to get the user ID.
}

export const fetchCartItems = async () => {
  // The auth one is coming from the clerk. 
  // We want to get the user ID, but potentially this can be undefined since
  // This will be null
  // It is a public route.
  const {userId} = await auth()
  const cart = await prisma.cart.findFirst({
    where: {
      // Potentially this can be null
      // If this is an empty string, there is not going to be an instance which matches
      clerkId:userId ?? ''
    }, 
    select: {
      numItemsInCart: true,
    }
  })
  return cart?.numItemsInCart || 0 
};

const fetchProduct = async (productId:string) => {
   const product = await prisma.product.findUnique({
    where: {
      id: productId,
    }
  })
  // If there is no product, it means that there is something wrong.
  // If this happens, we go to a catch one & we do not continue
  if(!product) {
    throw new Error('Product not found')
  }
  return product
};


const includeProductClause = {
  // In the cartItems, we are pointing to a product as well
    cartItems: {
      include: {
        // We want to include the entire product info
        product: true
      }
    }
  }



// In the actions, we are ony going to access the properties that are directly
// on the cart model, but we want iterate over cartItems.
// At the momment, we have no access to this particular model. We need to use include
// If there are any updates to the product, we always want in our cart to have the latest data
export const fetchOrCreateCart = async ({userId,errorOnFailure=false}:{
  userId:string, errorOnFailure?: boolean
}) => {
 let cart = await prisma.cart.findFirst({
  where: {
    clerkId:userId
  },
  include: includeProductClause
 })
 // If there is no cart
 if(!cart && errorOnFailure) {
  throw new Error('Cart not found')
 }
 // If the user has not created the cart when they are trying to add a product to a cart.
 // If there is no cart, we need to set one as let, since we are going to override this,
  if(!cart) {
    cart = await prisma.cart.create({
      // We have the cart in place
      // We do need to provide the data
      // Cart is actually only looking for one thing which is a clark Id
      data: {
        clerkId:userId
      },
      include: includeProductClause
    })
  }
  return cart
};

const updateOrCreateCartItem = async ({productId,cartId,amount}:{
  productId:string, cartId:string, amount:number
}) => {
  // We first want to fetch the cartItem
  let cartItem = await prisma.cartItem.findFirst({
    where:{
      // We want to make sure the cartItem matches both
      // If we are just going to use productId, as maybe it is in another cart
      // If we are just going to use the cartId, then we are going to get the item,
      // which might be a different product.
      // Therefore, we need to combine both of them.
      productId,
      cartId,
    }
  })
  if(cartItem) {
    // Then we want to update, & pass in that amount
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id
      },
      data: {
        // This is the current amount plus the new amount
        // Ten items of the same product in the cart, 
        amount:cartItem.amount + amount
        // If this false, if there is no cart item, we want create to one
      }
    })
  } else {
    // We want to use cartItem, 
    cartItem = await prisma.cartItem.create({
      data:{
        amount, productId, cartId
      }
    })
  }
};

// We want this cart to match our cart model   
export const updateCart = async (cart:Cart) => {
  // We want to fetch all of the cart items that are in the user's cart
  const cartItems = await prisma.cartItem.findMany({
    where: {
      // We want to use the product, because in there
      cartId:cart.id
    },
    include: {
      product:true
    }
  })
  // In Prisma you can only do those aggregations essentially on one model
  // You are not going to be able to do some aggregations if you have two models connected together
  // Therefore we are using the cart items & we will do those calculations manually
  let numItemsInCart = 0
  let cartTotal =- 0
  // We add the amount property to ItemsInCart & add all the amount values in the numItemsInCart
  // In the cartTotal, we are going to multiply the item amount & we will access 
  // the product price
  for(const item of cartItems) {
    // We want to get the price from the database
    numItemsInCart += item.amount
    // We then access the product
    cartTotal += item.amount * item.product.price
  }
  const tax = cart.taxRate * cartTotal
  // Potentially cartTotal can be null
  // If cartTotal is null, it is going to be false
  // In that case, we want set it equal to 0
  // If not, it is actually to be equal to a cartShipping
  // If there is no items in the cart
  // We want to use cart.shipping if there is some number or zero.
  const shipping = cartTotal? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping
  // We update the cart, that is the latest cart
  const currentCart = await prisma.cart.update({
    where: {
      id:cart.id
    },
    data: {
      // We want to access the currentCart
      numItemsInCart, cartTotal, tax, orderTotal
    },
    include: includeProductClause
  })
  return currentCart
};

// At this point, we do not know whether the cart instance is presnt or not.
// If there is no instance
export const addToCartAction = async (prevState:any, formData: FormData) => {
  const user =await getAuthUser()
  try {
    // We use the price directly from the database
    // We want to check whether the product actually exists
    // If it does not exists, we will essentially throw an error
    // If the product exists, we will uzse it
    // If not, then we will throw the error
    const productId = formData.get('productId') as string
    const amount = Number(formData.get('amount'))
    await fetchProduct(productId)
    const cart = await fetchOrCreateCart({userId:user.id})
    // We want to use the same cart item, we want to update the amount
    // If a cart item is not present, then we create one
    // In this case, we are not looking for any data back
    // Each user is going to have one cart
    await updateOrCreateCartItem({productId, cartId:cart.id, amount})
    // We just want to calculate the totals
    await updateCart(cart)
  } catch(error) {
    return renderError(error)
  }
  redirect('/cart')
};

export const removeCartItemAction = async () => {};

export const updateCartItemAction = async () => {};

