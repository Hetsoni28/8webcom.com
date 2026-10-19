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
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // Compact after 20px; slide away while scrolling down, return on any scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 480);
        lastY = y;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHidden = hidden && !mobileMenuOpen && !sideMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 border-b",
          "transition-[transform,padding,background-color,box-shadow,border-color] duration-500 ease-out-expo",
          isHidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "py-3 sm:py-3.5 bg-white/90 backdrop-blur-xl backdrop-saturate-150 border-gray-200/70 shadow-[0_8px_30px_-12px_rgba(31,36,41,0.12)]"
            : "py-5 sm:py-6 lg:py-7 bg-white border-gray-100"
        )}
      >
        <div className="w-full max-w-370 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          
          {/* Prominent Company Logo */}
          <div className="shrink-0 flex items-center">
            <Logo 
              src="/assets/img/logo.png" 
              width={220} 
              height={80} 
              priority
              className={cn(
                "w-auto transition-[height] duration-500 ease-out-expo",
                scrolled ? "h-12 sm:h-14 lg:h-14.5" : "h-14 sm:h-16 lg:h-17"
              )}
            />
          </div>

          {/* Desktop Nav with Generous Spacing */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-10" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <NavItem 
                key={link.label}
                label={link.label}
                href={link.href}
                subLinks={link.children}
              />
            ))}
          </nav>

          {/* Right Actions: Large CTA Button + Hamburger Menu */}
          <div className="flex items-center gap-4 sm:gap-5">
            
            {/* Get In Touch Pill Button */}
            <Link
              href="/contacts"
              className="group hidden xs-390:inline-flex items-center gap-3 bg-[#0799B3] hover:bg-[#068aa1] text-white font-semibold text-[15px] h-12 pl-6 pr-2 rounded-full transition-colors duration-300 shadow-[0_8px_24px_-8px_rgba(7,153,179,0.55)] active:scale-[0.97] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
            >
              <span>Get In Touch</span>
              <span aria-hidden="true" className="relative w-8 h-8 rounded-full bg-white/15 inline-flex items-center justify-center overflow-hidden">
                <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-5 group-hover:-translate-y-5" />
                <ArrowUpRight className="w-4 h-4 absolute -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
              </span>
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
              className="p-3 text-[#1F2429] hover:text-[#0799B3] hover:bg-gray-100 rounded-2xl transition-all cursor-pointer flex items-center justify-center shrink-0 min-w-12 min-h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
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
