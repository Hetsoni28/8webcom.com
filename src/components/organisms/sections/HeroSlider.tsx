'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroSlide } from '@/types';
import { cn } from '@/lib/utils';
import { EASE_OUT } from '@/lib/animations';
import { CtaLink } from '@/components/atoms/CtaLink';

export interface HeroSliderProps {
  slides: HeroSlide[];
  /** Page H1 shown at the top of the hero (Sanity: Homepage → Hero → H1) */
  h1: string;
  /** Trust numbers card (Sanity: Homepage → Hero → Trust numbers) */
  trustMetrics: { value: string; label: string }[];
}

interface SlideItem {
  id: string | number;
  category: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
}

const SLIDE_DURATION = 7; // seconds

export function HeroSlider({ slides, h1, trustMetrics }: HeroSliderProps) {
  // Content comes from Sanity (Hero Slides); only guard against blank fields
  const activeSlides: SlideItem[] = slides.map((s, i) => ({
    id: s.id ?? i + 1,
    title: s.title || "Web Solutions",
    category: s.category || "",
    description: s.description || "",
    image: s.image,
    ctaLabel: s.ctaLabel || "Get Started Now",
    ctaHref: s.ctaHref || "/contacts",
  }));

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Images after the first are only mounted once needed — keeps first load light
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1]));
  const totalSlides = activeSlides.length;

  const goTo = useCallback(
    (i: number) => {
      const next = (i + totalSlides) % totalSlides;
      setActiveSlide(next);
      setLoaded((prev) => {
        const n = (next + 1) % totalSlides;
        if (prev.has(next) && prev.has(n)) return prev;
        return new Set([...prev, next, n]);
      });
    },
    [totalSlides]
  );

  const nextSlide = useCallback(() => goTo(activeSlide + 1), [goTo, activeSlide]);
  const prevSlide = useCallback(() => goTo(activeSlide - 1), [goTo, activeSlide]);

  // Swipe (touch + pen + mouse drag)
  const pointerStart = useRef<number | null>(null);

  // Parallax as the hero scrolls away
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const frameScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const current = activeSlides[activeSlide];
  const titleWords = current.title.split(' ');

  return (
    <section
      id="hero-slider-track"
      role="region"
      aria-roledescription="carousel"
      aria-label="Services Hero Carousel"
      className="relative bg-white px-2.5 sm:px-4 pt-25 sm:pt-29.5 lg:pt-32.5 pb-2.5 sm:pb-4"
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeSlide + 1} of {totalSlides}: {current.title}. {current.description}
      </div>

      <motion.div
        ref={frameRef}
        style={{ scale: frameScale }}
        tabIndex={-1}
        className="relative flex min-h-[max(600px,calc(100svh-112px))] sm:min-h-[max(600px,calc(100svh-134px))] lg:min-h-[min(920px,max(600px,calc(100svh-146px)))] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#12161C] outline-none origin-top touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') prevSlide();
          if (e.key === 'ArrowRight') nextSlide();
        }}
        onPointerDown={(e) => {
          pointerStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (pointerStart.current === null) return;
          const dx = e.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(dx) > 60) (dx < 0 ? nextSlide : prevSlide)();
        }}
      >
        {/* ── Background: all loaded slides stay mounted and crossfade ── */}
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          {activeSlides.map((slide, i) => {
            if (!loaded.has(i)) return null;
            const isActive = i === activeSlide;
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={cn(
                  'absolute inset-0 transition-opacity duration-1400 ease-out-expo',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
              >
                <div
                  className="absolute inset-0"
                  style={isActive ? { animation: `heroKenBurns ${SLIDE_DURATION + 1.5}s linear both` } : undefined}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.title} services by 8webcom.com in Ahmedabad`}
                    fill
                    loading={i === 0 ? 'eager' : undefined}
                    fetchPriority={i === 0 ? 'high' : 'low'}
                    sizes="100vw"
                    quality={75}
                    className="object-cover object-right lg:object-center"
                  />
                </div>
              </div>
            );
          })}
          <div className="absolute inset-0 bg-linear-to-r from-[#12161C] via-[#12161C]/75 to-[#12161C]/5" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#12161C] via-[#12161C]/50 to-transparent" />
        </motion.div>

        {/* ── Trust metrics card (desktop) ── */}
        <motion.dl
          className="hidden lg:flex absolute top-8 right-8 z-10 flex-col gap-4 rounded-2xl bg-[#12161C]/60 backdrop-blur-md border border-white/10 px-6 py-5"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: EASE_OUT }}
        >
          {trustMetrics.map((m, i) => (
            <div key={m.label} className={cn('flex items-baseline justify-between gap-8', i > 0 && 'pt-4 border-t border-white/10')}>
              <dt className="text-white/75 text-[13px] font-medium order-2">{m.label}</dt>
              <dd className="text-white text-lg font-bold tracking-tight order-1">{m.value}</dd>
            </div>
          ))}
        </motion.dl>

        {/* ── Content ── */}
        <motion.div
          className="relative z-10 w-full flex flex-col px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8 pb-6 sm:pb-8"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          {/* Page H1 (primary keyword). In the same column as the slide text, so
              the two can never overlap on short screens. */}
          <h1
            className="hero-fade flex items-center gap-2.5 text-white/80 text-[11px] sm:text-[13px] font-semibold uppercase tracking-[0.16em] leading-snug lg:max-w-[calc(100%-22rem)]"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F58220] shrink-0" aria-hidden="true" />
            {h1}
          </h1>

          {/* Spacer pushes the slide content to the bottom of the frame */}
          <div className="flex-1 min-h-10" aria-hidden="true" />

          {/* Keyed by slide: remount replays the CSS intro (works before hydration) */}
          <div key={current.id} className="max-w-190 mb-10 lg:mb-14">
            <div className="hero-fade flex items-center gap-3 mb-6" style={{ animationDelay: '0.05s' }}>
              <span className="h-px w-10 bg-[#0799B3]" aria-hidden="true" />
              <span className="text-[#0799B3] text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em]">
                {current.category}
              </span>
            </div>

            <h2 className="flex flex-wrap gap-x-[0.24em] text-[44px] sm:text-6xl lg:text-[84px] xl:text-[96px] font-extrabold text-white tracking-[-0.04em] leading-none mb-7">
              {titleWords.map((word, i) => (
                <span key={`${word}-${i}`} className="block overflow-hidden pb-[0.08em] mb-[-0.08em]">
                  <span className="hero-word" style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <p
              className="hero-fade text-gray-300 text-base sm:text-lg lg:text-[19px] leading-[1.7] mb-9 max-w-145"
              style={{ animationDelay: '0.3s' }}
            >
              {current.description}
            </p>

            <div className="hero-fade flex flex-wrap items-center gap-3 sm:gap-4" style={{ animationDelay: '0.42s' }}>
              <CtaLink href={current.ctaHref || '/contacts'} size="lg">
                {current.ctaLabel || 'Get Started Now'}
              </CtaLink>
              <CtaLink href="/contacts" size="lg" variant="outline-light" icon={false}>
                Contact Us
              </CtaLink>
            </div>
          </div>

          {/* ── Service tabs: every slide visible at a glance, active one drives autoplay ── */}
          {totalSlides > 1 && (
            <div className="grid gap-3 sm:gap-6 border-t border-white/10" style={{ gridTemplateColumns: `repeat(${totalSlides}, minmax(0, 1fr))` }} role="tablist" aria-label="Slide indicators">
              {activeSlides.map((slide, index) => {
                const isActive = index === activeSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => goTo(index)}
                    className="group relative text-left pt-5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-sm"
                  >
                    {/* Progress line */}
                    <span className="absolute -top-px left-0 right-0 h-0.5 overflow-hidden" aria-hidden="true">
                      {isActive && (
                        <span
                          key={`progress-${activeSlide}`}
                          className="absolute inset-0 bg-[#0799B3] origin-left"
                          style={{
                            animation: `heroProgress ${SLIDE_DURATION}s linear forwards`,
                            animationPlayState: isPaused ? 'paused' : 'running',
                          }}
                          onAnimationEnd={nextSlide}
                        />
                      )}
                      {!isActive && (
                        <span className="absolute inset-0 bg-white/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out-expo" />
                      )}
                    </span>
                    <span className={cn('block text-[11px] sm:text-xs font-semibold tabular-nums mb-1 transition-colors duration-300', isActive ? 'text-[#0799B3]' : 'text-white/40')}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={cn('block text-[13px] sm:text-base font-semibold tracking-tight truncate transition-colors duration-300', isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80')}>
                      {slide.title}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
