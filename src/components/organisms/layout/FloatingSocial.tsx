'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { SocialLink } from '@/components/molecules/SocialLink';
import { getSocialIcon } from '@/components/atoms/SocialIcons';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';

// Brand background per platform; which platforms show is set in Sanity
// (Site Settings → Social media → "Show in floating side bar").
const BRAND_BG: Record<string, string> = {
  WhatsApp: 'bg-[#25D366]!',
  Instagram: 'bg-linear-to-tr! from-[#f09433] via-[#dc2743] to-[#bc1888]',
  Facebook: 'bg-[#1877F2]!',
  LinkedIn: 'bg-[#0A66C2]!',
  X: 'bg-black!',
  YouTube: 'bg-[#CD201F]!',
  Pinterest: 'bg-[#E60023]!',
};

export function FloatingSocial() {
  const { socialLinks } = useSiteSettings();
  const [isVisible, setIsVisible] = useState(false);
  const items = socialLinks.filter((s) => s.showInSidebar !== false);

  useEffect(() => {
    // setState with the same boolean is a no-op render, so this only
    // re-renders when the 300px threshold is crossed
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (items.length === 0) return null;

  return (
    <aside
      aria-label="Quick social contacts"
      className={cn(
        'fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col transition-all duration-300',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      {items.map((s, i) => (
        <SocialLink
          key={s.platform}
          platform={s.platform}
          href={s.url}
          icon={getSocialIcon(s.platform)}
          variant="floating"
          className={cn(
            BRAND_BG[s.platform] ?? 'bg-[#0799B3]!',
            'border-white! rounded-none! rounded-l-md! w-12! h-12! hover:opacity-90!',
            i < items.length - 1 && 'border-b-0'
          )}
        />
      ))}
    </aside>
  );
}
