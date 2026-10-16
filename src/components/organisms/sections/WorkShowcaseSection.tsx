'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export interface CaseStudyItem {
  id: number;
  title: string;
  category: string;
  image: string;
  url: string;
}

export interface WorkShowcaseSectionProps {
  subTitle?: string;
  heading?: string;
  items?: CaseStudyItem[];
}

export function WorkShowcaseSection({
  subTitle = 'Case Studies',
  heading = 'Let’s See Our Work Showcase',
  items = [],
}: WorkShowcaseSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);

  const total = items.length;

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isFocused, total, nextSlide]);

  if (total === 0) return null;

  // Visible window offsets: -2, -1, 0, 1, 2
  const visibleOffsets = [-2, -1, 0, 1, 2];

  const getSlideOffset = (offset: number) => {
    if (windowWidth < 640) return offset * 130;
    if (windowWidth < 1024) return offset * 210;
    return offset * 310;
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Case Studies Carousel"
      className="py-20 lg:py-32 scroll-mt-28 bg-gradient-to-b from-white via-[#F8FAFB] to-white relative overflow-hidden"
      id="case-studies-sec"
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
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Case study {activeIndex + 1} of {total}: {items[activeIndex]?.title} ({items[activeIndex]?.category})
      </div>
      {/* Background Accent Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#0799B3]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section Matching Reference Design */}
        <div className="title-area text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#0799B3] animate-pulse" />
            <span className="text-[#0799B3] text-base sm:text-lg font-bold tracking-normal uppercase">
              {subTitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[52px] font-black text-[#1F2429] tracking-tight leading-[1.15] max-w-3xl mx-auto"
          >
            {heading}
          </motion.h2>
        </div>

        {/* 3D Coverflow Container with Swipe Gestures */}
        <motion.div
          onPanEnd={(_, info) => {
            if (info.offset.x > 40) {
              prevSlide();
            } else if (info.offset.x < -40) {
              nextSlide();
            }
          }}
          className="relative h-[480px] sm:h-[540px] md:h-[580px] w-full flex items-center justify-center [perspective:1400px] cursor-grab active:cursor-grabbing"
        >
          <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
            {visibleOffsets.map((offset) => {
              const slideIndex = (activeIndex + offset + total) % total;
              const item = items[slideIndex];
              const isCenter = offset === 0;

              // 3D coverflow styling calculation
              const absOffset = Math.abs(offset);
              const rotateY = offset === 0 ? 0 : offset < 0 ? 25 : -25;
              const scale = 1 - absOffset * 0.12;
              const opacity = 1 - absOffset * 0.22;
              const zIndex = 30 - absOffset * 10;
              const translateX = getSlideOffset(offset);

              return (
                <motion.div
                  key={`${item.id}-${offset}`}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(slideIndex);
                    }
                  }}
                  animate={{
                    x: translateX,
                    rotateY,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 140,
                    damping: 20,
                  }}
                  className={`absolute top-1/2 -translate-y-1/2 w-[310px] sm:w-[380px] md:w-[440px] lg:w-[480px] h-[400px] sm:h-[460px] md:h-[510px] rounded-[24px] sm:rounded-[28px] overflow-hidden cursor-pointer transition-shadow duration-500 ${
                    isCenter
                      ? 'shadow-[0_25px_60px_rgba(0,0,0,0.22)] ring-1 ring-black/10'
                      : 'shadow-[0_15px_35px_rgba(0,0,0,0.12)] filter brightness-95'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                >
                  {/* Card Background / Image */}
                  <div className="relative w-full h-full bg-[#181C20] overflow-hidden group">
                    <ImageWithSkeleton
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 320px, 480px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      skeletonClassName="bg-gray-800"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Hover Info Banner on Center Card */}
                    {isCenter && (
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col justify-end text-white z-20">
                        <span className="text-[#0799B3] text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                          {item.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black mb-3 text-white leading-tight">
                          {item.title}
                        </h3>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Visit ${item.title} website (opens in new tab)`}
                          className="inline-flex items-center gap-2 bg-[#0799B3] hover:bg-white hover:text-[#1F2429] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 w-fit shadow-lg group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Navigation Controls: Centered Circular Arrow Buttons Matching Screenshot */}
        <div className="flex items-center justify-center gap-5 mt-10 lg:mt-14">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous case study"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#0799B3] hover:text-white hover:border-[#0799B3] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>

          {/* Slide Indicator Badge */}
          <div className="text-sm font-bold text-gray-500 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100" aria-label={`Showing slide ${activeIndex + 1} of ${total}`}>
            <span className="text-[#0799B3] font-black">{String(activeIndex + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next case study"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border border-gray-200 bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#0799B3] hover:text-white hover:border-[#0799B3] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
          >
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
}
