import { PageShell } from '@/components/templates/PageShell';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { SiteSettingsProvider } from '@/components/providers/SiteSettingsProvider';
import { getSiteSettings } from '@/sanity/content';

/**
 * Site layout — wraps all public-facing pages with the site chrome:
 * Header, Footer, SmoothScroll, FloatingSocial, ScrollToTop.
 * Site Settings (menu, footer, contact, socials) come from Sanity.
 * The studio route lives outside this group and gets none of this.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <SiteSettingsProvider value={settings}>
      <SmoothScrollProvider>
        <PageShell settings={settings}>{children}</PageShell>
      </SmoothScrollProvider>
    </SiteSettingsProvider>
  );
}
