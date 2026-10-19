// All GROQ queries. Projections return the exact shapes in src/sanity/defaults.ts
// (images resolved to URLs), so Sanity data and local defaults are interchangeable.

const SEO = `seo { metaTitle, metaDescription, "ogImage": ogImage.asset->url }`;
const HERO = `hero { eyebrow, title, highlight, "image": image.asset->url }`;
const IMAGES = `images[] { "src": asset->url, alt }`;
const FEATURES = `features[] { "icon": icon.asset->url, title, description }`;

// ─── Singletons ───────────────────────────────────────────────────
export const siteSettingsQuery = `
  *[_id == "siteSettings"][0] {
    contact,
    socialLinks[] { platform, url, showInSidebar },
    header { navLinks[] { label, href, children[] { label, href } }, ctaLabel, ctaHref, sideMenuText },
    footer { usefulTitle, usefulLinks[] { label, href }, servicesTitle, serviceLinks[] { label, href }, contactTitle, legalLinks[] { label, href } },
    stats[] { value, suffix, label }
  }
`;

export const homepageQuery = `
  *[_id == "homepageSettings"][0] {
    ${SEO},
    hero { h1, trustMetrics[] { value, label } },
    about { subTitle, heading, description, experienceYears, experienceText, ${IMAGES}, ${FEATURES}, ctaLabel, ctaHref },
    servicesSection, techSection, crmSection, caseStudiesSection, testimonialsSection, clientsSection,
    faq { subTitle, heading, description, items[] { question, answer } },
    contactCta
  }
`;

export const aboutPageQuery = `
  *[_id == "aboutSettings"][0] {
    ${SEO},
    ${HERO},
    story { subTitle, heading, text, experienceYears, experienceText, ${IMAGES}, ${FEATURES}, ctaLabel, ctaHref },
    visionMission[] { icon, title, description },
    values { subTitle, heading, items[] { title, description } }
  }
`;

export const servicesPageQuery = `
  *[_id == "servicesPageSettings"][0] {
    ${SEO},
    ${HERO},
    listingButtonLabel,
    detail,
    process { subTitle, heading, description, steps[] { title, description } },
    whyChoose { headingPrefix, headingSuffix, description, items[] { icon, title, description } }
  }
`;

export const projectsPageQuery = `
  *[_id == "projectsPageSettings"][0] { ${SEO}, ${HERO}, section, testimonialsSection }
`;

export const careersPageQuery = `
  *[_id == "careersSettings"][0] { ${SEO}, ${HERO}, blocks[] { heading, highlight, text }, positions }
`;

export const contactPageQuery = `
  *[_id == "contactPageSettings"][0] {
    ${SEO},
    ${HERO},
    cards,
    intro { subTitle, heading, highlight, description, highlights[] { title, description }, channelsTitle },
    formServices,
    mapCardTitle
  }
`;

export const policyPageQuery = `
  *[_type == "policyPage" && slug == $slug][0] {
    slug, ${SEO}, ${HERO}, heading, badgeLabel, lastUpdated, intro, sections[] { title, content }
  }
`;

// ─── Collections ─────────────────────────────────────────────────
export const heroSlidesQuery = `
  *[_type == "heroSlide"] | order(order asc) {
    "id": _id, title, category, description, "image": image.asset->url, ctaLabel, ctaHref
  }
`;

export const servicesQuery = `
  *[_type == "service" && defined(slug.current)] | order(order asc) {
    "id": slug.current,
    title,
    "image": image.asset->url,
    "description": shortDescription,
    "href": "/services/" + slug.current
  }
`;

export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "image": image.asset->url,
    "description": shortDescription,
    headline,
    intro,
    features[] { title, description },
    technologies,
    keywords,
    ${SEO}
  }
`;

export const serviceSlugsQuery = `*[_type == "service" && defined(slug.current)].slug.current`;

export const testimonialsQuery = `
  *[_type == "testimonial" && featured == true] | order(order asc) {
    "id": _id, name, company, designation, rating, review, "avatar": avatar.asset->url
  }
`;

export const allTestimonialsQuery = `
  *[_type == "testimonial"] | order(order asc) {
    "id": _id, name, company, designation, rating, review, "avatar": avatar.asset->url
  }
`;

export const projectsQuery = `
  *[_type == "project"] | order(order asc) {
    "id": _id, title, category, client, description, "image": image.asset->url, url, "tags": coalesce(tags, [])
  }
`;

export const caseStudiesQuery = `
  *[_type == "caseStudy"] | order(order asc) { "id": _id, title, category, "image": image.asset->url, url }
`;

export const crmCardsQuery = `
  *[_type == "crmCard"] | order(order asc) { "id": _id, title, description, "image": image.asset->url, href }
`;

export const techPlatformsQuery = `
  *[_type == "techPlatform"] | order(order asc) { name, description, "image": image.asset->url, "icon": icon.asset->url }
`;

export const clientLogosQuery = `
  *[_type == "clientLogo"] | order(order asc) { name, "src": logo.asset->url, website }
`;
