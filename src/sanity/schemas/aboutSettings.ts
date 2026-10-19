import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutSettings',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Banner', default: true },
    { name: 'story', title: 'Our story' },
    { name: 'vision', title: 'Vision / Mission' },
    { name: 'values', title: 'Values' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
    defineField({ name: 'hero', title: 'Banner', type: 'pageHero', group: 'hero' }),

    defineField({
      name: 'story',
      title: 'Our story section',
      type: 'object',
      group: 'story',
      fields: [
        defineField({ name: 'subTitle', title: 'Small label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'text', title: 'Story paragraph', type: 'text', rows: 6 }),
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

    defineField({
      name: 'visionMission',
      title: 'Vision / Mission / Quality cards',
      type: 'array',
      group: 'vision',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: ['vision', 'mission', 'quality'], layout: 'radio' },
              initialValue: 'vision',
            }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Text', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'title', subtitle: 'icon' } },
        }),
      ],
      validation: (R) => R.max(3),
    }),

    defineField({
      name: 'values',
      title: 'Values section',
      type: 'object',
      group: 'values',
      fields: [
        defineField({ name: 'subTitle', title: 'Small label', type: 'string' }),
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'items', title: 'Values', type: 'array', of: [defineArrayMember({ type: 'titledText' })] }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
});
