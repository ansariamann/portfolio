"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { codingPlatforms, getPlatformConfig } from "@/data/coding-platforms";
import { CodingPlatform } from "@/types/coding-platforms";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { useMultiplePlatformData } from "@/lib/hooks/usePlatformData";
import {
  ensureContrast,
  getAccessibleTextColor,
  announceToScreenReader,
  generateStatsSummary,
} from "@/lib/accessibility";
import StatisticsVisualization from "@/components/ui/StatisticsVisualization";
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
        className="glass-card flex flex-col items-center justify-between p-4 sm:p-6 rounded-[1.5rem]"
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
              className={`font-bold text-foreground ${
                isSmallMobile ? "text-lg" : "text-xl sm:text-2xl"
              }`}
            >
              {platform.name}
            </h3>
            <p
              className={`text-muted-foreground ${
                isSmallMobile ? "text-sm" : "text-base sm:text-lg"
              }`}
            >
              @{platform.username}
            </p>
            <a
              href={platform.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 mt-1"
            >
              View Profile →
            </a>
          </div>
        </div>

        {platform.statistics ? (
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
            <div className="bg-secondary/30 rounded-xl p-3 sm:p-4">
              <div
                className={`font-bold text-foreground ${
                  isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                }`}
              >
                {platform.statistics.totalSolved}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Problems Solved
              </div>
            </div>
            <div className="bg-secondary/30 rounded-xl p-3 sm:p-4">
              <div
                className={`font-bold text-foreground ${
                  isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                }`}
              >
                {platform.statistics.currentStreak}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Current Streak
              </div>
            </div>
            {platform.statistics.ranking && (
              <div
                className={`bg-secondary/30 rounded-xl p-3 sm:p-4 ${
                  getOptimalGridColumns(3) === 2
                    ? "col-span-2 sm:col-span-1"
                    : ""
                }`}
              >
                <div
                  className={`font-bold text-foreground ${
                    isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                  }`}
                >
                  #{platform.statistics.ranking.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Global Ranking
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground text-sm">
              Statistics not available for this platform.
            </p>
          </div>
        )}
      </motion.div>

      {/* Interactive Statistics Visualization */}
      <ErrorBoundary
        fallback={({ error, retry }) => (
          <div className="bg-destructive/10 rounded-3xl border border-destructive/20 p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Statistics Error
              </h3>
              <p className="text-destructive/80 mb-4">
                Failed to load statistics visualization.
              </p>
              <button
                onClick={retry}
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      >
        {platform.statistics ? (
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
              className="glass-card rounded-[1.5rem] p-6"
            />
          </motion.div>
        ) : null}
      </ErrorBoundary>

      {/* Recent Activity Timeline - Full Width */}
      <motion.div
        className="p-4 sm:p-6 glass-card rounded-[1.5rem]"
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
            className={`font-bold text-foreground ${
              isSmallMobile ? "text-lg" : "text-xl"
            }`}
          >
            Recent Activity
          </h4>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {platform.recentActivity.length} problems
          </span>
        </div>
        <div
          className={`overflow-y-auto ${isMobile ? "max-h-64" : "max-h-96"}`}
        >
          <ErrorBoundary
            fallback={({ error, retry }) => (
              <div className="text-center py-4">
                <p className="text-destructive text-sm mb-2">
                  Failed to load recent activity
                </p>
                <button
                  onClick={retry}
                  className="text-xs px-3 py-1 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded transition-colors"
                >
                  Retry
                </button>
              </div>
            )}
          >
            {platform.recentActivity && platform.recentActivity.length > 0 ? (
              <RecentActivity
                activities={platform.recentActivity}
                maxItems={isMobile ? 5 : 8}
                expandable={!isSmallMobile}
                groupByDate={false}
              />
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">
                  No recent activity available
                </p>
              </div>
            )}
          </ErrorBoundary>
        </div>
      </motion.div>
    </div>
  );
};







export default function CodingPlatformsSection() {
  const sectionRef = useRef(null);

  // Use the platform data hook for loading and error states
  // Since data is available synchronously, we can skip async loading
  const platforms = codingPlatforms;
  const isLoading = false;
  const errors: Record<string, Error> = {};
  const retryAll = () => {};

  const currentPlatform = codingPlatforms[0];



  const { shouldUseReducedAnimations } = useMobileOptimizedAnimation();

  // Show loading state while platforms are loading
  if (isLoading) {
    return (
      <section
        id="coding-platforms"
        ref={sectionRef}
        className="section-shell border-t border-border/50 relative"
      >
        <div className="container-main relative z-10">
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
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-primary border border-border/50">
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
              <span className="text-foreground">Coding Platforms</span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light px-4"
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
        className="section-shell border-t border-border/50 relative"
      >
        <div className="container-main relative z-10">
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
              <span className="text-foreground">Coding Platforms</span>
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
        className="section-shell border-t border-border/50 relative overflow-hidden"
      >
        {/* Modern background elements - reduced on mobile for performance */}
        {!shouldUseReducedAnimations && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 sm:top-40 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-primary/5 rounded-full blur-3xl"
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
              className="absolute bottom-20 sm:bottom-40 right-10 sm:right-20 w-32 sm:w-80 h-32 sm:h-80 bg-primary/10 rounded-full blur-3xl"
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
            {/* Subtle grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        )}

        <div className="container-main relative z-10">
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
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/50 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-primary border border-border/50">
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
              <span className="text-foreground">Coding Platforms</span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light px-4"
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

          {/* Main content area */}
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldUseReducedAnimations ? 0.3 : 0.5 }}
            role="main"
            aria-live="polite"
            aria-label={currentPlatform ? `${currentPlatform.name} view` : "Platform view"}
          >
            {currentPlatform && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldUseReducedAnimations ? 0.2 : 0.4 }}
                id={`platform-panel-${currentPlatform.id}`}
                role="tabpanel"
                aria-labelledby={`platform-tab-${currentPlatform.id}`}
              >
                <DashboardView platform={currentPlatform} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
}
