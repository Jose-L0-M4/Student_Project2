import { categoriesService } from '$lib/server/services/categories-service.js';
import { productsService } from '$lib/server/services/products-service.js';

export async function load({ params }) {
  const categoryId = Number(params.id);

  const category = await categoriesService.getCategoryById(categoryId);

  if (!category) {
    throw error(404, 'Category not found');
  }

  const categoryProducts = await productsService.getProductsByCategory(categoryId);   
  console.log('Category:', category);
  console.log('Category Products:', categoryProducts);

  return {
    category,
    categoryProducts
  };
}