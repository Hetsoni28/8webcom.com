import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'careersSettings',
  title: 'Careers Page Content',
  type: 'document',
  // Singleton — extra docs are blocked via studio structure config
  fields: [
    defineField({
      name: 'heading',
      title: 'Page Heading',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'openings',
      title: 'Job Openings',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Job Title', type: 'string', validation: (R) => R.required() }),
          defineField({ name: 'department', title: 'Department', type: 'string' }),
          defineField({ name: 'location', title: 'Location (e.g. Ahmedabad)', type: 'string' }),
          defineField({
            name: 'type',
            title: 'Employment Type',
            type: 'string',
            options: {
              list: [
                { title: 'Full-Time', value: 'Full-Time' },
                { title: 'Part-Time', value: 'Part-Time' },
                { title: 'Remote', value: 'Remote' },
                { title: 'Internship', value: 'Internship' },
              ],
            },
          }),
          defineField({ name: 'description', title: 'Job Description', type: 'text', rows: 4 }),
          defineField({ name: 'skills', title: 'Required Skills', type: 'array', of: [{ type: 'string' }] }),
        ],
        preview: { select: { title: 'title', subtitle: 'department' } },
      }],
    }),
  ],
  preview: { select: { title: '_type' }, prepare: () => ({ title: 'Careers Page Content' }) },
});
