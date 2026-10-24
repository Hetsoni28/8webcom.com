// One function per page: fetch from Sanity, then fill every empty field from
// src/sanity/defaults.ts. A half-filled Sanity document can never break a layout.
import type { Metadata } from 'next';
import { sanityFetch } from './fetch';
import * as Q from './queries';
import {
  SITE_DEFAULTS,
  HOME_DEFAULTS,
  ABOUT_DEFAULTS,
  SERVICES_PAGE_DEFAULTS,
  SERVICE_DEFAULTS,
  PROJECTS_PAGE_DEFAULTS,
  CAREERS_DEFAULTS,
  CONTACT_DEFAULTS,
  POLICY_DEFAULTS,
  COLLECTION_DEFAULTS,
  type PolicySlug,
  type ServiceDetail,
  type Seo,
} from './defaults';

/** Every Sanity fetch carries this tag, so one webhook call refreshes the whole site. */
export const SANITY_TAG = 'sanity';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Overlay Sanity data on defaults, field by field.
 * - empty string / null / undefined / empty array in Sanity → keep default
 * - objects merge recursively; arrays and scalars replace
 */
export function mergeContent<T>(base: T, override: unknown): T {
  if (override === null || override === undefined) return base;
  if (typeof override === 'string' && override.trim() === '') return base;
  if (Array.isArray(override)) return (override.length ? override : base) as T;
  if (isPlainObject(base) && isPlainObject(override)) {
    const out: Record<string, unknown> = { ...base };
    for (const [k, v] of Object.entries(override)) out[k] = mergeContent((base as Record<string, unknown>)[k], v);
    return out as T;
  }
  return override as T;
}

async function getSingleton<T>(query: string, defaults: T, tag: string, params?: Record<string, unknown>): Promise<T> {
  const doc = await sanityFetch<unknown>({ query, params, fallback: null, tags: [SANITY_TAG, tag] });
  return mergeContent(defaults, doc);
}

async function getList<T>(query: string, fallback: T[], tag: string): Promise<T[]> {
  return sanityFetch<T[]>({ query, fallback, tags: [SANITY_TAG, tag] });
}

// ─── Global ──────────────────────────────────────────────────────
export async function getSiteSettings() {
  const s = await getSingleton(Q.siteSettingsQuery, SITE_DEFAULTS, 'siteSettings');
  const c = s.contact;
  const whatsappUrl = `https://wa.me/${c.whatsappNumber}${c.whatsappMessage ? `?text=${encodeURIComponent(c.whatsappMessage)}` : ''}`;
  return {
    ...s,
    contact: { ...c, phoneTel: c.phone.replace(/[^\d+]/g, ''), whatsappUrl },
    header: {
      ...s.header,
      // Items without a dropdown come back from Sanity with children = null
      navLinks: s.header.navLinks.map((l) => ({ ...l, children: l.children ?? [] })),
    },
    // WhatsApp always uses the number + message from Contact details
    socialLinks: s.socialLinks.map((l) => (l.platform === 'WhatsApp' ? { ...l, url: whatsappUrl } : l)),
  };
}
export type ResolvedSiteSettings = Awaited<ReturnType<typeof getSiteSettings>>;

// ─── Pages ───────────────────────────────────────────────────────
export const getHomeContent = () => getSingleton(Q.homepageQuery, HOME_DEFAULTS, 'homepageSettings');
export const getAboutContent = () => getSingleton(Q.aboutPageQuery, ABOUT_DEFAULTS, 'aboutSettings');
export const getServicesPageContent = () => getSingleton(Q.servicesPageQuery, SERVICES_PAGE_DEFAULTS, 'servicesPageSettings');
export const getProjectsPageContent = () => getSingleton(Q.projectsPageQuery, PROJECTS_PAGE_DEFAULTS, 'projectsPageSettings');
export const getCareersContent = () => getSingleton(Q.careersPageQuery, CAREERS_DEFAULTS, 'careersSettings');
export const getContactContent = () => getSingleton(Q.contactPageQuery, CONTACT_DEFAULTS, 'contactPageSettings');
export const getPolicyContent = (slug: PolicySlug) =>
  getSingleton(Q.policyPageQuery, POLICY_DEFAULTS[slug], 'policyPage', { slug });

export async function getServiceDetail(slug: string): Promise<ServiceDetail | null> {
  const fallback = SERVICE_DEFAULTS.find((s) => s.slug === slug) ?? null;
  const doc = await sanityFetch<unknown>({
    query: Q.serviceBySlugQuery,
    params: { slug },
    fallback: null,
    tags: [SANITY_TAG, 'service'],
  });
  if (!doc && !fallback) return null;
  const empty: ServiceDetail = { title: '', slug, image: '', description: '', headline: '', intro: '', features: [], technologies: [], keywords: [], seo: {} };
  return mergeContent(fallback ?? empty, doc);
}

export async function getServiceSlugs(): Promise<string[]> {
  const fromCms = await sanityFetch<string[]>({ query: Q.serviceSlugsQuery, fallback: [], tags: [SANITY_TAG, 'service'] });
  return Array.from(new Set([...SERVICE_DEFAULTS.map((s) => s.slug), ...fromCms]));
}

// ─── Lists ───────────────────────────────────────────────────────
export const getHeroSlides = () => getList(Q.heroSlidesQuery, COLLECTION_DEFAULTS.heroSlides, 'heroSlide');
export const getServices = () => getList(Q.servicesQuery, COLLECTION_DEFAULTS.services, 'service');
export const getTechPlatforms = () => getList(Q.techPlatformsQuery, COLLECTION_DEFAULTS.techPlatforms, 'techPlatform');
export const getCrmCards = () => getList(Q.crmCardsQuery, COLLECTION_DEFAULTS.crmCards, 'crmCard');
export const getCaseStudies = () => getList(Q.caseStudiesQuery, COLLECTION_DEFAULTS.caseStudies, 'caseStudy');
export const getFeaturedTestimonials = () => getList(Q.testimonialsQuery, COLLECTION_DEFAULTS.testimonials, 'testimonial');
export const getAllTestimonials = () => getList(Q.allTestimonialsQuery, COLLECTION_DEFAULTS.testimonials, 'testimonial');
export const getClientLogos = () => getList(Q.clientLogosQuery, COLLECTION_DEFAULTS.clientLogos, 'clientLogo');

export async function getProjects() {
  // Fallback: the real client websites from the Work Showcase
  const caseStudies = await getCaseStudies();
  const fallback = caseStudies.map((c) => ({
    id: String(c.id),
    title: c.title,
    category: c.category,
    client: undefined as string | undefined,
    description: '',
    image: c.image,
    url: c.url,
    tags: [] as string[],
  }));
  return getList(Q.projectsQuery, fallback, 'project');
}

export type SitemapEntry = { _type: string; slug?: string; _updatedAt: string };
export const getSitemapEntries = () =>
  sanityFetch<SitemapEntry[]>({ query: Q.sitemapQuery, fallback: [], tags: [SANITY_TAG] });

// ─── SEO helper ──────────────────────────────────────────────────
const SITE_URL = 'https://www.8webcom.com';
const DEFAULT_OG = 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png';

export function buildMetadata(seo: Seo, path: string, extra?: Partial<Metadata>): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const title = seo.metaTitle;
  const description = seo.metaDescription;
  const image = seo.ogImage || DEFAULT_OG;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { 'en-IN': url } },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: '8webcom.com',
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: title ?? '8webcom.com' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@coo8webcom',
      creator: '@coo8webcom',
      title,
      description,
      images: [{ url: image, alt: title ?? '8webcom.com' }],
    },
    ...extra,
  };
}
