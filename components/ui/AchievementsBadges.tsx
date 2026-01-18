"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodingAchievement, AchievementsBadgesProps } from "@/types";

/**
 * AchievementsBadges Component
 *
 * Interactive gallery component for displaying coding platform achievements
 * with filtering, tooltips, and modal views for detailed information.
 *
 * Features:
 * - Grid layout with staggered animations
 * - Category filtering (badge, certificate, contest, milestone, streak)
 * - Hover effects with scale and shadow animations
 * - Tooltip system for quick achievement info
 * - Modal for detailed achievement descriptions
 * - Rarity-based visual styling
 */
const AchievementsBadges: React.FC<AchievementsBadgesProps> = ({
  achievements,
  layout = "grid",
  showTooltips = true,
  maxItems,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    CodingAchievement["category"] | "all"
  >("all");
  const [selectedAchievement, setSelectedAchievement] =
    useState<CodingAchievement | null>(null);
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(
    null
  );

  // Filter achievements based on selected category
  const filteredAchievements = useMemo(() => {
    let filtered = achievements;

    if (selectedCategory !== "all") {
      filtered = achievements.filter(
        (achievement) => achievement.category === selectedCategory
      );
    }

    if (maxItems) {
      filtered = filtered.slice(0, maxItems);
    }

    return filtered;
  }, [achievements, selectedCategory, maxItems]);

  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(achievements.map((achievement) => achievement.category))
    );
    return ["all", ...uniqueCategories] as const;
  }, [achievements]);

  // Get rarity color scheme
  const getRarityColors = (rarity?: string) => {
    switch (rarity) {
      case "legendary":
        return {
          border: "border-yellow-400",
          glow: "shadow-yellow-400/20",
          bg: "bg-gradient-to-br from-yellow-50 to-orange-50",
        };
      case "epic":
        return {
          border: "border-purple-400",
          glow: "shadow-purple-400/20",
          bg: "bg-gradient-to-br from-purple-50 to-pink-50",
        };
      case "rare":
        return {
          border: "border-blue-400",
          glow: "shadow-blue-400/20",
          bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
        };
      default:
        return {
          border: "border-gray-300 dark:border-white/10",
          glow: "shadow-gray-400/10 dark:shadow-white/5",
          bg: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-gray-900/50",
        };
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
    },
  };

  // Handle missing achievements data
  if (!achievements || achievements.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No achievements available
        </h3>
        <p className="text-gray-600">
          No achievements have been earned yet. Keep solving problems to unlock
          achievements!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Category Filter Buttons */}
      <div
        className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6 justify-center px-2"
        role="group"
        aria-label="Filter achievements by category"
      >
        {categories.map((category, index) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                const direction = e.key === "ArrowLeft" ? -1 : 1;
                const nextIndex =
                  (index + direction + categories.length) % categories.length;
                setSelectedCategory(categories[nextIndex]);
              }
            }}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter by ${category === "all" ? "all categories" : category
              } achievements${selectedCategory === category ? " (currently selected)" : ""
              }`}
          >
            {category === "all"
              ? "All"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Achievements Grid */}
      <motion.div
        className={`grid gap-3 sm:gap-4 ${layout === "grid"
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        role="grid"
        aria-label={`${filteredAchievements.length} achievements ${selectedCategory !== "all" ? `in ${selectedCategory} category` : ""
          }`}
      >
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement) => {
            const rarityColors = getRarityColors(achievement.rarity);

            return (
              <motion.div
                key={achievement.id}
                layout
                variants={itemVariants}
                whileHover="hover"
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredAchievement(achievement.id)}
                onMouseLeave={() => setHoveredAchievement(null)}
                onClick={() => setSelectedAchievement(achievement)}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
              >
                <motion.div
                  variants={hoverVariants}
                  className={`
                    relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300
                    ${rarityColors.border} ${rarityColors.bg}
                    group-hover:shadow-xl group-hover:${rarityColors.glow}
                    backdrop-blur-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
                  `}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  role="gridcell"
                  tabIndex={0}
                  aria-label={`${achievement.title} achievement. ${achievement.description
                    }. Earned on ${formatDate(
                      achievement.earnedDate
                    )}. Category: ${achievement.category}${achievement.rarity ? `, Rarity: ${achievement.rarity}` : ""
                    }. Press Enter to view details.`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedAchievement(achievement);
                    }
                  }}
                >
                  {/* Achievement Icon */}
                  <div className="flex justify-center mb-2 sm:mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                      {/* Placeholder icon - replace with actual achievement icons */}
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {achievement.title.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Achievement Title */}
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-800 text-center mb-1 sm:mb-2 line-clamp-2 leading-tight">
                    {achievement.title}
                  </h3>

                  {/* Achievement Category Badge */}
                  <div className="flex justify-center mb-1 sm:mb-2">
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium bg-white/70 text-gray-600 rounded-full">
                      {achievement.category}
                    </span>
                  </div>

                  {/* Rarity Indicator */}
                  {achievement.rarity && (
                    <div className="flex justify-center">
                      <div
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${achievement.rarity === "legendary"
                            ? "bg-yellow-400"
                            : achievement.rarity === "epic"
                              ? "bg-purple-400"
                              : achievement.rarity === "rare"
                                ? "bg-blue-400"
                                : "bg-gray-400"
                          }`}
                      />
                    </div>
                  )}

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {showTooltips && hoveredAchievement === achievement.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl max-w-xs"
                    >
                      <div className="font-semibold mb-1">
                        {achievement.title}
                      </div>
                      <div className="text-gray-300 mb-2">
                        {achievement.description}
                      </div>
                      <div className="text-gray-400 text-xs">
                        Earned: {formatDate(achievement.earnedDate)}
                      </div>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {selectedAchievement.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {selectedAchievement.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                        {selectedAchievement.category}
                      </span>
                      {selectedAchievement.rarity && (
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${selectedAchievement.rarity === "legendary"
                              ? "bg-yellow-100 text-yellow-600"
                              : selectedAchievement.rarity === "epic"
                                ? "bg-purple-100 text-purple-600"
                                : selectedAchievement.rarity === "rare"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                            }`}
                        >
                          {selectedAchievement.rarity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600">
                    {selectedAchievement.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Earned Date
                  </h3>
                  <p className="text-gray-600">
                    {formatDate(selectedAchievement.earnedDate)}
                  </p>
                </div>

                {/* Metadata */}
                {selectedAchievement.metadata && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Details
                    </h3>
                    <div className="space-y-2">
                      {selectedAchievement.metadata.contestName && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contest:</span>
                          <span className="font-medium">
                            {selectedAchievement.metadata.contestName}
                          </span>
                        </div>
                      )}
                      {selectedAchievement.metadata.rank &&
                        selectedAchievement.metadata.participants && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rank:</span>
                            <span className="font-medium">
                              {selectedAchievement.metadata.rank} /{" "}
                              {selectedAchievement.metadata.participants}
                            </span>
                          </div>
                        )}
                      {selectedAchievement.metadata.streakLength && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Streak Length:</span>
                          <span className="font-medium">
                            {selectedAchievement.metadata.streakLength} days
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No achievements found
          </h3>
          <p className="text-gray-600">
            {selectedCategory === "all"
              ? "No achievements available to display."
              : `No ${selectedCategory} achievements found. Try selecting a different category.`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AchievementsBadges;
