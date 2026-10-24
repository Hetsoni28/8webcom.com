'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/molecules/SectionHeader';
import { EASE_OUT } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { Project } from '@/types';

interface ProjectsGridProps {
  projects: Project[];
  subTitle?: string;
  heading?: string;
  description?: string;
}

// Category filters only help when there are a handful of groups
const MAX_FILTERS = 6;

export function ProjectsGrid({ projects, subTitle, heading = '', description }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const showFilters = categories.length > 1 && categories.length <= MAX_FILTERS;
  const visible =
    !showFilters || activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 lg:py-32 bg-white" id="projects-sec">
      <div className="container-site">
        <SectionHeader
          eyebrow={subTitle}
          title={heading}
          description={description}
          className="mb-12 lg:mb-14"
        />

        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-12" role="tablist" aria-label="Project category filter">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'h-10 px-5 rounded-full text-sm font-semibold transition-colors duration-300 border cursor-pointer',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2',
                  activeCategory === cat
                    ? 'bg-[#1F2429] border-[#1F2429] text-white'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-[#1F2429]'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => {
              const Wrapper = project.url ? 'a' : 'div';
              return (
                <motion.li
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: EASE_OUT }}
                  className="reveal-media"
                >
                  <Wrapper
                    {...(project.url
                      ? {
                          href: project.url,
                          target: '_blank',
                          rel: 'noopener noreferrer',
                        }
                      : {})}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-4 rounded-2xl"
                  >
                    <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-[#F1F4F6] border border-gray-200/80">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top transition-[object-position] duration-3500 ease-in-out group-hover:object-bottom"
                      />
                      {project.url && (
                        <span className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white text-[#1F2429] flex items-center justify-center shadow-md opacity-0 translate-y-2 transition-[opacity,transform] duration-500 ease-out-expo group-hover:opacity-100 group-hover:translate-y-0">
                          <ArrowUpRight className="w-4.5 h-4.5" aria-hidden="true" />
                        </span>
                      )}
                    </div>

                    <div className="pt-5">
                      {project.category && (
                        <span className="block text-[12px] font-bold uppercase tracking-[0.16em] text-[#0799B3] mb-1.5">
                          {project.category}
                        </span>
                      )}
                      <h3 className="text-lg sm:text-xl font-bold text-[#1F2429] tracking-tight leading-snug transition-colors duration-300 group-hover:text-[#0799B3]">
                        {project.title}
                      </h3>
                      {project.client && project.client !== project.title && (
                        <p className="mt-1 text-sm text-gray-500">Client: {project.client}</p>
                      )}
                      {project.description && (
                        <p className="mt-2.5 text-[15px] text-gray-600 leading-relaxed line-clamp-2">{project.description}</p>
                      )}
                      {project.tags?.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <li key={tag} className="text-[11.5px] font-semibold text-gray-600 bg-[#F6F8F9] border border-gray-200/70 rounded-full px-2.5 py-1">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Wrapper>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
