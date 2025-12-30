import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const analyticsData = await req.json();
    
    // Handle both direct metrics and nested metric objects from global performance monitor
    const metric = analyticsData.type === 'performance' && analyticsData.metric 
      ? analyticsData.metric 
      : analyticsData;
    
    // Ensure we have valid metric data
    if (!metric || typeof metric !== 'object') {
      return NextResponse.json({ error: 'Invalid metric data' }, { status: 400 });
    }
    
    // Safe timestamp handling with multiple fallbacks
    let validTimestamp: Date;
    
    try {
      if (metric.timestamp) {
        // Try to parse the timestamp
        const parsedDate = new Date(metric.timestamp);
        
        // Check if the parsed date is valid
        if (!isNaN(parsedDate.getTime())) {
          validTimestamp = parsedDate;
        } else {
          throw new Error('Invalid timestamp provided');
        }
      } else {
        validTimestamp = new Date();
      }
    } catch (timestampError) {
      // Any timestamp parsing error falls back to current time
      validTimestamp = new Date();
    }
    
    // Double-check timestamp validity before using toISOString()
    const isoTimestamp = !isNaN(validTimestamp.getTime()) 
      ? validTimestamp.toISOString() 
      : new Date().toISOString();
    
    // Log performance metrics (in production, send to your analytics service)
    console.log('Performance Metric:', {
      name: metric.name,
      value: metric.value,
      url: metric.url,
      timestamp: isoTimestamp,
      market: metric.market,
      country: metric.country,
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