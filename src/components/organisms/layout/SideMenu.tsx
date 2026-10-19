'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X, MapPin, Phone, Mail } from 'lucide-react';
import { WhatsAppIcon, getSocialIcon } from '@/components/atoms/SocialIcons';
import { Logo } from '@/components/atoms/Logo';
import { Text } from '@/components/atoms/Text';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';

export interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Brand hover colours; links themselves come from Site Settings
const HOVER_BG: Record<string, string> = {
  Facebook: 'hover:bg-[#1877F2]',
  Instagram: 'hover:bg-[#E4405F]',
  WhatsApp: 'hover:bg-[#25D366]',
  LinkedIn: 'hover:bg-[#0A66C2]',
  YouTube: 'hover:bg-[#CD201F]',
  X: 'hover:bg-[#000000]',
  Pinterest: 'hover:bg-[#E60023]',
};

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { contact, header, socialLinks } = useSiteSettings();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  // Keyboard trap, Escape key listener, and Body scroll lock
  React.useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      const trigger = document.getElementById('main-menu-trigger');
      trigger?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/70 z-50 transition-opacity backdrop-blur-sm",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        id="side-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Agency Overview and Contact Details"
        className={cn(
          "fixed top-0 right-0 bottom-0 h-[100dvh] w-full max-w-sm bg-[#11161B] z-50 flex flex-col border-l border-white/10 transition-transform duration-500 ease-in-out shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-7 flex items-center justify-between border-b border-white/10">
          <Logo width={140} />
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 hover:rotate-90 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]"
            aria-label="Close menu drawer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-7 space-y-9">
          
          {/* About Us */}
          <div className="space-y-3">
            <h4 className="text-white text-lg font-black tracking-tight">About Us</h4>
            <Text color="muted" className="leading-relaxed text-sm text-gray-400">
              {header.sideMenuText}
            </Text>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h4 className="text-white text-lg font-black tracking-tight">Contact Info</h4>
            <div className="space-y-4">
              
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <MapPin className="text-[#0799B3] shrink-0 mt-1" size={18} />
                <a 
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm leading-relaxed hover:text-[#0799B3] transition-colors"
                >
                  {contact.address}
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3.5">
                <Phone className="text-[#0799B3] shrink-0" size={18} />
                <a 
                  href={`tel:${contact.phoneTel}`} 
                  className="text-gray-400 text-sm hover:text-[#0799B3] transition-colors"
                >
                  {contact.phone}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5">
                <Mail className="text-[#0799B3] shrink-0" size={18} />
                <a 
                  href={`mailto:${contact.email}`} 
                  className="text-gray-400 text-sm hover:text-[#0799B3] transition-colors"
                >
                  {contact.email}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3.5">
                <WhatsAppIcon className="text-[#25D366] shrink-0" size={18} />
                <a 
                  href={contact.whatsappUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 text-sm hover:text-[#25D366] transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* Follow Us with Real Social Icons */}
          <div className="space-y-3.5 pt-2">
            <h4 className="text-white text-lg font-black tracking-tight">Follow Us</h4>
            <div className="flex items-center gap-2.5 flex-wrap">
              {socialLinks.map((s) => {
                const Icon = getSocialIcon(s.platform);
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className={`w-9 h-9 rounded-full border border-white/20 text-gray-300 hover:text-white ${HOVER_BG[s.platform] ?? 'hover:bg-[#0799B3]'} hover:border-transparent flex items-center justify-center transition-all duration-300 shadow-sm`}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
