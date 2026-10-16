import { MetadataRoute } from 'next';

// All real, indexed URLs — matches src/app/(site)/ route structure exactly
const BASE = 'https://www.8webcom.com';

// Pin to a real recent date so search engines see a fresh lastModified
const SITE_UPDATED = new Date('2026-10-15');

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Homepage (highest priority) ──────────────────────────
    {
      url: BASE,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // ── Service Pages (core commercial intent) ───────────────
    {
      url: `${BASE}/services`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/services/web-development`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${BASE}/services/web-portal`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/services/digital-marketing`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/services/crm-solutions`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.85,
    },

    // ── Brand / Trust Pages ──────────────────────────────────
    {
      url: `${BASE}/about-us`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/projects`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',   // portfolio updates frequently
      priority: 0.75,
    },

    // ── Conversion Pages ─────────────────────────────────────
    {
      url: `${BASE}/contacts`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.85,
    },

    // ── HR Page ──────────────────────────────────────────────
    {
      url: `${BASE}/careers`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // ── Legal Pages (canonical only) ─────────────────────────
    {
      url: `${BASE}/disclaimer-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/refund-and-cancellation-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/privacy-policy`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
