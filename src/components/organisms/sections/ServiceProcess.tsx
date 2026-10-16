'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from "@/components/atoms/Reveal";
import { fadeUp } from "@/lib/animations";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    description: "We dive deep into your business goals, target audience, and competitive landscape to craft a bulletproof digital strategy.",
  },
  {
    num: "02",
    title: "UI/UX Design",
    description: "Our world-class designers create stunning, user-centric interfaces that captivate your audience and drive massive conversions.",
  },
  {
    num: "03",
    title: "Agile Development",
    description: "Using the latest tech stacks, our engineers build blazing fast, highly secure, and scalable solutions tailored to your needs.",
  },
  {
    num: "04",
    title: "Testing & Deployment",
    description: "Rigorous QA testing ensures a flawless launch, followed by continuous monitoring and optimization for maximum ROI.",
  },
];

export function ServiceProcess() {
  const containerRef = useRef(null);
  
  return (
    <section className="py-24 lg:py-36 bg-gray-50 relative" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        
        <Reveal variants={fadeUp} className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#F58220]/10 text-[#F58220] font-bold text-sm tracking-widest uppercase mb-6">
            How We Work
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1F2429] mb-6 tracking-tight">Our Proven Process</h2>
          <p className="text-gray-500 text-xl">A transparent, results-driven methodology designed to guarantee your success.</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          {/* Left Side: Sticky Image / Graphic */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32 w-full h-[600px] rounded-[3rem] bg-[#0B1120] overflow-hidden shadow-2xl flex items-center justify-center border border-gray-800">
              {/* Abstract Animated Core */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0799B3]/20 via-transparent to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="relative w-64 h-64 border border-[#F58220]/30 rounded-full flex items-center justify-center before:absolute before:inset-0 before:border before:border-[#0799B3]/50 before:rounded-full before:animate-[spin_10s_linear_infinite]">
                <div className="w-48 h-48 border border-white/10 rounded-full flex items-center justify-center before:absolute before:inset-0 before:border before:border-[#F58220]/50 before:rounded-full before:animate-[spin_7s_linear_infinite_reverse]">
                  <div className="w-32 h-32 bg-gradient-to-tr from-[#0799B3] to-[#F58220] rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="absolute font-black text-white text-3xl tracking-widest uppercase mix-blend-overlay">SYSTEM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Scrolling Steps */}
          <div className="space-y-32 py-10 lg:py-32">
            {PROCESS_STEPS.map((step, idx) => (
              <StepItem key={idx} step={step} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function StepItem({ step }: { step: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  // Animate opacity based on scroll position (lights up when in center)
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  return (
    <motion.div ref={ref} style={{ opacity, scale }} className="relative">
      <div className="absolute -left-8 lg:-left-16 top-0 text-[#0799B3]/10 font-black text-8xl md:text-9xl leading-none -z-10">
        {step.num}
      </div>
      <h3 className="text-3xl md:text-5xl font-black text-[#1F2429] mb-6">{step.title}</h3>
      <p className="text-xl text-gray-500 leading-relaxed font-medium">{step.description}</p>
      
      {/* Decorative Line */}
      <div className="w-16 h-1 mt-8 bg-gradient-to-r from-[#0799B3] to-[#F58220] rounded-full" />
    </motion.div>
  );
}
