'use client';

import React from 'react';
import Link from 'next/link';
import { trackPointer } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Heading } from '@/components/atoms/Heading';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  Printer, 
  FileText, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface PolicySection {
  title: string;
  content: string;
}

interface PolicyData {
  heading: string;
  lastUpdated: string;
  intro: string;
  sections: readonly PolicySection[] | PolicySection[];
}

interface PolicyPageContentProps {
  policy: PolicyData;
  activeSlug: 'disclaimer-policy' | 'refund-and-cancellation-policy' | 'privacy-policy';
  badgeLabel: string;
}

const POLICY_TABS = [
  { slug: 'disclaimer-policy', label: 'Disclaimer Policy', href: '/disclaimer-policy' },
  { slug: 'refund-and-cancellation-policy', label: 'Refund & Cancellation', href: '/refund-and-cancellation-policy' },
  { slug: 'privacy-policy', label: 'Privacy Policy', href: '/privacy-policy' },
];

function SectionCard({ section, index }: { section: PolicySection; index: number }) {
  const formattedNum = String(index + 1).padStart(2, '0');

  return (
    <div id={`section-${index}`} className="scroll-mt-36">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      // Each card reveals on its own scroll entry, so keep the stagger tiny
      transition={{ duration: 0.8, delay: Math.min(index, 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
      onMouseMove={trackPointer}
      className="group relative bg-white p-7 sm:p-9 lg:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0799B3]/35 transition-all duration-500 overflow-hidden"
    >
      {/* Interactive mouse spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(350px circle at var(--mx) var(--my), rgba(7, 153, 179, 0.08), transparent 80%)',
        }}
      />

      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#0799B3]/5 to-transparent rounded-bl-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-9 px-3 rounded-xl bg-[#0799B3]/10 text-[#0799B3] text-xs font-extrabold flex items-center justify-center shrink-0 border border-[#0799B3]/20 shadow-xs">
            {index + 1}.)
          </span>
          <Heading as="h3" size="md" className="group-hover:text-[#0799B3] transition-colors duration-300">
            {section.title}
          </Heading>
        </div>

        <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line pl-0 sm:pl-12">
          {section.content}
        </p>
      </div>
    </motion.div>
    </div>
  );
}

export function PolicyPageContent({ policy, activeSlug, badgeLabel }: PolicyPageContentProps) {
  const { contact } = useSiteSettings();
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50/60 relative overflow-hidden">
      {/* Floating ambient background glows */}

      <div className="container-site relative z-10">

        {/* ── Policy Switcher Navigation Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 p-2.5 sm:p-3 bg-white rounded-2xl border border-gray-200/80 shadow-sm mb-12"
        >
          <nav aria-label="Policy document switcher" className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {POLICY_TABS.map((tab) => {
              const isActive = tab.slug === activeSlug;
              return (
                <Link
                  key={tab.slug}
                  href={tab.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] ${
                    isActive
                      ? 'bg-[#0799B3] text-white shadow-md shadow-[#0799B3]/25'
                      : 'text-gray-600 hover:text-[#0799B3] hover:bg-gray-100/80'
                  }`}
                >
                  {tab.label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden sm:flex items-center gap-3 pr-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0799B3] transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              Print Document
            </button>
          </div>
        </motion.div>

        {/* ── Main 2-Column Grid (Sticky Sidebar + Policy Cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── Sticky Left Sidebar (TOC & Details) ── */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6"
            >
              <div>
                <Badge variant="primary" label={badgeLabel} className="mb-3" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2429] mb-2 leading-tight">
                  {policy.heading}
                </h2>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mt-2">
                  <Clock className="w-3.5 h-3.5 text-[#0799B3]" aria-hidden="true" />
                  <span>Last Updated: {policy.lastUpdated}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">
                  Quick Navigation
                </span>
                <nav aria-label="Table of contents" className="space-y-1.5">
                  {policy.sections.map((sec, idx) => (
                    <button
                      key={sec.title}
                      type="button"
                      aria-label={`Jump to section ${idx + 1}: ${sec.title}`}
                      onClick={() => {
                        const el = document.getElementById(`section-${idx}`);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className="group flex w-full items-center justify-between p-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-[#0799B3] hover:bg-[#0799B3]/5 transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]"
                    >
                      <span className="truncate pr-2">
                        {idx + 1}.) {sec.title}
                      </span>
                      <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-[#0799B3] group-hover:translate-x-0.5 transition-all shrink-0" aria-hidden="true" />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Jurisdiction Badge */}
              <div className="pt-4 border-t border-gray-100">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#0799B3] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-[#1F2429]">Governing Law</p>
                    <p className="text-gray-500 mt-0.5 leading-relaxed">
                      Governed in accordance with the laws of India. Jurisdiction in Ahmedabad, Gujarat.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-[#1F2429] to-[#0B131D] p-6 sm:p-7 rounded-3xl text-white shadow-xl space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#0799B3]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Questions on this policy?</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  Our compliance and client management team in Ahmedabad is ready to assist you directly.
                </p>
              </div>
              <div className="pt-2 space-y-2 text-xs">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-[#0799B3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded px-1"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0799B3]" aria-hidden="true" />
                  <span>{contact.email}</span>
                </a>
                <a
                  href={`tel:${contact.phoneTel}`}
                  className="flex items-center gap-2 text-gray-300 hover:text-[#0799B3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded px-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F58220]" aria-hidden="true" />
                  <span>{contact.phone}</span>
                </a>
              </div>
              <div className="pt-2">
                <Button
                  href="/contacts"
                  variant="primary"
                  size="sm"
                  className="w-full justify-center !rounded-xl text-xs py-2.5"
                >
                  Contact Us Directly
                </Button>
              </div>
            </motion.div>
          </div>

          {/* ── Right Content Column (Intro + Policy Cards) ── */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Lead Intro Box */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-[#0799B3]" />
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0799B3]/10 text-[#0799B3] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0799B3] block mb-1">
                    Official Overview
                  </span>
                  <p className="text-[#1F2429] text-base sm:text-lg leading-relaxed font-normal">
                    {policy.intro}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* List of Policy Sections with Spring Stagger and Spotlight */}
            <div className="space-y-6">
              {policy.sections.map((section, index) => (
                <SectionCard key={section.title} section={section} index={index} />
              ))}
            </div>

            {/* Bottom Closing Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border border-gray-100 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500"
            >
              <div>
                <p className="font-semibold text-[#1F2429]">
                  8webcom.com &bull; Sun Gravitas, Satellite, Ahmedabad
                </p>
                <p className="mt-0.5">
                  For privacy queries or cancellation notices, please write to {contact.email}.
                </p>
              </div>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-1 font-bold text-[#0799B3] hover:underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded px-1"
              >
                <span>Support Center</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
