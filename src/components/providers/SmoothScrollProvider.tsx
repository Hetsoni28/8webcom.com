'use client';

import React, { useEffect, useRef, useSyncExternalStore } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Smooth (Lenis) scrolling only where it helps: a mouse/trackpad on desktop,
// with motion allowed. Phones & tablets keep native momentum scrolling, which
// is smoother on touch and — importantly — Lenis is never mounted there, so its
// per-frame animation loop doesn't run at all (it cost ~12s of main-thread
// time in Lighthouse's mobile test).
const SMOOTH_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

function useSmoothScrollEnabled() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(SMOOTH_QUERY);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(SMOOTH_QUERY).matches,
    () => false // server: plain native scrolling
  );
}

// ─── Scroll to top on route change (not on first load, so #anchors / reloads keep their position) ──
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    // Only route changes should reset scroll, not Lenis mounting
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const smooth = useSmoothScrollEnabled();

  return (
    <>
      {/* Root Lenis is a sibling (not a wrapper), so toggling it never remounts the page.
          useLenis() reads the root instance from Lenis' global store. */}
      {smooth && (
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            smoothWheel: true,
            wheelMultiplier: 1,
            syncTouch: false,
            infinite: false,
            anchors: { offset: -100 },
          }}
        />
      )}
      <ScrollReset />
      {/* Honour the OS "reduce motion" setting for every Framer animation */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </>
  );
}
