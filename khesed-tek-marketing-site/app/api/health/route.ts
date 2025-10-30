import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check - verify the application is running
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        api: 'operational',
        database: 'operational', // Add actual DB health check if you have a database
        cache: 'operational'
      },
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime()
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}