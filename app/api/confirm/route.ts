import Stripe from 'stripe';
// We have a new instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from 'next/navigation';

import { type NextRequest } from 'next/server';
import { prisma } from '@/utils/db';

// We are looking for the sesion_id
export const GET = async(req: NextRequest) => {
    const {searchParams} = new URL(req.url)
    const session_id = searchParams.get('session_id') as string

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id)
        // from the session_id, we can access orderId and cartId and both of them are located in that metadata
        const orderId = session.metadata?.orderId
        const cartId = session.metadata?.cartId

        // We want to update the order & remove the card only if the payment status is complete.
        if(session.status === 'complete') {
            await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    isPaid:true
                }
            })
        }
    await prisma.cart.delete({
        where: {
          id:cartId  
        }
    })
    } catch (error) {
      console.log(error)
      return Response.json(null, {
        status: 500,
        statusText: 'Internal Server Error'
      })  
    }
   //  If we are successful, we want to redirect to the orders
   redirect('/orders')

}