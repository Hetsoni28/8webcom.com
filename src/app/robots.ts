import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Allow all indexing bots ──────────────────────────────
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/studio/',
          // Redirect aliases — only canonical URLs are indexed
          '/disclaimer',
          '/refund-and-cancellation',
        ],
      },
      // ── Block AI training crawlers ───────────────────────────
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    sitemap: 'https://www.8webcom.com/sitemap.xml',
    host: 'https://www.8webcom.com',
  };
}
