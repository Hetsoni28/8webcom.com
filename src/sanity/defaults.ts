// Default content for every editable field — exactly what the site shows today.
// Used (1) as the fallback when a Sanity field is empty and (2) by
// scripts/seed-sanity.ts to pre-fill Sanity Studio. Shapes match src/sanity/queries.ts.

import {
  HERO_SLIDES,
  ABOUT,
  SERVICES,
  TECH_PLATFORMS,
  CRM_CARDS,
  CASE_STUDIES,
  STATS,
  TESTIMONIALS,
  CLIENT_LOGOS,
  HOME_FAQS,
} from '@/lib/data';
import { ABOUT_PAGE, SERVICE_DETAIL, DISCLAIMER_POLICY, REFUND_POLICY, PRIVACY_POLICY } from '@/lib/page-data';
import { CONTACT, NAV_LINKS, FOOTER_USEFUL_LINKS, FOOTER_SERVICE_LINKS, FOOTER_LEGAL_LINKS, CONTACT_FORM_SERVICES } from '@/lib/constants';
import { SEO as SEO_TEXT } from '@/lib/seo';
import { SERVICE_SCHEMAS } from '@/lib/schemas';

// ─── Shared shapes ───────────────────────────────────────────────
export type Seo = { metaTitle?: string; metaDescription?: string; ogImage?: string };
export type Hero = { eyebrow?: string; title?: string; highlight?: string; image?: string };
export type SectionHead = { subTitle?: string; heading?: string; description?: string };
export type Link = { label: string; href: string };
export type Stat = { value: number; suffix?: string; label: string };
export type Feature = { icon: string; title: string; description: string };
export type Img = { src: string; alt: string };

const seo = (key: keyof typeof SEO_TEXT.pages): Seo => ({
  metaTitle: SEO_TEXT.pages[key].title,
  metaDescription: SEO_TEXT.pages[key].description,
});

// ─── Site settings ───────────────────────────────────────────────
export const SITE_DEFAULTS = {
  contact: {
    phone: CONTACT.phone,
    email: CONTACT.email,
    website: CONTACT.website,
    address: CONTACT.address,
    addressShort: CONTACT.addressShort,
    whatsappNumber: '919727700459',
    whatsappMessage: 'Hello, I visited your website www.8webcom.com and I would like to start a conversation with 8webcom.',
    callHours: 'Mon - Sat (9:30 AM - 7:00 PM)',
    mapsUrl: 'https://maps.google.com/?q=Sun+Gravitas+Satellite+Ahmedabad',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.0622288075776!2d72.52853607593688!3d23.010899916382196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f509e5b0cb%3A0xe54d6fa7c207908b!2sSun%20Gravitas!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },
  socialLinks: [
    { platform: 'WhatsApp', url: 'https://wa.me/919727700459', showInSidebar: true },
    { platform: 'Instagram', url: 'https://www.instagram.com/8webcom/', showInSidebar: true },
    { platform: 'Facebook', url: 'https://www.facebook.com/8webcom', showInSidebar: true },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/8webcom', showInSidebar: true },
    { platform: 'X', url: 'https://x.com/coo8webcom', showInSidebar: true },
    { platform: 'YouTube', url: 'https://www.youtube.com/@8webcom', showInSidebar: false },
    { platform: 'Pinterest', url: 'https://in.pinterest.com/8webcom/', showInSidebar: false },
  ],
  header: {
    navLinks: NAV_LINKS.map((l) => ({ label: l.label, href: l.href, children: l.children ?? [] })),
    ctaLabel: 'Get In Touch',
    ctaHref: '/contacts',
    sideMenuText:
      'Welcome to 8webcom.com. Established in 2011, we are an Ahmedabad-based digital agency delivering end-to-end IT solutions across Web Portals, Enterprise Software, Digital Marketing, and CRM for 2000+ businesses globally.',
  },
  footer: {
    usefulTitle: 'Useful Link',
    usefulLinks: FOOTER_USEFUL_LINKS as Link[],
    servicesTitle: 'Our Service',
    serviceLinks: FOOTER_SERVICE_LINKS as Link[],
    contactTitle: 'Get In Touch',
    legalLinks: FOOTER_LEGAL_LINKS as Link[],
  },
  stats: STATS as Stat[],
};
export type SiteSettings = typeof SITE_DEFAULTS;

