/**
 * Product-related type definitions
 * KHESED-TEK Systems - Product Sales System
 */

export type ProductType = 
  | 'ebook_peace'         // "Paz en la Tormenta" / "Peace in the Storm"
  | 'ebook_blooming'      // "Floreciendo en el Fuego" / "Blooming in the Fire"
  | 'ebook_impactful'     // "Vida de Impacto" / "Impactful Living"
  | 'journal_app';        // "Mi Identidad Real" / "Real ID"

export type Language = 'es' | 'en';

export type ProductRequestStatus = 
  | 'pending'        // Form submitted, awaiting payment link generation
  | 'payment_sent'   // Payment link emailed to customer
  | 'paid'           // Paddle confirmed payment received
  | 'delivered'      // Download link sent to customer
  | 'failed';        // Payment or delivery failed

export interface ProductRequest {
  id?: string;
  productType: ProductType;
  language?: Language;
  customerName: string;
  customerEmail: string;
  country?: string;
  paddleTransactionId?: string;
  paddleCheckoutId?: string;
  status: ProductRequestStatus;
  paymentLink?: string;
  downloadLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductInfo {
  id: ProductType;
  titleES: string;
  titleEN: string;
  descriptionES?: string;
  descriptionEN?: string;
  priceUSD: number;
  paddleProductIdES?: string;
  paddleProductIdEN?: string;
  available: boolean;
  downloadPath?: string; // Path in Supabase Storage (for e-books)
  isPhysical: boolean;   // true for apps, false for digital downloads
}

export interface ProductFormData {
  productType: ProductType;
  language: Language;
  customerName: string;
  customerEmail: string;
  country?: string;
}

export interface PaddleCheckoutResponse {
  checkoutUrl: string;
  checkoutId: string | null; // Nullable for direct URL method (no API checkout ID)
}

export interface PaddleWebhookEvent {
  eventType: string;
  transactionId: string;
  customerId?: string;
  customerEmail?: string;
  productId?: string;
  amount?: number;
  currency?: string;
  status?: string;
  customData?: Record<string, any>;
}
