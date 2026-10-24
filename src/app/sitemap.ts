import { MetadataRoute } from 'next';
import { getServiceSlugs, getSitemapEntries, type SitemapEntry } from '@/sanity/content';

const BASE = 'https://www.8webcom.com';

// Used when Sanity is unreachable or a page has no CMS document yet
const SITE_UPDATED = new Date('2026-10-24');

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

// Each page's lastModified = newest edit among the Sanity types it renders
const PAGES: { path: string; types: string[]; changeFrequency: Freq; priority: number }[] = [
  {
    path: '',
    types: ['homepageSettings', 'heroSlide', 'service', 'techPlatform', 'crmCard', 'caseStudy', 'testimonial', 'clientLogo'],
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  { path: '/services', types: ['servicesPageSettings', 'service'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about-us', types: ['aboutSettings', 'testimonial'], changeFrequency: 'monthly', priority: 0.8 },
  { path: '/projects', types: ['projectsPageSettings', 'project', 'caseStudy'], changeFrequency: 'weekly', priority: 0.75 },
  { path: '/contacts', types: ['contactPageSettings'], changeFrequency: 'yearly', priority: 0.85 },
  { path: '/careers', types: ['careersSettings'], changeFrequency: 'monthly', priority: 0.6 },
];

const SERVICE_PRIORITY: Record<string, number> = {
  'web-development': 0.95,
  'web-portal': 0.9,
  'digital-marketing': 0.9,
  'crm-solutions': 0.85,
};

const POLICIES = ['privacy-policy', 'disclaimer-policy', 'refund-and-cancellation-policy'];

function latest(entries: SitemapEntry[], match: (e: SitemapEntry) => boolean): Date {
  const times = entries.filter(match).map((e) => Date.parse(e._updatedAt)).filter(Number.isFinite);
  return times.length ? new Date(Math.max(...times)) : SITE_UPDATED;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [entries, serviceSlugs] = await Promise.all([getSitemapEntries(), getServiceSlugs()]);

  return [
    ...PAGES.map(({ path, types, changeFrequency, priority }) => ({
      url: `${BASE}${path}`,
      lastModified: latest(entries, (e) => types.includes(e._type)),
      changeFrequency,
      priority,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${BASE}/services/${slug}`,
      lastModified: latest(entries, (e) => e._type === 'service' && e.slug === slug),
      changeFrequency: 'monthly' as const,
      priority: SERVICE_PRIORITY[slug] ?? 0.8,
    })),
    ...POLICIES.map((slug) => ({
      url: `${BASE}/${slug}`,
      lastModified: latest(entries, (e) => e._type === 'policyPage' && e.slug === slug),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}
