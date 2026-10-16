import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { NavChild } from '@/types';

export interface NavItemProps {
  label: string;
  href: string;
  children?: NavChild[];
  active?: boolean;
  className?: string;
}

export function NavItem({ label, href, children, active, className }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLAnchorElement>(null);

  const hasChildren = Boolean(children && children.length > 0);

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
          "relative flex items-center gap-2 py-3 px-2 rounded-xl text-base lg:text-[17px] font-bold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2",
          active ? "text-[#0799B3]" : "text-[#1F2429] hover:text-[#0799B3]"
        )}
      >
        <span>{label}</span>
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
            <motion.div 
              role="menu"
              aria-label={`${label} submenu`}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-[calc(100%+0.5rem)] left-0 min-w-[260px] bg-white shadow-2xl shadow-black/10 rounded-2xl border border-gray-100 py-3 flex flex-col z-50 overflow-hidden"
            >
              {children!.map((child, idx) => (
                <Link 
                  key={idx} 
                  href={child.href}
                  role="menuitem"
                  className="px-6 py-3 text-[15px] font-semibold text-gray-700 hover:text-[#0799B3] hover:bg-[#0799B3]/8 focus-visible:bg-[#0799B3]/10 focus-visible:text-[#0799B3] focus-visible:outline-none transition-colors flex items-center justify-between group/sub"
                >
                  <span>{child.label}</span>
                  <span className="opacity-0 -translate-x-1 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all text-[#0799B3] text-sm font-bold" aria-hidden="true">→</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

