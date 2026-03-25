'use client';
// We have used state & use client, because it is a client component & we will have the state value
import { useState } from 'react';
import SelectProductAmount from './SelectProductAmount';
import { Mode } from './SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { addToCartAction } from '@/utils/actions';
// Check whether the user has logged in
// The reason why we have the hook is because it is a client compoment
import { useAuth } from '@clerk/nextjs';
// If there is no user, we are rendering the product sign in the button
// So instead of adding an item to the cart, the user will have to log in.
import { ProductSignInButton } from '../form/Buttons';

// We will be looking for a specific prop
// productId is going to be equal to a string
// function AddToCart({productId}:{productId:string}) {
function AddToCart({productId}:{productId:string}) {
  // We will start by setting up the local value
  const [amount, setAmount] = useState(1)
  // We will provide a default value of one
  // We will check the user ID
  // We have both of the values, the amount & set amount are coming from the parent
  // When we invoke the set amount in a select amount product, we are invoking this set amount on value change
  // Every time we will change something in the select input, we will actually change the local state value over
  // If there is some kind of value, it means that the user has logged in
  // If there is no user, we want to use our product
  // The will be the equal to a product ID, which is coming ina as a prop.
  // We are controlling this local stage value, once we are ready to add this to the cart,
  // We will use the amount
  const {userId} = useAuth()
  return (
    <div className='mt-4'>
      <SelectProductAmount mode={Mode.SingleProduct} amount={amount} setAmount={setAmount} />
      {userId?
      (
        <FormContainer action={addToCartAction}>
        <input type="hidden" name='productId' value={productId} />
        <input type="hidden" name='amount' value={amount} />
        <SubmitButton text='add to cart' className='mt-8' />
      </FormContainer>
      ) : (<ProductSignInButton /> 
      )}
    </div>
  )
}

export default AddToCart
