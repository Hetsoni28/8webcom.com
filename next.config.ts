import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  transpilePackages: ['styled-components'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days image cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.8webcom.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Sanity CMS hosted images
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
