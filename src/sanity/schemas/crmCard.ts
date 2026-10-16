import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'crmCard',
  title: 'CRM Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Card Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Card Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'href',
      title: 'Link (e.g. /services/crm-solutions)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
