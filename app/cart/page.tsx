
import CartItemsList from '@/components/cart/CartItemsList';
import CartTotals from '@/components/cart/CartTotals';
import SectionTitle from '@/components/global/SectionTitle';
import { fetchOrCreateCart, updateCart } from '@/utils/actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// This is only going to be accessible if the user has logged in
async function CartPage() {
  const { userId } = await auth()
  // If there is no user, we want to redirect back
  if(!userId) {
    redirect('/')
  }
  // We will fetch the cart
  // This is the case where we are not going to pass the on error,
  // because user can directly navigate to a cart page even without having the instance
  // If there is no instance, we are going to create one
  // Two ways we can create the instance, either by adding item to the cart or the user navigates to the cart

  const previousCart = await fetchOrCreateCart({userId})
  // This will be our latest cart
  const cart = await updateCart(previousCart)
  if(cart.numItemsInCart === 0) {
    return <SectionTitle text='Empty Cart' />
  }
  // We will iterate over & display the items
    return (
    <>
      <SectionTitle text='Shopping Cart' />
      <div className='mt-8 grid gap-4 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList cartItems={cart.cartItems} />
        </div>
        <div className='lg:col-span-4'>
          <CartTotals cart={cart} />
        </div>
      </div>
    </>
  )
}

export default CartPage