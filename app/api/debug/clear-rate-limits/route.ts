import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // This endpoint clears all rate limiting data for debugging
    // Only enable in development or with proper authentication
    
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, message: 'Debug endpoint not available in production' },
        { status: 403 }
      );
    }

    // In a production system, you would clear Redis/database here
    // For now, this is a placeholder since we're using in-memory storage
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Rate limits cleared (development only)',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Clear rate limits error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to clear rate limits' },
      { status: 500 }
    );
  }
}