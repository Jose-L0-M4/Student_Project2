import { categoriesService } from '$lib/server/services/categories-service.js';
import { error, fail } from '@sveltejs/kit';
import { ZodError } from 'zod';


// load - server side
export async function load() {

    try {
        
        // Get the data from the database through the service layer
        const prodCats = await categoriesService.getAllCategories();
        
        // debugging purposes
        console.log('Product Categories:', prodCats);

        // return data
        return {
            prodCategories: prodCats
        }

    } catch (err) {
        console.error('Error retrieving categories:', err);
        return fail(500, { err });
    }
}


// Handle form actions
export const actions = {
    createCategory: async ({ request }) => {
        try {

            // get the from data from the request object
            const formData = await request.formData();
            
            // create a variable with the form data
            const catData = {
                name: formData.get('catName'),
                description: formData.get('catDesc')
            };

            // Call the categories service passing in the form data
            await categoriesService.createCategory(catData);

            // return a success message to the page
            return { success: true };

        } catch (err) {
            console.error('Error creating Category:', err);

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
                errors: { general: err instanceof Error ? err.message : 'Failed to create Category' }
            });
        }
    },
    updateCategory: async ({ request }) => {
		try {
            // Get the form data
            const formData = await request.formData();
            const id = Number(formData.get('catId'));

			const catData = {
                name: formData.get('catName'),
                description: formData.get('catDesc')
            };

            // Call the categories service passing in the form data
            await categoriesService.updateCategory(id, catData);

			return { success: true };

		} catch (err) {
            console.error('Error updating Category:', err);

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
                errors: { general: err instanceof Error ? err.message : 'Failed to update Category' }
            });
        }
	},
    deleteCategory: async ({ request }) => {
		try {
			const formData = await request.formData();
            const id = Number(formData.get('catId'));
			
            // Call the categories service passing in the ID
			await categoriesService.deleteCategory(id);

			return { success: true };

		} catch (err) {
            console.error('Error deleting Category:', err);

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
                general: 'Cannot delete this Category because it is linked to other records.'
                }
            });
            }

            // Generic, non-leaky message for unexpected DB errors
            return fail(500, {
                errors: { general: 'Failed to delete Category' }
            });
        }
	}
};