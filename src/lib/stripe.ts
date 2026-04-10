import Stripe from 'stripe';

/**
 * Sicamon Stripe Dahlia Lifecycle (2026-03-25.dahlia)
 * Standardized Singleton Pattern for Edge/Cloudflare compatibility.
 * Removes Proxy patterns to ensure 100% IDE type-safety and Dahlia protocol hygiene.
 */

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required for the Sicamon Dahlia integration.');
}

// Global cache to prevent multiple instances in development (HMR)
const globalForStripe = global as unknown as { stripe: Stripe };

export const stripe = globalForStripe.stripe || new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-03-25.dahlia' as any,
  appInfo: {
    name: 'sicamon-shop',
    version: '1.0.0',
  },
  typescript: true,
});

if (process.env.NODE_ENV !== 'production') {
  globalForStripe.stripe = stripe;
}
