'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';

export interface ServiceProcessProps {
  subTitle?: string;
  heading?: string;
  description?: string;
  steps: { title: string; description?: string }[];
}

/** "Our Proven Process" — 4-step timeline; the rule draws across as it enters view. */
export function ServiceProcess({ subTitle, heading = '', description, steps }: ServiceProcessProps) {
  return (
    <section className="py-24 lg:py-32 bg-[#F6F8F9]" id="process-sec">
      <div className="container-site">
        <SectionHeader
          eyebrow={subTitle}
          title={heading}
          description={description}
          className="mb-14 lg:mb-20"
        />

        <div className="relative">
          {/* Timeline rule (desktop) */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-gray-300/70" aria-hidden="true">
            <motion.span
              className="absolute inset-0 bg-[#0799B3] origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 1.6, ease: EASE_OUT }}
            />
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((step, i) => (
              <motion.li
                key={`${step.title}-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_OUT }}
                className="relative"
              >
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-[#0799B3] text-sm font-bold tabular-nums shadow-[0_8px_20px_-10px_rgba(7,153,179,0.5)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-7 text-xl lg:text-[22px] font-bold text-[#1F2429] tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
