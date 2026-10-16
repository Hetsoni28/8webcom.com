import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ClientLogoProps {
  name: string;
  src: string;
  className?: string;
}

export function ClientLogo({ name, src, className }: ClientLogoProps) {
  return (
    <div className={cn("relative w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300", className)}>
      <Image 
        src={src} 
        alt={name} 
        fill 
        sizes="128px"
        className="object-contain" 
      />
    </div>
  );
}

