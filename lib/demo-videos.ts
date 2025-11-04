// Demo Video Configuration
// This file centralizes all demo video management for easy updates

import { DemoVideo } from '@/types/demo-video';

// Cache-busting system for video URL updates
function addCacheBust(url: string): string {
  const cacheBust = process.env.NEXT_PUBLIC_VIDEO_CACHE_BUST;
  if (!cacheBust) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}cb=${cacheBust}`;
}

// Environment variables for video URLs (fallback to safe defaults)
const VIDEO_URLS = {
  LATAM_MAIN_DEMO: addCacheBust(process.env.NEXT_PUBLIC_LATAM_DEMO_VIDEO || 'https://www.youtube.com/embed/qk-Baf42lBo'),
  USA_MAIN_DEMO: addCacheBust(process.env.NEXT_PUBLIC_USA_DEMO_VIDEO || 'https://www.youtube.com/embed/qk-Baf42lBo'),
  LATAM_QUICK_TOUR: addCacheBust(process.env.NEXT_PUBLIC_LATAM_QUICK_TOUR || 'https://www.youtube.com/embed/qk-Baf42lBo'),
  USA_QUICK_TOUR: addCacheBust(process.env.NEXT_PUBLIC_USA_QUICK_TOUR || 'https://www.youtube.com/embed/qk-Baf42lBo'),
  GLOBAL_OVERVIEW: addCacheBust(process.env.NEXT_PUBLIC_GLOBAL_DEMO || 'https://www.youtube.com/embed/qk-Baf42lBo')
};

// Production-ready demo video configuration
export const PRODUCTION_DEMO_VIDEOS: DemoVideo[] = [
  {
    id: 'khesed-tek-demo-latam',
    title: 'KHESED-TEK: Demostración Completa',
    description: 'Descubra cómo nuestro sistema transforma la gestión de su iglesia en solo 5 minutos. Vea funciones clave como gestión de miembros, donaciones en línea, y reportes avanzados.',
    thumbnailUrl: '/images/demo-thumbnail-latam.jpg',
    videoUrl: VIDEO_URLS.LATAM_MAIN_DEMO,
    duration: '5:30',
    type: 'youtube',
    market: 'LATAM',
    language: 'es',
    features: ['Gestión de miembros', 'Donaciones en línea', 'Eventos y calendario', 'Reportes avanzados', 'Comunicación automática']
  },
  {
    id: 'khesed-tek-demo-usa',
    title: 'KHESED-TEK: Complete Platform Demo',
    description: 'See how our comprehensive church management system transforms ministry operations in just 5 minutes. Experience member management, donation processing, and advanced analytics.',
    thumbnailUrl: '/images/demo-thumbnail-usa.jpg',
    videoUrl: VIDEO_URLS.USA_MAIN_DEMO,
    duration: '5:30',
    type: 'youtube',
    market: 'USA',
    language: 'en',
    features: ['Member management', 'Online giving', 'Event planning', 'Advanced reporting', 'Communication tools']
  },
  {
    id: 'quick-start-latam',
    title: 'Inicio Rápido - 2 Minutos',
    description: 'Tour rápido de las funciones más importantes: dashboard principal, navegación y herramientas esenciales.',
    thumbnailUrl: '/images/quick-tour-latam.jpg',
    videoUrl: VIDEO_URLS.LATAM_QUICK_TOUR,
    duration: '2:15',
    type: 'youtube',
    market: 'LATAM',
    language: 'es',
    features: ['Dashboard ejecutivo', 'Navegación intuitiva', 'Funciones principales']
  },
  {
    id: 'quick-start-usa',
    title: 'Quick Start - 2 Minutes',
    description: 'Fast tour of the most important features: main dashboard, navigation, and essential tools.',
    thumbnailUrl: '/images/quick-tour-usa.jpg',
    videoUrl: VIDEO_URLS.USA_QUICK_TOUR,
    duration: '2:15',
    type: 'youtube',
    market: 'USA',
    language: 'en',
    features: ['Executive dashboard', 'Intuitive navigation', 'Core features']
  },
  {
    id: 'global-overview',
    title: 'KHESED-TEK Global Platform',
    description: 'Comprehensive overview of our international church management platform with multi-language support.',
    thumbnailUrl: '/images/global-demo.jpg',
    videoUrl: VIDEO_URLS.GLOBAL_OVERVIEW,
    duration: '7:45',
    type: 'youtube',
    market: 'GLOBAL',
    language: 'en',
    features: ['Multi-language support', 'Global compliance', 'Advanced integrations', 'Enterprise features']
  }
];

// Feature-specific demo videos
export const FEATURE_DEMOS: DemoVideo[] = [
  {
    id: 'member-management-es',
    title: 'Gestión de Miembros Avanzada',
    description: 'Aprenda a gestionar su congregación con herramientas profesionales de base de datos.',
    thumbnailUrl: '/images/members-demo-es.jpg',
    videoUrl: 'https://www.youtube.com/embed/placeholder1', // Replace with actual video
    duration: '3:20',
    type: 'youtube',
    market: 'LATAM',
    language: 'es',
    features: ['Base de datos de miembros', 'Grupos y ministerios', 'Comunicación masiva']
  },
  {
    id: 'donations-demo-es',
    title: 'Sistema de Donaciones Digital',
    description: 'Configure donaciones en línea seguras con múltiples métodos de pago.',
    thumbnailUrl: '/images/donations-demo-es.jpg',
    videoUrl: 'https://www.youtube.com/embed/placeholder2', // Replace with actual video
    duration: '4:10',
    type: 'youtube',
    market: 'LATAM',
    language: 'es',
    features: ['Pagos seguros', 'Donaciones recurrentes', 'Reportes financieros']
  }
];

// Utility function to get videos by market and language
export function getVideosByMarket(market: 'LATAM' | 'USA' | 'GLOBAL', language: 'es' | 'en'): DemoVideo[] {
  return PRODUCTION_DEMO_VIDEOS.filter(video => 
    (video.market === market || video.market === 'GLOBAL') && 
    video.language === language
  );
}

// Utility function to get main demo video for a market
export function getMainDemoVideo(market: 'LATAM' | 'USA' | 'GLOBAL', language: 'es' | 'en'): DemoVideo | null {
  const videos = getVideosByMarket(market, language);
  return videos.find(video => video.id.includes('demo')) || videos[0] || null;
}

// Video analytics configuration
export const VIDEO_ANALYTICS = {
  EVENTS: {
    PLAY: 'video_play',
    COMPLETE: 'video_complete',
    QUARTER: 'video_25_percent',
    HALF: 'video_50_percent',
    THREE_QUARTER: 'video_75_percent'
  },
  CATEGORIES: {
    DEMO: 'demo_video',
    FEATURE: 'feature_video',
    TESTIMONIAL: 'testimonial_video'
  }
};

// Instructions for updating videos:
/*
TO UPDATE DEMO VIDEOS:

1. Environment Variables (Railway Dashboard):
   - NEXT_PUBLIC_LATAM_DEMO_VIDEO=https://www.youtube.com/embed/YOUR_VIDEO_ID
   - NEXT_PUBLIC_USA_DEMO_VIDEO=https://www.youtube.com/embed/YOUR_VIDEO_ID
   - NEXT_PUBLIC_LATAM_QUICK_TOUR=https://www.youtube.com/embed/YOUR_VIDEO_ID
   - NEXT_PUBLIC_USA_QUICK_TOUR=https://www.youtube.com/embed/YOUR_VIDEO_ID
   - NEXT_PUBLIC_GLOBAL_DEMO=https://www.youtube.com/embed/YOUR_VIDEO_ID

2. For thumbnail images, add to public/images/:
   - demo-thumbnail-latam.jpg
   - demo-thumbnail-usa.jpg
   - quick-tour-latam.jpg
   - quick-tour-usa.jpg
   - global-demo.jpg

3. Video Requirements:
   - YouTube videos should be public or unlisted
   - Recommended resolution: 1920x1080 (16:9 aspect ratio)
   - Include captions/subtitles in appropriate language
   - Optimal duration: 2-7 minutes for engagement

4. Content Guidelines:
   - Start with KHESED-TEK branding
   - Show actual software interface
   - Highlight unique competitive advantages
   - Include clear call-to-action at the end
   - Ensure professional audio quality
*/