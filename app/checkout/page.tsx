'use client';
// Axios makes the http calls
import axios from 'axios';
// We use useSearchParams since we want access both the odrer ID as well as the cart ID,
// We provided this in the query prompts
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const cartId = searchParams.get('cartId');

     const [clientSecret, setClientSecret] = useState<string | null>(null);

    const fetchClientSecret = useCallback(async () => {
        // We want to make a request baxk to our own server.
        // This is cominmg back from our createOrderAction & it is located in the searchParams
        const response = await axios.post('/api/payment', {
            orderId,
            cartId
        });
        // If correct, we will be able to complete the payment
        return response.data.clientSecret;
    },[orderId, cartId])

     useEffect(() => {
    fetchClientSecret().then(setClientSecret);
  }, [fetchClientSecret]);

  if (!clientSecret) {
    return <div>Loading checkout…</div>;
  }

  return (
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutPage
