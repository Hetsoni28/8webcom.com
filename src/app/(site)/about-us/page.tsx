import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { AboutSection } from "@/components/organisms/sections/AboutSection";
import { VisionMissionSection } from "@/components/organisms/sections/VisionMissionSection";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { StatsSection } from "@/components/organisms/sections/StatsSection";
import { ValuesSection } from "@/components/organisms/sections/ValuesSection";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema, aboutPageSchema } from "@/lib/schemas";
import { buildMetadata, getAboutContent, getHomeContent, getSiteSettings } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getAboutContent();
  return buildMetadata(seo, "/about-us", {
    keywords: [
      "web development agency Ahmedabad",
      "IT company Ahmedabad since 2011",
      "digital marketing agency India",
      "website design company Ahmedabad",
      "8webcom about",
    ],
  });
}

// All content editable in Sanity → About Page (+ Site Settings for stats,
// Homepage → Contact band for the bottom section).
export default async function AboutUsPage() {
  const [about, site, home] = await Promise.all([getAboutContent(), getSiteSettings(), getHomeContent()]);
  const { hero, story, values, seo } = about;
  const cta = home.contactCta;

  return (
    <>
      <JsonLd
        schema={[
          aboutPageSchema(),
          webPageSchema({ name: seo.metaTitle ?? "About Us — 8webcom.com", description: seo.metaDescription ?? "", url: "/about-us" }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about-us" },
          ]),
        ]}
      />

      <PageHero title={hero.title} highlight={hero.highlight} subTitle={hero.eyebrow} image={hero.image} />

      <AboutSection
        heading={story.heading}
        subTitle={story.subTitle}
        description={story.text}
        experienceYears={story.experienceYears}
        experienceText={story.experienceText}
        images={story.images}
        features={story.features}
        ctaLabel={story.ctaLabel}
        ctaHref={story.ctaHref}
        phone={site.contact.phone}
      />

      <StatsSection stats={site.stats} />

      <VisionMissionSection items={about.visionMission.map((v, i) => ({ ...v, id: `${v.icon}-${i}` }))} />

      <ValuesSection subTitle={values.subTitle} heading={values.heading} values={values.items} />

      <ContactCtaSection
        heading={cta.heading}
        subTitle={cta.subTitle}
        description={cta.description}
        ctaLabel={cta.ctaLabel}
        ctaHref={cta.ctaHref}
      />
    </>
  );
}
