// ─── Shared Types ─────────────────────────────────────────────

export interface NavChild {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}


// ─── Hero ─────────────────────────────────────────────────────

export interface HeroSlide {
  id: string | number;
  title: string;
  badge?: string;
  category?: string;
  tagline?: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

// ─── About ────────────────────────────────────────────────────

export interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AboutImage {
  src: string;
  alt: string;
}

// ─── Services ─────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  href: string;
  image: string;
  description: string;
}

// ─── Projects ─────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  slug?: string;
  category: string;
  client?: string;
  description: string;
  image: string;
  url?: string;
  tags: string[];
  featured?: boolean;
}

// ─── Tech Platform ────────────────────────────────────────────

export interface TechPlatform {
  name: string;
  image: string;
  icon: string;
  description: string;
}

// ─── Stats ────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

// ─── Testimonials ─────────────────────────────────────────────

export interface Testimonial {
  id: string | number;
  name: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
}

// ─── Client Logo ──────────────────────────────────────────────

export interface ClientLogo {
  name: string;
  src: string;
}



