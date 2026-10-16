'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, Quote, CheckCircle2, Building2 } from 'lucide-react';
import { StarRating } from '@/components/atoms/StarRating';
import { Testimonial } from '@/types';

export interface TestimonialsProps {
  heading?: string;
  subTitle?: string;
  testimonials?: Testimonial[];
}

export function Testimonials({
  heading = 'Loved by Founders. Trusted by Industry Leaders.',
  subTitle = 'Client Feedback',
  testimonials = [],
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const total = testimonials.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay with pause on hover or keyboard focus
  useEffect(() => {
    if (isPaused || isFocused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isFocused, total, nextSlide]);

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
      className="py-24 lg:py-36 relative overflow-hidden bg-[#FAFCFD]"
      id="testi-sec"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Screen Reader Live Region */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Review {activeIndex + 1} of {total}: &ldquo;{current.review}&rdquo; by {current.name}, {current.company}
      </div>
      {/* ── Atmospheric Ambient Lighting (Clean Agency Aesthetic) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0799B3]/5 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F58220]/5 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        
        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0799B3]/10 border border-[#0799B3]/20 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0799B3] animate-pulse" />
            <span className="text-[#0799B3] text-xs font-bold tracking-widest uppercase">
              {subTitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-black text-[#1F2429] tracking-tight leading-[1.12]"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Real feedback from verified businesses, founders, and healthcare leaders across India and worldwide.
          </motion.p>
        </div>

        {/* ── Featured Spotlight Bento Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Trust Metrics Scorecard (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Overall Rating Box */}
            <div className="relative rounded-3xl p-8 bg-white border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0799B3]/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase block mb-1">
                Client Satisfaction
              </span>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-[#1F2429] tracking-tight">5.0</span>
                <span className="text-gray-400 font-bold text-lg">/ 5.0</span>
              </div>

              {/* Gold Stars */}
              <StarRating rating={5} className="mb-4" />

              <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div className="flex items-center gap-2.5 text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#0799B3] shrink-0" />
                  <span>2,000+ Businesses Served Since 2011</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Real & Verified Client Quotes</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
                  <span>10+ Countries Global Clientele</span>
                </div>
              </div>
            </div>

            {/* Quick Switch Client List */}
            <div className="rounded-3xl p-6 bg-white border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] flex flex-col justify-between flex-1">
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase block mb-3">
                Featured Reviews ({total})
              </span>
              <div className="flex flex-col gap-2" role="tablist" aria-label="Client review list">
                {testimonials.slice(0, 4).map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`testi-tab-${item.id}`}
                    aria-selected={idx === activeIndex}
                    aria-controls="active-testimonial-panel"
                    onClick={() => {
                      setIsPaused(true);
                      setActiveIndex(idx);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 ${
                      idx === activeIndex
                        ? 'bg-[#0799B3] text-white shadow-md shadow-[#0799B3]/25'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          idx === activeIndex
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-[#0799B3]'
                        }`}
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-sm truncate">{item.name}</div>
                        <div
                          className={`text-xs truncate ${
                            idx === activeIndex ? 'text-white/80' : 'text-gray-400'
                          }`}
                        >
                          {item.company}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-bold ml-2 shrink-0 ${
                        idx === activeIndex ? 'text-amber-200' : 'text-[#F58220]'
                      }`}
                    >
                      ★ 5.0
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Active Spotlight Card (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div 
              id="active-testimonial-panel"
              role="tabpanel"
              aria-labelledby={`testi-tab-${current.id}`}
              className="relative h-full rounded-3xl p-8 sm:p-12 lg:p-14 bg-white border border-gray-100 shadow-[0_15px_45px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden"
            >
              
              {/* Decorative Gradient Top Stroke */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0799B3] via-[#F58220] to-[#0799B3]" />

              {/* Giant Subtle Quote Watermark */}
              <Quote className="absolute -bottom-6 -right-6 w-44 h-44 text-gray-50 pointer-events-none" />

              {/* Card Header Meta */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <StarRating rating={current.rating || 5} />
                  <span className="text-xs font-black text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                    5.0 RATED
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Client</span>
                </div>
              </div>

              {/* Active Review Quote */}
              <div className="flex-1 flex items-center mb-10 relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-[#1F2429] text-xl sm:text-2xl lg:text-[24px] font-medium leading-[1.65] italic">
                      &ldquo;{current.review}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Card Footer: Author + Controls */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                
                {/* Author Info */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0799B3] to-[#20C5E0] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#0799B3]/20">
                      {initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#1F2429] leading-tight">
                        {current.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#0799B3] mt-0.5 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{current.company}</span>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Arrow Controls & Dots */}
                <div className="flex items-center gap-4">
                  <div className="flex gap-1 items-center" role="tablist" aria-label="Review pagination">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setIsPaused(true);
                          setActiveIndex(idx);
                        }}
                        aria-label={`Jump to review ${idx + 1}`}
                        aria-selected={idx === activeIndex}
                        className="py-2 px-1 min-h-[36px] flex items-center justify-center cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]"
                      >
                        <span
                          className={`block h-2 rounded-full transition-all duration-300 ${
                            idx === activeIndex
                              ? 'w-8 bg-[#0799B3]'
                              : 'w-2 bg-gray-200 hover:bg-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPaused(true);
                        prevSlide();
                      }}
                      aria-label="Previous review"
                      className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-[#0799B3] hover:text-white hover:border-[#0799B3] flex items-center justify-center text-gray-700 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
                    >
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsPaused(true);
                        nextSlide();
                      }}
                      aria-label="Next review"
                      className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-[#0799B3] hover:text-white hover:border-[#0799B3] flex items-center justify-center text-gray-700 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
                    >
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
