'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const SIZE = 52;
const STROKE = 3;
const RADIUS = (SIZE - STROKE * 2) / 2;       // 23
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;   // ~144.5

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollPercent(Math.min(pct, 100));
      setIsVisible(scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dashOffset = CIRCUMFERENCE - (scrollPercent / 100) * CIRCUMFERENCE;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="stt-wrapper"
          initial={{ opacity: 0, y: 20, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.7 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="fixed bottom-8 right-[72px] z-50"
          style={{ width: SIZE, height: SIZE }}
        >
          {/* SVG circular progress ring — sits behind the button */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'rotate(-90deg)',
            }}
            aria-hidden="true"
          >
            {/* Track */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(7,153,179,0.20)"
              strokeWidth={STROKE}
            />
            {/* Progress */}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#0799B3"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.12s linear' }}
            />
          </svg>

          {/* Clickable inner teal circle */}
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            aria-label="Scroll back to top of page"
            className="focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
            style={{
              position: 'absolute',
              inset: 5,                 // 5px gap for the ring to show
              borderRadius: '50%',
              background: '#0799B3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(7,153,179,0.55), 0 1px 4px rgba(0,0,0,0.18)',
            }}
          >
            <ChevronUp
              style={{ width: 20, height: 20, color: '#fff', strokeWidth: 3 }}
              aria-hidden="true"
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
