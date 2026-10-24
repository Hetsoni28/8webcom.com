'use client';

import React, { useEffect, useState } from 'react';

// Set once the first page has hydrated; every Template mounted after that is a client navigation
let hydrated = false;

/**
 * Route enter transition (CSS, see .page-enter in globals.css).
 * The first page load paints without it: content that starts at opacity 0 is
 * ignored for Largest Contentful Paint. Template re-mounts on every navigation,
 * so the fade plays on each route change after that.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => hydrated);

  useEffect(() => {
    hydrated = true;
  }, []);

  return <div className={animate ? 'page-enter' : undefined}>{children}</div>;
}
