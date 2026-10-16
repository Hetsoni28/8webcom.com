'use client';

import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
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
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
        infinite: false,
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
