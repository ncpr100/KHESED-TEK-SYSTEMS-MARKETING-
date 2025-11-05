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
    title: 'Dashboard Real',
    description: 'Captura real del panel de control con métricas de la iglesia'
  },
  {
    src: '/images/product-screenshots/members.png', 
    alt: 'Gestión de Miembros Real',
    title: 'Sistema de Miembros',
    description: 'Interfaz real de gestión de miembros y base de datos congregacional'
  },
  {
    src: '/images/product-screenshots/donations.png',
    alt: 'Sistema de Donaciones Real',
    title: 'Donaciones en Vivo',
    description: 'Captura real del sistema de procesamiento de donaciones y ofrendas'
  },
  {
    src: '/images/product-screenshots/volunteers.png',
    alt: 'Gestión de Voluntarios Real',
    title: 'Coordinación de Voluntarios',
    description: 'Sistema real de gestión y coordinación de equipos de servicio'
  },
  {
    src: '/images/product-screenshots/sermons.png',
    alt: 'Asistente de Sermones Real',
    title: 'Planificador de Sermones',
    description: 'Herramientas reales para preparación y organización de predicaciones'
  },
  {
    src: '/images/product-screenshots/insights.png',
    alt: 'Insights Pastorales Real',
    title: 'Análisis Pastoral',
    description: 'Dashboard real con insights inteligentes para crecimiento congregacional'
  }
];

// USA Market Screenshots (English) - REAL APPLICATION SCREENSHOTS
const USA_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/dashboard.png',
    alt: 'KHESED-TEK Real Dashboard',
    title: 'Live Dashboard',
    description: 'Real church management dashboard with comprehensive metrics and insights'
  },
  {
    src: '/images/product-screenshots/members.png',
    alt: 'Real Member Management System',
    title: 'Member Management',
    description: 'Live member database with complete CRM functionality and tracking'
  },
  {
    src: '/images/product-screenshots/donations.png',
    alt: 'Online Giving Platform',
    title: 'Digital Giving Platform',
    description: 'Secure multi-channel donation processing with real-time financial tracking'
  },
  {
    src: '/images/product-screenshots/volunteers.png',
    alt: 'AI-Powered Volunteer Management',
    title: 'Intelligent Volunteer Coordination',
    description: 'Automated recruitment pipeline and volunteer management with artificial intelligence'
  },
  {
    src: '/images/product-screenshots/sermons.png',
    alt: 'KHESED-TEK Sermon Management',
    title: 'AI Sermon Assistant',
    description: 'Advanced sermon preparation and preaching calendar with AI-powered tools'
  },
  {
    src: '/images/product-screenshots/insights.png',
    alt: 'Pastoral Analytics Dashboard',
    title: 'Advanced Pastoral Insights',
    description: 'AI-powered analytics for donations, membership growth, and ministry effectiveness metrics'
  }
];

// Global Market Screenshots (Multi-language) - REAL APPLICATION SCREENSHOTS
const GLOBAL_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/dashboard.png',
    alt: 'KHESED-TEK Global Dashboard',
    title: 'Multi-Language Dashboard',
    description: 'Global church management with pastoral insights and multi-timezone support'
  },
  {
    src: '/images/product-screenshots/donations.png',
    alt: 'Multi-Currency Support',
    title: 'International Giving',
    description: 'Support for multiple currencies and payment methods worldwide with secure processing'
  },
  {
    src: '/images/product-screenshots/members.png',
    alt: 'Global Compliance',
    title: 'International Compliance',
    description: 'GDPR, data privacy, and regional compliance features with member management'
  },
  {
    src: '/images/product-screenshots/volunteers.png',
    alt: 'Global AI Volunteer Management',
    title: 'Worldwide Ministry Teams with AI',
    description: 'Intelligent volunteer coordination across multiple locations and time zones'
  },
  {
    src: '/images/product-screenshots/sermons.png',
    alt: 'Multi-Language Sermon Planning',
    title: 'Global Sermon Planning with AI',
    description: 'AI-powered sermon tools with multi-language support and cultural adaptation'
  },
  {
    src: '/images/product-screenshots/insights.png',
    alt: 'Global Church Analytics',
    title: 'International Ministry Insights',
    description: 'Cross-cultural analytics and worldwide ministry effectiveness with AI intelligence'
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