import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export interface FooterLinkProps {
  label: string;
  href: string;
  className?: string;
}

export function FooterLink({ label, href, className }: FooterLinkProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "text-gray-400 hover:text-white transition-colors duration-300 text-sm flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-md px-1 py-0.5",
        className
      )}
    >
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" aria-hidden="true" />
      {label}
    </Link>
  );
}
