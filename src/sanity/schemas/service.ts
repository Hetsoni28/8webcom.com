import { defineArrayMember, defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  groups: [
    { name: 'card', title: 'Card (homepage & /services)', default: true },
    { name: 'page', title: 'Service page' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Service name', type: 'string', group: 'card', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'card',
      description: 'Page address: /services/<slug>. Do not change after launch (breaks links & Google rankings).',
      options: { source: 'title', maxLength: 64 },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'card', initialValue: 0 }),
    defineField({ name: 'image', title: 'Image', type: 'image', group: 'card', options: { hotspot: true } }),
    defineField({ name: 'shortDescription', title: 'Short description (cards)', type: 'text', rows: 3, group: 'card' }),

    defineField({
      name: 'headline',
      title: 'Page headline',
      type: 'string',
      group: 'page',
      description: 'Main heading of the overview, e.g. "Web Development Services in Ahmedabad". Important for Google.',
    }),
    defineField({ name: 'intro', title: 'Overview paragraph', type: 'text', rows: 5, group: 'page' }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'page',
      of: [defineArrayMember({ type: 'titledText' })],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      group: 'page',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'Search keywords',
      type: 'array',
      group: 'seo',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
  ],
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'slug.current', media: 'image' } },
});
