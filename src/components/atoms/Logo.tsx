import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  href?: string;
  className?: string;
  priority?: boolean;
}

export function Logo({
  src = '/assets/img/logo.png',
  alt = '8webcom.com',
  width = 220,
  height = 80,
  href = '/',
  className,
  priority = false,
}: LogoProps) {
  const content = (
    <Image 
      src={src} 
      alt={alt} 
      width={width} 
      height={height}
      priority={priority}
      className={cn("w-auto h-14 sm:h-16 lg:h-16.5 object-contain block", className)}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={`${alt} - Home`}
        className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return <div className="inline-block">{content}</div>;
}

