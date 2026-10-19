/**
 * One-time import of the current website content into Sanity.
 *
 *   npm run seed:sanity              → import (refuses if Sanity already has content)
 *   npm run seed:sanity -- --dry-run → show what would be created, write nothing
 *   npm run seed:sanity -- --force   → overwrite existing documents (careful!)
 *
 * Reads src/sanity/defaults.ts — the same content the site falls back to —
 * uploads every image to Sanity, and creates all page documents + list items.
 * Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN (Editor) in .env.local.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createClient, type SanityClient } from '@sanity/client';
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
  type Hero,
  type Seo,
} from '../src/sanity/defaults';

const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

// ─── Env ────────────────────────────────────────────────────────────────────
if (fs.existsSync(path.join(ROOT, '.env.local'))) process.loadEnvFile(path.join(ROOT, '.env.local'));
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;
if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is missing in .env.local');
if (!token && !DRY_RUN) throw new Error('SANITY_API_TOKEN (Editor permission) is missing in .env.local');

const client: SanityClient = createClient({ projectId, dataset, apiVersion: '2024-10-13', token, useCdn: false });

// ─── Helpers ────────────────────────────────────────────────────────────────
type Doc = { _id: string; _type: string; [key: string]: unknown };
type ImageValue = { _type: string; asset: { _type: 'reference'; _ref: string }; alt?: string };

const keyed = <T extends object>(items: readonly T[], type?: string) =>
  items.map((item, i) => ({ _key: `k${i}`, ...(type ? { _type: type } : {}), ...item }));

const uploads = new Map<string, Promise<string | null>>();
let uploadCount = 0;

async function uploadAsset(src: string): Promise<string | null> {
  if (DRY_RUN) {
    uploadCount++;
    return 'image-dry-run';
  }
  let buffer: Buffer;
  if (src.startsWith('http')) {
    const res = await fetch(src);
    if (!res.ok) {
      console.warn(`  ! could not download ${src} (${res.status}) — skipped`);
      return null;
    }
    buffer = Buffer.from(await res.arrayBuffer());
  } else {
    const file = path.join(ROOT, 'public', src);
    if (!fs.existsSync(file)) {
      console.warn(`  ! missing local file ${file} — skipped`);
      return null;
    }
    buffer = fs.readFileSync(file);
  }
  const filename = decodeURIComponent(new URL(src, 'https://local/').pathname.split('/').pop() || 'image');
  const asset = await client.assets.upload('image', buffer, { filename });
  uploadCount++;
  console.log(`  ↑ ${filename}`);
  return asset._id;
}

async function image(src: string | undefined, alt?: string, type = 'image'): Promise<ImageValue | undefined> {
  if (!src) return undefined;
  if (!uploads.has(src)) uploads.set(src, uploadAsset(src));
  const id = await uploads.get(src)!;
  if (!id) return undefined;
  return { _type: type, asset: { _type: 'reference', _ref: id }, ...(alt ? { alt } : {}) };
}

const seo = (s: Seo) => ({ _type: 'seo', metaTitle: s.metaTitle, metaDescription: s.metaDescription });
const hero = async (h: Hero) => ({
  _type: 'pageHero',
  eyebrow: h.eyebrow,
  title: h.title,
  highlight: h.highlight,
  image: await image(h.image),
});
const features = (list: readonly { icon: string; title: string; description: string }[]) =>
  Promise.all(list.map(async (f, i) => ({ _key: `k${i}`, icon: await image(f.icon), title: f.title, description: f.description })));
const images = (list: readonly { src: string; alt: string }[]) =>
  Promise.all(list.map(async (img, i) => ({ _key: `k${i}`, ...(await image(img.src, img.alt, 'imageWithAlt')) })));
const links = (list: readonly { label: string; href: string }[]) => keyed(list.map((l) => ({ label: l.label, href: l.href })), 'link');

// ─── Build documents ────────────────────────────────────────────────────────
export async function buildDocuments(): Promise<Doc[]> {
  const S = SITE_DEFAULTS;
  const H = HOME_DEFAULTS;
  const A = ABOUT_DEFAULTS;
  const SP = SERVICES_PAGE_DEFAULTS;
  const C = COLLECTION_DEFAULTS;

  const docs: Doc[] = [
    {
      _id: 'siteSettings',
      _type: 'siteSettings',
      contact: S.contact,
      socialLinks: keyed(S.socialLinks),
      header: {
        navLinks: keyed(S.header.navLinks.map((l) => ({ label: l.label, href: l.href, children: links(l.children) })), 'navItem'),
        ctaLabel: S.header.ctaLabel,
        ctaHref: S.header.ctaHref,
        sideMenuText: S.header.sideMenuText,
      },
      footer: {
        usefulTitle: S.footer.usefulTitle,
        usefulLinks: links(S.footer.usefulLinks),
        servicesTitle: S.footer.servicesTitle,
        serviceLinks: links(S.footer.serviceLinks),
        contactTitle: S.footer.contactTitle,
        legalLinks: links(S.footer.legalLinks),
      },
      stats: keyed(S.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label })), 'stat'),
    },
    {
      _id: 'homepageSettings',
      _type: 'homepageSettings',
      seo: seo(H.seo),
      hero: { h1: H.hero.h1, trustMetrics: keyed(H.hero.trustMetrics) },
      about: {
        ...H.about,
        images: await images(H.about.images),
        features: await features(H.about.features),
      },
      servicesSection: H.servicesSection,
      techSection: H.techSection,
      crmSection: H.crmSection,
      caseStudiesSection: H.caseStudiesSection,
      testimonialsSection: H.testimonialsSection,
      clientsSection: H.clientsSection,
      faq: { ...H.faq, items: keyed(H.faq.items, 'faqItem') },
      contactCta: H.contactCta,
    },
    {
      _id: 'aboutSettings',
      _type: 'aboutSettings',
      seo: seo(A.seo),
      hero: await hero(A.hero),
      story: { ...A.story, images: await images(A.story.images), features: await features(A.story.features) },
      visionMission: keyed(A.visionMission),
      values: { ...A.values, items: keyed(A.values.items, 'titledText') },
    },
    {
      _id: 'servicesPageSettings',
      _type: 'servicesPageSettings',
      seo: seo(SP.seo),
      hero: await hero(SP.hero),
      listingButtonLabel: SP.listingButtonLabel,
      detail: SP.detail,
      process: { ...SP.process, steps: keyed(SP.process.steps, 'titledText') },
      whyChoose: { ...SP.whyChoose, items: keyed(SP.whyChoose.items) },
    },
    {
      _id: 'projectsPageSettings',
      _type: 'projectsPageSettings',
      seo: seo(PROJECTS_PAGE_DEFAULTS.seo),
      hero: await hero(PROJECTS_PAGE_DEFAULTS.hero),
      section: PROJECTS_PAGE_DEFAULTS.section,
      testimonialsSection: PROJECTS_PAGE_DEFAULTS.testimonialsSection,
    },
    {
      _id: 'careersSettings',
      _type: 'careersSettings',
      seo: seo(CAREERS_DEFAULTS.seo),
      hero: await hero(CAREERS_DEFAULTS.hero),
      blocks: keyed(CAREERS_DEFAULTS.blocks),
      positions: CAREERS_DEFAULTS.positions,
    },
    {
      _id: 'contactPageSettings',
      _type: 'contactPageSettings',
      seo: seo(CONTACT_DEFAULTS.seo),
      hero: await hero(CONTACT_DEFAULTS.hero),
      cards: CONTACT_DEFAULTS.cards,
      intro: { ...CONTACT_DEFAULTS.intro, highlights: keyed(CONTACT_DEFAULTS.intro.highlights, 'titledText') },
      formServices: CONTACT_DEFAULTS.formServices,
      mapCardTitle: CONTACT_DEFAULTS.mapCardTitle,
    },
  ];

  for (const p of Object.values(POLICY_DEFAULTS)) {
    docs.push({
      _id: `policy-${p.slug}`,
      _type: 'policyPage',
      slug: p.slug,
      seo: seo(p.seo),
      hero: await hero(p.hero),
      heading: p.heading,
      badgeLabel: p.badgeLabel,
      lastUpdated: p.lastUpdated,
      intro: p.intro,
      sections: keyed(p.sections),
    });
  }

  for (const [i, s] of C.heroSlides.entries()) {
    docs.push({
      _id: `heroSlide-${i + 1}`,
      _type: 'heroSlide',
      title: s.title,
      category: s.category,
      description: s.description,
      image: await image(s.image),
      ctaLabel: s.ctaLabel,
      ctaHref: s.ctaHref,
      order: i + 1,
    });
  }

  for (const [i, s] of SERVICE_DEFAULTS.entries()) {
    docs.push({
      _id: `service-${s.slug}`,
      _type: 'service',
      title: s.title,
      slug: { _type: 'slug', current: s.slug },
      order: i + 1,
      image: await image(s.image),
      shortDescription: s.description,
      headline: s.headline,
      intro: s.intro,
      features: keyed(s.features, 'titledText'),
      technologies: s.technologies,
      keywords: s.keywords,
      seo: seo(s.seo),
    });
  }

  for (const [i, t] of C.techPlatforms.entries()) {
    docs.push({
      _id: `techPlatform-${i + 1}`,
      _type: 'techPlatform',
      name: t.name,
      description: t.description,
      image: await image(t.image),
      icon: await image(t.icon),
      order: i + 1,
    });
  }

  for (const [i, c] of C.crmCards.entries()) {
    docs.push({ _id: `crmCard-${i + 1}`, _type: 'crmCard', title: c.title, description: c.description, image: await image(c.image), href: c.href, order: i + 1 });
  }

  for (const [i, c] of C.caseStudies.entries()) {
    docs.push({ _id: `caseStudy-${i + 1}`, _type: 'caseStudy', title: c.title, category: c.category, image: await image(c.image), url: c.url, order: i + 1 });
  }

  for (const [i, t] of C.testimonials.entries()) {
    docs.push({ _id: `testimonial-${i + 1}`, _type: 'testimonial', name: t.name, company: t.company, rating: t.rating, review: t.review, featured: true, order: i + 1 });
  }

  for (const [i, l] of C.clientLogos.entries()) {
    docs.push({ _id: `clientLogo-${i + 1}`, _type: 'clientLogo', name: l.name, logo: await image(l.src), order: i + 1 });
  }

  return docs;
}

// ─── Run ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Sanity project ${projectId} / dataset "${dataset}"${DRY_RUN ? ' (dry run)' : ''}`);

  if (!DRY_RUN && !FORCE) {
    const existing = await client.fetch<number>(`count(*[!(_id in path("_.**")) && !(_type match "sanity.*")])`);
    if (existing > 0) {
      console.error(`\nSanity already contains ${existing} document(s). Nothing was changed.`);
      console.error('Re-run with --force to overwrite them with the website defaults (this replaces editor changes).');
      process.exit(1);
    }
  }

  console.log('\nPreparing documents and uploading images…');
  const docs = await buildDocuments();

  const byType = docs.reduce<Record<string, number>>((acc, d) => ((acc[d._type] = (acc[d._type] ?? 0) + 1), acc), {});
  console.log('\nDocuments:', Object.entries(byType).map(([t, n]) => `${t} ×${n}`).join(', '));
  console.log(`Images: ${uploadCount}`);

  if (DRY_RUN) {
    console.log('\nDry run complete — nothing was written.');
    return;
  }

  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`\n✓ Imported ${docs.length} documents. Open /studio to edit.`);
}

// Run only when executed directly (lets checks import buildDocuments)
if (require.main === module) {
  main().catch((err) => {
    console.error('\nImport failed:', err.message ?? err);
    process.exit(1);
  });
}
