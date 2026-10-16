import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'techPlatform',
  title: 'Tech Platform',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Platform Name (e.g. WordPress)',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Card Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'icon',
      title: 'Badge / Icon Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'icon' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
