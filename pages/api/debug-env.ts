// API route to check environment variables in production
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development or with special key
  const isDev = process.env.NODE_ENV === 'development';
  const debugKey = req.query.key;
  
  if (!isDev && debugKey !== 'khesed-debug-2024') {
    return res.status(404).json({ error: 'Not found' });
  }

  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_LATAM_DEMO_VIDEO: process.env.NEXT_PUBLIC_LATAM_DEMO_VIDEO,
    NEXT_PUBLIC_USA_DEMO_VIDEO: process.env.NEXT_PUBLIC_USA_DEMO_VIDEO,
    NEXT_PUBLIC_LATAM_QUICK_TOUR: process.env.NEXT_PUBLIC_LATAM_QUICK_TOUR,
    NEXT_PUBLIC_USA_QUICK_TOUR: process.env.NEXT_PUBLIC_USA_QUICK_TOUR,
    NEXT_PUBLIC_GLOBAL_DEMO: process.env.NEXT_PUBLIC_GLOBAL_DEMO,
    NEXT_PUBLIC_VIDEO_CACHE_BUST: process.env.NEXT_PUBLIC_VIDEO_CACHE_BUST,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  };

  return res.status(200).json({
    message: 'Environment Variables Debug',
    timestamp: new Date().toISOString(),
    environment: envVars,
    allNextPublicVars: Object.keys(process.env)
      .filter(key => key.startsWith('NEXT_PUBLIC_'))
      .reduce((acc, key) => {
        acc[key] = process.env[key];
        return acc;
      }, {} as Record<string, string | undefined>)
  });
}