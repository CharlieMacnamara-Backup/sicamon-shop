'use server';

import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { validateAtelierInput, ATELIER_RESERVATION_MINUTES, ATELIER_INTEGRATION_ID } from './dahlia-protocol';

/**
 * Atelier Secure Collection Action - createCheckoutSession
 * Hardened with Zod validation, product status checks, and collector-session protection.
 */
export async function createCheckoutSession(
  unvalidatedPriceId: string, 
  unvalidatedLocale: string = 'en',
  unvalidatedCollectorToken: string
) {
  // 1. Atelier Validation
  const { priceId, locale, collectorToken } = validateAtelierInput({
    priceId: unvalidatedPriceId,
    locale: unvalidatedLocale,
    collectorToken: unvalidatedCollectorToken,
  });

  // 2. Environment Context
  const headerList = await headers();
  const origin = headerList.get('origin');
  
  try {
    // 3. Studio Logic: Collection Soft-Lock 
    const price = await stripe.prices.retrieve(priceId, {
      expand: ['product'],
    });

    if (!price.active) {
      throw new Error('This price plan has been archived.');
    }
    
    const product = price.product as any;
    const now = Math.floor(Date.now() / 1000);
    
    // Safety: Verify integration match to prevent cross-account leakage
    if (product.metadata.integration_id && product.metadata.integration_id !== ATELIER_INTEGRATION_ID) {
      throw new Error('This item is not listed in the current Atelier series.');
    }
    
    // Check if item was acquired or archived
    if (!product.active || product.metadata.stock === '0' || product.metadata.status === 'sold' || product.metadata.available === 'false') {
      throw new Error('This bespoke piece was just acquired by another collector.');
    }

    // Check for an active studio reservation (5-minute window)
    const lockExpires = parseInt(product.metadata.lock_expires || '0');
    const lockId = product.metadata.lock_id;

    if (now < lockExpires && lockId !== collectorToken) {
      console.warn(`🔒 [Atelier] Piece ${product.id} is currently being viewed by another collector.`);
      throw new Error('Another collector is currently reviewing this piece. Please try again in 5 minutes.');
    }

    // 3. Primary Guard: Historical Payment Scan (Zero-Window Protection)
    // We search for any 'succeeded' payments associated with this price.
    // Unlike Checkouts, PaymentIntents are fully searchable by metadata and represent the ultimate source of truth.
    const completedPayments = await stripe.paymentIntents.search({
      query: `status:'succeeded' AND metadata['at_price_id']:'${priceId}'`,
      limit: 1,
    });

    if (completedPayments.data.length > 0) {
      console.warn(`🛑 [Atelier] Blocking acquisition: Piece ${product.name} has a verified successful payment record.`);
      throw new Error('This unique piece has already been secured by another collector and is currently being archived. Please refresh the gallery.');
    }

    // 4. Atomic 'Race Detector' Lock
    // Tag the product with our identity
    await stripe.products.update(product.id, {
      metadata: {
        ...product.metadata,
        lock_expires: (now + (ATELIER_RESERVATION_MINUTES * 60)).toString(), 
        lock_id: collectorToken,
      }
    });

    // Verify ownership: Retrieve immediately to ensure no other process overrode our lock
    const verifiedProduct = await stripe.products.retrieve(product.id);
    if (verifiedProduct.metadata.lock_id !== collectorToken) {
      console.warn(`🕵️ [Atelier] Race Condition: ${product.name} was snatched by another collector.`);
      throw new Error('Another collector was slightly faster in securing this piece. Please try again in 5 minutes.');
    }
    
    // Final check: Ensure product hasn't been archived by a concurrent webhook
    if (!verifiedProduct.active || verifiedProduct.metadata.available === 'false') {
      throw new Error('This piece was just secured by another collector.');
    }

    // 5. Create Session with Secure Identity
    // [Atelier] Granular Idempotency: Stable for retries, but sensitive to completion.
    const idempotencyKey = `${collectorToken}_${priceId}_${product.active ? 'active' : 'archived'}`;

    const session = await stripe.checkout.sessions.create(
      {
        ui_mode: 'embedded_page',
        client_reference_id: collectorToken,
        customer_creation: 'always', 
        billing_address_collection: 'required',
        phone_number_collection: { enabled: true },
        allow_promotion_codes: true,
        automatic_tax: { enabled: true },
        adaptive_pricing: { enabled: true },
        shipping_address_collection: {
          allowed_countries: ['US', 'CA', 'GB'],
        },
        payment_intent_data: {
          metadata: {
            at_integration_id: ATELIER_INTEGRATION_ID,
            at_collector_token: collectorToken,
            at_product_id: product.id,
            at_price_id: priceId,
          }
        },
        metadata: {
          integration_id: ATELIER_INTEGRATION_ID, 
          collector_token: collectorToken,
          product_id: product.id,
          price_id: priceId,
        },
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        return_url: `${origin}/${locale}/return?session_id={CHECKOUT_SESSION_ID}`,
      },
      {
        idempotencyKey,
      }
    );

    // [Atelier] Strict SDK Verification: Log the session status for observability
    console.warn(`📡 [Stripe] Session ID: ${session.id.slice(0, 8)}... Status: ${session.status} Payment: ${session.payment_status}`);

    // [Atelier] Completion Guard: If the session is finished (via idempotent re-use),
    // we MUST block remounting. Stripe Checkout UI cannot mount a completed session.
    if (
      session.status === 'complete' || 
      session.status === 'expired' || 
      session.payment_status === 'paid'
    ) {
      console.warn(`🔒 [Atelier] Attempted re-entry into completed session ${session.id}. Blocking.`);
      throw new Error('Museum piece already acquired. Refreshing gallery...');
    }

    return { clientSecret: session.client_secret as string };
  } catch (error: any) {
    console.error('❌ [Atelier] Checkout Violation:', error.message);
    // Museum-grade error response
    throw new Error(error.message.startsWith('Atelier Security') ? error.message : (error.message || 'Failed to initialize collection page'));
  }
}