// ─── Homepage ────────────────────────────────────────────────────
export const HOME_DEFAULTS = {
  seo: seo('home'),
  hero: {
    h1: 'Web Development & Digital Marketing Company in Ahmedabad',
    trustMetrics: [
      { value: '15+ Years', label: 'Experience' },
      { value: '1,500+', label: 'Projects Delivered' },
      { value: '2,000+', label: 'Happy Clients' },
    ],
  },
  about: {
    subTitle: ABOUT.subTitle,
    heading: ABOUT.heading,
    description: ABOUT.description,
    experienceYears: '15+',
    experienceText: 'Years of Excel',
    images: ABOUT.images as Img[],
    features: ABOUT.features as Feature[],
    ctaLabel: ABOUT.ctaLabel,
    ctaHref: ABOUT.ctaHref,
  },
  servicesSection: {
    subTitle: 'Our Services',
    heading: 'High-Impact Services for Growing Businesses',
    description: 'We offer a comprehensive range of digital services to help your business grow and succeed in the modern digital landscape.',
  } as SectionHead,
  techSection: { subTitle: 'What We Offer', heading: 'Superfast, well designed, well researched, website with CMS' } as SectionHead,
  crmSection: {
    subTitle: 'CRM Solutions',
    heading: 'Grow your business with smart CRM solutions',
    description: 'Tailored CRM platforms and automated workflows built specifically for your business processes.',
  } as SectionHead,
  caseStudiesSection: { subTitle: 'Case Studies', heading: 'Let’s See Our Work Showcase' } as SectionHead,
  testimonialsSection: {
    subTitle: 'Client Feedback',
    heading: 'Real Feedback from Real Clients',
    description: 'Real feedback from verified businesses, founders, and healthcare leaders across India and worldwide.',
  } as SectionHead,
  clientsSection: { subTitle: 'Clients Logo', heading: 'Trusted by Leading Companies' } as SectionHead,
  faq: {
    subTitle: 'FAQ',
    heading: 'Frequently Asked Questions',
    description: 'Everything you need to know about working with 8webcom.com.',
    items: HOME_FAQS,
  },
  contactCta: {
    subTitle: 'Need Expert Help?',
    heading: "Have a Project in Mind? Let's Talk!",
    description: 'Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days.',
    ctaLabel: 'Get in Touch with Us',
    ctaHref: '/contacts',
  },
};
export type HomeContent = typeof HOME_DEFAULTS;

// ─── About page ──────────────────────────────────────────────────
export const ABOUT_DEFAULTS = {
  seo: seo('about'),
  hero: {
    eyebrow: 'Our Story',
    title: 'About',
    highlight: '8webcom',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  } as Hero,
  story: {
    subTitle: ABOUT.subTitle,
    heading: ABOUT.heading,
    text: ABOUT_PAGE.story,
    experienceYears: '15+',
    experienceText: 'Years of Excel',
    images: ABOUT.images as Img[],
    features: ABOUT.features as Feature[],
    ctaLabel: 'Contact Us',
    ctaHref: '/contacts',
  },
  visionMission: [
    {
      icon: 'vision' as const,
      title: 'Our Vision',
      description:
        'Our vision is to lead globally in IT solutions and services by fostering innovation, delivering excellence, and upholding ethical business strategies—while creating meaningful value for society.',
    },
    {
      icon: 'mission' as const,
      title: 'Our Mission',
      description:
        'Our mission is to create innovative products and deliver exceptional services. We believe technology should empower people and enable a better environment, which is why we place quality and value at the forefront of everything we do.',
    },
    {
      icon: 'quality' as const,
      title: 'Quality Policy',
      description:
        'We deliver effective, high-quality solutions and services that meet project requirements and consistently achieve excellence, guided by our globally aligned quality management standards.',
    },
  ],
  values: {
    subTitle: 'Our Values',
    heading: 'The Principles Behind Our Work',
    items: ABOUT_PAGE.values.map((v) => ({ title: v.title, description: v.description })),
  },
};
export type AboutContent = typeof ABOUT_DEFAULTS;

