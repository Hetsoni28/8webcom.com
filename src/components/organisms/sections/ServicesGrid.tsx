'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ServiceCard } from '@/components/molecules/ServiceCard';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { CtaLink } from '@/components/atoms/CtaLink';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Service } from '@/types';
import { DETAIL_QUALITY } from '@/lib/images';

export interface ServicesGridProps {
  heading: string;
  highlight?: string;
  headingSuffix?: string;
  subTitle: string;
  description?: string;
  services: Service[];
  showCta?: boolean;
}

export function ServicesGrid({
  heading,
  highlight,
  headingSuffix,
  subTitle,
  description,
  services,
  showCta = true,
}: ServicesGridProps) {
  const [active, setActive] = useState(0);
  const title = [heading, highlight, headingSuffix].filter(Boolean).join(' ');

  return (
    <section className="py-24 lg:py-32 bg-[#F6F8F9]" id="services-sec">
      <div className="container-site">
        <SectionHeader
          eyebrow={subTitle}
          title={title}
          description={description}
          className="mb-14 lg:mb-20"
          aside={
            showCta ? (
              <CtaLink href="/services" variant="outline">
                View All Services
              </CtaLink>
            ) : undefined
          }
        />

        {/* ── Desktop: interactive index + live preview ── */}
        <div className="hidden lg:grid grid-cols-12 gap-12 xl:gap-20 items-center">
          <ul className="col-span-7">
            {services.map((service, i) => {
              const isActive = i === active;
              return (
                <motion.li
                  key={service.id ?? i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, delay: i * 0.08, ease: EASE_OUT }}
                  className="relative border-t border-gray-300/70 last:border-b"
                >
                  {/* Active rule */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -top-px left-0 h-0.5 w-full bg-[#0799B3] origin-left transition-transform duration-700 ease-out-expo',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                  <Link
                    href={service.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group block py-8 focus-visible:outline-none"
                  >
                    <div className="flex items-center gap-8">
                      <span
                        className={cn(
                          'text-sm font-semibold tabular-nums w-8 shrink-0 transition-colors duration-500',
                          isActive ? 'text-[#0799B3]' : 'text-gray-400'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3
                        className={cn(
                          'flex-1 text-[40px] xl:text-[52px] font-extrabold tracking-[-0.035em] leading-none transition-[color,transform] duration-700 ease-out-expo',
                          isActive ? 'text-[#1F2429] translate-x-2' : 'text-gray-400 group-focus-visible:text-[#1F2429]'
                        )}
                      >
                        {service.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-700 ease-out-expo',
                          isActive
                            ? 'bg-[#0799B3] text-white rotate-0 scale-100 opacity-100'
                            : 'bg-transparent text-gray-400 -rotate-45 scale-75 opacity-0'
                        )}
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </span>
                    </div>

                    {/* Description expands under the active title */}
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo',
                        isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="pl-16 pt-4 max-w-lg text-gray-600 text-base leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          {/* Preview frame */}
          <motion.div
            className="col-span-5 relative aspect-4/5 rounded-2xl overflow-hidden bg-[#1F2429]"
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 16px)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 16px)', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.3, ease: EASE_OUT }}
          >
            {/* All previews stay mounted (no load flash on hover); CSS crossfades them */}
            {services.map((service, i) => (
              <div
                key={service.id ?? i}
                aria-hidden={i !== active}
                className={cn(
                  'absolute inset-0 transition-[opacity,transform] duration-900 ease-out-expo',
                  i === active ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.08]'
                )}
              >
                <Image
                  src={service.image}
                  alt={`${service.title} by 8webcom.com, Ahmedabad`}
                  fill
                  sizes="(max-width: 1280px) 40vw, 520px"
                  quality={DETAIL_QUALITY}
                  className="object-cover"
                />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent pointer-events-none" />
            <div className="absolute left-6 right-6 bottom-6 flex items-end justify-between text-white pointer-events-none">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  className="text-xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  {services[active]?.title}
                </motion.span>
              </AnimatePresence>
              <span className="text-sm font-semibold tabular-nums text-white/60">
                {String(active + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── Mobile / tablet: card grid ── */}
        <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((service, index) => (
            <motion.div
              key={service.id ?? index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: EASE_OUT }}
              className="reveal-media"
            >
              <ServiceCard
                number={String(index + 1).padStart(2, '0')}
                title={service.title}
                href={service.href}
                image={service.image}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
