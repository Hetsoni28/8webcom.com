import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageWithSkeleton } from "@/components/atoms/ImageWithSkeleton";

interface ServiceCardProps {
  number: string;
  title: string;
  href: string;
  image: string;
  className?: string;
}

export function ServiceCard({
  number,
  title,
  href,
  image,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      aria-label={`Service ${number}: ${title}`}
      className={cn(
        "relative block overflow-hidden rounded-3xl group cursor-pointer h-72 lg:h-[22rem] w-full shadow-lg hover:shadow-2xl hover:shadow-[#0799B3]/20 transition-all duration-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0799B3] focus-visible:ring-offset-4",
        className
      )}
    >
      <ImageWithSkeleton
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        skeletonClassName="bg-gray-800/80"
      />
      
      {/* Overlay gradient - becomes slightly more opaque on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/50 transition-colors duration-500" />
      
      {/* Top right number - smoothly slides up on hover */}
      <div className="absolute top-6 right-6 text-white/20 font-black text-6xl transform group-hover:-translate-y-2 group-hover:text-white/30 transition-all duration-500 pointer-events-none select-none">
        {number}
      </div>

      {/* Bottom content - Perfectly aligned horizontally across all cards with items-center */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-center justify-between gap-4">
        <h3 className="text-white text-xl sm:text-2xl font-bold flex-1 transform group-hover:-translate-y-0.5 transition-transform duration-300 leading-snug">
          {title}
        </h3>
        
        {/* Animated Arrow Button — Perfectly centered with zero peeking artifact */}
        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0799B3] flex items-center justify-center overflow-hidden shrink-0 transform group-hover:scale-105 group-hover:bg-[#F58220] transition-all duration-300 shadow-md isolate">
          {/* Default Arrow: slides out to top-right on hover */}
          <ArrowUpRight className="w-5 h-5 text-white transform transition-all duration-300 group-hover:translate-x-8 group-hover:-translate-y-8 group-hover:opacity-0" />
          
          {/* Incoming Arrow: strictly opacity-0 and translated far offscreen until hover */}
          <ArrowUpRight className="w-5 h-5 text-white absolute transform -translate-x-8 translate-y-8 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>

      {/* Subtle border that glows on hover */}
      <div className="absolute inset-0 border border-white/10 rounded-3xl group-hover:border-[#0799B3]/50 transition-colors duration-500 pointer-events-none" />
    </Link>
  );
}
