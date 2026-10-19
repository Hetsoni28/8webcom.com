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
    <div
      className={cn(
        "relative w-32 sm:w-36 h-16 flex items-center justify-center grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-500 ease-out-expo",
        className
      )}
    >
      <Image
        src={src}
        alt={name}
        fill
        sizes="144px"
        className="object-contain"
      />
    </div>
  );
}
