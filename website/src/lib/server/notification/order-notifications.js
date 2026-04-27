import { sendOrderConfirmationEmail } from '../email/email-service.js';

export async function notifyOrderCreated({ order, user }) {
  await sendOrderConfirmationEmail({
    to: user.email,
    orderId: order.id,
    total: order.total
  });
}