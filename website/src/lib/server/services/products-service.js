// productsService.js
import { productsDataAccess } from '../data-access/products-data-access.js';
import { ValidationError, NotFoundError } from '../utils/errors.js';
import { insertProductSchema, updateProductSchema, deleteProductSchema } from '../db/validation.js';

// The Service Layer performs validation, permission checks, 
// and applies domain rules before database operations occur.
// This layer uses both Zod validators and DAL functions.
export const productsService = {

  /** Get a product by ID */
  async getProductById(id) {
    const product = await productsDataAccess.findById(id);
    if (!product) throw new NotFoundError('Product not found');
    return product;
  },

  /** Get a product by name */
  async getProductByName(name) {
    const product = await productsDataAccess.findByName(name);
    if (!product) throw new NotFoundError('Product not found');
    return product;
  },

  /** Get all products */
  async getAllProducts() {
    return await productsDataAccess.findAll();
  },

  /** Get all products in a category */
  async getProductsByCategory(categoryId) {
    return await productsDataAccess.findByCategory(categoryId);
  },

  /** Create a new product */
  async createProduct(productData) {
    // Validate with Zod
    const validated = insertProductSchema.parse(productData);
    return await productsDataAccess.create(validated);
  },

  /** Update a product */
  async updateProduct(id, productData) {
    // Validate with Zod
    const validated = updateProductSchema.parse(productData);

    const updatedProduct = await productsDataAccess.update(id, validated);
    if (!updatedProduct) throw new NotFoundError('Product not found after update');

    return updatedProduct;
  },

  /** Delete a product */
  async deleteProduct(id) {
    // Validate with Zod (expects object with id)
    const validated = deleteProductSchema.parse({ id });

    const deleted = await productsDataAccess.delete(validated.id);
    if (!deleted) throw new NotFoundError('Product not found to delete');

    return deleted;
  }
};