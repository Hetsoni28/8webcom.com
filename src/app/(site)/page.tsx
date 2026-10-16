import { Metadata } from 'next';
import { sanityFetch } from '@/sanity/fetch';
import {
  heroSlidesQuery,
  servicesQuery,
  testimonialsQuery,
  caseStudiesQuery,
  crmCardsQuery,
  techPlatformsQuery,
  clientLogosQuery,
  homepageSettingsQuery,
  aboutSettingsQuery,
} from '@/sanity/queries';
import {
  HERO_SLIDES,
  ABOUT,
  SERVICES,
  TECH_PLATFORMS,
  CRM_CARDS,
  CASE_STUDIES,
  STATS,
  TESTIMONIALS,
  CLIENT_LOGOS,
} from '@/lib/data';
import dynamic from 'next/dynamic';
import { Stat } from '@/types';
import { HeroSlider } from '@/components/organisms/sections/HeroSlider';
import { AboutSection } from '@/components/organisms/sections/AboutSection';
import { ServicesGrid } from '@/components/organisms/sections/ServicesGrid';
import { TechSlider } from '@/components/organisms/sections/TechSlider';
import { StatsSection } from '@/components/organisms/sections/StatsSection';
import { BrandLogos } from '@/components/organisms/sections/BrandLogos';
import { CrmSolutionsSection } from '@/components/organisms/sections/CrmSolutionsSection';

const WorkShowcaseSection = dynamic(
  () => import('@/components/organisms/sections/WorkShowcaseSection').then((m) => m.WorkShowcaseSection),
  { ssr: true }
);

const Testimonials = dynamic(
  () => import('@/components/organisms/sections/Testimonials').then((m) => m.Testimonials),
  { ssr: true }
);

const ContactCtaSection = dynamic(
  () => import('@/components/organisms/sections/ContactCtaSection').then((m) => m.ContactCtaSection),
  { ssr: true }
);

export async function generateMetadata(): Promise<Metadata> {
  const hpSettings = await sanityFetch<{ seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] } } | null>({
    query: `*[_type == "homepageSettings"][0]{ seo }`,
    fallback: null,
    tags: ['homepageSettings', 'seo'],
  });

  const title = hpSettings?.seo?.metaTitle ||
    'Web Development Company in Ahmedabad | 8webcom.com';
  const description = hpSettings?.seo?.metaDescription ||
    'Custom web development, web portals, digital marketing & CRM solutions in Ahmedabad. 15+ years experience, 1,500+ projects, 2,000+ clients across India & worldwide. Get a free quote.';
  const OG_IMAGE = 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png';

  return {
    title,
    description,
    keywords: hpSettings?.seo?.keywords ?? [
      'web development company in Ahmedabad',
      'website design company Ahmedabad',
      'digital marketing company Ahmedabad',
      'CRM software development India',
      'web portal development company',
      '8webcom',
    ],
    alternates: {
      canonical: 'https://www.8webcom.com',
      languages: { 'en-IN': 'https://www.8webcom.com' },
    },
    openGraph: {
      title,
      description,
      url: 'https://www.8webcom.com',
      type: 'website',
      siteName: '8webcom.com',
      locale: 'en_IN',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: '8webcom.com — Web Development Company in Ahmedabad, India',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@coo8webcom',
      creator: '@coo8webcom',
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          alt: '8webcom.com — Web Development Company in Ahmedabad, India',
        },
      ],
    },
  };
}

