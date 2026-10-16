import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company / Industry',
      type: 'string',
    }),
    defineField({
      name: 'designation',
      title: 'Designation / Role',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      description: 'Enter a number from 1 to 5',
      validation: (R) => R.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 5,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Client Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle off to hide from homepage without deleting',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'avatar' },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
