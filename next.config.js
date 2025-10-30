/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Image optimization for global CDN
  images: {
    domains: ['khesed-tek.com', 'khesed-tek.us'],
    formats: ['image/webp', 'image/avif'],
  },

  // Security headers for global markets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
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
};

module.exports = nextConfig;
