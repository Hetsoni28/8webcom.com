import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { ContactInfoCards } from "@/components/organisms/sections/ContactInfoCards";
import { ContactMainSection } from "@/components/organisms/sections/ContactMainSection";
import { ContactMapSection } from "@/components/organisms/sections/ContactMapSection";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema, contactPageSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: 'Contact 8webcom.com — Free Project Consultation | Ahmedabad',
  description:
    'Get in touch with 8webcom.com — 503, Sun Gravitas, Satellite, Ahmedabad. Call +91 97277 00459 or email info@8webcom.com for a free consultation on web development, digital marketing or CRM.',
  keywords: [
    'contact web development company Ahmedabad',
    '8webcom contact',
    'web development consultation Ahmedabad',
    'free project quote Ahmedabad',
    'hire web developer Ahmedabad',
  ],
  alternates: {
    canonical: 'https://www.8webcom.com/contacts',
    languages: { 'en-IN': 'https://www.8webcom.com/contacts' },
  },
  openGraph: {
    title: 'Contact 8webcom.com — Free Project Consultation | Ahmedabad',
    description:
      'Reach 8webcom.com at 503, Sun Gravitas, Satellite, Ahmedabad, Gujarat 380015. Phone: +91 97277 00459. Email: info@8webcom.com.',
    url: 'https://www.8webcom.com/contacts',
    type: 'website',
    siteName: '8webcom.com',
    images: [{ url: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png', width: 1200, height: 630, alt: 'Contact 8webcom.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coo8webcom',
    title: 'Contact 8webcom.com — Free Project Consultation | Ahmedabad',
    description: 'Reach 8webcom.com at 503, Sun Gravitas, Satellite, Ahmedabad, Gujarat 380015.',
    images: ['https://www.8webcom.com/admin/upload/general/eNLCZOpr.png'],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd schema={[
        contactPageSchema(),
        webPageSchema({
          name: "Contact Us — 8webcom.com",
          description: "Contact 8webcom.com at 503, Sun Gravitas, Satellite, Ahmedabad. Call +91 97277 00459 or email info@8webcom.com.",
          url: "/contacts",
        }),
        breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Contact Us", href: "/contacts" },
        ]),
      ]} />
      {/* Contact Page Hero with Beast Typography */}
      <PageHero
        title="Contact"
        highlight="Us"
        subTitle="Get In Touch"
        image="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />

      {/* 4 Interactive Contact Detail Cards */}
      <ContactInfoCards />

      {/* Main 2-Column Section (Trust Copy on Left, Full Form on Right) */}
      <ContactMainSection />

      {/* Interactive Google Map Embed */}
      <ContactMapSection />
    </div>
  );
}
