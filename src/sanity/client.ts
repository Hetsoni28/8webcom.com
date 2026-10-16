import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset, apiVersion, token } from './env';

function makeClient(useCdn: boolean, useToken = false): SanityClient | null {
  if (!projectId) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    ...(useToken && token ? { token } : {}),
  });
}

// Public client — used for reads (CDN-cached, fast)
// Returns null when Sanity is not yet configured — fetch.ts handles this gracefully
export const client = makeClient(true);

// Preview/write client — bypasses CDN, uses auth token
export const previewClient = makeClient(false, true);

// Helper to build optimised image URLs from Sanity asset references
export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0]) {
  if (!client) return { url: () => '' } as any;
  const builder = imageUrlBuilder(client);
  return builder.image(source);
}
