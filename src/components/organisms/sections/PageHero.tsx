import React from 'react';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import { Heading } from '@/components/atoms/Heading';
import { Badge } from '@/components/atoms/Badge';

export interface PageHeroProps {
  title: React.ReactNode;
  highlight?: string;
  titleSuffix?: string;
  subTitle?: string;
  image?: string;
}

export function PageHero({ title, highlight, titleSuffix, subTitle, image }: PageHeroProps) {
  const renderTitle = () => (
    <>
      {title}
      {highlight && (
        <>
          {" "}
          <span className="text-[#0799B3]">{highlight}</span>
        </>
      )}
      {titleSuffix && ` ${titleSuffix}`}
    </>
  );

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#1F2429] overflow-hidden">
      {image && (
        <div className="absolute inset-0 z-0">
          <ImageWithSkeleton 
            src={image}
            alt={typeof title === 'string' ? title : "Hero Image"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
            skeletonClassName="bg-gray-900"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1F2429] to-transparent pointer-events-none" />
        </div>
      )}
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-[#0799B3]/10 to-transparent z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F58220]/10 rounded-full blur-3xl z-0" />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center max-w-4xl">
        {subTitle && (
          <Badge variant="primary" label={subTitle} className="mb-6" />
        )}
        <Heading as="h1" size="beast" color="white">
          {renderTitle()}
        </Heading>
      </div>
    </section>
  );
}

