import { NextRequest } from 'next/server';
import { securityManager } from '@/lib/security/manager';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  try {
    // Protect this admin endpoint with strict rate limiting
    const protection = await securityManager.protectRoute(request, 'auth');
    if (!protection.success) {
      return protection.response!;
    }
    
    switch (action) {
      case 'audit-logs':
        const logs = securityManager.getAuditLogs();
        return await securityManager.createSecureResponse(logs);
        
      case 'health':
        const health = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          rateLimiters: {
            global: 'active',
            api: 'active',
            auth: 'active',
            contact: 'active'
          },
          securityFeatures: {
            rateLimiting: 'enabled',
            csrfProtection: 'enabled',
            securityHeaders: 'enabled',
            requestValidation: 'enabled'
          }
        };
        return await securityManager.createSecureResponse(health);
        
      case 'stats':
        // This would typically come from a monitoring database
        const stats = {
          requests: {
            total: 0,
            blocked: 0,
            lastHour: 0
          },
          rateLimits: {
            hits: 0,
            activeBlocks: 0
          },
          security: {
            csrfAttempts: 0,
            suspiciousActivity: 0
          }
        };
        return await securityManager.createSecureResponse(stats);
        
      default:
        return await securityManager.createSecureResponse(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Security admin API error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Protect this admin endpoint with strict rate limiting
    const protection = await securityManager.protectRoute(request, 'auth');
    if (!protection.success) {
      return protection.response!;
    }
    
    const body = await request.json();
    const { action } = body;
    
    switch (action) {
      case 'cleanup':
        securityManager.cleanup();
        return await securityManager.createSecureResponse({
          message: 'Security data cleanup completed'
        });
        
      case 'clear-logs':
        // Clear audit logs (in production, you might want to archive them first)
        securityManager['rateLimiters'].forEach(limiter => {
          limiter.clearAuditLogs();
        });
        return await securityManager.createSecureResponse({
          message: 'Audit logs cleared'
        });
        
      default:
        return await securityManager.createSecureResponse(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Security admin POST error:', error);
    return await securityManager.createSecureResponse(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}