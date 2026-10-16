'use client';

import React from 'react';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Tag } from '@/components/atoms/Tag';

export interface CrmCardItem {
  id: number;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface CrmSolutionsSectionProps {
  subTitle?: string;
  heading?: string;
  description?: string;
  cards?: CrmCardItem[];
}

const CRM_TAGS: Record<string, string[]> = {
  'CRM Solutions': ['Custom Pipelines', 'Lead Management', 'Real-Time Sync'],
  'Managed CRM': ['Admin Partner', 'Workflow Support', 'Stress-Free Scaling'],
  'CRM Consulting': ['Audit & Roadmap', 'Process Automation', 'ROI Optimization'],
};

export function CrmSolutionsSection({
  subTitle = 'CRM Solutions',
  heading = 'Grow your business with smart CRM solutions',
  description = 'Tailored CRM platforms and automated workflows built specifically for your business processes.',
  cards = [],
}: CrmSolutionsSectionProps) {
  return (
    <section className="py-24 lg:py-32 scroll-mt-28 bg-white relative overflow-hidden" id="crm-solutions-sec">
      {/* Background Subtle Gradient Blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-[#0799B3]/5 blur-[120px]" />
        <div className="absolute bottom-10 -right-32 w-80 h-80 rounded-full bg-[#F58220]/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        
        {/* Section Header with Vibe-Coded Pill */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0799B3]/10 border border-[#0799B3]/20 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0799B3] animate-pulse" />
            <span className="text-[#0799B3] text-xs font-bold tracking-widest uppercase">
              {subTitle}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-black text-[#1F2429] tracking-tight leading-[1.15]"
          >
            {heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* 3-Column Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((item, idx) => {
            const tags = CRM_TAGS[item.title] || ['Fast Deployment', 'Secure Cloud', '24/7 Support'];

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative flex flex-col h-full bg-white rounded-[28px] border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(7,153,179,0.12)] hover:border-[#0799B3]/30 transition-all duration-500 overflow-hidden"
              >
                {/* Top Image Banner with Inset Frame */}
                <div className="p-4 pb-0">
                  <div className="relative h-[230px] w-full rounded-2xl overflow-hidden bg-gray-900">
                    <ImageWithSkeleton
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      skeletonClassName="bg-gray-800"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 pt-6 flex-1 flex flex-col text-left">
                  
                  {/* Feature Tags Pill Row */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <Tag
                        key={tag}
                        label={tag}
                        className="text-[11px] font-semibold px-2.5 py-0.5 group-hover:bg-[#0799B3]/10 group-hover:text-[#0799B3] transition-colors"
                      />
                    ))}
                  </div>

                  <h3 className="text-xl sm:text-[22px] font-bold text-[#1F2429] group-hover:text-[#0799B3] transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-sm sm:text-[14.5px] leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>

                  {/* Modern Vibe-Coded Button */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={item.href}
                      aria-label={`Explore CRM solution: ${item.title}`}
                      className="inline-flex items-center gap-2 bg-[#0799B3] hover:bg-[#1F2429] text-white text-xs sm:text-[13px] font-bold tracking-wider uppercase px-6 py-3 rounded-full transition-all duration-300 w-fit shadow-md shadow-[#0799B3]/25 group-hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2"
                    >
                      <span>More CRM</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
