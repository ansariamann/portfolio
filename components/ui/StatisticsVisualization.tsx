"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { PlatformStatistics } from "@/types/coding-platforms";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Award,
  Zap,
} from "lucide-react";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Filler
);

interface StatisticsVisualizationProps {
  statistics: PlatformStatistics;
  primaryColor: string;
  secondaryColor?: string;
  animate?: boolean;
  className?: string;
}

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(value * easeOutQuart));

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
  }, [value, duration]);

  return (
    <span className="font-bold tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  color: string;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  color,
  animate = true,
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="space-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600 dark:text-gray-400">{label}</span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {value}/{max}
        </span>
      </div>
      <div
        className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden relative"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${value} out of ${max} (${percentage.toFixed(
          1
        )}%)`}
      >
        <motion.div
          className="h-full rounded-full relative"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: animate ? `${percentage}%` : `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        >
          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500 dark:text-gray-400">
          {percentage.toFixed(1)}%
        </span>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-gray-600 dark:text-gray-300 font-medium"
          >
            {value > 0
              ? `${((value / max) * 100).toFixed(0)}% complete`
              : "No progress yet"}
          </motion.span>
        )}
      </div>
    </div>
  );
};

interface TrendIndicatorProps {
  value: number;
  previousValue?: number;
  label: string;
  format?: "number" | "percentage";
  showImprovement?: boolean;
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  value,
  previousValue,
  label,
  format = "number",
  showImprovement = true,
}) => {
  if (!previousValue) {
    return (
      <div
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
        role="status"
        aria-label={`${label}: ${value}, no trend data available`}
      >
        <Minus className="w-4 h-4" aria-hidden="true" />
        <span className="text-sm">{label}: No trend data</span>
      </div>
    );
  }

  const change = value - previousValue;
  const percentageChange = (change / previousValue) * 100;
  const isPositive = change > 0;
  const isNeutral = change === 0;

  const formatValue = (val: number) => {
    if (format === "percentage") {
      return `${val.toFixed(1)}%`;
    }
    return val.toLocaleString();
  };

  const getTrendDescription = () => {
    if (isNeutral) return "no change";
    const direction = isPositive ? "increased" : "decreased";
    return `${direction} by ${Math.abs(percentageChange).toFixed(1)}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center space-x-2 ${
        isPositive
          ? "text-green-600 dark:text-green-400"
          : isNeutral
          ? "text-gray-600 dark:text-gray-400"
          : "text-red-600 dark:text-red-400"
      }`}
      role="status"
      aria-label={`${label}: ${formatValue(value)}, ${getTrendDescription()}`}
    >
      {isPositive ? (
        <TrendingUp className="w-4 h-4" aria-hidden="true" />
      ) : isNeutral ? (
        <Minus className="w-4 h-4" aria-hidden="true" />
      ) : (
        <TrendingDown className="w-4 h-4" aria-hidden="true" />
      )}
      <span className="text-sm">
        {label}: {formatValue(value)}
        {!isNeutral && showImprovement && (
          <span className="ml-1">
            ({isPositive ? "+" : ""}
            {percentageChange.toFixed(1)}%)
          </span>
        )}
      </span>
      {showImprovement && !isNeutral && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-2 h-2 rounded-full ${
            isPositive ? "bg-green-500" : "bg-red-500"
          }`}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

const StatisticsVisualization: React.FC<StatisticsVisualizationProps> = ({
  statistics,
  primaryColor,
  secondaryColor = primaryColor,
  animate = true,
  className = "",
}) => {
  const [activeChart, setActiveChart] = useState<
    "difficulty" | "progress" | "trends" | "improvement"
  >("difficulty");

  // Handle missing statistics data
  if (!statistics) {
    return (
      <div className={`space-y-4 sm:space-y-6 ${className}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Statistics Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Statistics data is not available for visualization.
          </p>
        </div>
      </div>
    );
  }

  // Validate required statistics fields
  if (!statistics.difficultyBreakdown || statistics.totalSolved === undefined) {
    return (
      <div className={`space-y-4 sm:space-y-6 ${className}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-8 h-8 text-orange-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
            Incomplete Statistics Data
          </h3>
          <p className="text-orange-700 dark:text-orange-300">
            Some required statistics data is missing or incomplete.
          </p>
        </div>
      </div>
    );
  }

  // Difficulty breakdown chart data
  const difficultyData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [
          statistics.difficultyBreakdown.easy,
          statistics.difficultyBreakdown.medium,
          statistics.difficultyBreakdown.hard,
        ],
        backgroundColor: [
          "#10B981", // Green for Easy
          "#F59E0B", // Amber for Medium
          "#EF4444", // Red for Hard
        ],
        borderColor: ["#059669", "#D97706", "#DC2626"],
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const total = statistics.totalSolved;
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: data.datasets[0].borderWidth,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: primaryColor,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          title: function (context: any[]) {
            return `${context[0].label} Problems`;
          },
          label: function (context: { label?: string; parsed?: number }) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = statistics.totalSolved;
            const percentage = ((value / total) * 100).toFixed(1);
            return [
              `Count: ${value} problems`,
              `Percentage: ${percentage}%`,
              `Difficulty: ${label}`,
            ];
          },
          afterLabel: function (context: any) {
            const value = context.parsed;
            const total = statistics.totalSolved;
            if (total > 0) {
              return `Progress: ${Math.round((value / total) * 100)}% of total`;
            }
            return "";
          },
        },
      },
    },
    animation: {
      animateRotate: animate,
      animateScale: animate,
      duration: 1500,
      easing: "easeOutQuart" as const,
    },
    onHover: (event: any, elements: any[]) => {
      if (event.native && event.native.target) {
        event.native.target.style.cursor =
          elements.length > 0 ? "pointer" : "default";
      }
    },
  };

  // Progress metrics for visualization
  const progressMetrics = [
    {
      label: "Easy Problems",
      value: statistics.difficultyBreakdown.easy,
      max: Math.max(100, statistics.difficultyBreakdown.easy),
      color: "#10B981",
    },
    {
      label: "Medium Problems",
      value: statistics.difficultyBreakdown.medium,
      max: Math.max(80, statistics.difficultyBreakdown.medium),
      color: "#F59E0B",
    },
    {
      label: "Hard Problems",
      value: statistics.difficultyBreakdown.hard,
      max: Math.max(30, statistics.difficultyBreakdown.hard),
      color: "#EF4444",
    },
  ];

  // Key statistics cards
  const keyStats = [
    {
      icon: Target,
      label: "Total Solved",
      value: statistics.totalSolved,
      color: primaryColor,
    },
    {
      icon: Award,
      label: "Current Streak",
      value: statistics.currentStreak,
      suffix: " days",
      color: secondaryColor,
    },
    {
      icon: Zap,
      label: "Longest Streak",
      value: statistics.longestStreak,
      suffix: " days",
      color: "#8B5CF6",
    },
  ];

  // Generate sample improvement trend data (in real implementation, this would come from API)
  const generateTrendData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const currentTotal = statistics.totalSolved;

    // Generate realistic progression data
    const progressionData = months.map((month, index) => {
      const baseProgress = Math.floor(
        (currentTotal * (index + 1)) / months.length
      );
      const variation = Math.floor(Math.random() * 10) - 5; // Add some realistic variation
      return Math.max(0, baseProgress + variation);
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Total Problems Solved",
          data: progressionData,
          borderColor: primaryColor,
          backgroundColor: `${primaryColor}20`,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: primaryColor,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
        {
          label: "Difficulty Progression",
          data: months.map((_, index) => {
            const mediumRatio =
              statistics.difficultyBreakdown.medium / statistics.totalSolved;
            const hardRatio =
              statistics.difficultyBreakdown.hard / statistics.totalSolved;

            // Show progression in difficulty over time
            const totalAtMonth = progressionData[index];
            return Math.floor(totalAtMonth * (hardRatio + mediumRatio * 0.5));
          }),
          borderColor: secondaryColor,
          backgroundColor: `${secondaryColor}20`,
          fill: false,
          tension: 0.4,
          pointBackgroundColor: secondaryColor,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const trendChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: primaryColor,
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          title: function (context: any[]) {
            return `Progress in ${context[0].label}`;
          },
          label: function (context: any) {
            const datasetLabel = context.dataset.label;
            const value = context.parsed.y;
            return `${datasetLabel}: ${value} problems`;
          },
          afterBody: function (context: any[]) {
            const currentValue = context[0].parsed.y;
            const previousValue =
              context[0].dataIndex > 0
                ? context[0].dataset.data[context[0].dataIndex - 1]
                : 0;

            if (previousValue > 0) {
              const change = currentValue - previousValue;
              const changePercent = ((change / previousValue) * 100).toFixed(1);
              return `Change: ${
                change > 0 ? "+" : ""
              }${change} (${changePercent}%)`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function (value: any) {
            return `${value}`;
          },
        },
      },
    },
    animation: {
      duration: animate ? 2000 : 0,
      easing: "easeOutQuart" as const,
    },
  };

  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Chart Type Selector */}
      <div
        className="flex flex-wrap gap-1 sm:gap-2 justify-center px-2"
        role="tablist"
        aria-label="Select statistics chart type"
      >
        {[
          {
            key: "difficulty",
            label: "Difficulty Breakdown",
            shortLabel: "Difficulty",
          },
          { key: "progress", label: "Progress Bars", shortLabel: "Progress" },
          { key: "trends", label: "Key Metrics", shortLabel: "Metrics" },
          {
            key: "improvement",
            label: "Improvement Trends",
            shortLabel: "Trends",
          },
        ].map(({ key, label, shortLabel }, index) => (
          <button
            key={key}
            onClick={() =>
              setActiveChart(
                key as "difficulty" | "progress" | "trends" | "improvement"
              )
            }
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                const charts = [
                  "difficulty",
                  "progress",
                  "trends",
                  "improvement",
                ];
                const currentIndex = charts.indexOf(activeChart);
                const direction = e.key === "ArrowLeft" ? -1 : 1;
                const nextIndex =
                  (currentIndex + direction + charts.length) % charts.length;
                setActiveChart(charts[nextIndex] as typeof activeChart);
              }
            }}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              activeChart === key
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            role="tab"
            aria-selected={activeChart === key}
            aria-controls={`chart-panel-${key}`}
            aria-label={`${label} chart${
              activeChart === key ? " (currently selected)" : ""
            }`}
            tabIndex={activeChart === key ? 0 : -1}
          >
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Chart Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg"
          role="tabpanel"
          id={`chart-panel-${activeChart}`}
          aria-labelledby={`chart-tab-${activeChart}`}
        >
          {activeChart === "difficulty" && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
                Problems by Difficulty
              </h3>

              {/* Screen reader summary */}
              <div className="sr-only">
                <p>
                  Difficulty breakdown: {statistics.difficultyBreakdown.easy}{" "}
                  easy problems (
                  {(
                    (statistics.difficultyBreakdown.easy /
                      statistics.totalSolved) *
                    100
                  ).toFixed(1)}
                  %),
                  {statistics.difficultyBreakdown.medium} medium problems (
                  {(
                    (statistics.difficultyBreakdown.medium /
                      statistics.totalSolved) *
                    100
                  ).toFixed(1)}
                  %), and {statistics.difficultyBreakdown.hard} hard problems (
                  {(
                    (statistics.difficultyBreakdown.hard /
                      statistics.totalSolved) *
                    100
                  ).toFixed(1)}
                  %) out of {statistics.totalSolved} total problems solved.
                </p>
              </div>

              <div
                className="h-48 sm:h-64 flex items-center justify-center"
                role="img"
                aria-label={`Doughnut chart showing difficulty distribution: ${statistics.difficultyBreakdown.easy} easy, ${statistics.difficultyBreakdown.medium} medium, ${statistics.difficultyBreakdown.hard} hard problems`}
              >
                <div className="w-full max-w-xs sm:max-w-sm">
                  <Doughnut data={difficultyData} options={chartOptions} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center text-xs sm:text-sm">
                <div
                  className="space-y-1 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  role="region"
                  aria-label={`Easy problems: ${statistics.difficultyBreakdown.easy} solved`}
                >
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full mx-auto"
                    aria-hidden="true"
                  ></div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    <AnimatedCounter
                      value={statistics.difficultyBreakdown.easy}
                    />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Easy</div>
                </div>
                <div
                  className="space-y-1 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  role="region"
                  aria-label={`Medium problems: ${statistics.difficultyBreakdown.medium} solved`}
                >
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-amber-500 rounded-full mx-auto"
                    aria-hidden="true"
                  ></div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    <AnimatedCounter
                      value={statistics.difficultyBreakdown.medium}
                    />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Medium</div>
                </div>
                <div
                  className="space-y-1 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  role="region"
                  aria-label={`Hard problems: ${statistics.difficultyBreakdown.hard} solved`}
                >
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full mx-auto"
                    aria-hidden="true"
                  ></div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    <AnimatedCounter
                      value={statistics.difficultyBreakdown.hard}
                    />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Hard</div>
                </div>
              </div>
            </div>
          )}

          {activeChart === "progress" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
                Progress Overview
              </h3>
              <div className="space-y-4">
                {progressMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProgressBar
                      value={metric.value}
                      max={metric.max}
                      label={metric.label}
                      color={metric.color}
                      animate={animate}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Additional metrics */}
              {statistics.acceptanceRate && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <ProgressBar
                    value={statistics.acceptanceRate}
                    max={100}
                    label="Acceptance Rate"
                    color={primaryColor}
                    animate={animate}
                  />
                </motion.div>
              )}
            </div>
          )}

          {activeChart === "trends" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
                Key Statistics
              </h3>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {keyStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-3 sm:p-4 text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <IconComponent
                          className="w-6 h-6 sm:w-8 sm:h-8"
                          style={{ color: stat.color }}
                        />
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix || ""}
                        />
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {statistics.ranking && (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Ranking
                    </div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: primaryColor }}
                    >
                      #{statistics.ranking.toLocaleString()}
                    </div>
                  </div>
                )}

                {statistics.contestRating && (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Contest Rating
                    </div>
                    <div
                      className="text-2xl font-bold"
                      style={{ color: secondaryColor }}
                    >
                      <AnimatedCounter value={statistics.contestRating} />
                    </div>
                  </div>
                )}
              </div>

              {/* Trend Indicators (placeholder for future enhancement) */}
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Trends
                </h4>
                <TrendIndicator
                  value={statistics.totalSolved}
                  label="Total Problems"
                />
                {statistics.acceptanceRate && (
                  <TrendIndicator
                    value={statistics.acceptanceRate}
                    label="Acceptance Rate"
                    format="percentage"
                  />
                )}
              </div>
            </div>
          )}

          {activeChart === "improvement" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
                Improvement Trends
              </h3>

              <div className="h-64">
                <Line data={generateTrendData()} options={trendChartOptions} />
              </div>

              {/* Improvement Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Progress Insights
                  </h4>
                  <div className="space-y-2">
                    <TrendIndicator
                      value={statistics.totalSolved}
                      previousValue={Math.max(0, statistics.totalSolved - 25)}
                      label="Monthly Growth"
                      showImprovement={true}
                    />
                    <TrendIndicator
                      value={statistics.currentStreak}
                      previousValue={Math.max(0, statistics.currentStreak - 3)}
                      label="Streak Improvement"
                      showImprovement={true}
                    />
                    {statistics.acceptanceRate && (
                      <TrendIndicator
                        value={statistics.acceptanceRate}
                        previousValue={Math.max(
                          0,
                          statistics.acceptanceRate - 5.2
                        )}
                        label="Accuracy Trend"
                        format="percentage"
                        showImprovement={true}
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Difficulty Progression
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Easy → Medium
                      </span>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {Math.round(
                          (statistics.difficultyBreakdown.medium /
                            (statistics.difficultyBreakdown.easy +
                              statistics.difficultyBreakdown.medium)) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Medium → Hard
                      </span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {Math.round(
                          (statistics.difficultyBreakdown.hard /
                            (statistics.difficultyBreakdown.medium +
                              statistics.difficultyBreakdown.hard)) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Overall Difficulty
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {(
                          ((statistics.difficultyBreakdown.medium * 2 +
                            statistics.difficultyBreakdown.hard * 3) /
                            (statistics.totalSolved * 3)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                  Performance Summary
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      <AnimatedCounter
                        value={
                          Math.round((statistics.totalSolved / 30) * 10) / 10
                        }
                        suffix="/day"
                      />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Avg. Daily
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      <AnimatedCounter
                        value={Math.round(
                          (statistics.currentStreak /
                            statistics.longestStreak) *
                            100
                        )}
                        suffix="%"
                      />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Streak Ratio
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      <AnimatedCounter
                        value={Math.round(
                          ((statistics.difficultyBreakdown.medium +
                            statistics.difficultyBreakdown.hard) /
                            statistics.totalSolved) *
                            100
                        )}
                        suffix="%"
                      />
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Advanced
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {statistics.contestRating ? (
                        <AnimatedCounter
                          value={Math.round(statistics.contestRating / 100)}
                          suffix="00+"
                        />
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StatisticsVisualization;
