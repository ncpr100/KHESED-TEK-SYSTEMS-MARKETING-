// Dynamic carousel configuration using environment variables
import { CarouselImage } from '@/components/ui/image-carousel';

// Helper function to parse environment variable image lists
function parseImageList(envVar: string | undefined): CarouselImage[] {
  if (!envVar) return [];
  
  try {
    return JSON.parse(envVar);
  } catch {
    return [];
  }
}

// Environment-based carousel configuration
export const DYNAMIC_CAROUSEL_CONFIG = {
  LATAM: parseImageList(process.env.NEXT_PUBLIC_LATAM_CAROUSEL_IMAGES),
  USA: parseImageList(process.env.NEXT_PUBLIC_USA_CAROUSEL_IMAGES),
  GLOBAL: parseImageList(process.env.NEXT_PUBLIC_GLOBAL_CAROUSEL_IMAGES)
};

// Example environment variable format:
/*
NEXT_PUBLIC_LATAM_CAROUSEL_IMAGES='[
  {
    "src": "/images/product-screenshots/dashboard-latam.jpg",
    "alt": "Panel Principal KHESED-TEK", 
    "title": "Panel de Control Principal",
    "description": "Vista general del dashboard con métricas clave"
  },
  {
    "src": "/images/product-screenshots/members-latam.jpg",
    "alt": "Gestión de Miembros",
    "title": "Gestión de Miembros", 
    "description": "Sistema completo para administrar la base de datos"
  }
]'
*/

// Fallback to static configuration if environment variables aren't set
export function getCarouselImages(market: 'LATAM' | 'USA' | 'GLOBAL'): CarouselImage[] {
  const dynamicImages = DYNAMIC_CAROUSEL_CONFIG[market];
  
  if (dynamicImages && dynamicImages.length > 0) {
    return dynamicImages;
  }
  
  // Fallback to static configuration
  const { getScreenshotsByMarket } = require('./product-screenshots');
  return getScreenshotsByMarket(market);
}