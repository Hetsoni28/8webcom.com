// ─── Shared Framer Motion variants for 8webcom.com ─────────────────────────
// Import these in any component: import { fadeUp, fadeLeft, fadeRight, stagger, scaleIn } from '@/lib/animations';

import { Variants } from 'framer-motion';

// ── Core easing ─────────────────────────────────────────────────────────────
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;
export const EASE_SPRING = { type: 'spring', stiffness: 100, damping: 20 };

// ── Fade variants ────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_SMOOTH },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

// ── Scale variants ───────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

export const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

// ── Stagger container ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.0,
    },
  },
};

// Item used inside a stagger container (fade-up by default)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

// ── Slide-in from edge (for sidebars / floating) ─────────────────────────────
export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.45, ease: EASE_SMOOTH } },
  exit:   { x: '100%', opacity: 0, transition: { duration: 0.35, ease: EASE_SMOOTH } },
};

// ── Clip-path reveal (wipe effect) ───────────────────────────────────────────
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_SMOOTH },
  },
};

// ── Blur-in ──────────────────────────────────────────────────────────────────
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};
