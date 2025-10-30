// A/B Testing framework for KHESED-TEK - Global Markets
'use client';

import { useEffect, useState } from 'react';

// A/B test variants configuration with market support
export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-100, should sum to 100 across all variants
  markets?: ('LATAM' | 'USA' | 'GLOBAL')[]; // Restrict to specific markets
}

export interface ABTest {
  testId: string;
  testName: string;
  variants: ABTestVariant[];
  storageKey: string;
  markets?: ('LATAM' | 'USA' | 'GLOBAL')[]; // Test only in specific markets
}

// Market-specific content variations
export interface MarketContent {
  es: string; // Spanish for LATAM
  en: string; // English for USA/Global
}

// Hero headline variations - Multi-market
export const HERO_HEADLINE_TEST: ABTest = {
  testId: 'hero_headline_global_v1',
  testName: 'Hero Headline Global Test',
  variants: [
    { 
      id: 'control', 
      name: 'Innovación que impulsa tu misión', // Will be translated based on market
      weight: 50 
    },
    { 
      id: 'variant_a', 
      name: 'Tecnología que transforma tu iglesia', 
      weight: 25 
    },
    { 
      id: 'variant_b', 
      name: 'Soluciones digitales para tu comunidad', 
      weight: 25 
    },
  ],
  storageKey: 'ab_test_hero_headline_global',
};

// Market-specific headline content
export const HERO_HEADLINE_CONTENT: Record<string, MarketContent> = {
  control: {
    es: 'Innovación que impulsa tu misión',
    en: 'Innovation that drives your mission'
  },
  variant_a: {
    es: 'Tecnología que transforma tu iglesia',
    en: 'Technology that transforms your church'
  },
  variant_b: {
    es: 'Soluciones digitales para tu comunidad',
    en: 'Digital solutions for your community'
  }
};

// CTA button variations - Multi-market
export const CTA_BUTTON_TEST: ABTest = {
  testId: 'cta_button_global_v1',
  testName: 'CTA Button Global Test',
  variants: [
    { id: 'control', name: 'Hablar con nosotros →', weight: 50 },
    { id: 'variant_a', name: 'Solicitar demo gratuito →', weight: 25 },
    { id: 'variant_b', name: 'Comenzar ahora →', weight: 25 },
  ],
  storageKey: 'ab_test_cta_button_global',
};

export const CTA_BUTTON_CONTENT: Record<string, MarketContent> = {
  control: {
    es: 'Hablar con nosotros →',
    en: 'Talk to us →'
  },
  variant_a: {
    es: 'Solicitar demo gratuito →',
    en: 'Request free demo →'
  },
  variant_b: {
    es: 'Comenzar ahora →',
    en: 'Get started now →'
  }
};

// Form title variations - Contact page optimization
export const FORM_TITLE_TEST: ABTest = {
  testId: 'form_title_v1',
  testName: 'Contact Form Title Test',
  variants: [
    { id: 'control', name: 'Solicitar demostración', weight: 50 },
    { id: 'variant_a', name: 'Obtener demo gratuito', weight: 25 },
    { id: 'variant_b', name: 'Reservar consulta', weight: 25 },
  ],
  storageKey: 'ab_test_form_title',
};

export const FORM_TITLE_CONTENT: Record<string, MarketContent> = {
  control: {
    es: 'Solicitar demostración',
    en: 'Request demonstration'
  },
  variant_a: {
    es: 'Obtener demo gratuito',
    en: 'Get free demo'
  },
  variant_b: {
    es: 'Reservar consulta',
    en: 'Schedule consultation'
  }
};

// USA-specific A/B test (only runs for USA market)
export const USA_VALUE_PROP_TEST: ABTest = {
  testId: 'usa_value_prop_v1',
  testName: 'USA Value Proposition Test',
  variants: [
    { id: 'control', name: 'Enterprise church management solutions', weight: 50, markets: ['USA'] },
    { id: 'variant_a', name: 'Scalable ministry technology platform', weight: 25, markets: ['USA'] },
    { id: 'variant_b', name: 'Next-generation church software suite', weight: 25, markets: ['USA'] },
  ],
  storageKey: 'ab_test_usa_value_prop',
  markets: ['USA'] // Only run this test for USA market
};

// Enhanced hook to get A/B test variant with market support
export function useABTest(test: ABTest, userMarket?: 'LATAM' | 'USA' | 'GLOBAL'): string {
  const [variant, setVariant] = useState<string>('control');

  useEffect(() => {
    // Check if test should run for this market
    if (test.markets && userMarket && !test.markets.includes(userMarket)) {
      setVariant('control'); // Default to control if market not supported
      return;
    }

    // Check if user already has a variant assigned
    const storedVariant = localStorage.getItem(test.storageKey);
    
    if (storedVariant && test.variants.some(v => v.id === storedVariant)) {
      // Verify variant is valid for current market
      const storedVariantData = test.variants.find(v => v.id === storedVariant);
      if (!storedVariantData?.markets || !userMarket || storedVariantData.markets.includes(userMarket)) {
        setVariant(storedVariant);
        return;
      }
    }
    
    // Filter variants for current market
    const availableVariants = test.variants.filter(variant => 
      !variant.markets || !userMarket || variant.markets.includes(userMarket)
    );

    // Assign new variant based on weights
    const selectedVariant = selectVariantByWeight(availableVariants);
    setVariant(selectedVariant);
    localStorage.setItem(test.storageKey, selectedVariant);
    
    // Track test assignment with market context
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_assigned', {
        event_category: 'A/B Testing',
        event_label: `${test.testId}:${selectedVariant}`,
        custom_parameter_test_id: test.testId,
        custom_parameter_variant: selectedVariant,
        custom_parameter_market: userMarket || 'unknown',
      });
    }
  }, [test, userMarket]);

  return variant;
}

// Get market-specific variant content
export function getVariantContent(
  test: ABTest, 
  variantId: string, 
  language: 'es' | 'en' = 'es',
  contentMap?: Record<string, MarketContent>
): string {
  const variant = test.variants.find(v => v.id === variantId);
  const defaultContent = variant?.name || test.variants[0]?.name || '';
  
  // Return localized content if available
  if (contentMap && contentMap[variantId]) {
    return contentMap[variantId][language] || defaultContent;
  }
  
  return defaultContent;
}

// Track A/B test conversion with market context
export function trackABTestConversion(
  testId: string, 
  variantId: string, 
  conversionType: string,
  userMarket?: 'LATAM' | 'USA' | 'GLOBAL'
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      event_category: 'A/B Testing',
      event_label: `${testId}:${variantId}:${conversionType}`,
      custom_parameter_test_id: testId,
      custom_parameter_variant: variantId,
      custom_parameter_conversion_type: conversionType,
      custom_parameter_market: userMarket || 'unknown',
    });
  }
}

// Select variant based on weights
function selectVariantByWeight(variants: ABTestVariant[]): string {
  const random = Math.random() * 100;
  let cumulativeWeight = 0;

  for (const variant of variants) {
    cumulativeWeight += variant.weight;
    if (random <= cumulativeWeight) {
      return variant.id;
    }
  }

  // Fallback to control
  return variants[0]?.id || 'control';
}

// Reset all A/B tests (for testing purposes)
export function resetAllABTests() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(HERO_HEADLINE_TEST.storageKey);
    localStorage.removeItem(CTA_BUTTON_TEST.storageKey);
    localStorage.removeItem(USA_VALUE_PROP_TEST.storageKey);
  }
}