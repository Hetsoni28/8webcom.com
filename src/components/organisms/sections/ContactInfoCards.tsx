'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTACT } from '@/lib/constants';
import { trackPointer } from '@/lib/utils';
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { staggerContainer } from '@/lib/animations';

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    subtitle: "Ahmedabad, India",
    value: CONTACT.addressShort,
    href: "https://maps.google.com/?q=Sun+Gravitas+Satellite+Ahmedabad",
    action: "View on Map",
    accent: "#0799B3",
  },
  {
    icon: Phone,
    title: "Call Our Team",
    subtitle: "Mon - Sat (9:30 AM - 7:00 PM)",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phoneTel}`,
    action: "Call Directly",
    accent: "#F58220",
  },
  {
    icon: Mail,
    title: "Email Inquiries",
    subtitle: "24/7 Response Time",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    action: "Send an Email",
    accent: "#0799B3",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Chat",
    subtitle: "Instant Consultation",
    value: "+91 97277 00459",
    href: CONTACT.whatsapp,
    action: "Chat on WhatsApp",
    accent: "#25D366",
  },
];

interface InfoCardProps {
  card: typeof CONTACT_CARDS[0];
}

function InfoCard({ card }: InfoCardProps) {
  const Icon = card.icon;

  return (
    <motion.a
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
        <motion.div 
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.15 }}
          transition={{ duration: 0.4 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-sm group-hover:shadow-lg"
          style={{ 
            backgroundColor: `${card.accent}15`, 
            color: card.accent,
          }}
        >
          <Icon className="w-7 h-7" aria-hidden="true" />
        </motion.div>

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
    </motion.a>
  );
}

export function ContactInfoCards() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50/70 relative overflow-hidden">
      {/* Subtle floating ambient background light */}

      <div className="container-site relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CONTACT_CARDS.map((card) => (
            <InfoCard key={card.title} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
