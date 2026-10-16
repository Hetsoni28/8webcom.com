import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study / Work Showcase',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Client / Project Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Industry / Category (e.g. Biotechnology)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Preview Screenshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'url',
      title: 'Live Website URL',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
