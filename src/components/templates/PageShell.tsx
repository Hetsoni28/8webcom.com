import React from 'react';
import { Header } from '@/components/organisms/layout/Header';
import { Footer } from '@/components/organisms/layout/Footer';
import { ClientWidgets } from '@/components/organisms/layout/ClientWidgets';

export interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Accessible Skip to Content Link (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-[#0799B3] focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white transition-all"
      >
        Skip to main content
      </a>

      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
      {/* Client-only floating widgets — ssr: false lives inside ClientWidgets */}
      <ClientWidgets />
    </div>
  );
}
