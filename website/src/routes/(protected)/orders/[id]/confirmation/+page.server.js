import { error } from '@sveltejs/kit';
import { ordersDataAccess } from '$lib/server/data-access/orders-data-access';

export async function load({ params, locals }) {

  // Auth check
  if (!locals.user) {
    throw error(401, 'Not authenticated');
  }

  const orderId = Number(params.id);
  const userId = Number(locals.user.id);

  // Validate orderId
  if (!Number.isInteger(orderId) || orderId < 1) {
    throw error(400, 'Invalid order');
  }

  // Validate userId
  if (!Number.isInteger(userId) || userId < 1) {
    throw error(401, 'Invalid user');
  }

  // Fetch order with details
  const order = await ordersDataAccess.findByIdWithDetails(orderId);

  // Ownership + existence check
  if (!order || order.userId !== userId) {
    throw error(404, 'Order not found');
  }

  return {
    order
  };
}