import React from 'react';

/**
 * Route enter transition.
 * Pure CSS (see .page-enter in globals.css) so server-rendered HTML is painted
 * immediately — no waiting for JavaScript to hydrate before content appears.
 * Template re-mounts on every navigation, so the animation replays per route.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
