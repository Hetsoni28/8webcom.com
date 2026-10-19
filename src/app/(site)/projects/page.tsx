import { Metadata } from "next";
import { PageHero } from "@/components/organisms/sections/PageHero";
import { ContactCtaSection } from "@/components/organisms/sections/ContactCtaSection";
import { ProjectsGrid } from "@/components/organisms/sections/ProjectsGrid";
import { Testimonials } from "@/components/organisms/sections/Testimonials";
import { JsonLd } from "@/components/atoms/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/schemas";
import { buildMetadata, getAllTestimonials, getHomeContent, getProjects, getProjectsPageContent } from "@/sanity/content";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getProjectsPageContent();
  return buildMetadata(seo, "/projects", {
    keywords: [
      "web development portfolio Ahmedabad",
      "website design projects India",
      "8webcom projects",
      "web portal case studies",
    ],
  });
}

// Content: Sanity → Projects Page, Projects page items (falls back to Work
// Showcase), Testimonials, Homepage → Contact band.
export default async function ProjectsPage() {
  const [page, home, projects, testimonials] = await Promise.all([
    getProjectsPageContent(),
    getHomeContent(),
    getProjects(),
    getAllTestimonials(),
  ]);
  const cta = home.contactCta;

  return (
    <div className="bg-white selection:bg-[#0799B3] selection:text-white">
      <JsonLd
        schema={[
          webPageSchema({ name: page.seo.metaTitle ?? "Our Projects — 8webcom.com", description: page.seo.metaDescription ?? "", url: "/projects" }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Our Projects", href: "/projects" },
          ]),
        ]}
      />
      <PageHero title={page.hero.title} highlight={page.hero.highlight} subTitle={page.hero.eyebrow} image={page.hero.image} />

      <ProjectsGrid
        projects={projects}
        subTitle={page.section.subTitle}
        heading={page.section.heading}
        description={page.section.description}
      />

      <Testimonials
        heading={page.testimonialsSection.heading}
        subTitle={page.testimonialsSection.subTitle}
        description={page.testimonialsSection.description || home.testimonialsSection.description}
        testimonials={testimonials}
      />

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
