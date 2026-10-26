'use client';

import React, { useEffect, useImperativeHandle, useRef } from 'react';

/**
 * Google reCAPTCHA v2 checkbox ("I'm not a robot") — the real widget.
 *
 * Google's script (~150 KB) is only fetched when the form scrolls near the screen,
 * so pages that never reach the form, and PageSpeed's first view, don't pay for it.
 * Renders nothing when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set.
 */

type Grecaptcha = {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, options: Record<string, unknown>) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __onRecaptchaLoad?: () => void;
  }
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';

let scriptPromise: Promise<Grecaptcha> | null = null;

function loadRecaptcha(): Promise<Grecaptcha> {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  scriptPromise ??= new Promise((resolve, reject) => {
    window.__onRecaptchaLoad = () => resolve(window.grecaptcha!);
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit&hl=en';
    script.async = true;
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('reCAPTCHA script failed to load'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export interface RecaptchaHandle {
  /** Clear the tick — tokens are single-use, so call this after every submit attempt */
  reset: () => void;
}

interface RecaptchaProps {
  /** Token when ticked; null when it expires or errors */
  onChange: (token: string | null) => void;
  ref?: React.Ref<RecaptchaHandle>;
}

export function Recaptcha({ onChange, ref }: RecaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current(null);
    },
  }));

  useEffect(() => {
    const el = containerRef.current;
    if (!RECAPTCHA_SITE_KEY || !el) return;
    let cancelled = false;

    const mount = () =>
      loadRecaptcha()
        .then((g) =>
          g.ready(() => {
            if (cancelled || widgetId.current !== null || !containerRef.current) return;
            widgetId.current = g.render(containerRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              callback: (token: string) => onChangeRef.current(token),
              'expired-callback': () => onChangeRef.current(null),
              'error-callback': () => onChangeRef.current(null),
            });
          })
        )
        .catch((err) => console.error(err));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          mount();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  if (!RECAPTCHA_SITE_KEY) return null;

  // 304 × 78 is Google's widget size; reserving it avoids a layout jump when it appears.
  // Very narrow phones scale it down so it never overflows the form.
  return (
    <div className="h-19.5 w-76 max-[359px]:origin-left max-[359px]:scale-[0.88]">
      <div ref={containerRef} />
    </div>
  );
}
