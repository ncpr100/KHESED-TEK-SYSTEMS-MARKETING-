import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get the debug key from query params
  const { searchParams } = new URL(request.url);
  const debugKey = searchParams.get('key');
  
  // Only allow in development or with special key
  const isDev = process.env.NODE_ENV === 'development';
  
  if (!isDev && debugKey !== 'khesed-debug-2024') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Get all video-related environment variables
  const videoEnvVars = {
    NEXT_PUBLIC_LATAM_DEMO_VIDEO: process.env.NEXT_PUBLIC_LATAM_DEMO_VIDEO,
    NEXT_PUBLIC_USA_DEMO_VIDEO: process.env.NEXT_PUBLIC_USA_DEMO_VIDEO,
    NEXT_PUBLIC_LATAM_QUICK_TOUR: process.env.NEXT_PUBLIC_LATAM_QUICK_TOUR,
    NEXT_PUBLIC_USA_QUICK_TOUR: process.env.NEXT_PUBLIC_USA_QUICK_TOUR,
    NEXT_PUBLIC_GLOBAL_DEMO: process.env.NEXT_PUBLIC_GLOBAL_DEMO,
    NEXT_PUBLIC_VIDEO_CACHE_BUST: process.env.NEXT_PUBLIC_VIDEO_CACHE_BUST
  };

  // Test cache-busting function
  function addCacheBust(url: string): string {
    const cacheBust = process.env.NEXT_PUBLIC_VIDEO_CACHE_BUST;
    if (!cacheBust) return url;
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}cb=${cacheBust}`;
  }

  // Generate final URLs
  const finalUrls = {
    LATAM_MAIN_DEMO: addCacheBust(videoEnvVars.NEXT_PUBLIC_LATAM_DEMO_VIDEO || 'https://www.youtube.com/embed/1fW2zDQnUV0'),
    USA_MAIN_DEMO: addCacheBust(videoEnvVars.NEXT_PUBLIC_USA_DEMO_VIDEO || 'https://www.youtube.com/embed/1fW2zDQnUV0'),
    LATAM_QUICK_TOUR: addCacheBust(videoEnvVars.NEXT_PUBLIC_LATAM_QUICK_TOUR || 'https://www.youtube.com/embed/1fW2zDQnUV0'),
    USA_QUICK_TOUR: addCacheBust(videoEnvVars.NEXT_PUBLIC_USA_QUICK_TOUR || 'https://www.youtube.com/embed/1fW2zDQnUV0'),
    GLOBAL_OVERVIEW: addCacheBust(videoEnvVars.NEXT_PUBLIC_GLOBAL_DEMO || 'https://www.youtube.com/embed/1fW2zDQnUV0')
  };

  return NextResponse.json({
    message: 'Video Environment Debug',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    buildTime: process.env.BUILD_TIME || 'Not set',
    environmentVariables: videoEnvVars,
    finalVideoUrls: finalUrls,
    status: {
      variablesLoaded: Object.values(videoEnvVars).some(v => v && v.includes('youtube.com')),
      cacheBustActive: !!process.env.NEXT_PUBLIC_VIDEO_CACHE_BUST,
      allVariablesSet: Object.values(videoEnvVars).every(v => !!v)
    }
  }, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}