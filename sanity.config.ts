import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';
import { projectId, dataset, apiVersion } from './src/sanity/env';
// NOTE: Add NEXT_PUBLIC_SANITY_PROJECT_ID to .env.local before opening /studio

// Singletons: these appear as a single page, not a list
const singletonTypes = new Set(['homepageSettings', 'aboutSettings', 'careersSettings']);

const singletonLabels: Record<string, string> = {
  homepageSettings: '🏠 Homepage Settings',
  aboutSettings: '📄 About Page Content',
  careersSettings: '💼 Careers Page Content',
};

export default defineConfig({
  name: '8webcom-studio',
  title: '8webcom.com CMS',
  projectId,
  dataset,
  apiVersion,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('8webcom Content Manager')
          .items([
            // ── Dynamic Lists ──────────────────────────────────
            S.listItem()
              .title('🎞 Hero Slides')
              .schemaType('heroSlide')
              .child(S.documentTypeList('heroSlide').title('Hero Slides')),

            S.listItem()
              .title('⚙️ Services')
              .schemaType('service')
              .child(S.documentTypeList('service').title('Services')),

            S.listItem()
              .title('🗂 Projects')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Projects')),

            S.listItem()
              .title('🏆 Case Studies / Work Showcase')
              .schemaType('caseStudy')
              .child(S.documentTypeList('caseStudy').title('Case Studies')),

            S.listItem()
              .title('📦 CRM Cards')
              .schemaType('crmCard')
              .child(S.documentTypeList('crmCard').title('CRM Cards')),

            S.listItem()
              .title('💻 Tech Platforms')
              .schemaType('techPlatform')
              .child(S.documentTypeList('techPlatform').title('Tech Platforms')),

            S.listItem()
              .title('⭐ Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('Testimonials')),

            S.listItem()
              .title('🏢 Client Logos')
              .schemaType('clientLogo')
              .child(S.documentTypeList('clientLogo').title('Client Logos')),

            S.divider(),

            // ── Singletons (one doc per type) ─────────────────
            ...Object.entries(singletonLabels).map(([type, label]) =>
              S.listItem()
                .title(label)
                .id(type)
                .child(
                  S.document()
                    .schemaType(type)
                    .documentId(type)
                )
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent users from creating extra singleton docs
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  // Embedded in Next.js at /studio
  basePath: '/studio',
});
