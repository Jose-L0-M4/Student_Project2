import { ordersService } from '$lib/server/services/orders-service.js';
import { error } from '@sveltejs/kit';

// Load function
export async function load({ params }) {
    
    // get the order AND order details for the order ID passed in
    const order = await ordersService.getOrderWithDetails(Number(params.id));

    // debugging purposes
    console.log('Order:', order);

    // If the order is not found
    if (!order) throw error(404, 'Order not found');

    return { order };

}
