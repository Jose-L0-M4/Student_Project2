// ordersDataAccess.js
import { db } from '../db/index.js';
import { order, orderDetail } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const ordersDataAccess = {

  /** Find an order by ID */
  async findById(id) {
    const result = await db.select().from(order).where(eq(order.id, id)).limit(1);
    return result[0] ?? null;
  },

  /** Find orders by user ID */
  async findByUser(userId) {
    return await db.select().from(order).where(eq(order.userId, userId));
  },

  /** Get all orders */
  async findAll() {
    return await db.select().from(order);
  },

  /** Find order by ID with details */
async findByIdWithDetails(id) {
  const orderResult = await db.select().from(order).where(eq(order.id, id)).limit(1);
  if (!orderResult.length) return null;

  // Get order details with this order
  const items = await db.select().from(orderDetail).where(eq(orderDetail.orderId, id));

  // Spread operator. Create a new object that contains all properties of the order, and then add a new property called items.
  return { ...orderResult[0], items };
},

  /** Create a new order (with details) */
  async create(orderData, items) {
    return await db.transaction(async (tx) => {
      const orderResult = await tx.insert(order).values(orderData).returning();
      const newOrder = orderResult[0];

      if (items?.length)
        await tx.insert(orderDetail).values(items.map(i => ({ ...i, orderId: newOrder.id })));

      return newOrder;
    });
  },

  /** Update an order */
  async update(id, orderData) {
    const result = await db.update(order).set(orderData).where(eq(order.id, id)).returning();
    return result[0] ?? null;
  },

  /** Delete an order */
  async delete(id) {
    await db.delete(orderDetail).where(eq(orderDetail.orderId, id));
    const result = await db.delete(order).where(eq(order.id, id));
    return result.rowsAffected > 0;
  }
};
