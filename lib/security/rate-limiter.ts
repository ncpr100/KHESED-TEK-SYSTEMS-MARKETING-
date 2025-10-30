import { RateLimitConfig, RateLimitEntry, AbuseDetectionRule, SecurityAuditLog, SecurityEvent, SecurityEventType } from './types';

export class RateLimiter {
  private storage = new Map<string, RateLimitEntry>();
  private blockedIPs = new Map<string, number>(); // IP -> unblock timestamp
  private auditLogs: SecurityAuditLog[] = [];

  constructor(private config: RateLimitConfig) {}

  async checkLimit(req: Request): Promise<{ allowed: boolean; remaining: number; resetTime: number; error?: string }> {
    const key = this.generateKey(req);
    const now = Date.now();
    
    // Check if IP is blocked
    const blockedUntil = this.blockedIPs.get(this.getClientIP(req));
    if (blockedUntil && now < blockedUntil) {
      this.logSecurityEvent({
        type: SecurityEventType.BLOCKED_IP,
        timestamp: now,
        ip: this.getClientIP(req),
        details: { reason: 'IP temporarily blocked', unblockTime: blockedUntil },
        severity: 'high'
      });
      
      return {
        allowed: false,
        remaining: 0,
        resetTime: blockedUntil,
        error: 'IP temporarily blocked due to suspicious activity'
      };
    }

    const entry = this.storage.get(key);
    const windowStart = now - this.config.windowMs;

    if (!entry || entry.firstRequest < windowStart) {
      // New window or first request
      const newEntry: RateLimitEntry = {
        count: 1,
        resetTime: now + this.config.windowMs,
        firstRequest: now
      };
      this.storage.set(key, newEntry);
      
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: newEntry.resetTime
      };
    }

    // Check abuse detection rules
    const ip = this.getClientIP(req);
    const shouldBlock = this.checkAbuseRules(entry, ip);
    if (shouldBlock) {
      this.blockIP(ip, 15 * 60 * 1000); // Block for 15 minutes
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        error: 'Suspicious activity detected. IP temporarily blocked.'
      };
    }

    if (entry.count >= this.config.maxRequests) {
      // Rate limit exceeded
      this.logAudit({
        timestamp: now,
        ip,
        userAgent: req.headers.get('user-agent') || 'unknown',
        endpoint: new URL(req.url).pathname,
        action: 'rate_limit_exceeded',
        reason: `Exceeded ${this.config.maxRequests} requests in ${this.config.windowMs}ms`,
        blocked: true
      });

      this.logSecurityEvent({
        type: SecurityEventType.RATE_LIMIT_EXCEEDED,
        timestamp: now,
        ip,
        details: { 
          maxRequests: this.config.maxRequests,
          windowMs: this.config.windowMs,
          currentCount: entry.count
        },
        severity: 'medium'
      });

      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
        error: this.config.message || 'Too many requests'
      };
    }

    // Increment counter
    entry.count += 1;
    this.storage.set(key, entry);

    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.count,
      resetTime: entry.resetTime
    };
  }

  private generateKey(req: Request): string {
    if (this.config.keyGenerator) {
      return this.config.keyGenerator(req);
    }
    
    const ip = this.getClientIP(req);
    const endpoint = new URL(req.url).pathname;
    return `${ip}:${endpoint}`;
  }

  private getClientIP(req: Request): string {
    // Check for forwarded headers (common in production with load balancers)
    const forwarded = req.headers.get('x-forwarded-for');
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    const realIP = req.headers.get('x-real-ip');
    if (realIP) {
      return realIP;
    }
    
    // Fallback (not reliable in production)
    return req.headers.get('x-forwarded-for') || 'unknown';
  }

  private checkAbuseRules(entry: RateLimitEntry, ip: string): boolean {
    const rules: AbuseDetectionRule[] = [
      {
        name: 'rapid_fire',
        condition: (entry) => entry.count > this.config.maxRequests * 5, // Increased from 2 to 5
        action: 'block',
        duration: 15 * 60 * 1000 // Reduced from 30 to 15 minutes
      },
      {
        name: 'persistent_limit_hitting',
        condition: (entry) => {
          const rate = entry.count / ((Date.now() - entry.firstRequest) / 1000);
          return rate > this.config.maxRequests / (this.config.windowMs / 1000) * 3; // Increased from 1.5 to 3
        },
        action: 'block',
        duration: 10 * 60 * 1000 // Reduced from 15 to 10 minutes
      }
    ];

    return rules.some(rule => {
      if (rule.condition(entry, ip)) {
        this.logSecurityEvent({
          type: SecurityEventType.SUSPICIOUS_BEHAVIOR,
          timestamp: Date.now(),
          ip,
          details: { 
            rule: rule.name,
            action: rule.action,
            entryCount: entry.count,
            duration: rule.duration
          },
          severity: 'high'
        });
        return rule.action === 'block';
      }
      return false;
    });
  }

  private blockIP(ip: string, duration: number): void {
    const unblockTime = Date.now() + duration;
    this.blockedIPs.set(ip, unblockTime);
    
    // Clean up expired blocks periodically
    setTimeout(() => {
      if (this.blockedIPs.get(ip) === unblockTime) {
        this.blockedIPs.delete(ip);
      }
    }, duration);
  }

  private logAudit(log: SecurityAuditLog): void {
    this.auditLogs.push(log);
    
    // Keep only last 1000 logs to prevent memory issues
    if (this.auditLogs.length > 1000) {
      this.auditLogs = this.auditLogs.slice(-1000);
    }
  }

  private logSecurityEvent(event: SecurityEvent): void {
    // In production, send to monitoring service
    console.warn(`Security Event [${event.severity.toUpperCase()}]:`, {
      type: event.type,
      ip: event.ip,
      timestamp: new Date(event.timestamp).toISOString(),
      details: event.details
    });
  }

  getAuditLogs(): SecurityAuditLog[] {
    return [...this.auditLogs];
  }

  clearAuditLogs(): void {
    this.auditLogs = [];
  }

  // Clear all blocked IPs (for development/testing)
  clearBlockedIPs(): void {
    this.blockedIPs.clear();
  }

  // Get blocked IPs list
  getBlockedIPs(): Map<string, number> {
    return new Map(this.blockedIPs);
  }

  // Clean up expired entries to prevent memory leaks
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (entry.resetTime < now) {
        this.storage.delete(key);
      }
    }
    
    // Clean up expired IP blocks
    for (const [ip, unblockTime] of this.blockedIPs.entries()) {
      if (unblockTime < now) {
        this.blockedIPs.delete(ip);
      }
    }
  }
}