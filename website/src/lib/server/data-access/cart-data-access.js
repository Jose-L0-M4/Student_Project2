import { db } from '$lib/server/db';
import { cart, cartItem, product } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export const cartDataAccess = {

  // Get existing cart or create a new one
  async getOrCreateCart(userId) {
    const [existingCart] = await db
      .select()
      .from(cart)
      .where(eq(cart.userId, userId))
      .limit(1);

    if (existingCart) return existingCart;

    const [createdCart] = await db
      .insert(cart)
      .values({ userId })
      .returning();

    return createdCart ?? null;
  },

  // Add item or increase quantity if it already exists
  async addItem(cartId, productId, quantity) {
    const [existingItem] = await db
      .select()
      .from(cartItem)
      .where(
        and(
          eq(cartItem.cartId, cartId),
          eq(cartItem.productId, productId)
        )
      )
      .limit(1);

    if (existingItem) {
      const [updatedItem] = await db
        .update(cartItem)
        .set({
          quantity: existingItem.quantity + quantity
        })
        .where(eq(cartItem.id, existingItem.id))
        .returning();

      return updatedItem ?? null;
    }

    const [insertedItem] = await db
      .insert(cartItem)
      .values({ cartId, productId, quantity })
      .returning();

    return insertedItem ?? null;
  },

  // Get cart items with product info
  async getCartItems(cartId) {
    return await db
      .select({
        id: cartItem.id,
        quantity: cartItem.quantity,
        productId: product.id,
        name: product.name,
        unitPrice: product.price
      })
      .from(cartItem)
      .innerJoin(product, eq(cartItem.productId, product.id))
      .where(eq(cartItem.cartId, cartId));
  },

  // Update quantity of a single cart item
  async updateItemQuantity(cartItemId, quantity) {
    const [updatedItem] = await db
      .update(cartItem)
      .set({ quantity })
      .where(eq(cartItem.id, cartItemId))
      .returning();

    return updatedItem ?? null;
  },

  // Remove single item from cart
  async removeItem(cartItemId) {
    await db
      .delete(cartItem)
      .where(eq(cartItem.id, cartItemId));
  },

  // Clear entire cart
  async clearCart(cartId) {
    await db
      .delete(cartItem)
      .where(eq(cartItem.cartId, cartId));
  }
};