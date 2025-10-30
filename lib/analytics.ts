// Google Analytics 4 implementation for KHESED-TEK - Global Markets
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Global market configuration
const MARKET_CONFIG = {
  LATAM: {
    countries: ['CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'VE', 'BO', 'PY', 'UY', 'CR', 'PA', 'GT', 'HN', 'NI', 'SV'],
    language: 'es' as const,
    currency: 'USD',
    timezone: 'America/Bogota'
  },
  USA: {
    countries: ['US'],
    language: 'en' as const,
    currency: 'USD', 
    timezone: 'America/New_York'
  },
  GLOBAL: {
    countries: [] as string[], // All other countries
    language: 'en' as const,
    currency: 'USD',
    timezone: 'UTC'
  }
} as const;

type MarketType = keyof typeof MARKET_CONFIG;

interface UserGeoData {
  country: string;
  region: string;
  market: MarketType;
  language: 'es' | 'en';
  timezone: string;
}

// Detect user market based on geolocation
export const detectUserMarket = async (): Promise<UserGeoData> => {
  try {
    // Try to get country from various sources
    let country = 'US'; // Default fallback
    
    // Method 1: Try Cloudflare headers (most reliable in production)
    if (typeof window !== 'undefined') {
      const response = await fetch('/api/geo-detect', { method: 'GET' });
      if (response.ok) {
        const geoData = await response.json();
        country = geoData.country || country;
      }
    }
    
    // Method 2: Browser timezone fallback
    if (country === 'US') {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.includes('America/Mexico') || timezone.includes('America/Argentina') || 
          timezone.includes('America/Colombia') || timezone.includes('America/Chile')) {
        country = timezone.includes('Mexico') ? 'MX' : 
                 timezone.includes('Argentina') ? 'AR' :
                 timezone.includes('Colombia') ? 'CO' : 'CL';
      }
    }
    
    // Determine market
    let market: MarketType = 'GLOBAL';
    if (MARKET_CONFIG.LATAM.countries.includes(country as any)) {
      market = 'LATAM';
    } else if (MARKET_CONFIG.USA.countries.includes(country as any)) {
      market = 'USA';
    }
    
    const config = MARKET_CONFIG[market];
    
    return {
      country,
      region: market,
      market,
      language: config.language,
      timezone: config.timezone
    };
  } catch (error) {
    console.warn('Geo-detection failed, using default:', error);
    return {
      country: 'US',
      region: 'USA', 
      market: 'USA',
      language: 'en',
      timezone: 'America/New_York'
    };
  }
};

// Enhanced page view tracking with market segmentation
export const pageview = (url: string, geoData?: UserGeoData) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
      custom_map: {
        custom_dimension_1: 'market',
        custom_dimension_2: 'country',
        custom_dimension_3: 'language'
      }
    });
    
    // Send geo-specific event
    if (geoData) {
      window.gtag('event', 'page_view_geo', {
        market: geoData.market,
        country: geoData.country,
        language: geoData.language,
        timezone: geoData.timezone
      });
    }
  }
};

// Enhanced event tracking with market context
export const event = ({ action, category, label, value, market, language }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  market?: MarketType;
  language?: 'es' | 'en';
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      market: market,
      language: language,
      // Custom dimensions for market analysis
      custom_dimension_1: market,
      custom_dimension_3: language
    });
  }
};

// Track form submissions with market segmentation
export const trackFormSubmission = (formType: string, success: boolean, geoData?: UserGeoData) => {
  event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'Lead Generation',
    label: `${formType}_${geoData?.market || 'unknown'}`,
    market: geoData?.market,
    language: geoData?.language
  });
  
  // Additional conversion tracking for markets
  if (success && geoData) {
    event({
      action: 'conversion',
      category: `Market_${geoData.market}`,
      label: formType,
      value: geoData.market === 'USA' ? 100 : 75, // Higher value for USA market
      market: geoData.market,
      language: geoData.language
    });
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaLocation: string, ctaText: string) => {
  event({
    action: 'cta_click',
    category: 'User Engagement',
    label: `${ctaLocation}: ${ctaText}`,
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (location: string) => {
  event({
    action: 'whatsapp_click',
    category: 'Contact',
    label: location,
  });
};

// Track email clicks
export const trackEmailClick = (location: string) => {
  event({
    action: 'email_click',
    category: 'Contact',
    label: location,
  });
};

// Track CRM sync events
export const trackCRMSync = (action: string, metadata: Record<string, any>) => {
  event({
    action: `crm_${action}`,
    category: 'CRM Integration',
    label: metadata.leadId || metadata.source || action,
    value: metadata.score,
  });
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}