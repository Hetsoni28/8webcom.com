import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // The old site's indexed URLs end in "/" (e.g. /about-us/); keep them identical so rankings carry over
  trailingSlash: true,
  transpilePackages: ['styled-components'],
  // Legacy URLs the old site answered on → their pages here (308 permanent)
  async redirects() {
    return [
      { source: '/disclaimer', destination: '/disclaimer-policy/', permanent: true },
      { source: '/refund-and-cancellation', destination: '/refund-and-cancellation-policy/', permanent: true },
      { source: '/contact', destination: '/contacts/', permanent: true },
      { source: '/about', destination: '/about-us/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/index.php', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
    ];
  },
  // Browsers and crawlers always request /favicon.ico; serve the brand icon
  // (src/app/icon.png) there instead of returning a 404.
  async rewrites() {
    return [{ source: '/favicon.ico', destination: '/icon.png' }];
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    // inlineCss was measured and rejected: it embeds the CSS twice (style tag +
    // RSC payload), growing the gzipped home HTML 47 → 98 KB to save one cached 17 KB file.
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // 75 = default; 90 = DETAIL_QUALITY (src/lib/images.ts) for small Sanity originals
    qualities: [75, 90],
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
