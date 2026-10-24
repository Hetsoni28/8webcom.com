'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  m,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ServiceMarqueeProps {
  items: { label: string; href: string }[];
  /** % of track width per second */
  baseVelocity?: number;
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Star() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 shrink-0 text-[#F58220]" fill="currentColor">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

/**
 * ServiceMarquee — oversized service names that drift continuously and
 * speed up / reverse with the visitor's scroll velocity.
 */
export function ServiceMarquee({ items, baseVelocity = -1.6 }: ServiceMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '100px 0px' });
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const row = (hidden: boolean) =>
    items.map((item, i) => (
      <li key={`${hidden ? 'b' : 'a'}-${item.label}`} className="flex items-center gap-8 sm:gap-12 lg:gap-16 pr-8 sm:pr-12 lg:pr-16" aria-hidden={hidden || undefined}>
        <Link
          href={item.href}
          tabIndex={hidden ? -1 : undefined}
          className={cn(
            'text-[52px] sm:text-[80px] lg:text-[120px] font-extrabold tracking-[-0.045em] leading-none whitespace-nowrap transition-colors duration-500',
            i % 2 === 0 ? 'text-[#1F2429] hover:text-[#0799B3]' : 'text-outline hover:[-webkit-text-stroke-color:#0799B3]'
          )}
        >
          {item.label}
        </Link>
        <Star />
      </li>
    ));

  return (
    <section ref={ref} aria-label="Our services" className="py-10 sm:py-14 lg:py-16 bg-white overflow-hidden border-b border-gray-100">
      <m.ul className="flex w-max items-center will-change-transform" style={{ x }}>
        {row(false)}
        {row(true)}
      </m.ul>
    </section>
  );
}
