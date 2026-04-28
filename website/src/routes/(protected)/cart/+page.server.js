import { cartService } from '$lib/server/services/cart-service.js';
import { ordersService } from '$lib/server/services/orders-service.js';
import { redirect, error } from '@sveltejs/kit';
import { stripe } from '$lib/server/stripe.js'; 
import { ORIGIN } from '$env/static/private'; 


export async function load({ locals }) {
  if (!locals.user) {
    throw error(401, 'Not authenticated');
  }

  const cart = await cartService.getOrCreateCart(locals.user.id);
  const items = await cartService.getItems(cart.id);

  const total = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return {
    cart,
    items,
    total
  };
}

export const actions = {
  updateQuantity: async ({ locals, request }) => {
    if (!locals.user) {
      throw error(401);
    }

    const data = await request.formData();

    const cartItemId = Number(data.get('cartItemId'));
    const quantity = Number(data.get('quantity'));

    if (!Number.isInteger(cartItemId) || cartItemId < 1) {
      throw error(400, 'Invalid cart item');
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw error(400, 'Invalid quantity');
    }

    await cartService.updateItemQuantity(cartItemId, quantity);
  },

  removeItem: async ({ locals, request }) => {
    if (!locals.user) {
      throw error(401);
    }

    const data = await request.formData();
    const cartItemId = Number(data.get('cartItemId'));

    if (!Number.isInteger(cartItemId) || cartItemId < 1) {
      throw error(400, 'Invalid cart item');
    }

    await cartService.removeItem(cartItemId);
  },

  checkout: async ({ locals }) => {
        if (!locals.user) throw error(401, 'Not authenticated');

        // 1️ Get user's cart and items
        const cart = await cartService.getOrCreateCart(locals.user.id);
        const items = await cartService.getItems(cart.id);

        if (!items.length) throw error(400, 'Cart is empty');

        // 2 Create order from cart (still pending)
        const order = await ordersService.createOrderFromCart(locals.user);

        // 3️ Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
        mode: 'payment',                     // one-time payment
        payment_method_types: ['card'],      // allow card payments
        customer_email: locals.user.email,   // optional, prefill Stripe checkout
        metadata: {
            orderId: order.id.toString()    // <-- link Stripe session to order
        },
        line_items: items.map(item => ({
            price_data: {
                currency: 'eur',
                product_data: { name: item.name },
                unit_amount: item.unitPrice     // price in cents
            },
            quantity: item.quantity
        })),
            success_url: `${ORIGIN}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${ORIGIN}/cart`
        });

        // 4️ Redirect user to Stripe-hosted checkout page
        throw redirect(303, session.url);
    }

};