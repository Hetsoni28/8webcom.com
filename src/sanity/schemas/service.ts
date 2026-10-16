import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first on grid',
    }),
    defineField({
      name: 'image',
      title: 'Card / Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'icon',
      title: 'Icon Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (shown on card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description (service detail page)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription', media: 'image' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
