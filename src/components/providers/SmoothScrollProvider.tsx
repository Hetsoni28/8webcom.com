'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';

// ─── Instant Route Scroll Reset ───────────────────────────────────────────────
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

// ─── Snappy, Buttery-Smooth Lenis Provider ─────────────────────────────────────
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // Lower lerp = longer, silkier glide. 0.085 feels premium without lag.
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        // Leave touch devices on native momentum scrolling (fastest + most natural)
        syncTouch: false,
        touchMultiplier: 1,
        infinite: false,
        // Same-page #anchor links glide instead of jumping
        anchors: { offset: -100 },
      }}
    >
      <ScrollReset />
      {/* Honour the OS "reduce motion" setting for every Framer animation */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
