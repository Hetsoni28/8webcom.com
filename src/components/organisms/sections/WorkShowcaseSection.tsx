'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, animate, useMotionValue, useReducedMotion, PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT } from '@/lib/animations';

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

const GAP = 24;
const AUTOPLAY_MS = 4500;
const SPRING = { type: 'spring' as const, stiffness: 220, damping: 32, mass: 0.9 };

export function WorkShowcaseSection({
  subTitle = 'Case Studies',
  heading = 'Let’s See Our Work Showcase',
  items = [],
}: WorkShowcaseSectionProps) {
  const total = items.length;
  const prefersReducedMotion = useReducedMotion();

  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Measure card width + how many fit, so the track never over-scrolls
  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const card = cardRef.current;
      if (!vp || !card) return;
      const s = card.offsetWidth + GAP;
      const visible = Math.max(1, Math.floor((vp.offsetWidth + GAP) / s));
      setStep(s);
      setMaxIndex(Math.max(0, total - visible));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [total]);

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.min(Math.max(i, 0), maxIndex);
      setIndex(clamped);
      animate(x, -clamped * step, SPRING);
    },
    [maxIndex, step, x]
  );

  // Index can exceed maxIndex after a resize; clamp it on read
  const current = Math.min(index, maxIndex);

  // Keep the track position correct after resize
  useEffect(() => {
    x.set(-current * step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, maxIndex]);

  const next = useCallback(() => goTo(current >= maxIndex ? 0 : current + 1), [goTo, current, maxIndex]);
  const prev = useCallback(() => goTo(current <= 0 ? maxIndex : current - 1), [goTo, current, maxIndex]);

  // Autoplay
  useEffect(() => {
    if (isPaused || prefersReducedMotion || maxIndex === 0) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [isPaused, prefersReducedMotion, maxIndex, next]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (!step) return;
    const projected = -x.get() - info.velocity.x * 0.2;
    goTo(Math.round(projected / step));
    // Let the click that ends a drag be ignored
    setTimeout(() => {
      isDragging.current = false;
    }, 0);
  };

  if (total === 0) return null;

  const progress = maxIndex > 0 ? (current + 1) / (maxIndex + 1) : 1;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Case Studies Carousel"
      className="py-24 lg:py-32 scroll-mt-28 bg-white overflow-hidden"
      id="case-studies-sec"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
      }}
    >
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing case study {current + 1} of {total}: {items[current]?.title}
      </div>

      <div className="container-site">
        <SectionHeader
          eyebrow={subTitle}
          title={heading}
          className="mb-12 lg:mb-14"
          aside={
            <div className="flex items-center gap-5">
              <div className="font-semibold tabular-nums text-sm text-gray-400" aria-hidden="true">
                <span className="text-[#1F2429] text-base">{String(current + 1).padStart(2, '0')}</span>
                {' / '}
                {String(maxIndex + 1).padStart(2, '0')}
              </div>
              <div className="flex items-center gap-2.5">
                {[
                  { label: 'Previous case study', onClick: prev, Icon: ArrowLeft },
                  { label: 'Next case study', onClick: next, Icon: ArrowRight },
                ].map(({ label, onClick, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={onClick}
                    aria-label={label}
                    className="w-12 h-12 rounded-full border border-gray-200 bg-white text-[#1F2429] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#1F2429] hover:border-[#1F2429] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
                  >
                    <Icon className="w-4.5 h-4.5" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          }
        />

        {/* Track viewport — overflow visible on the right so the next card peeks */}
        <motion.div
          ref={viewportRef}
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          <motion.ul
            className="flex cursor-grab active:cursor-grabbing touch-pan-y"
            style={{ x, gap: GAP }}
            drag="x"
            dragConstraints={{ left: -maxIndex * step, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={handleDragEnd}
          >
            {items.map((item, i) => (
              <li
                key={item.id}
                ref={i === 0 ? cardRef : undefined}
                className="shrink-0 w-[78vw] sm:w-90 lg:w-98"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={(e) => {
                    if (isDragging.current) e.preventDefault();
                  }}
                  aria-label={`Visit ${item.title} website (opens in new tab)`}
                  className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-4 rounded-2xl"
                >
                  <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-[#F1F4F6] border border-gray-200/80">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 78vw, 392px"
                      className="object-cover object-top transition-[object-position,transform] duration-3500 ease-in-out group-hover:object-bottom"
                    />
                    <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-[#1F2429] flex items-center justify-center shadow-md opacity-0 translate-y-2 transition-[opacity,transform] duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4.5 h-4.5" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="pt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span className="block text-[12px] font-bold uppercase tracking-[0.16em] text-[#0799B3] mb-1.5">
                        {item.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1F2429] tracking-tight leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <span className="shrink-0 mt-6 text-[13px] font-semibold text-gray-500 transition-colors duration-300 group-hover:text-[#0799B3]">
                      Visit Website
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Progress rail */}
        <div className="mt-12 h-px w-full bg-gray-200 relative overflow-hidden" aria-hidden="true">
          <motion.span
            className="absolute inset-y-0 left-0 w-full bg-[#1F2429] origin-left"
            animate={{ scaleX: progress }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          />
        </div>
      </div>
    </section>
  );
}
