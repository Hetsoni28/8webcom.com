import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Mouse-follow spotlight without React re-renders: writes the pointer position
 * to --mx / --my CSS variables on the element. Use with a child whose background
 * is `radial-gradient(… at var(--mx) var(--my), …)`.
 */
export function trackPointer(e: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  el.style.setProperty('--my', `${e.clientY - rect.top}px`);
}
