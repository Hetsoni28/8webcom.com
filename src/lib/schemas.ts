/**
 * Schema builders — generates JSON-LD structured data using only real,
 * verified company information. No fabricated stats, reviews or claims.
 *
 * All data sourced from src/lib/constants.ts and src/lib/seo.ts.
 */

const BASE = 'https://www.8webcom.com';
const LOGO = 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png';
const ORG_ID = `${BASE}/#organization`;

const SOCIAL_PROFILES = [
  'https://www.facebook.com/8webcom',
  'https://www.instagram.com/8webcom/',
  'https://www.linkedin.com/company/8webcom',
  'https://www.youtube.com/@8webcom',
  'https://x.com/coo8webcom',
  'https://in.pinterest.com/8webcom/',
];

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '503, Sun Gravitas, Near Shyamal Cross Rd, Satellite',
  addressLocality: 'Ahmedabad',
  addressRegion: 'Gujarat',
  postalCode: '380015',
  addressCountry: 'IN',
};

// ─── Breadcrumb ───────────────────────────────────────────────
export function breadcrumbSchema(
  items: { name: string; href: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${BASE}${item.href}`,
    })),
  };
}

// ─── WebPage ─────────────────────────────────────────────────
export function webPageSchema({
  name,
  description,
  url,
  dateModified,
  breadcrumbs,
}: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
  breadcrumbs?: { name: string; href: string }[];
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE}${url}`,
    name,
    description,
    url: `${BASE}${url}`,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${BASE}/#website` },
    about: { '@id': ORG_ID },
    dateModified: dateModified ?? new Date().toISOString().split('T')[0],
    publisher: {
      '@id': ORG_ID,
    },
  };

  if (breadcrumbs) {
    schema.breadcrumb = breadcrumbSchema(breadcrumbs);
  }

  return schema;
}

// ─── Service ─────────────────────────────────────────────────
export function serviceSchema({
  name,
  description,
  url,
  serviceType,
  keywords,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE}${url}`,
    serviceType,
    keywords: keywords ?? [],
    provider: {
      '@type': 'LocalBusiness',
      '@id': ORG_ID,
      name: '8webcom.com',
      url: BASE,
      logo: LOGO,
      address: ADDRESS,
      telephone: '+919727700459',
      email: 'info@8webcom.com',
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Australia' },
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Small and Medium Businesses',
    },
  };
}

// ─── Service schemas keyed by slug ────────────────────────────
export const SERVICE_SCHEMAS: Record<
  string,
  { name: string; description: string; serviceType: string; keywords: string[] }
> = {
  'web-development': {
    name: 'Web Development Services in Ahmedabad',
    description:
      'Professional web development services in Ahmedabad — custom websites, e-commerce, CMS integration and responsive design using WordPress, Next.js, React and PHP.',
    serviceType: 'Web Development',
    keywords: [
      'web development Ahmedabad',
      'custom website development',
      'WordPress development',
      'Next.js development',
      'React JS development',
      'e-commerce website development',
    ],
  },
  'web-portal': {
    name: 'Web Portal Development Company',
    description:
      'Custom web portal development — B2B portals, B2C portals, employee self-service, vendor management and admin dashboards with role-based access and real-time data.',
    serviceType: 'Web Portal Development',
    keywords: [
      'web portal development India',
      'B2B portal development',
      'employee portal',
      'vendor management portal',
      'custom web portal Ahmedabad',
    ],
  },
  'digital-marketing': {
    name: 'Digital Marketing Services in Ahmedabad',
    description:
      'Result-driven digital marketing services in Ahmedabad — SEO, PPC (Google & Meta Ads), social media marketing, content marketing and email campaigns.',
    serviceType: 'Digital Marketing',
    keywords: [
      'digital marketing Ahmedabad',
      'SEO company Ahmedabad',
      'Google Ads management India',
      'Meta Ads management',
      'social media marketing Ahmedabad',
      'content marketing India',
    ],
  },
  'crm-solutions': {
    name: 'Custom CRM Development for Indian Businesses',
    description:
      'Custom CRM software development for Indian SMEs — lead management, sales pipeline, customer database, WhatsApp & email automation. Built in Ahmedabad, deployed anywhere.',
    serviceType: 'CRM Software Development',
    keywords: [
      'CRM software development India',
      'custom CRM Ahmedabad',
      'lead management software',
      'sales pipeline CRM',
      'WhatsApp CRM integration',
    ],
  },
};

// ─── FAQ Schema ───────────────────────────────────────────────
export function faqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ─── Contact Page schema ──────────────────────────────────────
export function contactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact 8webcom.com',
    url: `${BASE}/contacts`,
    description:
      'Contact 8webcom.com at 503, Sun Gravitas, Satellite, Ahmedabad. Call +91 97277 00459 or email info@8webcom.com for a free project consultation.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: '8webcom.com',
      telephone: '+919727700459',
      email: 'info@8webcom.com',
      url: BASE,
      sameAs: SOCIAL_PROFILES,
      address: ADDRESS,
    },
  };
}

// ─── About/Organization schema ────────────────────────────────
export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About 8webcom.com',
    url: `${BASE}/about-us`,
    description:
      'Learn about 8webcom.com — a web development and digital marketing agency in Ahmedabad, India, serving businesses since 2011.',
    mainEntity: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: '8webcom.com',
      url: BASE,
      logo: { '@type': 'ImageObject', url: LOGO },
      foundingDate: '2011',
      address: ADDRESS,
      sameAs: SOCIAL_PROFILES,
      knowsAbout: [
        'Web Development',
        'Web Design',
        'Digital Marketing',
        'Search Engine Optimization',
        'CRM Software',
        'Web Portal Development',
        'E-commerce Development',
        'WordPress',
        'React JS',
        'Next.js',
      ],
    },
  };
}
