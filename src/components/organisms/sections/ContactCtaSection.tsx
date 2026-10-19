'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { CONTACT } from '@/lib/constants';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { CtaLink } from '@/components/atoms/CtaLink';
import { EASE_OUT, VIEWPORT } from '@/lib/animations';

export interface ContactCtaSectionProps {
  subTitle?: string;
  heading?: string;
  description?: string;
  phone?: string;
  email?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ContactCtaSection({
  subTitle = 'Need Expert Help?',
  heading = "Have a Project in Mind? Let's Talk!",
  description = 'Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days.',
  phone = CONTACT.phone,
  email = CONTACT.email,
  ctaLabel = 'Get in Touch with Us',
  ctaHref = '/contacts',
}: ContactCtaSectionProps) {
  const phoneTel = phone ? phone.replace(/\s+/g, '') : CONTACT.phoneTel;

  const channels = [
    phone && { href: `tel:${phoneTel}`, label: 'Call us', value: phone, Icon: Phone, accent: '#0799B3' },
    email && { href: `mailto:${email}`, label: 'Email us', value: email, Icon: Mail, accent: '#F58220' },
  ].filter(Boolean) as { href: string; label: string; value: string; Icon: typeof Phone; accent: string }[];

  return (
    <section className="relative py-24 lg:py-32 bg-[#1F2429] overflow-hidden" id="contact-cta-sec">
      {/* Top rule that draws across on reveal */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#0799B3] to-[#F58220] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
      />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <SectionHeader
              eyebrow={subTitle}
              title={heading}
              description={description}
              theme="dark"
              titleClassName="text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.05]"
            />
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
            >
              <CtaLink href={ctaHref} size="lg">
                {ctaLabel}
              </CtaLink>
            </motion.div>
          </div>

          <ul className="lg:col-span-5 flex flex-col">
            {channels.map(({ href, label, value, Icon, accent }, i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: EASE_OUT }}
                className="border-t border-white/10 last:border-b"
              >
                <a
                  href={href}
                  className="group flex items-center gap-5 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1F2429] rounded-sm"
                >
                  <span
                    className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:border-transparent"
                    style={{ color: accent }}
                  >
                    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[12px] font-bold uppercase tracking-[0.16em] text-gray-500 mb-1">{label}</span>
                    <span className="block text-lg sm:text-xl font-semibold text-white truncate transition-colors duration-300 group-hover:text-[#0799B3]">
                      {value}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 text-white/40 shrink-0 transition-[transform,color] duration-500 ease-out-expo group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
