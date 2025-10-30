// Google Analytics 4 implementation for KHESED-TEK
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formType: string, success: boolean) => {
  event({
    action: success ? 'form_submit_success' : 'form_submit_error',
    category: 'Lead Generation',
    label: formType,
  });
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