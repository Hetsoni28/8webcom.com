'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useAnimationFrame,
  useMotionValue,
} from 'framer-motion';
import { AboutImage, AboutFeature as AboutFeatureType } from '@/types';


// ─── Feature Card (Glassmorphism) ─────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  description,
  index,
}: AboutFeatureType & { index: number }) {
  const ACCENT_COLORS = [
    { bg: '#0799B3', glow: 'rgba(7,153,179,0.18)' },
    { bg: '#F58220', glow: 'rgba(245,130,32,0.18)' },
    { bg: '#1F2429', glow: 'rgba(31,36,41,0.14)' },
  ];
  const accent = ACCENT_COLORS[index % 3];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group relative flex items-start gap-5 p-5 rounded-2xl cursor-default
        bg-white/60 backdrop-blur-sm border border-gray-100
        shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]
        transition-shadow duration-300"
      style={{
        background: `linear-gradient(135deg, white 70%, ${accent.glow})`,
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-4 -left-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-60 blur-2xl transition-opacity duration-500"
        style={{ background: accent.bg }}
      />

      {/* Icon Badge */}
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
        style={{ background: accent.bg }}
      >
        <Image
          src={icon}
          alt={title}
          width={30}
          height={30}
          className="w-7 h-7"
        />
      </motion.div>

      {/* Text */}
      <div className="relative z-10 min-w-0">
        <h3
          className="text-[16px] lg:text-[18px] font-bold text-[#1F2429] mb-1.5 leading-snug
            group-hover:text-[#0799B3] transition-colors duration-300"
        >
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Right arrow glyph */}
      <span
        className="absolute top-5 right-5 text-gray-200 text-xl font-black leading-none
          group-hover:text-[#0799B3] group-hover:translate-x-1 transition-all duration-300"
      >
        →
      </span>
    </motion.div>
  );
}

// ─── Parallax Image ───────────────────────────────────────────────────────────
function ParallaxImage({
  src,
  alt,
  width,
  height,
  className,
  yFactor = 0.08,
  delay = 0,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  yFactor?: number;
  delay?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [yFactor * 80, -yFactor * 80]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ y, willChange: 'transform' }}
      className={className}
    >
      <ImageWithSkeleton
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
        className="w-full h-auto object-cover"
        wrapperClassName="w-full rounded-2xl overflow-hidden"
      />
    </motion.div>
  );
}

