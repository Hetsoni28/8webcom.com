'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { ChevronUp } from 'lucide-react';

const SIZE = 52;
const STROKE = 3;
const RADIUS = (SIZE - STROKE * 2) / 2;

export function ScrollToTop() {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Only re-render when crossing the threshold — the ring itself is a motion value
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > 300;
    if (next !== isVisible) setIsVisible(next);
  });

  const scrollTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="stt-wrapper"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed bottom-8 right-18 z-50"
          style={{ width: SIZE, height: SIZE }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="rgba(7,153,179,0.20)" strokeWidth={STROKE} />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#0799B3"
              strokeWidth={STROKE}
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          <motion.button
            type="button"
            onClick={scrollTop}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll back to top of page"
            className="absolute inset-1.25 rounded-full bg-[#0799B3] flex items-center justify-center cursor-pointer shadow-[0_4px_18px_rgba(7,153,179,0.55)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
          >
            <ChevronUp className="w-5 h-5 text-white" strokeWidth={3} aria-hidden="true" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
