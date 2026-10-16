'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad'> {
  skeletonClassName?: string;
  wrapperClassName?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  skeletonClassName,
  wrapperClassName,
  fill,
  width,
  height,
  priority,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        fill ? 'w-full h-full' : 'inline-block',
        wrapperClassName
      )}
      style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {/* Skeleton Shimmer Loading Placeholder */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 z-0 bg-gray-200 animate-shimmer pointer-events-none transition-opacity duration-500',
            skeletonClassName
          )}
        />
      )}

      {/* Main Image with Smooth Fade-in */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        onError={() => setHasError(true)}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        className={cn(
          'transition-all duration-700 ease-out',
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02] blur-[2px]',
          className
        )}
        {...props}
      />
    </div>
  );
}
