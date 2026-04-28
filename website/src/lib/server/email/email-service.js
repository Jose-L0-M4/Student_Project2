import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private';

const resend = new Resend(RESEND_API_KEY);

export async function sendOrderConfirmationEmail({ to, orderId, total }) {
  await resend.emails.send({
    from: 'WebDev Shop <onboarding@resend.dev>',
    to,
    subject: `Order Confirmation #${orderId}`,
    html: `
      <h2>Thank you for your order</h2>
      <p>Your order <strong>#${orderId}</strong> has been received.</p>
      <p>Total: €${(total / 100).toFixed(2)}</p>
    `
  });

  console.log(`Order confirmation email sent to ${to}`);
}