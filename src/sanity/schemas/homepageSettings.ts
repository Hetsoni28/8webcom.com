import { defineArrayMember, defineField, defineType } from 'sanity';

// Homepage text & section headings. Lists (slides, services, testimonials, logos…)
// live in their own collections in the sidebar.
export default defineType({
  name: 'homepageSettings',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'sections', title: 'Section headings' },
    { name: 'faq', title: 'FAQ' },
    { name: 'cta', title: 'Contact band' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      description: 'Slides themselves are edited under "Hero Slides".',
      fields: [
        defineField({
          name: 'h1',
          title: 'Main page heading (H1, small text at top of hero)',
          type: 'string',
          description: 'Most important line for Google. Keep the main keyword, e.g. "Web Development Company in Ahmedabad".',
        }),
        defineField({
          name: 'trustMetrics',
          title: 'Trust numbers (top-right card)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'value', title: 'Value (e.g. 15+ Years)', type: 'string' }),
                defineField({ name: 'label', title: 'Label (e.g. Experience)', type: 'string' }),
              ],
              preview: { select: { title: 'value', subtitle: 'label' } },
            }),
          ],
          validation: (R) => R.max(3),
        }),
      ],
    }),

    defineField({
      name: 'about',
      title: 'About section',
      type: 'object',
      group: 'about',
      fields: [
        defineField({ name: 'subTitle', title: 'Small label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Paragraph', type: 'text', rows: 5 }),
        defineField({ name: 'experienceYears', title: 'Experience number (e.g. 15+)', type: 'string' }),
        defineField({ name: 'experienceText', title: 'Experience label', type: 'string' }),
        defineField({
          name: 'images',
          title: 'Images (3)',
          type: 'array',
          of: [defineArrayMember({ type: 'imageWithAlt' })],
          validation: (R) => R.max(3),
        }),
        defineField({
          name: 'features',
          title: 'Feature list',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({ name: 'icon', title: 'Icon (white SVG/PNG)', type: 'image' }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Text', type: 'text', rows: 2 }),
              ],
              preview: { select: { title: 'title', media: 'icon' } },
            }),
          ],
        }),
        defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Button link', type: 'string' }),
      ],
    }),

    defineField({ name: 'servicesSection', title: 'Services section', type: 'sectionHeader', group: 'sections' }),
    defineField({ name: 'techSection', title: '"What We Offer" section', type: 'sectionHeader', group: 'sections' }),
    defineField({ name: 'crmSection', title: 'CRM section', type: 'sectionHeader', group: 'sections' }),
    defineField({ name: 'caseStudiesSection', title: 'Work showcase section', type: 'sectionHeader', group: 'sections' }),
    defineField({ name: 'testimonialsSection', title: 'Testimonials section', type: 'sectionHeader', group: 'sections' }),
    defineField({ name: 'clientsSection', title: 'Client logos section', type: 'sectionHeader', group: 'sections' }),

    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({ name: 'subTitle', title: 'Small label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'items', title: 'Questions', type: 'array', of: [defineArrayMember({ type: 'faqItem' })] }),
      ],
    }),

    defineField({
      name: 'contactCta',
      title: 'Contact band (bottom of page)',
      type: 'object',
      group: 'cta',
      description: 'Also used at the bottom of the About, Services and Projects pages.',
      fields: [
        defineField({ name: 'subTitle', title: 'Small label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Text', type: 'text', rows: 2 }),
        defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'Button link', type: 'string' }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
});
