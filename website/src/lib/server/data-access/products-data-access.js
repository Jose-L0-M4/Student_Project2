// productsDataAccess.js
import { db } from '../db/index.js';
import { product } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const productsDataAccess = {

  /** Find a product by its ID */
  async findById(id) {
    const result = await db.select().from(product).where(eq(product.id, id)).limit(1);
    return result[0] ?? null;
  },

  /** Find a product by its name */
  async findByName(name) {
    const result = await db.select().from(product).where(eq(product.name, name)).limit(1);
    return result[0] ?? null;
  },

  /** Get all products */
  async findAll() {
    return await db.select().from(product);
  },

  /** Get products by category */
  async findByCategory(categoryId) {
    return await db.select().from(product).where(eq(product.categoryId, categoryId));
  },

  /** Create a new product */
  async create(productData) {
    const result = await db.insert(product).values(productData).returning();
    console.log("Added product >>>>>>>", result[0]);
    return result[0];
  },

  /** Update an existing product */
  async update(id, productData) {
    const result = await db.update(product).set(productData).where(eq(product.id, id)).returning();
    console.log("Updated product >>>>>>>", result[0]);
    return result[0];
  },

  /** Delete a product */
  async delete(id) {
    const result = await db.delete(product).where(eq(product.id, id));
    console.log("Deleted product >>>>>>>", result);
    return result.rowsAffected > 0;
  }
};