// ─── Services pages ──────────────────────────────────────────────
export const SERVICES_PAGE_DEFAULTS = {
  seo: seo('services'),
  hero: {
    eyebrow: 'What We Do',
    title: 'Our Services',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  } as Hero,
  listingButtonLabel: 'Explore Service',
  detail: {
    heroEyebrow: 'Our Expertise',
    overviewEyebrow: 'Service Overview',
    imageCardTitle: 'Empowering Businesses',
    imageCardText: 'Through next-generation digital solutions.',
    technologiesLabel: 'Technologies We Use',
  },
  process: {
    subTitle: 'How We Work',
    heading: 'Our Proven Process',
    description: 'A transparent, results-driven methodology designed to guarantee your success.',
    steps: [
      { title: 'Discovery & Strategy', description: 'We dive deep into your business goals, target audience, and competitive landscape to craft a bulletproof digital strategy.' },
      { title: 'UI/UX Design', description: 'Our world-class designers create stunning, user-centric interfaces that captivate your audience and drive massive conversions.' },
      { title: 'Agile Development', description: 'Using the latest tech stacks, our engineers build blazing fast, highly secure, and scalable solutions tailored to your needs.' },
      { title: 'Testing & Deployment', description: 'Rigorous QA testing ensures a flawless launch, followed by continuous monitoring and optimization for maximum ROI.' },
    ],
  },
  whyChoose: {
    headingPrefix: 'Why Choose Our',
    headingSuffix: 'Services?',
    description: 'We combine technical excellence with industry best practices to deliver solutions that outperform the competition.',
    items: [
      { icon: 'shield' as const, title: 'Highly Secure', description: 'Security is ingrained in our development lifecycle. We ensure your data and operations remain protected against modern threats.' },
      { icon: 'zap' as const, title: 'Lightning Fast', description: 'Performance is a feature. We optimize every byte and query to ensure your digital presence is blazing fast across all devices.' },
      { icon: 'trending' as const, title: 'Scalable Growth', description: 'Our solutions are built to grow with you. We use modern architecture patterns that effortlessly scale as your business expands.' },
    ],
  },
};
export type ServicesPageContent = typeof SERVICES_PAGE_DEFAULTS;

const SERVICE_SEO: Record<string, keyof typeof SEO_TEXT.pages> = {
  'web-development': 'webDevelopment',
  'web-portal': 'webPortal',
  'digital-marketing': 'digitalMarketing',
  'crm-solutions': 'crmSolutions',
};

export type ServiceDetail = {
  title: string;
  slug: string;
  image: string;
  description: string;
  headline: string;
  intro: string;
  features: { title: string; description?: string }[];
  technologies: string[];
  keywords: string[];
  seo: Seo;
};

export const SERVICE_DEFAULTS: ServiceDetail[] = SERVICES.map((s) => {
  const slug = s.href.replace('/services/', '');
  const detail = SERVICE_DETAIL[slug as keyof typeof SERVICE_DETAIL];
  return {
    title: s.title,
    slug,
    image: s.image,
    description: s.description,
    headline: SERVICE_SCHEMAS[slug]?.name ?? `${s.title} Services`,
    intro: detail?.intro ?? s.description,
    features: detail ? detail.features.map((f) => ({ title: f.title, description: f.description })) : [],
    technologies: detail ? [...detail.technologies] : [],
    keywords: SERVICE_SCHEMAS[slug]?.keywords ?? [],
    seo: SERVICE_SEO[slug] ? seo(SERVICE_SEO[slug]) : {},
  };
});

// ─── Projects / Careers / Contact ────────────────────────────────
export const PROJECTS_PAGE_DEFAULTS = {
  seo: seo('projects'),
  hero: {
    title: 'Our',
    highlight: 'Projects',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  } as Hero,
  section: {
    subTitle: 'Our Portfolio',
    heading: 'Showcasing Our Best Work',
    description: "Explore our recent projects and see how we've helped businesses transform their digital presence and achieve their goals.",
  } as SectionHead,
  testimonialsSection: { subTitle: 'Client Feedback', heading: 'Real Feedback from Real Clients' } as SectionHead,
};
export type ProjectsPageContent = typeof PROJECTS_PAGE_DEFAULTS;

export const CAREERS_DEFAULTS = {
  seo: seo('careers'),
  hero: {
    eyebrow: 'Careers',
    title: 'Join Our',
    highlight: 'Team',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  } as Hero,
  blocks: [
    {
      heading: 'Build Your Future with',
      highlight: '8webcom.com',
      text: 'The driving force behind the success of 8webcom.com is its team of like-minded, young, and experienced professionals, bound together by a culture of excellence. Wherever they are, whatever they do, a 8webcom.com team member stands for the commitment to make a difference, and through his work, be a source of pride to his country, his company, his family, and above all, to himself.',
    },
    {
      heading: 'A Career,',
      highlight: 'Not Just a Job',
      text: 'Career at 8webcom.com is driven by professional approach offering each individual a challenging career rather than a job. We ensure development of our members through training & exposure, engagement & involvement, installing our value system in them and fostering the culture of accountability, quality, and winning.',
    },
  ],
  positions: [
    'Web Development',
    'Full Stack Developer',
    'WordPress Developer',
    'Web Portal Developer',
    'Digital Marketing Executive',
    'SEO Specialist',
    'UI/UX Designer',
    'CRM Solutions Specialist',
    'Other',
  ],
};
export type CareersContent = typeof CAREERS_DEFAULTS;

