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
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
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

// ─── Image with curtain reveal + parallax ─────────────────────────────────────
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
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);

  // On mobile/reduced motion: simple fade-in instead of clip-path (clip-path fails off-screen on mobile)
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
      className={cn('relative overflow-hidden rounded-2xl bg-gray-100', className)}
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT }}
    >
      <motion.div className="absolute inset-y-[-14%] inset-x-0" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 1.1, delay, ease: EASE_OUT }}
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
    <section className="relative bg-white py-24 lg:py-36" id="about-sec" aria-label="About 8webcom.com">
      <div className="container-site">
        {/* ── Row 1: heading + scroll-highlighted statement ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col">
            <Eyebrow label={subTitle} />
            <h2 className="mt-5 font-extrabold text-[#1F2429] tracking-[-0.04em] leading-[0.95] text-[52px] sm:text-[72px] lg:text-[84px] xl:text-[100px] wrap-break-word">
              <MaskedWords text={heading} />
            </h2>

            <motion.div
              className="mt-10 flex items-center gap-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
            >
              <span className="text-[56px] lg:text-[72px] font-extrabold tracking-[-0.04em] leading-none text-[#F58220]">
                {experienceYears}
              </span>
              <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-gray-500 leading-snug max-w-28">
                {experienceText}
              </span>
            </motion.div>
          </div>

          <div className="lg:col-span-7 lg:pt-12">
            <ScrollHighlightText
              text={description || FALLBACK_DESCRIPTION}
              className="text-[22px] sm:text-[27px] lg:text-[32px] font-semibold leading-[1.42] tracking-[-0.02em] text-[#1F2429]"
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            >
              <CtaLink href={ctaHref}>{ctaLabel}</CtaLink>
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="group inline-flex items-center gap-3 text-[#1F2429] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-full"
              >
                <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#0799B3] transition-colors duration-300 group-hover:bg-[#0799B3] group-hover:border-[#0799B3] group-hover:text-white">
                  <Phone className="w-4.5 h-4.5" aria-hidden="true" />
                </span>
                <span className="font-semibold text-[15px] sm:text-base transition-colors duration-300 group-hover:text-[#0799B3]">
                  {phone}
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Row 2: asymmetric image strip, each layer at its own speed ── */}
        {/* Mobile (< 640 px): all images full-width stacked                     */}
        {/* Small (640–768 px): large image full-width, two small split 50/50    */}
        {/* Medium (768 px +): original asymmetric 6 / 3 / 3 column layout       */}
        <div className="mt-20 lg:mt-28 grid grid-cols-12 gap-3 sm:gap-5 items-end">
          <RevealImage
            src={img1}
            alt={img1Alt}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="col-span-12 md:col-span-6 aspect-video sm:aspect-16/11 min-h-[220px]"
            parallax={30}
          />
          <RevealImage
            src={img2}
            alt={img2Alt}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            className="col-span-12 sm:col-span-6 md:col-span-3 aspect-video sm:aspect-3/4 min-h-[180px]"
            delay={0.12}
            parallax={55}
          />
          <RevealImage
            src={img3}
            alt={img3Alt}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
            className="col-span-12 sm:col-span-6 md:col-span-3 aspect-video sm:aspect-square min-h-[180px]"
            delay={0.24}
            parallax={20}
          />
        </div>

        {/* ── Row 3: capabilities ── */}
        {features.length > 0 && (
          <ul className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {features.map((f, i) => (
              <motion.li
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: i * 0.1, ease: EASE_OUT }}
                className="group relative pt-8 border-t border-gray-200"
              >
                {/* Accent rule draws over the hairline on hover */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out-expo"
                  style={{ background: ICON_BG[i % ICON_BG.length] }}
                />
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-500 ease-out-expo group-hover:-translate-y-1"
                    style={{ background: ICON_BG[i % ICON_BG.length] }}
                  >
                    <Image src={f.icon} alt="" width={24} height={24} className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-[#1F2429] tracking-tight leading-snug mb-2.5">{f.title}</h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">{f.description}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
