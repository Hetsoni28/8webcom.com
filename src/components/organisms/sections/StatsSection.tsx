'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Stat } from '@/types';

// ─── Executive Stat Card (Human Agency Design, Zero AI Gimmicks) ───────────────
function StatCard({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const displayVal = useTransform(springVal, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    if (isInView) {
      motionVal.set(stat.value);
    }
  }, [isInView, motionVal, stat.value]);

  const ACCENTS = ['#0799B3', '#F58220', '#0799B3', '#F58220'];
  const accentColor = ACCENTS[index % 4];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(7,153,179,0.08)] hover:border-[#0799B3]/30 transition-all duration-400 hover:-translate-y-1 select-text"
      style={{ willChange: 'transform' }}
    >
      {/* Top Accent Indicator */}
      <div className="flex items-center justify-between mb-6">
        <div
          className="w-10 h-1.5 rounded-full transition-all duration-300 group-hover:w-16"
          style={{ backgroundColor: accentColor }}
        />
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
          0{index + 1}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-4xl sm:text-5xl lg:text-[52px] font-black text-[#1F2429] tracking-tight leading-none">
          <motion.span>{displayVal}</motion.span>
        </span>
        <span
          className="text-3xl sm:text-4xl font-extrabold"
          style={{ color: accentColor }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="text-sm sm:text-[15px] font-semibold text-gray-600 leading-snug">
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Stats Section Export ─────────────────────────────────────────────────────
export interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-[#FAFBFC] relative overflow-hidden" id="counters-sec">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label || idx} stat={stat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
