import { MetadataRoute } from 'next';

// AI crawlers fall into two groups:
//  • Search / answer agents fetch pages to cite them when a user asks
//    ("best web development company in Ahmedabad"). Allowed, so 8webcom.com
//    can appear in ChatGPT search, Perplexity, Claude and Google AI answers.
//  • Training-only crawlers bulk-collect content for model training. Blocked.
const AI_SEARCH_AGENTS = [
  'OAI-SearchBot',   // ChatGPT search index
  'ChatGPT-User',    // ChatGPT fetching a page a user asked about
  'PerplexityBot',
  'Perplexity-User',
  'Claude-SearchBot',
  'Claude-User',
];

const AI_TRAINING_AGENTS = ['GPTBot', 'CCBot', 'ClaudeBot', 'anthropic-ai'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Never block /_next/: Google must load CSS/JS chunks to render pages
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/studio/'],
      },
      {
        userAgent: AI_SEARCH_AGENTS,
        allow: '/',
        disallow: ['/api/', '/admin/', '/studio/'],
      },
      {
        userAgent: AI_TRAINING_AGENTS,
        disallow: '/',
      },
    ],
    sitemap: 'https://www.8webcom.com/sitemap.xml',
    host: 'https://www.8webcom.com',
  };
}
