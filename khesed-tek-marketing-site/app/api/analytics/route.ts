import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const analyticsData = await req.json();
    
    // Log performance metrics (in production, send to your analytics service)
    console.log('Performance Metric:', {
      name: analyticsData.name,
      value: analyticsData.value,
      url: analyticsData.url,
      timestamp: new Date(analyticsData.timestamp).toISOString(),
    });

    // Here you would typically send to your analytics service:
    // - Google Analytics Measurement Protocol
    // - Custom database
    // - Third-party analytics service
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json({ error: 'Failed to process analytics data' }, { status: 500 });
  }
}