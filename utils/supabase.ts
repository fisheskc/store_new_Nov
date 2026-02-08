import { createClient } from '@supabase/supabase-js'

const bucket = 'main-bucket'

// We create the instance
// We use the Supabase URL & the Supabase key. They can be undefined & therefore we will need
// to add the type assertion that will always pass in the string.

// Create a single supabase client for interacting with your database
function getSupabase() {
  return createClient(
  // process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  // process.env.NEXT_PUBLIC_SUPABASE_KEY as string
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);
console.log('Supabase URL present:', !!process.env.SUPABASE_URL);
}

// We are getting back that file in the validate file object
export const uploadImage = async(image:File) => {
  const supabase = getSupabase();
   // We want to use the timestamp, because we are going to use it in order to setup the name,
   const timestamp = Date.now()
   // Remember, in the fiie, we have a few properties & we use image.name
   // If it passes the validation, it is definitely going to be there
   // We upload to a correct bucket
   const newName = `${timestamp}-${image.name}`
   // This does not return that public URL
   // Once we upload, we also want to get the public URL, since we want to store the strng in the Prisma instance
   const {data} = await supabase.storage.from(bucket).upload(newName, image, {cacheControl:'3600'})
   // We first need to check whether there is no data
   // If that is the case, we will throw the new Error
   // If we pass the condition, it means that we successfully uploaded the image
   if(!data) {
        throw new Error('Image upload failed')
   }
   return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl
}

export const deleteImage = async(url: string) => {
  const supabase = getSupabase();
  const imageName = url.split('/').pop();
  if (!imageName) throw new Error('Invalid URL');
  return supabase.storage.from(bucket).remove([imageName]);
};