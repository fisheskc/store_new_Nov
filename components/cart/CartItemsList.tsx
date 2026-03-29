'use client'

import { Card } from '@/components/ui/card';
import { FirstColumn, SecondColumn, FourthColumn } from './CartItemColumns';
import ThirdColumn from './ThirdColumn';
import { CartItemWithProduct } from '@/utils/types';


// This is an instance, it is the model
// We do have the type here for cartItem. The problem with this type, it only represents that cartItem. We construct a new type in types.ts called cartItemWithProduct.
// We are looking for cartItem with the product type
function CartItemsList({cartItems}:{cartItems:CartItemWithProduct[]}) {
  return (
  <div>
  {cartItems.map((cartItem) => {
  const {id, amount} = cartItem
  // We access all of the properties from the product
  // We need the id because we need to pass it to our link component.
  // We will use an alias & set it equal to the productId
  const {image, name, company, price, id:productId } = cartItem.product
 
  return (
    <Card
       key={id} className='flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4'>
            <FirstColumn image={image} name={name} />
            <SecondColumn name={name} company={company} productId={productId} />
            <ThirdColumn id={id} quantity={amount} />
            <FourthColumn price={price} />
          </Card>
        )
      })}
    </div> 
  )
}

export default CartItemsList
