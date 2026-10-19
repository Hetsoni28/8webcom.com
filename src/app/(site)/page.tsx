import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import {
  getHomeContent,
  getSiteSettings,
  getHeroSlides,
  getServices,
  getTechPlatforms,
  getCrmCards,
  getCaseStudies,
  getFeaturedTestimonials,
  getClientLogos,
  buildMetadata,
} from '@/sanity/content';
import { JsonLd } from '@/components/atoms/JsonLd';
import { faqSchema, webPageSchema } from '@/lib/schemas';
import { HeroSlider } from '@/components/organisms/sections/HeroSlider';
import { AboutSection } from '@/components/organisms/sections/AboutSection';
import { ServicesGrid } from '@/components/organisms/sections/ServicesGrid';
import { TechSlider } from '@/components/organisms/sections/TechSlider';
import { StatsSection } from '@/components/organisms/sections/StatsSection';
import { BrandLogos } from '@/components/organisms/sections/BrandLogos';
import { CrmSolutionsSection } from '@/components/organisms/sections/CrmSolutionsSection';
import { ServiceMarquee } from '@/components/organisms/sections/ServiceMarquee';

const WorkShowcaseSection = dynamic(
  () => import('@/components/organisms/sections/WorkShowcaseSection').then((m) => m.WorkShowcaseSection),
  { ssr: true }
);
const Testimonials = dynamic(
  () => import('@/components/organisms/sections/Testimonials').then((m) => m.Testimonials),
  { ssr: true }
);
const FaqSection = dynamic(
  () => import('@/components/organisms/sections/FaqSection').then((m) => m.FaqSection),
  { ssr: true }
);
const ContactCtaSection = dynamic(
  () => import('@/components/organisms/sections/ContactCtaSection').then((m) => m.ContactCtaSection),
  { ssr: true }
);

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHomeContent();
  return buildMetadata(seo, '/', {
    keywords: [
      'web development company in Ahmedabad',
      'website design company Ahmedabad',
      'digital marketing company Ahmedabad',
      'CRM software development India',
      'web portal development company',
      '8webcom',
    ],
  });
}

// Every word, image and link on this page is editable in Sanity:
// Homepage (texts), Site Settings (stats), and the list collections.
export default async function Home() {
  const [home, site, heroSlides, services, techPlatforms, crmCards, caseStudies, testimonials, clientLogos] =
    await Promise.all([
      getHomeContent(),
      getSiteSettings(),
      getHeroSlides(),
      getServices(),
      getTechPlatforms(),
      getCrmCards(),
      getCaseStudies(),
      getFeaturedTestimonials(),
      getClientLogos(),
    ]);

  const { about, faq, contactCta } = home;

  return (
    <>
      <HeroSlider slides={heroSlides} h1={home.hero.h1} trustMetrics={home.hero.trustMetrics} />

      <ServiceMarquee items={services.map((s) => ({ label: s.title, href: s.href }))} />

      <AboutSection
        heading={about.heading}
        subTitle={about.subTitle}
        description={about.description}
        experienceYears={about.experienceYears}
        experienceText={about.experienceText}
        images={about.images}
        features={about.features}
        ctaLabel={about.ctaLabel}
        ctaHref={about.ctaHref}
        phone={site.contact.phone}
      />

      <ServicesGrid
        heading={home.servicesSection.heading ?? ''}
        subTitle={home.servicesSection.subTitle ?? ''}
        description={home.servicesSection.description}
        services={services}
      />

      <TechSlider heading={home.techSection.heading} subTitle={home.techSection.subTitle} platforms={techPlatforms} />

      <CrmSolutionsSection
        heading={home.crmSection.heading}
        subTitle={home.crmSection.subTitle}
        description={home.crmSection.description}
        cards={crmCards}
      />

      <WorkShowcaseSection
        heading={home.caseStudiesSection.heading}
        subTitle={home.caseStudiesSection.subTitle}
        items={caseStudies}
      />

      <StatsSection stats={site.stats} />

      <Testimonials
        heading={home.testimonialsSection.heading}
        subTitle={home.testimonialsSection.subTitle}
        description={home.testimonialsSection.description}
        testimonials={testimonials}
      />

      <BrandLogos heading={home.clientsSection.heading} subTitle={home.clientsSection.subTitle} logos={clientLogos} />

      <FaqSection subTitle={faq.subTitle} heading={faq.heading} description={faq.description} items={faq.items} />
      <JsonLd
        schema={[
          webPageSchema({ name: home.seo.metaTitle ?? '8webcom.com', description: home.seo.metaDescription ?? '', url: '/' }),
          faqSchema(faq.items),
        ]}
      />

      <ContactCtaSection
        heading={contactCta.heading}
        subTitle={contactCta.subTitle}
        description={contactCta.description}
        ctaLabel={contactCta.ctaLabel}
        ctaHref={contactCta.ctaHref}
      />
    </>
  );
}
