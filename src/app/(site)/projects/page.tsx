import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { ProjectsGrid } from "@/components/organisms/sections/ProjectsGrid";
import { Testimonials } from "@/components/organisms/sections/Testimonials";
import { PROJECTS, TESTIMONIALS } from "@/lib/data";
import { sanityFetch } from "@/sanity/fetch";
import { projectsQuery, allTestimonialsQuery } from "@/sanity/queries";

export const metadata: Metadata = {
  title: 'Our Projects Portfolio — Web & Digital Work | 8webcom.com',
  description:
    'Browse projects by 8webcom.com — custom websites, web portals, e-commerce stores and digital marketing campaigns for clients across multiple industries in India.',
  keywords: [
    'web development portfolio India',
    '8webcom projects',
    'website design portfolio Ahmedabad',
    'web portal case studies',
    'digital marketing portfolio',
  ],
  alternates: {
    canonical: 'https://www.8webcom.com/projects',
    languages: { 'en-IN': 'https://www.8webcom.com/projects' },
  },
  openGraph: {
    title: 'Our Projects Portfolio — Web & Digital Work | 8webcom.com',
    description:
      'Browse projects by 8webcom.com — web design, portals, e-commerce and digital marketing for clients across industries.',
    url: 'https://www.8webcom.com/projects',
    type: 'website',
    siteName: '8webcom.com',
    images: [{ url: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png', width: 1200, height: 630, alt: 'Projects — 8webcom.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coo8webcom',
    title: 'Our Projects Portfolio — Web & Digital Work | 8webcom.com',
    description: 'Browse web development and digital marketing projects by 8webcom.com.',
    images: ['https://www.8webcom.com/admin/upload/general/eNLCZOpr.png'],
  },
};

export default async function ProjectsPage() {
  const [projects, testimonials] = await Promise.all([
    sanityFetch({ query: projectsQuery, fallback: PROJECTS, tags: ['project'] }),
    sanityFetch({ query: allTestimonialsQuery, fallback: TESTIMONIALS, tags: ['testimonial'] }),
  ]);

  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <PageHero
        title="Our"
        highlight="Projects"
        image="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      />
      
      <ProjectsGrid projects={projects as any} />

      <Testimonials 
        heading="Real Feedback from Real Clients"
        subTitle="Client Feedback"
        testimonials={testimonials as any}
      />
      
      <ContactCtaSection />
    </div>
  );
}
