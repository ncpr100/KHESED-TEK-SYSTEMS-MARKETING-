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
    src: '/images/signin_page_1.png',
    alt: 'Página de Acceso KHESED-TEK',
    title: '',
    description: 'Acceso seguro al sistema de gestión integral de iglesias'
  },
  {
    src: '/images/dashboard_2.png',
    alt: 'Panel Principal KHESED-TEK',
    title: '',
    description: 'Panel de control con métricas avanzadas de la iglesia'
  },
  {
    src: '/images/agentes_ia_3.png',
    alt: 'Agentes de Inteligencia Artificial',
    title: '',
    description: 'Automatización ministerial con agentes de IA integrados'
  },
  {
    src: '/images/miembros_4.png',
    alt: 'Gestión de Miembros CRM',
    title: '',
    description: 'Base de datos completa de miembros y seguimiento congregacional'
  },
  {
    src: '/images/voluntarios_5.png',
    alt: 'Sistema de Voluntarios Inteligente',
    title: '',
    description: 'Coordinación eficiente de equipos ministeriales y voluntarios'
  },
  {
    src: '/images/muro_de_oracion_6.png',
    alt: 'Muro de Oración',
    title: '',
    description: 'Plataforma digital de intercesión y peticiones de oración comunitaria'
  },
  {
    src: '/images/visitantes_7.png',
    alt: 'Seguimiento de Visitantes',
    title: '',
    description: 'Gestión de primeras visitas y proceso de integración de nuevos miembros'
  },
  {
    src: '/images/formularios_8.png',
    alt: 'Formularios Inteligentes',
    title: '',
    description: 'Creación y gestión de formularios personalizados para procesos ministeriales'
  },
  {
    src: '/images/donaciones_online_9.png',
    alt: 'Sistema de Donaciones Online',
    title: '',
    description: 'Procesamiento seguro de donaciones y ofrendas en línea'
  },
  {
    src: '/images/perspectivas_10.png',
    alt: 'Perspectivas Pastorales',
    title: '',
    description: 'Analíticas pastorales con perspectivas inteligentes para crecimiento'
  },
  {
    src: '/images/salud_iglesia_11.png',
    alt: 'Salud de la Iglesia',
    title: '',
    description: 'Indicadores de salud congregacional y métricas de crecimiento espiritual'
  }
];

// USA Market Screenshots (English) - REAL APPLICATION SCREENSHOTS
const USA_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/latam-1764975481233-Screenshot-2025-12-05-165734.png',
    alt: 'KHESED-TEK Login System',
    title: '',
    description: 'Secure access to the comprehensive church management platform'
  },
  {
    src: '/images/product-screenshots/latam-1764975123998-Screenshot-2025-12-05-163131.png',
    alt: 'KHESED-TEK Real Dashboard',
    title: '',
    description: 'Church management dashboard with comprehensive metrics and insights'
  },
  {
    src: '/images/product-screenshots/latam-1764975132708-Screenshot-2025-12-05-163232.png',
    alt: 'Real Member Management System',
    title: '',
    description: 'Ministry automation powered by integrated artificial intelligence agents'
  },
  {
    src: '/images/product-screenshots/latam-1764975149040-Screenshot-2025-12-05-163333.png',
    alt: 'AI-Powered Volunteer Management',
    title: '',
    description: 'First-time visitor management and new member integration process'
  },
  {
    src: '/images/product-screenshots/latam-1764975157059-Screenshot-2025-12-05-164534.png',
    alt: 'KHESED-TEK Sermon Management',
    title: '',
    description: 'Custom form builder and management for ministry processes'
  },
  {
    src: '/images/product-screenshots/latam-1764976058099-Screenshot-2025-12-05-164750.png',
    alt: 'Online Giving Platform',
    title: '',
    description: 'Secure multi-channel donation processing with real-time financial tracking'
  },
  {
    src: '/images/product-screenshots/latam-1764976261309-Screenshot-2025-12-05-164639.png',
    alt: 'Pastoral Insights',
    title: '',
    description: 'Pastoral insights with intelligent perspective tracking for leadership teams'
  },
  {
    src: '/images/product-screenshots/latam-1764976324066-Screenshot-2025-12-05-164720.png',
    alt: 'Pastoral Analytics Dashboard',
    title: '',
    description: 'Secure multi-channel donation processing with real-time financial tracking'
  },
  {
    src: '/images/perspectivas_10.png',
    alt: 'Pastoral Insights',
    title: '',
    description: 'AI-powered pastoral analytics with intelligent growth insights'
  },
  {
    src: '/images/salud_iglesia_11.png',
    alt: 'Church Health',
    title: '',
    description: 'Congregational health indicators and spiritual growth metrics'
  }
];

// Global Market Screenshots (Multi-language) - REAL APPLICATION SCREENSHOTS
const GLOBAL_SCREENSHOTS: CarouselImage[] = [
  {
    src: '/images/product-screenshots/latam-1764975481233-Screenshot-2025-12-05-165734.png',
    alt: 'Sistema de Acesso KHESED-TEK',
    title: '',
    description: 'Secure access to the comprehensive church management platform'
  },
  {
    src: '/images/product-screenshots/latam-1764975123998-Screenshot-2025-12-05-163131.png',
    alt: 'KHESED-TEK Global Dashboard',
    title: '',
    description: 'Global church management with pastoral insights and multi-timezone support'
  },
  {
    src: '/images/product-screenshots/latam-1764975132708-Screenshot-2025-12-05-163232.png',
    alt: 'Global Compliance',
    title: '',
    description: 'GDPR, data privacy, and regional compliance with complete member management'
  },
  {
    src: '/images/product-screenshots/latam-1764975149040-Screenshot-2025-12-05-163333.png',
    alt: 'Global AI Volunteer Management',
    title: '',
    description: 'Intelligent volunteer coordination across multiple locations and time zones'
  },
  {
    src: '/images/product-screenshots/latam-1764975157059-Screenshot-2025-12-05-164534.png',
    alt: 'Multi-Language Sermon Planning',
    title: '',
    description: 'Digital intercession platform for community prayer requests'
  },
  {
    src: '/images/product-screenshots/latam-1764976058099-Screenshot-2025-12-05-164750.png',
    alt: 'Multi-Currency Support',
    title: '',
    description: 'Support for multiple currencies and payment methods worldwide with secure processing'
  },
  {
    src: '/images/product-screenshots/latam-1764976261309-Screenshot-2025-12-05-164639.png',
    alt: 'Pastoral Insights',
    title: '',
    description: 'Pastoral perspectives with leadership insights for global ministry coordination'
  },
  {
    src: '/images/product-screenshots/latam-1764976324066-Screenshot-2025-12-05-164720.png',
    alt: 'Global Church Analytics',
    title: '',
    description: 'Cross-cultural analytics and worldwide ministry effectiveness with AI intelligence'
  },
  {
    src: '/images/salud_iglesia_11.png',
    alt: 'Church Health',
    title: '',
    description: 'Congregational health indicators and spiritual growth metrics'
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

// Fallback placeholder images
export const PLACEHOLDER_SCREENSHOTS = {
  dashboard: '/images/product-screenshots/dashboard.png',
  members: '/images/product-screenshots/members.png',
  donations: '/images/product-screenshots/donations.png',
  events: '/images/product-screenshots/events.png',
  reports: '/images/product-screenshots/reports.png',
  communication: '/images/product-screenshots/communication.png'
};
