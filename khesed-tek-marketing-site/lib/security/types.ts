// Security system type definitions
export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  keyGenerator?: (req: Request) => string; // Custom key generator
  skipSuccessful?: boolean; // Skip counting successful requests
  skipFailed?: boolean; // Skip counting failed requests
  message?: string; // Custom error message
}

export interface SecurityConfig {
  rateLimiting: {
    global: RateLimitConfig;
    api: RateLimitConfig;
    auth: RateLimitConfig;
    contact: RateLimitConfig;
  };
  csrf: {
    enabled: boolean;
    tokenLength: number;
    cookieName: string;
    headerName: string;
  };
  cors: {
    origins: string[];
    methods: string[];
    allowedHeaders: string[];
  };
  security: {
    contentSecurityPolicy: boolean;
    hsts: boolean;
    noSniff: boolean;
    frameOptions: boolean;
    xssProtection: boolean;
  };
}

export interface RateLimitEntry {
  count: number;
  resetTime: number;
  firstRequest: number;
}

export interface SecurityHeaders {
  'Content-Security-Policy'?: string;
  'Strict-Transport-Security'?: string;
  'X-Content-Type-Options'?: string;
  'X-Frame-Options'?: string;
  'X-XSS-Protection'?: string;
  'Referrer-Policy'?: string;
  'Permissions-Policy'?: string;
}

export interface AbuseDetectionRule {
  name: string;
  condition: (entry: RateLimitEntry, ip: string) => boolean;
  action: 'warn' | 'block' | 'log';
  duration: number; // Block duration in ms
}

export interface SecurityAuditLog {
  timestamp: number;
  ip: string;
  userAgent: string;
  endpoint: string;
  action: string;
  reason: string;
  blocked: boolean;
}

export enum SecurityEventType {
  RATE_LIMIT_EXCEEDED = 'rate_limit_exceeded',
  CSRF_TOKEN_INVALID = 'csrf_token_invalid',
  SUSPICIOUS_BEHAVIOR = 'suspicious_behavior',
  BLOCKED_IP = 'blocked_ip',
  SECURITY_HEADERS_MISSING = 'security_headers_missing'
}

export interface SecurityEvent {
  type: SecurityEventType;
  timestamp: number;
  ip: string;
  details: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}