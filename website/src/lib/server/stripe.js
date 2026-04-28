import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

/**
 * Single Stripe instance for server usage.
 * Use secret key only on server — never expose to the browser.
 */
export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});