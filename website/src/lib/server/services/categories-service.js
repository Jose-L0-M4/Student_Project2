// categoriesService.js
import { categoriesDataAccess } from '../data-access/categories-data-access.js';
import { NotFoundError } from '../utils/errors.js';
import { insertCategorySchema, updateCategorySchema, deleteCategorySchema } from '../db/validation.js';

// The Service Layer performs validation, permission checks,
// and applies domain rules before database operations occur.
export const categoriesService = {

  /** Get category by ID */
  async getCategoryById(id) {
    const category = await categoriesDataAccess.findById(id);
    if (!category) throw new NotFoundError('Category not found');
    return category;
  },

  /** Get category by name */
  async getCategoryByName(name) {
    const category = await categoriesDataAccess.findByName(name);
    if (!category) throw new NotFoundError('Category not found');
    return category;
  },

  /** Get all categories */
  async getAllCategories() {
    return await categoriesDataAccess.findAll();
  },

  /** Create a new category */
  async createCategory(categoryData) {
    const validated = insertCategorySchema.parse(categoryData);
    return await categoriesDataAccess.create(validated);
  },

  /** Update a category */
  async updateCategory(id, categoryData) {
    const validated = updateCategorySchema.parse(categoryData);

    const updatedCategory = await categoriesDataAccess.update(id, validated);
    if (!updatedCategory) throw new NotFoundError('Category not found after update');

    return updatedCategory;
  },

  /** Delete a category */
  async deleteCategory(id) {
    const validated = deleteCategorySchema.parse({ id });

    const deleted = await categoriesDataAccess.delete(validated.id);
    if (!deleted) throw new NotFoundError('Category not found to delete');

    return deleted;
  }
};