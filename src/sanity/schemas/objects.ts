import { defineArrayMember, defineField, defineType } from 'sanity';

// ─── Reusable building blocks used across many documents ───────────────────

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Browser tab / Google title',
      type: 'string',
      description: 'About 50–60 characters. End with "| 8webcom.com".',
      validation: (R) => R.max(70).warning('Google usually cuts titles longer than ~60 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Google description',
      type: 'text',
      rows: 3,
      validation: (R) => R.max(170).warning('Keep it under ~160 characters.'),
    }),
    defineField({ name: 'ogImage', title: 'Share image (1200×630)', type: 'image' }),
  ],
});

export const pageHero = defineType({
  name: 'pageHero',
  title: 'Page banner',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: 'eyebrow', title: 'Small label above the title', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'highlight', title: 'Highlighted word(s) after the title (teal)', type: 'string' }),
    defineField({ name: 'image', title: 'Background image', type: 'image', options: { hotspot: true } }),
  ],
});

export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Section heading',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: 'subTitle', title: 'Small label (eyebrow)', type: 'string' }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
  ],
});

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Page path like /about-us, or a full https:// URL',
      validation: (R) => R.required(),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});

export const navItem = defineType({
  name: 'navItem',
  title: 'Menu item',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'href', title: 'Link', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'children',
      title: 'Dropdown items (optional)',
      type: 'array',
      of: [defineArrayMember({ type: 'link' })],
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Number', type: 'number', validation: (R) => R.required() }),
    defineField({ name: 'suffix', title: 'Suffix (e.g. + or %)', type: 'string' }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() }),
  ],
  preview: {
    select: { value: 'value', suffix: 'suffix', label: 'label' },
    prepare: ({ value, suffix, label }) => ({ title: `${value ?? ''}${suffix ?? ''}`, subtitle: label }),
  },
});

export const titledText = defineType({
  name: 'titledText',
  title: 'Title + text',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Text', type: 'text', rows: 3 }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Question',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (R) => R.required() }),
  ],
  preview: { select: { title: 'question', subtitle: 'answer' } },
});

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [defineField({ name: 'alt', title: 'Alt text (describe the image)', type: 'string' })],
});

export const objectTypes = [seo, pageHero, sectionHeader, link, navItem, stat, titledText, faqItem, imageWithAlt];
