'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business goals, target audience, and competitive landscape to craft a bulletproof digital strategy.',
  },
  {
    num: '02',
    title: 'UI/UX Design',
    description: 'Our world-class designers create stunning, user-centric interfaces that captivate your audience and drive massive conversions.',
  },
  {
    num: '03',
    title: 'Agile Development',
    description: 'Using the latest tech stacks, our engineers build blazing fast, highly secure, and scalable solutions tailored to your needs.',
  },
  {
    num: '04',
    title: 'Testing & Deployment',
    description: 'Rigorous QA testing ensures a flawless launch, followed by continuous monitoring and optimization for maximum ROI.',
  },
];

/** "Our Proven Process" — 4-step timeline; the rule draws across as it enters view. */
export function ServiceProcess() {
  return (
    <section className="py-24 lg:py-32 bg-[#F6F8F9]" id="process-sec">
      <div className="container-site">
        <SectionHeader
          eyebrow="How We Work"
          title="Our Proven Process"
          description="A transparent, results-driven methodology designed to guarantee your success."
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
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: i * 0.12, ease: EASE_OUT }}
                className="relative"
              >
                <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border border-gray-200 text-[#0799B3] text-sm font-bold tabular-nums shadow-[0_8px_20px_-10px_rgba(7,153,179,0.5)]">
                  {step.num}
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
