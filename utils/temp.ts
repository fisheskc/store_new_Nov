'use server';
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import prisma from '@/utils/db';
import { currentUser, auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  imageSchema,
  productSchema,
  validateWithZodSchema,
} from './schemas';
import {deleteImage, uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';
// import { Favorite } from "../app/generated/prisma/client";

const getOptionalUser = async () => {
  return await currentUser()
}

const requireUser = async () => {
  const user = await currentUser()
  if (!user) redirect('/login')
  return user
}

const requireAdmin = async () => {
  const user = await requireUser()
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/')
  return user
}

const renderError = (error:unknown): {message:string} => {
  console.log(error)
      return {message:error instanceof Error ? error.message : 'an error occurred'}
}   

export const fetchFeaturedProducts = async () => {
  return prisma.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'desc' }
  })
}


export const fetchAllProducts = async({ search = '' }: { search: string }) => {
    return prisma.product.findMany({
        where:{
          OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
         orderBy: {
            createdAt: 'desc'
         }
    })
   
}
export const fetchSingleProduct = async(productId:string) => {
    const product = await prisma.product.findUnique({
        where: {
            id:productId
        }
    })
    if(!product) {
      redirect('/products')
    }
        return product
}

export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
   const user = await requireUser()
    try {
      const rawData = Object.fromEntries(formData)
      const file = formData.get('image') as File
      const validatedFields = validateWithZodSchema(productSchema, rawData)
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      console.log(validatedFile)
      const fullPath = await uploadImage(validatedFile.image);
         await prisma.product.create({
         data: {
            ...validatedFields,
            image: fullPath,
            clerkId: user.id
          }
        })
    } catch(error) {
    }
   redirect('/admin/products')
  }

export const fetchAdminProducts = async () => {
  await requireAdmin()
  return prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
}

export const deleteProductAction = async(prevState:{productId:string}) => {
  const {productId} = prevState
  await requireAdmin()
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
    if (!productId) {
    throw new Error("productId is missing");
  }
    await requireAdmin()
    const product = await prisma.product.findUnique({
      where:{
        id:productId
      }
    })
      if(!product) {
       redirect('/admin/products')
      }
      return product
    }
  
    export const updateProductAction = async(prevState:any, formData:FormData) => {
        await requireAdmin()
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
      await requireUser()
      try {
        const image = formData.get('image') as File
        const productId = formData.get('id') as string
        const oldImageUrl = formData.get('url') as string
        const validatedFile = validateWithZodSchema(imageSchema, {image})
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
    
    export const toggleFavoriteAction = async (prevState:{
      productId:string,
      favoriteId:string | null,
       pathname:string}) => {
        const user = await requireUser()
        const {productId, favoriteId, pathname} = prevState
        try {
          if(favoriteId) {
            await prisma.favorite.delete({
              where: {
                id: favoriteId
              },
            })
          } else {
            await prisma.favorite.create({
              data: {
                productId,
                clerkId: user.id
              }
            })
          }
          revalidatePath(pathname)
          
          return {message:favoriteId? 'removed from faves' : 'added to faves'}
        }  catch(error) {
          return renderError(error) 
        }
    }

    export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
          const user = await requireUser()
       const favorite = await prisma.favorite.findFirst({
          where: {
          productId,
          clerkId: user.id,
     },
          select:{
             id: true,
    },
  });
  return favorite?.id || null;
};   

export const fetchUserFavorites = async () => {
  const user = await requireUser()
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id
    },
    include: {
      product:true,
    }
})
  return favorites
}
