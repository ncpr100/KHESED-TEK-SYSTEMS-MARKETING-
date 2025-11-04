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
    src: '/images/product-screenshots/real-dashboard.svg',
    alt: 'Panel Principal KHESED-TEK',
    title: 'Perspectivas Pastorales',
    description: 'Inteligencia ministerial avanzada con métricas de crecimiento y análisis de tendencias'
  },
  {
    src: '/images/product-screenshots/real-members.svg', 
    alt: 'Gestión de Miembros',
    title: 'Sistema de Miembros',
    description: 'Base de datos completa con seguimiento de actividad y estado de membresía'
  },
  {
    src: '/images/product-screenshots/real-donations.svg',
    alt: 'Sistema de Donaciones',
    title: 'Donaciones Seguras',
    description: 'Procesamiento multicanal con PSE, Nequi, tarjetas y reportes en tiempo real'
  },
  {
    src: '/images/product-screenshots/real-volunteer-system.svg',
    alt: 'Sistema de Voluntarios Inteligente',
    title: 'Coordinación de Voluntarios con IA',
    description: 'Pipeline automatizado de reclutamiento y gestión de voluntarios con inteligencia artificial'
  },
  {
    src: '/images/product-screenshots/real-sermons-management.svg',
    alt: 'Gestión de Sermones KHESED-TEK',
    title: 'Asistente de Sermones con IA',
    description: 'Herramientas avanzadas para preparar y organizar predicaciones con ayuda de inteligencia artificial'
  },
  {
    src: '/images/product-screenshots/real-pastoral-insights.svg',
    alt: 'Perspectivas Pastorales',
    title: 'Análisis Pastoral Inteligente',
    description: 'Dashboard avanzado con insights de donaciones, membresía y métricas de crecimiento ministerial'
  }
];

// USA Market Screenshots (English) - REAL APPLICATION SCREENSHOTS
const USA_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/real-dashboard.svg',
    alt: 'KHESED-TEK Main Dashboard',
    title: 'Executive Dashboard',
    description: 'Comprehensive pastoral insights with advanced church metrics and growth analytics'
  },
  {
    src: '/images/product-screenshots/real-members.svg',
    alt: 'Member Management System',
    title: 'Member Management',
    description: 'Complete CRM system for church member administration with activity tracking'
  },
  {
    src: '/images/product-screenshots/real-donations.svg',
    alt: 'Online Giving Platform',
    title: 'Digital Giving Platform',
    description: 'Secure multi-channel donation processing with real-time financial tracking'
  },
  {
    src: '/images/product-screenshots/real-volunteer-system.svg',
    alt: 'AI-Powered Volunteer Management',
    title: 'Intelligent Volunteer Coordination',
    description: 'Automated recruitment pipeline and volunteer management with artificial intelligence'
  },
  {
    src: '/images/product-screenshots/real-sermons-management.svg',
    alt: 'KHESED-TEK Sermon Management',
    title: 'AI Sermon Assistant',
    description: 'Advanced sermon preparation and preaching calendar with AI-powered tools'
  },
  {
    src: '/images/product-screenshots/real-pastoral-insights.svg',
    alt: 'Pastoral Analytics Dashboard',
    title: 'Advanced Pastoral Insights',
    description: 'AI-powered analytics for donations, membership growth, and ministry effectiveness metrics'
  }
];

// Global Market Screenshots (Multi-language) - REAL APPLICATION SCREENSHOTS
const GLOBAL_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/real-dashboard.svg',
    alt: 'KHESED-TEK Global Dashboard',
    title: 'Multi-Language Dashboard',
    description: 'Global church management with pastoral insights and multi-timezone support'
  },
  {
    src: '/images/product-screenshots/real-donations.svg',
    alt: 'Multi-Currency Support',
    title: 'International Giving',
    description: 'Support for multiple currencies and payment methods worldwide with secure processing'
  },
  {
    src: '/images/product-screenshots/real-members.svg',
    alt: 'Global Compliance',
    title: 'International Compliance',
    description: 'GDPR, data privacy, and regional compliance features with member management'
  },
  {
    src: '/images/product-screenshots/real-volunteer-system.svg',
    alt: 'Global AI Volunteer Management',
    title: 'Worldwide Ministry Teams with AI',
    description: 'Intelligent volunteer coordination across multiple locations and time zones'
  },
  {
    src: '/images/product-screenshots/real-sermons-management.svg',
    alt: 'Multi-Language Sermon Planning',
    title: 'Global Sermon Planning with AI',
    description: 'AI-powered sermon tools with multi-language support and cultural adaptation'
  },
  {
    src: '/images/product-screenshots/real-pastoral-insights.svg',
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
  dashboard: '/images/product-screenshots/placeholder-dashboard.svg',
  members: '/images/product-screenshots/placeholder-members.svg',
  donations: '/images/product-screenshots/placeholder-donations.svg',
  events: '/images/product-screenshots/placeholder-events.svg',
  reports: '/images/product-screenshots/placeholder-reports.svg',
  communication: '/images/product-screenshots/placeholder-communication.svg'
};