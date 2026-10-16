import heroSlide from './heroSlide';
import service from './service';
import testimonial from './testimonial';
import project from './project';
import crmCard from './crmCard';
import caseStudy from './caseStudy';
import techPlatform from './techPlatform';
import clientLogo from './clientLogo';
import homepageSettings from './homepageSettings';
import aboutSettings from './aboutSettings';
import careersSettings from './careersSettings';

export const schemaTypes = [
  // ── Collections (lists) ──────────────────────────────
  heroSlide,
  service,
  testimonial,
  project,
  crmCard,
  caseStudy,
  techPlatform,
  clientLogo,
  // ── Singletons (one document per type) ───────────────
  homepageSettings,
  aboutSettings,
  careersSettings,
];
