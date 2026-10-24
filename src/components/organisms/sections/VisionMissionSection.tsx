'use client';

import React from 'react';
import { m } from 'framer-motion';

export interface VisionMissionItem {
  id: string;
  title: string;
  description: string;
  icon: 'vision' | 'mission' | 'quality';
}

const ITEMS: VisionMissionItem[] = [
  {
    id: 'vision',
    title: 'Our Vision',
    icon: 'vision',
    description:
      'Our vision is to lead globally in IT solutions and services by fostering innovation, delivering excellence, and upholding ethical business strategies—while creating meaningful value for society.',
  },
  {
    id: 'mission',
    title: 'Our Mission',
    icon: 'mission',
    description:
      'Our mission is to create innovative products and deliver exceptional services. We believe technology should empower people and enable a better environment, which is why we place quality and value at the forefront of everything we do.',
  },
  {
    id: 'quality',
    title: 'Quality Policy',
    icon: 'quality',
    description:
      'We deliver effective, high-quality solutions and services that meet project requirements and consistently achieve excellence, guided by our globally aligned quality management standards.',
  },
];

function CardIcon({ type }: { type: 'vision' | 'mission' | 'quality' }) {
  if (type === 'vision') {
    return (
      <div className="w-16 h-16 flex items-center justify-center">
        <svg
          className="w-14 h-14 text-[#0799B3]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Eye Silhouette */}
          <path
            d="M32 16C19 16 8 25.5 4 32C8 38.5 19 48 32 48C45 48 56 38.5 60 32C56 25.5 45 16 32 16Z"
            fill="currentColor"
          />
          {/* Outer Ring / Sclera */}
          <circle cx="32" cy="32" r="9.5" fill="white" />
          {/* Pupil */}
          <circle cx="32" cy="32" r="5.5" fill="#1F2429" />
          {/* Eye Highlight */}
          <circle cx="34" cy="30" r="1.5" fill="white" />
        </svg>
      </div>
    );
  }

  if (type === 'mission') {
    return (
      <div className="w-16 h-16 flex items-center justify-center">
        <svg
          className="w-14 h-14 text-[#0799B3]"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Solid Target Disc */}
          <circle cx="30" cy="34" r="22" fill="currentColor" />
          {/* White Outer Target Ring */}
          <circle cx="30" cy="34" r="15" fill="white" />
          {/* Inner Teal Bullseye */}
          <circle cx="30" cy="34" r="8.5" fill="currentColor" />
          {/* Center White Pin */}
          <circle cx="30" cy="34" r="3" fill="white" />
          {/* Arrow Hitting the Center */}
          <path
            d="M52 12L34 30"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Arrow Flights */}
          <path
            d="M44 11H53V20"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <svg
        className="w-14 h-14 text-[#0799B3]"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Scalloped Rosette Ribbon Seal */}
        <circle cx="32" cy="28" r="18" fill="currentColor" />
        {/* Scallop Dots */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          // Rounded: server (Node) and browser trig differ in the last digits,
          // which caused a React hydration mismatch on these attributes.
          const x = Math.round((32 + 18 * Math.cos(angle)) * 1000) / 1000;
          const y = Math.round((28 + 18 * Math.sin(angle)) * 1000) / 1000;
          return <circle key={i} cx={x} cy={y} r="3.5" fill="currentColor" />;
        })}
        {/* White Inner Badge Circle */}
        <circle cx="32" cy="28" r="12" fill="white" />
        {/* Center Checkmark */}
        <path
          d="M27 28L30.5 31.5L37 25"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Ribbon Tails */}
        <path
          d="M24 40L20 54L27 50L31 53L29 40"
          fill="currentColor"
        />
        <path
          d="M40 40L44 54L37 50L33 53L35 40"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function VisionMissionSection({ items = ITEMS }: { items?: VisionMissionItem[] }) {
  return (
    <section className="py-20 lg:py-28 bg-[#FBFBFC] relative overflow-hidden" id="vision-mission-sec">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {items.map((item, idx) => (
            <m.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 flex flex-col items-center text-center shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_45px_rgba(7,153,179,0.12)] transition-all duration-400"
            >
              {/* Top Vector Icon matching screenshot */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <CardIcon type={item.icon} />
              </div>

              {/* Heading */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F2429] mb-4 tracking-tight group-hover:text-[#0799B3] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed select-text flex-1">
                {item.description}
              </p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
