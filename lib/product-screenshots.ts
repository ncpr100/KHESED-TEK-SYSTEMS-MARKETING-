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
    src: '/images/signin_page_1.png',
    alt: 'KHESED-TEK Login Page',
    title: '',
    description: 'Secure access to the comprehensive church management platform'
  },
  {
    src: '/images/dashboard_2.png',
    alt: 'KHESED-TEK Dashboard',
    title: '',
    description: 'Church management dashboard with comprehensive metrics and insights'
  },
  {
    src: '/images/agentes_ia_3.png',
    alt: 'AI Agents',
    title: '',
    description: 'Ministry automation powered by integrated artificial intelligence agents'
  },
  {
    src: '/images/miembros_4.png',
    alt: 'Member Management CRM',
    title: '',
    description: 'Complete member database with CRM functionality and congregational tracking'
  },
  {
    src: '/images/voluntarios_5.png',
    alt: 'Volunteer Management',
    title: '',
    description: 'Efficient coordination of ministry teams and volunteers'
  },
  {
    src: '/images/muro_de_oracion_6.png',
    alt: 'Prayer Wall',
    title: '',
    description: 'Digital intercession platform for community prayer requests'
  },
  {
    src: '/images/visitantes_7.png',
    alt: 'Visitor Tracking',
    title: '',
    description: 'First-time visitor management and new member integration process'
  },
  {
    src: '/images/formularios_8.png',
    alt: 'Smart Forms',
    title: '',
    description: 'Custom form builder and management for ministry processes'
  },
  {
    src: '/images/donaciones_online_9.png',
    alt: 'Online Giving Platform',
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
    src: '/images/signin_page_1.png',
    alt: 'KHESED-TEK Login Page',
    title: '',
    description: 'Secure access to the comprehensive church management platform'
  },
  {
    src: '/images/dashboard_2.png',
    alt: 'KHESED-TEK Global Dashboard',
    title: '',
    description: 'Global church management with pastoral insights and multi-timezone support'
  },
  {
    src: '/images/agentes_ia_3.png',
    alt: 'AI Agents',
    title: '',
    description: 'Ministry automation powered by integrated artificial intelligence agents'
  },
  {
    src: '/images/miembros_4.png',
    alt: 'Global Compliance & Member Management',
    title: '',
    description: 'GDPR, data privacy, and regional compliance with complete member management'
  },
  {
    src: '/images/voluntarios_5.png',
    alt: 'Global AI Volunteer Management',
    title: '',
    description: 'Intelligent volunteer coordination across multiple locations and time zones'
  },
  {
    src: '/images/muro_de_oracion_6.png',
    alt: 'Prayer Wall',
    title: '',
    description: 'Digital intercession platform for community prayer requests'
  },
  {
    src: '/images/visitantes_7.png',
    alt: 'Visitor Tracking',
    title: '',
    description: 'First-time visitor management and new member integration process'
  },
  {
    src: '/images/formularios_8.png',
    alt: 'Smart Forms',
    title: '',
    description: 'Custom form builder and management for ministry processes'
  },
  {
    src: '/images/donaciones_online_9.png',
    alt: 'Multi-Currency Giving Platform',
    title: '',
    description: 'Support for multiple currencies and payment methods worldwide with secure processing'
  },
  {
    src: '/images/perspectivas_10.png',
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
  dashboard: '/images/dashboard_2.png',
  members: '/images/miembros_4.png',
  donations: '/images/donaciones_online_9.png',
  volunteers: '/images/voluntarios_5.png',
  insights: '/images/perspectivas_10.png',
  login: '/images/signin_page_1.png'
};