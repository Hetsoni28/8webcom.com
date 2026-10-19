import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { CareersMainSection } from "@/components/organisms/sections/CareersMainSection";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";
import { buildMetadata, getCareersContent } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getCareersContent();
  return buildMetadata(seo, "/careers", {
    keywords: [
      "web developer jobs Ahmedabad",
      "digital marketing jobs Ahmedabad",
      "IT jobs Satellite Ahmedabad",
      "careers 8webcom",
      "software developer jobs Gujarat",
    ],
  });
}

// All content editable in Sanity → Careers Page.
export default async function CareersPage() {
  const { seo, hero, blocks, positions } = await getCareersContent();

  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd
        schema={[
          webPageSchema({ name: seo.metaTitle ?? "Careers — 8webcom.com", description: seo.metaDescription ?? "", url: "/careers" }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Careers", href: "/careers" },
          ]),
        ]}
      />
      <PageHero title={hero.title} highlight={hero.highlight} subTitle={hero.eyebrow} image={hero.image} />
      <CareersMainSection blocks={blocks} positions={positions} />
    </div>
  );
}
