'use client';

import React from 'react';
import Image from 'next/image';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TechCardProps {
  name: string;
  image: string;
  icon: string;
  description: string;
  className?: string;
}

export function TechCard({ name, image, icon, description, className }: TechCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col h-full bg-white rounded-3xl border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(7,153,179,0.12)] hover:border-[#0799B3]/40 transition-all duration-500 hover:-translate-y-2 overflow-hidden",
        className
      )}
    >
      {/* ── Top Cover Image (Edge-to-edge inside rounded top) ── */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gray-100">
        <ImageWithSkeleton
          src={image}
          alt={`${name} cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* ── Content Area ── */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Header with Integrated Icon & Title */}
          <div className="flex items-center gap-3.5 mb-3.5">
            {icon && (
              <div className="w-12 h-12 rounded-2xl bg-[#0799B3]/10 border border-[#0799B3]/20 flex items-center justify-center shrink-0 group-hover:bg-[#0799B3] group-hover:border-[#0799B3] transition-all duration-400 shadow-sm">
                <Image
                  src={icon}
                  alt={`${name} icon`}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain group-hover:brightness-0 group-hover:invert transition-all duration-400"
                />
              </div>
            )}
            <h3 className="text-xl sm:text-[22px] font-bold text-[#1F2429] group-hover:text-[#0799B3] transition-colors leading-snug">
              <Link href="/services" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-lg">
                {name}
              </Link>
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm sm:text-[14.5px] leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* ── Bottom Action Link ── */}
        <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            href="/services"
            aria-label={`Explore ${name} solution`}
            className="text-xs sm:text-sm font-bold text-[#0799B3] group-hover:text-[#F58220] inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-lg px-1 py-0.5"
          >
            Explore Solution
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
          <span className="w-2 h-2 rounded-full bg-[#0799B3]/30 group-hover:bg-[#F58220] transition-colors" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
