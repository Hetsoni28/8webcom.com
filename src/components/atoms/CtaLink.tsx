import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-light' | 'dark';
  size?: 'md' | 'lg';
  icon?: React.ReactNode | false;
  external?: boolean;
  className?: string;
  'aria-label'?: string;
}

/**
 * CtaLink — the site's single button style.
 * The arrow swaps out diagonally on hover (old one leaves, new one enters).
 */
export function CtaLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  icon,
  external,
  className,
  'aria-label': ariaLabel,
}: CtaLinkProps) {
  const variants = {
    primary: 'bg-[#078097] text-white hover:bg-[#066F83] shadow-[0_8px_24px_-8px_rgba(7,153,179,0.55)]',
    secondary: 'bg-[#F58220] text-white hover:bg-[#e4741a] shadow-[0_8px_24px_-8px_rgba(245,130,32,0.55)]',
    dark: 'bg-[#1F2429] text-white hover:bg-[#078097]',
    outline: 'border border-[#1F2429]/15 text-[#1F2429] hover:border-[#0799B3] hover:text-[#0799B3] bg-white',
    'outline-light': 'border border-white/25 text-white hover:border-white hover:bg-white hover:text-[#1F2429]',
  };

  const sizes = {
    md: 'h-12 pl-6 pr-2 text-[15px] gap-3',
    lg: 'h-14 pl-7 pr-2.5 text-base gap-4',
  };

  const chip = {
    primary: 'bg-white/15',
    secondary: 'bg-white/15',
    dark: 'bg-white/10',
    outline: 'bg-[#0799B3]/10 text-[#0799B3]',
    'outline-light': 'bg-white/10',
  };

  const content = (
    <>
      <span>{children}</span>
      {icon !== false && (
        <span
          aria-hidden="true"
          className={cn(
            'relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
            size === 'lg' ? 'w-9 h-9' : 'w-8 h-8',
            chip[variant]
          )}
        >
          {icon ?? (
            <>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-5 group-hover/cta:-translate-y-5" />
              <ArrowUpRight className="w-4 h-4 absolute -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-0 group-hover/cta:translate-y-0" />
            </>
          )}
        </span>
      )}
    </>
  );

  const classes = cn(
    'group/cta inline-flex items-center justify-between rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.97]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2',
    variants[variant],
    sizes[size],
    icon === false && (size === 'lg' ? 'pr-7' : 'pr-6'),
    className
  );

  if (external || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
