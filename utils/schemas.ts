import { z, ZodType } from 'zod';

export const productSchema = z.object({
   name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  // For the refine method, we pass in two arguements. First one is going to be the function,
  // & the second one is going to be the error message
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      // If we return falsey means that we will trigger the error
      // In that case, the message will be displayed
       return wordCount >= 10 && wordCount <= 1000;
    },
    // We have an object with some kind of text
    // The function we pass in, if we return true from the function or truthy,
    // then we pass the validation
     {
      message: 'description must be between 10 and 1000 words.',
    }
  ),
});
export const imageSchema = z.object({
  image: validateImageFile(),
});
    // It is not going to have any parameters
    function validateImageFile() {
        // We will use 1 MB
        // We did the calculations in bytes
        const maxUploadSize = 1024 * 1024;
        // It is going to be an array
        const acceptedFileTypes = ['image/'];
        // We want to check the value that we are getting is the instanceof file
        // We are going to use the refine method where we want to pass in the function
        // & we also want to pass in the error messaage
        // We need to make sure that the file actually matches the type, the acceptedFileTyoe
        // We first pass in the function & the error message
        // We are going to reference as a file & if there is no file or the size is bigger,
        // make sure it is less or equal to our maxUploadsize.
        return z.instanceof(File).refine((file) => {
            // if we return falsey, then we have the error message
            return !file || file.size <= maxUploadSize;
            // In this case, we are looking for those accepted types
        }, 'File size must be less than 1MB')
            // We are going to check whether the file is present
            // From the function we want to return the file.type
            .refine((file) => {
              return (
                !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
              );
    }, 'File must be an image');
}

// This one we need to set up as generic, because we do not know what is going to be the type
// for our schema. We can have multiple schemas. We want to set up two arguments, the first one is going to be schema
// For this one, we need to provide the type of Zod scshema, which is a generic & we pass in our type.
// The second is going to be the data
// We do not know what data we are going to be passing in & we use unknown
// We are returning a type.
// It comes to functionality first & we invoke safe parse
// We invoke this validate without schema, if everything is correct, our data is going 
// to be located in validated fields
export function validateWithZodSchema<T>(
    schema: ZodType<T>,
  data: unknown
): T {
    const result = schema.safeParse(data);
     // If this is equal to false, then we wamt to iterate over the array & get those messgaes
      if(!result.success) {
        // We are going to reference as an error & we will pull out the message property
        const errors = result.error.errors.map((error) => error.message);
        // We will pass the error dowm to our catch
        // Remember we have the render error. It is going to be the instance of the error class. Since we potentially can have a multiple, we can join them on the comma. If everything is correct, we should have very useful error messages in the browser
        // We have an issue, we throw a new error
        throw new Error(errors.join(','));
      }
      // If you want to return the result, you will have to spread out the properties in the action.
      // In our case, we do not want to do that & we use result.data
      // Once we invoke this validate without the schema, if everything is correct, our data is going 
      // & data is going to be located in validated fields.
      return result.data;
    }

    
