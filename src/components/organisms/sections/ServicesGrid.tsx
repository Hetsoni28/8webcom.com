'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { ServiceCard } from '@/components/molecules/ServiceCard';
import { Button } from '@/components/atoms/Button';
import { Reveal } from '@/components/atoms/Reveal';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { Service } from '@/types';

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
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <Reveal variants={fadeUp}>
            <SectionTitle
              subTitle={subTitle}
              heading={heading}
              highlight={highlight}
              headingSuffix={headingSuffix}
              description={description}
              className="max-w-2xl"
            />
          </Reveal>
          {showCta && (
            <Reveal variants={fadeUp} delay={0.15}>
              <Button variant="outlined" size="md" href="/services">
                View All Services
              </Button>
            </Reveal>
          )}
        </div>

        {/* Cards grid — staggered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={staggerItem}>
              <ServiceCard
                number={String(index + 1).padStart(2, '0')}
                title={service.title}
                href={service.href}
                image={service.image}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
