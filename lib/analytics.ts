// Google Analytics 4 implementation for KHESED-TEK - Global Markets
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-J8QN6G9SQN';

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

// Enhanced event tracking with market context and custom dimensions
export const trackEvent = async (
  action: string,
  category: string = 'engagement',
  label?: string,
  value?: number,
  market?: MarketType,
  customParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const geoData = await detectUserMarket();
    const effectiveMarket = market || geoData.market;
    const marketConfig = MARKET_CONFIG[effectiveMarket];
    
    const eventParams: any = {
      event_category: category,
      event_label: label,
      value: value,
      // Market segmentation custom dimensions
      custom_parameter_market: effectiveMarket,
      custom_parameter_country: geoData.country,
      custom_parameter_region: geoData.region,
      custom_parameter_language: marketConfig.language,
      custom_parameter_timezone: marketConfig.timezone,
      custom_parameter_currency: marketConfig.currency,
      custom_parameter_timestamp: new Date().toISOString(),
      // User journey tracking
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer,
      // Session context
      session_id: getSessionId(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      ...customParams
    };

    // Add geo context if available (non-blocking)
    if (typeof window !== 'undefined' && 'navigator' in window && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          eventParams.custom_parameter_latitude = position.coords.latitude;
          eventParams.custom_parameter_longitude = position.coords.longitude;
          eventParams.custom_parameter_accuracy = position.coords.accuracy;
        },
        () => {
          // Silently fail - no geo data
        },
        { timeout: 1000, enableHighAccuracy: false }
      );
    }

    window.gtag('event', action, eventParams);
    
    // Also send to console in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', action, eventParams);
    }
  }
};

// Session ID management for user journey tracking
let sessionId: string | null = null;
const getSessionId = (): string => {
  if (!sessionId) {
    sessionId = sessionStorage.getItem('khesed_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('khesed_session_id', sessionId);
    }
  }
  return sessionId;
};

// Track form submissions with market segmentation
export const trackFormSubmission = async (formType: string, success: boolean, geoData?: UserGeoData) => {
  await trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'Lead Generation',
    `${formType}_${geoData?.market || 'unknown'}`,
    undefined,
    geoData?.market,
    {
      form_type: formType,
      success: success,
      market_context: geoData?.market,
      user_language: geoData?.language
    }
  );
  
  // Additional conversion tracking for markets
  if (success && geoData) {
    await trackEvent(
      'conversion',
      `Market_${geoData.market}`,
      formType,
      geoData.market === 'USA' ? 100 : 75, // Higher value for USA market
      geoData.market,
      {
        conversion_type: 'lead_generation',
        market_value: geoData.market === 'USA' ? 'high' : 'medium',
        user_language: geoData.language
      }
    );
  }
};

// Track CTA clicks with enhanced market context
export const trackCTAClick = async (ctaLocation: string, ctaText: string) => {
  await trackEvent(
    'cta_click',
    'User Engagement',
    `${ctaLocation}: ${ctaText}`,
    undefined,
    undefined,
    {
      cta_location: ctaLocation,
      cta_text: ctaText,
      interaction_type: 'click'
    }
  );
};

// Track WhatsApp clicks with market awareness
export const trackWhatsAppClick = async (location: string) => {
  await trackEvent(
    'whatsapp_click',
    'Contact',
    location,
    undefined,
    undefined,
    {
      contact_method: 'whatsapp',
      contact_location: location,
      contact_preference: 'instant_messaging'
    }
  );
};

// Track email clicks with enhanced context
export const trackEmailClick = async (location: string) => {
  await trackEvent(
    'email_click',
    'Contact',
    location,
    undefined,
    undefined,
    {
      contact_method: 'email',
      contact_location: location,
      contact_preference: 'email'
    }
  );
};

// Track CRM sync events with detailed metadata
export const trackCRMSync = async (action: string, metadata: Record<string, any>) => {
  await trackEvent(
    `crm_${action}`,
    'CRM Integration',
    metadata.leadId || metadata.source || action,
    metadata.score,
    undefined,
    {
      crm_action: action,
      lead_id: metadata.leadId,
      lead_source: metadata.source,
      lead_score: metadata.score,
      integration_status: 'active'
    }
  );
};

// Enhanced E-commerce Events for Lead Generation

