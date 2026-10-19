import React from 'react';
import { Skeleton } from '@/components/atoms/Skeleton';

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="min-h-screen bg-white"
    >
      <span className="sr-only">Loading page content, please wait...</span>

      {/* Top Animated Loading Bar with Brand Gradient */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden bg-gray-100">
        <div className="h-full w-full bg-linear-to-r from-[#0799B3] via-[#F58220] to-[#0799B3] animate-shimmer" />
      </div>

      {/* Hero Skeleton Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gray-50/60 overflow-hidden border-b border-gray-100">
        <div className="container-site">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge Skeleton */}
            <Skeleton
              variant="rounded"
              width={160}
              height={32}
              className="rounded-full bg-gray-200"
            />

            {/* Main Heading Skeleton (2 Lines) */}
            <div className="w-full space-y-3 flex flex-col items-center">
              <Skeleton
                variant="rounded"
                className="w-4/5 h-10 sm:h-12 lg:h-14 rounded-2xl bg-gray-200"
              />
              <Skeleton
                variant="rounded"
                className="w-3/5 h-10 sm:h-12 lg:h-14 rounded-2xl bg-gray-200"
              />
            </div>

            {/* Subtitle Paragraph Skeleton */}
            <div className="w-full max-w-xl space-y-2 pt-2">
              <Skeleton variant="text" className="w-full h-4 bg-gray-200" />
              <Skeleton variant="text" className="w-5/6 mx-auto h-4 bg-gray-200" />
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Skeleton
                variant="rounded"
                width={170}
                height={50}
                className="rounded-full bg-gray-200"
              />
              <Skeleton
                variant="rounded"
                width={150}
                height={50}
                className="rounded-full bg-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid Skeletons */}
      <section className="py-20 lg:py-24">
        <div className="container-site">
          {/* Section Header Skeleton */}
          <div className="mb-14 max-w-md space-y-3">
            <Skeleton variant="rounded" width={120} height={24} className="rounded-full bg-gray-200" />
            <Skeleton variant="rounded" className="w-3/4 h-8 rounded-xl bg-gray-200" />
            <Skeleton variant="text" className="w-full h-4 bg-gray-200" />
          </div>

          {/* 3-Column Card Grid Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-5"
              >
                {/* Image Placeholder Skeleton */}
                <Skeleton
                  variant="rounded"
                  className="w-full h-56 rounded-2xl bg-gray-200"
                />

                {/* Tags row */}
                <div className="flex gap-2">
                  <Skeleton variant="rounded" width={70} height={20} className="rounded-full bg-gray-200" />
                  <Skeleton variant="rounded" width={80} height={20} className="rounded-full bg-gray-200" />
                </div>

                {/* Title */}
                <Skeleton variant="rounded" className="w-3/4 h-6 rounded-lg bg-gray-200" />

                {/* Description lines */}
                <div className="space-y-2">
                  <Skeleton variant="text" className="w-full h-3.5 bg-gray-200" />
                  <Skeleton variant="text" className="w-4/5 h-3.5 bg-gray-200" />
                </div>

                {/* Bottom link */}
                <div className="pt-2">
                  <Skeleton variant="rounded" width={110} height={36} className="rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
