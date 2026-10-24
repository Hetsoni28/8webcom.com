'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Phone } from 'lucide-react';
import { AboutImage, AboutFeature as AboutFeatureType } from '@/types';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';
import { Eyebrow, MaskedWords } from '@/components/molecules/SectionHeader';
import { CtaLink } from '@/components/atoms/CtaLink';
import { cn } from '@/lib/utils';

const ICON_BG = ['#0799B3', '#F58220', '#1F2429'];

// ─── Scroll-linked word highlight ─────────────────────────────────────────────
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // Grey → dark rather than transparent → solid: every word stays readable
  // (gray-500 is 4.8:1 on white, passes WCAG AA) — the old 0.16 opacity failed
  // Lighthouse/Google's contrast check.
  const color = useTransform(progress, range, ['#6B7280', '#1F2429']);
  return (
    <>
      <motion.span style={{ color }}>{children}</motion.span>{' '}
    </>
  );
}

function ScrollHighlightText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });

  if (reduce) return <p className={className}>{text}</p>;

  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

// ─── Image with fade-in reveal + optional parallax ────────────────────────────
// Uses opacity/scale (not clip-path) — works reliably on all mobile browsers.
function RevealImage({
  src,
  alt,
  className,
  sizes,
  delay = 0,
  parallax = 40,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  delay?: number;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Reduce parallax strength on mobile (parallax effect can feel jarring on small screens)
  const y = useTransform(scrollYProgress, [0, 1], [parallax * 0.5, -parallax * 0.5]);

  // Reduced-motion or SSR: render immediately, no animation
  if (reduce) {
    return (
      <div ref={ref} className={cn('relative overflow-hidden rounded-2xl bg-gray-100', className)}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('reveal-media relative overflow-hidden rounded-2xl bg-gray-100', className)}
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      // margin: fire as soon as the element enters the viewport bottom edge
      viewport={{ once: true, margin: '0px 0px -20px 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE_OUT }}
    >
      <motion.div className="reveal-media absolute inset-y-[-12%] inset-x-0" style={{ y }}>
        <motion.div
          className="reveal-media absolute inset-0"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -20px 0px' }}
          transition={{ duration: 1.05, delay, ease: EASE_OUT }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export interface AboutSectionProps {
  heading?: string;
  subTitle?: string;
  description?: string;
  experienceYears?: string;
  experienceText?: string;
  images?: AboutImage[];
  features?: AboutFeatureType[];
  ctaLabel?: string;
  ctaHref?: string;
  phone?: string;
}

const FALLBACK_DESCRIPTION =
  'Welcome to 8webcom.com. 8webcom started its journey in 2011 delivering business websites and related services. Since then we grew delivering end to end business solutions across the globe expanding in the areas of Web Portals, Enterprise Software, Digital Marketing, CRM, E-Commerce and consulting. With more than 2000 businesses locally and internationally trust us since more than a decade.';

export function AboutSection({
  heading = '8WEBCOM.COM',
  subTitle = 'About Us',
  description,
  experienceYears = '15+',
  experienceText = 'Years of Excel',
  images = [],
  features = [],
  ctaLabel = 'Discover Our Story',
  ctaHref = '/about-us',
  phone = '+91 97277 00459',
}: AboutSectionProps) {
  const img1 = images[0]?.src ?? '/assets/img/about/ab_12_1.webp';
  const img1Alt = images[0]?.alt ?? 'About 8webcom - Digital Strategy';
  const img2 = images[1]?.src ?? '/assets/img/about/ab_12_2.webp';
  const img2Alt = images[1]?.alt ?? 'About 8webcom - Tech Innovation';
  const img3 = images[2]?.src ?? '/assets/img/about/ab_12_3.webp';
  const img3Alt = images[2]?.alt ?? 'About 8webcom - Business Growth';

  return (
    <section
      className="relative bg-white py-16 sm:py-20 lg:py-28 xl:py-36"
      id="about-sec"
      aria-label="About 8webcom.com"
    >
      <div className="container-site">

        {/* ══════════════════════════════════════════════════════════════════
            Row 1 — Heading column (left) + Description column (right)
            xs:   single column, stacked
            sm:   single column, wider text
            lg:   two columns side-by-side (5 / 7 grid)
        ══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">

          {/* ── Left: eyebrow + giant heading + years counter ── */}
          <div className="lg:col-span-5 flex flex-col">
            <Eyebrow label={subTitle} />

            {/* Fluid heading: 40 px on xs → 72 px sm → 84 px lg → 100 px xl */}
            <h2 className="mt-4 sm:mt-5 font-extrabold text-[#1F2429] tracking-[-0.04em] leading-[0.95] text-[40px] xs:text-[48px] sm:text-[64px] md:text-[72px] lg:text-[84px] xl:text-[100px] break-words">
              <MaskedWords text={heading} />
            </h2>

            {/* Years counter — shrinks slightly on xs */}
            <motion.div
              className="mt-8 sm:mt-10 flex items-center gap-4 sm:gap-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
            >
              <span className="text-[48px] sm:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-none text-[#F58220]">
                {experienceYears}
              </span>
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-gray-500 leading-snug max-w-[7rem]">
                {experienceText}
              </span>
            </motion.div>
          </div>

          {/* ── Right: scroll-highlight body + CTA row ── */}
          <div className="lg:col-span-7 lg:pt-12">
            <ScrollHighlightText
              text={description || FALLBACK_DESCRIPTION}
              className="text-[17px] xs:text-[19px] sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[32px] font-semibold leading-[1.45] tracking-[-0.02em] text-[#1F2429]"
            />

            {/* CTA + phone — stack vertically on xs, row on sm+ */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="mt-8 sm:mt-10 flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-4 xs:gap-x-8 xs:gap-y-5"
            >
              <CtaLink href={ctaHref}>
                {ctaLabel}
                {/^(read|learn|know|view|discover).*more|^more$/i.test(ctaLabel.trim()) && (
                  <span className="sr-only"> about {heading}</span>
                )}
              </CtaLink>

              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="group inline-flex items-center gap-3 text-[#1F2429] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-full"
                aria-label={`Call us at ${phone}`}
              >
                <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#0799B3] transition-colors duration-300 group-hover:bg-[#0799B3] group-hover:border-[#0799B3] group-hover:text-white shrink-0">
                  <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" aria-hidden="true" />
                </span>
                <span className="font-semibold text-[14px] sm:text-[15px] md:text-base transition-colors duration-300 group-hover:text-[#0799B3]">
                  {phone}
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            Row 2 — Image strip
            xs  (< 480 px):  all 3 images full-width, stacked
            sm  (480–767px): img1 full-width; img2 + img3 side-by-side 50/50
            md  (768–1023px): img1 full-width; img2 + img3 side-by-side 50/50
            lg  (1024 px +):  asymmetric 6 / 3 / 3 column layout
        ══════════════════════════════════════════════════════════════════ */}
        <div className="mt-14 sm:mt-20 lg:mt-28 grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-end">

          {/* Image 1 — large hero image */}
          <RevealImage
            src={img1}
            alt={img1Alt}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              'col-span-12 lg:col-span-6',
              'h-[240px] xs:h-[280px] sm:h-[320px] md:h-[360px] lg:h-auto lg:aspect-[16/11]',
            )}
            parallax={30}
          />

          {/* Image 2 — tall portrait */}
          <RevealImage
            src={img2}
            alt={img2Alt}
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'col-span-12 sm:col-span-6 lg:col-span-3',
              'h-[200px] xs:h-[240px] sm:h-[280px] md:h-[320px] lg:h-auto lg:aspect-[3/4]',
            )}
            delay={0.12}
            parallax={45}
          />

          {/* Image 3 — square */}
          <RevealImage
            src={img3}
            alt={img3Alt}
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'col-span-12 sm:col-span-6 lg:col-span-3',
              'h-[200px] xs:h-[240px] sm:h-[280px] md:h-[280px] lg:h-auto lg:aspect-square',
            )}
            delay={0.24}
            parallax={20}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            Row 3 — Capabilities / feature cards
            xs:  1 column
            sm:  2 columns
            lg:  3 columns
        ══════════════════════════════════════════════════════════════════ */}
        {features.length > 0 && (
          <ul className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-12">
            {features.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_OUT }}
                className="group relative pt-7 sm:pt-8 border-t border-gray-200"
              >
                {/* Accent rule draws over the hairline on hover */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out-expo"
                  style={{ background: ICON_BG[i % ICON_BG.length] }}
                />
                <div className="flex items-center justify-between mb-5 sm:mb-6">
                  <span
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
                    style={{ background: ICON_BG[i % ICON_BG.length] }}
                  >
                    <Image src={f.icon} alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#1F2429] tracking-tight leading-snug mb-2 sm:mb-2.5">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed">{f.description}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
