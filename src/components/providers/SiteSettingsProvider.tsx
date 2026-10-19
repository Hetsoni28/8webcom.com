'use client';

import { createContext, useContext } from 'react';
import type { ResolvedSiteSettings } from '@/sanity/content';

// Site Settings from Sanity (header, footer, contact, socials, stats), fetched once
// on the server in the (site) layout and shared with every client component.
const SiteSettingsContext = createContext<ResolvedSiteSettings | null>(null);

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: ResolvedSiteSettings;
  children: React.ReactNode;
}) {
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): ResolvedSiteSettings {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error('useSiteSettings must be used inside <SiteSettingsProvider>');
  return ctx;
}
