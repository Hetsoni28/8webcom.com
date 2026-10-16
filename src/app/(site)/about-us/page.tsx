import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { AboutSection } from "@/components/organisms/sections/AboutSection";
import { VisionMissionSection } from "@/components/organisms/sections/VisionMissionSection";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema, aboutPageSchema } from "@/lib/schemas";
import { ABOUT } from "@/lib/data";
import { sanityFetch } from "@/sanity/fetch";
import { aboutSettingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: 'About Us — Web Development Agency Since 2011 | 8webcom.com',
  description:
    '8webcom.com is a web development & digital marketing agency in Ahmedabad, India, founded in 2011. We deliver custom websites, web portals, SEO & CRM solutions for businesses across India and globally.',
  keywords: [
    'web development agency Ahmedabad',
    'IT company Ahmedabad since 2011',
    'digital marketing agency India',
    'website design company Ahmedabad',
    '8webcom about',
  ],
  alternates: {
    canonical: 'https://www.8webcom.com/about-us',
    languages: { 'en-IN': 'https://www.8webcom.com/about-us' },
  },
  openGraph: {
    title: 'About Us — Web Development Agency Since 2011 | 8webcom.com',
    description:
      '8webcom.com — a web development and digital marketing agency in Ahmedabad, India. Serving clients across India and globally since 2011.',
    url: 'https://www.8webcom.com/about-us',
    type: 'website',
    siteName: '8webcom.com',
    images: [{ url: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png', width: 1200, height: 630, alt: 'About 8webcom.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coo8webcom',
    title: 'About Us — Web Development Agency Since 2011 | 8webcom.com',
    description: '8webcom.com — a web development and digital marketing agency in Ahmedabad, India, since 2011.',
    images: ['https://www.8webcom.com/admin/upload/general/eNLCZOpr.png'],
  },
};

export default async function AboutUsPage() {
  // Fetch About content from Sanity; fall back to local data when CMS not connected
  const aboutData = await sanityFetch({
    query: aboutSettingsQuery,
    fallback: null,
    tags: ['aboutSettings'],
  }) as any;

  // Map Sanity images to the shape AboutSection expects
  const images = aboutData?.images
    ? aboutData.images.map((img: any) => ({ src: img.src ?? img, alt: img.alt ?? '' }))
    : ABOUT.images;

  // Map Sanity features to the shape AboutSection expects
  const features = aboutData?.features
    ? aboutData.features.map((f: any) => ({ icon: f.icon ?? '', title: f.title, description: f.description }))
    : ABOUT.features;

  const about = {
    heading: aboutData?.heading ?? ABOUT.heading,
    subTitle: aboutData?.subTitle ?? ABOUT.subTitle,
    description: aboutData?.description ?? ABOUT.description,
    ctaLabel: aboutData?.ctaLabel ?? ABOUT.ctaLabel,
    ctaHref: aboutData?.ctaHref ?? ABOUT.ctaHref,
    images,
    features,
  };

  return (
    <>
      <JsonLd
        schema={[
          aboutPageSchema(),
          webPageSchema({
            name: "About Us — 8webcom.com",
            description:
              "Learn about 8webcom.com — web development and digital marketing agency in Ahmedabad since 2011.",
            url: "/about-us",
          }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about-us" },
          ]),
        ]}
      />

      <PageHero
        title="About"
        highlight="8webcom"
        subTitle="Our Story"
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* Authentic 8webcom About Section */}
      <AboutSection
        heading={about.heading}
        subTitle={about.subTitle}
        description={about.description}
        images={about.images}
        features={about.features}
        ctaLabel={about.ctaLabel}
        ctaHref={about.ctaHref}
      />

      {/* Our Vision, Our Mission, Quality Policy Section */}
      <VisionMissionSection />

      {/* Direct Contact CTA */}
      <ContactCtaSection />
    </>
  );
}
