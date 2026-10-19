import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SEO } from '@/lib/seo';
import { CONTACT, SOCIAL } from '@/lib/constants';
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
export const metadata: Metadata = {
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
        width: 1200,
        height: 630,
        alt: '8webcom.com — Web Development Company in Ahmedabad, India',
        type: 'image/png',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
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
    canonical: SEO.siteUrl,
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
    'contact': CONTACT.email,
    'og:email': CONTACT.email,
    'og:phone_number': CONTACT.phone,
    'business:contact_data:street_address': '503, Sun Gravitas, Near Shyamal Cross Rd, Satellite',
    'business:contact_data:locality': 'Ahmedabad',
    'business:contact_data:region': 'Gujarat',
    'business:contact_data:postal_code': '380015',
    'business:contact_data:country_name': 'India',
  },
};

// ─── JSON-LD Structured Data ──────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SEO.siteUrl}/#organization`,
  name: '8webcom.com',
  legalName: '8webcom.com',
  url: SEO.siteUrl,
  logo: {
    '@type': 'ImageObject',
    '@id': `${SEO.siteUrl}/#logo`,
    url: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png',
    width: 300,
    height: 100,
    caption: '8webcom.com',
  },
  image: SEO.ogImage,
  description:
    'Custom web development, web portals, digital marketing and CRM solutions company in Ahmedabad, India. Serving businesses since 2011.',
  foundingDate: '2011',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 10,
    maxValue: 50,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneTel,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
    },
    {
      '@type': 'ContactPoint',
      telephone: CONTACT.phoneTel,
      contactType: 'sales',
      areaServed: ['IN', 'US', 'GB', 'AU'],
      availableLanguage: 'English',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '503, Sun Gravitas, Near Shyamal Cross Rd, Satellite',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.011063,
    longitude: 72.531111,
  },
  sameAs: SOCIAL.map((s) => s.href),
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development',
          url: `${SEO.siteUrl}/services/web-development`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Portal Development',
          url: `${SEO.siteUrl}/services/web-portal`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Marketing',
          url: `${SEO.siteUrl}/services/digital-marketing`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'CRM Solutions',
          url: `${SEO.siteUrl}/services/crm-solutions`,
        },
      },
    ],
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SEO.siteUrl}/#localbusiness`,
  name: '8webcom.com',
  description:
    'Web development company in Ahmedabad offering custom websites, web portals, digital marketing and CRM solutions. 15+ years, 2,000+ clients.',
  url: SEO.siteUrl,
  telephone: CONTACT.phoneTel,
  email: CONTACT.email,
  image: SEO.ogImage,
  logo: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Bank Transfer, UPI, NEFT',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '503, Sun Gravitas, Near Shyamal Cross Rd, Satellite',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.011063,
    longitude: 72.531111,
  },
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
  sameAs: SOCIAL.map((s) => s.href),
  hasMap: 'https://maps.google.com/?q=503+Sun+Gravitas+Near+Shyamal+Cross+Rd+Satellite+Ahmedabad+Gujarat+380015',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SEO.siteUrl}/#website`,
  name: '8webcom.com',
  url: SEO.siteUrl,
  description: SEO.pages.home.description,
  inLanguage: 'en-IN',
  publisher: {
    '@id': `${SEO.siteUrl}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SEO.siteUrl}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ── Professional Service schema ──────────────────────────────
const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: '8webcom.com',
  url: SEO.siteUrl,
  telephone: CONTACT.phoneTel,
  email: CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '503, Sun Gravitas, Near Shyamal Cross Rd, Satellite',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '380015',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Web Development',
    'Web Design',
    'Web Portal Development',
    'Digital Marketing',
    'Search Engine Optimisation',
    'CRM Software Development',
    'E-commerce Development',
    'WordPress Development',
    'React JS Development',
    'Next.js Development',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <head>
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.8webcom.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
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
