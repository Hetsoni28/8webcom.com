'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { HeroSlide } from '@/types';
import { cn } from '@/lib/utils';

export interface HeroSliderProps {
  slides?: HeroSlide[];
}

interface SlideItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

const AUTHENTIC_SLIDES: SlideItem[] = [
  {
    id: 1,
    category: "Custom Web Solutions",
    title: "Web Designing",
    description:
      "Innovative design is not just a job for us, it is a passion. Our designers and engineers build high-performance web portals and business applications tailored for scalable growth.",
    image: "https://www.8webcom.com/admin/upload/slider/SpdOZhUD.webp",
    ctaLabel: "Get Started Now",
    ctaHref: "/services/web-development",
  },
  {
    id: 2,
    category: "Data-Driven ROI",
    title: "Digital Marketing",
    description:
      "No longer is the success of our businesses completely reliant on word-of-mouth. We engineer search engine strategies, targeted campaigns, and conversion funnels that drive real revenue.",
    image: "https://www.8webcom.com/admin/upload/slider/fQUwhTia.webp",
    ctaLabel: "Get Started Now",
    ctaHref: "/services/digital-marketing",
  },
  {
    id: 3,
    category: "Enterprise Automation",
    title: "CRM Solutions",
    description:
      "Centralize customer relationships, automate complex sales pipelines, and eliminate manual bottlenecks with custom enterprise CRM software and seamless business portals.",
    image: "https://www.8webcom.com/admin/upload/slider/50r7Jsdf.webp",
    ctaLabel: "Get Started Now",
    ctaHref: "/services/crm-solutions",
  },
];

export function HeroSlider({ slides }: HeroSliderProps) {
  const activeSlides = slides && slides.length > 0 ? slides.map((s, i) => ({
    ...s,
    id: s.id || i + 1,
    title: s.title || AUTHENTIC_SLIDES[i]?.title || "Web Solutions",
    category: s.category || AUTHENTIC_SLIDES[i]?.category || "Digital Solutions",
    description: s.description || AUTHENTIC_SLIDES[i]?.description || "",
    image: s.image || AUTHENTIC_SLIDES[i]?.image || AUTHENTIC_SLIDES[0].image,
    ctaLabel: s.ctaLabel || AUTHENTIC_SLIDES[i]?.ctaLabel || "Get Started Now",
    ctaHref: s.ctaHref || AUTHENTIC_SLIDES[i]?.ctaHref || "/services",
  })) : AUTHENTIC_SLIDES;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const totalSlides = activeSlides.length;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // 6-second auto transition, pauses on hover or focus
  useEffect(() => {
    if (isHovered || isFocused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered, isFocused, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const current = activeSlides[activeSlide];

  return (
    <section 
      id="hero-slider-track"
      role="region"
      aria-roledescription="carousel"
      aria-label="Services Hero Carousel"
      className="relative w-full h-[660px] sm:h-[720px] lg:h-[800px] bg-[#12161C] overflow-hidden select-text"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
    >
      {/* Screen Reader Live Announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeSlide + 1} of {totalSlides}: {current.title}. {current.description}
      </div>
      {/* ── Background Slide Image & Cinematic Left Dark Gradient ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ willChange: 'opacity' }}
          className="absolute inset-0 z-0"
        >
          {/* Authentic 8webcom 3D Banner Asset */}
          <ImageWithSkeleton
            src={current.image}
            alt={current.title}
            fill
            priority={activeSlide === 0}
            sizes="100vw"
            className="object-cover object-right lg:object-center transform scale-100"
            skeletonClassName="bg-gray-900"
          />

          {/* Deep Agency Gradient Overlay: ensures 100% text legibility without obscuring the 3D art */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#12161C] via-[#12161C]/85 to-transparent w-full lg:w-4/5" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide Content Container (Padded so text NEVER collides with side arrows) ── */}
      <div className="relative z-10 h-full w-full max-w-[1440px] mx-auto px-6 sm:px-20 lg:px-28 xl:px-36 flex items-center">
        <div className="max-w-2xl text-left pt-16 sm:pt-20">
          
          {/* Category Tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cat-${activeSlide}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-block text-[#0799B3] text-xs sm:text-sm font-bold uppercase tracking-wider mb-4"
            >
              {current.category}
            </motion.div>
          </AnimatePresence>

          {/* Bold, Clean Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${activeSlide}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-[62px] font-black text-white tracking-tight leading-[1.08] mb-6"
            >
              {current.title}
            </motion.h1>
          </AnimatePresence>

          {/* Clear, Authoritative Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeSlide}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
              className="text-gray-200 text-base sm:text-lg lg:text-[19px] leading-relaxed mb-9 max-w-xl font-normal"
            >
              {current.description}
            </motion.p>
          </AnimatePresence>

          {/* Action Button Row */}
          <motion.div
            key={`actions-${activeSlide}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10"
          >
            {/* Primary Pill Button */}
            <Link
              href={current.ctaHref || "/contacts"}
              className="inline-flex items-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#0799B3] hover:bg-[#06859c] text-white text-[15px] sm:text-base font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group"
            >
              <span>{current.ctaLabel || "Get Started Now"}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Secondary Action */}
            <Link
              href="/contacts"
              className="inline-flex items-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-[15px] sm:text-base font-semibold border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-200 active:scale-95"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Authentic Agency Trust Metrics */}
          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-300 font-medium">
            <div>
              <span className="text-white font-bold text-sm sm:text-base">10+ Years</span> Experience
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div>
              <span className="text-white font-bold text-sm sm:text-base">1,500+</span> Projects Delivered
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30 hidden sm:block" />
            <div>
              <span className="text-white font-bold text-sm sm:text-base">2,000+</span> Happy Clients
            </div>
          </div>

        </div>
      </div>

      {/* ── Navigation Arrows (Safely in Gutters — NEVER Overlap Text) ── */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            className="hidden sm:flex absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-[#0799B3] text-white/90 hover:text-white border border-white/20 hover:border-[#0799B3] backdrop-blur-sm items-center justify-center transition-all duration-200 cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12161C]"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="hidden sm:flex absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-[#0799B3] text-white/90 hover:text-white border border-white/20 hover:border-[#0799B3] backdrop-blur-sm items-center justify-center transition-all duration-200 cursor-pointer shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12161C]"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </>
      )}

      {/* ── Progress Indicators (Accessible Touch Targets + Filling Bars) ── */}
      {totalSlides > 1 && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3" role="tablist" aria-label="Slide indicators">
          {activeSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              className="py-3 px-1 min-h-[40px] flex items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12161C] rounded-full"
              aria-label={`Go to slide ${index + 1}: ${activeSlides[index].title}`}
              aria-current={index === activeSlide ? "true" : undefined}
            >
              <span className="relative block w-12 sm:w-16 h-1.5 rounded-full bg-white/30 overflow-hidden">
                {index === activeSlide && !isHovered && !isFocused && (
                  <motion.span
                    className="absolute inset-y-0 left-0 bg-[#0799B3]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }}
                  />
                )}
                {index === activeSlide && (isHovered || isFocused) && (
                  <span className="block w-full h-full bg-[#0799B3]" />
                )}
                {index !== activeSlide && (
                  <span className="block w-0 group-hover:w-full h-full bg-white/60 transition-all duration-200" />
                )}
              </span>
            </button>
          ))}
        </div>
      )}

    </section>
  );
}
