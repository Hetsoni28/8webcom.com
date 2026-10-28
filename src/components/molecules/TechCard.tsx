import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithSkeleton } from '@/components/atoms/ImageWithSkeleton';
import { cn } from '@/lib/utils';
import { DETAIL_QUALITY } from '@/lib/images';

export interface TechCardProps {
  name: string;
  image: string;
  icon: string;
  description: string;
  className?: string;
}

export function TechCard({ name, image, icon, description, className }: TechCardProps) {
  return (
    <Link
      href="/services"
      className={cn(
        'group flex flex-col h-full rounded-2xl bg-[#F6F8F9] p-2.5 transition-colors duration-500 ease-out-expo hover:bg-[#EEF3F5]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2',
        className
      )}
    >
      {/* Cover */}
      <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-gray-200">
        <ImageWithSkeleton
          src={image}
          alt={`${name} services – 8webcom.com`}
          fill
          sizes="(max-width: 768px) 78vw, (max-width: 1024px) 45vw, 300px"
          quality={DETAIL_QUALITY}
          className="object-cover group-hover:scale-[1.04] duration-1200 ease-out-expo"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-3.5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          {icon && (
            <span className="w-10 h-10 rounded-lg bg-[#0799B3] flex items-center justify-center shrink-0">
              <Image
                src={icon}
                alt=""
                aria-hidden="true"
                width={20}
                height={20}
                className="w-5 h-5 object-contain brightness-0 invert"
              />
            </span>
          )}
          <h3 className="text-[17px] font-bold text-[#1F2429] tracking-tight leading-snug">{name}</h3>
        </div>

        <p className="text-gray-600 text-[14.5px] leading-relaxed line-clamp-3">{description}</p>

        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#1F2429] transition-colors duration-300 group-hover:text-[#0799B3]">
          Explore Solution
          <ArrowUpRight
            className="w-4 h-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
