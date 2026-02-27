/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'standalone' output for Vercel (use for Railway/Docker only)
  // output: 'standalone',

  // Enhanced image optimization for Vercel CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'khesedtek.com', // Your primary domain
      },
      {
        protocol: 'https',
        hostname: 'www.khesedtek.com',
      },
      {
        protocol: 'https',
        hostname: 'latam.khesedtek.com',
      },
      {
        protocol: 'https', 
        hostname: 'usa.khesedtek.com',
      },
      {
        protocol: 'https',
        hostname: 'global.khesedtek.com',
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com https://*.vercel.live https://*.cloudflare.com https://static.cloudflareinsights.com https://webpack-74c359c67fa0.uf.boot.dev",
              "style-src 'self' 'unsafe-inline'", 
              "img-src 'self' data: blob: https://*.googleapis.com https://*.googleusercontent.com https://*.google-analytics.com",
              "font-src 'self' data:",
              "frame-src 'self' https://*.youtube.com https://*.youtube-nocookie.com https://*.vercel.live",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.vercel.live https://vitals.vercel-insights.com https://static.cloudflareinsights.com https://webpack-74c359c67fa0.uf.boot.dev",
              "frame-ancestors 'self'"
            ].join('; ')
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()'
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
    optimizePackageImports: ['lucide-react'],
  },

  // Enhanced for Vercel Edge Runtime
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    // Temporarily ignore during builds due to Next.js 15 circular dependency issue
    ignoreDuringBuilds: true,
  },

  // Vercel Analytics and Speed Insights optimization
  env: {
    VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
  }
};

module.exports = nextConfig;