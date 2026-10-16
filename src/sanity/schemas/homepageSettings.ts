import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  // Singleton — extra docs are blocked via studio structure config
  fieldsets: [
    { name: 'seoGroup', title: '🔍 Search Engine Optimization (SEO)', options: { collapsible: true, collapsed: false } },
    { name: 'aboutGroup', title: '🏢 About Section', options: { collapsible: true, collapsed: false } },
    { name: 'servicesGroup', title: '⚙️ Services Section', options: { collapsible: true, collapsed: false } },
    { name: 'techGroup', title: '💻 Tech / Platforms Section', options: { collapsible: true, collapsed: false } },
    { name: 'crmGroup', title: '📦 CRM Solutions Section', options: { collapsible: true, collapsed: false } },
    { name: 'casesGroup', title: '🏆 Work Showcase / Case Studies Section', options: { collapsible: true, collapsed: false } },
    { name: 'statsGroup', title: '📊 Animated Numbers / Stats Section', options: { collapsible: true, collapsed: false } },
    { name: 'testiGroup', title: '⭐ Testimonials Section', options: { collapsible: true, collapsed: false } },
    { name: 'clientsGroup', title: '🤝 Client Brands Section', options: { collapsible: true, collapsed: false } },
    { name: 'ctaGroup', title: '📞 Bottom Contact CTA Section', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    // ── SEO ──────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'Homepage SEO Settings',
      type: 'object',
      fieldset: 'seoGroup',
      fields: [
        defineField({ name: 'metaTitle', title: 'Browser Tab Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
      ],
    }),

    // ── About Section ────────────────────────────────────────────────
    defineField({
      name: 'sectionAbout',
      title: 'About Section Configuration',
      type: 'object',
      fieldset: 'aboutGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. About Us)', type: 'string' }),
        defineField({ name: 'heading', title: 'Main Heading (e.g. 8WEBCOM.COM)', type: 'string' }),
        defineField({ name: 'description', title: 'About Description', type: 'text', rows: 5 }),
        defineField({ name: 'experienceYears', title: 'Experience Badge Number (e.g. 15+)', type: 'string' }),
        defineField({ name: 'experienceText', title: 'Experience Badge Text (e.g. Years of Excel)', type: 'string' }),
        defineField({ name: 'ctaLabel', title: 'Button Text (e.g. Discover Our Story)', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Button Link (e.g. /about-us)', type: 'string' }),
        defineField({ name: 'phone', title: 'Phone Call Number (e.g. +91 97277 00459)', type: 'string' }),
      ],
    }),

    // ── Services Section ─────────────────────────────────────────────
    defineField({
      name: 'sectionServices',
      title: 'Services Section Configuration',
      type: 'object',
      fieldset: 'servicesGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. Our Services)', type: 'string' }),
        defineField({ name: 'heading', title: 'Main Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Subtitle Description', type: 'text', rows: 2 }),
      ],
    }),

    // ── Tech Platforms Slider ─────────────────────────────────────────
    defineField({
      name: 'sectionTech',
      title: 'Tech Platforms Section Configuration',
      type: 'object',
      fieldset: 'techGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. What We Offer)', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
      ],
    }),

    // ── CRM Solutions ────────────────────────────────────────────────
    defineField({
      name: 'sectionCrm',
      title: 'CRM Solutions Section Configuration',
      type: 'object',
      fieldset: 'crmGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. CRM Solutions)', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Section Description', type: 'text', rows: 2 }),
      ],
    }),

    // ── Work Showcase / Case Studies ─────────────────────────────────
    defineField({
      name: 'sectionCaseStudies',
      title: 'Work Showcase Section Configuration',
      type: 'object',
      fieldset: 'casesGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. Case Studies)', type: 'string' }),
        defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
      ],
    }),

    // ── Stats / Animated Counters ────────────────────────────────────
    defineField({
      name: 'sectionStats',
      title: 'Animated Statistics Section',
      type: 'object',
      fieldset: 'statsGroup',
      fields: [
        defineField({ name: 'stat1Value', title: 'Stat 1 Value (e.g. 2000)', type: 'number' }),
        defineField({ name: 'stat1Suffix', title: 'Stat 1 Suffix (e.g. +)', type: 'string' }),
        defineField({ name: 'stat1Label', title: 'Stat 1 Label (e.g. Happy Clients)', type: 'string' }),

        defineField({ name: 'stat2Value', title: 'Stat 2 Value (e.g. 15)', type: 'number' }),
        defineField({ name: 'stat2Suffix', title: 'Stat 2 Suffix (e.g. +)', type: 'string' }),
        defineField({ name: 'stat2Label', title: 'Stat 2 Label (e.g. Years Experience)', type: 'string' }),

        defineField({ name: 'stat3Value', title: 'Stat 3 Value (e.g. 500)', type: 'number' }),
        defineField({ name: 'stat3Suffix', title: 'Stat 3 Suffix (e.g. +)', type: 'string' }),
        defineField({ name: 'stat3Label', title: 'Stat 3 Label (e.g. Delivered Projects)', type: 'string' }),

        defineField({ name: 'stat4Value', title: 'Stat 4 Value (e.g. 99)', type: 'number' }),
        defineField({ name: 'stat4Suffix', title: 'Stat 4 Suffix (e.g. %)', type: 'string' }),
        defineField({ name: 'stat4Label', title: 'Stat 4 Label (e.g. Client Satisfaction)', type: 'string' }),
      ],
    }),

    // ── Testimonials ─────────────────────────────────────────────────
    defineField({
      name: 'sectionTestimonials',
      title: 'Testimonials Section Configuration',
      type: 'object',
      fieldset: 'testiGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. Client Feedback)', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
      ],
    }),

    // ── Client Logos ─────────────────────────────────────────────────
    defineField({
      name: 'sectionClients',
      title: 'Client Brands Section Configuration',
      type: 'object',
      fieldset: 'clientsGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. Clients Logo)', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading (e.g. Trusted by Leading Companies)', type: 'string' }),
      ],
    }),

    // ── Bottom Contact CTA ───────────────────────────────────────────
    defineField({
      name: 'contactCta',
      title: 'Bottom Contact CTA Section Configuration',
      type: 'object',
      fieldset: 'ctaGroup',
      fields: [
        defineField({ name: 'subTitle', title: 'Badge Label (e.g. Need Expert Help?)', type: 'string' }),
        defineField({ name: 'heading', title: 'Main Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Subtext Description', type: 'text', rows: 2 }),
        defineField({ name: 'phone', title: 'Phone Number (e.g. +91 97277 00459)', type: 'string' }),
        defineField({ name: 'email', title: 'Email Address (e.g. info@8webcom.com)', type: 'string' }),
        defineField({ name: 'ctaLabel', title: 'Button Text (e.g. Get in Touch with Us)', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Button Link (e.g. /contacts)', type: 'string' }),
      ],
    }),
  ],
  preview: {
    select: { title: '_type' },
    prepare: () => ({ title: 'Homepage Settings' }),
  },
});
