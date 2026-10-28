'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import { StarRating } from '@/components/atoms/StarRating';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Testimonial } from '@/types';

export interface TestimonialsProps {
  description?: string;
  heading?: string;
  subTitle?: string;
  testimonials?: Testimonial[];
}

const TRUST_POINTS = [
  { text: '2,000+ Businesses Served Since 2011', color: 'text-[#0799B3]' },
  { text: '100% Real & Verified Client Quotes', color: 'text-emerald-600' },
  { text: '10+ Countries Global Clientele', color: 'text-[#F58220]' },
];

export function Testimonials({
  heading = 'Loved by Founders. Trusted by Industry Leaders.',
  subTitle = 'Client Feedback',
  testimonials = [],
  description = 'Real feedback from verified businesses, founders, and healthcare leaders across India and worldwide.',
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay; restarts the 7s window after every change so manual picks get full reading time
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setTimeout(nextSlide, 7000);
    return () => clearTimeout(timer);
  }, [isPaused, total, nextSlide, activeIndex]);

  if (total === 0) return null;

  const current = testimonials[activeIndex];
  const initials = current.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Client Testimonials Carousel"
      className="py-24 lg:py-32 bg-white"
      id="testi-sec"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false);
      }}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Review {activeIndex + 1} of {total}: &ldquo;{current.review}&rdquo; by {current.name}, {current.company}
      </div>

      <div className="container-site">
        <SectionHeader
          eyebrow={subTitle}
          title={heading}
          description={description}
          align="center"
          className="mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* ── Left: scorecard + client list ── */}
          <motion.div
            className="lg:col-span-4 flex flex-col gap-5 lg:gap-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <div className="rounded-2xl p-7 sm:p-8 bg-[#F6F8F9] border border-gray-200/70">
              <span className="text-xs font-bold text-gray-500 tracking-[0.16em] uppercase block mb-3">
                Client Satisfaction
              </span>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-extrabold text-[#1F2429] tracking-tight">5.0</span>
                <span className="text-gray-400 font-semibold text-lg">/ 5.0</span>
              </div>
              <StarRating rating={5} className="mb-6" />
              <ul className="space-y-3 pt-6 border-t border-gray-200 text-[14.5px]">
                {TRUST_POINTS.map((p) => (
                  <li key={p.text} className="flex items-center gap-2.5 text-gray-700 font-medium">
                    <CheckCircle2 className={cn('w-4 h-4 shrink-0', p.color)} aria-hidden="true" />
                    <span>{p.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl p-3 bg-white border border-gray-200/70 flex-1">
              <span className="text-xs font-bold text-gray-500 tracking-[0.16em] uppercase block px-3 pt-3 pb-2">
                Featured Reviews ({total})
              </span>
              <div className="flex flex-col" role="tablist" aria-label="Client review list">
                {testimonials.slice(0, 4).map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      id={`testi-tab-${item.id}`}
                      aria-selected={isActive}
                      aria-controls="active-testimonial-panel"
                      onClick={() => setActiveIndex(idx)}
                      className={cn(
                        'relative flex items-center justify-between p-3 rounded-xl text-left cursor-pointer transition-colors duration-300',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]',
                        isActive ? 'bg-[#0799B3]/[0.07]' : 'hover:bg-gray-50'
                      )}
                    >
                      {/* CSS-only active bar: a layoutId slide forced a layout read on every autoplay tick */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute left-0 top-3 bottom-3 w-0.75 rounded-full bg-[#0799B3] origin-center transition-[transform,opacity] duration-500 ease-out-expo',
                          isActive ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                        )}
                      />
                      <div className="flex items-center gap-3 min-w-0 pl-1.5">
                        <span
                          className={cn(
                            'w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors duration-300',
                            isActive ? 'bg-[#078097] text-white' : 'bg-gray-100 text-[#078097]'
                          )}
                        >
                          {item.name.charAt(0)}
                        </span>
                        <div className="truncate">
                          <div className={cn('font-semibold text-sm truncate', isActive ? 'text-[#1F2429]' : 'text-gray-700')}>
                            {item.name}
                          </div>
                          <div className="text-xs truncate text-gray-500">{item.company}</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold ml-2 shrink-0 text-[#F58220]">★ 5.0</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ── Right: active review ── */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1, delay: 0.12, ease: EASE_OUT }}
          >
            <div
              id="active-testimonial-panel"
              role="tabpanel"
              aria-labelledby={`testi-tab-${current.id}`}
              className="relative h-full min-h-110 rounded-2xl p-8 sm:p-12 lg:p-14 bg-[#1F2429] text-white flex flex-col overflow-hidden"
            >
              {/* Quote glyph */}
              <svg
                aria-hidden="true"
                viewBox="0 0 48 36"
                className="w-12 h-9 text-[#0799B3] mb-8 shrink-0"
                fill="currentColor"
              >
                <path d="M0 36V22.2C0 9.6 6.4 2.2 19.2 0l1.9 4.6C14.5 6.6 11 10.8 10.6 17.2H19V36H0Zm27 0V22.2C27 9.6 33.4 2.2 46.2 0L48 4.6c-6.6 2-10.1 6.2-10.5 12.6H46V36H27Z" />
              </svg>

              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <StarRating rating={current.rating || 5} />
                  <span className="text-[11px] font-bold tracking-wider text-white/70 bg-white/10 px-2.5 py-1 rounded-full">
                    5.0 RATED
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Verified Client
                </span>
              </div>

              <div className="flex-1 flex items-start mb-10">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={current.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    className="text-xl sm:text-2xl lg:text-[26px] font-medium leading-[1.55] tracking-[-0.01em] text-white/95"
                  >
                    &ldquo;{current.review}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.45, ease: EASE_OUT }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-14 h-14 rounded-full bg-[#078097] text-white font-bold text-lg flex items-center justify-center">
                      {initials}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{current.name}</h3>
                      <p className="text-sm font-medium text-white/60 mt-1 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{current.company}</span>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-5">
                  <div className="flex gap-1 items-center" role="tablist" aria-label="Review pagination">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        role="tab"
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Jump to review ${idx + 1}`}
                        aria-selected={idx === activeIndex}
                        className="py-3 px-0.5 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]"
                      >
                        <span
                          className={cn(
                            'block h-0.75 rounded-full transition-all duration-500 ease-out-expo',
                            idx === activeIndex ? 'w-7 bg-[#0799B3]' : 'w-3 bg-white/20 hover:bg-white/40'
                          )}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {[
                      { label: 'Previous review', onClick: prevSlide, Icon: ArrowLeft },
                      { label: 'Next review', onClick: nextSlide, Icon: ArrowRight },
                    ].map(({ label, onClick, Icon }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={onClick}
                        aria-label={label}
                        className="w-11 h-11 rounded-full border border-white/15 text-white flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-white hover:text-[#1F2429] hover:border-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2429]"
                      >
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
