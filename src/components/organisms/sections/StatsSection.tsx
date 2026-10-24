'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Stat } from '@/types';
import { EASE_OUT } from '@/lib/animations';

const ACCENTS = ['#0799B3', '#F58220'];

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 40, damping: 22, mass: 1 });
  const displayVal = useTransform(springVal, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) motionVal.set(stat.value);
  }, [isInView, motionVal, stat.value]);

  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay: index * 0.1, ease: EASE_OUT }}
      className="relative py-8 sm:py-1 border-white/10 border-t first:border-t-0 sm:border-t-0 sm:pl-8 sm:odd:pl-0 sm:even:border-l lg:pl-10 lg:odd:pl-10 lg:first:pl-0 lg:border-l lg:first:border-l-0"
    >
      {/* Rule that draws in above each metric */}
      <motion.span
        aria-hidden="true"
        className="block h-0.5 w-10 mb-8 origin-left"
        style={{ backgroundColor: accent }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: EASE_OUT }}
      />

      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-5xl lg:text-[64px] font-extrabold text-white tracking-[-0.03em] leading-none tabular-nums">
          <motion.span>{displayVal}</motion.span>
        </span>
        <span className="text-4xl lg:text-5xl font-bold leading-none" style={{ color: accent }}>
          {stat.suffix}
        </span>
      </div>

      <p className="text-[15px] font-medium text-gray-400">{stat.label}</p>
    </motion.div>
  );
}

export interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-[#1F2429]" id="counters-sec" aria-label="Company milestones">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-y-14">
          {stats.map((stat, idx) => (
            <StatItem key={stat.label || idx} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
