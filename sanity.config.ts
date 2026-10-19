import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, SINGLETONS } from './src/sanity/schemas';
import { projectId, dataset, apiVersion } from './src/sanity/env';

// Studio lives at /studio. Requires NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local.
const singletonTypes = new Set<string>(SINGLETONS.map((s) => s.type));

const COLLECTIONS = [
  { type: 'heroSlide', title: 'Hero Slides (homepage)' },
  { type: 'service', title: 'Services' },
  { type: 'techPlatform', title: 'What We Offer (platform cards)' },
  { type: 'crmCard', title: 'CRM Cards' },
  { type: 'caseStudy', title: 'Work Showcase (client websites)' },
  { type: 'project', title: 'Projects page items' },
  { type: 'testimonial', title: 'Testimonials' },
  { type: 'clientLogo', title: 'Client Logos' },
  { type: 'policyPage', title: 'Policy Pages' },
];

export default defineConfig({
  name: '8webcom-studio',
  title: '8webcom.com CMS',
  projectId,
  dataset,
  apiVersion,
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('8webcom.com Content')
          .items([
            // Pages & global settings (one document each)
            ...SINGLETONS.map(({ type, title }) =>
              S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title))
            ),
            S.divider(),
            // Repeating content
            ...COLLECTIONS.map(({ type, title }) =>
              S.listItem().title(title).schemaType(type).child(S.documentTypeList(type).title(title))
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,
    // Singletons can't be created again from the "+" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Singletons can't be deleted or duplicated
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
});
