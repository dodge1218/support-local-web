import { loadStripe } from '@stripe/stripe-js';

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripeKey) {
  console.warn('Missing Stripe Publishable Key');
}

export const stripePromise = loadStripe(stripeKey || '');

export const checkout = async (priceId: string) => {
  const stripe = await stripePromise;
  if (!stripe) return;

  const { error } = await (stripe as any).redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    successUrl: window.location.origin + '/success',
    cancelUrl: window.location.origin + '/cancel',
  });

  if (error) {
    console.error('Stripe Checkout Error:', error);
    throw error;
  }
};
