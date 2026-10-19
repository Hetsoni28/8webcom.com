// ─── Shared Framer Motion variants for 8webcom.com ─────────────────────────
// One easing curve for the whole site keeps motion feeling consistent.
// EASE_OUT is an expo-out curve: fast start, long soft landing.

import { Variants } from 'framer-motion';

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Shared viewport config for scroll reveals
export const VIEWPORT = { once: true, margin: '-80px' } as const;

// ── Fade variants ────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

// ── Stagger ──────────────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE_OUT } },
};

// ── Masked word reveal ───────────────────────────────────────────────────────
// Parent: maskParent, child (inside an overflow-hidden wrapper): maskChild
export const maskParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

export const maskChild: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: 1, ease: EASE_OUT } },
};
