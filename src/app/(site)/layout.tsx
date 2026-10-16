import { PageShell } from '@/components/templates/PageShell';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

/**
 * Site layout — wraps all public-facing pages with the site chrome:
 * Header, Footer, SmoothScroll, FloatingSocial, ScrollToTop.
 * The studio route lives outside this group and gets none of this.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageShell>{children}</PageShell>
    </SmoothScrollProvider>
  );
}
