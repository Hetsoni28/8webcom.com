import React from 'react';
import Image from 'next/image';

export interface PageHeroProps {
  title: React.ReactNode;
  highlight?: string;
  titleSuffix?: string;
  subTitle?: string;
  image?: string;
}

/**
 * Inner-page hero — same framed panel language as the homepage hero.
 * Server Component; the intro uses the CSS-only .hero-fade animation so the
 * H1 paints immediately (no waiting on hydration).
 */
export function PageHero({ title, highlight, titleSuffix, subTitle, image }: PageHeroProps) {
  return (
    <section className="bg-white px-2.5 sm:px-4 pt-[100px] sm:pt-[118px] lg:pt-[130px]">
      <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#12161C] flex items-end">
        {image && (
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={image}
              alt=""
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover opacity-40"
            />
          </div>
        )}
        {/* Legibility gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-[#12161C] via-[#12161C]/80 to-[#12161C]/20" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-[#12161C] to-transparent" aria-hidden="true" />

        <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 pt-16 pb-10 sm:pb-14 lg:pb-16">
          {subTitle && (
            <div className="hero-fade flex items-center gap-3 mb-6" style={{ animationDelay: '0.05s' }}>
              <span className="h-px w-10 bg-[#0799B3]" aria-hidden="true" />
              <span className="text-[#0799B3] text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em]">
                {subTitle}
              </span>
            </div>
          )}
          <h1
            className="hero-fade max-w-4xl text-[40px] sm:text-[56px] lg:text-[72px] font-extrabold text-white tracking-[-0.04em] leading-[1.02] wrap-break-word"
            style={{ animationDelay: '0.15s' }}
          >
            {title}
            {highlight && (
              <>
                {' '}
                <span className="text-[#0799B3]">{highlight}</span>
              </>
            )}
            {titleSuffix && ` ${titleSuffix}`}
          </h1>
        </div>
      </div>
    </section>
  );
}
