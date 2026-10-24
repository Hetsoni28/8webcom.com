import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SEO, absoluteUrl } from '@/lib/seo';
import { getSiteSettings, type ResolvedSiteSettings } from '@/sanity/content';
import './globals.css';

// No `weight` list: Montserrat is a variable font, so one file covers 100–900
// instead of downloading seven separate static weights.
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

// ─── Root Metadata ────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  const { contact } = await getSiteSettings();
  return {
  metadataBase: new URL(SEO.siteUrl),

  title: {
    default: SEO.pages.home.title,
    template: SEO.titleTemplate,
  },
  description: SEO.pages.home.description,
  keywords: [...SEO.keywords],

  authors: [{ name: SEO.siteName, url: SEO.siteUrl }],
  creator: SEO.siteName,
  publisher: SEO.siteName,

  // ── Verification (Google Search Console, Bing) ────────────
  // Uncomment & fill in when you have verification codes
  // verification: {
  //   google: 'YOUR_GOOGLE_SITE_VERIFICATION_TOKEN',
  //   yandex: 'YOUR_YANDEX_VERIFICATION_TOKEN',
  // },

  // ── Open Graph ───────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: SEO.ogLocale,
    url: SEO.siteUrl,
    siteName: SEO.siteName,
    title: SEO.pages.home.title,
    description: SEO.pages.home.description,
    images: [
      {
        url: SEO.ogImage,
        ...SEO.ogImageSize,
        alt: '8webcom.com — Web Development Company in Ahmedabad, India',
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────
  twitter: {
    card: 'summary',
    site: SEO.twitterHandle,
    creator: SEO.twitterHandle,
    title: SEO.pages.home.title,
    description: SEO.pages.home.description,
    images: [
      {
        url: SEO.ogImage,
        alt: '8webcom.com — Web Development Company in Ahmedabad, India',
      },
    ],
  },

  // ── Robots ───────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Canonical / Alternates ───────────────────────────────────
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      'en-IN': SEO.siteUrl,
    },
  },

  // ── App / PWA ────────────────────────────────────────────────
  applicationName: SEO.siteName,
  referrer: 'origin-when-cross-origin',
  category: 'technology',

  // ── Geographic / Contact ─────────────────────────────────────
  other: {
    'geo.region': 'IN-GJ',
    'geo.placename': 'Ahmedabad',
    'geo.position': '23.011063;72.531111',
    'ICBM': '23.011063, 72.531111',
    'contact': contact.email,
    'og:email': contact.email,
    'og:phone_number': contact.phone,
    'business:contact_data:street_address': '503, Sun Gravitas, Near Shyamal Cross Rd, Satellite',
    'business:contact_data:locality': 'Ahmedabad',
    'business:contact_data:region': 'Gujarat',
    'business:contact_data:postal_code': '380015',
    'business:contact_data:country_name': 'India',
  },
};
}

// ─── JSON-LD Structured Data ──────────────────────────────────
// One connected @graph: the business is described ONCE (ProfessionalService is a
// LocalBusiness subtype) under a stable @id that every page/service references.
const ORG_ID = `${SEO.siteUrl}/#organization`;

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '503, Sun Gravitas, Near Shyamal Cross Rd, Satellite',
  addressLocality: 'Ahmedabad',
  addressRegion: 'Gujarat',
  postalCode: '380015',
  addressCountry: 'IN',
};

const SERVICE_OFFERS = [
  { name: 'Web Development', path: '/services/web-development' },
  { name: 'Web Portal Development', path: '/services/web-portal' },
  { name: 'Digital Marketing', path: '/services/digital-marketing' },
  { name: 'CRM Solutions', path: '/services/crm-solutions' },
];

// Built from Sanity → Site Settings so contact changes reach Google too
function buildSiteGraph({ contact, socialLinks }: ResolvedSiteSettings) {
  return {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: '8webcom.com',
      legalName: '8webcom.com',
      alternateName: '8webcom',
      url: SEO.siteUrl,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SEO.siteUrl}/#logo`,
        url: SEO.ogImage,
        ...SEO.ogImageSize,
        caption: '8webcom.com',
      },
      image: SEO.ogImage,
      description:
        'Web development company in Ahmedabad offering custom websites, web portals, digital marketing and CRM solutions. Serving 2,000+ businesses since 2011.',
      slogan: 'Web Development Company in Ahmedabad',
      foundingDate: '2011',
      numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
      telephone: contact.phoneTel,
      email: contact.email,
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, Bank Transfer, UPI, NEFT',
      address: ADDRESS,
      geo: { '@type': 'GeoCoordinates', latitude: 23.011063, longitude: 72.531111 },
      hasMap: 'https://maps.google.com/?q=503+Sun+Gravitas+Near+Shyamal+Cross+Rd+Satellite+Ahmedabad+Gujarat+380015',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '15:00',
        },
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: contact.phoneTel,
          email: contact.email,
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Gujarati'],
        },
        {
          '@type': 'ContactPoint',
          telephone: contact.phoneTel,
          contactType: 'sales',
          areaServed: ['IN', 'US', 'GB', 'AU', 'AE'],
          availableLanguage: 'English',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Ahmedabad' },
        { '@type': 'State', name: 'Gujarat' },
        { '@type': 'Country', name: 'India' },
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'Australia' },
        { '@type': 'Country', name: 'United Arab Emirates' },
      ],
      knowsAbout: [
        'Web Development',
        'Web Design',
        'Web Portal Development',
        'E-commerce Development',
        'Digital Marketing',
        'Search Engine Optimisation',
        'Pay-Per-Click Advertising',
        'Social Media Marketing',
        'CRM Software Development',
        'WordPress Development',
        'Shopify Development',
        'Magento Development',
        'React JS Development',
        'Next.js Development',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Services',
        itemListElement: SERVICE_OFFERS.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            '@id': `${absoluteUrl(s.path)}#service`,
            name: s.name,
            url: absoluteUrl(s.path),
          },
        })),
      },
      sameAs: socialLinks.map((s) => s.url.split('?')[0]),
    },
    {
      '@type': 'WebSite',
      '@id': `${SEO.siteUrl}/#website`,
      name: '8webcom.com',
      alternateName: '8webcom',
      url: SEO.siteUrl,
      description: SEO.pages.home.description,
      inLanguage: 'en-IN',
      publisher: { '@id': ORG_ID },
    },
  ],
};
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* JSON-LD Structured Data (single connected graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSiteGraph(settings)) }}
        />
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased bg-white text-[#1F2429]`}
      >
        {children}
      </body>
    </html>
  );
}
