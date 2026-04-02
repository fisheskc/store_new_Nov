import Stripe from 'stripe';
// We setup a new instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest } from 'next/server';
import { prisma } from '@/utils/db';

export const POST = async(req:NextRequest) => {
    // We want to access the req.headers
    // We have this code because we want to work locally, as well as the production.
    const requestHeaders = new Headers(req.headers)
    const origin = requestHeaders.get('origin')
    const {orderId, cartId} = await req.json() as {orderId: string; cartId: string}
    const order = await prisma.order.findUnique({
        where: {
           id: orderId
        }
    })
    const cart = await prisma.cart.findUnique({
        where: {
          id:cartId
        },
        include: {
           cartItems: {
            include: {
                product: true,
            }
           }
        }
    })

// We want to return 404, if one of the values are missing
// In order to complete the payment, we need both the order & the cart.
if(!order || !cart) {
    return Response.json(null, {
        status: 404,
        statusText: 'Not found'
        })
    }
    // line items
    const line_items = cart.cartItems.map((cartItem) => {
        return {
           quantity: cartItem.amount,
            price_data: {
            currency: 'usd',
            product_data: {
            name: cartItem.product.name,
            images: [cartItem.product.image],
            },
            unit_amount: cartItem.product.price * 100, // price in cents
            } 
        }
    })
    try {
        // if the payment was not successful 
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            metadata: { orderId, cartId },
            line_items: line_items,
            success_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cancel`,

        })
        return Response.json({
      clientSecret: session.client_secret,
    });

    } catch (error) {
      console.log(error)
      return Response.json(null, {
        status: 500,
        statusText: 'Internal Server Error'
      })  
    }
}