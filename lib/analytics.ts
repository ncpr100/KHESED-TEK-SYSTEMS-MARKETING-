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
    let country = 'CO'; // Default to Colombia for Colombian users
    let market: MarketType = 'LATAM';
    let language: 'es' | 'en' = 'es';
    let region = 'Atlantico';
    let timezone = 'America/Bogota';
    
    // Method 1: Try Cloudflare headers (most reliable in production)
    if (typeof window !== 'undefined') {
      try {
        const response = await fetch('/api/geo-detect', { method: 'GET' });
        if (response.ok) {
          const geoData = await response.json();
          country = geoData.country || country;
          market = geoData.market || market;
          language = geoData.language || language;
          region = geoData.region || region;
          timezone = geoData.timezone || timezone;
        }
      } catch (error) {
        console.warn('Geo detection API failed, using Colombian defaults:', error);
      }
    }
    
    // Method 2: Browser timezone fallback
    if (country === 'CO' || country === 'US') {
      const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (browserTimezone.includes('America/Mexico') || browserTimezone.includes('America/Argentina') || 
          browserTimezone.includes('America/Colombia') || browserTimezone.includes('America/Chile')) {
        country = browserTimezone.includes('Mexico') ? 'MX' : 
                 browserTimezone.includes('Argentina') ? 'AR' :
                 browserTimezone.includes('Colombia') ? 'CO' : 'CL';
        market = 'LATAM';
        language = 'es';
        timezone = 'America/Bogota';
      }
    }
    
    // Additional validation for market determination
    if (MARKET_CONFIG.LATAM.countries.includes(country as any)) {
      market = 'LATAM';
    } else if (MARKET_CONFIG.USA.countries.includes(country as any)) {
      market = 'USA';
    } else {
      market = 'GLOBAL';
    }
    
    const config = MARKET_CONFIG[market];
    
    return {
      country,
      region,
      market,
      language,
      timezone
    };
  } catch (error) {
    console.warn('Geo-detection failed, using Colombian default:', error);
    return {
      country: 'CO',
      region: 'Atlantico', 
      market: 'LATAM',
      language: 'es',
      timezone: 'America/Bogota'
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