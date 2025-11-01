// Testimonials and Social Proof Types

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  organization: string;
  location?: string;
  photo?: string;
  metrics?: string; // "Increased donations 40%"
  impact?: {
    metric: string;
    value: string;
    description: string;
  };
  featured?: boolean;
  market: 'LATAM' | 'USA' | 'GLOBAL';
  language: 'es' | 'en';
}

export interface TrustSignal {
  id: string;
  type: 'security' | 'compliance' | 'certification' | 'uptime' | 'clients';
  icon: string;
  title: string;
  description: string;
  value?: string; // "99.9%" for uptime, "200+" for clients
  verificationUrl?: string;
  market?: 'LATAM' | 'USA' | 'GLOBAL';
}

export interface TestimonialProps {
  testimonials?: Testimonial[];
  autoRotate?: boolean;
  rotationInterval?: number; // milliseconds
  showMetrics?: boolean;
  showPhotos?: boolean;
  variant?: 'cards' | 'carousel' | 'grid';
  className?: string;
}

export interface TrustSignalsProps {
  signals?: TrustSignal[];
  layout?: 'horizontal' | 'grid' | 'badges';
  showDescriptions?: boolean;
  animated?: boolean;
  className?: string;
  market?: 'LATAM' | 'USA' | 'GLOBAL';
}