import { productsService } from '$lib/server/services/products-service.js';
import { categoriesService } from '$lib/server/services/categories-service.js';
import { error } from '@sveltejs/kit';
import { cartService } from '$lib/server/services/cart-Service';

// Load function
export async function load({ params }) {

    // get the product details for the product ID passed in
    const product = await productsService.getProductById(Number(params.id));

    // If the product is not found
    if (!product) throw error(404, 'Product not found');

    // We want to display the category name but only have the category ID
    // Make a call to the categories service with the ID to get the name
    const category = await categoriesService.getCategoryById(product.categoryId);
    const categoryName = category.name;

    return { product, categoryName };
}

import { redirect, error } from '@sveltejs/kit';
import { cartService } from '$lib/server/services/cart-service.js';

/** Cart Action */
export const actions = {
  addToCart: async ({ locals, request }) => {

    // Require authentication
    if (!locals.user) {
      throw redirect(303, '/auth/login');
    }

    const formData = await request.formData();

    const productId = Number(formData.get('productId'));

    // Validate product
    if (!productId) {
      throw error(400, 'Invalid product');
    }

    // Add item to cart (default quantity = 1)
    await cartService.addItem(locals.user.id, productId, 1);

    return { success: true };
  }
};