// Track demo request as e-commerce "purchase"
export const trackDemoRequest = async (formData: any, geoData?: UserGeoData) => {
  const itemValue = geoData?.market === 'USA' ? 500 : 300; // Lead value by market
  
  // E-commerce purchase event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      value: itemValue,
      currency: 'USD',
      items: [{
        item_id: 'demo_request',
        item_name: 'Demo Request',
        item_category: 'Lead Generation',
        item_variant: geoData?.market || 'GLOBAL',
        quantity: 1,
        price: itemValue
      }],
      // Custom parameters for lead qualification
      lead_source: 'website',
      lead_type: 'demo_request',
      market: geoData?.market,
      organization_name: formData.organization,
      contact_method: formData.whatsapp ? 'whatsapp' : 'email'
    });
  }
  
  // Also track as conversion event
  await trackEvent(
    'demo_request_conversion',
    'Lead Generation',
    `demo_${geoData?.market}`,
    itemValue,
    geoData?.market,
    {
      conversion_type: 'demo_request',
      lead_quality: geoData?.market === 'USA' ? 'high' : 'medium',
      organization: formData.organization,
      demo_preference: formData.demo_preference
    }
  );
};

// Track contact form submissions as lead events
export const trackContactSubmission = async (formData: any, geoData?: UserGeoData) => {
  const leadValue = geoData?.market === 'USA' ? 200 : 150;
  
  // E-commerce add_to_cart event (interest shown)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: leadValue,
      items: [{
        item_id: 'contact_inquiry',
        item_name: 'Contact Inquiry',
        item_category: 'Lead Generation',
        item_variant: geoData?.market || 'GLOBAL',
        quantity: 1,
        price: leadValue
      }]
    });
  }
  
  await trackEvent(
    'contact_inquiry',
    'Lead Generation',
    `contact_${geoData?.market}`,
    leadValue,
    geoData?.market,
    {
      inquiry_type: 'general_contact',
      lead_source: 'contact_form',
      message_length: formData.message?.length || 0
    }
  );
};

// Track service page views as product views
export const trackServiceView = async (serviceName: string, geoData?: UserGeoData) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: 50, // Base interest value
      items: [{
        item_id: serviceName.toLowerCase().replace(/\s+/g, '_'),
        item_name: serviceName,
        item_category: 'Services',
        item_variant: geoData?.market || 'GLOBAL'
      }]
    });
  }
  
  await trackEvent(
    'service_view',
    'Product Interest',
    serviceName,
    undefined,
    geoData?.market,
    {
      service_name: serviceName,
      interest_level: 'viewing'
    }
  );
};

// Enhanced User Journey Tracking

// Track user engagement milestones
export const trackEngagementMilestone = async (milestone: string, details?: Record<string, any>) => {
  await trackEvent(
    'engagement_milestone',
    'User Journey',
    milestone,
    undefined,
    undefined,
    {
      milestone_type: milestone,
      session_id: getSessionId(),
      time_on_site: details?.timeOnSite,
      pages_viewed: details?.pagesViewed,
      scroll_depth: details?.scrollDepth
    }
  );
};

// Track conversion funnel steps
export const trackFunnelStep = async (step: string, stepNumber: number, geoData?: UserGeoData) => {
  await trackEvent(
    'funnel_step',
    'Conversion Funnel',
    step,
    stepNumber,
    geoData?.market,
    {
      funnel_step: step,
      step_number: stepNumber,
      funnel_type: 'lead_generation',
      market_segment: geoData?.market
    }
  );
};

// Performance and Technical Tracking

// Track Core Web Vitals
export const trackWebVitals = async (metric: any) => {
  await trackEvent(
    'web_vitals',
    'Performance',
    metric.name,
    Math.round(metric.value),
    undefined,
    {
      metric_name: metric.name,
      metric_value: metric.value,
      metric_rating: metric.rating,
      navigation_type: metric.navigationType
    }
  );
};

// Track page load performance
export const trackPagePerformance = async (metrics: Record<string, number>) => {
  await trackEvent(
    'page_performance',
    'Performance',
    'load_metrics',
    Math.round(metrics.loadTime || 0),
    undefined,
    {
      load_time: metrics.loadTime,
      first_paint: metrics.firstPaint,
      largest_contentful_paint: metrics.lcp,
      cumulative_layout_shift: metrics.cls,
      first_input_delay: metrics.fid
    }
  );
};

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}