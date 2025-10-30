import { NextRequest, NextResponse } from 'next/server';
import { securityManager } from './lib/security/manager';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Apply security headers to all responses
  const response = NextResponse.next();
  
  // Get security headers
  const securityHeaders = securityManager['securityHeaders'].getSecurityHeaders(
    process.env.NODE_ENV === 'development'
  );
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([name, value]) => {
    if (value) {
      response.headers.set(name, value);
    }
  });
  
  // Define rate limiting rules for different paths
  let rateLimitType: 'global' | 'api' | 'auth' | 'contact' = 'global';
  let requireCSRF = false;
  
  if (pathname.startsWith('/api/')) {
    rateLimitType = 'api';
    
    // Special handling for sensitive endpoints
    if (pathname.includes('/auth/') || pathname.includes('/login')) {
      rateLimitType = 'auth';
    } else if (pathname.includes('/request-demo') || pathname.includes('/contact')) {
      rateLimitType = 'contact';
      requireCSRF = true;
    }
  }
  
  // Skip security checks for static assets and internal Next.js routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return response;
  }
  
  try {
    // Generate session ID from IP and user agent for CSRF protection
    const sessionId = generateSessionId(request);
    
    // Apply security protection
    const protection = await securityManager.protectRoute(
      request,
      rateLimitType,
      requireCSRF,
      sessionId
    );
    
    if (!protection.success && protection.response) {
      return protection.response;
    }
    
    // Add rate limit headers to successful responses
    if (protection.success) {
      const rateLimit = await securityManager.checkRateLimit(request, rateLimitType);
      
      response.headers.set('X-RateLimit-Limit', securityManager['config'].rateLimiting[rateLimitType].maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', new Date(rateLimit.resetTime).toISOString());
    }
    
    return response;
    
  } catch (error) {
    console.error('Middleware security error:', error);
    
    // Return a secure error response
    return new Response(
      JSON.stringify({ error: 'Security check failed' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...Object.fromEntries(
            Object.entries(securityHeaders).map(([k, v]) => [k, v || ''])
          )
        }
      }
    );
  }
}

function generateSessionId(request: NextRequest): string {
  const ip = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return Buffer.from(`${ip}:${userAgent}`).toString('base64');
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};