"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ExternalLink, TrendingUp, Award, Calendar } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PlatformCardProps } from "@/types/coding-platforms";

/**
 * Animated counter component for statistics
 */
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * value);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/**
 * Difficulty breakdown progress bar component
 */
interface DifficultyBreakdownProps {
  breakdown: {
    easy: number;
    medium: number;
    hard: number;
  };
  total: number;
}

function DifficultyBreakdown({ breakdown, total }: DifficultyBreakdownProps) {
  const easyPercentage = (breakdown.easy / total) * 100;
  const mediumPercentage = (breakdown.medium / total) * 100;
  const hardPercentage = (breakdown.hard / total) * 100;

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Difficulty Breakdown
      </div>

      {/* Progress bars */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-green-600 font-medium">Easy</span>
          <span className="text-gray-600 dark:text-gray-400">
            {breakdown.easy}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${easyPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-yellow-600 font-medium">Medium</span>
          <span className="text-gray-600 dark:text-gray-400">
            {breakdown.medium}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-yellow-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${mediumPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-red-600 font-medium">Hard</span>
          <span className="text-gray-600 dark:text-gray-400">
            {breakdown.hard}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-red-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${hardPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
        <span>Total Solved</span>
        <span className="font-semibold">{total}</span>
      </div>
    </div>
  );
}

/**
 * Main PlatformCard component with animated statistics and interactive features
 */
export default function PlatformCard({
  platform,
  isActive = false,
  onClick,
  className = "",
}: PlatformCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showExpandedDetails, setShowExpandedDetails] = useState(false);
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    hover: {
      y: -8,
      scale: 1.02,
    },
  };

  const detailsVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
    },
  };

  // Handle external link click
  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(platform.profileUrl, "_blank", "noopener,noreferrer");
  };

  // Handle card click
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowExpandedDetails(!showExpandedDetails);
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer",
        "border border-gray-200 dark:border-gray-700",
        "transition-all duration-300",
        isActive &&
          "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-900",
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Platform branding header */}
      <div
        className="relative h-20 flex items-center justify-between px-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${platform.primaryColor} 0%, ${
            platform.secondaryColor || platform.primaryColor
          } 100%)`,
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Image
              src={platform.logoUrl}
              alt={`${platform.name} logo`}
              width={24}
              height={24}
              className="w-6 h-6"
              onError={(e) => {
                // Fallback to text if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
            <span className="hidden text-sm font-bold">
              {platform.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold">{platform.name}</h3>
            <p className="text-sm opacity-90">@{platform.username}</p>
          </div>
        </div>

        {/* External link button */}
        <motion.button
          onClick={handleExternalClick}
          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Visit ${platform.name} profile`}
        >
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Main statistics */}
      <div className="p-6 space-y-6">
        {/* Key metrics grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter value={platform.statistics.totalSolved} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Problems Solved
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              <AnimatedCounter value={platform.statistics.currentStreak} />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Current Streak
            </div>
          </div>

          {platform.statistics.ranking && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter
                  value={platform.statistics.ranking}
                  prefix="#"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Global Rank
              </div>
            </div>
          )}

          {platform.statistics.acceptanceRate && (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter
                  value={Math.round(platform.statistics.acceptanceRate)}
                  suffix="%"
                />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Acceptance Rate
              </div>
            </div>
          )}
        </div>

        {/* Difficulty breakdown - always visible */}
        <DifficultyBreakdown
          breakdown={platform.statistics.difficultyBreakdown}
          total={platform.statistics.totalSolved}
        />

        {/* Hover details */}
        <motion.div
          variants={detailsVariants}
          initial="hidden"
          animate={isHovered || showExpandedDetails ? "visible" : "hidden"}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            {/* Additional statistics */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  Longest Streak: {platform.statistics.longestStreak} days
                </span>
              </div>

              {platform.statistics.contestRating && (
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Contest Rating: {platform.statistics.contestRating}
                  </span>
                </div>
              )}

              {platform.statistics.contestsParticipated && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Contests: {platform.statistics.contestsParticipated}
                  </span>
                </div>
              )}

              {platform.statistics.totalPoints && (
                <div className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-purple-500 font-bold text-center">
                    ★
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Points: {platform.statistics.totalPoints.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Recent achievements preview */}
            {platform.achievements.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recent Achievements
                </div>
                <div className="flex space-x-2 overflow-x-auto">
                  {platform.achievements.slice(0, 3).map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center"
                      title={achievement.title}
                    >
                      <Image
                        src={achievement.iconUrl}
                        alt={achievement.title}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6'/%3E%3Cpath d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18'/%3E%3Cpath d='M4 22h16'/%3E%3Cpath d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'/%3E%3Cpath d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'/%3E%3Cpath d='M18 2H6v7a6 6 0 0 0 12 0V2Z'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  ))}
                  {platform.achievements.length > 3 && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300">
                      +{platform.achievements.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute top-0 left-0 w-full h-1"
          style={{ backgroundColor: platform.primaryColor }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${platform.primaryColor}20 0%, ${
            platform.secondaryColor || platform.primaryColor
          }20 100%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
