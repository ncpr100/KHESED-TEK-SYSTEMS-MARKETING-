import { SecurityHeaders, SecurityEventType, SecurityEvent } from './types';

export class SecurityHeadersManager {
  private static instance: SecurityHeadersManager;
  
  static getInstance(): SecurityHeadersManager {
    if (!SecurityHeadersManager.instance) {
      SecurityHeadersManager.instance = new SecurityHeadersManager();
    }
    return SecurityHeadersManager.instance;
  }

  getSecurityHeaders(isDevelopment = false): SecurityHeaders {
    const baseHeaders: SecurityHeaders = {
      // Content Security Policy
      'Content-Security-Policy': this.getCSPHeader(isDevelopment),
      
      // HTTP Strict Transport Security (only in production)
      ...(isDevelopment ? {} : {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
      }),
      
      // Prevent MIME type sniffing
      'X-Content-Type-Options': 'nosniff',
      
      // Prevent clickjacking
      'X-Frame-Options': 'DENY',
      
      // XSS Protection (legacy but still useful)
      'X-XSS-Protection': '1; mode=block',
      
      // Referrer Policy
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      
      // Permissions Policy (Feature Policy)
      'Permissions-Policy': [
        'camera=()',
        'microphone=()',
        'geolocation=()',
        'payment=()',
        'usb=()',
        'magnetometer=()',
        'accelerometer=()',
        'gyroscope=()'
      ].join(', ')
    };

    return baseHeaders;
  }

  private getCSPHeader(isDevelopment: boolean): string {
    const basePolicy = {
      'default-src': ["'self'"],
      'script-src': [
        "'self'",
        "'unsafe-inline'", // Required for Next.js
        "'unsafe-eval'", // Required for Next.js in development
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://ssl.google-analytics.com",
        "https://tagmanager.google.com"
      ],
      'style-src': [
        "'self'",
        "'unsafe-inline'", // Required for styled-components and CSS-in-JS
        "https://fonts.googleapis.com"
      ],
      'font-src': [
        "'self'",
        "https://fonts.gstatic.com",
        "data:"
      ],
      'img-src': [
        "'self'",
        "data:",
        "https:",
        "https://www.google-analytics.com",
        "https://ssl.google-analytics.com"
      ],
      'connect-src': [
        "'self'",
        "https://api.resend.com",
        "https://www.google-analytics.com",
        "https://ssl.google-analytics.com",
        "https://analytics.google.com"
      ],
      'frame-src': ["'none'"],
      'object-src': ["'none'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': []
    };

    // Add development-specific policies
    if (isDevelopment) {
      basePolicy['connect-src'].push('ws:', 'wss:'); // For hot reload
      basePolicy['script-src'].push('http://localhost:*'); // For dev server
    }

    return Object.entries(basePolicy)
      .map(([directive, sources]) => {
        if (sources.length === 0) {
          return directive;
        }
        return `${directive} ${sources.join(' ')}`;
      })
      .join('; ');
  }

  applySecurityHeaders(headers: Headers, isDevelopment = false): void {
    const securityHeaders = this.getSecurityHeaders(isDevelopment);
    
    Object.entries(securityHeaders).forEach(([name, value]) => {
      if (value) {
        headers.set(name, value);
      }
    });
  }

  validateSecurityHeaders(response: Response): SecurityEvent[] {
    const events: SecurityEvent[] = [];
    const headers = response.headers;
    const requiredHeaders = [
      'Content-Security-Policy',
      'X-Content-Type-Options',
      'X-Frame-Options',
      'X-XSS-Protection'
    ];

    requiredHeaders.forEach(headerName => {
      if (!headers.has(headerName)) {
        events.push({
          type: SecurityEventType.SECURITY_HEADERS_MISSING,
          timestamp: Date.now(),
          ip: 'unknown',
          details: { missingHeader: headerName },
          severity: 'medium'
        });
      }
    });

    return events;
  }
}

export class CSRFProtection {
  private tokens = new Map<string, { token: string; expires: number }>();
  private readonly tokenLength: number;
  private readonly cookieName: string;
  private readonly headerName: string;

