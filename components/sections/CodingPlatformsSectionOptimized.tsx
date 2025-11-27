"use client";

import { motion } from "framer-motion";
import { useState, useMemo, Suspense } from "react";
import { codingPlatforms } from "@/data/coding-platforms";
import { CodingPlatform } from "@/types/coding-platforms";
import { useRealTimeStats } from "@/lib/hooks/useRealTimeStats";
import { USER_CONFIG } from "@/lib/coding-platforms-config";
import AnimatedSectionHeading, {
  headingPresets,
} from "@/components/ui/AnimatedSectionHeading";

// Simplified platform card component
const PlatformCard = ({
  platform,
  isActive,
  onClick,
}: {
  platform: CodingPlatform;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      relative rounded-xl font-medium transition-all duration-200
      flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      ${
        isActive
          ? "bg-white/90 backdrop-blur-sm shadow-xl scale-105"
          : "bg-white/70 backdrop-blur-sm hover:bg-white/90 shadow-md hover:scale-102"
      }
      px-6 py-3 text-base
    `}
    style={{
      color: isActive ? platform.primaryColor : "#64748b",
      minHeight: "44px",
    }}
  >
    <div className="flex items-center space-x-2">
      <img
        src={platform.logoUrl}
        alt={`${platform.name} logo`}
        className="w-6 h-6"
        loading="lazy"
      />
      <span className="whitespace-nowrap">{platform.name}</span>
    </div>
  </button>
);

// Simplified stats display
const StatsDisplay = ({ platform }: { platform: CodingPlatform }) => {
  const { stats, isLoading, isRealTime } = useRealTimeStats(
    platform.id,
    platform.username,
    { enableRealTime: true, fallbackToStatic: true }
  );

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load statistics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Real-time indicator */}
      {isRealTime && (
        <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      )}

      {/* Main stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.totalSolved}
          </div>
          <div className="text-sm text-gray-600">Problems Solved</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.currentStreak}
          </div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.acceptanceRate}%
          </div>
          <div className="text-sm text-gray-600">Acceptance Rate</div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            #{stats.ranking?.toLocaleString() || "N/A"}
          </div>
          <div className="text-sm text-gray-600">Global Ranking</div>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">
          Difficulty Breakdown
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-green-600 font-medium">Easy</span>
            <span className="font-semibold">
              {stats.difficultyBreakdown.easy}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-yellow-600 font-medium">Medium</span>
            <span className="font-semibold">
              {stats.difficultyBreakdown.medium}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-red-600 font-medium">Hard</span>
            <span className="font-semibold">
              {stats.difficultyBreakdown.hard}
            </span>
          </div>
        </div>
      </div>

      {/* Profile link */}
      <div className="text-center">
        <a
          href={platform.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span>View Full Profile</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Main optimized component
export default function CodingPlatformsSectionOptimized() {
  const [activePlatform, setActivePlatform] = useState(
    codingPlatforms[0]?.id || "leetcode"
  );

  const activePlatformData = useMemo(
    () =>
      codingPlatforms.find((p) => p.id === activePlatform) ||
      codingPlatforms[0],
    [activePlatform]
  );

  if (!codingPlatforms.length) {
    return (
      <section
        id="coding-platforms"
        className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Coding Platforms
          </h2>
          <p className="text-gray-300">No platforms configured</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="coding-platforms"
      className="min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-slate-900 via-gray-800 to-slate-900 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-orange-200/20 to-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-blue-200 border border-white/30">
              Competitive Programming
            </span>
          </div>
          <AnimatedSectionHeading
            text="Coding Platforms"
            className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
            gradientClassName="bg-gradient-to-r from-white via-green-100 to-orange-200 bg-clip-text text-transparent"
            animationConfig={headingPresets.section.animationConfig}
          />
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            Showcasing problem-solving skills and competitive programming
            achievements across multiple platforms
          </p>
        </motion.div>

        {/* Platform selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {codingPlatforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              isActive={activePlatform === platform.id}
              onClick={() => setActivePlatform(platform.id)}
            />
          ))}
        </motion.div>

        {/* Platform content */}
        <motion.div
          key={activePlatform}
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex items-center space-x-4 mb-8">
              <img
                src={activePlatformData.logoUrl}
                alt={`${activePlatformData.name} logo`}
                className="w-16 h-16"
                loading="lazy"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {activePlatformData.name}
                </h3>
                <p className="text-gray-300">@{activePlatformData.username}</p>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="animate-pulse space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-20 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              }
            >
              <StatsDisplay platform={activePlatformData} />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
