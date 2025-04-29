// next.config.ts
import { NextConfig } from 'next'

const nextConfig: NextConfig = {

  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:6000/api/:path*',
      },
    ];
  },
  images: {
    domains: ['your-image-source.com'], // replace this with the actual image domain
  },
};

export default nextConfig