export default async function Home() {
  // Fetch all content from Sanity CMS concurrently; falls back to local data seamlessly
  const [
    heroSlides,
    services,
    testimonials,
    caseStudies,
    crmCards,
    techPlatforms,
    clientLogos,
    hpSettings,
    aboutSettings,
  ] = await Promise.all([
    sanityFetch({ query: heroSlidesQuery, fallback: HERO_SLIDES, tags: ['heroSlide'] }),
    sanityFetch({ query: servicesQuery, fallback: SERVICES, tags: ['service'] }),
    sanityFetch({ query: testimonialsQuery, fallback: TESTIMONIALS, tags: ['testimonial'] }),
    sanityFetch({ query: caseStudiesQuery, fallback: CASE_STUDIES, tags: ['caseStudy'] }),
    sanityFetch({ query: crmCardsQuery, fallback: CRM_CARDS, tags: ['crmCard'] }),
    sanityFetch({ query: techPlatformsQuery, fallback: TECH_PLATFORMS, tags: ['techPlatform'] }),
    sanityFetch({ query: clientLogosQuery, fallback: CLIENT_LOGOS, tags: ['clientLogo'] }),
    sanityFetch({ query: homepageSettingsQuery, fallback: null, tags: ['homepageSettings'] }),
    sanityFetch({ query: aboutSettingsQuery, fallback: null, tags: ['aboutSettings'] }),
  ]);

  // Section overrides from Sanity CMS
  const abt = (hpSettings as any)?.sectionAbout;
  const abtFromSettings = (aboutSettings as any);
  const svc = (hpSettings as any)?.sectionServices;
  const tch = (hpSettings as any)?.sectionTech;
  const crm = (hpSettings as any)?.sectionCrm;
  const cs = (hpSettings as any)?.sectionCaseStudies;
  const st = (hpSettings as any)?.sectionStats;
  const tst = (hpSettings as any)?.sectionTestimonials;
  const cli = (hpSettings as any)?.sectionClients;
  const cta = (hpSettings as any)?.contactCta;

  // Dynamic Animated Stats (Sanity priority with authentic fallback)
  const dynamicStats: Stat[] = st?.stat1Value
    ? [
        {
          value: st.stat1Value,
          suffix: st.stat1Suffix || '+',
          label: st.stat1Label || 'Happy Clients',
        },
        {
          value: st.stat2Value ?? 15,
          suffix: st.stat2Suffix || '+',
          label: st.stat2Label || 'Years Experience',
        },
        {
          value: st.stat3Value ?? 500,
          suffix: st.stat3Suffix || '+',
          label: st.stat3Label || 'Delivered Projects',
        },
        {
          value: st.stat4Value ?? 99,
          suffix: st.stat4Suffix || '%',
          label: st.stat4Label || 'Client Satisfaction',
        },
      ]
    : STATS;

  return (
    <>
      {/* 1. Hero Showcase Slider */}
      <HeroSlider slides={heroSlides as any} />

      {/* 2. Editorial About Section */}
      <AboutSection
        heading={abt?.heading || abtFromSettings?.heading || ABOUT.heading}
        subTitle={abt?.subTitle || abtFromSettings?.subTitle || ABOUT.subTitle}
        description={abt?.description || abtFromSettings?.description || ABOUT.description}
        experienceYears={abt?.experienceYears || "15+"}
        experienceText={abt?.experienceText || "Years of Excel"}
        images={abtFromSettings?.images && abtFromSettings.images.length > 0 ? abtFromSettings.images : ABOUT.images}
        features={abtFromSettings?.features && abtFromSettings.features.length > 0 ? abtFromSettings.features : ABOUT.features}
        ctaLabel={abt?.ctaLabel || abtFromSettings?.ctaLabel || ABOUT.ctaLabel}
        ctaHref={abt?.ctaHref || abtFromSettings?.ctaHref || ABOUT.ctaHref}
        phone={abt?.phone || "+91 97277 00459"}
      />

      {/* 3. Core Services Grid */}
      <ServicesGrid
        heading={svc?.heading ?? "High-Impact Services for Growing Businesses"}
        subTitle={svc?.subTitle ?? "Our Services"}
        description={svc?.description ?? "We offer a comprehensive range of digital services to help your business grow and succeed in the modern digital landscape."}
        services={services as any}
      />

      {/* 4. Tech / Platforms Showcase Slider */}
      <TechSlider
        heading={tch?.heading ?? "Superfast, well designed, well researched, website with CMS"}
        subTitle={tch?.subTitle ?? "What We Offer"}
        platforms={techPlatforms as any}
      />

      {/* 5. Custom Enterprise CRM Solutions */}
      <CrmSolutionsSection
        heading={crm?.heading ?? "Grow your business with smart CRM solutions"}
        subTitle={crm?.subTitle ?? "CRM Solutions"}
        description={crm?.description ?? "Tailored CRM platforms and automated workflows built specifically for your business processes."}
        cards={crmCards as any}
      />

      {/* 6. Case Studies / Work Showcase */}
      <WorkShowcaseSection
        heading={cs?.heading ?? "Let’s See Our Work Showcase"}
        subTitle={cs?.subTitle ?? "Case Studies"}
        items={caseStudies as any}
      />

      {/* 7. Animated Numbers / Proof Points */}
      <StatsSection stats={dynamicStats} />

      {/* 8. Verified Testimonials */}
      <Testimonials
        heading={tst?.heading ?? "Real Feedback from Real Clients"}
        subTitle={tst?.subTitle ?? "Client Feedback"}
        testimonials={testimonials as any}
      />

      {/* 9. Trusted Client Brands Marquee */}
      <BrandLogos
        heading={cli?.heading ?? "Trusted by Leading Companies"}
        subTitle={cli?.subTitle ?? "Clients Logo"}
        logos={clientLogos as any}
      />

      {/* 10. High-Converting Contact CTA */}
      <ContactCtaSection
        heading={cta?.heading ?? "Have a Project in Mind? Let's Talk!"}
        subTitle={cta?.subTitle ?? "Need Expert Help?"}
        description={cta?.description ?? "Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days."}
        phone={cta?.phone}
        email={cta?.email}
        ctaLabel={cta?.ctaLabel ?? "Get in Touch with Us"}
        ctaHref={cta?.ctaHref ?? "/contacts"}
      />
    </>
  );
}
