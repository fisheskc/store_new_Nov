import { fetchAdminProductDetails, updateProductAction, updateProductImageAction } from '@/utils/actions';
import FormContainer from '@/components/form/FormContainer';
import FormInput from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { SubmitButton } from '@/components/form/Buttons';
import CheckboxInput from '@/components/form/CheckboxInput';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import ImageInputClientWrapper from "./ImageInputClientWrapper";




// We are looking for that ID. params is going to be the object
export default async function EditProductPage({params }: {params: Promise<{ id: string }> }) {

  const {id} = await params
  
  // console.log("Edit page loaded", id);
  // const { q } = searchParams;
  const product = await fetchAdminProductDetails(id)
  const {name, company, description, featured, price} = product

  console.log("Edit page loaded");
    return (
      // We will use that default value prop
      // We want to communicate with the database. We are just displaying the toast.
      // We are going to use that ID in order to access the correct product when we are updating something
      // We want to remove the old image from the bucket
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update producct{id}</h1>
      <div className='border p-8 rounded'>
      {/* IMAGE INPUT CONTAINER */}
      <ImageInputClientWrapper
        action={updateProductImageAction} name={name} image={product.image} text='update image'>
        <input type="hidden" name="id" value={id} />
        <input type='hidden' name='url' value={product.image} />
      </ImageInputClientWrapper>
      <FormContainer action={updateProductAction}>
        <div className='grid gap-4 md:grid-cols-2 my-4'>
          <input type="hidden" name="id" value={id} />
          <FormInput type='text' name='name' label='product name' defaultValue={name} />
          <FormInput type='text' name='company' defaultValue={company} />
          <PriceInput defaultValue={price} />
        </div>
        <TextAreaInput name='description' labelText='product description' defaultValue={description} />
        <div className='mt-6'>
          <CheckboxInput name='featured' label='featured' defaultChecked={featured} />
        </div>
        <SubmitButton text='update product' className='mt-8' />
      </FormContainer>
      </div>
    </section>
  )
}

