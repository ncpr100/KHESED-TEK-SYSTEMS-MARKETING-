import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const errorData = await req.json();
    
    // Log errors (in production, send to error tracking service)
    console.error('Client Error:', {
      message: errorData.message,
      type: errorData.type,
      url: errorData.url,
      userAgent: errorData.userAgent,
      timestamp: new Date(errorData.timestamp).toISOString(),
      stack: errorData.error,
    });

    // Here you would typically send to your error tracking service:
    // - Sentry
    // - LogRocket
    // - Bugsnag
    // - Custom logging service
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error API Error:', error);
    return NextResponse.json({ error: 'Failed to process error data' }, { status: 500 });
  }
}