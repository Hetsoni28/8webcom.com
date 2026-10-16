import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { TechSlider } from "@/components/organisms/sections/TechSlider";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { ServiceShowcase } from "@/components/organisms/sections/ServiceShowcase";
import { SERVICES, TECH_PLATFORMS } from "@/lib/data";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";
import { sanityFetch } from "@/sanity/fetch";
import { servicesQuery, techPlatformsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: 'Web Development, Digital Marketing & CRM Services | 8webcom.com',
  description:
    'Explore digital services in Ahmedabad: custom web development, web portal development, digital marketing (SEO, PPC, SMM) and CRM solutions. Trusted by 2,000+ clients across India.',
  keywords: [
    'web development services Ahmedabad',
    'digital marketing services India',
    'CRM development company India',
    'web portal development Ahmedabad',
    'SEO services Ahmedabad',
    'website design services',
  ],
  alternates: {
    canonical: 'https://www.8webcom.com/services',
    languages: { 'en-IN': 'https://www.8webcom.com/services' },
  },
  openGraph: {
    title: 'Web Development, Digital Marketing & CRM Services | 8webcom.com',
    description:
      'Custom web development, web portals, digital marketing and CRM solutions for businesses across India — by 8webcom.com, Ahmedabad.',
    url: 'https://www.8webcom.com/services',
    type: 'website',
    siteName: '8webcom.com',
    images: [{ url: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png', width: 1200, height: 630, alt: 'Services — 8webcom.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coo8webcom',
    title: 'Web Development, Digital Marketing & CRM Services | 8webcom.com',
    description: 'Custom web development, portals, digital marketing & CRM for businesses in Ahmedabad and India.',
    images: ['https://www.8webcom.com/admin/upload/general/eNLCZOpr.png'],
  },
};

export default async function ServicesPage() {
  const [services, techPlatforms] = await Promise.all([
    sanityFetch({ query: servicesQuery, fallback: SERVICES, tags: ['service'] }),
    sanityFetch({ query: techPlatformsQuery, fallback: TECH_PLATFORMS, tags: ['techPlatform'] }),
  ]);

  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd schema={[
        webPageSchema({
          name: "Our Services — 8webcom.com",
          description: "Web development, web portals, digital marketing and CRM solutions by 8webcom.com, Ahmedabad.",
          url: "/services",
        }),
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]),
      ]} />
      <PageHero
        title="Our Services"
        subTitle="What We Do"
        image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Dynamic Alternating Service Blocks */}
      <div className="flex flex-col">
        {services.map((service: any, idx: number) => (
          <ServiceShowcase key={service.id ?? idx} service={service} index={idx} />
        ))}
      </div>

      <div className="border-t border-gray-100">
        <TechSlider
          heading="Superfast, well designed, well researched, website with CMS"
          subTitle="What We Offer"
          platforms={techPlatforms as any}
        />
      </div>

      <ContactCtaSection />
    </div>
  );
}
