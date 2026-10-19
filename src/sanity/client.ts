import { createClient, type SanityClient } from '@sanity/client';
import { projectId, dataset, apiVersion } from './env';

// Public read client (CDN-cached, fast).
// Null when Sanity is not configured yet — fetch.ts falls back to local data.
// Image URLs come pre-resolved from GROQ (asset->url), so no image builder is needed.
export const client: SanityClient | null = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;
