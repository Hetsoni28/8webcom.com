'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_OUT, VIEWPORT, maskChild, maskParent } from '@/lib/animations';

/**
 * MaskedWords — splits a heading into words and slides each one up
 * from behind an overflow mask. Falls back to a simple fade for
 * non-string content.
 */
export function MaskedWords({ text, className }: { text: React.ReactNode; className?: string }) {
  if (typeof text !== 'string') {
    return (
      <motion.span
        className={cn('block', className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      >
        {text}
      </motion.span>
    );
  }

  // Flex-wrap rows (not inline-blocks) so the heading keeps its real line-height:
  // overflow-hidden inline-blocks sit on the baseline and inflate every line box.
  const words = text.split(' ');
  return (
    <motion.span
      className={cn('flex flex-wrap gap-x-[0.26em]', className)}
      variants={maskParent}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="block overflow-hidden pb-[0.08em] mb-[-0.08em]">
          <motion.span className="block will-change-transform" variants={maskChild}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Eyebrow — short rule + uppercase label used above every section heading */
export function Eyebrow({
  label,
  align = 'left',
  className,
}: {
  label: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <motion.div
      className={cn('flex items-center gap-3', align === 'center' && 'justify-center', className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      <motion.span
        aria-hidden="true"
        className="h-px w-8 bg-[#0799B3] origin-left"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
        }}
      />
      <motion.span
        className={cn(
          'text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.2em]',
          'text-[#0799B3]'
        )}
        variants={{
          hidden: { opacity: 0, x: -8 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.15, ease: EASE_OUT } },
        }}
      >
        {label}
      </motion.span>
      {align === 'center' && (
        <motion.span
          aria-hidden="true"
          className="h-px w-8 bg-[#0799B3] origin-right"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE_OUT } },
          }}
        />
      )}
    </motion.div>
  );
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  theme?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
  titleClassName?: string;
  /** Overrides the text column width (default max-w-2xl / max-w-3xl centered) */
  bodyClassName?: string;
  /** Right-hand slot (buttons, slider controls) — only used with align="left" */
  aside?: React.ReactNode;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  theme = 'light',
  as: Tag = 'h2',
  className,
  titleClassName,
  bodyClassName,
  aside,
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  const body = (
    <div className={cn('flex flex-col gap-5', isCenter ? 'items-center text-center mx-auto max-w-3xl' : 'max-w-2xl', bodyClassName)}>
      {eyebrow && <Eyebrow label={eyebrow} align={align} />}
      <Tag
        className={cn(
          'font-extrabold tracking-tight leading-[1.1] text-[32px] sm:text-[40px] lg:text-[48px]',
          theme === 'dark' ? 'text-white' : 'text-[#1F2429]',
          titleClassName
        )}
      >
        <MaskedWords text={title} className={isCenter ? 'justify-center' : undefined} />
      </Tag>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
          className={cn(
            'text-base sm:text-[17px] leading-[1.75]',
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
            isCenter ? 'max-w-2xl' : 'max-w-xl'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );

  if (!aside || isCenter) {
    return <div className={className}>{body}</div>;
  }

  return (
    <div className={cn('flex flex-col md:flex-row md:items-end md:justify-between gap-8', className)}>
      {body}
      <motion.div
        className="shrink-0"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
      >
        {aside}
      </motion.div>
    </div>
  );
}
