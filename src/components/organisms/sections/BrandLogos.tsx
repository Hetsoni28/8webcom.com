'use client';

import React from 'react';
import { ClientLogo as ClientLogoComponent } from '@/components/molecules/ClientLogo';
import { SectionHeader } from '@/components/molecules/SectionHeader';
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
  if (!logos || logos.length === 0) return null;

  // One track containing the list twice; the keyframe moves it by exactly -50%
  const track = [...logos, ...logos];

  return (
    <section className="py-20 lg:py-24 bg-white border-t border-gray-100 overflow-hidden" id="brand-sec">
      <div className="container-site mb-12">
        <SectionHeader
          eyebrow={subTitle}
          title={heading}
          align="center"
          titleClassName="text-[26px] sm:text-[32px] lg:text-[36px]"
        />
      </div>

      <div className="relative edge-fade-x group">
        <ul className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((logo, index) => (
            <li
              key={`${logo.name}-${index}`}
              className="shrink-0 px-8 sm:px-12"
              aria-hidden={index >= logos.length ? 'true' : undefined}
            >
              <ClientLogoComponent name={logo.name} src={logo.src} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
