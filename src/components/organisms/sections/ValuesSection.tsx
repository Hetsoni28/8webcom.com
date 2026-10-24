'use client';

import { m } from 'framer-motion';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';

export interface ValueItem {
  title: string;
  description: string;
}

const ACCENTS = ['#0799B3', '#F58220', '#1F2429', '#0799B3'];

export function ValuesSection({
  subTitle = 'Our Values',
  heading = 'The Principles Behind Our Work',
  values,
}: {
  subTitle?: string;
  heading?: string;
  values: readonly ValueItem[];
}) {
  if (!values?.length) return null;

  return (
    <section className="py-24 lg:py-32 bg-white" id="values-sec">
      <div className="container-site">
        <SectionHeader eyebrow={subTitle} title={heading} className="mb-14 lg:mb-16" />

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {values.map((v, i) => (
            <m.li
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE_OUT }}
              className="group relative pt-8 border-t border-gray-200"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out-expo"
                style={{ background: ACCENTS[i % ACCENTS.length] }}
              />
              <span className="block text-sm font-semibold tabular-nums text-gray-400 mb-5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold text-[#1F2429] tracking-tight mb-2.5">{v.title}</h3>
              <p className="text-gray-600 text-[15px] leading-relaxed">{v.description}</p>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
