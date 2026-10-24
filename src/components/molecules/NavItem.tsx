import React, { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { NavChild } from '@/types';

export interface NavItemProps {
  label: string;
  href: string;
  subLinks?: NavChild[];
  active?: boolean;
  className?: string;
}

export function NavItem({ label, href, subLinks, active, className }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLAnchorElement>(null);

  const hasChildren = Boolean(subLinks && subLinks.length > 0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!hasChildren) return;

    if (e.key === 'ArrowDown' || e.key === 'Enter') {
      if (!isOpen) {
        setIsOpen(true);
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // If the newly focused element is NOT inside this NavItem container, close dropdown
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative group", className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link 
        ref={triggerRef}
        href={href}
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        className={cn(
          "relative flex items-center gap-1.5 py-3 px-1 rounded-lg text-base lg:text-[16px] font-semibold tracking-[-0.01em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2",
          active ? "text-[#0799B3]" : "text-[#1F2429] hover:text-[#0799B3]"
        )}
      >
        <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-[#0799B3] after:origin-right after:scale-x-0 after:transition-transform after:duration-500 after:ease-out-expo group-hover:after:origin-left group-hover:after:scale-x-100">
          {label}
        </span>
        {hasChildren && (
          <ChevronDown 
            className={cn("w-4 h-4 transition-transform duration-200 text-current", isOpen && "rotate-180")} 
            aria-hidden="true"
          />
        )}
      </Link>
      
      {hasChildren && (
        <AnimatePresence>
          {isOpen && (
            <m.div 
              role="menu"
              aria-label={`${label} submenu`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[calc(100%+0.5rem)] -left-4 min-w-65 bg-white shadow-[0_24px_48px_-16px_rgba(31,36,41,0.2)] rounded-xl border border-gray-200/70 p-2 flex flex-col z-50 overflow-hidden"
            >
              {subLinks!.map((child, idx) => (
                <Link 
                  key={idx} 
                  href={child.href}
                  role="menuitem"
                  className="px-4 py-3 rounded-lg text-[15px] font-medium text-gray-700 hover:text-[#0799B3] hover:bg-[#0799B3]/6 focus-visible:bg-[#0799B3]/10 focus-visible:text-[#0799B3] focus-visible:outline-none transition-colors duration-200 flex items-center justify-between group/sub"
                >
                  <span>{child.label}</span>
                  <span className="opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-[#0799B3] text-sm font-bold" aria-hidden="true">→</span>
                </Link>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

