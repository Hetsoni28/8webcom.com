import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { ContactInfoCards } from "@/components/organisms/sections/ContactInfoCards";
import { ContactMainSection } from "@/components/organisms/sections/ContactMainSection";
import { ContactMapSection } from "@/components/organisms/sections/ContactMapSection";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema, contactPageSchema } from "@/lib/schemas";
import { buildMetadata, getContactContent } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactContent();
  return buildMetadata(seo, "/contacts", {
    keywords: [
      "contact web development company Ahmedabad",
      "8webcom contact",
      "website design quote Ahmedabad",
      "digital marketing consultation India",
    ],
  });
}

// Content: Sanity → Contact Page (labels, texts, form options) + Site Settings (contact details).
export default async function ContactPage() {
  const { seo, hero, cards, intro, formServices, mapCardTitle } = await getContactContent();

  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd
        schema={[
          contactPageSchema(),
          webPageSchema({ name: seo.metaTitle ?? "Contact Us — 8webcom.com", description: seo.metaDescription ?? "", url: "/contacts" }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Contact Us", href: "/contacts" },
          ]),
        ]}
      />
      <PageHero title={hero.title} highlight={hero.highlight} subTitle={hero.eyebrow} image={hero.image} />
      <ContactInfoCards labels={cards} />
      <ContactMainSection intro={intro} formServices={formServices} />
      <ContactMapSection title={mapCardTitle} />
    </div>
  );
}
