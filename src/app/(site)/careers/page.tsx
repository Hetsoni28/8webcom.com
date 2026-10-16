import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { CareersMainSection } from "@/components/organisms/sections/CareersMainSection";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";
import { sanityFetch } from "@/sanity/fetch";
import { careersSettingsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: 'Careers — Join Our Web Development Team | 8webcom.com',
  description:
    'Explore job openings at 8webcom.com in Ahmedabad, Gujarat. We hire web developers, digital marketers, UI/UX designers and project managers. Apply today.',
  keywords: [
    'web developer jobs Ahmedabad',
    'digital marketing jobs Ahmedabad',
    'IT jobs Satellite Ahmedabad',
    'careers 8webcom',
    'software developer jobs Gujarat',
  ],
  alternates: {
    canonical: 'https://www.8webcom.com/careers',
    languages: { 'en-IN': 'https://www.8webcom.com/careers' },
  },
  openGraph: {
    title: 'Careers — Join Our Web Development Team | 8webcom.com',
    description:
      'Job openings at 8webcom.com — web developers, digital marketers, designers. Based in Satellite, Ahmedabad.',
    url: 'https://www.8webcom.com/careers',
    type: 'website',
    siteName: '8webcom.com',
    images: [{ url: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png', width: 1200, height: 630, alt: 'Careers — 8webcom.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coo8webcom',
    title: 'Careers — Join Our Web Development Team | 8webcom.com',
    description: 'Join 8webcom.com in Ahmedabad — hiring web developers, digital marketers and designers.',
    images: ['https://www.8webcom.com/admin/upload/general/eNLCZOpr.png'],
  },
};

export default async function CareersPage() {
  const careersData = await sanityFetch<any>({
    query: careersSettingsQuery,
    fallback: null,
    tags: ['careersSettings'],
  });

  const positions = careersData?.openings?.map((o: any) => o.title).filter(Boolean) || [];

  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd schema={[
        webPageSchema({
          name: "Careers — 8webcom.com",
          description: "Career opportunities at 8webcom.com in Ahmedabad — web developers, digital marketers and designers.",
          url: "/careers",
        }),
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
        ]),
      ]} />
      {/* Careers Page Hero */}
      <PageHero
        title="Join Our"
        highlight="Team"
        subTitle="Careers"
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* 2-Column Section (Exact match to live site: Left Content + Right Application Form) */}
      <CareersMainSection positions={positions.length > 0 ? positions : undefined} />
    </div>
  );
}
