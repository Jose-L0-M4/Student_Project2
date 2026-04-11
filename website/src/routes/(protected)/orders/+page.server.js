import { ordersService } from '$lib/server/services/orders-service.js';
import { error } from '@sveltejs/kit';

// load - server side
export async function load({ locals }) {

    try {

        const user = locals.user;

        if (!user) {
            throw error(401, 'Unauthorized');
        }

        // Get only this user's orders
        const orders = await ordersService.getOrdersByUser(user.id);

        console.log('Orders:', orders);

        return {
            orders
        };

    } catch (err) {
        console.error('Error retrieving orders:', err);
        throw error(500, 'Failed to load orders');
    }
}