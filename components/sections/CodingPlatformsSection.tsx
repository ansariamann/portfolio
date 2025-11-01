"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { codingPlatforms, getPlatformConfig } from "@/data/coding-platforms";
import { CodingPlatform, VisualizationMode } from "@/types/coding-platforms";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { useMultiplePlatformData } from "@/lib/hooks/usePlatformData";
import {
  ensureContrast,
  getAccessibleTextColor,
  announceToScreenReader,
  generateStatsSummary,
} from "@/lib/accessibility";
import StatisticsVisualization from "@/components/ui/StatisticsVisualization";
import AchievementsBadges from "@/components/ui/AchievementsBadges";
import ActivityHeatmap from "@/components/ui/ActivityHeatmap";
import RecentActivity from "@/components/ui/RecentActivity";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { SectionLoadingSkeleton } from "@/components/ui/LoadingStates";
import {
  NetworkErrorFallback,
  PlatformUnavailableFallback,
} from "@/components/ui/FallbackComponents";
import { PlatformLogo } from "@/components/ui/PlatformImage";
import {
  PlatformBrandingProvider,
  PlatformCard,
  PlatformButton,
  PlatformBadge,
  PlatformProgressBar,
} from "@/components/ui/PlatformBrandingProvider";

// Platform selector/tabs component
const PlatformSelector = ({
  platforms,
  activePlatform,
  onPlatformChange,
  errors = {},
  onRetryPlatform,
}: {
  platforms: CodingPlatform[];
  activePlatform: string;
  onPlatformChange: (platformId: string) => void;
  errors?: Record<string, Error>;
  onRetryPlatform?: (platformId: string) => void;
}) => {
  const {
    isMobile,
    isSmallMobile,
    touchDevice,
    getTouchTargetSize,
    getResponsiveSpacing,
    getAnimationDuration,
    shouldUseReducedAnimations,
  } = useMobileOptimizedAnimation();

  const touchTargetSize = getTouchTargetSize();
  const spacing = getResponsiveSpacing(16);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, platformId: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onPlatformChange(platformId);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const currentIndex = platforms.findIndex((p) => p.id === activePlatform);
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const nextIndex =
        (currentIndex + direction + platforms.length) % platforms.length;
      onPlatformChange(platforms[nextIndex].id);
    }
  };

  return (
    <motion.div
      className={`flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 px-4`}
      initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: getAnimationDuration(0.6),
        delay: shouldUseReducedAnimations ? 0 : 0.5,
      }}
      role="tablist"
      aria-label="Select coding platform to view"
    >
      {platforms.map((platform, index) => {
        const config = getPlatformConfig(platform.id);
        const isActive = activePlatform === platform.id;
        const hasError = errors[platform.id];

        return (
          <motion.button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            onKeyDown={(e) => handleKeyDown(e, platform.id)}
            className={`
              relative rounded-xl sm:rounded-2xl font-medium transition-all duration-300 
              flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${
                hasError
                  ? "bg-red-100/90 backdrop-blur-sm shadow-lg border border-red-200"
                  : isActive
                  ? "bg-white/90 backdrop-blur-sm shadow-xl scale-105"
                  : "bg-white/60 backdrop-blur-sm hover:bg-white/80 shadow-lg"
              }
              ${
                isSmallMobile
                  ? "px-3 py-2 text-xs min-w-[44px]"
                  : isMobile
                  ? "px-4 py-2 text-sm min-w-[48px]"
                  : "px-6 py-3 text-base"
              }
            `}
            style={{
              color: hasError
                ? ensureContrast("#dc2626", "#ffffff", 4.5)
                : isActive
                ? ensureContrast(
                    config?.primaryColor || "#3B82F6",
                    "#ffffff",
                    4.5
                  )
                : ensureContrast("#64748b", "#ffffff", 4.5),
              minHeight: `${touchTargetSize}px`,
              minWidth: touchDevice ? `${touchTargetSize}px` : "auto",
            }}
            whileHover={
              shouldUseReducedAnimations ? {} : { y: isMobile ? 0 : -2 }
            }
            whileTap={{ scale: touchDevice ? 0.95 : 0.98 }}
            initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldUseReducedAnimations ? 0 : 0.6 + index * 0.1,
            }}
            role="tab"
            aria-selected={isActive}
            aria-controls={`platform-panel-${platform.id}`}
            aria-label={
              hasError
                ? `${platform.name} platform (error: ${hasError.message}). Press Enter to retry.`
                : `${platform.name} platform${
                    isActive ? " (currently selected)" : ""
                  }. Press Enter to select.`
            }
            tabIndex={isActive ? 0 : -1}
            title={
              hasError
                ? `Error loading ${platform.name}: ${hasError.message}`
                : `Switch to ${platform.name} platform`
            }
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              {hasError ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white font-bold bg-red-500">
                  !
                </div>
              ) : (
                <PlatformLogo
                  platformId={platform.id}
                  platformName={platform.name}
                  size={isSmallMobile ? "xs" : "sm"}
                  priority={index < 2}
                />
              )}
              <span
                className={`${
                  isSmallMobile ? "hidden" : isMobile ? "hidden xs:inline" : ""
                } whitespace-nowrap`}
              >
                {platform.name}
              </span>
            </div>
            {isActive && !shouldUseReducedAnimations && !hasError && (
              <motion.div
                className="absolute inset-0 rounded-xl sm:rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${config?.primaryColor}20, ${config?.secondaryColor}20)`,
                }}
                layoutId="activePlatform"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Error indicator */}
            {hasError && onRetryPlatform && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onRetryPlatform(platform.id);
                }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Retry loading this platform"
              >
                ↻
              </motion.button>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

