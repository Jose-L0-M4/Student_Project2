// ordersService.js
import { ordersDataAccess } from '../data-access/orders-data-access.js';
import { NotFoundError } from '../utils/errors.js';
import { insertOrderSchema, updateOrderSchema, deleteOrderSchema } from '../db/validation.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';

import { cartDataAccess } from '../data-access/cart-data-access.js';
import { notifyOrderCreated } from '../notification/order-notifications.js';

// The Service Layer performs validation, permission checks,
// and applies domain rules before database operations occur.
// This layer uses both Zod validators and DAL functions.
export const ordersService = {

  /** Get an order by ID */
  async getOrderById(id) {
    const order = await ordersDataAccess.findById(id);
    if (!order) throw new NotFoundError('Order not found');
    return order;
  },

  /** Get orders by user ID */
  async getOrdersByUser(userId) {
    return await ordersDataAccess.findByUser(userId);
  },

  /** Get all orders */
  async getAllOrders() {
    return await ordersDataAccess.findAll();
  },

  /** Get an order with details */
  async getOrderWithDetails(id) {
    const order = await ordersDataAccess.findByIdWithDetails(id);
    if (!order) throw new NotFoundError('Order not found');
    
    return order;
  },

  /** Create a new order */
  async createOrder(orderData, items) {

    if (!items?.length) throw new ValidationError('Order must have at least one item');

    // dynamically create the total for the order
    const total = items.reduce((sum, i) => sum + (i.quantity * i.unitPrice), 0);

    const validatedOrder = insertOrderSchema.parse({...orderData, total});

    return await ordersDataAccess.create(validatedOrder, items);
  },


  /** Update an order */
  async updateOrder(id, orderData) {

    const validated = updateOrderSchema.parse(orderData);

    const updatedOrder = await ordersDataAccess.update(id, validated);
    if (!updatedOrder) throw new NotFoundError('Order not found after update');

    return updatedOrder;
  },

  /** Delete an order */
  async deleteOrder(id) {

    const validated = deleteOrderSchema.parse({ id });

    const deleted = await ordersDataAccess.delete(validated.id);
    if (!deleted) throw new NotFoundError('Order not found to delete');

    return deleted;
  },
/** Create a new order */
async createOrderFromCart(user) {

  const userId = Number(user.id);

  if (!Number.isInteger(userId) || userId < 1) {
    throw new Error('Invalid user ID');
  }

  // Get cart and items
  const cart = await cartDataAccess.getOrCreateCart(userId);
  const items = await cartDataAccess.getCartItems(cart.id);

  // Validate cart is not empty
  if (!items.length) {
    throw new Error('Cart is empty');
  }

  // Calculate total (in cents)
  const total = items.reduce(
    (sum, item) => sum + (item.quantity * item.unitPrice),
    0
  );

  // Build order payload
  const orderData = {
    userId,
    status: 'pending',
    total
  };

  //Get order by ID
  const getOrderById = async (id) => {
    const order = await ordersDataAccess.findById(id);
    if (!order) throw new NotFoundError('Order not found');
    return order;
  };

  // Validate order schema
  const validatedOrder = insertOrderSchema.parse(orderData);

  // Create order + order details
  const order = await ordersDataAccess.createFromCart(validatedOrder, items);

  // Clear cart after successful order
  await cartDataAccess.clearCart(cart.id);

  // Send email (non-blocking)
notifyOrderCreated({ order, user }).catch((err) => {
  console.error('Order created but email failed', err);
});


  return order;
},

};

