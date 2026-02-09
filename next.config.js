/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'standalone' output for Vercel (use for Railway/Docker only)
  // output: 'standalone',

  // Enhanced image optimization for Vercel CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'khesed-tek-systems.org',
      },
      {
        protocol: 'https', 
        hostname: 'khesed-tek-systems.us',
      },
      {
        protocol: 'https',
        hostname: 'khesedtek.com',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
  },

  // Security headers (enhanced for Vercel)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.vercel.live",
              "style-src 'self' 'unsafe-inline'", 
              "img-src 'self' data: blob: *.googleapis.com *.googleusercontent.com *.google-analytics.com",
              "font-src 'self' data:",
              "connect-src 'self' *.google-analytics.com *.analytics.google.com *.googletagmanager.com *.vercel.live vitals.vercel-insights.com",
              "frame-ancestors 'none'"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Vercel-optimized experimental features
  experimental: {
    // optimizeCss: true, // Disabled - causes critters module error in Next.js 15
    optimizePackageImports: ['lucide-react'],
  },

  // Enhanced for Vercel Edge Runtime
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Vercel Analytics and Speed Insights optimization
  env: {
    VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  }
};

module.exports = nextConfig;
