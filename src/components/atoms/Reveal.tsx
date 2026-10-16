'use client';

import React from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  /** delay in seconds */
  delay?: number;
  className?: string;
  /** once=true means animates only on first entry (default: true) */
  once?: boolean;
  /** margin around the root (negative = early trigger) */
  margin?: `${number}px`;
}

/**
 * Reveal — wraps any element in a scroll-triggered fade/slide animation.
 * Usage:  <Reveal><YourComponent /></Reveal>
 */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
  margin = '-80px',
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin });

  const adjustedVariants: Variants = React.useMemo(() => {
    if (delay === 0) return variants;
    return {
      ...variants,
      visible: {
        ...(variants.visible as object),
        transition: {
          ...(
            typeof variants.visible === 'object' &&
            'transition' in variants.visible
              ? (variants.visible as { transition?: object }).transition
              : {}
          ),
          delay,
        },
      },
    };
  }, [variants, delay]);

  return (
    <motion.div
      ref={ref}
      variants={adjustedVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}
