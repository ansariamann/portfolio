"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ActivityHeatmapProps, RecentActivity } from "@/types";

/**
 * ActivityHeatmap Component
 *
 * Creates a GitHub-style contribution heatmap for coding activity visualization.
 * Shows daily problem-solving activity with color intensity based on problems solved.
 * Includes interactive tooltips and smooth transitions between time periods.
 */
export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({
  activities,
  timePeriod = "year",
  colorScale = {
    empty: "#ebedf0",
    low: "#9be9a8",
    medium: "#40c463",
    high: "#30a14e",
  },
  interactive = true,
}) => {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [currentTimePeriod, setCurrentTimePeriod] = useState(timePeriod);

  // Calculate date range based on time period
  const dateRange = useMemo(() => {
    const today = new Date();
    let startDate: Date;

    switch (currentTimePeriod) {
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case "quarter":
        const quarterStart = Math.floor(today.getMonth() / 3) * 3;
        startDate = new Date(today.getFullYear(), quarterStart, 1);
        break;
      case "year":
      default:
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
    }

    return { startDate, endDate: today };
  }, [currentTimePeriod]);

  // Process activities into daily counts
  const dailyActivity = useMemo(() => {
    if (!activities || activities.length === 0) {
      return new Map();
    }

    const activityMap = new Map<
      string,
      {
        count: number;
        activities: RecentActivity[];
        streak: number;
      }
    >();

    activities.forEach((activity) => {
      const dateKey = activity.solvedDate.toISOString().split("T")[0];
      const existing = activityMap.get(dateKey) || {
        count: 0,
        activities: [],
        streak: 0,
      };

      activityMap.set(dateKey, {
        count: existing.count + 1,
        activities: [...existing.activities, activity],
        streak: existing.streak,
      });
    });

    return activityMap;
  }, [activities]);

  // Handle missing activities data
  if (!activities || activities.length === 0) {
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No Activity Data
        </h3>
        <p className="text-gray-600">
          No coding activity data is available for heatmap visualization.
        </p>
      </motion.div>
    );
  }

  // Helper function to determine color intensity
  const getIntensityLevel = (
    count: number
  ): "empty" | "low" | "medium" | "high" => {
    if (count === 0) return "empty";
    if (count <= 2) return "low";
    if (count <= 5) return "medium";
    return "high";
  };

  // Get color intensity based on activity count
  const getIntensityColor = (count: number): string => {
    if (count === 0) return colorScale.empty;
    if (count === 1) return colorScale.low;
    if (count <= 3) return colorScale.medium;
    return colorScale.high;
  };

  // Generate calendar grid from processed data
  const calendarWeeks = useMemo(() => {
    const weeks: Array<
      Array<{
        date: Date;
        dateKey: string;
        count: number;
        activities: RecentActivity[];
        intensity: "empty" | "low" | "medium" | "high";
      }>
    > = [];

    const startDate = new Date(dateRange.startDate);
    const firstDay = new Date(startDate);
    firstDay.setDate(firstDay.getDate() - firstDay.getDay());

    let currentWeek: (typeof weeks)[0] = [];
    const current = new Date(firstDay);

    while (current <= dateRange.endDate || currentWeek.length < 7) {
      const dateKey = current.toISOString().split("T")[0];
      const dayData = dailyActivity.get(dateKey);

      currentWeek.push({
        date: new Date(current),
        dateKey,
        count: dayData?.count || 0,
        activities: dayData?.activities || [],
        intensity: getIntensityLevel(dayData?.count || 0),
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      current.setDate(current.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [dailyActivity, dateRange]);

  // Get tooltip content for a specific date
  const getTooltipContent = (dateKey: string) => {
    const dayData = dailyActivity.get(dateKey);
    if (!dayData) return null;

    const date = new Date(dateKey);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      date: formattedDate,
      count: dayData.count,
      activities: dayData.activities,
      streak: 0, // Simplified for now
    };
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.02,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="w-full">
      {/* Time Period Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            Coding Activity
          </h3>
          <div
            className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
            role="group"
            aria-label="Select time period for activity heatmap"
          >
            {(["month", "quarter", "year"] as const).map((period, index) => (
              <button
                key={period}
                onClick={() => setCurrentTimePeriod(period)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    e.preventDefault();
                    const periods = ["month", "quarter", "year"];
                    const direction = e.key === "ArrowLeft" ? -1 : 1;
                    const nextIndex =
                      (index + direction + periods.length) % periods.length;
                    setCurrentTimePeriod(periods[nextIndex] as typeof period);
                  }
                }}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  currentTimePeriod === period
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
                aria-pressed={currentTimePeriod === period}
                aria-label={`Show ${period} view${
                  currentTimePeriod === period ? " (currently selected)" : ""
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <span className="hidden sm:inline">Less</span>
          <div className="flex space-x-1">
            {Object.values(colorScale).map((color, index) => (
              <div
                key={index}
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="hidden sm:inline">More</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Month Labels */}
        <div className="flex mb-2 text-xs text-gray-500 dark:text-gray-400">
          {currentTimePeriod === "year" && (
            <>
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month, index) => (
                <div key={month} className="flex-1 text-center">
                  {index % 2 === 0 ? month : ""}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Calendar Grid */}
        <div
          className="flex space-x-0.5 sm:space-x-1"
          role="img"
          aria-label={`Activity heatmap for ${currentTimePeriod} showing coding activity levels`}
        >
          {/* Day Labels */}
          <div className="flex flex-col space-y-0.5 sm:space-y-1 mr-1 sm:mr-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div
                  key={day}
                  className="w-4 sm:w-6 h-2.5 sm:h-3 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                >
                  {index % 2 === 1 ? day.charAt(0) : ""}
                </div>
              )
            )}
          </div>

          {/* Heatmap Cells */}
          <div className="flex space-x-0.5 sm:space-x-1 overflow-x-auto pb-2">
            {calendarWeeks.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col space-y-0.5 sm:space-y-1"
              >
                {week.map((day) => (
                  <motion.div
                    key={day.dateKey}
                    variants={cellVariants}
                    whileHover={interactive ? "hover" : undefined}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transition-all duration-200 ${
                      interactive
                        ? "cursor-pointer hover:ring-1 sm:hover:ring-2 hover:ring-blue-400 hover:ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        : ""
                    }`}
                    style={{
                      backgroundColor: getIntensityColor(day.count),
                    }}
                    onMouseEnter={() =>
                      interactive && setHoveredDate(day.dateKey)
                    }
                    onMouseLeave={() => interactive && setHoveredDate(null)}
                    onClick={() => interactive && setHoveredDate(day.dateKey)}
                    onKeyDown={(e) => {
                      if (interactive && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setHoveredDate(day.dateKey);
                      }
                    }}
                    tabIndex={interactive ? 0 : -1}
                    role={interactive ? "button" : undefined}
                    aria-label={
                      interactive
                        ? `${day.date.toLocaleDateString()}: ${
                            day.count === 0
                              ? "No problems solved"
                              : `${day.count} problem${
                                  day.count !== 1 ? "s" : ""
                                } solved`
                          }`
                        : undefined
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Tooltip */}
        <AnimatePresence>
          {interactive && hoveredDate && (
            <motion.div
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute z-10 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg pointer-events-none"
              style={{
                left: "50%",
                top: "-10px",
                transform: "translateX(-50%) translateY(-100%)",
              }}
            >
              {(() => {
                const tooltip = getTooltipContent(hoveredDate);
                if (!tooltip) return null;

                return (
                  <div className="min-w-48">
                    <div className="font-medium mb-1">{tooltip.date}</div>
                    <div className="text-gray-300">
                      {tooltip.count === 0
                        ? "No problems solved"
                        : tooltip.count === 1
                        ? "1 problem solved"
                        : `${tooltip.count} problems solved`}
                    </div>
                    {tooltip.streak > 0 && (
                      <div className="text-green-400 text-xs mt-1">
                        {tooltip.streak} day streak
                      </div>
                    )}
                    {tooltip.activities.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {tooltip.activities
                          .slice(0, 3)
                          .map((activity: RecentActivity, index: number) => (
                            <div key={index} className="text-xs text-gray-400">
                              <span
                                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                  activity.difficulty === "easy"
                                    ? "bg-green-500"
                                    : activity.difficulty === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              />
                              {activity.problemTitle}
                            </div>
                          ))}
                        {tooltip.activities.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{tooltip.activities.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Summary Statistics */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            {Array.from(dailyActivity.values()).reduce(
              (sum, day) => sum + day.count,
              0
            )}
          </span>{" "}
          problems solved in {currentTimePeriod}
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            {
              Array.from(dailyActivity.values()).filter((day) => day.count > 0)
                .length
            }
          </span>{" "}
          active days
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            {Math.max(
              ...Array.from(dailyActivity.values()).map((day) => day.streak)
            )}
          </span>{" "}
          longest streak
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
