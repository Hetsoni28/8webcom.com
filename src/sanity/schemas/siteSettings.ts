import { defineArrayMember, defineField, defineType } from 'sanity';

// Global settings used on every page: header, footer, contact details, socials, stats.
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact details', default: true },
    { name: 'social', title: 'Social media' },
    { name: 'header', title: 'Header menu' },
    { name: 'footer', title: 'Footer' },
    { name: 'stats', title: 'Company numbers' },
  ],
  fields: [
    // ── Contact ────────────────────────────────────────────────
    defineField({
      name: 'contact',
      title: 'Contact details',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'phone', title: 'Phone (as shown)', type: 'string', description: 'e.g. +91 97277 00459' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({ name: 'website', title: 'Website (as shown)', type: 'string', description: 'e.g. www.8webcom.com' }),
        defineField({ name: 'address', title: 'Full address', type: 'text', rows: 2 }),
        defineField({ name: 'addressShort', title: 'Short address', type: 'string' }),
        defineField({
          name: 'whatsappNumber',
          title: 'WhatsApp number (digits only, with country code)',
          type: 'string',
          description: 'e.g. 919727700459',
          validation: (R) => R.regex(/^\d{10,15}$/, { name: 'digits' }),
        }),
        defineField({ name: 'whatsappMessage', title: 'WhatsApp pre-filled message', type: 'string' }),
        defineField({ name: 'callHours', title: 'Calling hours', type: 'string', description: 'e.g. Mon - Sat (9:30 AM - 7:00 PM)' }),
        defineField({ name: 'mapsUrl', title: 'Google Maps link (Get Directions)', type: 'url' }),
        defineField({
          name: 'mapEmbedUrl',
          title: 'Google Maps embed URL',
          type: 'url',
          description: 'Google Maps → Share → Embed a map → copy only the src="…" link',
        }),
      ],
    }),

    // ── Social ─────────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social media links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'Facebook' },
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'WhatsApp', value: 'WhatsApp' },
                  { title: 'LinkedIn', value: 'LinkedIn' },
                  { title: 'YouTube', value: 'YouTube' },
                  { title: 'X (Twitter)', value: 'X' },
                  { title: 'Pinterest', value: 'Pinterest' },
                ],
              },
              validation: (R) => R.required(),
            }),
            defineField({ name: 'url', title: 'Profile URL', type: 'url', validation: (R) => R.required() }),
            defineField({ name: 'showInSidebar', title: 'Show in floating side bar', type: 'boolean', initialValue: true }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        }),
      ],
    }),

    // ── Header ─────────────────────────────────────────────────
    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'header',
      fields: [
        defineField({ name: 'navLinks', title: 'Menu items', type: 'array', of: [defineArrayMember({ type: 'navItem' })] }),
        defineField({ name: 'ctaLabel', title: 'Button label', type: 'string', initialValue: 'Get In Touch' }),
        defineField({ name: 'ctaHref', title: 'Button link', type: 'string', initialValue: '/contacts' }),
        defineField({ name: 'sideMenuText', title: 'Side menu "about" text', type: 'text', rows: 4 }),
      ],
    }),

    // ── Footer ─────────────────────────────────────────────────
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({ name: 'usefulTitle', title: 'Column 1 title', type: 'string', initialValue: 'Useful Link' }),
        defineField({ name: 'usefulLinks', title: 'Column 1 links', type: 'array', of: [defineArrayMember({ type: 'link' })] }),
        defineField({ name: 'servicesTitle', title: 'Column 2 title', type: 'string', initialValue: 'Our Service' }),
        defineField({ name: 'serviceLinks', title: 'Column 2 links', type: 'array', of: [defineArrayMember({ type: 'link' })] }),
        defineField({ name: 'contactTitle', title: 'Contact column title', type: 'string', initialValue: 'Get In Touch' }),
        defineField({ name: 'legalLinks', title: 'Bottom bar links (policies)', type: 'array', of: [defineArrayMember({ type: 'link' })] }),
      ],
    }),

    // ── Stats ──────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Company numbers',
      description: 'Shown on the homepage stats band, About page and footer.',
      type: 'array',
      group: 'stats',
      of: [defineArrayMember({ type: 'stat' })],
      validation: (R) => R.max(4),
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
