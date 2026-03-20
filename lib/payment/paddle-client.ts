/**
 * Paddle Payment Client
 * Handles payment link generation and checkout
 */

import { PaddleCheckoutResponse } from '@/types/products';

// Note: Paddle SDK integration placeholder
// TODO: Install and configure official Paddle SDK when available
// For now, using REST API approach

const PADDLE_API_KEY = process.env.PADDLE_API_KEY || '';
const PADDLE_ENVIRONMENT = process.env.PADDLE_ENVIRONMENT || 'sandbox'; // 'sandbox' or 'production'
const PADDLE_API_URL = PADDLE_ENVIRONMENT === 'production' 
  ? 'https://api.paddle.com/v1'
  : 'https://sandbox-api.paddle.com/v1';

if (!PADDLE_API_KEY) {
  console.warn('Paddle API key not configured. Payment functionality will be disabled.');
}

/**
 * Get Paddle client (REST API approach)
 */
export function getPaddleClient() {
  if (!PADDLE_API_KEY) {
    throw new Error('Paddle client not initialized. Check PADDLE_API_KEY environment variable.');
  }
  
  return {
    apiKey: PADDLE_API_KEY,
    apiUrl: PADDLE_API_URL,
  };
}

/**
 * Create checkout session and get payment link
 * Uses direct Paddle Billing checkout URL construction
 * 
 * @param priceOverride Optional price in USD (e.g., 10.99). If provided, overrides the default product price.
 */
export async function createCheckoutLink(
  productId: string,
  customerEmail: string,
  customerName: string,
  customData?: Record<string, any>,
  priceOverride?: number
): Promise<PaddleCheckoutResponse> {
  try {
    // Paddle Billing uses direct checkout URLs - no API call needed
    const params = new URLSearchParams();
    
    // Add item (price_id + quantity)
    params.append('items[0][price_id]', productId);
    params.append('items[0][quantity]', '1');
    
    // Override price if provided (for processing fee, custom pricing)
    if (priceOverride) {
      // Convert USD to cents (Paddle requires integer amount in minor currency unit)
      params.append('items[0][price][amount]', Math.round(priceOverride * 100).toString());
      params.append('items[0][price][currency_code]', 'USD');
    }
    
    // Add customer email for pre-filling checkout form
    params.append('customer_email', customerEmail);
    
    // Add custom data for tracking (if provided)
    if (customData) {
      Object.entries(customData).forEach(([key, value]) => {
        params.append(`custom_data[${key}]`, String(value));
      });
    }
    
    // Build checkout URL (sandbox vs production)
    const baseUrl = PADDLE_ENVIRONMENT === 'production'
      ? 'https://buy.paddle.com/checkout'
      : 'https://sandbox-buy.paddle.com/checkout';
    
    const checkoutUrl = `${baseUrl}?${params.toString()}`;
    
    console.log('Generated Paddle checkout URL:', checkoutUrl.substring(0, 100) + '...');
    
    return {
      checkoutUrl,
      checkoutId: null, // No checkout ID with direct URL method
    };
  } catch (error: any) {
    console.error('Error creating Paddle checkout URL:', error);
    throw new Error(`Failed to create checkout: ${error.message}`);
  }
}

/**
 * Verify Paddle webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  webhookSecret: string
): boolean {
  // Paddle webhook verification logic
  // Note: Implementation depends on Paddle's webhook signature algorithm
  // This is a placeholder - implement according to Paddle docs
  try {
    // TODO: Implement proper signature verification
    // Reference: https://developer.paddle.com/webhooks/signature-verification
    return true; // Temporarily return true for development
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return false;
  }
}

/**
 * Check if Paddle is configured
 */
export function isPaddleConfigured(): boolean {
  return !!PADDLE_API_KEY;
}
