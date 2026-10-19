import { defineArrayMember, defineField, defineType } from 'sanity';

// Singletons for the Services, Projects, Careers and Contact pages.

export const servicesPageSettings = defineType({
  name: 'servicesPageSettings',
  title: 'Services Pages',
  type: 'document',
  groups: [
    { name: 'listing', title: '/services page', default: true },
    { name: 'detail', title: 'Each service page' },
  ],
  fields: [
    defineField({ name: 'seo', title: 'SEO (/services)', type: 'seo', group: 'listing' }),
    defineField({ name: 'hero', title: 'Banner (/services)', type: 'pageHero', group: 'listing' }),
    defineField({
      name: 'listingButtonLabel',
      title: 'Button label on each service block',
      type: 'string',
      group: 'listing',
      initialValue: 'Explore Service',
    }),

    defineField({
      name: 'detail',
      title: 'Shared sections on every service detail page',
      type: 'object',
      group: 'detail',
      description: 'Each service’s own text, features and technologies are edited under "Services".',
      fields: [
        defineField({ name: 'heroEyebrow', title: 'Banner small label', type: 'string', initialValue: 'Our Expertise' }),
        defineField({ name: 'overviewEyebrow', title: 'Overview small label', type: 'string', initialValue: 'Service Overview' }),
        defineField({ name: 'imageCardTitle', title: 'Image card title', type: 'string' }),
        defineField({ name: 'imageCardText', title: 'Image card text', type: 'string' }),
        defineField({ name: 'technologiesLabel', title: 'Technologies label', type: 'string', initialValue: 'Technologies We Use' }),
      ],
    }),
    defineField({
      name: 'process',
      title: '"Our Proven Process" section',
      type: 'object',
      group: 'detail',
      fields: [
        defineField({ name: 'subTitle', title: 'Small label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({ name: 'steps', title: 'Steps', type: 'array', of: [defineArrayMember({ type: 'titledText' })] }),
      ],
    }),
    defineField({
      name: 'whyChoose',
      title: '"Why Choose" section',
      type: 'object',
      group: 'detail',
      fields: [
        defineField({ name: 'headingPrefix', title: 'Heading before service name', type: 'string', initialValue: 'Why Choose Our' }),
        defineField({ name: 'headingSuffix', title: 'Heading after service name', type: 'string', initialValue: 'Services?' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Reasons (3)',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  options: { list: [
                    { title: 'Shield (security)', value: 'shield' },
                    { title: 'Lightning (speed)', value: 'zap' },
                    { title: 'Chart (growth)', value: 'trending' },
                  ] },
                  initialValue: 'shield',
                }),
                defineField({ name: 'title', title: 'Title', type: 'string' }),
                defineField({ name: 'description', title: 'Text', type: 'text', rows: 3 }),
              ],
              preview: { select: { title: 'title', subtitle: 'icon' } },
            }),
          ],
          validation: (R) => R.max(3),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Services Pages' }) },
});

export const projectsPageSettings = defineType({
  name: 'projectsPageSettings',
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'hero', title: 'Banner', type: 'pageHero' }),
    defineField({ name: 'section', title: 'Portfolio heading', type: 'sectionHeader' }),
    defineField({ name: 'testimonialsSection', title: 'Testimonials heading', type: 'sectionHeader' }),
  ],
  preview: { prepare: () => ({ title: 'Projects Page' }) },
});

export const careersSettings = defineType({
  name: 'careersSettings',
  title: 'Careers Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'hero', title: 'Banner', type: 'pageHero' }),
    defineField({
      name: 'blocks',
      title: 'Text blocks (left column)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({ name: 'highlight', title: 'Highlighted part (teal)', type: 'string' }),
            defineField({ name: 'text', title: 'Text', type: 'text', rows: 5 }),
          ],
          preview: { select: { title: 'heading', subtitle: 'highlight' } },
        }),
      ],
    }),
    defineField({
      name: 'positions',
      title: 'Positions in the application form',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Careers Page' }) },
});

export const contactPageSettings = defineType({
  name: 'contactPageSettings',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'hero', title: 'Banner', type: 'pageHero' }),
    defineField({
      name: 'cards',
      title: 'Contact cards (labels)',
      description: 'The values (address, phone, email) come from Site Settings → Contact details.',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: ['address', 'phone', 'email', 'whatsapp'].map((key) =>
        defineField({
          name: key,
          title: `${key[0].toUpperCase()}${key.slice(1)} card`,
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Small text', type: 'string' }),
            defineField({ name: 'action', title: 'Link text', type: 'string' }),
          ],
        })
      ),
    }),
    defineField({
      name: 'intro',
      title: 'Form section — left column',
      type: 'object',
      fields: [
        defineField({ name: 'subTitle', title: 'Small label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'highlight', title: 'Highlighted part (teal)', type: 'string' }),
        defineField({ name: 'description', title: 'Text', type: 'text', rows: 3 }),
        defineField({ name: 'highlights', title: 'Trust points', type: 'array', of: [defineArrayMember({ type: 'titledText' })] }),
        defineField({ name: 'channelsTitle', title: 'Social links title', type: 'string' }),
      ],
    }),
    defineField({
      name: 'formServices',
      title: 'Service options in the form dropdown',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'mapCardTitle', title: 'Map card title', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
});

export const policyPage = defineType({
  name: 'policyPage',
  title: 'Policy Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Which page',
      type: 'string',
      options: {
        list: [
          { title: 'Disclaimer Policy', value: 'disclaimer-policy' },
          { title: 'Refund & Cancellation Policy', value: 'refund-and-cancellation-policy' },
          { title: 'Privacy Policy', value: 'privacy-policy' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
      readOnly: ({ document }) => Boolean(document?._createdAt && document?.slug),
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'hero', title: 'Banner', type: 'pageHero' }),
    defineField({ name: 'heading', title: 'Document title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'badgeLabel', title: 'Badge label', type: 'string' }),
    defineField({ name: 'lastUpdated', title: 'Last updated (as shown)', type: 'string', description: 'e.g. January 2026' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'content', title: 'Text', type: 'text', rows: 6, validation: (R) => R.required() }),
          ],
          preview: { select: { title: 'title', subtitle: 'content' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading', subtitle: 'slug' } },
});
