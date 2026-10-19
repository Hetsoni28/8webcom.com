'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { SocialLink } from '@/components/molecules/SocialLink';
import { 
  WhatsAppIcon, 
  InstagramIcon, 
  FacebookIcon, 
  LinkedInIcon, 
  XIcon 
} from '@/components/atoms/SocialIcons';
import { CONTACT } from '@/lib/constants';

export function FloatingSocial() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // setState with the same boolean is a no-op render, so this only
    // re-renders when the 300px threshold is crossed
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside 
      aria-label="Quick social contacts"
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col transition-all duration-300",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
    >
      <SocialLink platform="WhatsApp" href={CONTACT.whatsapp} icon={WhatsAppIcon} variant="floating" className="bg-[#25D366]! border-white! rounded-none! rounded-l-md! w-12! h-12! border-b-0 hover:opacity-90!" />
      <SocialLink platform="Instagram" href="https://www.instagram.com/8webcom/" icon={InstagramIcon} variant="floating" className="bg-linear-to-tr! from-[#f09433] via-[#dc2743] to-[#bc1888] border-white! rounded-none! rounded-l-md! w-12! h-12! border-b-0 hover:opacity-90!" />
      <SocialLink platform="Facebook" href="https://www.facebook.com/8webcom" icon={FacebookIcon} variant="floating" className="bg-[#1877F2]! border-white! rounded-none! rounded-l-md! w-12! h-12! border-b-0 hover:opacity-90!" />
      <SocialLink platform="LinkedIn" href="https://www.linkedin.com/company/8webcom" icon={LinkedInIcon} variant="floating" className="bg-[#0A66C2]! border-white! rounded-none! rounded-l-md! w-12! h-12! border-b-0 hover:opacity-90!" />
      <SocialLink platform="X" href="https://x.com/coo8webcom" icon={XIcon} variant="floating" className="bg-black! border-white! rounded-none! rounded-l-md! w-12! h-12! hover:opacity-90!" />
    </aside>
  );
}
