import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Show ALL environment variables (redacted values)
  const allEnvVars = Object.keys(process.env).reduce((acc: any, key: string) => {
    const value = process.env[key];
    if (value) {
      // Show first 3 and last 3 characters for security
      if (key.includes('PASSWORD') || key.includes('SECRET') || key.includes('KEY')) {
        acc[key] = value.length > 6 
          ? `${value.substring(0, 3)}...${value.substring(value.length - 3)} (${value.length} chars)`
          : `*** (${value.length} chars)`;
      } else {
        acc[key] = value;
      }
    } else {
      acc[key] = 'EMPTY or UNDEFINED';
    }
    return acc;
  }, {});

  // Specifically check GMAIL variables
  const gmailVars = {
    GMAIL_USER: {
      exists: !!process.env.GMAIL_USER,
      value: process.env.GMAIL_USER || 'NOT SET',
      type: typeof process.env.GMAIL_USER,
      length: process.env.GMAIL_USER?.length || 0
    },
    GMAIL_APP_PASSWORD: {
      exists: !!process.env.GMAIL_APP_PASSWORD,
      value: process.env.GMAIL_APP_PASSWORD 
        ? `${process.env.GMAIL_APP_PASSWORD.substring(0, 3)}...${process.env.GMAIL_APP_PASSWORD.substring(process.env.GMAIL_APP_PASSWORD.length - 3)}`
        : 'NOT SET',
      type: typeof process.env.GMAIL_APP_PASSWORD,
      length: process.env.GMAIL_APP_PASSWORD?.length || 0,
      hasSpaces: process.env.GMAIL_APP_PASSWORD?.includes(' ') || false,
      raw: process.env.GMAIL_APP_PASSWORD ? '[REDACTED]' : 'NOT SET'
    }
  };

  // Filter to show only relevant variables
  const relevantVars = Object.keys(allEnvVars)
    .filter(key => 
      key.startsWith('GMAIL_') || 
      key.startsWith('CONTACT_') || 
      key.includes('EMAIL') ||
      key.startsWith('NEXT_') ||
      key === 'NODE_ENV' ||
      key === 'VERCEL' ||
      key === 'VERCEL_ENV' ||
      key === 'VERCEL_URL'
    )
    .reduce((acc: any, key: string) => {
      acc[key] = allEnvVars[key];
      return acc;
    }, {});

  return Response.json({
    timestamp: new Date().toISOString(),
    gmailVariables: gmailVars,
    relevantEnvironmentVariables: relevantVars,
    totalEnvVars: Object.keys(process.env).length,
    nodeVersion: process.version,
    platform: process.platform
  });
}
