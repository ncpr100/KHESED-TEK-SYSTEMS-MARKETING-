// Pricing Plan Types for KHESED-TEK SYSTEMS

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string; // For showing discounts
  period: string;
  members: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  ctaText?: string;
  ctaUrl?: string;
  discount?: {
    amount: string;
    type: 'percentage' | 'fixed';
    label: string;
  };
}

export interface MarketPricing {
  currency: 'USD' | 'COP' | 'EUR' | 'GBP';
  symbol: string;
  plans: PricingPlan[];
  localizedFeatures?: Record<string, string>;
  paymentMethods?: string[];
  taxInfo?: string;
}

export interface PricingConfig {
  LATAM: MarketPricing;
  USA: MarketPricing;
  GLOBAL: MarketPricing;
}

// Standard pricing tiers
export const PRICING_TIERS = {
  SMALL: 'small',
  MEDIUM: 'medium', 
  LARGE: 'large'
} as const;

export type PricingTier = typeof PRICING_TIERS[keyof typeof PRICING_TIERS];

// Pricing animation states
export interface PricingCardState {
  isHovered: boolean;
  isSelected: boolean;
  isLoading: boolean;
}

// Currency conversion interface
export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: Date;
}

export interface LocalizedPrice {
  amount: number;
  currency: string;
  symbol: string;
  formatted: string;
  isEstimate?: boolean;
}

// Public pricing config — consumed by /public/calc-v2-public-dual.html via /api/public/pricing-config
export interface PublicPlanConfig {
  tier: string;
  n: string;
  tl: string;
  color: string;
  price: number;
  maxM: number;
  maxV: number;
  maxS: number;
  waI: number;
  waO: number;
  ag12: boolean;
  ag: number[];
  bespoke: boolean;
  network: boolean;
  cta: string;
  ctaHref: string;
}

export interface WaCountryRate {
  countryCode: string;
  ratePerConv: number;
}

export interface PublicPricingConfigResponse {
  plans: PublicPlanConfig[];
  rates: WaCountryRate[];
}