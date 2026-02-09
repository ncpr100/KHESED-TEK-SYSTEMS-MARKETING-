/** @type {import('next').NextConfig} */
const nextConfig = {
  // Railway requires 'standalone' output for Docker deployment
  output: 'standalone',

  // Image optimization for Railway
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

  // Railway deployment configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;