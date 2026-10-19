// ─── Shared Framer Motion variants for 8webcom.com ─────────────────────────
// Import these in any component: import { fadeUp, fadeLeft, fadeRight, stagger, scaleIn } from '@/lib/animations';
//
// One easing curve for the whole site keeps motion feeling consistent.
// EASE_OUT is an expo-out curve: fast start, long soft landing.

import { Variants } from 'framer-motion';

// ── Core easing ─────────────────────────────────────────────────────────────
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const EASE_SMOOTH = EASE_OUT;
export const EASE_SPRING = { type: 'spring', stiffness: 100, damping: 20 };

// Shared viewport config for scroll reveals
export const VIEWPORT = { once: true, margin: '-80px' } as const;

// ── Fade variants ────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};

// ── Scale variants ───────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

export const scalePop: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
};

// ── Stagger container ────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.0,
    },
  },
};

// Item used inside a stagger container (fade-up by default)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

export const staggerItemLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

// ── Slide-in from edge (for sidebars / floating) ─────────────────────────────
export const slideInRight: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
  exit:   { x: '100%', opacity: 0, transition: { duration: 0.4, ease: EASE_IN_OUT } },
};

// ── Clip-path reveal (wipe effect) ───────────────────────────────────────────
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    opacity: 1,
    transition: { duration: 1.1, ease: EASE_OUT },
  },
};

// Image curtain: reveals from the bottom edge upward
export const clipUp: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  visible: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1.2, ease: EASE_OUT },
  },
};

// ── Blur-in ──────────────────────────────────────────────────────────────────
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

// ── Masked line / word reveal ────────────────────────────────────────────────
// Parent: maskParent, child (inside an overflow-hidden wrapper): maskChild
export const maskParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

export const maskChild: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1, ease: EASE_OUT } },
};
