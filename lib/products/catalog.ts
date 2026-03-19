/**
 * Product Catalog
 * Defines all available products for sale
 */

import { ProductInfo, ProductType } from '@/types/products';

export const PRODUCT_CATALOG: Record<ProductType, ProductInfo> = {
  ebook_peace: {
    id: 'ebook_peace',
    titleES: 'Paz en la Tormenta',
    titleEN: 'Peace in the Storm',
    descriptionES: 'Encuentra paz interior incluso en los momentos más difíciles. Tu aporte ayuda a comunidades vulnerables.',
    descriptionEN: 'Find inner peace even in the most difficult moments. Your contribution helps vulnerable communities.',
    priceUSD: 9.99,
    paddleProductIdES: process.env.PADDLE_PRODUCT_EBOOK_PEACE_ES,
    paddleProductIdEN: process.env.PADDLE_PRODUCT_EBOOK_PEACE_EN,
    available: true,
    downloadPath: 'ebooks/paz-en-la-tormenta.pdf',
    isPhysical: false,
  },
  ebook_blooming: {
    id: 'ebook_blooming',
    titleES: 'Floreciendo en el Fuego',
    titleEN: 'Blooming in the Fire',
    descriptionES: 'Descubre cómo crecer a través de las pruebas. Tu donación transforma vidas.',
    descriptionEN: 'Discover how to grow through trials. Your donation transforms lives.',
    priceUSD: 9.99,
    paddleProductIdES: process.env.PADDLE_PRODUCT_EBOOK_BLOOMING_ES,
    paddleProductIdEN: process.env.PADDLE_PRODUCT_EBOOK_BLOOMING_EN,
    available: true,
    downloadPath: 'ebooks/floreciendo-en-el-fuego.pdf',
    isPhysical: false,
  },
  ebook_impactful: {
    id: 'ebook_impactful',
    titleES: 'Vida de Impacto',
    titleEN: 'Impactful Living',
    descriptionES: 'Vive una vida de legado significativo. Tu contribución restaura vidas.',
    descriptionEN: 'Live a life that leaves a meaningful legacy. Your contribution restores lives.',
    priceUSD: 9.99,
    paddleProductIdES: process.env.PADDLE_PRODUCT_EBOOK_IMPACTFUL_ES,
    paddleProductIdEN: process.env.PADDLE_PRODUCT_EBOOK_IMPACTFUL_EN,
    available: true,
    downloadPath: 'ebooks/vida-de-impacto.pdf',
    isPhysical: false,
  },
  journal_app: {
    id: 'journal_app',
    titleES: 'Mi Identidad Real',
    titleEN: 'Real ID',
    descriptionES: 'Próximamente: Aplicación para descubrir tu identidad en Cristo. Tu interés ya siembra esperanza.',
    descriptionEN: 'Coming soon: Journal app to discover your identity in Christ. Your interest already plants hope.',
    priceUSD: 0, // Free for now, will be updated when available
    available: false, // Not yet available
    isPhysical: true, // This is an app, not a download
  },
};

/**
 * Get product information by type
 */
export function getProductInfo(productType: ProductType): ProductInfo {
  const product = PRODUCT_CATALOG[productType];
  if (!product) {
    throw new Error(`Product not found: ${productType}`);
  }
  return product;
}

/**
 * Get product title in specified language
 */
export function getProductTitle(productType: ProductType, language: 'es' | 'en'): string {
  const product = getProductInfo(productType);
  return language === 'es' ? product.titleES : product.titleEN;
}

/**
 * Get product description in specified language
 */
export function getProductDescription(productType: ProductType, language: 'es' | 'en'): string {
  const product = getProductInfo(productType);
  const description = language === 'es' ? product.descriptionES : product.descriptionEN;
  return description || '';
}

/**
 * Get Paddle product ID for specified language
 */
export function getPaddleProductId(productType: ProductType, language: 'es' | 'en'): string | undefined {
  const product = getProductInfo(productType);
  return language === 'es' ? product.paddleProductIdES : product.paddleProductIdEN;
}

/**
 * Check if product is available for purchase
 */
export function isProductAvailable(productType: ProductType): boolean {
  const product = getProductInfo(productType);
  return product.available;
}

/**
 * Get all available products
 */
export function getAvailableProducts(): ProductInfo[] {
  return Object.values(PRODUCT_CATALOG).filter(p => p.available);
}

/**
 * Format product display name (includes language)
 */
export function formatProductDisplayName(productType: ProductType, language: 'es' | 'en'): string {
  const product = getProductInfo(productType);
  const title = language === 'es' ? product.titleES : product.titleEN;
  return `${title} (${language.toUpperCase()})`;
}

/**
 * Calculate Paddle processing fee (5% + $0.50)
 * This is an estimate - actual fees may vary by payment method and region
 */
export function calculateProcessingFee(priceUSD: number): number {
  const percentageFee = priceUSD * 0.05; // 5%
  const fixedFee = 0.50; // $0.50
  return Math.round((percentageFee + fixedFee) * 100) / 100; // Round to 2 decimals
}

/**
 * Get total price including processing fee
 */
export function getPriceWithFee(productType: ProductType): { basePrice: number; fee: number; total: number } {
  const product = getProductInfo(productType);
  const basePrice = product.priceUSD;
  const fee = calculateProcessingFee(basePrice);
  const total = Math.round((basePrice + fee) * 100) / 100; // Round to 2 decimals
  
  return { basePrice, fee, total };
}
