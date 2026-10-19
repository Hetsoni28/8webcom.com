'use client';

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { CtaLink } from '@/components/atoms/CtaLink';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  subTitle?: string;
  heading?: string;
  description?: string;
  items: FaqItem[];
}

/**
 * FAQ accordion. Answers are always rendered in the HTML (collapsed with
 * grid-rows, not removed), so search engines and AI crawlers can read them.
 * Pair with faqSchema() on the page for FAQPage structured data.
 */
export function FaqSection({
  subTitle = 'FAQ',
  heading = 'Frequently Asked Questions',
  description = 'Everything you need to know about working with 8webcom.com.',
  items,
}: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  if (!items?.length) return null;

  return (
    <section className="py-24 lg:py-32 bg-[#F6F8F9]" id="faq-sec" aria-labelledby={`${baseId}-title`}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div id={`${baseId}-title`}>
                <SectionHeader eyebrow={subTitle} title={heading} description={description} />
              </div>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.25, ease: EASE_OUT }}
              >
                <CtaLink href="/contacts" variant="dark">
                  Contact Us
                </CtaLink>
              </motion.div>
            </div>
          </div>

          <ul className="lg:col-span-8 flex flex-col gap-3">
            {items.map((item, i) => {
              const isOpen = open === i;
              const btnId = `${baseId}-q-${i}`;
              const panelId = `${baseId}-a-${i}`;
              return (
                <motion.li
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.8, delay: Math.min(i, 4) * 0.06, ease: EASE_OUT }}
                  className={cn(
                    'rounded-2xl bg-white border transition-colors duration-500',
                    isOpen ? 'border-[#0799B3]/30' : 'border-gray-200/80 hover:border-gray-300'
                  )}
                >
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-6 text-left px-6 sm:px-8 py-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded-2xl"
                    >
                      <span className="text-base sm:text-lg font-bold text-[#1F2429] tracking-tight leading-snug">
                        {item.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ease-out-expo',
                          isOpen ? 'bg-[#0799B3] text-white rotate-45' : 'bg-[#F6F8F9] text-[#1F2429]'
                        )}
                      >
                        <Plus className="w-5 h-5" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo',
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 sm:px-8 pb-7 -mt-1 text-gray-600 text-[15px] sm:text-base leading-relaxed max-w-3xl">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
