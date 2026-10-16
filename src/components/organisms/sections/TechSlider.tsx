'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { TechCard } from '@/components/molecules/TechCard';
import { TechPlatform } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface TechSliderProps {
  heading?: string;
  highlight?: string;
  headingSuffix?: string;
  subTitle?: string;
  platforms: TechPlatform[];
}

export function TechSlider({
  heading = 'Superfast, well designed, well researched, website with CMS',
  subTitle = 'What We Offer',
  platforms = [],
}: TechSliderProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);

  // Interaction flag & timer to temporarily pause during drag or arrow clicks
  const isInteracting = useRef(false);
  const isPageScrolling = useRef(false);
  const pageScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const resumeTimer = useRef<NodeJS.Timeout | null>(null);

  // Drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  // Duplicate platforms for seamless continuous infinite loop
  const displayPlatforms = useMemo(() => {
    if (!platforms || platforms.length === 0) return [];
    if (platforms.length < 5) {
      return [...platforms, ...platforms, ...platforms, ...platforms];
    }
    return [...platforms, ...platforms];
  }, [platforms]);

  // ── Intersection Observer: Only run RAF loop when section is visible ──
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Window Scroll Listener: Yield main-thread during vertical scrolling ──
  useEffect(() => {
    const handleWindowScroll = () => {
      isPageScrolling.current = true;
      if (pageScrollTimer.current) clearTimeout(pageScrollTimer.current);
      pageScrollTimer.current = setTimeout(() => {
        isPageScrolling.current = false;
      }, 150);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (pageScrollTimer.current) clearTimeout(pageScrollTimer.current);
    };
  }, []);

  // ── Continuous Auto-Scroll Engine (60 FPS smooth glide on GPU) ──
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || displayPlatforms.length === 0 || !isInView) return;

    // Respect user accessibility preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 40; // Silky 40px/s constant speed

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Only scroll when visible, not hovered, not dragged, and not during active vertical page scroll
      if (!isHovered && !isInteracting.current && !isPageScrolling.current && container) {
        container.scrollLeft += speed * delta;

        // Seamless wrap around
        const halfWidth = container.scrollWidth / 2;
        if (halfWidth > 0) {
          if (container.scrollLeft >= halfWidth) {
            container.scrollLeft -= halfWidth;
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += halfWidth;
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isInView, displayPlatforms]);

  // ── Manual Step Navigation (Arrow Buttons) ──
  const handleManualScroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    // Pause auto-scroll during and right after manual navigation
    isInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    const firstCard = container.querySelector('[data-card-item]') as HTMLElement;
    const cardStep = firstCard ? firstCard.offsetWidth + 24 : 390;
    const halfWidth = container.scrollWidth / 2;

    if (direction === 'left' && container.scrollLeft <= cardStep) {
      container.scrollLeft += halfWidth;
    } else if (direction === 'right' && container.scrollLeft >= halfWidth) {
      container.scrollLeft -= halfWidth;
    }

    const target = direction === 'right'
      ? container.scrollLeft + cardStep
      : container.scrollLeft - cardStep;

    container.scrollTo({
      left: target,
      behavior: 'smooth',
    });

    // Resume auto-scroll smoothly after 3 seconds of inactivity
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
      if (container) {
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth;
        }
      }
    }, 3000);
  }, []);

  // ── Drag & Touch Handlers ──
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    isInteracting.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    startScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
    }
    scrollRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 2500);
  };

  const handleTouchStart = () => {
    isInteracting.current = true;
  };

  const handleTouchEnd = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      isInteracting.current = false;
    }, 2500);
  };

  if (!platforms || platforms.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden bg-[#FAFBFC]"
      id="service-sec"
    >
      {/* ── Soft Ambient Lighting (Clean agency lighting, NO fake AI grids) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0799B3]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#F58220]/4 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
        
        {/* ── Executive Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0799B3]/10 border border-[#0799B3]/20 text-[#0799B3] text-xs font-bold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0799B3] animate-pulse" />
              {subTitle}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1F2429] tracking-tight leading-[1.2]">
              {heading}
            </h2>
          </div>

          {/* ── Sleek Slider Navigation Controls (Clean Left / Right Only) ── */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => handleManualScroll('left')}
              aria-label="Previous platform"
              title="Previous"
              className="w-12 h-12 rounded-2xl border border-gray-200 bg-white hover:bg-[#0799B3] hover:border-[#0799B3] text-[#1F2429] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={() => handleManualScroll('right')}
              aria-label="Next platform"
              title="Next"
              className="w-12 h-12 rounded-2xl border border-gray-200 bg-white hover:bg-[#0799B3] hover:border-[#0799B3] text-[#1F2429] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
            >
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* ── Carousel Track (Only pauses when hovering directly on cards) ── */}
        <div
          ref={scrollRef}
          data-lenis-prevent="true"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseUp();
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex overflow-x-auto gap-6 sm:gap-7 pb-2 pt-1 select-none hide-scrollbar cursor-grab active:cursor-grabbing will-change-scroll"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayPlatforms.map((platform, idx) => (
            <div
              key={`${platform.name}-${idx}`}
              data-card-item
              className="w-[85vw] sm:w-[350px] lg:w-[370px] shrink-0 flex flex-col"
            >
              <TechCard
                name={platform.name}
                image={platform.image}
                icon={platform.icon}
                description={platform.description}
                className="h-full pointer-events-auto"
              />
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
