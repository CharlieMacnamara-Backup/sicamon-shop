import { NextRequest, NextResponse, after } from 'next/server';
import { stripe } from '@/lib/stripe';
import { revalidateTag, revalidatePath } from 'next/cache';
import Stripe from 'stripe';
import { ATELIER_LOCK_RELEASE } from '@/actions/dahlia-protocol';

// Dynamic configuration is now managed via nextConfig.cacheComponents

/**
 * Atelier Secure Webhook Handler
 * Refactored for Next.js 16.2 'after()' API and Edge-first standard.
 */
export async function POST(req: NextRequest) {
  const arrayBuffer = await req.arrayBuffer();
  const body = Buffer.from(arrayBuffer);
  const signature = req.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // 1. Verify signature using Web Standard Async primitive (Cloudflare-compliant)
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // 2. Resilience: Handle Success, Failure, and Modular Growth
  if (
    event.type === 'checkout.session.completed' || 
    event.type === 'checkout.session.expired' || 
    event.type === 'checkout.session.async_payment_failed' ||
    event.type.startsWith('product.') ||
    event.type.startsWith('price.')
  ) {
    after(async () => {
      try {
        console.warn(`🚀 [Background] Processing ${event.type} for modular growth/resilience`);

        // Handle Checkout Session Specifics (Inventory locks)
        if (event.type.startsWith('checkout.session.')) {
          // Retrieve the session line items and payment details for the Receipt Proxy
          const expandedSession = (await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['line_items.data.price.product', 'payment_intent.latest_charge'],
          })) as any;

          // [Atelier] Receipt Proxy: Log the hosted receipt URL for test verification
          const receiptUrl = expandedSession.payment_intent?.latest_charge?.receipt_url;
          if (receiptUrl) {
            console.warn(`\n[Atelier] 📧 MUSEUM RECEIPT PROXY (Test Mode):`);
            console.warn(`👉 ${receiptUrl}\n`);
          }

          const lineItems = expandedSession.line_items?.data || [];

          for (const item of lineItems) {
            const product = item.price?.product as Stripe.Product;
            if (!product) continue;

            if (event.type === 'checkout.session.completed') {
              // "One of a Kind" Archiving Logic
              if (product.metadata.one_of_a_kind === 'true' || product.metadata.stock === '0') {
                console.warn(`📦 [Atelier] Archiving acquired piece: ${product.name}`);
                await stripe.products.update(product.id, { 
                  active: false,
                  metadata: {
                    ...product.metadata,
                    available: 'false',
                    status: 'sold',
                  }
                });
              }
            } else {
              // "Failure Recovery" - Fully Restore piece availability
              console.warn(`🔓 [Atelier] Transaction Failure Recovery: ${product.name}`);
              
              // [Atelier] Museum Failure Notification (Test Proxy)
              console.warn(`\n[Atelier] 📧 FAILURE NOTIFICATION:`);
              console.warn(`To Collector: ${session.customer_details?.email || 'Archive User'}`);
              console.warn(`To Studio: amonsic@hotmail.com`);
              console.warn(`Subject: Studio Session Cancelled - ${product.name}`);
              console.warn(`Body: The collection attempt for your chosen piece was not completed. It has been returned to the gallery.\n`);

              await stripe.products.update(product.id, {
                active: true,
                metadata: {
                  ...product.metadata,
                  available: 'true',
                  status: 'available',
                  ...ATELIER_LOCK_RELEASE,
                }
              });
            }
          }
        }

        // Universal Modular Growth: Purge 'Ghost Cache'
        try {
          console.warn('🔄 [Background] Purging product cache tag for real-time growth...');
          revalidateTag('products', { expire: 0 }); // Purging the boutique cache tag for immediate effect
          revalidatePath('/', 'layout'); // Ensure every page reflects the new reality
        } catch (cacheErr) {
          console.error('⚠️ [Background] Ghost Cache Alert: revalidateTag failed', cacheErr);
        }

      } catch (error) {
        console.error('❌ [Background] Critical Error in webhook logic:', error);
      }
    });
  }

  // 3. Return 200 OK immediately to Stripe
  return NextResponse.json({ received: true });
}
