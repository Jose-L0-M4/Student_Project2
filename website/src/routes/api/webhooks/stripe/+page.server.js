import { stripe } from '$lib/server/stripe.js';
import { json } from '@sveltejs/kit';
import { ordersService } from '$lib/server/services/orders-service.js';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';

/**
 * Stripe Webhook Endpoint
 * Receives events from Stripe (e.g. checkout completed)
 * Must use raw request body for signature verification
 */
export const POST = async ({ request }) => {
  // 1️ Get Stripe signature header
  const sig = request.headers.get('stripe-signature');

  // 2️ Read raw body (required for Stripe verification)
  const rawBody = await request.text();

  let event;

  try {
    // 3️ Verify webhook signature
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 4️ Handle relevant Stripe events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const orderId = Number(session.metadata?.orderId);
    const paymentIntentId = session.payment_intent;

    if (!orderId) {
      console.warn('checkout.session.completed without orderId metadata');
    } else {
      try {
        // 5️ Mark order as paid (single source of truth)
        await ordersService.updateOrder(orderId, {
          status: 'paid',
          paymentIntentId
        });

        console.log(`Order ${orderId} marked as paid`);
      } catch (err) {
        console.error(`Failed to update order ${orderId}:`, err);
      }
    }
  }

  // 6️ Acknowledge receipt to Stripe
  return json({ received: true });
};
