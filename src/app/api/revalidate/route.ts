import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { SANITY_TAG } from '@/sanity/content';

/**
 * POST /api/revalidate — called by a Sanity webhook on every publish so edits
 * appear on the live site within seconds (instead of waiting for the 60s cache).
 *
 * Sanity → Manage → API → Webhooks → Create:
 *   URL:     https://www.8webcom.com/api/revalidate/   (trailing slash: next.config trailingSlash)
 *   Trigger: Create, Update, Delete   ·   Dataset: production
 *   Secret:  same value as SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ ok: false, error: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });
  }

  // Third argument waits for Sanity's CDN to have the new data before we refresh
  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
  if (!isValidSignature) {
    return Response.json({ ok: false, error: 'Invalid signature' }, { status: 401 });
  }

  // { expire: 0 }: the next visitor gets fresh content, never the stale copy
  revalidateTag(SANITY_TAG, { expire: 0 });
  return Response.json({ ok: true, type: body?._type ?? null });
}