// ─── Experience Badge (Floating on GPU) ───────────────────────────────────────
function FloatingBadge({ years = "15+", text = "Years of Excel" }: { years?: string; text?: string }) {
  return (
    <div
      className="absolute -bottom-4 -right-4 z-30 flex flex-col items-center justify-center
        w-28 h-28 rounded-full
        bg-[#F58220] text-white shadow-2xl border-4 border-white
        animate-bounce-subtle pointer-events-none select-none"
    >
      <span className="text-3xl font-black leading-none">{years}</span>
      <span className="text-[10px] font-bold tracking-widest uppercase text-white/90 mt-0.5 text-center px-2">
        {text}
      </span>
    </div>
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
  const sectionRef = useRef<HTMLDivElement>(null);

  const img1 = images[0]?.src ?? '/assets/img/about/ab_12_1.webp';
  const img1Alt = images[0]?.alt ?? 'About 8webcom - Digital Strategy';
  const img2 = images[1]?.src ?? '/assets/img/about/ab_12_2.webp';
  const img2Alt = images[1]?.alt ?? 'About 8webcom - Tech Innovation';
  const img3 = images[2]?.src ?? '/assets/img/about/ab_12_3.webp';
  const img3Alt = images[2]?.alt ?? 'About 8webcom - Business Growth';


  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8FAFB] py-24 lg:py-36"
      id="about-sec"
      aria-label="About 8webcom.com"
    >
      {/* ── Background Decor ── */}
      {/* ── Background Decor (Clean ambient agency lighting) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Teal blob top-left */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px] bg-[#0799B3]" />
        {/* Orange blob bottom-right */}
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px] bg-[#F58220]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* ═══════════════════════════════════════════════════════
              LEFT COLUMN  – Magazine-style editorial image stack
              ═══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="relative w-full max-w-[520px] mx-auto lg:mx-0">

              {/* Teal vertical accent bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-8 bottom-8 w-[4px] rounded-full bg-gradient-to-b from-[#0799B3] via-[#F58220] to-[#0799B3] origin-top z-20"
              />

              {/* IMAGE 1 – Hero card (top, full-width) */}
              <ParallaxImage
                src={img1}
                alt={img1Alt}
                width={477}
                height={297}
                yFactor={0.06}
                delay={0}
                className="ml-6 overflow-hidden rounded-[28px] shadow-2xl ring-1 ring-black/5"
              />

              {/* IMAGE 2 – Left card overlapping centre */}
              <div className="relative mt-5 flex gap-4">
                <ParallaxImage
                  src={img2}
                  alt={img2Alt}
                  width={285}
                  height={300}
                  yFactor={0.12}
                  delay={0.12}
                  className="ml-6 flex-shrink-0 w-[54%] overflow-hidden rounded-[24px] shadow-xl ring-1 ring-black/5"
                />

                {/* IMAGE 3 – Right card, slight elevation */}
                <ParallaxImage
                  src={img3}
                  alt={img3Alt}
                  width={220}
                  height={220}
                  yFactor={0.09}
                  delay={0.22}
                  className="flex-1 overflow-hidden rounded-[24px] shadow-xl ring-1 ring-black/5 self-end"
                />
              </div>

              {/* Floating Experience Badge */}
              <FloatingBadge years={experienceYears} text={experienceText} />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
              RIGHT COLUMN – Heading, copy, feature cards, CTA
              ═══════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-7">

            {/* ── Tag line ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-[#0799B3] animate-pulse" />
              <span className="text-[#0799B3] text-sm font-bold tracking-widest uppercase">
                {subTitle}
              </span>
            </motion.div>

            {/* ── Heading with underline animation ── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-black text-[#1F2429] text-[38px] sm:text-[48px] lg:text-[54px] xl:text-[60px] leading-[1.07] tracking-tight">
                {heading}
              </h2>
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 h-[5px] w-28 rounded-full bg-gradient-to-r from-[#0799B3] to-[#F58220] origin-left"
              />
            </motion.div>

            {/* ── Description ── */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-500 text-[15px] sm:text-base leading-[1.85] max-w-[540px]"
            >
              {description ? (
                description
              ) : (
                <>
                  Welcome to 8webcom.com. 8webcom started its journey in 2011 delivering business websites
                  and related services. Since then we grew delivering end to end business solutions across
                  the globe expanding in the areas of{' '}
                  <Link
                    href="/services/web-portal"
                    className="font-semibold text-[#0799B3] underline-offset-2 hover:underline transition-colors"
                  >
                    Web Portals
                  </Link>
                  , Enterprise Software,{' '}
                  <Link
                    href="/services/digital-marketing"
                    className="font-semibold text-[#F58220] underline-offset-2 hover:underline transition-colors"
                  >
                    Digital Marketing
                  </Link>
                  , CRM, E-Commerce and consulting. With more than 2000 businesses locally and
                  internationally trust us since more than a decade.
                </>
              )}
            </motion.p>

            {/* ── Feature Cards ── */}
            <div className="flex flex-col gap-3">
              {features.map((f, i) => (
                <FeatureCard key={f.title} {...f} index={i} />
              ))}
            </div>


            {/* ── CTA Button ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Primary button with shine sweep */}
              <Link
                href={ctaHref}
                className="relative overflow-hidden group inline-flex items-center gap-3
                  bg-[#0799B3] hover:bg-[#1F2429] text-white
                  font-bold text-sm sm:text-base
                  px-8 py-4 rounded-full
                  shadow-[0_4px_24px_rgba(7,153,179,0.35)]
                  hover:shadow-[0_4px_24px_rgba(31,36,41,0.35)]
                  transition-all duration-400
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
              >
                {/* Shine sweep */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    transition-transform duration-700"
                />
                <span className="relative z-10">{ctaLabel}</span>
                <motion.span
                  className="relative z-10 flex h-8 w-8 items-center justify-center
                    rounded-full bg-white/20 group-hover:rotate-45 transition-transform duration-300"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.span>
              </Link>

              {/* Secondary — phone link */}
              <Link
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2.5 text-[#1F2429] hover:text-[#0799B3]
                  font-semibold text-sm sm:text-base transition-colors duration-200 group
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-full p-1"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full
                    border-2 border-gray-200 group-hover:border-[#0799B3]
                    group-hover:bg-[#0799B3]/5 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
                <span>{phone}</span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
