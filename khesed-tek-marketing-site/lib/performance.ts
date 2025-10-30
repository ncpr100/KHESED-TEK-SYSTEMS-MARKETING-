// Performance monitoring utilities for KHESED-TEK
'use client';

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Analytics endpoint for sending metrics
const ANALYTICS_ENDPOINT = '/api/analytics';

// Web Vitals tracking
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Core Web Vitals
  getCLS((metric) => {
    sendToAnalytics({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      entries: metric.entries,
    });
  });

  getFID((metric) => {
    sendToAnalytics({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      entries: metric.entries,
    });
  });

  getFCP((metric) => {
    sendToAnalytics({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      entries: metric.entries,
    });
  });

  getLCP((metric) => {
    sendToAnalytics({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      entries: metric.entries,
    });
  });

  getTTFB((metric) => {
    sendToAnalytics({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      entries: metric.entries,
    });
  });
}

// Send metrics to analytics
function sendToAnalytics(metric: any) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  if (navigator.sendBeacon) {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      id: metric.id,
      url: window.location.href,
      timestamp: Date.now(),
    });
    
    navigator.sendBeacon(ANALYTICS_ENDPOINT, body);
  }
}

// Error tracking
export function initErrorTracking() {
  if (typeof window === 'undefined') return;

  // Global error handler
  window.addEventListener('error', (event) => {
    trackError({
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack,
      type: 'javascript_error',
    });
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    trackError({
      message: event.reason?.message || 'Unhandled Promise Rejection',
      error: event.reason?.stack,
      type: 'unhandled_promise_rejection',
    });
  });
}

// Track custom errors
export function trackError(errorInfo: {
  message: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  error?: string;
  type: string;
  userId?: string;
}) {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: errorInfo.message,
      fatal: false,
      custom_parameter_error_type: errorInfo.type,
    });
  }

  // Send to custom error tracking endpoint
  if (navigator.sendBeacon) {
    const body = JSON.stringify({
      ...errorInfo,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    });
    
    navigator.sendBeacon('/api/errors', body);
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Tracked Error:', errorInfo);
  }
}

// Performance observer for custom metrics
export function initPerformanceObserver() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // Resource timing
  const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        trackResourceTiming(entry as PerformanceResourceTiming);
      }
    }
  });
  resourceObserver.observe({ entryTypes: ['resource'] });

  // Navigation timing
  const navigationObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        trackNavigationTiming(entry as PerformanceNavigationTiming);
      }
    }
  });
  navigationObserver.observe({ entryTypes: ['navigation'] });
}

// Track resource loading performance
function trackResourceTiming(entry: PerformanceResourceTiming) {
  const duration = entry.responseEnd - entry.startTime;
  
  // Only track slow resources (> 1 second)
  if (duration > 1000) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'slow_resource', {
        event_category: 'Performance',
        event_label: entry.name,
        value: Math.round(duration),
      });
    }
  }
}

// Track navigation performance
function trackNavigationTiming(entry: PerformanceNavigationTiming) {
  const metrics = {
    dns_lookup: entry.domainLookupEnd - entry.domainLookupStart,
    tcp_connection: entry.connectEnd - entry.connectStart,
    server_response: entry.responseStart - entry.requestStart,
    dom_processing: entry.domContentLoadedEventStart - entry.responseEnd,
    page_load: entry.loadEventStart - entry.fetchStart,
  };

  // Send each metric to analytics
  Object.entries(metrics).forEach(([name, value]) => {
    if (typeof window !== 'undefined' && window.gtag && value > 0) {
      window.gtag('event', `navigation_${name}`, {
        event_category: 'Performance',
        value: Math.round(value),
      });
    }
  });
}

// Initialize all performance monitoring
export function initPerformanceMonitoring() {
  initWebVitals();
  initErrorTracking();
  initPerformanceObserver();
}