import { NextRequest, NextResponse } from 'next/server';

// Force dynamic routing for server-side geo detection
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Method 1: Cloudflare headers (most reliable in production)
    const cfCountry = request.headers.get('cf-ipcountry');
    const cfRegion = request.headers.get('cf-region');
    
    // Method 2: Other common headers
    const xCountry = request.headers.get('x-country');
    const xRegion = request.headers.get('x-region');
    
    // Method 3: CloudFront headers (AWS)
    const cloudFrontCountry = request.headers.get('cloudfront-viewer-country');
    
    // Method 4: Vercel headers
    const vercelCountry = request.headers.get('x-vercel-ip-country');
    
    // Determine country with fallback priority
    const country = cfCountry || xCountry || cloudFrontCountry || vercelCountry || 'CO'; // Default to Colombia
    const region = cfRegion || xRegion || 'Atlantico';
    
    // Determine market based on country
    let market: 'LATAM' | 'USA' | 'GLOBAL' = 'LATAM';
    if (['US', 'USA'].includes(country.toUpperCase())) {
      market = 'USA';
    } else if (['CO', 'MX', 'AR', 'CL', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'CR', 'PA', 'GT', 'HN', 'SV', 'NI', 'DO', 'CU', 'PR'].includes(country.toUpperCase())) {
      market = 'LATAM';
    } else {
      market = 'GLOBAL';
    }
    
    // Get client IP for logging (don't store)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const clientIP = forwardedFor?.split(',')[0] || realIP || 'unknown';
    
    // Additional geo data
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const acceptLanguage = request.headers.get('accept-language') || 'es';
    
    // Detect preferred language from Accept-Language header
    const preferredLanguage = acceptLanguage.toLowerCase().includes('es') ? 'es' : 'en';
    
    console.log(`Geo Detection: ${country}/${region} -> ${market} - IP: ${clientIP.substring(0, 8)}... - Lang: ${preferredLanguage}`);
    
    return NextResponse.json({
      country: country.toUpperCase(),
      region,
      market,
      language: preferredLanguage,
      timezone: market === 'LATAM' ? 'America/Bogota' : market === 'USA' ? 'America/New_York' : 'UTC',
      timestamp: new Date().toISOString(),
      // Debug info (remove in production)
      debug: process.env.NODE_ENV === 'development' ? {
        headers: {
          cfCountry,
          cfRegion,
          xCountry,
          xRegion,
          cloudFrontCountry,
          vercelCountry,
          acceptLanguage
        },
        detectedMarket: market
      } : undefined
    });
    
  } catch (error) {
    console.error('Geo detection error:', error);
    
    return NextResponse.json({
      country: 'CO',
      region: 'Atlantico',
      market: 'LATAM',
      language: 'es',
      timezone: 'America/Bogota',
      error: 'geo_detection_failed',
      timestamp: new Date().toISOString()
    });
  }
}