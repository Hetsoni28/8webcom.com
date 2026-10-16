import React from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  animate = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rectangular: 'rounded-none',
    circular: 'rounded-full',
    rounded: 'rounded-2xl',
    text: 'rounded-md h-4 w-full my-1.5',
  };

  const inlineStyles: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      style={inlineStyles}
      className={cn(
        'bg-gray-200/80 dark:bg-gray-800/60 overflow-hidden relative',
        animate && 'animate-shimmer',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
