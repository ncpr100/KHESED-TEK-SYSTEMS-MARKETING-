'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/analytics';
import { initPerformanceMonitoring } from '@/lib/performance';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Get search params client-side to avoid SSR issues
    const searchParams = new URLSearchParams(window.location.search);
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    pageview(url);
  }, [pathname]);

  useEffect(() => {
    // Initialize performance monitoring on first load
    initPerformanceMonitoring();
  }, []);

  return null;
}