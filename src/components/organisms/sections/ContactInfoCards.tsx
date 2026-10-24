'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';
import { trackPointer } from '@/lib/utils';
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { staggerContainer } from '@/lib/animations';

type CardLabels = { title: string; subtitle: string; action: string };
export interface ContactCardLabels {
  address: CardLabels;
  phone: CardLabels;
  email: CardLabels;
  whatsapp: CardLabels;
}

interface ContactCard extends CardLabels {
  icon: typeof MapPin;
  value: string;
  href: string;
  accent: string;
}

interface InfoCardProps {
  card: ContactCard;
}

function InfoCard({ card }: InfoCardProps) {
  const Icon = card.icon;

  return (
    <m.a
      href={card.href}
      target={card.href.startsWith('http') ? "_blank" : undefined}
      rel={card.href.startsWith('http') ? "noopener noreferrer" : undefined}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 350, damping: 25 } 
      }}
      onMouseMove={trackPointer}
      className="group relative bg-white p-7 lg:p-8 rounded-3xl border border-gray-100/90 shadow-sm hover:shadow-2xl hover:border-[#0799B3]/40 transition-all duration-500 flex flex-col justify-between overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
    >
      {/* Interactive mouse spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at var(--mx) var(--my), ${card.accent}15, transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        <m.div 
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-sm group-hover:shadow-lg"
          style={{ 
            backgroundColor: `${card.accent}15`, 
            color: card.accent,
          }}
        >
          <Icon className="w-7 h-7" aria-hidden="true" />
        </m.div>

        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
          {card.subtitle}
        </span>
        
        <h3 className="text-xl font-extrabold text-[#1F2429] mb-3 group-hover:text-[#0799B3] transition-colors duration-300">
          {card.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed font-medium line-clamp-2">
          {card.value}
        </p>
      </div>

      <div className="relative z-10 pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0799B3] group-hover:text-[#0799B3] transition-colors duration-300">
        <span>{card.action}</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
      </div>
    </m.a>
  );
}

// Values: Sanity → Site Settings → Contact details. Labels: Sanity → Contact Page → Contact cards.
export function ContactInfoCards({ labels }: { labels: ContactCardLabels }) {
  const { contact } = useSiteSettings();
  const cards: ContactCard[] = [
    { ...labels.address, icon: MapPin, value: contact.addressShort, href: contact.mapsUrl, accent: "#0799B3" },
    { ...labels.phone, icon: Phone, value: contact.phone, href: `tel:${contact.phoneTel}`, accent: "#F58220" },
    { ...labels.email, icon: Mail, value: contact.email, href: `mailto:${contact.email}`, accent: "#0799B3" },
    { ...labels.whatsapp, icon: MessageCircle, value: contact.phone, href: contact.whatsappUrl, accent: "#25D366" },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gray-50/70 relative overflow-hidden">
      <h2 className="sr-only">Contact details</h2>
      {/* Subtle floating ambient background light */}

      <div className="container-site relative z-10">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
