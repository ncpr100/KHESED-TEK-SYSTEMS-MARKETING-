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
    src: '/images/product-screenshots/placeholder-dashboard.svg',
    alt: 'Calendario de Eventos',
    title: 'Planificación de Eventos',
    description: 'Gestión completa de eventos y actividades de la iglesia'
  },
  {
    src: '/images/product-screenshots/placeholder-members.svg',
    alt: 'Reportes Avanzados',
    title: 'Reportes y Analytics',
    description: 'Análisis detallado con gráficos y métricas personalizables'
  },
  {
    src: '/images/product-screenshots/placeholder-donations.svg',
    alt: 'Sistema de Comunicación',
    title: 'Comunicación Automática',
    description: 'Envío masivo de emails, SMS y notificaciones push'
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
    src: '/images/product-screenshots/placeholder-dashboard.svg',
    alt: 'Event Management',
    title: 'Event Planning & Management',
    description: 'Complete event lifecycle management with registration'
  },
  {
    src: '/images/product-screenshots/placeholder-members.svg',
    alt: 'Advanced Analytics',
    title: 'Business Intelligence',
    description: 'Advanced reporting with customizable dashboards and insights'
  },
  {
    src: '/images/product-screenshots/placeholder-donations.svg',
    alt: 'System Integrations',
    title: 'Enterprise Integrations',
    description: 'Seamless integration with existing church systems and tools'
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
    src: '/images/product-screenshots/placeholder-dashboard.svg',
    alt: 'Multi-Language Interface',
    title: 'Localization Support',
    description: 'Interface available in multiple languages with RTL support'
  },
  {
    src: '/images/product-screenshots/placeholder-donations.svg',
    alt: 'Global Reporting',
    title: 'Worldwide Analytics',
    description: 'Cross-timezone reporting with regional performance metrics'
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