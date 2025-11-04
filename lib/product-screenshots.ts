// Product screenshot data for image carousel fallback
import { CarouselImage } from '@/components/ui/image-carousel';

export interface ProductScreenshots {
  LATAM: CarouselImage[];
  USA: CarouselImage[];
  GLOBAL: CarouselImage[];
}

// LATAM Market Screenshots (Spanish)
const LATAM_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/placeholder-dashboard.svg',
    alt: 'Panel Principal KHESED-TEK',
    title: 'Panel de Control Principal',
    description: 'Vista general del dashboard con métricas clave de la iglesia'
  },
  {
    src: '/images/product-screenshots/placeholder-members.svg', 
    alt: 'Gestión de Miembros',
    title: 'Gestión de Miembros',
    description: 'Sistema completo para administrar la base de datos de miembros'
  },
  {
    src: '/images/product-screenshots/placeholder-donations.svg',
    alt: 'Sistema de Donaciones',
    title: 'Donaciones en Línea',
    description: 'Procesamiento seguro de donaciones con reportes en tiempo real'
  },
  {
    src: '/images/product-screenshots/placeholder-volunteers.svg',
    alt: 'Gestión de Voluntarios',
    title: 'Coordinación de Voluntarios',
    description: 'Organiza y gestiona tu equipo de servicio en todos los ministerios'
  },
  {
    src: '/images/product-screenshots/placeholder-sermons.svg',
    alt: 'Asistente de Sermones',
    title: 'Planificador de Sermones',
    description: 'Herramientas avanzadas para preparar y organizar predicaciones'
  },
  {
    src: '/images/product-screenshots/placeholder-insights.svg',
    alt: 'Insights Pastorales',
    title: 'Análisis Pastoral',
    description: 'Insights inteligentes para el cuidado y crecimiento de la congregación'
  }
];

// USA Market Screenshots (English)
const USA_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/placeholder-dashboard.svg',
    alt: 'KHESED-TEK Main Dashboard',
    title: 'Executive Dashboard',
    description: 'Comprehensive overview with key church metrics and KPIs'
  },
  {
    src: '/images/product-screenshots/placeholder-members.svg',
    alt: 'Member Management System',
    title: 'Member Management',
    description: 'Complete CRM system for church member administration'
  },
  {
    src: '/images/product-screenshots/placeholder-donations.svg',
    alt: 'Online Giving Platform',
    title: 'Digital Giving Platform',
    description: 'Secure donation processing with real-time financial tracking'
  },
  {
    src: '/images/product-screenshots/placeholder-volunteers.svg',
    alt: 'Volunteer Management',
    title: 'Volunteer Coordination',
    description: 'Organize and manage your ministry service teams efficiently'
  },
  {
    src: '/images/product-screenshots/placeholder-sermons.svg',
    alt: 'Sermon Planning Tool',
    title: 'Sermon Assistant',
    description: 'Advanced tools for sermon preparation and preaching calendar'
  },
  {
    src: '/images/product-screenshots/placeholder-insights.svg',
    alt: 'Pastoral Analytics',
    title: 'Pastoral Insights',
    description: 'AI-powered analytics for pastoral care and congregation growth'
  }
];

// Global Market Screenshots (Multi-language)
const GLOBAL_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/placeholder-dashboard.svg',
    alt: 'KHESED-TEK Global Dashboard',
    title: 'Multi-Language Dashboard',
    description: 'Global church management with multi-timezone support'
  },
  {
    src: '/images/product-screenshots/placeholder-donations.svg',
    alt: 'Multi-Currency Support',
    title: 'International Giving',
    description: 'Support for multiple currencies and payment methods worldwide'
  },
  {
    src: '/images/product-screenshots/placeholder-members.svg',
    alt: 'Global Compliance',
    title: 'International Compliance',
    description: 'GDPR, data privacy, and regional compliance features'
  },
  {
    src: '/images/product-screenshots/placeholder-volunteers.svg',
    alt: 'Global Volunteer Management',
    title: 'Worldwide Ministry Teams',
    description: 'Coordinate volunteers across multiple locations and time zones'
  },
  {
    src: '/images/product-screenshots/placeholder-sermons.svg',
    alt: 'Multi-Language Preaching',
    title: 'Global Sermon Planning',
    description: 'Sermon tools with multi-language support and cultural adaptation'
  },
  {
    src: '/images/product-screenshots/placeholder-insights.svg',
    alt: 'Global Church Analytics',
    title: 'International Insights',
    description: 'Cross-cultural analytics and worldwide ministry effectiveness metrics'
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
  dashboard: '/images/product-screenshots/placeholder-dashboard.svg',
  members: '/images/product-screenshots/placeholder-members.svg',
  donations: '/images/product-screenshots/placeholder-donations.svg',
  events: '/images/product-screenshots/placeholder-events.svg',
  reports: '/images/product-screenshots/placeholder-reports.svg',
  communication: '/images/product-screenshots/placeholder-communication.svg'
};