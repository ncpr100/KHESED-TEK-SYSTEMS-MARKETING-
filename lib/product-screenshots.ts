// Product screenshot data for image carousel fallback
import { CarouselImage } from '@/components/ui/image-carousel';

export interface ProductScreenshots {
  LATAM: CarouselImage[];
  USA: CarouselImage[];
  GLOBAL: CarouselImage[];
}

// LATAM Market Screenshots (Spanish) - REAL APPLICATION SCREENSHOTS
const LATAM_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/dashboard.png',
    alt: 'Panel Principal KHESED-TEK',
    title: '',
    description: 'Panel de control con métricas avanzadas de la iglesia'
  },
  {
    src: '/images/product-screenshots/members.png', 
    alt: 'Gestión de Miembros Real',
    title: '',
    description: 'Base de datos completa de miembros y seguimiento congregacional'
  },
  {
    src: '/images/product-screenshots/donations.png',
    alt: 'Sistema de Donaciones Real',
    title: '',
    description: 'Procesamiento seguro de donaciones y ofrendas en línea'
  },
  {
    src: '/images/product-screenshots/volunteers.png',
    alt: 'Gestión de Voluntarios Real',
    title: '',
    description: 'Coordinación eficiente de equipos ministeriales y voluntarios'
  },
  {
    src: '/images/product-screenshots/sermons.png',
    alt: 'Asistente de Sermones Real',
    title: '',
    description: 'Herramientas avanzadas para preparación de predicaciones'
  },
  {
    src: '/images/product-screenshots/insights.png',
    alt: 'Insights Pastorales Real',
    title: '',
    description: 'Analytics pastorales con insights inteligentes para crecimiento'
  },
  {
    src: '/images/product-screenshots/login-signup.png',
    alt: 'Sistema de Acceso KHESED-TEK',
    title: '',
    description: 'Acceso seguro al sistema de gestión integral de iglesias'
  }
];

// USA Market Screenshots (English) - REAL APPLICATION SCREENSHOTS
const USA_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/dashboard.png',
    alt: 'KHESED-TEK Real Dashboard',
    title: '',
    description: 'Real church management dashboard with comprehensive metrics and insights'
  },
  {
    src: '/images/product-screenshots/members.png',
    alt: 'Real Member Management System',
    title: '',
    description: 'Live member database with complete CRM functionality and tracking'
  },
  {
    src: '/images/product-screenshots/donations.png',
    alt: 'Online Giving Platform',
    title: '',
    description: 'Secure multi-channel donation processing with real-time financial tracking'
  },
  {
    src: '/images/product-screenshots/volunteers.png',
    alt: 'AI-Powered Volunteer Management',
    title: '',
    description: 'Automated recruitment pipeline and volunteer management with artificial intelligence'
  },
  {
    src: '/images/product-screenshots/sermons.png',
    alt: 'KHESED-TEK Sermon Management',
    title: '',
    description: 'Advanced sermon preparation and preaching calendar with AI-powered tools'
  },
  {
    src: '/images/product-screenshots/insights.png',
    alt: 'Pastoral Analytics Dashboard',
    title: '',
    description: 'AI-powered analytics for donations, membership growth, and ministry effectiveness metrics'
  },
  {
    src: '/images/product-screenshots/login-signup.png',
    alt: 'KHESED-TEK Login System',
    title: '',
    description: 'Secure access to comprehensive church management platform'
  }
];

// Global Market Screenshots (Multi-language) - REAL APPLICATION SCREENSHOTS
const GLOBAL_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/dashboard.png',
    alt: 'KHESED-TEK Global Dashboard',
    title: '',
    description: 'Global church management with pastoral insights and multi-timezone support'
  },
  {
    src: '/images/product-screenshots/donations.png',
    alt: 'Multi-Currency Support',
    title: '',
    description: 'Support for multiple currencies and payment methods worldwide with secure processing'
  },
  {
    src: '/images/product-screenshots/members.png',
    alt: 'Global Compliance',
    title: '',
    description: 'GDPR, data privacy, and regional compliance features with member management'
  },
  {
    src: '/images/product-screenshots/volunteers.png',
    alt: 'Global AI Volunteer Management',
    title: '',
    description: 'Intelligent volunteer coordination across multiple locations and time zones'
  },
  {
    src: '/images/product-screenshots/sermons.png',
    alt: 'Multi-Language Sermon Planning',
    title: '',
    description: 'AI-powered sermon tools with multi-language support and cultural adaptation'
  },
  {
    src: '/images/product-screenshots/insights.png',
    alt: 'Global Church Analytics',
    title: '',
    description: 'Cross-cultural analytics and worldwide ministry effectiveness with AI intelligence'
  },
  {
    src: '/images/product-screenshots/login-signup.png',
    alt: 'Sistema de Acesso KHESED-TEK',
    title: '',
    description: 'Acesso seguro ao sistema de gestão abrangente de igrejas'
  }
];

export const PRODUCT_SCREENSHOTS: ProductScreenshots = {
  LATAM: LATAM_SCREENSHOTS,
  USA: USA_SCREENSHOTS,
  GLOBAL: GLOBAL_SCREENSHOTS
};

// Helper function to get screenshots by market
export function getScreenshotsByMarket(market: 'LATAM' | 'USA' | 'GLOBAL'): CarouselImage[] {
  return PRODUCT_SCREENSHOTS[market] || PRODUCT_SCREENSHOTS.LATAM;
}

// Fallback placeholder images (solid color backgrounds with icons)
export const PLACEHOLDER_SCREENSHOTS = {
  dashboard: '/images/product-screenshots/dashboard.png',
  members: '/images/product-screenshots/members.png',
  donations: '/images/product-screenshots/donations.png',
  events: '/images/product-screenshots/events.png',
  reports: '/images/product-screenshots/reports.png',
  communication: '/images/product-screenshots/communication.png'
};