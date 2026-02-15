'use server';

import "dotenv/config";
import { prisma } from "@/utils/db";
import { currentUser, auth } from '@clerk/nextjs/server';
// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  imageSchema,
  productSchema,
  validateWithZodSchema,
} from './schemas';
import {deleteImage, uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';

const getAuthUser = async () => {
  const user = await currentUser();
  //  if (!user) return null;
  //  if (user.id !== process.env.ADMIN_USER_ID) return null;
  return user;

};

export const requireAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
};


// const getOptionalUser = async () => {
//   return await currentUser()
// }
// const requireUser = async () => {

export const getAdminUser = async () => {
  const user = await getAuthUser();
    // If there is no user, we are going to redirect back to the home page
    if (!user) return null;
    if (user.id !== process.env.ADMIN_USER_ID) return null;
      // If everything is correct, we are going to return the user
  return user
}

// const requireAdmin = async () => {
//   const user = await getAdminUser()
//    // We are going to check for admin user
//   // If the ID does not match, then essentially, we are going to redirect to the homepage
//   // We only want the admin user to have access to the data
//   // If a user gets access to the page, they will not be able to see any data
//   // You can force your way to the admin product, but you are not going to see any data
//   // because your ID does not match the admin one. You will just be directed to the homepage
//   if (user.id !== process.env.ADMIN_USER_ID) redirect('/')
//   // If everything is correct we return a user
//   // In some cases we are going to use the user value
//   return user
// }

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
    // const user = await currentUser()
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
      // console.log(rawData)
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
        // const { userId } = await auth();
    
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
