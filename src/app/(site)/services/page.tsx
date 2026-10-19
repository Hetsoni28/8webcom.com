import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { TechSlider } from "@/components/organisms/sections/TechSlider";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { ServiceShowcase } from "@/components/organisms/sections/ServiceShowcase";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";
import {
  buildMetadata,
  getHomeContent,
  getServiceDetail,
  getServices,
  getServicesPageContent,
  getTechPlatforms,
} from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getServicesPageContent();
  return buildMetadata(seo, "/services", {
    keywords: [
      "web development services Ahmedabad",
      "digital marketing services India",
      "CRM development company India",
      "web portal development Ahmedabad",
      "SEO services Ahmedabad",
      "website design services",
    ],
  });
}

// All content editable in Sanity → Services Pages, Services, What We Offer, Homepage.
export default async function ServicesPage() {
  const [page, home, services, techPlatforms] = await Promise.all([
    getServicesPageContent(),
    getHomeContent(),
    getServices(),
    getTechPlatforms(),
  ]);

  // Each block lists the first three features of that service
  const details = await Promise.all(services.map((s) => getServiceDetail(s.href.replace("/services/", ""))));
  const cta = home.contactCta;

  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd
        schema={[
          webPageSchema({ name: page.seo.metaTitle ?? "Our Services — 8webcom.com", description: page.seo.metaDescription ?? "", url: "/services" }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
          ]),
        ]}
      />
      <PageHero title={page.hero.title} highlight={page.hero.highlight} subTitle={page.hero.eyebrow} image={page.hero.image} />

      <div className="flex flex-col">
        {services.map((service, idx) => (
          <ServiceShowcase
            key={service.id ?? idx}
            service={service}
            index={idx}
            highlights={(details[idx]?.features ?? []).slice(0, 3).map((f) => f.title)}
            buttonLabel={page.listingButtonLabel}
          />
        ))}
      </div>

      <div className="border-t border-gray-100">
        <TechSlider heading={home.techSection.heading} subTitle={home.techSection.subTitle} platforms={techPlatforms} />
      </div>

      <ContactCtaSection
        heading={cta.heading}
        subTitle={cta.subTitle}
        description={cta.description}
        ctaLabel={cta.ctaLabel}
        ctaHref={cta.ctaHref}
      />
    </div>
  );
}
