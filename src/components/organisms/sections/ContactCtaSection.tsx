'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight, MessageSquare } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

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

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#1F2429]" id="contact-cta-sec">
      {/* Background subtle geometric accents */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#0799B3] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#F58220] blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Subtitle */}
          <span className="text-[#0799B3] text-sm font-bold tracking-widest uppercase block mb-3">
            {subTitle}
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {heading}
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {description}
          </p>

          {/* Contact Badges & CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10">
            {phone && (
              <a
                href={`tel:${phoneTel}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-sm border border-white/15 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2429]"
              >
                <Phone className="w-4 h-4 text-[#0799B3]" aria-hidden="true" />
                <span>{phone}</span>
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-sm border border-white/15 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F58220] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2429]"
              >
                <Mail className="w-4 h-4 text-[#F58220]" aria-hidden="true" />
                <span>{email}</span>
              </a>
            )}
          </div>

          {/* Primary Action Button */}
          <div>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-3 bg-[#0799B3] hover:bg-[#F58220] text-white font-bold text-base px-8 py-4 rounded-full shadow-xl shadow-[#0799B3]/25 hover:shadow-[#F58220]/25 transition-all duration-300 hover:scale-105 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F2429]"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
