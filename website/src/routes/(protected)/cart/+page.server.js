import { cartService } from '$lib/server/services/cart-service.js';
import { ordersService } from '$lib/server/services/orders-service.js';
import { redirect, error } from '@sveltejs/kit';

export async function load({ locals }) {
  if (!locals.user) throw error(401, 'Not authenticated');

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
    if (!locals.user) throw error(401);

    const formData = await request.formData();

    const cartItemId = Number(formData.get('cartItemId'));
    const quantity = Number(formData.get('quantity'));

    // Validate cartItemId
    if (!Number.isInteger(cartItemId) || cartItemId < 1) {
      throw error(400, 'Invalid cart item');
    }

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw error(400, 'Invalid quantity');
    }

    await cartService.updateItemQuantity(cartItemId, quantity);
  },

  removeItem: async ({ locals, request }) => {
    if (!locals.user) throw error(401);

    const formData = await request.formData();

    const cartItemId = Number(formData.get('cartItemId'));

    await cartService.removeItem(cartItemId);
  },

  checkout: async ({ locals }) => {
    if (!locals.user) throw error(401);

    const order = await ordersService.createOrderFromCart(locals.user);

    throw redirect(
      303,
      `/orders/${order.id}/confirmation`
    );
  }
};