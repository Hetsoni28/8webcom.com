'use client';

import { motion } from 'framer-motion';
import { TechCard } from '@/components/molecules/TechCard';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT } from '@/lib/animations';
import { TechPlatform } from '@/types';

export interface TechSliderProps {
  heading?: string;
  highlight?: string;
  headingSuffix?: string;
  subTitle?: string;
  platforms: TechPlatform[];
}

/**
 * "What We Offer" — static, calm layout.
 * Desktop/tablet: grid (every offering fully visible, nothing cut off).
 * Mobile: native swipe row with scroll-snap so each card lands cleanly.
 */
export function TechSlider({
  heading = 'Superfast, well designed, well researched, website with CMS',
  highlight,
  headingSuffix,
  subTitle = 'What We Offer',
  platforms = [],
}: TechSliderProps) {
  if (!platforms || platforms.length === 0) return null;

  const title = [heading, highlight, headingSuffix].filter(Boolean).join(' ');

  return (
    <section className="py-24 lg:py-32 bg-white" id="service-sec">
      <div className="container-site">
        <SectionHeader
          eyebrow={subTitle}
          title={title}
          bodyClassName="max-w-3xl"
          titleClassName="text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.12]"
          className="mb-12 lg:mb-16"
        />

        <ul
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar -mx-5 px-5 sm:-mx-8 sm:px-8 md:mx-0 md:px-0 pb-2 md:pb-0 scroll-px-5 sm:scroll-px-8"
          aria-label={subTitle}
        >
          {platforms.map((platform, idx) => (
            <motion.li
              key={`${platform.name}-${idx}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: (idx % 4) * 0.08, ease: EASE_OUT }}
              className="reveal-media snap-start shrink-0 w-[78vw] sm:w-[52vw] md:w-auto flex"
            >
              <TechCard
                name={platform.name}
                image={platform.image}
                icon={platform.icon}
                description={platform.description}
                className="w-full"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
