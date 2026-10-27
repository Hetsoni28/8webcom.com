'use client';

import { useSyncExternalStore } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SEO } from '@/lib/seo';

// Only the real domain reports to Google Analytics, so preview (vercel.app),
// localhost and PageSpeed runs on the preview never mix into the client's numbers.
const isProductionHost = (host: string) => host === '8webcom.com' || host.endsWith('.8webcom.com');

const subscribe = () => () => {};

/**
 * Google Analytics 4 (same property as the previous site, so history continues).
 * Loaded by @next/third-parties after the page is interactive. Page views on
 * client-side navigation are tracked by GA4's enhanced measurement (history changes).
 */
export function Analytics() {
  const enabled = useSyncExternalStore(subscribe, () => isProductionHost(location.hostname), () => false);
  return enabled ? <GoogleAnalytics gaId={SEO.googleAnalyticsId} /> : null;
}

type Gtag = (command: 'event', name: string, params?: Record<string, string | number>) => void;

/** Send a GA4 event; does nothing where Analytics is not loaded (preview / localhost). */
export function trackEvent(name: string, params?: Record<string, string | number>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.('event', name, params);
}
