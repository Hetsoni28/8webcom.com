import heroSlide from './heroSlide';
import service from './service';
import testimonial from './testimonial';
import project from './project';
import crmCard from './crmCard';
import caseStudy from './caseStudy';
import techPlatform from './techPlatform';
import clientLogo from './clientLogo';
import siteSettings from './siteSettings';
import homepageSettings from './homepageSettings';
import aboutSettings from './aboutSettings';
import {
  servicesPageSettings,
  projectsPageSettings,
  careersSettings,
  contactPageSettings,
  policyPage,
} from './pageSettings';
import { objectTypes } from './objects';

// Singleton types: exactly one document each, with _id === type name
export const SINGLETONS = [
  { type: 'siteSettings', title: 'Site Settings (header, footer, contact)' },
  { type: 'homepageSettings', title: 'Homepage' },
  { type: 'aboutSettings', title: 'About Page' },
  { type: 'servicesPageSettings', title: 'Services Pages' },
  { type: 'projectsPageSettings', title: 'Projects Page' },
  { type: 'careersSettings', title: 'Careers Page' },
  { type: 'contactPageSettings', title: 'Contact Page' },
] as const;

export const schemaTypes = [
  ...objectTypes,
  // ── Singletons ──
  siteSettings,
  homepageSettings,
  aboutSettings,
  servicesPageSettings,
  projectsPageSettings,
  careersSettings,
  contactPageSettings,
  // ── Collections ──
  heroSlide,
  service,
  testimonial,
  project,
  crmCard,
  caseStudy,
  techPlatform,
  clientLogo,
  policyPage,
];
