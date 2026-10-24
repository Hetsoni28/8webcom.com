'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import { CtaLink } from '@/components/atoms/CtaLink';
import { CheckCircle2 } from 'lucide-react';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Service } from '@/types';

interface ServiceShowcaseProps {
  service: Service;
  index: number;
  /** First features of the service (Sanity → Services → Features) */
  highlights: string[];
  /** Button text (Sanity → Services Pages) */
  buttonLabel: string;
}

export function ServiceShowcase({ service, index, highlights, buttonLabel }: ServiceShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  const isReversed = index % 2 === 1;

  return (
    <div ref={ref} className={cn('py-20 lg:py-28', index % 2 === 1 && 'bg-[#F6F8F9]')}>
      <div className="container-site">
        <div className={cn('flex flex-col gap-12 lg:gap-20 items-center', isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row')}>
          {/* Image with gentle parallax + curtain reveal.
              The OUTER box is what the browser watches (always fully visible);
              the curtain is on an INNER layer. A fully clipped element has no
              visible area, so browsers never report it "in view" — that left
              the images stuck hidden on phones. */}
          <motion.div
            className="w-full lg:w-1/2 relative aspect-4/3 rounded-2xl overflow-hidden bg-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.div
              className="reveal-media absolute inset-0"
              variants={{
                hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
                visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE_OUT } },
              }}
            >
            <motion.div style={{ y }} className="reveal-media absolute inset-y-[-10%] inset-x-0">
              <ImageWithSkeleton
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                // First block is the largest image on screen (LCP): load it immediately
                loading={index === 0 ? "eager" : undefined}
                className="object-cover"
              />
            </motion.div>
            </motion.div>
            <span className="absolute top-5 left-5 inline-flex items-center h-9 px-3.5 rounded-full bg-white/95 text-[#1F2429] text-sm font-bold tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Copy */}
          <motion.div
            className="w-full lg:w-1/2 min-w-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
          >
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold text-[#1F2429] tracking-[-0.025em] leading-[1.1] mb-5">
              {service.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-[17px] leading-[1.75] mb-8 max-w-xl">{service.description}</p>

            {highlights.length > 0 && (
              <ul className="space-y-3.5 mb-10">
                {highlights.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-[#1F2429] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[#0799B3] shrink-0" aria-hidden="true" />
                    {feat}
                  </li>
                ))}
              </ul>
            )}

            <CtaLink href={service.href}>
              {buttonLabel}
              <span className="sr-only">: {service.title}</span>
            </CtaLink>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
