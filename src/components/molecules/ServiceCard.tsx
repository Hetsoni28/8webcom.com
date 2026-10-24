import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageWithSkeleton } from "@/components/atoms/ImageWithSkeleton";

interface ServiceCardProps {
  number: string;
  title: string;
  href: string;
  image: string;
  description?: string;
  className?: string;
}

export function ServiceCard({
  number,
  title,
  href,
  image,
  description,
  className,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block h-full rounded-2xl bg-white border border-gray-200/80 p-3 sm:p-4",
        "transition-[border-color,box-shadow,transform] duration-500 ease-out-expo",
        "hover:border-[#0799B3]/30 hover:shadow-[0_30px_60px_-30px_rgba(31,36,41,0.25)] hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-4",
        className
      )}
    >
      <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-gray-100">
        <ImageWithSkeleton
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-[1.06] duration-1200 ease-out-expo"
        />
        <span className="absolute top-4 left-4 inline-flex items-center h-8 px-3 rounded-full bg-white/95 text-[#1F2429] text-xs font-bold tabular-nums tracking-wider">
          {number}
        </span>
      </div>

      <div className="flex items-start justify-between gap-6 px-2 sm:px-3 pt-6 pb-3">
        <div className="min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1F2429] tracking-tight leading-snug transition-colors duration-300 group-hover:text-[#0799B3]">
            {title}
          </h3>
          {description && (
            <p className="mt-2.5 text-gray-600 text-[15px] leading-relaxed max-w-md">
              {description}
            </p>
          )}
        </div>

        <span
          aria-hidden="true"
          className="relative w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden shrink-0 text-[#1F2429] transition-colors duration-500 ease-out-expo group-hover:bg-[#0799B3] group-hover:border-[#0799B3] group-hover:text-white"
        >
          <ArrowUpRight className="w-5 h-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-6 group-hover:-translate-y-6" />
          <ArrowUpRight className="w-5 h-5 absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      </div>
    </Link>
  );
}
