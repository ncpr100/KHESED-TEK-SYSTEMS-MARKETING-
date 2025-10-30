// A/B Testing framework for KHESED-TEK
'use client';

import { useEffect, useState } from 'react';

// A/B test variants configuration
export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // 0-100, should sum to 100 across all variants
}

export interface ABTest {
  testId: string;
  testName: string;
  variants: ABTestVariant[];
  storageKey: string;
}

// Hero headline variations
export const HERO_HEADLINE_TEST: ABTest = {
  testId: 'hero_headline_v1',
  testName: 'Hero Headline Test',
  variants: [
    { id: 'control', name: 'Innovación que impulsa tu misión', weight: 50 },
    { id: 'variant_a', name: 'Tecnología que transforma tu iglesia', weight: 25 },
    { id: 'variant_b', name: 'Soluciones digitales para tu comunidad', weight: 25 },
  ],
  storageKey: 'ab_test_hero_headline',
};

// CTA button variations
export const CTA_BUTTON_TEST: ABTest = {
  testId: 'cta_button_v1',
  testName: 'CTA Button Test',
  variants: [
    { id: 'control', name: 'Hablar con nosotros →', weight: 50 },
    { id: 'variant_a', name: 'Solicitar demo gratuito →', weight: 25 },
    { id: 'variant_b', name: 'Comenzar ahora →', weight: 25 },
  ],
  storageKey: 'ab_test_cta_button',
};

// Form title variations
export const FORM_TITLE_TEST: ABTest = {
  testId: 'form_title_v1',
  testName: 'Form Title Test',
  variants: [
    { id: 'control', name: 'Solicitar información y demo', weight: 50 },
    { id: 'variant_a', name: 'Agenda tu demo personalizada', weight: 25 },
    { id: 'variant_b', name: 'Descubre nuestras soluciones', weight: 25 },
  ],
  storageKey: 'ab_test_form_title',
};

// Hook to get A/B test variant
export function useABTest(test: ABTest): string {
  const [variant, setVariant] = useState<string>('control');

  useEffect(() => {
    // Check if user already has a variant assigned
    const storedVariant = localStorage.getItem(test.storageKey);
    
    if (storedVariant && test.variants.some(v => v.id === storedVariant)) {
      setVariant(storedVariant);
    } else {
      // Assign new variant based on weights
      const selectedVariant = selectVariantByWeight(test.variants);
      setVariant(selectedVariant);
      localStorage.setItem(test.storageKey, selectedVariant);
      
      // Track test assignment
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_assigned', {
          event_category: 'A/B Testing',
          event_label: `${test.testId}:${selectedVariant}`,
          custom_parameter_test_id: test.testId,
          custom_parameter_variant: selectedVariant,
        });
      }
    }
  }, [test]);

  return variant;
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

// Get variant content
export function getVariantContent(test: ABTest, variantId: string): string {
  const variant = test.variants.find(v => v.id === variantId);
  return variant?.name || test.variants[0]?.name || '';
}

// Track A/B test conversion
export function trackABTestConversion(testId: string, variantId: string, conversionType: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      event_category: 'A/B Testing',
      event_label: `${testId}:${variantId}:${conversionType}`,
      custom_parameter_test_id: testId,
      custom_parameter_variant: variantId,
      custom_parameter_conversion_type: conversionType,
    });
  }
}

// Reset all A/B tests (for testing purposes)
export function resetAllABTests() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(HERO_HEADLINE_TEST.storageKey);
    localStorage.removeItem(CTA_BUTTON_TEST.storageKey);
    localStorage.removeItem(FORM_TITLE_TEST.storageKey);
  }
}