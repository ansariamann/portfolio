"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Calendar,
  Clock,
  Code,
  Tag,
  ChevronDown,
} from "lucide-react";
import {
  RecentActivity as RecentActivityType,
  RecentActivityProps,
} from "@/types";

/**
 * RecentActivity Component
 *
 * Displays a timeline-style list of recent problems solved with:
 * - Difficulty color coding
 * - Problem tags display
 * - Expandable details with smooth animations
 * - External links to problems
 * - Lazy loading for extensive lists
 * - Date grouping functionality
 */
export const RecentActivity: React.FC<RecentActivityProps> = ({
  activities,
  maxItems = 10,
  expandable = true,
  groupByDate = false,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(maxItems);

  // Sort activities by date (most recent first)
  const sortedActivities = useMemo(() => {
    return [...activities].sort(
      (a, b) =>
        new Date(b.solvedDate).getTime() - new Date(a.solvedDate).getTime()
    );
  }, [activities]);

  // Group activities by date if requested
  const groupedActivities = useMemo(() => {
    if (!groupByDate) {
      return { ungrouped: sortedActivities.slice(0, visibleCount) };
    }

    const groups: Record<string, RecentActivityType[]> = {};
    sortedActivities.slice(0, visibleCount).forEach((activity) => {
      const dateKey = new Date(activity.solvedDate).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });

    return groups;
  }, [sortedActivities, visibleCount, groupByDate]);

  // Toggle expanded state for an activity
  const toggleExpanded = (activityId: string) => {
    if (!expandable) return;

    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  // Load more activities (lazy loading)
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + maxItems, activities.length));
  };

  // Get difficulty color classes
  const getDifficultyColor = (difficulty: RecentActivityType["difficulty"]) => {
    switch (difficulty) {
      case "easy":
        return {
          bg: "bg-green-100 dark:bg-green-900/20",
          text: "text-green-700 dark:text-green-300",
          border: "border-green-200 dark:border-green-800",
          dot: "bg-green-500",
        };
      case "medium":
        return {
          bg: "bg-yellow-100 dark:bg-yellow-900/20",
          text: "text-yellow-700 dark:text-yellow-300",
          border: "border-yellow-200 dark:border-yellow-800",
          dot: "bg-yellow-500",
        };
      case "hard":
        return {
          bg: "bg-red-100 dark:bg-red-900/20",
          text: "text-red-700 dark:text-red-300",
          border: "border-red-200 dark:border-red-800",
          dot: "bg-red-500",
        };
      default:
        return {
          bg: "bg-gray-100 dark:bg-gray-900/20",
          text: "text-gray-700 dark:text-gray-300",
          border: "border-gray-200 dark:border-gray-800",
          dot: "bg-gray-500",
        };
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  // Format solution time
  const formatSolutionTime = (minutes?: number) => {
    if (!minutes) return null;

    if (minutes < 60) {
      return `${minutes}m`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours}h`;
  };

  // Render individual activity item
  const renderActivityItem = (activity: RecentActivityType, index: number) => {
    const isExpanded = expandedItems.has(activity.id);
    const difficultyColors = getDifficultyColor(activity.difficulty);
    const solutionTime = formatSolutionTime(activity.timeSpent);

    return (
      <motion.div
        key={activity.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        className="relative"
      >
        {/* Timeline dot */}
        <div className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 z-10">
          <div
            className={`w-full h-full rounded-full ${difficultyColors.dot}`}
          />
        </div>

        {/* Timeline line */}
        <div className="absolute left-1.5 top-9 w-0.5 h-full bg-gray-200 dark:bg-gray-700 -z-10" />

        {/* Activity card */}
        <div className="ml-6 sm:ml-8 pb-4 sm:pb-6">
          <motion.div
            className={`
              p-3 sm:p-4 rounded-lg border transition-all duration-200 cursor-pointer
              ${difficultyColors.bg} ${difficultyColors.border}
              hover:shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            onClick={() => toggleExpanded(activity.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleExpanded(activity.id);
              }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            tabIndex={0}
            role="button"
            aria-expanded={expandable ? isExpanded : undefined}
            aria-label={`${activity.problemTitle} - ${
              activity.difficulty
            } difficulty problem solved on ${formatDate(
              new Date(activity.solvedDate)
            )}${
              expandable
                ? isExpanded
                  ? ". Press Enter to collapse details."
                  : ". Press Enter to expand details."
                : ""
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 sm:gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2 mb-1">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                    {activity.problemTitle}
                  </h3>
                  {activity.problemUrl && (
                    <motion.a
                      href={activity.problemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.a>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${difficultyColors.bg} ${difficultyColors.text}`}
                  >
                    {activity.difficulty}
                  </span>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span className="hidden sm:inline">
                      {formatDate(new Date(activity.solvedDate))}
                    </span>
                    <span className="sm:hidden">
                      {formatDate(new Date(activity.solvedDate)).split(" ")[0]}
                    </span>
                  </div>

                  {solutionTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{solutionTime}</span>
                    </div>
                  )}

                  {activity.language && (
                    <div className="hidden sm:flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      <span>{activity.language}</span>
                    </div>
                  )}
                </div>
              </div>

              {expandable && (
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 dark:text-gray-500 flex-shrink-0"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              )}
            </div>

            {/* Tags preview (always visible) */}
            {activity.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {activity.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {tag}
                  </span>
                ))}
                {activity.tags.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                    +{activity.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Expandable details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                    {/* All tags */}
                    {activity.tags.length > 3 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          All Tags
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {activity.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                            >
                              <Tag className="w-2.5 h-2.5" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      {activity.isAccepted !== undefined && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 dark:text-gray-400">
                            Status:
                          </span>
                          <span
                            className={
                              activity.isAccepted
                                ? "text-green-600 dark:text-green-400"
                                : "text-orange-600 dark:text-orange-400"
                            }
                          >
                            {activity.isAccepted ? "Accepted" : "Not Accepted"}
                          </span>
                        </div>
                      )}

                      {activity.attemptCount && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 dark:text-gray-400">
                            Attempts:
                          </span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {activity.attemptCount}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 dark:text-gray-400">
                          Solved:
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {new Date(activity.solvedDate).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Problem link */}
                    {activity.problemUrl && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <motion.a
                          href={activity.problemUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Problem
                        </motion.a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Render date group
  const renderDateGroup = (date: string, activities: RecentActivityType[]) => (
    <div key={date} className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {date}
        </h3>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activities.length} problem{activities.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="space-y-0">
        {activities.map((activity, index) =>
          renderActivityItem(activity, index)
        )}
      </div>
    </div>
  );

  if (activities.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Recent Activity
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Start solving problems to see your activity timeline here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Screen reader summary */}
      <div className="sr-only">
        <p>
          Recent coding activity timeline showing{" "}
          {Math.min(visibleCount, activities.length)} of {activities.length}{" "}
          problems solved.
          {groupByDate
            ? "Activities are grouped by date."
            : "Activities are listed chronologically."}
          {expandable ? "Each activity can be expanded for more details." : ""}
        </p>
      </div>

      {/* Activity timeline */}
      <div
        className="relative"
        role="feed"
        aria-label="Recent coding activity timeline"
        aria-live="polite"
      >
        {groupByDate ? (
          <div className="space-y-6">
            {Object.entries(groupedActivities).map(([date, activities]) =>
              renderDateGroup(date, activities)
            )}
          </div>
        ) : (
          <div className="space-y-0">
            {groupedActivities.ungrouped?.map((activity, index) =>
              renderActivityItem(activity, index)
            )}
          </div>
        )}
      </div>

      {/* Load more button */}
      {visibleCount < activities.length && (
        <div className="text-center pt-4">
          <motion.button
            onClick={loadMore}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More ({activities.length - visibleCount} remaining)
          </motion.button>
        </div>
      )}

      {/* Activity summary */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        Showing {Math.min(visibleCount, activities.length)} of{" "}
        {activities.length} activities
      </div>
    </div>
  );
};

export default RecentActivity;
