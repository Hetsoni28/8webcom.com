'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from '@/components/atoms/Logo';
import { Divider } from '@/components/atoms/Divider';
import { SocialLink } from '@/components/molecules/SocialLink';
import { FooterLink } from '@/components/molecules/FooterLink';
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
  LinkedInIcon,
  YouTubeIcon,
  XIcon,
  PinterestIcon,
} from '@/components/atoms/SocialIcons';
import { MapPin, Phone, Mail, Globe, Award, Users, Clock } from 'lucide-react';
import {
  FOOTER_USEFUL_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_COMPANY_LINKS,
  CONTACT,
  SOCIAL,
} from '@/lib/constants';
import { fadeLeft, staggerContainer, staggerItem } from '@/lib/animations';

const STATS = [
  { icon: Clock,  value: '10+',   label: 'Years Experience' },
  { icon: Users,  value: '1000+', label: 'Happy Clients' },
  { icon: Award,  value: '1500+', label: 'Project Completed' },
  { icon: Globe,  value: '10+',   label: 'Countries Clients Served' },
];

const SOCIAL_ICONS = [
  { platform: 'Facebook',  icon: FacebookIcon,  href: 'https://www.facebook.com/8webcom' },
  { platform: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/8webcom/' },
  { platform: 'WhatsApp',  icon: WhatsAppIcon,  href: CONTACT.whatsapp },
  { platform: 'LinkedIn',  icon: LinkedInIcon,  href: 'https://www.linkedin.com/company/8webcom' },
  { platform: 'YouTube',   icon: YouTubeIcon,   href: 'https://www.youtube.com/@8webcom' },
  { platform: 'X',         icon: XIcon,         href: 'https://x.com/coo8webcom' },
  { platform: 'Pinterest', icon: PinterestIcon, href: 'https://in.pinterest.com/8webcom/' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B131D] text-white overflow-hidden">

      {/* ── Decorative background shapes ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#0799B3]/5 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-[#F58220]/5 blur-3xl" />
      </div>

      {/* ══════════════════════════════════════════
          TOP BAND — Brand + Tagline + Stats
      ══════════════════════════════════════════ */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* Left: Logo + Socials — slide from left */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="max-w-sm space-y-5"
            >
              <Logo width={180} />
              {/* Social icons */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {SOCIAL_ICONS.map(s => (
                  <SocialLink key={s.platform} platform={s.platform} icon={s.icon} href={s.href} />
                ))}
              </div>
            </motion.div>

            {/* Right: Stats Grid — stagger from right */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              {STATS.map(({ icon: Icon, value, label }) => (
                <motion.div
                  key={label}
                  variants={staggerItem}
                  className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0799B3]/50 transition-colors min-w-[110px]"
                >
                  <div className="w-10 h-10 rounded-full bg-[#0799B3]/15 flex items-center justify-center mb-3">
                    <Icon className="text-[#0799B3]" size={18} />
                  </div>
                  <span className="text-3xl font-black text-white leading-none">{value}</span>
                  <span className="text-gray-400 text-xs mt-1.5 leading-snug">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MIDDLE — Links + Contact Grid
      ══════════════════════════════════════════ */}
      <div className="relative">
        <div className="container mx-auto px-4 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Column 1: Company */}
            <div>
              <h5 className="text-white text-base font-bold mb-6 flex items-center gap-2">
                <Divider color="primary" className="w-6" />
                Company
              </h5>
              <div className="flex flex-col gap-3">
                {FOOTER_COMPANY_LINKS.map(link => (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </div>

            {/* Column 2: Useful Links */}
            <div>
              <h5 className="text-white text-base font-bold mb-6 flex items-center gap-2">
                <Divider color="primary" className="w-6" />
                Useful Links
              </h5>
              <div className="flex flex-col gap-3">
                {FOOTER_USEFUL_LINKS.map(link => (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </div>

            {/* Column 3: Our Services */}
            <div>
              <h5 className="text-white text-base font-bold mb-6 flex items-center gap-2">
                <Divider color="secondary" className="w-6" />
                Our Services
              </h5>
              <div className="flex flex-col gap-3">
                {FOOTER_SERVICE_LINKS.map(link => (
                  <FooterLink key={link.label} label={link.label} href={link.href} />
                ))}
              </div>
            </div>

            {/* Column 4: Get In Touch */}
            <div>
              <h5 className="text-white text-base font-bold mb-6 flex items-center gap-2">
                <Divider color="secondary" className="w-6" />
                Get In Touch
              </h5>
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0799B3]/15 border border-[#0799B3]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="text-[#0799B3]" size={15} />
                  </div>
                  <span className="text-gray-400 text-sm leading-relaxed">
                    503, Sun Gravitas, Near Shyamal Cross Rd,<br />
                    Satellite, Ahmedabad, Gujarat&nbsp;–&nbsp;380015
                  </span>
                </div>
                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0799B3]/15 border border-[#0799B3]/30 flex items-center justify-center shrink-0">
                    <Phone className="text-[#0799B3]" size={15} aria-hidden="true" />
                  </div>
                  <a href={`tel:${CONTACT.phoneTel}`} className="text-gray-400 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded px-1">
                    {CONTACT.phone}
                  </a>
                </div>
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0799B3]/15 border border-[#0799B3]/30 flex items-center justify-center shrink-0">
                    <Mail className="text-[#0799B3]" size={15} aria-hidden="true" />
                  </div>
                  <a href={`mailto:${CONTACT.email}`} className="text-gray-400 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded px-1">
                    {CONTACT.email}
                  </a>
                </div>
                {/* Website */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0799B3]/15 border border-[#0799B3]/30 flex items-center justify-center shrink-0">
                    <Globe className="text-[#0799B3]" size={15} aria-hidden="true" />
                  </div>
                  <a href="https://www.8webcom.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] rounded px-1">
                    www.8webcom.com
                  </a>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b558] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B131D]"
                >
                  <WhatsAppIcon size={16} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM BAR — Copyright + Legal
      ══════════════════════════════════════════ */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            Copyright &copy; {currentYear}&nbsp;
            <span className="text-[#F58220] font-semibold">8</span>
            <span className="text-[#0799B3] font-semibold">webcom.com</span>
            &nbsp;— All Rights Reserved.
          </p>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <Link href="/disclaimer-policy" className="text-xs text-gray-500 hover:text-white transition-colors px-3 py-1 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]">
              Disclaimer Policy
            </Link>
            <span className="text-gray-700 text-xs" aria-hidden="true">|</span>
            <Link href="/refund-and-cancellation-policy" className="text-xs text-gray-500 hover:text-white transition-colors px-3 py-1 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]">
              Refund &amp; Cancellation
            </Link>
            <span className="text-gray-700 text-xs" aria-hidden="true">|</span>
            <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-white transition-colors px-3 py-1 rounded-full hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
