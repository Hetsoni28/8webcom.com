import { client } from './client';

/**
 * Fetches data from Sanity with an automatic fallback to local data.
 *
 * - If NEXT_PUBLIC_SANITY_PROJECT_ID is not set → return fallback immediately (no network call)
 * - If client could not be created → return fallback
 * - If Sanity returns empty array/null → return fallback
 * - If fetch throws → return fallback
 *
 * This ensures the site always works, even before CMS is connected.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback: T;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  // Sanity not configured or client not initialised → use local data silently
  if (!client) return fallback;

  try {
    const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
    if (revalidate !== undefined) nextOptions.revalidate = revalidate;
    if (tags && tags.length > 0) nextOptions.tags = tags;

    const result = await client.fetch<T>(query, params, {
      next: nextOptions,
    });

    // Fall back when CMS returns nothing (not seeded yet)
    if (result === null || result === undefined) return fallback;
    if (Array.isArray(result) && result.length === 0) return fallback;

    return result;
  } catch {
    // Network error, invalid token, etc. — site keeps working
    return fallback;
  }
}
