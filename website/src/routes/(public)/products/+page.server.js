import { productsService } from '$lib/server/services/products-service.js';
import { categoriesService } from '$lib/server/services/categories-service.js';
import { error, fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
// To handle file upload
import fs from 'fs';
import path from 'path';


// make sure uploads directory exists
const uploadsDir = path.resolve('static/uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });


// load - server side
export async function load() {

    try {
        
        const prods = await productsService.getAllProducts();
        const prodCats = await categoriesService.getAllCategories();
        
        // return data
        return {
            products: prods,
            categories: prodCats
        }

    } catch (err) {
        console.error('Error retrieving products:', err);
        return fail(500, { err });
    }
}


// Handle form actions
export const actions = {
    createProduct: async ({ request }) => {
        try {

            // get the from data from the request object
            const formData = await request.formData();

            // Handle the uploaded file
            const file = formData.get('prodImage'); // File object from the form
            let filename = '';
            if (file && file.size > 0) {
                // create a unique filename
                filename = `${Date.now()}-${file.name}`;
                const buffer = Buffer.from(await file.arrayBuffer());
                fs.writeFileSync(path.join(uploadsDir, filename), buffer);
            }
            
            // create a variable with the form data
            const productData = {
                name: formData.get('prodName'),
                description: formData.get('prodDesc'),
                price: Number(formData.get('prodPrice')),
                image: filename, // <-- store the filename, not the File object
                quantity: Number(formData.get('prodQty')),
                categoryId: Number(formData.get('prodCatId'))
            };

            // Call the product service passing in the form data
            await productsService.createProduct(productData);

            // return a success message to the page
            return { success: true };

        } catch (err) {
            console.error('Error creating product:', err);

            // If validation fails (checked by Zod), it throws a ZodError.
            // We extract the field-specific messages and send them back to the page
            // so the user can see what input was invalid instead of a server error.
            if (err instanceof ZodError) {
                const errors = {};
                err.issues.forEach((error) => {
                    const field = error.path[0]?.toString();
                    if (field) {
                        errors[field] = error.message;
                    }
                });
                return fail(400, { errors });
            }

            return fail(500, {
                errors: { general: err instanceof Error ? err.message : 'Failed to create product' }
            });
        }
    },
    updateProduct: async ({ request }) => {
		try {
            // Get the form data
            const formData = await request.formData();
            const id = Number(formData.get('prodId'));

            /*
                The following code to handle the image
            */
            // Fetch existing product from DB
            const existingProduct = await productsService.getProductById(id);

            if (!existingProduct) {
                return fail(404, {
                    errors: { general: 'Product not found' }
                });
            }

            // Default to existing image
            let filename = existingProduct.image;

            // Handle uploaded file (only if user selected one)
            const file = formData.get('prodImage');
            if (file && file.size > 0) {
                filename = `${Date.now()}-${file.name}`;
                const buffer = Buffer.from(await file.arrayBuffer());
                fs.writeFileSync(path.join(uploadsDir, filename), buffer);
            }
            // End image checking

			// create a variable with the form data
            const productData = {
                name: formData.get('prodName'),
                description: formData.get('prodDesc'),
                price: Number(formData.get('prodPrice')),
                image: filename,
                quantity: Number(formData.get('prodQty')),
                categoryId: Number(formData.get('prodCatId'))
            };

            // Call the product service passing in the form data
            await productsService.updateProduct(id, productData);

			return { success: true };

		} catch (err) {
            console.error('Error updating product:', err);

            // Zod validation error → return user input errors (not a server error)
            if (err instanceof ZodError) {
                const errors = {};
                err.issues.forEach((error) => {
                    const field = error.path[0]?.toString();
                    if (field) {
                        errors[field] = error.message;
                    }
                });
                return fail(400, { errors });
            }

            return fail(500, {
                errors: { general: err instanceof Error ? err.message : 'Failed to update product' }
            });
        }
	},
    deleteProduct: async ({ request }) => {
		try {
			const formData = await request.formData();
            const id = Number(formData.get('prodId'));
			
            // Call the product service passing in the ID
			await productsService.deleteProduct(id);

			return { success: true };

		} catch (err) {
            console.error('Error deleting product:', err);

            // Zod validation error → return user input errors (not a server error)
            if (err instanceof ZodError) {
                const errors = {};
                err.issues.forEach((error) => {
                    const field = error.path[0]?.toString();
                    if (field) {
                        errors[field] = error.message;
                    }
                });
                return fail(400, { errors });
            }

            // Drizzle errors can be nested; check both err and err.cause
            const code = err?.cause?.code || err?.code || '';
            const message = (err?.cause?.message || err?.message || '').toString();
            const isForeignKey = code === 'SQLITE_CONSTRAINT_FOREIGNKEY' || message.includes('SQLITE_CONSTRAINT_FOREIGNKEY');

            if (isForeignKey) {
            return fail(409, {
                errors: {
                general: 'Cannot delete this product because it is linked to other records.'
                }
            });
            }

            // Generic, non-leaky message for unexpected DB errors
            return fail(500, {
                errors: { general: 'Failed to delete product' }
            });
        }
	}
};