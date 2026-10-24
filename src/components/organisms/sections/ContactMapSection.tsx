'use client';

import React from 'react';
import { m } from 'framer-motion';
import { useSiteSettings } from '@/components/providers/SiteSettingsProvider';
import { MapPin, Navigation } from 'lucide-react';

// Map + address: Sanity → Site Settings → Contact details. Card title: Contact Page.
export function ContactMapSection({ title }: { title: string }) {
  const { contact } = useSiteSettings();
  return (
    <section className="pb-24 lg:pb-32 bg-white relative">
      <div className="container-site">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-gray-200/80 shadow-xl bg-gray-100 h-[450px] lg:h-[500px]"
        >
          {/* Responsive Google Maps Embed centered on Sun Gravitas Satellite Ahmedabad */}
          <iframe
            title="8webcom Office Location"
            src={contact.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[20%] contrast-[1.05]"
          />

          {/* Floating Location Card Overlay with Spring Physics & Radar Ping */}
          <m.div 
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ y: -4, transition: { type: "spring", stiffness: 350, damping: 25 } }}
            className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 flex items-start gap-4 transition-shadow hover:shadow-2xl"
          >
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#0799B3] text-white flex items-center justify-center shadow-md shadow-[#0799B3]/30">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0799B3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0799B3]"></span>
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-[#1F2429] mb-1">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-medium">
                {contact.address}
              </p>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#0799B3] hover:underline mt-2"
              >
                <Navigation className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
                Get Directions
              </a>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