// Visualization mode selector component
const VisualizationModeSelector = ({
  activeMode,
  onModeChange,
}: {
  activeMode: VisualizationMode;
  onModeChange: (mode: VisualizationMode) => void;
}) => {
  const {
    isMobile,
    isSmallMobile,
    touchDevice,
    getTouchTargetSize,
    getAnimationDuration,
    shouldUseReducedAnimations,
  } = useMobileOptimizedAnimation();
  const touchTargetSize = getTouchTargetSize();

  const visualizationModes = [
    {
      id: "dashboard" as const,
      name: "Dashboard",
      shortName: "Dash",
      icon: "📊",
      description: "Comprehensive overview with all key metrics",
    },
    {
      id: "achievements" as const,
      name: "Achievements",
      shortName: "Awards",
      icon: "🏆",
      description: "Showcase of badges and certifications",
    },
    {
      id: "heatmap" as const,
      name: "Activity",
      shortName: "Activity",
      icon: "📈",
      description: "Coding consistency and activity patterns",
    },
    {
      id: "progress" as const,
      name: "Progress",
      shortName: "Progress",
      icon: "⚡",
      description: "Improvement trends and goal tracking",
    },
  ];

  // Handle keyboard navigation for visualization modes
  const handleKeyDown = (
    event: React.KeyboardEvent,
    modeId: VisualizationMode
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onModeChange(modeId);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const currentIndex = visualizationModes.findIndex(
        (m) => m.id === activeMode
      );
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const nextIndex =
        (currentIndex + direction + visualizationModes.length) %
        visualizationModes.length;
      onModeChange(visualizationModes[nextIndex].id);
    }
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-14 md:mb-16 px-4"
      initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: getAnimationDuration(0.6),
        delay: shouldUseReducedAnimations ? 0 : 0.7,
      }}
      role="tablist"
      aria-label="Select visualization mode"
    >
      {visualizationModes.map((mode, index) => (
        <motion.button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          onKeyDown={(e) => handleKeyDown(e, mode.id)}
          className={`
            group relative rounded-full font-medium transition-all duration-300 
            flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              activeMode === mode.id
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                : "bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white/90 shadow-md"
            }
            ${
              isSmallMobile
                ? "px-2 py-1.5 text-xs min-w-[44px]"
                : isMobile
                ? "px-3 py-2 text-xs min-w-[48px]"
                : "px-4 py-2 text-sm"
            }
          `}
          style={{
            minHeight: `${touchTargetSize}px`,
            minWidth: touchDevice ? `${touchTargetSize}px` : "auto",
          }}
          whileHover={
            shouldUseReducedAnimations ? {} : { y: isMobile ? 0 : -1 }
          }
          whileTap={{ scale: touchDevice ? 0.95 : 0.98 }}
          initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldUseReducedAnimations ? 0 : 0.8 + index * 0.05,
          }}
          role="tab"
          aria-selected={activeMode === mode.id}
          aria-controls={`visualization-panel-${mode.id}`}
          aria-label={`${mode.name} view: ${mode.description}${
            activeMode === mode.id ? " (currently selected)" : ""
          }`}
          tabIndex={activeMode === mode.id ? 0 : -1}
          title={mode.description}
        >
          <span className={`${isSmallMobile ? "mr-1" : "mr-2"} text-sm`}>
            {mode.icon}
          </span>
          <span
            className={`
            ${
              isSmallMobile ? "hidden" : isMobile ? "hidden xs:inline" : ""
            } whitespace-nowrap
          `}
          >
            {isMobile ? mode.shortName : mode.name}
          </span>

          {/* Enhanced tooltip for mobile and touch devices */}
          {(isMobile || touchDevice) && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-lg">
              <div className="font-medium">{mode.name}</div>
              <div className="text-slate-300 text-xs mt-1">
                {mode.description}
              </div>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
            </div>
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

// Placeholder components for different visualization modes
const DashboardView = ({ platform }: { platform: CodingPlatform }) => {
  const config = getPlatformConfig(platform.id);
  const {
    isMobile,
    isSmallMobile,
    shouldUseReducedAnimations,
    getOptimalGridColumns,
  } = useMobileOptimizedAnimation();

  // Handle missing platform data
  if (!platform) {
    return <PlatformUnavailableFallback platformName="Platform" />;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Platform Overview Header */}
      <motion.div
        className="flex flex-col items-center justify-between p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl"
        whileHover={shouldUseReducedAnimations ? {} : { y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6 w-full">
          <div
            className={`${
              isSmallMobile ? "mb-3 sm:mb-0 sm:mr-3" : "mb-4 sm:mb-0 sm:mr-4"
            }`}
          >
            <PlatformLogo
              platformId={platform.id}
              platformName={platform.name}
              size={isSmallMobile ? "lg" : "xl"}
              priority={true}
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3
              className={`font-bold text-slate-800 ${
                isSmallMobile ? "text-lg" : "text-xl sm:text-2xl"
              }`}
            >
              {platform.name}
            </h3>
            <p
              className={`text-slate-600 ${
                isSmallMobile ? "text-sm" : "text-base sm:text-lg"
              }`}
            >
              @{platform.username}
            </p>
            <a
              href={platform.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1 mt-1"
            >
              View Profile →
            </a>
          </div>
        </div>

        <div
          className={`
          grid gap-4 sm:gap-6 text-center w-full
          ${
            getOptimalGridColumns(3) === 1
              ? "grid-cols-1"
              : getOptimalGridColumns(3) === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }
        `}
        >
          <div className="bg-white/50 rounded-xl p-3 sm:p-4">
            <div
              className={`font-bold text-slate-800 ${
                isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {platform.statistics.totalSolved}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">
              Problems Solved
            </div>
          </div>
          <div className="bg-white/50 rounded-xl p-3 sm:p-4">
            <div
              className={`font-bold text-slate-800 ${
                isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
              }`}
            >
              {platform.statistics.currentStreak}
            </div>
            <div className="text-xs sm:text-sm text-slate-600">
              Current Streak
            </div>
          </div>
          {platform.statistics.ranking && (
            <div
              className={`bg-white/50 rounded-xl p-3 sm:p-4 ${
                getOptimalGridColumns(3) === 2 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div
                className={`font-bold text-slate-800 ${
                  isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                }`}
              >
                #{platform.statistics.ranking.toLocaleString()}
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                Global Ranking
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Interactive Statistics Visualization */}
      <ErrorBoundary
        fallback={({ error, retry }) => (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-red-200 shadow-xl p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Statistics Error
              </h3>
              <p className="text-red-700 mb-4">
                Failed to load statistics visualization.
              </p>
              <button
                onClick={retry}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <StatisticsVisualization
            statistics={platform.statistics}
            primaryColor={config?.primaryColor || "#3B82F6"}
            secondaryColor={config?.secondaryColor || "#8B5CF6"}
            animate={true}
            className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6"
          />
        </motion.div>
      </ErrorBoundary>

      {/* Responsive layout for achievements and recent activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Achievements Preview Card */}
        <motion.div
          className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl"
          whileHover={shouldUseReducedAnimations ? {} : { y: -2 }}
          initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldUseReducedAnimations ? 0 : 0.4,
            duration: shouldUseReducedAnimations ? 0.3 : 0.6,
            type: "spring",
            stiffness: 300,
          }}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h4
              className={`font-bold text-slate-800 ${
                isSmallMobile ? "text-lg" : "text-xl"
              }`}
            >
              Recent Achievements
            </h4>
            <span className="text-xs sm:text-sm text-slate-500">
              {platform.achievements.length} total
            </span>
          </div>
          <div className="space-y-2 sm:space-y-3">
            {platform.achievements && platform.achievements.length > 0 ? (
              platform.achievements
                .slice(0, isMobile ? 2 : 3)
                .map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
                    whileHover={
                      shouldUseReducedAnimations ? {} : { scale: 1.02 }
                    }
                    initial={{
                      opacity: 0,
                      x: shouldUseReducedAnimations ? 0 : -20,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldUseReducedAnimations ? 0 : 0.5 + index * 0.1,
                    }}
                  >
                    <div
                      className={`
                  ${isSmallMobile ? "w-8 h-8" : "w-10 h-10"} 
                  bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full 
                  flex items-center justify-center flex-shrink-0
                `}
                    >
                      <span
                        className={`text-white ${
                          isSmallMobile ? "text-sm" : "text-lg"
                        }`}
                      >
                        🏆
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium text-slate-800 truncate ${
                          isSmallMobile ? "text-xs" : "text-sm"
                        }`}
                      >
                        {achievement.title}
                      </p>
                      <p className="text-xs text-slate-600">
                        {achievement.earnedDate.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">
                        {achievement.category}
                      </p>
                    </div>
                  </motion.div>
                ))
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500 text-sm">
                  No achievements available
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity Timeline */}
        <motion.div
          className="p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/60 shadow-xl"
          whileHover={shouldUseReducedAnimations ? {} : { y: -2 }}
          initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldUseReducedAnimations ? 0 : 0.5,
            duration: shouldUseReducedAnimations ? 0.3 : 0.6,
            type: "spring",
            stiffness: 300,
          }}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h4
              className={`font-bold text-slate-800 ${
                isSmallMobile ? "text-lg" : "text-xl"
              }`}
            >
              Recent Activity
            </h4>
            <span className="text-xs sm:text-sm text-slate-500">
              {platform.recentActivity.length} problems
            </span>
          </div>
          <div
            className={`overflow-y-auto ${isMobile ? "max-h-64" : "max-h-96"}`}
          >
            <ErrorBoundary
              fallback={({ error, retry }) => (
                <div className="text-center py-4">
                  <p className="text-red-600 text-sm mb-2">
                    Failed to load recent activity
                  </p>
                  <button
                    onClick={retry}
                    className="text-xs px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}
            >
              {platform.recentActivity && platform.recentActivity.length > 0 ? (
                <RecentActivity
                  activities={platform.recentActivity}
                  maxItems={isMobile ? 3 : 5}
                  expandable={!isSmallMobile}
                  groupByDate={false}
                />
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">
                    No recent activity available
                  </p>
                </div>
              )}
            </ErrorBoundary>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AchievementsView = ({ platform }: { platform: CodingPlatform }) => {
  const config = getPlatformConfig(platform.id);

  if (!platform) {
    return <PlatformUnavailableFallback platformName="Platform" />;
  }

  if (!platform.achievements || platform.achievements.length === 0) {
    return (
      <div className="space-y-8">
        <motion.div
          className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-3"
              style={{
                background: `linear-gradient(135deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
              }}
            >
              🏆
            </div>
            <h3 className="text-3xl font-bold text-slate-800">
              {platform.name} Achievements
            </h3>
          </div>
          <p className="text-slate-600 text-lg mb-6">
            No achievements available for {platform.name} at the moment.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Achievements Header */}
      <motion.div
        className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-3"
            style={{
              background: `linear-gradient(135deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
            }}
          >
            🏆
          </div>
          <h3 className="text-3xl font-bold text-slate-800">
            {platform.name} Achievements
          </h3>
        </div>
        <p className="text-slate-600 text-lg">
          Explore badges, certifications, and milestones earned on{" "}
          {platform.name}
        </p>
        <div className="flex justify-center items-center mt-4 space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">
              {platform.achievements.length}
            </div>
            <div className="text-sm text-slate-600">Total Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">
              {
                platform.achievements.filter(
                  (a) => a.rarity === "legendary" || a.rarity === "epic"
                ).length
              }
            </div>
            <div className="text-sm text-slate-600">Rare & Epic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">
              {new Set(platform.achievements.map((a) => a.category)).size}
            </div>
            <div className="text-sm text-slate-600">Categories</div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Achievements Gallery */}
      <motion.div
        className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <ErrorBoundary
          fallback={({ error, retry }) => (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Achievements Error
              </h3>
              <p className="text-red-700 mb-4">
                Failed to load achievements gallery.
              </p>
              <button
                onClick={retry}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        >
          <AchievementsBadges
            achievements={platform.achievements}
            layout="grid"
            showTooltips={true}
          />
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

const HeatmapView = ({ platform }: { platform: CodingPlatform }) => {
  const config = getPlatformConfig(platform.id);
  const [timePeriod, setTimePeriod] = useState<"month" | "quarter" | "year">(
    "year"
  );

  if (!platform) {
    return <PlatformUnavailableFallback platformName="Platform" />;
  }

  if (!platform.recentActivity || platform.recentActivity.length === 0) {
    return (
      <div className="space-y-8">
        <motion.div
          className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-3"
              style={{
                background: `linear-gradient(135deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
              }}
            >
              📈
            </div>
            <h3 className="text-3xl font-bold text-slate-800">
              {platform.name} Activity Heatmap
            </h3>
          </div>
          <p className="text-slate-600 text-lg">
            No activity data available for heatmap visualization.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heatmap Header */}
      <motion.div
        className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-3"
            style={{
              background: `linear-gradient(135deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
            }}
          >
            📈
          </div>
          <h3 className="text-3xl font-bold text-slate-800">
            {platform.name} Activity Heatmap
          </h3>
        </div>
        <p className="text-slate-600 text-lg mb-6">
          Visualizing coding consistency and daily problem-solving patterns
        </p>

        {/* Time Period Selector */}
        <div className="flex justify-center space-x-2">
          {(["month", "quarter", "year"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                timePeriod === period
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white/90 shadow-md"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center mt-4 space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">
              {platform.recentActivity.length}
            </div>
            <div className="text-sm text-slate-600">Total Activities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">
              {platform.statistics.currentStreak}
            </div>
            <div className="text-sm text-slate-600">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-800">
              {platform.statistics.longestStreak}
            </div>
            <div className="text-sm text-slate-600">Longest Streak</div>
          </div>
        </div>
      </motion.div>

      {/* Activity Heatmap */}
      <motion.div
        className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <ErrorBoundary
          fallback={({ error, retry }) => (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Heatmap Error
              </h3>
              <p className="text-red-700 mb-4">
                Failed to load activity heatmap.
              </p>
              <button
                onClick={retry}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          )}
        >
          <ActivityHeatmap
            activities={platform.recentActivity}
            timePeriod={timePeriod}
            colorScale={{
              empty: "#f3f4f6",
              low: config?.primaryColor
                ? `${config.primaryColor}30`
                : "#dcfce7",
              medium: config?.primaryColor
                ? `${config.primaryColor}60`
                : "#86efac",
              high: config?.primaryColor || "#22c55e",
            }}
            interactive={true}
          />
        </ErrorBoundary>
      </motion.div>
    </div>
  );
};

const ProgressView = ({ platform }: { platform: CodingPlatform }) => {
  const config = getPlatformConfig(platform.id);

  if (!platform) {
    return <PlatformUnavailableFallback platformName="Platform" />;
  }

  if (!platform.statistics) {
    return (
      <div className="space-y-8">
        <motion.div
          className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-3"
              style={{
                background: `linear-gradient(135deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
              }}
            >
              ⚡
            </div>
            <h3 className="text-3xl font-bold text-slate-800">
              {platform.name} Progress Tracker
            </h3>
          </div>
          <p className="text-slate-600 text-lg">
            No statistics available for progress tracking.
          </p>
        </motion.div>
      </div>
    );
  }

  const { statistics } = platform;

  // Calculate progress metrics
  const totalProblems = statistics.totalSolved;
  const easyProgress =
    (statistics.difficultyBreakdown.easy / totalProblems) * 100;
  const mediumProgress =
    (statistics.difficultyBreakdown.medium / totalProblems) * 100;
  const hardProgress =
    (statistics.difficultyBreakdown.hard / totalProblems) * 100;

  // Calculate improvement trends (mock data for demonstration)
  const monthlyProgress = [
    { month: "Jan", solved: 8 },
    { month: "Feb", solved: 12 },
    { month: "Mar", solved: 15 },
    { month: "Apr", solved: 18 },
    { month: "May", solved: 22 },
    { month: "Jun", solved: 25 },
  ];

  const goals = [
    {
      title: "Daily Consistency",
      current: statistics.currentStreak,
      target: 30,
      unit: "days",
      icon: "🔥",
    },
    {
      title: "Problem Solving",
      current: statistics.totalSolved,
      target: 200,
      unit: "problems",
      icon: "🎯",
    },
    {
      title: "Contest Rating",
      current: statistics.contestRating || 0,
      target: 2000,
      unit: "rating",
      icon: "⭐",
    },
    {
      title: "Hard Problems",
      current: statistics.difficultyBreakdown.hard,
      target: 50,
      unit: "problems",
      icon: "💪",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <motion.div
        className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold mr-3"
            style={{
              background: `linear-gradient(135deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
            }}
          >
            ⚡
          </div>
          <h3 className="text-3xl font-bold text-slate-800">
            {platform.name} Progress Tracker
          </h3>
        </div>
        <p className="text-slate-600 text-lg">
          Track improvement trends and achieve coding goals
        </p>
      </motion.div>

      {/* Goals Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goals.map((goal, index) => {
          const progressPercentage = Math.min(
            (goal.current / goal.target) * 100,
            100
          );

          return (
            <motion.div
              key={goal.title}
              className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
              whileHover={{ y: -2, scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{goal.icon}</span>
                <span className="text-sm font-medium text-slate-500">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-800 mb-2">
                {goal.title}
              </h4>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>
                    {goal.current} {goal.unit}
                  </span>
                  <span>
                    {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className="h-3 rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{
                      delay: 0.5 + index * 0.1,
                      duration: 1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500">
                {goal.target - goal.current > 0
                  ? `${goal.target - goal.current} ${goal.unit} to go`
                  : "Goal achieved! 🎉"}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Difficulty Distribution Progress */}
      <motion.div
        className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h4 className="text-xl font-bold text-slate-800 mb-6">
          Difficulty Distribution Progress
        </h4>

        <div className="space-y-6">
          {[
            {
              level: "Easy",
              count: statistics.difficultyBreakdown.easy,
              percentage: easyProgress,
              color: "#22c55e",
              target: Math.ceil(totalProblems * 0.5), // 50% target for easy
            },
            {
              level: "Medium",
              count: statistics.difficultyBreakdown.medium,
              percentage: mediumProgress,
              color: "#f59e0b",
              target: Math.ceil(totalProblems * 0.35), // 35% target for medium
            },
            {
              level: "Hard",
              count: statistics.difficultyBreakdown.hard,
              percentage: hardProgress,
              color: "#ef4444",
              target: Math.ceil(totalProblems * 0.15), // 15% target for hard
            },
          ].map((difficulty, index) => (
            <div key={difficulty.level} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">
                  {difficulty.level} Problems
                </span>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-800">
                    {difficulty.count}
                  </span>
                  <span className="text-sm text-slate-500 ml-2">
                    ({difficulty.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <motion.div
                  className="h-4 rounded-full flex items-center justify-end pr-2"
                  style={{ backgroundColor: difficulty.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${difficulty.percentage}%` }}
                  transition={{
                    delay: 0.8 + index * 0.2,
                    duration: 1,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-xs text-white font-medium">
                    {difficulty.count}
                  </span>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Progress Trend */}
      <motion.div
        className="p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h4 className="text-xl font-bold text-slate-800 mb-6">
          Monthly Progress Trend
        </h4>

        <div className="flex items-end justify-between space-x-2 h-40">
          {monthlyProgress.map((month, index) => {
            const maxSolved = Math.max(...monthlyProgress.map((m) => m.solved));
            const height = (month.solved / maxSolved) * 100;

            return (
              <div
                key={month.month}
                className="flex-1 flex flex-col items-center"
              >
                <motion.div
                  className="w-full rounded-t-lg flex items-end justify-center text-white text-xs font-medium"
                  style={{
                    background: `linear-gradient(180deg, ${config?.primaryColor}, ${config?.secondaryColor})`,
                    minHeight: "20px",
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  {month.solved}
                </motion.div>
                <span className="text-xs text-slate-600 mt-2 font-medium">
                  {month.month}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            Average:{" "}
            {(
              monthlyProgress.reduce((sum, m) => sum + m.solved, 0) /
              monthlyProgress.length
            ).toFixed(1)}{" "}
            problems/month
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function CodingPlatformsSection() {
  const [activePlatform, setActivePlatform] = useState<string>(
    codingPlatforms[0]?.id || "leetcode"
  );
  const [activeMode, setActiveMode] = useState<VisualizationMode>("dashboard");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);

  // Handle platform change with accessibility announcements
  const handlePlatformChange = (platformId: string) => {
    const platform =
      platforms.find((p) => p.id === platformId) ||
      codingPlatforms.find((p) => p.id === platformId);
    if (platform) {
      setActivePlatform(platformId);
      announceToScreenReader(`Switched to ${platform.name} platform`);

      // Generate and announce statistics summary for screen readers
      if (platform.statistics) {
        const summary = generateStatsSummary({
          totalSolved: platform.statistics.totalSolved,
          easy: platform.statistics.difficultyBreakdown.easy,
          medium: platform.statistics.difficultyBreakdown.medium,
          hard: platform.statistics.difficultyBreakdown.hard,
          currentStreak: platform.statistics.currentStreak,
          longestStreak: platform.statistics.longestStreak,
          ranking: platform.statistics.ranking,
          acceptanceRate: platform.statistics.acceptanceRate,
        });
        setTimeout(() => announceToScreenReader(summary), 500);
      }
    }
  };

  // Handle mode change with accessibility announcements
  const handleModeChange = (mode: VisualizationMode) => {
    if (mode !== activeMode) {
      setIsTransitioning(true);
      setActiveMode(mode);
      announceToScreenReader(`Switched to ${mode} view`);
    }
  };

  // Use the platform data hook for loading and error states
  const { platforms, isLoading, errors, retryPlatform, retryAll } =
    useMultiplePlatformData(
      codingPlatforms.map((p) => p.id),
      {
        retryAttempts: 3,
        retryDelay: 1000,
        enableAutoRetry: false,
      }
    );

  const currentPlatform =
    platforms.find((platform) => platform.id === activePlatform) ||
    codingPlatforms.find((platform) => platform.id === activePlatform);

  const renderVisualization = () => {
    if (!currentPlatform) return null;

    const transitionConfig = {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -30, scale: 0.95 },
      transition: { duration: 0.6 },
    };

    switch (activeMode) {
      case "dashboard":
        return (
          <motion.div key="dashboard-wrapper" {...transitionConfig}>
            <DashboardView platform={currentPlatform} />
          </motion.div>
        );
      case "achievements":
        return (
          <motion.div key="achievements-wrapper" {...transitionConfig}>
            <AchievementsView platform={currentPlatform} />
          </motion.div>
        );
      case "heatmap":
        return (
          <motion.div key="heatmap-wrapper" {...transitionConfig}>
            <HeatmapView platform={currentPlatform} />
          </motion.div>
        );
      case "progress":
        return (
          <motion.div key="progress-wrapper" {...transitionConfig}>
            <ProgressView platform={currentPlatform} />
          </motion.div>
        );
      default:
        return (
          <motion.div key="dashboard-wrapper" {...transitionConfig}>
            <DashboardView platform={currentPlatform} />
          </motion.div>
        );
    }
  };

  const { shouldUseReducedAnimations } = useMobileOptimizedAnimation();

  // Show loading state while platforms are loading
  if (isLoading) {
    return (
      <section
        id="coding-platforms"
        ref={sectionRef}
        className="min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-slate-900 via-gray-800 to-slate-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldUseReducedAnimations ? 0.3 : 0.8 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: shouldUseReducedAnimations ? 1 : 0.8,
              }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: shouldUseReducedAnimations ? 0.3 : 0.6,
                delay: shouldUseReducedAnimations ? 0 : 0.2,
              }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-blue-200 border border-white/30">
                Competitive Programming
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight px-4"
              initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldUseReducedAnimations ? 0.3 : 0.8,
                delay: shouldUseReducedAnimations ? 0 : 0.3,
              }}
            >
              <span className="bg-gradient-to-r from-white via-green-100 to-orange-200 bg-clip-text text-transparent">
                Coding Platforms
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light px-4"
              initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldUseReducedAnimations ? 0.3 : 0.8,
                delay: shouldUseReducedAnimations ? 0 : 0.4,
              }}
            >
              Loading coding platform data...
            </motion.p>
          </motion.div>

          <SectionLoadingSkeleton />
        </div>
      </section>
    );
  }

  // Show error state if all platforms failed to load
  if (platforms.length === 0 && Object.keys(errors).length > 0) {
    return (
      <section
        id="coding-platforms"
        ref={sectionRef}
        className="min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-slate-900 via-gray-800 to-slate-900 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldUseReducedAnimations ? 0.3 : 0.8 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight px-4"
              initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldUseReducedAnimations ? 0.3 : 0.8,
                delay: shouldUseReducedAnimations ? 0 : 0.3,
              }}
            >
              <span className="bg-gradient-to-r from-white via-green-100 to-orange-200 bg-clip-text text-transparent">
                Coding Platforms
              </span>
            </motion.h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <NetworkErrorFallback onRetry={retryAll} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section
        id="coding-platforms"
        ref={sectionRef}
        className="min-h-screen py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-900 via-slate-900 via-gray-800 to-slate-900 relative overflow-hidden"
      >
        {/* Modern background elements - reduced on mobile for performance */}
        {!shouldUseReducedAnimations && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 sm:top-40 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-32 sm:w-80 h-32 sm:h-80 bg-gradient-to-tr from-orange-200/20 to-purple-200/20 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Modern section header */}
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldUseReducedAnimations ? 0.3 : 0.8 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: shouldUseReducedAnimations ? 1 : 0.8,
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldUseReducedAnimations ? 0.3 : 0.6,
                delay: shouldUseReducedAnimations ? 0 : 0.2,
              }}
              className="inline-block mb-4 sm:mb-6"
            >
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-blue-200 border border-white/30">
                Competitive Programming
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight px-4"
              initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldUseReducedAnimations ? 0.3 : 0.8,
                delay: shouldUseReducedAnimations ? 0 : 0.3,
              }}
            >
              <span className="bg-gradient-to-r from-white via-green-100 to-orange-200 bg-clip-text text-transparent">
                Coding Platforms
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light px-4"
              initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldUseReducedAnimations ? 0.3 : 0.8,
                delay: shouldUseReducedAnimations ? 0 : 0.4,
              }}
            >
              Showcasing problem-solving skills and competitive programming
              achievements across multiple platforms
            </motion.p>
          </motion.div>

          {/* Platform selector */}
          <PlatformSelector
            platforms={platforms.length > 0 ? platforms : codingPlatforms}
            activePlatform={activePlatform}
            onPlatformChange={handlePlatformChange}
            errors={errors}
            onRetryPlatform={retryPlatform}
          />

          {/* Visualization mode selector */}
          <VisualizationModeSelector
            activeMode={activeMode}
            onModeChange={handleModeChange}
          />

          {/* Main content area */}
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldUseReducedAnimations ? 0.3 : 0.5 }}
            role="main"
            aria-live="polite"
            aria-label={`${
              currentPlatform?.name || "Platform"
            } ${activeMode} view`}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
              onExitComplete={() => {
                // Reset transition state when exit animation completes
                setIsTransitioning(false);
              }}
            >
              <div
                id={`platform-panel-${activePlatform}`}
                role="tabpanel"
                aria-labelledby={`platform-tab-${activePlatform}`}
              >
                <div
                  id={`visualization-panel-${activeMode}`}
                  role="tabpanel"
                  aria-labelledby={`visualization-tab-${activeMode}`}
                >
                  {renderVisualization()}
                </div>
              </div>
            </AnimatePresence>

            {/* Transition Loading Indicator */}
            {isTransitioning && (
              <motion.div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-700 font-medium">
                      Switching view...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
