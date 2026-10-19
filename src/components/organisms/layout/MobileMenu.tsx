'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Logo } from '@/components/atoms/Logo';
import { NAV_LINKS, CONTACT } from '@/lib/constants';
import { SocialLink } from '@/components/molecules/SocialLink';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const toggleAccordion = (label: string) => {
    setActiveAccordion(prev => prev === label ? null : label);
  };

  // Keyboard trap, Escape key listener, and Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
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
      // Return focus to trigger button
      const trigger = document.getElementById('main-menu-trigger');
      trigger?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={cn(
          "fixed top-0 right-0 bottom-0 h-dvh w-[85vw] max-w-sm bg-white z-50 flex flex-col transition-transform duration-300 lg:hidden shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Logo width={120} />
          <button 
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close mobile navigation menu"
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors min-w-11 min-h-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="flex flex-col px-4 space-y-2" aria-label="Mobile Navigation Links">
            {NAV_LINKS.map((link) => {
              const panelId = `mobile-acc-panel-${link.label.toLowerCase().replace(/\s+/g, '-')}`;
              const buttonId = `mobile-acc-btn-${link.label.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <div key={link.label}>
                  {link.children ? (
                    <div className="space-y-1">
                      <button 
                        id={buttonId}
                        type="button"
                        onClick={() => toggleAccordion(link.label)}
                        aria-expanded={activeAccordion === link.label}
                        aria-controls={panelId}
                        className="w-full flex items-center justify-between py-3 px-2 font-semibold text-[#1F2429] border-b border-gray-50 rounded-lg hover:text-[#0799B3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] transition-colors"
                      >
                        <span>{link.label}</span>
                        {activeAccordion === link.label ? (
                          <ChevronUp className="w-5 h-5 text-[#0799B3]" aria-hidden="true" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        )}
                      </button>
                      <div 
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          activeAccordion === link.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="flex flex-col pl-4 py-2 space-y-3 bg-gray-50 rounded-lg mt-2">
                          {link.children.map(child => (
                            <Link 
                              key={child.label} 
                              href={child.href}
                              className="text-sm text-gray-600 hover:text-[#0799B3] py-1 px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]"
                              onClick={onClose}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      href={link.href}
                      className="block py-3 px-2 font-semibold text-[#1F2429] border-b border-gray-50 hover:text-[#0799B3] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100">
          <h4 className="font-semibold text-sm mb-4 text-[#1F2429]">Follow Us</h4>
          <div className="flex items-center gap-2.5 flex-wrap">
            <SocialLink platform="Facebook" href="https://www.facebook.com/8webcom" variant="colored" />
            <SocialLink platform="Instagram" href="https://www.instagram.com/8webcom/" variant="colored" />
            <SocialLink platform="WhatsApp" href={CONTACT.whatsapp} variant="colored" />
            <SocialLink platform="LinkedIn" href="https://www.linkedin.com/company/8webcom" variant="colored" />
            <SocialLink platform="YouTube" href="https://www.youtube.com/@8webcom" variant="colored" />
            <SocialLink platform="X" href="https://x.com/coo8webcom" variant="colored" />
            <SocialLink platform="Pinterest" href="https://in.pinterest.com/8webcom/" variant="colored" />
          </div>
        </div>
      </div>
    </>
  );
}
