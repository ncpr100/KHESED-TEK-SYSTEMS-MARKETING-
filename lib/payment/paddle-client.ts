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
  ? 'https://api.paddle.com'
  : 'https://sandbox-api.paddle.com';

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
 * Uses Paddle REST API
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
  const paddle = getPaddleClient();
  
  try {
    // Build items array with optional price override
    const items = [
      {
        price_id: productId,
        quantity: 1,
        ...(priceOverride && {
          // Convert USD to cents (Paddle requires integer amount in minor currency unit)
          price: {
            amount: Math.round(priceOverride * 100).toString(),
            currency_code: 'USD'
          }
        })
      },
    ];
    
    console.log('Creating Paddle checkout with items:', JSON.stringify(items, null, 2));
    
    const response = await fetch(`${paddle.apiUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paddle.apiKey}`,
        'Content-Type': 'application/json',
        'Paddle-Version': '1'
      },
      body: JSON.stringify({
        items,
        customer_email: customerEmail,
        custom_data: customData || {},
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Paddle API error: ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    
    if (!data || !data.data || !data.data.id) {
      throw new Error('Invalid response from Paddle API');
    }
    
    // Extract checkout URL from transaction response
    const checkoutUrl = data.data.checkout?.url || data.data.checkout_url || '';
    
    return {
      checkoutUrl,
      checkoutId: data.data.id,
    };
  } catch (error: any) {
    console.error('Error creating Paddle checkout:', error);
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
