// All GROQ queries for Sanity CMS
// Each query matches the shape that the local data fallbacks in data.ts already use,
// so components can consume Sanity data with zero changes.

// ─── Hero Slider ─────────────────────────────────────────────────
export const heroSlidesQuery = `
  *[_type == "heroSlide"] | order(order asc) {
    "id": _id,
    title,
    category,
    description,
    "image": image.asset->url,
    ctaLabel,
    ctaHref,
    order
  }
`;

// ─── Services Grid ────────────────────────────────────────────────
export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    "id": slug.current,
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "description": shortDescription,
    "href": "/services/" + slug.current
  }
`;

// ─── Testimonials ─────────────────────────────────────────────────
export const testimonialsQuery = `
  *[_type == "testimonial" && featured == true] | order(order asc) {
    "id": _id,
    name,
    company,
    designation,
    rating,
    review,
    "avatar": avatar.asset->url
  }
`;

// ─── All Testimonials (for /projects page etc.) ───────────────────
export const allTestimonialsQuery = `
  *[_type == "testimonial"] | order(order asc) {
    "id": _id,
    name,
    company,
    designation,
    rating,
    review,
    "avatar": avatar.asset->url
  }
`;

// ─── Projects ────────────────────────────────────────────────────
export const projectsQuery = `
  *[_type == "project"] | order(order asc) {
    "id": _id,
    title,
    "slug": slug.current,
    category,
    client,
    description,
    "image": image.asset->url,
    url,
    tags,
    featured
  }
`;

// ─── Case Studies / Work Showcase ────────────────────────────────
export const caseStudiesQuery = `
  *[_type == "caseStudy"] | order(order asc) {
    "id": _id,
    title,
    category,
    "image": image.asset->url,
    url
  }
`;

// ─── CRM Cards ───────────────────────────────────────────────────
export const crmCardsQuery = `
  *[_type == "crmCard"] | order(order asc) {
    "id": _id,
    title,
    description,
    "image": image.asset->url,
    href
  }
`;

// ─── Tech Platforms ──────────────────────────────────────────────
export const techPlatformsQuery = `
  *[_type == "techPlatform"] | order(order asc) {
    name,
    description,
    "image": image.asset->url,
    "icon": icon.asset->url
  }
`;

// ─── Client Logos ────────────────────────────────────────────────
export const clientLogosQuery = `
  *[_type == "clientLogo"] | order(order asc) {
    name,
    "src": logo.asset->url,
    website
  }
`;

// ─── Homepage Singleton ──────────────────────────────────────────
export const homepageSettingsQuery = `
  *[_type == "homepageSettings"][0] {
    seo,
    sectionAbout,
    sectionServices,
    sectionTech,
    sectionCrm,
    sectionCaseStudies,
    sectionStats,
    sectionTestimonials,
    sectionClients,
    contactCta
  }
`;

// ─── About Settings (Singleton) ──────────────────────────────────
export const aboutSettingsQuery = `
  *[_type == "aboutSettings"][0] {
    subTitle,
    heading,
    description,
    ctaLabel,
    ctaHref,
    "images": images[]{
      "src": asset->url,
      "alt": alt
    },
    features[] {
      title,
      description,
      "icon": icon.asset->url
    },
    visionMission
  }
`;

// ─── Careers Settings (Singleton) ────────────────────────────────
export const careersSettingsQuery = `
  *[_type == "careersSettings"][0] {
    heading,
    description,
    openings
  }
`;

// ─── Single Service by Slug ──────────────────────────────────────
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "description": shortDescription,
    fullDescription,
    features,
    seoTitle,
    seoDescription
  }
`;
