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
 */
export async function createCheckoutLink(
  productId: string,
  customerEmail: string,
  customerName: string,
  customData?: Record<string, any>
): Promise<PaddleCheckoutResponse> {
  const paddle = getPaddleClient();
  
  try {
    const response = await fetch(`${paddle.apiUrl}/checkouts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paddle.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            price_id: productId,
            quantity: 1,
          },
        ],
        customer: {
          email: customerEmail,
        },
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
    
    return {
      checkoutUrl: data.data.url || '',
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
