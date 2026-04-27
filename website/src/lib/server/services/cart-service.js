import { cartDataAccess } from '../data-access/cart-data-access';

export const cartService = {

  async getOrCreateCart(userId) {
    return cartDataAccess.getOrCreateCart(userId);
  },

  async addItem(userId, productId, quantity = 1) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Invalid quantity');
    }

    const cart = await cartDataAccess.getOrCreateCart(userId);

    return cartDataAccess.addItem(cart.id, productId, quantity);
  },

  async getItems(cartId) {
    return cartDataAccess.getCartItems(cartId);
  },

  async updateItemQuantity(cartItemId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error('Invalid quantity');
    }

    return cartDataAccess.updateItemQuantity(cartItemId, quantity);
  },

  async removeItem(cartItemId) {
    return cartDataAccess.removeItem(cartItemId);
  },

  async clearCart(cartId) {
    return cartDataAccess.clearCart(cartId);
  }
};