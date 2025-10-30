// Global performance monitoring for KHESED-TEK SYSTEMS
'use client';

interface PerformanceConfig {
  market: 'LATAM' | 'USA' | 'GLOBAL';
  country: string;
  connectionType?: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  market: string;
  country: string;
  url: string;
  timestamp: string;
  connectionType?: string;
  userAgent?: string;
}

// Performance thresholds by market (accounting for geographic latency)
const PERFORMANCE_THRESHOLDS = {
  LATAM: {
    FCP: 2500,  // First Contentful Paint (ms) - Higher threshold for LATAM
    LCP: 4000,  // Largest Contentful Paint (ms)
    FID: 150,   // First Input Delay (ms)
    CLS: 0.15,  // Cumulative Layout Shift
    TTFB: 1500  // Time to First Byte (ms)
  },
  USA: {
    FCP: 1800,  // Faster expected performance for USA
    LCP: 2500,
    FID: 100,
    CLS: 0.1,
    TTFB: 800
  },
  GLOBAL: {
    FCP: 3000,  // Conservative thresholds for global
    LCP: 4500,
    FID: 200,
    CLS: 0.2,
    TTFB: 2000
  }
} as const;

class GlobalPerformanceMonitor {
  private config: PerformanceConfig;
  private observer: PerformanceObserver | null = null;

  constructor(config: PerformanceConfig) {
    this.config = config;
    this.initializeMonitoring();
  }

  private initializeMonitoring() {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.monitorWebVitals();
    
    // Monitor resource loading
    this.monitorResourcePerformance();
    
    // Monitor navigation timing
    this.monitorNavigationTiming();
  }

  private monitorWebVitals() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.reportMetric({
            name: 'FCP',
            value: entry.startTime,
            market: this.config.market,
            country: this.config.country,
            url: window.location.href,
            timestamp: new Date().toISOString(),
            connectionType: this.getConnectionType()
          });
        }
      }
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.reportMetric({
        name: 'LCP',
        value: lastEntry.startTime,
        market: this.config.market,
        country: this.config.country,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        connectionType: this.getConnectionType()
      });
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.reportMetric({
          name: 'FID',
          value: (entry as any).processingStart - entry.startTime,
          market: this.config.market,
          country: this.config.country,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          connectionType: this.getConnectionType()
        });
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Report CLS when page becomes hidden
    const reportCLS = () => {
      this.reportMetric({
        name: 'CLS',
        value: clsValue,
        market: this.config.market,
        country: this.config.country,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        connectionType: this.getConnectionType()
      });
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportCLS();
      }
    });
  }

  private monitorResourcePerformance() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      // Monitor slow-loading resources
      const resources = performance.getEntriesByType('resource');
      
      resources.forEach((resource: PerformanceEntry) => {
        const resourceEntry = resource as PerformanceResourceTiming;
        const duration = resourceEntry.responseEnd - resourceEntry.startTime;
        
        // Report slow resources (>2s)
        if (duration > 2000) {
          this.reportMetric({
            name: 'SLOW_RESOURCE',
            value: duration,
            market: this.config.market,
            country: this.config.country,
            url: resourceEntry.name,
            timestamp: new Date().toISOString(),
            connectionType: this.getConnectionType()
          });
        }
      });
    });
  }

  private monitorNavigationTiming() {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // Time to First Byte (TTFB)
        const ttfb = navigation.responseStart - navigation.requestStart;
        this.reportMetric({
          name: 'TTFB',
          value: ttfb,
          market: this.config.market,
          country: this.config.country,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          connectionType: this.getConnectionType()
        });

        // DNS resolution time
        const dnsTime = navigation.domainLookupEnd - navigation.domainLookupStart;
        this.reportMetric({
          name: 'DNS_TIME',
          value: dnsTime,
          market: this.config.market,
          country: this.config.country,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          connectionType: this.getConnectionType()
        });
      }
    });
  }

  private getConnectionType(): string {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return connection?.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  private async reportMetric(metric: PerformanceMetric) {
    try {
      // Check if metric exceeds threshold
      const thresholds = PERFORMANCE_THRESHOLDS[this.config.market];
      const threshold = thresholds[metric.name as keyof typeof thresholds];
      const isSlowPerformance = threshold && metric.value > threshold;

      // Send to analytics API
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'performance',
          metric: {
            ...metric,
            isSlowPerformance,
            threshold,
            userAgent: navigator.userAgent
          }
        }),
      });

      // Log slow performance to console for debugging
      if (isSlowPerformance) {
        console.warn(`Slow ${metric.name} detected for ${this.config.market}:`, {
          value: metric.value,
          threshold,
          country: this.config.country,
          connectionType: metric.connectionType
        });
      }

    } catch (error) {
      console.error('Failed to report performance metric:', error);
    }
  }

  // Public method to report custom metrics
  public reportCustomMetric(name: string, value: number, additionalData?: Record<string, any>) {
    this.reportMetric({
      name: `CUSTOM_${name}`,
      value,
      market: this.config.market,
      country: this.config.country,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      connectionType: this.getConnectionType(),
      ...additionalData
    });
  }

  // Get performance score for current market
  public getPerformanceScore(): number {
    const thresholds = PERFORMANCE_THRESHOLDS[this.config.market];
    // Implementation would calculate score based on collected metrics
    // This is a simplified version
    return 85; // Placeholder
  }
}

// Global performance monitor instance
let globalPerformanceMonitor: GlobalPerformanceMonitor | null = null;

export function initializeGlobalPerformanceMonitor(config: PerformanceConfig) {
  if (typeof window !== 'undefined' && !globalPerformanceMonitor) {
    globalPerformanceMonitor = new GlobalPerformanceMonitor(config);
  }
  return globalPerformanceMonitor;
}

export function reportCustomPerformanceMetric(name: string, value: number, additionalData?: Record<string, any>) {
  if (globalPerformanceMonitor) {
    globalPerformanceMonitor.reportCustomMetric(name, value, additionalData);
  }
}

export { PERFORMANCE_THRESHOLDS, GlobalPerformanceMonitor };