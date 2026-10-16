'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Heading } from "@/components/atoms/Heading";
import { Service } from "@/types";

interface ServiceShowcaseProps {
  service: Service;
  index: number;
}

export function ServiceShowcase({ service, index }: ServiceShowcaseProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  const isEven = index % 2 === 1;

  return (
    <div ref={ref} className="py-24 lg:py-36 relative overflow-hidden group">
      {/* Background ambient glow */}
      <div className={`absolute top-1/2 ${isEven ? 'left-0' : 'right-0'} w-[600px] h-[600px] bg-[${isEven ? '#0799B3' : '#F58220'}]/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none transition-all duration-1000 group-hover:scale-110`} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}>
          
          {/* Image Side with Parallax */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-[400px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <motion.div style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/80 via-transparent to-transparent opacity-80" />
              
              {/* Giant floating number */}
              <div className="absolute top-8 left-8 text-white/20 font-black text-8xl tracking-tighter backdrop-blur-sm px-4 rounded-xl border border-white/10 mix-blend-overlay">
                {service.id}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center min-w-0">
            <motion.div
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="break-words"
            >
              <Heading as="h2" size="beast" className="mb-6">
                {service.title}
              </Heading>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10">
                {service.description}
              </p>
              
              {/* Dummy feature list to make the UI look massive */}
              <ul className="space-y-4 mb-10">
                {["Strategic Planning & Strategy", "Seamless Integration", "Performance Optimized"].map((feat, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center gap-3 text-[#1F2429] font-medium"
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#0799B3]" />
                    {feat}
                  </motion.li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                href={service.href}
                aria-label={`Explore ${service.title}`}
                icon={<ArrowUpRight className="w-5 h-5" aria-hidden="true" />}
                className="bg-[#0B1120] hover:bg-[#F58220] shadow-lg hover:shadow-2xl hover:shadow-[#F58220]/30 hover:-translate-y-1"
              >
                Explore Service
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
