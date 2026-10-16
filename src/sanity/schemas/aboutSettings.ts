import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutSettings',
  title: 'About Page Content',
  type: 'document',
  // Singleton — extra docs are blocked via studio structure config
  fields: [
    defineField({ name: 'subTitle', title: 'Badge Label (e.g. About Us)', type: 'string' }),
    defineField({ name: 'heading', title: 'Main Heading (e.g. 8WEBCOM.COM)', type: 'string' }),
    defineField({
      name: 'description',
      title: 'Main Description Paragraph',
      type: 'text',
      rows: 6,
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Button Link', type: 'string' }),
    defineField({
      name: 'images',
      title: 'Gallery Images (3 recommended)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'asset', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        ],
        preview: { select: { media: 'asset', title: 'alt' } },
      }],
    }),
    defineField({
      name: 'features',
      title: 'Feature Highlights',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Feature Title', type: 'string' }),
          defineField({ name: 'description', title: 'Feature Description', type: 'text', rows: 2 }),
          defineField({ name: 'icon', title: 'Feature Icon', type: 'image' }),
        ],
        preview: { select: { title: 'title', media: 'icon' } },
      }],
    }),
    defineField({
      name: 'visionMission',
      title: 'Vision, Mission & Quality Policy',
      type: 'object',
      fields: [
        defineField({ name: 'visionTitle', title: 'Vision Title', type: 'string' }),
        defineField({ name: 'visionText', title: 'Vision Text', type: 'text', rows: 3 }),
        defineField({ name: 'missionTitle', title: 'Mission Title', type: 'string' }),
        defineField({ name: 'missionText', title: 'Mission Text', type: 'text', rows: 3 }),
        defineField({ name: 'qualityTitle', title: 'Quality Policy Title', type: 'string' }),
        defineField({ name: 'qualityText', title: 'Quality Policy Text', type: 'text', rows: 3 }),
      ],
    }),
  ],
  preview: { select: { title: '_type' }, prepare: () => ({ title: 'About Page Content' }) },
});
