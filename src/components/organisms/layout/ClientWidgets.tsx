'use client';

/**
 * ClientWidgets — wraps floating UI elements that must not ship in the SSR bundle.
 *
 * Next.js App Router requires `ssr: false` dynamic imports to live inside a
 * Client Component ('use client'). PageShell.tsx is a Server Component, so we
 * extract the two scroll-aware widgets here.
 */

import dynamic from 'next/dynamic';

const FloatingSocial = dynamic(
  () => import('@/components/organisms/layout/FloatingSocial').then((m) => m.FloatingSocial),
  { ssr: false }
);

const ScrollToTop = dynamic(
  () => import('@/components/organisms/layout/ScrollToTop').then((m) => m.ScrollToTop),
  { ssr: false }
);

export function ClientWidgets() {
  return (
    <>
      <FloatingSocial />
      <ScrollToTop />
    </>
  );
}
