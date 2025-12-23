"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Skeleton Loader Components
 *
 * Provides skeleton loading states for all platform components with shimmer effects
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

// Platform Card Skeleton
export const PlatformCardSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl"
  >
    {/* Header */}
    <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6 w-full">
      <SkeletonBase className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-3 sm:mb-0 sm:mr-4" />
      <div className="text-center sm:text-left flex-1 w-full">
        <SkeletonBase className="h-6 sm:h-8 w-32 sm:w-48 mx-auto sm:mx-0 mb-2" />
        <SkeletonBase className="h-4 sm:h-5 w-24 sm:w-32 mx-auto sm:mx-0 mb-1" />
        <SkeletonBase className="h-3 sm:h-4 w-20 sm:w-28 mx-auto sm:mx-0" />
      </div>
    </div>

    {/* Statistics Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white/50 rounded-xl p-3 sm:p-4 text-center">
          <SkeletonBase className="h-8 sm:h-10 w-16 sm:w-20 mx-auto mb-2" />
          <SkeletonBase className="h-3 sm:h-4 w-20 sm:w-24 mx-auto" />
        </div>
      ))}
    </div>
  </motion.div>
);

// Statistics Visualization Skeleton
export const StatisticsVisualizationSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6 space-y-6"
  >
    {/* Chart Type Selector */}
    <div className="flex flex-wrap gap-2 justify-center">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonBase key={i} className="h-10 w-24 rounded-lg" />
      ))}
    </div>

    {/* Chart Area */}
    <div className="space-y-4">
      <SkeletonBase className="h-6 w-48 mx-auto" />
      <div className="h-64 flex items-center justify-center">
        <SkeletonBase className="w-48 h-48 rounded-full" />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <SkeletonBase className="w-4 h-4 rounded-full mx-auto" />
            <SkeletonBase className="h-6 w-12 mx-auto" />
            <SkeletonBase className="h-4 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Achievements Skeleton
export const AchievementsSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    {/* Filter Buttons */}
    <div className="flex flex-wrap gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <SkeletonBase key={i} className="h-10 w-20 rounded-full" />
      ))}
    </div>

    {/* Achievements Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200"
        >
          <div className="flex justify-center mb-2 sm:mb-3">
            <SkeletonBase className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
          </div>
          <SkeletonBase className="h-4 w-full mb-2" />
          <SkeletonBase className="h-3 w-16 mx-auto mb-1" />
          <SkeletonBase className="w-2 h-2 rounded-full mx-auto" />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// Activity Heatmap Skeleton
export const ActivityHeatmapSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    {/* Header */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <SkeletonBase className="h-6 w-32" />
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[1, 2, 3].map((i) => (
            <SkeletonBase key={i} className="h-8 w-16 rounded-md mx-1" />
          ))}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <SkeletonBase className="h-4 w-8" />
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBase key={i} className="w-3 h-3 rounded-sm" />
          ))}
        </div>
        <SkeletonBase className="h-4 w-8" />
      </div>
    </div>

    {/* Heatmap Grid */}
    <div className="space-y-2">
      <div className="flex space-x-1">
        {Array.from({ length: 53 }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col space-y-1">
            {Array.from({ length: 7 }).map((_, dayIndex) => (
              <SkeletonBase key={dayIndex} className="w-3 h-3 rounded-sm" />
            ))}
          </div>
        ))}
      </div>
    </div>

    {/* Summary */}
    <div className="flex flex-wrap gap-4 text-sm">
      {[1, 2, 3].map((i) => (
        <SkeletonBase key={i} className="h-4 w-32" />
      ))}
    </div>
  </motion.div>
);

// Recent Activity Skeleton
export const RecentActivitySkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4"
  >
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.1 }}
        className="relative"
      >
        {/* Timeline dot */}
        <div className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-white z-10">
          <SkeletonBase className="w-full h-full rounded-full" />
        </div>

        {/* Timeline line */}
        <div className="absolute left-1.5 top-9 w-0.5 h-full bg-gray-200 -z-10" />

        {/* Activity card */}
        <div className="ml-6 sm:ml-8 pb-4 sm:pb-6">
          <div className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                <SkeletonBase className="h-5 w-48 mb-2" />
                <div className="flex flex-wrap items-center gap-2">
                  <SkeletonBase className="h-6 w-16 rounded-full" />
                  <SkeletonBase className="h-4 w-20" />
                  <SkeletonBase className="h-4 w-12" />
                </div>
              </div>
              <SkeletonBase className="w-4 h-4" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mt-2">
              {[1, 2, 3].map((j) => (
                <SkeletonBase key={j} className="h-6 w-16 rounded" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
);

// Loading Spinner Component
export const LoadingSpinner: React.FC<{
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-blue-600 border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

// Full Section Loading State
export const SectionLoadingSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-8 sm:space-y-12"
  >
    {/* Platform Selector Skeleton */}
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
      {[1, 2].map((i) => (
        <SkeletonBase key={i} className="h-12 w-32 rounded-xl" />
      ))}
    </div>

    {/* Mode Selector Skeleton */}
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-14">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonBase key={i} className="h-10 w-24 rounded-full" />
      ))}
    </div>

    {/* Main Content Skeleton */}
    <div className="space-y-6 sm:space-y-8">
      <PlatformCardSkeleton />
      <StatisticsVisualizationSkeleton />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <SkeletonBase className="h-6 w-32" />
            <SkeletonBase className="h-4 w-16" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <SkeletonBase className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <SkeletonBase className="h-4 w-32 mb-1" />
                  <SkeletonBase className="h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <SkeletonBase className="h-6 w-32" />
            <SkeletonBase className="h-4 w-16" />
          </div>
          <RecentActivitySkeleton />
        </div>
      </div>
    </div>
  </motion.div>
);

const LoadingStates = {
  PlatformCardSkeleton,
  StatisticsVisualizationSkeleton,
  AchievementsSkeleton,
  ActivityHeatmapSkeleton,
  RecentActivitySkeleton,
  LoadingSpinner,
  SectionLoadingSkeleton,
};

export default LoadingStates;