  constructor(
    tokenLength = 32,
    cookieName = 'csrf-token',
    headerName = 'x-csrf-token'
  ) {
    this.tokenLength = tokenLength;
    this.cookieName = cookieName;
    this.headerName = headerName;
  }

  generateToken(sessionId: string): string {
    const token = this.randomString(this.tokenLength);
    const expires = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    this.tokens.set(sessionId, { token, expires });
    
    // Clean up expired tokens
    this.cleanup();
    
    return token;
  }

  validateToken(sessionId: string, providedToken: string): boolean {
    const tokenData = this.tokens.get(sessionId);
    
    if (!tokenData) {
      return false;
    }
    
    if (Date.now() > tokenData.expires) {
      this.tokens.delete(sessionId);
      return false;
    }
    
    return tokenData.token === providedToken;
  }

  getTokenFromRequest(req: Request): string | null {
    // Try header first
    const headerToken = req.headers.get(this.headerName);
    if (headerToken) {
      return headerToken;
    }
    
    // Try cookie
    const cookies = req.headers.get('cookie');
    if (cookies) {
      const match = cookies.match(new RegExp(`${this.cookieName}=([^;]+)`));
      if (match) {
        return match[1];
      }
    }
    
    return null;
  }

  createCSRFCookie(token: string): string {
    return `${this.cookieName}=${token}; HttpOnly; SameSite=Strict; Secure; Path=/; Max-Age=86400`;
  }

  private randomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [sessionId, tokenData] of this.tokens.entries()) {
      if (tokenData.expires < now) {
        this.tokens.delete(sessionId);
      }
    }
  }
}

export class RequestValidator {
  static validateContentType(req: Request, expectedTypes: string[]): boolean {
    const contentType = req.headers.get('content-type');
    if (!contentType) {
      return false;
    }
    
    return expectedTypes.some(type => 
      contentType.toLowerCase().includes(type.toLowerCase())
    );
  }

  static validateOrigin(req: Request, allowedOrigins: string[]): boolean {
    const origin = req.headers.get('origin');
    if (!origin) {
      // Allow requests without origin (e.g., direct navigation)
      return true;
    }
    
    return allowedOrigins.includes(origin) || allowedOrigins.includes('*');
  }

  static validateUserAgent(req: Request): boolean {
    const userAgent = req.headers.get('user-agent');
    if (!userAgent) {
      return false;
    }
    
    // Block suspicious user agents
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /scanner/i
    ];
    
    // Allow legitimate bots
    const legitimateBots = [
      /googlebot/i,
      /bingbot/i,
      /slackbot/i,
      /facebookexternalhit/i,
      /twitterbot/i,
      /linkedinbot/i
    ];
    
    // Check if it's a legitimate bot
    if (legitimateBots.some(pattern => pattern.test(userAgent))) {
      return true;
    }
    
    // Block suspicious patterns
    return !suspiciousPatterns.some(pattern => pattern.test(userAgent));
  }

  static validateRequestSize(req: Request, maxSizeBytes: number): boolean {
    const contentLength = req.headers.get('content-length');
    if (!contentLength) {
      return true; // No content length header
    }
    
    const size = parseInt(contentLength, 10);
    return !isNaN(size) && size <= maxSizeBytes;
  }

  static async validateJSONPayload(req: Request): Promise<{ valid: boolean; data?: any; error?: string }> {
    try {
      const text = await req.text();
      
      if (!text) {
        return { valid: true, data: null };
      }
      
      const data = JSON.parse(text);
      return { valid: true, data };
    } catch (error) {
      return { 
        valid: false, 
        error: error instanceof Error ? error.message : 'Invalid JSON'
      };
    }
  }
}