'use client';
import { useState } from 'react';
// This the second place where we are rendering the compoent A mode, since we want to specify that it is a cart one
import SelectProductAmount from '../single-product/SelectProductAmount';
import { Mode } from '../single-product/SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { removeCartItemAction, updateCartItemAction } from '@/utils/actions';
import { useToast } from '../ui/use-toast';

function ThirdColumn({quantity, id}:{quantity:number; id:string}) {
  const [amount, setAmount] = useState(quantity)
  // We are getting the string by default from the select one, but we do not want that
  // We want to disable the select input.
  const [isLoading, setIsLoading] = useState(false)
  const {toast} = useToast()
  const handleAmountChange = async(value:number) => {
    // Everytime we change the value in a select
    // The select one is going to be disabled
    setIsLoading(true)
    toast({description: 'calculating...'})
    // First we communicate with the database, then we update the state
    const result = await updateCartItemAction({amount:value, cartItemId:id })
    setAmount(value)
    // Then we change the local value. Whatever message we are getting back from our function
    toast({description: result.message})
    setIsLoading(false)
  }
  return (
    <div className='md:ml-8'>
      <SelectProductAmount amount={amount} setAmount={(handleAmountChange)} mode={Mode.CartItem} isLoading={false} />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name='id' value={id} />
        <SubmitButton size='sm' className='mt-4' text='remove' />
      </FormContainer>
    </div>
  )
}

export default ThirdColumn
