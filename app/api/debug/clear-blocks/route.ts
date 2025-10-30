import { NextRequest, NextResponse } from 'next/server';
import { securityManager } from '@/lib/security/manager';

/**
 * Development endpoint to clear blocked IPs
 * Only works in development mode
 */
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    // Clear blocked IPs from all rate limiters
    const rateLimiterTypes = ['global', 'api', 'auth', 'contact'];

    rateLimiterTypes.forEach(type => {
      const limiter = securityManager['rateLimiters'].get(type);
      if (limiter && typeof limiter.clearBlockedIPs === 'function') {
        limiter.clearBlockedIPs();
      }
    });

    return NextResponse.json({
      success: true,
      message: 'All blocked IPs have been cleared',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error clearing blocked IPs:', error);
    return NextResponse.json(
      { error: 'Failed to clear blocked IPs' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development mode' },
      { status: 403 }
    );
  }

  try {
    const blockedIPs: Record<string, any> = {};
    const rateLimiterTypes = ['global', 'api', 'auth', 'contact'];

    rateLimiterTypes.forEach(type => {
      const limiter = securityManager['rateLimiters'].get(type);
      if (limiter && typeof limiter.getBlockedIPs === 'function') {
        const blocked = limiter.getBlockedIPs();
        blockedIPs[type] = Array.from(blocked.entries()).map(([ip, unblockTime]) => ({
          ip,
          unblockTime: new Date(unblockTime).toISOString(),
          remainingMs: Math.max(0, unblockTime - Date.now())
        }));
      }
    });

    return NextResponse.json({
      blockedIPs,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting blocked IPs:', error);
    return NextResponse.json(
      { error: 'Failed to get blocked IPs' },
      { status: 500 }
    );
  }
}