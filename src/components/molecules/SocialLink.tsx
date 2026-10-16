import React, { ElementType } from 'react';
import { cn } from '@/lib/utils';
import { getSocialIcon } from '@/components/atoms/SocialIcons';

export type SocialLinkVariant = 'default' | 'floating' | 'colored' | 'footer';

export interface SocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  platform: string;
  icon?: ElementType;
  variant?: SocialLinkVariant;
  className?: string;
  iconSize?: number;
}

export function SocialLink({
  platform,
  icon,
  variant = 'default',
  className,
  iconSize = 18,
  ...props
}: SocialLinkProps) {
  const IconComponent = icon || getSocialIcon(platform);

  const baseClasses = "transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0799B3] focus-visible:ring-offset-2";
  
  const variantClasses = {
    // Exact match to user screenshot: circular border with crisp SVG icon
    default: "w-11 h-11 rounded-full border border-white/25 text-white/90 hover:text-white hover:bg-[#0799B3] hover:border-[#0799B3] hover:scale-110 shadow-sm",
    footer: "w-11 h-11 rounded-full border border-white/20 text-white/90 hover:text-white hover:bg-[#0799B3] hover:border-[#0799B3] hover:scale-110 transition-all duration-300 shadow-sm",
    colored: "w-11 h-11 rounded-full border border-gray-200 text-gray-600 hover:text-white hover:bg-[#0799B3] hover:border-[#0799B3] hover:scale-110",
    floating: "w-12 h-12 rounded-lg border border-gray-300 text-white bg-black/50 hover:bg-[#fa961a] hover:border-[#fa961a] hover:scale-105"
  };

  return (
    <a
      aria-label={`Follow 8webcom on ${platform} (opens in new tab)`}
      title={platform}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      <IconComponent size={iconSize} className="shrink-0 transition-transform duration-300" aria-hidden="true" />
    </a>
  );
}
