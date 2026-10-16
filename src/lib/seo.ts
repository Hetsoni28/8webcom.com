// ─── Centralised SEO metadata — 8webcom.com ──────────────────
// Crafted for ranking on: web development, digital marketing,
// CRM solutions, web portal development — Ahmedabad & India-wide.

export const SEO = {
  siteName: '8webcom.com',
  siteUrl: 'https://www.8webcom.com',

  // ── Home title: Primary keyword first, brand last ──────────
  defaultTitle: 'Web Development Company in Ahmedabad | 8webcom.com',

  // ── Template: inner pages get " | 8webcom.com" appended ────
  titleTemplate: '%s | 8webcom.com',

  // ── Home description: 150-160 chars, keyword-rich, action-led ──
  defaultDescription:
    'Custom web development, web portal, digital marketing & CRM solutions in Ahmedabad. 15+ years experience, 1,500+ projects, 2,000+ clients served across India & worldwide.',

  // OpenGraph defaults
  ogImage: 'https://www.8webcom.com/admin/upload/general/eNLCZOpr.png',
  ogLocale: 'en_IN',
  twitterHandle: '@coo8webcom',

  // ── Primary keywords (intent-focused, no "best" / superlative spam) ──
  keywords: [
    // Core service + city (highest commercial intent)
    'web development company in Ahmedabad',
    'website design company Ahmedabad',
    'web development company India',
    'digital marketing company Ahmedabad',
    'CRM software development company India',
    'web portal development company',
    // Service-specific
    'custom website development Ahmedabad',
    'e-commerce website development Ahmedabad',
    'SEO company Ahmedabad',
    'Google Ads management India',
    'WordPress development Ahmedabad',
    'Next.js development company India',
    'React JS development company Ahmedabad',
    // Compound local
    'IT company Satellite Ahmedabad',
    'software company Sun Gravitas Ahmedabad',
    // Brand
    '8webcom',
    '8webcom.com',
  ],

  // ── Per-page metadata ──────────────────────────────────────
  pages: {
    home: {
      title: 'Web Development Company in Ahmedabad | 8webcom.com',
      description:
        'Custom web development, web portals, digital marketing & CRM solutions in Ahmedabad. 15+ years experience, 1,500+ delivered projects, 2,000+ clients across India & worldwide. Get a free quote.',
    },
    about: {
      title: 'About Us — Web Development Agency Since 2011 | 8webcom.com',
      description:
        '8webcom.com is a web development & digital marketing agency in Ahmedabad, India, founded in 2011. We deliver websites, web portals, SEO & CRM solutions for businesses across India and globally.',
    },
    services: {
      title: 'Web Development, Digital Marketing & CRM Services | 8webcom.com',
      description:
        'Explore our core digital services in Ahmedabad: custom web development, web portal development, digital marketing (SEO, PPC, SMM) and CRM solutions for businesses across India.',
    },
    projects: {
      title: 'Our Projects Portfolio — Web & Digital Work | 8webcom.com',
      description:
        'Browse projects delivered by 8webcom.com — custom websites, web portals, e-commerce stores, and digital marketing campaigns for clients across multiple industries.',
    },
    careers: {
      title: 'Careers — Join Our Web Development Team | 8webcom.com',
      description:
        'Explore job openings at 8webcom.com in Ahmedabad. We hire web developers, digital marketers, UI/UX designers and project managers. Apply today.',
    },
    contacts: {
      title: 'Contact 8webcom.com — Free Project Consultation | Ahmedabad',
      description:
        'Contact 8webcom.com — 503, Sun Gravitas, Satellite, Ahmedabad, Gujarat 380015. Call +91 97277 00459 or email info@8webcom.com for a free project consultation.',
    },
    // ── Service sub-pages ──
    webDevelopment: {
      title: 'Web Development Services in Ahmedabad | 8webcom.com',
      description:
        'Professional web development services in Ahmedabad — custom websites, e-commerce, CMS integration and responsive design using WordPress, Next.js, React & PHP. Get a free quote.',
    },
    webPortal: {
      title: 'Web Portal Development Company in India | 8webcom.com',
      description:
        'Custom web portal development — B2B portals, B2C portals, employee self-service, vendor management and admin dashboards with role-based access and real-time data.',
    },
    digitalMarketing: {
      title: 'Digital Marketing Services in Ahmedabad | 8webcom.com',
      description:
        'Result-driven digital marketing services in Ahmedabad — SEO, PPC (Google & Meta Ads), social media marketing, content marketing, email campaigns and analytics.',
    },
    crmSolutions: {
      title: 'Custom CRM Development for Indian Businesses | 8webcom.com',
      description:
        'Custom CRM software development for Indian SMEs — lead management, sales pipeline, customer database, WhatsApp & email automation. Built in Ahmedabad, deployed anywhere.',
    },
    // ── Legal ──
    privacyPolicy: {
      title: 'Privacy Policy | 8webcom.com',
      description:
        'Read the Privacy Policy of 8webcom.com to understand how we collect, use, and protect your personal information on our website and digital platforms.',
    },
    disclaimerPolicy: {
      title: 'Disclaimer Policy | 8webcom.com',
      description:
        'Read the Disclaimer Policy of 8webcom.com regarding accuracy of information, liability limitations and external links on this website.',
    },
    refundPolicy: {
      title: 'Refund and Cancellation Policy | 8webcom.com',
      description:
        'Read the Refund and Cancellation Policy of 8webcom.com. Understand the conditions under which refunds are initiated for paid services.',
    },
  },
} as const;
