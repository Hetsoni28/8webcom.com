'use client';

import React, { useRef, useSyncExternalStore } from 'react';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import Link from 'next/link';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT } from '@/lib/animations';

export interface CrmCardItem {
  id: string | number;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface CrmSolutionsSectionProps {
  subTitle?: string;
  heading?: string;
  description?: string;
  cards?: CrmCardItem[];
}

const CRM_TAGS: Record<string, string[]> = {
  'CRM Solutions': ['Custom Pipelines', 'Lead Management', 'Real-Time Sync'],
  'Managed CRM': ['Admin Partner', 'Workflow Support', 'Stress-Free Scaling'],
  'CRM Consulting': ['Audit & Roadmap', 'Process Automation', 'ROI Optimization'],
};

const STICKY_TOP = 120; // px — clears the compact header

const DESKTOP_QUERY = '(min-width: 1024px)';

function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP_QUERY);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false
  );
}

function StackCard({
  item,
  index,
  total,
  progress,
  stack,
}: {
  item: CrmCardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stack: boolean;
}) {
  const tags = CRM_TAGS[item.title] || ['Fast Deployment', 'Secure Cloud', '24/7 Support'];
  // Earlier cards shrink + dim slightly as later ones slide over them
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.12]);

  return (
    <div
      className="lg:sticky lg:h-[min(560px,calc(100svh-160px))] flex items-start"
      style={stack ? { top: STICKY_TOP + index * 28 } : undefined}
    >
      <motion.article
        style={stack ? { scale, transformOrigin: 'top center' } : undefined}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: EASE_OUT }}
        className="reveal-media group relative w-full grid grid-cols-1 sm:grid-cols-2 bg-white rounded-2xl border border-gray-200/80 p-3 sm:p-4 gap-3 sm:gap-6 shadow-[0_30px_60px_-36px_rgba(31,36,41,0.35)] overflow-hidden"
      >
        <div className="relative aspect-16/11 sm:aspect-auto sm:min-h-85 rounded-xl overflow-hidden bg-gray-100">
          <ImageWithSkeleton
            src={item.image}
            alt={`${item.title} – CRM services by 8webcom.com`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
            className="object-cover group-hover:scale-[1.06] duration-1200 ease-out-expo"
          />
        </div>

        <div className="flex flex-col px-2 sm:px-0 sm:pr-4 pt-3 sm:pt-6 pb-3">
          <span className="text-sm font-semibold tabular-nums text-[#078097] mb-5">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <h3 className="text-2xl lg:text-[28px] font-extrabold text-[#1F2429] tracking-tight leading-tight mb-3">
            {item.title}
          </h3>

          <p className="text-gray-600 text-[15px] leading-relaxed mb-6">{item.description}</p>

          <ul className="flex flex-wrap gap-1.5 mb-8" aria-label={`${item.title} highlights`}>
            {tags.map((tag) => (
              <li
                key={tag}
                className="text-[11.5px] font-semibold text-gray-600 bg-[#F6F8F9] border border-gray-200/70 rounded-full px-2.5 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>

          <Link
            href={item.href}
            className="mt-auto inline-flex items-center gap-2 w-fit text-sm font-semibold text-[#1F2429] pb-1 border-b border-[#1F2429]/20 transition-colors duration-300 hover:text-[#0799B3] hover:border-[#0799B3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-sm"
          >
            <span>More CRM<span className="sr-only">: {item.title}</span></span>
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Dimming veil for cards underneath the stack */}
        {stack && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 bg-[#1F2429] pointer-events-none rounded-2xl"
            style={{ opacity: dim }}
          />
        )}
      </motion.article>
    </div>
  );
}

export function CrmSolutionsSection({
  subTitle = 'CRM Solutions',
  heading = 'Grow your business with smart CRM solutions',
  description = 'Tailored CRM platforms and automated workflows built specifically for your business processes.',
  cards = [],
}: CrmSolutionsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  return (
    // No overflow-hidden here: it would break position: sticky
    <section className="py-24 lg:py-32 scroll-mt-28 bg-white" id="crm-solutions-sec">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky" style={{ top: STICKY_TOP + 16 }}>
              <SectionHeader eyebrow={subTitle} title={heading} description={description} />
            </div>
          </div>

          <div ref={containerRef} className="lg:col-span-7 flex flex-col gap-6 lg:gap-0">
            {cards.map((item, idx) => (
              <StackCard
                key={item.id || idx}
                item={item}
                index={idx}
                total={cards.length}
                progress={scrollYProgress}
                stack={isDesktop}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
