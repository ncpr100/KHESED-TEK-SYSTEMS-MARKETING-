import { SecurityConfig, RateLimitConfig } from './types';
import { RateLimiter } from './rate-limiter';
import { SecurityHeadersManager, CSRFProtection, RequestValidator } from './security-headers';

// Default security configuration
export const defaultSecurityConfig: SecurityConfig = {
  rateLimiting: {
    global: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
      message: 'Too many requests. Please try again later.'
    },
    api: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 50,
      message: 'API rate limit exceeded. Please try again later.'
    },
    auth: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 5,
      message: 'Too many authentication attempts. Please try again later.'
    },
    contact: {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 10, // Increased from 3 to 10
      message: 'Too many contact form submissions. Please try again later.'
    }
  },
  csrf: {
    enabled: true,
    tokenLength: 32,
    cookieName: 'khesed-csrf-token',
    headerName: 'x-csrf-token'
  },
  cors: {
    origins: [
      'https://khesedtek.com',
      'https://www.khesedtek.com',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-CSRF-Token',
      'X-Requested-With'
    ]
  },
  security: {
    contentSecurityPolicy: true,
    hsts: true,
    noSniff: true,
    frameOptions: true,
    xssProtection: true
  }
};

export class SecurityManager {
  private static instance: SecurityManager;
  private rateLimiters = new Map<string, RateLimiter>();
  private csrfProtection: CSRFProtection;
  private securityHeaders: SecurityHeadersManager;
  private config: SecurityConfig;

  constructor(config: SecurityConfig = defaultSecurityConfig) {
    this.config = config;
    this.csrfProtection = new CSRFProtection(
      config.csrf.tokenLength,
      config.csrf.cookieName,
      config.csrf.headerName
    );
    this.securityHeaders = SecurityHeadersManager.getInstance();
    this.initializeRateLimiters();
  }

  static getInstance(config?: SecurityConfig): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager(config);
    }
    return SecurityManager.instance;
  }

  private initializeRateLimiters(): void {
    Object.entries(this.config.rateLimiting).forEach(([name, config]) => {
      this.rateLimiters.set(name, new RateLimiter(config));
    });
  }

  async checkRateLimit(req: Request, type: keyof SecurityConfig['rateLimiting'] = 'global') {
    const limiter = this.rateLimiters.get(type);
    if (!limiter) {
      throw new Error(`Rate limiter '${type}' not found`);
    }

    return await limiter.checkLimit(req);
  }

  validateCSRFToken(sessionId: string, token: string): boolean {
    if (!this.config.csrf.enabled) {
      return true;
    }
    return this.csrfProtection.validateToken(sessionId, token);
  }

  generateCSRFToken(sessionId: string): string {
    return this.csrfProtection.generateToken(sessionId);
  }

  getCSRFTokenFromRequest(req: Request): string | null {
    return this.csrfProtection.getTokenFromRequest(req);
  }

  createCSRFCookie(token: string): string {
    return this.csrfProtection.createCSRFCookie(token);
  }

  applySecurityHeaders(headers: Headers): void {
    const isDevelopment = process.env.NODE_ENV === 'development';
    this.securityHeaders.applySecurityHeaders(headers, isDevelopment);
  }

  validateRequest(req: Request): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate origin
    if (!RequestValidator.validateOrigin(req, this.config.cors.origins)) {
      errors.push('Invalid origin');
    }

    // Validate user agent
    if (!RequestValidator.validateUserAgent(req)) {
      errors.push('Suspicious user agent detected');
    }

    // Validate content type for POST/PUT requests
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      if (!RequestValidator.validateContentType(req, ['application/json', 'application/x-www-form-urlencoded'])) {
        errors.push('Invalid content type');
      }
    }

    // Validate request size (10MB limit)
    if (!RequestValidator.validateRequestSize(req, 10 * 1024 * 1024)) {
      errors.push('Request too large');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  async createSecureResponse(data: any, options: {
    status?: number;
    headers?: Record<string, string>;
    setCsrfCookie?: boolean;
    sessionId?: string;
  } = {}): Promise<Response> {
    const {
      status = 200,
      headers: customHeaders = {},
      setCsrfCookie = false,
      sessionId
    } = options;

    const responseHeaders = new Headers();

    // Apply custom headers
    Object.entries(customHeaders).forEach(([name, value]) => {
      responseHeaders.set(name, value);
    });

    // Apply security headers
    this.applySecurityHeaders(responseHeaders);

    // Set CSRF cookie if requested
    if (setCsrfCookie && sessionId) {
      const token = this.generateCSRFToken(sessionId);
      const cookie = this.createCSRFCookie(token);
      responseHeaders.set('Set-Cookie', cookie);
    }

    // Set content type
    responseHeaders.set('Content-Type', 'application/json');

    return new Response(JSON.stringify(data), {
      status,
      headers: responseHeaders
    });
  }

  // Middleware function for route protection
  async protectRoute(
    req: Request,
    rateLimitType: keyof SecurityConfig['rateLimiting'] = 'global',
    requireCSRF = false,
    sessionId?: string
  ): Promise<{ success: boolean; response?: Response; error?: string }> {
    try {
      // Validate request
      const validation = this.validateRequest(req);
      if (!validation.valid) {
        return {
          success: false,
          response: await this.createSecureResponse(
            { error: 'Request validation failed', details: validation.errors },
            { status: 400 }
          ),
          error: validation.errors.join(', ')
        };
      }

      // Check rate limiting
      const rateLimit = await this.checkRateLimit(req, rateLimitType);
      if (!rateLimit.allowed) {
        const headers = {
          'X-RateLimit-Limit': this.config.rateLimiting[rateLimitType].maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString()
        };

        return {
          success: false,
          response: await this.createSecureResponse(
            { error: rateLimit.error || 'Rate limit exceeded' },
            { status: 429, headers }
          ),
          error: rateLimit.error
        };
      }

      // Check CSRF token if required
      if (requireCSRF && sessionId) {
        const token = this.getCSRFTokenFromRequest(req);
        if (!token || !this.validateCSRFToken(sessionId, token)) {
          return {
            success: false,
            response: await this.createSecureResponse(
              { error: 'Invalid or missing CSRF token' },
              { status: 403 }
            ),
            error: 'CSRF validation failed'
          };
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Security protection error:', error);
      return {
        success: false,
        response: await this.createSecureResponse(
          { error: 'Internal security error' },
          { status: 500 }
        ),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Clean up expired data
  cleanup(): void {
    this.rateLimiters.forEach(limiter => limiter.cleanup());
  }

  getAuditLogs() {
    const logs: any[] = [];
    this.rateLimiters.forEach((limiter, type) => {
      logs.push({
        type,
        logs: limiter.getAuditLogs()
      });
    });
    return logs;
  }
}

// Export singleton instance
export const securityManager = SecurityManager.getInstance();