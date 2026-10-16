'use client';

import React, { useState } from 'react';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/lib/data';
import { SectionTitle } from '@/components/molecules/SectionTitle';
import { Reveal } from '@/components/atoms/Reveal';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/animations';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { Tag } from '@/components/atoms/Tag';
import { Project } from '@/types';

interface ProjectsGridProps {
  projects?: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps = {}) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const safeProjects = projects && projects.length > 0 ? projects : PROJECTS;
  const categories = ['All', ...Array.from(new Set(safeProjects.map(p => p.category)))];
  
  const filteredProjects = activeCategory === 'All' 
    ? safeProjects 
    : safeProjects.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 lg:py-36 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header & Filters */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <Reveal variants={fadeUp} className="max-w-3xl">
            <SectionTitle 
              heading="Showcasing Our Best"
              highlight="Work"
              description="Explore our recent projects and see how we've helped businesses transform their digital presence and achieve their goals."
            />
          </Reveal>
          
          <Reveal variants={fadeUp}>
            <div className="flex flex-wrap gap-3" role="tablist" aria-label="Project category filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2 ${
                    activeCategory === cat 
                      ? 'bg-[#0799B3] border-[#0799B3] text-white' 
                      : 'bg-transparent border-gray-300 text-gray-700 hover:border-[#0799B3] hover:text-[#0799B3]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer flex flex-col h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0799B3] focus-visible:ring-offset-4 rounded-3xl p-1"
                tabIndex={0}
                role="article"
                aria-label={`Project: ${project.title} for ${project.client}`}
              >
                {/* Image Card */}
                <div className="relative h-[400px] rounded-3xl overflow-hidden mb-6 bg-gray-200 shadow-xl">
                  <ImageWithSkeleton 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-focus-visible:scale-110" 
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2429]/90 via-[#1F2429]/40 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 group-focus-visible:translate-y-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500">
                    <div className="flex gap-2 flex-wrap mb-4">
                      {project.tags.map(tag => (
                        <Tag
                          key={tag}
                          label={tag}
                          className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md px-3 py-1"
                        />
                      ))}
                    </div>
                    <p className="text-white/80 line-clamp-3 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Top Right Icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center transform translate-x-4 -translate-y-4 opacity-0 group-hover:translate-x-0 group-focus-visible:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500 shadow-xl z-20">
                    <ArrowUpRight className="w-6 h-6 text-[#1F2429]" aria-hidden="true" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-grow flex flex-col">
                  <Badge label={project.category} variant="primary" className="self-start mb-4" />
                  <h3 className="text-2xl font-black text-[#1F2429] group-hover:text-[#0799B3] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 font-medium">
                    Client: <span className="text-[#1F2429]">{project.client}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </section>
  );
}
