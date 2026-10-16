'use client';

import React from 'react';
import { ClientLogo as ClientLogoComponent } from '@/components/molecules/ClientLogo';
import { Reveal } from '@/components/atoms/Reveal';
import { fadeUp } from '@/lib/animations';
import { ClientLogo } from '@/types';

export interface BrandLogosProps {
  subTitle?: string;
  heading?: string;
  logos: ClientLogo[];
}

export function BrandLogos({
  subTitle = 'Clients Logo',
  heading = 'Trusted by Leading Companies',
  logos,
}: BrandLogosProps) {
  const scrollLogos = [...logos, ...logos];

  return (
    <section className="py-16 lg:py-20 bg-white border-y border-gray-100 overflow-hidden" id="brand-sec">
      <div className="container mx-auto px-4 lg:px-8 mb-10 text-center">
        <span className="text-[#0799B3] text-sm font-bold tracking-widest uppercase block mb-2">
          {subTitle}
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2429] tracking-tight">
          {heading}
        </h2>
      </div>

      <Reveal variants={fadeUp} className="w-full">
        <div className="relative flex overflow-hidden group">
          <div className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused] items-center">
            {scrollLogos.map((logo, index) => (
              <div key={index} className="mx-6 sm:mx-10 shrink-0">
                <ClientLogoComponent name={logo.name} src={logo.src} />
              </div>
            ))}
          </div>
          <div className="animate-marquee flex whitespace-nowrap absolute top-0 group-hover:[animation-play-state:paused] items-center" aria-hidden="true">
            {scrollLogos.map((logo, index) => (
              <div key={`second-${index}`} className="mx-6 sm:mx-10 shrink-0">
                <ClientLogoComponent name={logo.name} src={logo.src} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
