"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Certification-specific Loading States
 *
 * Provides skeleton loading states for certification components with shimmer effects
 */

// Base shimmer animation
const shimmerVariants = {
  initial: { x: "-100%" },
  animate: {
    x: "100%",
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear" as const,
    },
  },
};

// Skeleton base component with shimmer effect
const SkeletonBase: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ className = "", children }) => (
  <div className={`relative overflow-hidden bg-gray-200 rounded ${className}`}>
    <motion.div
      variants={shimmerVariants}
      initial="initial"
      animate="animate"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
    />
    {children}
  </div>
);

// Certification Card Skeleton
export const CertificationCardSkeleton: React.FC<{
  index?: number;
}> = ({ index = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-4 sm:p-6 h-full min-h-[300px]"
  >
    {/* Badge image skeleton */}
    <div className="flex justify-center mb-4">
      <SkeletonBase className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg" />
    </div>

    {/* Title skeleton */}
    <SkeletonBase className="h-6 w-3/4 mx-auto mb-2" />

    {/* Issuer skeleton */}
    <SkeletonBase className="h-4 w-1/2 mx-auto mb-3" />

    {/* Date skeleton */}
    <SkeletonBase className="h-4 w-2/3 mx-auto mb-3" />

    {/* Credential ID skeleton */}
    <SkeletonBase className="h-4 w-1/3 mx-auto mb-4" />

    {/* Verification link skeleton */}
    <SkeletonBase className="h-8 w-32 mx-auto mb-4 rounded-lg" />

    {/* Category badge skeleton */}
    <div className="absolute top-3 right-3">
      <SkeletonBase className="h-6 w-16 rounded-full" />
    </div>

    {/* Featured badge skeleton (randomly shown) */}
    {Math.random() > 0.5 && (
      <div className="absolute top-3 left-3">
        <SkeletonBase className="h-6 w-14 rounded-full" />
      </div>
    )}
  </motion.div>
);

// Certification Section Header Skeleton
export const CertificationHeaderSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-16 sm:mb-20"
  >
    {/* Badge skeleton */}
    <div className="inline-block mb-6">
      <SkeletonBase className="h-8 w-48 rounded-full" />
    </div>

    {/* Title skeleton */}
    <SkeletonBase className="h-12 sm:h-16 w-80 mx-auto mb-8" />

    {/* Description skeleton */}
    <div className="max-w-3xl mx-auto space-y-2">
      <SkeletonBase className="h-5 w-full" />
      <SkeletonBase className="h-5 w-3/4 mx-auto" />
    </div>
  </motion.div>
);

// Category Filter Skeleton
export const CategoryFilterSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
  >
    {[1, 2, 3, 4, 5].map((i) => (
      <SkeletonBase key={i} className="h-10 w-24 rounded-full" />
    ))}
  </motion.div>
);

// Certification Grid Skeleton
export const CertificationGridSkeleton: React.FC<{
  count?: number;
}> = ({ count = 6 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="max-w-6xl mx-auto grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  >
    {Array.from({ length: count }).map((_, i) => (
      <CertificationCardSkeleton key={i} index={i} />
    ))}
  </motion.div>
);

// Certification Modal Skeleton
export const CertificationModalSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto"
  >
    {/* Header */}
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <SkeletonBase className="h-8 sm:h-10 w-3/4 mb-2" />
          <div className="flex items-center mb-4">
            <SkeletonBase className="w-5 h-5 rounded mr-2" />
            <SkeletonBase className="h-6 w-48" />
          </div>
        </div>

        {/* Badge image skeleton */}
        <SkeletonBase className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-lg" />
      </div>

      {/* Status badges skeleton */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
        <SkeletonBase className="h-8 w-24 rounded-full" />
        <SkeletonBase className="h-8 w-20 rounded-full" />
        <SkeletonBase className="h-8 w-16 rounded-full" />
      </div>
    </div>

    {/* Details grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
      {/* Left column */}
      <div className="space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <SkeletonBase className="w-5 h-5 rounded mr-2" />
              <SkeletonBase className="h-5 w-24" />
            </div>
            <SkeletonBase className="h-4 w-32" />
          </div>
        ))}
      </div>

      {/* Right column */}
      <div className="space-y-4 sm:space-y-6">
        {/* Description */}
        <div className="bg-gray-50 rounded-lg p-4">
          <SkeletonBase className="h-5 w-20 mb-3" />
          <div className="space-y-2">
            <SkeletonBase className="h-4 w-full" />
            <SkeletonBase className="h-4 w-3/4" />
            <SkeletonBase className="h-4 w-5/6" />
          </div>
        </div>

        {/* Skills */}
        <div className="bg-gray-50 rounded-lg p-4">
          <SkeletonBase className="h-5 w-24 mb-3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <SkeletonBase key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Verification section skeleton */}
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-blue-100">
      <div className="flex items-center mb-4">
        <SkeletonBase className="w-5 h-5 rounded mr-2" />
        <SkeletonBase className="h-5 w-20" />
      </div>
      <SkeletonBase className="h-4 w-full mb-4" />
      <SkeletonBase className="h-12 w-40 rounded-lg" />
    </div>

    {/* Additional information skeleton */}
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
      <SkeletonBase className="h-5 w-32 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex">
            <SkeletonBase className="h-4 w-16 mr-2" />
            <SkeletonBase className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Summary Stats Skeleton
export const CertificationSummaryStatsSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-16 sm:mt-20"
  >
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-4 sm:p-6 lg:p-8">
      <SkeletonBase className="h-6 sm:h-8 w-48 mx-auto mb-6" />
      <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="text-center">
            <SkeletonBase className="h-8 sm:h-10 w-12 mx-auto mb-2" />
            <SkeletonBase className="h-4 w-20 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Cinematic Loader Skeleton (for when cinematic loader fails)
export const CinematicLoaderSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center z-50"
  >
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
      />
    </div>
  </motion.div>
);

// Full Section Loading Skeleton
export const CertificationSectionSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-16 sm:py-20"
  >
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <CertificationHeaderSkeleton />
      <CategoryFilterSkeleton />
      <CertificationGridSkeleton />
      <CertificationSummaryStatsSkeleton />
    </div>
  </motion.div>
);

// Progressive Loading Skeleton
export const ProgressiveCertificationSkeleton: React.FC<{
  stage: "initial" | "header" | "filters" | "grid" | "complete";
  children?: React.ReactNode;
}> = ({ stage, children }) => {
  switch (stage) {
    case "initial":
      return <CinematicLoaderSkeleton />;
    case "header":
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <CertificationHeaderSkeleton />
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
              />
            </div>
          </div>
        </div>
      );
    case "filters":
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <CertificationHeaderSkeleton />
            <CategoryFilterSkeleton />
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
              />
            </div>
          </div>
        </div>
      );
    case "grid":
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <CertificationHeaderSkeleton />
            <CategoryFilterSkeleton />
            <CertificationGridSkeleton />
          </div>
        </div>
      );
    case "complete":
    default:
      return <>{children}</>;
  }
};

// Minimal Loading for Performance
export const MinimalCertificationSkeleton: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = "" }) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 rounded animate-pulse"
        style={{ width: `${100 - i * 15}%` }}
      />
    ))}
  </div>
);

export default {
  CertificationCardSkeleton,
  CertificationHeaderSkeleton,
  CategoryFilterSkeleton,
  CertificationGridSkeleton,
  CertificationModalSkeleton,
  CertificationSummaryStatsSkeleton,
  CinematicLoaderSkeleton,
  CertificationSectionSkeleton,
  ProgressiveCertificationSkeleton,
  MinimalCertificationSkeleton,
};
