/**
 * Supabase Client
 * Singleton instance for database operations
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ProductRequest, ProductRequestStatus } from '@/types/products';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not configured. Product sales functionality will be disabled.');
}

let supabaseClient: SupabaseClient | null = null;

/**
 * Get Supabase client singleton
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient && supabaseUrl && supabaseKey) {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Check environment variables.');
  }
  
  return supabaseClient;
}

/**
 * Create a new product request in database
 */
export async function createProductRequest(request: Omit<ProductRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductRequest> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('product_requests')
    .insert({
      product_type: request.productType,
      language: request.language,
      customer_name: request.customerName,
      customer_email: request.customerEmail,
      country: request.country,
      status: request.status || 'pending',
      payment_link: request.paymentLink,
      download_link: request.downloadLink,
      paddle_transaction_id: request.paddleTransactionId,
      paddle_checkout_id: request.paddleCheckoutId,
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating product request:', error);
    throw new Error(`Failed to create product request: ${error.message}`);
  }
  
  return mapDbToProductRequest(data);
}

/**
 * Update product request by ID
 */
export async function updateProductRequest(
  id: string, 
  updates: Partial<ProductRequest>
): Promise<ProductRequest> {
  const supabase = getSupabaseClient();
  
  const dbUpdates: any = {};
  if (updates.status) dbUpdates.status = updates.status;
  if (updates.paymentLink) dbUpdates.payment_link = updates.paymentLink;
  if (updates.downloadLink) dbUpdates.download_link = updates.downloadLink;
  if (updates.paddleTransactionId) dbUpdates.paddle_transaction_id = updates.paddleTransactionId;
  if (updates.paddleCheckoutId) dbUpdates.paddle_checkout_id = updates.paddleCheckoutId;
  
  const { data, error } = await supabase
    .from('product_requests')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating product request:', error);
    throw new Error(`Failed to update product request: ${error.message}`);
  }
  
  return mapDbToProductRequest(data);
}

/**
 * Find product request by transaction ID
 */
export async function findProductRequestByTransactionId(transactionId: string): Promise<ProductRequest | null> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('product_requests')
    .select()
    .eq('paddle_transaction_id', transactionId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') { // Not found
      return null;
    }
    console.error('Error finding product request:', error);
    throw new Error(`Failed to find product request: ${error.message}`);
  }
  
  return mapDbToProductRequest(data);
}

/**
 * Find product request by email
 */
export async function findProductRequestsByEmail(email: string): Promise<ProductRequest[]> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase
    .from('product_requests')
    .select()
    .eq('customer_email', email)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error finding product requests:', error);
    throw new Error(`Failed to find product requests: ${error.message}`);
  }
  
  return data.map(mapDbToProductRequest);
}

/**
 * Generate signed download URL from Supabase Storage
 */
export async function generateDownloadUrl(filePath: string, expiresInSeconds: number = 86400): Promise<string> {
  const supabase = getSupabaseClient();
  
  const { data, error } = await supabase.storage
    .from('ebooks')
    .createSignedUrl(filePath, expiresInSeconds);
  
  if (error) {
    console.error('Error generating download URL:', error);
    throw new Error(`Failed to generate download URL: ${error.message}`);
  }
  
  if (!data?.signedUrl) {
    throw new Error('No signed URL returned from Supabase');
  }
  
  return data.signedUrl;
}

/**
 * Map database row to ProductRequest type
 */
function mapDbToProductRequest(data: any): ProductRequest {
  return {
    id: data.id,
    productType: data.product_type,
    language: data.language,
    customerName: data.customer_name,
    customerEmail: data.customer_email,
    country: data.country,
    status: data.status,
    paymentLink: data.payment_link,
    downloadLink: data.download_link,
    paddleTransactionId: data.paddle_transaction_id,
    paddleCheckoutId: data.paddle_checkout_id,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseKey);
}
