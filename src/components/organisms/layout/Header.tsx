'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/atoms/Logo';
import { NavItem } from '@/components/molecules/NavItem';
import { NAV_LINKS } from '@/lib/constants';

const MobileMenu = dynamic(
  () => import('./MobileMenu').then((mod) => mod.MobileMenu),
  { ssr: false }
);

const SideMenu = dynamic(
  () => import('./SideMenu').then((mod) => mod.SideMenu),
  { ssr: false }
);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300",
          scrolled 
            ? "py-3.5 sm:py-4 lg:py-4.5 border-b border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]" 
            : "py-5 sm:py-6 lg:py-7 border-b border-gray-100/90 shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
        )}
      >
        <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          
          {/* Prominent Company Logo */}
          <div className="shrink-0 flex items-center">
            <Logo 
              src="/assets/img/logo.png" 
              width={220} 
              height={80} 
              priority
              className="h-14 sm:h-16 lg:h-[68px] w-auto" 
            />
          </div>

          {/* Desktop Nav with Generous Spacing */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-10" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <NavItem 
                key={link.label}
                label={link.label}
                href={link.href}
                children={link.children}
              />
            ))}
          </nav>

          {/* Right Actions: Large CTA Button + Hamburger Menu */}
          <div className="flex items-center gap-4 sm:gap-5">
            
            {/* Get In Touch Pill Button */}
            <Link 
              href="/contacts"
              className="group inline-flex items-center gap-2 bg-[#0799B3] hover:bg-[#06859c] text-white font-bold text-[15px] sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>

            {/* Menu Drawer Toggle */}
            <button 
              id="main-menu-trigger"
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                  setMobileMenuOpen(true);
                } else {
                  setSideMenuOpen(true);
                }
              }}
              className="p-3 text-[#1F2429] hover:text-[#0799B3] hover:bg-gray-100 rounded-2xl transition-all cursor-pointer flex items-center justify-center shrink-0 min-w-[48px] min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen || sideMenuOpen}
              aria-controls={mobileMenuOpen ? "mobile-drawer" : sideMenuOpen ? "side-drawer" : undefined}
            >
              <svg 
                width="26" 
                height="26" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

        </div>
      </header>

      {/* Responsive Drawers */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
      
      <SideMenu 
        isOpen={sideMenuOpen} 
        onClose={() => setSideMenuOpen(false)} 
      />
    </>
  );
}