export const CONTACT_DEFAULTS = {
  seo: seo('contacts'),
  hero: {
    eyebrow: 'Get In Touch',
    title: 'Contact',
    highlight: 'Us',
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  } as Hero,
  cards: {
    address: { title: 'Visit Our Office', subtitle: 'Ahmedabad, India', action: 'View on Map' },
    phone: { title: 'Call Our Team', subtitle: 'Mon - Sat (9:30 AM - 7:00 PM)', action: 'Call Directly' },
    email: { title: 'Email Inquiries', subtitle: '24/7 Response Time', action: 'Send an Email' },
    whatsapp: { title: 'WhatsApp Chat', subtitle: 'Instant Consultation', action: 'Chat on WhatsApp' },
  },
  intro: {
    subTitle: 'Get In Touch',
    heading: "Let's Build Something",
    highlight: 'Great Together',
    description:
      'Have an ambitious web project, need a tailored enterprise portal, or looking to scale your business with performance marketing? Reach out to our expert team in Ahmedabad for a direct consultation.',
    highlights: [
      { title: 'Guaranteed Fast Response', description: 'We review all client inquiries within 24 business hours with dedicated technical consultation.' },
      { title: 'Confidential & Secure', description: 'All project briefs, client requirements, and NDAs are handled with strict enterprise confidentiality.' },
      { title: '15+ Years & 2000+ Clients', description: 'Trusted by local and international businesses since 2011 for high-performance digital engineering.' },
    ],
    channelsTitle: 'Connect on Official Channels',
  },
  formServices: [...CONTACT_FORM_SERVICES],
  mapCardTitle: '8webcom Corporate HQ',
};
export type ContactContent = typeof CONTACT_DEFAULTS;

// ─── Policy pages ────────────────────────────────────────────────
export type PolicySlug = 'disclaimer-policy' | 'refund-and-cancellation-policy' | 'privacy-policy';

const policy = (
  slug: PolicySlug,
  data: { heading: string; lastUpdated: string; intro: string; sections: readonly { title: string; content: string }[] },
  hero: Hero,
  badgeLabel: string,
  seoKey: keyof typeof SEO_TEXT.pages
) => ({
  slug,
  seo: seo(seoKey),
  hero,
  heading: data.heading,
  badgeLabel,
  lastUpdated: data.lastUpdated,
  intro: data.intro,
  sections: data.sections.map((s) => ({ title: s.title, content: s.content })),
});

export const POLICY_DEFAULTS = {
  'disclaimer-policy': policy(
    'disclaimer-policy',
    DISCLAIMER_POLICY,
    {
      eyebrow: 'Legal Notice',
      title: 'Disclaimer',
      highlight: 'Policy',
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    },
    'LEGAL NOTICE & TERMS',
    'disclaimerPolicy'
  ),
  'refund-and-cancellation-policy': policy(
    'refund-and-cancellation-policy',
    REFUND_POLICY,
    {
      eyebrow: 'Billing & Terms',
      title: 'Refund &',
      highlight: 'Cancellation',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    },
    'SERVICE TERMS & BILLING',
    'refundPolicy'
  ),
  'privacy-policy': policy(
    'privacy-policy',
    PRIVACY_POLICY,
    {
      eyebrow: 'Data Protection',
      title: 'Privacy',
      highlight: 'Policy',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    },
    'DATA PROTECTION & PRIVACY',
    'privacyPolicy'
  ),
};
export type PolicyContent = (typeof POLICY_DEFAULTS)[PolicySlug];

// ─── Collections (lists) ─────────────────────────────────────────
export const COLLECTION_DEFAULTS = {
  heroSlides: HERO_SLIDES,
  services: SERVICES,
  techPlatforms: TECH_PLATFORMS,
  crmCards: CRM_CARDS,
  caseStudies: CASE_STUDIES,
  testimonials: TESTIMONIALS,
  clientLogos: CLIENT_LOGOS,
};
