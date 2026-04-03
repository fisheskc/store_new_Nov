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
    const [error, setError] = useState<string | null>(null);

    // Validate query params BEFORE making the request
    const fetchClientSecret = useCallback(async () => {
        // We want to make a request baxk to our own server.
        // This is cominmg back from our createOrderAction & it is located in the searchParams
     if (!orderId || !cartId) {
        setError('Missing order or cart information.');
        return null;
      }
      try {
        const response = await axios.post('/api/payment', {
            orderId,
            cartId
        });
        // If correct, we will be able to complete the payment
        return response.data.clientSecret;
      } catch (error) {
        console.error('Payment session error:', error);
        setError('Unable to start checkout. Please try again.');
        return null;
      } 
    },[orderId, cartId])

     useEffect(() => {
    fetchClientSecret().then((secret) => {
      if (secret) setClientSecret(secret);
    });
  }, [fetchClientSecret]);


  if (!clientSecret) {
    return <div>Loading checkout…</div>;
  }

  // console.log("orderId:", orderId, "cartId:", cartId);

    // UI: Missing params
  if (!orderId || !cartId) {
    return (
      <div className="p-6 text-red-600">
        Missing order or cart information.  
        Please return to your cart and try again.
      </div>
    );
  }

   // UI: Error state
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  // UI: Loading state
  if (!clientSecret) {
    return <div className="p-6">Loading checkout…</div>;
  }

  // UI: Embedded Checkout
  return (
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default CheckoutPage
