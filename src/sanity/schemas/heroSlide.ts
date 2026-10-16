import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Badge (e.g. "Web Development")',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button Text (e.g. "Get Started Now")',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Button Link (e.g. /services/web-development)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Slides are displayed in ascending order (1 = first)',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
