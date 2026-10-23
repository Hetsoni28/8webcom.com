'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad'> {
  skeletonClassName?: string;
  wrapperClassName?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * Image with a shimmer placeholder.
 *
 * The image is ALWAYS visible — the shimmer sits behind it, so whatever has
 * loaded simply covers it. (Earlier versions hid the image until onLoad fired;
 * on phones the image can finish loading before JavaScript is ready, the event
 * is missed, and the image stayed invisible forever.)
 *
 * If the optimised request fails, it retries once with the original URL.
 */
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
  unoptimized,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useOriginal, setUseOriginal] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden', fill ? 'w-full h-full' : 'inline-block', wrapperClassName)}
      style={!fill && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
    >
      {/* Shimmer underneath the image (purely decorative) */}
      {!isLoaded && (
        <div
          aria-hidden="true"
          className={cn('absolute inset-0 bg-gray-200 animate-shimmer pointer-events-none', skeletonClassName)}
        />
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        loading={priority ? 'eager' : props.loading}
        fetchPriority={priority ? 'high' : props.fetchPriority}
        unoptimized={unoptimized || useOriginal}
        onError={() => {
          if (!useOriginal && !unoptimized) setUseOriginal(true);
        }}
        onLoad={(e) => {
          setIsLoaded(true);
          onLoad?.(e);
        }}
        className={cn('relative', className)}
        {...props}
      />
    </div>
  );
}
