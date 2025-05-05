import type { NextConfig } from 'next';

// https://nextjs.org/docs/api-reference/next.config.js/introduction
const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add your existing Next.js config options here
  
  // Add the rewrites configuration for API proxying
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default config;