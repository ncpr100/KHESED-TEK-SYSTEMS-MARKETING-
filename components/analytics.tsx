'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/analytics';
import { initPerformanceMonitoring } from '@/lib/performance';
import { GlobalPerformanceMonitor, initializeGlobalPerformanceMonitor } from '@/lib/global-performance';
import { useGlobalMarket } from '@/lib/global-market';

export function Analytics() {
  const pathname = usePathname();
  const { market } = useGlobalMarket();

  useEffect(() => {
    // Get search params client-side to avoid SSR issues
    const searchParams = new URLSearchParams(window.location.search);
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    pageview(url);
  }, [pathname]);

  useEffect(() => {
    // Initialize performance monitoring on first load
    initPerformanceMonitoring();
    
    // Initialize global performance monitoring with market context
    if (market) {
      initializeGlobalPerformanceMonitor({
        market,
        country: market === 'LATAM' ? 'CO' : market === 'USA' ? 'US' : 'GLOBAL',
      });
    }
  }, [market]);

  return null;
}