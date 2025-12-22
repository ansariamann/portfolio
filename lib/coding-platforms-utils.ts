/**
 * Utility functions for coding platforms data processing and validation
 * Provides helper functions for data manipulation, calculations, and validation
 */

import {
  CodingPlatform,
  PlatformStatistics,
  CodingAchievement,
  RecentActivity,
  DifficultyBreakdown,
  AchievementCategory,
  AchievementRarity,
  Difficulty,
} from "@/types";

/**
 * Data validation functions
 */

/**
 * Validates platform statistics data
 */
export function validatePlatformStatistics(
  statistics: Partial<PlatformStatistics>
): statistics is PlatformStatistics {
  const required = [
    "totalSolved",
    "currentStreak",
    "longestStreak",
    "difficultyBreakdown",
    "acceptanceRate",
    "contestsParticipated",
    "globalRanking",
    "totalPoints",
  ];

  for (const field of required) {
    if (
      !(field in statistics) ||
      statistics[field as keyof PlatformStatistics] === undefined
    ) {
      console.warn(`Missing required field in statistics: ${field}`);
      return false;
    }
  }

  // Validate difficulty breakdown
  const breakdown = statistics.difficultyBreakdown;
  if (
    !breakdown ||
    typeof breakdown.easy !== "number" ||
    typeof breakdown.medium !== "number" ||
    typeof breakdown.hard !== "number"
  ) {
    console.warn("Invalid difficulty breakdown structure");
    return false;
  }

  // Validate that difficulty breakdown adds up to total solved
  const breakdownTotal = breakdown.easy + breakdown.medium + breakdown.hard;
  if (breakdownTotal !== statistics.totalSolved) {
    console.warn(
      `Difficulty breakdown total (${breakdownTotal}) doesn't match totalSolved (${statistics.totalSolved})`
    );
    return false;
  }

  // Validate percentage values
  if (statistics.acceptanceRate! < 0 || statistics.acceptanceRate! > 100) {
    console.warn("Acceptance rate must be between 0 and 100");
    return false;
  }

  if (statistics.globalRanking! < 0 || statistics.globalRanking! > 100) {
    console.warn("Global ranking must be between 0 and 100");
    return false;
  }

  return true;
}

/**
 * Validates achievement data
 */
export function validateAchievement(
  achievement: Partial<CodingAchievement>
): achievement is CodingAchievement {
  const required = [
    "id",
    "title",
    "description",
    "iconUrl",
    "earnedDate",
    "category",
    "rarity",
  ];

  for (const field of required) {
    if (
      !(field in achievement) ||
      achievement[field as keyof CodingAchievement] === undefined
    ) {
      console.warn(`Missing required field in achievement: ${field}`);
      return false;
    }
  }

  // Validate category
  const validCategories: AchievementCategory[] = [
    "badge",
    "certificate",
    "contest",
    "milestone",
    "streak",
  ];
  if (!validCategories.includes(achievement.category as AchievementCategory)) {
    console.warn(`Invalid achievement category: ${achievement.category}`);
    return false;
  }

  // Validate rarity
  const validRarities: AchievementRarity[] = [
    "common",
    "rare",
    "epic",
    "legendary",
  ];
  if (!validRarities.includes(achievement.rarity as AchievementRarity)) {
    console.warn(`Invalid achievement rarity: ${achievement.rarity}`);
    return false;
  }

  // Validate date
  if (
    !(achievement.earnedDate instanceof Date) ||
    isNaN(achievement.earnedDate.getTime())
  ) {
    console.warn("Invalid earned date for achievement");
    return false;
  }

  return true;
}

/**
 * Validates recent activity data
 */
export function validateRecentActivity(
  activity: Partial<RecentActivity>
): activity is RecentActivity {
  const required = [
    "id",
    "problemTitle",
    "difficulty",
    "solvedDate",
    "tags",
    "isAccepted",
  ];

  for (const field of required) {
    if (
      !(field in activity) ||
      activity[field as keyof RecentActivity] === undefined
    ) {
      console.warn(`Missing required field in activity: ${field}`);
      return false;
    }
  }

  // Validate difficulty
  const validDifficulties: Difficulty[] = ["easy", "medium", "hard"];
  if (!validDifficulties.includes(activity.difficulty as Difficulty)) {
    console.warn(`Invalid difficulty: ${activity.difficulty}`);
    return false;
  }

  // Validate date
  if (
    !(activity.solvedDate instanceof Date) ||
    isNaN(activity.solvedDate.getTime())
  ) {
    console.warn("Invalid solved date for activity");
    return false;
  }

  // Validate tags array
  if (!Array.isArray(activity.tags)) {
    console.warn("Tags must be an array");
    return false;
  }

  return true;
}

/**
 * Validates complete platform data
 */
export function validatePlatformData(
  platform: Partial<CodingPlatform>
): platform is CodingPlatform {
  const required = [
    "id",
    "name",
    "username",
    "profileUrl",
    "logoUrl",
    "primaryColor",
    "secondaryColor",
    "statistics",
    "achievements",
    "recentActivity",
    "isActive",
  ];

  for (const field of required) {
    if (
      !(field in platform) ||
      platform[field as keyof CodingPlatform] === undefined
    ) {
      console.warn(`Missing required field in platform: ${field}`);
      return false;
    }
  }

  // Validate statistics
  if (!validatePlatformStatistics(platform.statistics!)) {
    return false;
  }

  // Validate achievements
  if (!Array.isArray(platform.achievements)) {
    console.warn("Achievements must be an array");
    return false;
  }

  for (const achievement of platform.achievements) {
    if (!validateAchievement(achievement)) {
      return false;
    }
  }

  // Validate recent activity
  if (!Array.isArray(platform.recentActivity)) {
    console.warn("Recent activity must be an array");
    return false;
  }

  for (const activity of platform.recentActivity) {
    if (!validateRecentActivity(activity)) {
      return false;
    }
  }

  return true;
}

/**
 * Data processing and calculation functions
 */

/**
 * Calculates total problems solved across all difficulties
 */
export function calculateTotalSolved(breakdown: DifficultyBreakdown): number {
  return breakdown.easy + breakdown.medium + breakdown.hard;
}

/**
 * Calculates difficulty distribution percentages
 */
export function calculateDifficultyPercentages(
  breakdown: DifficultyBreakdown
): {
  easy: number;
  medium: number;
  hard: number;
} {
  const total = calculateTotalSolved(breakdown);
  if (total === 0) {
    return { easy: 0, medium: 0, hard: 0 };
  }

  return {
    easy: Math.round((breakdown.easy / total) * 100),
    medium: Math.round((breakdown.medium / total) * 100),
    hard: Math.round((breakdown.hard / total) * 100),
  };
}

/**
 * Calculates average problems solved per day based on activity
 */
export function calculateAverageProblemsPerDay(
  activities: RecentActivity[]
): number {
  if (activities.length === 0) return 0;

  const dates = activities.map((activity) =>
    activity.solvedDate.toDateString()
  );
  const uniqueDates = new Set(dates);

  return Math.round((activities.length / uniqueDates.size) * 100) / 100;
}

/**
 * Calculates current streak from recent activity
 */
export function calculateCurrentStreak(activities: RecentActivity[]): number {
  if (activities.length === 0) return 0;

  // Sort activities by date (most recent first)
  const sortedActivities = [...activities].sort(
    (a, b) => b.solvedDate.getTime() - a.solvedDate.getTime()
  );

  let streak = 0;
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Check if there's activity today or yesterday (to account for timezone differences)
  const mostRecentActivity = sortedActivities[0];
  const mostRecentDate = new Date(mostRecentActivity.solvedDate);
  mostRecentDate.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor(
    (currentDate.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff > 1) {
    return 0; // Streak is broken if no activity in the last 2 days
  }

  // Count consecutive days with activity
  const activityDates = new Set(
    sortedActivities.map((activity) => {
      const date = new Date(activity.solvedDate);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    })
  );

  const checkDate = new Date(mostRecentDate);
  while (activityDates.has(checkDate.getTime())) {
    streak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return streak;
}

/**
 * Calculates longest streak from activity history
 */
export function calculateLongestStreak(activities: RecentActivity[]): number {
  if (activities.length === 0) return 0;

  // Get unique activity dates
  const activityDates = Array.from(
    new Set(
      activities.map((activity) => {
        const date = new Date(activity.solvedDate);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
    )
  ).sort((a, b) => a - b);

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < activityDates.length; i++) {
    const prevDate = activityDates[i - 1];
    const currentDate = activityDates[i];
    const daysDiff = (currentDate - prevDate) / (1000 * 60 * 60 * 24);

    if (daysDiff === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
}

/**
 * Gets achievements by category
 */
export function getAchievementsByCategory(
  achievements: CodingAchievement[],
  category: AchievementCategory
): CodingAchievement[] {
  return achievements.filter(
    (achievement) => achievement.category === category
  );
}

/**
 * Gets achievements by rarity
 */
export function getAchievementsByRarity(
  achievements: CodingAchievement[],
  rarity: AchievementRarity
): CodingAchievement[] {
  return achievements.filter((achievement) => achievement.rarity === rarity);
}

/**
 * Gets recent achievements (within specified days)
 */
export function getRecentAchievements(
  achievements: CodingAchievement[],
  days: number = 30
): CodingAchievement[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  return achievements.filter(
    (achievement) => achievement.earnedDate >= cutoffDate
  );
}

/**
 * Gets activity for a specific date range
 */
export function getActivityInDateRange(
  activities: RecentActivity[],
  startDate: Date,
  endDate: Date
): RecentActivity[] {
  return activities.filter(
    (activity) =>
      activity.solvedDate >= startDate && activity.solvedDate <= endDate
  );
}

/**
 * Groups activities by date
 */
export function groupActivitiesByDate(
  activities: RecentActivity[]
): Map<string, RecentActivity[]> {
  const grouped = new Map<string, RecentActivity[]>();

  activities.forEach((activity) => {
    const dateKey = activity.solvedDate.toDateString();
    if (!grouped.has(dateKey)) {
      grouped.set(dateKey, []);
    }
    grouped.get(dateKey)!.push(activity);
  });

  return grouped;
}

/**
 * Gets activity statistics for heatmap visualization
 */
export function getActivityHeatmapData(activities: RecentActivity[]): {
  date: string;
  count: number;
  level: number;
}[] {
  const grouped = groupActivitiesByDate(activities);
  const heatmapData: { date: string; count: number; level: number }[] = [];

  // Get date range for the last year
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateKey = d.toDateString();
    const count = grouped.get(dateKey)?.length || 0;

    // Calculate level (0-4) based on activity count
    let level = 0;
    if (count > 0) level = 1;
    if (count >= 2) level = 2;
    if (count >= 4) level = 3;
    if (count >= 6) level = 4;

    heatmapData.push({
      date: d.toISOString().split("T")[0],
      count,
      level,
    });
  }

  return heatmapData;
}

/**
 * Formats time spent in a human-readable format
 */
export function formatTimeSpent(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Formats large numbers with appropriate suffixes
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Gets color for difficulty level
 */
export function getDifficultyColor(difficulty: Difficulty): string {
  const colors = {
    easy: "#00C853", // Green
    medium: "#FF9800", // Orange
    hard: "#F44336", // Red
  };

  return colors[difficulty];
}

/**
 * Gets color for achievement rarity
 */
export function getRarityColor(rarity: AchievementRarity): string {
  const colors = {
    common: "#9E9E9E", // Gray
    rare: "#2196F3", // Blue
    epic: "#9C27B0", // Purple
    legendary: "#FF9800", // Gold
  };

  return colors[rarity];
}

/**
 * Configuration update helpers
 */

/**
 * Creates a template for new platform data
 */
export function createPlatformTemplate(
  id: string,
  name: string,
  username: string
): Partial<CodingPlatform> {
  return {
    id,
    name,
    username,
    profileUrl: `https://${id}.com/${username}`,
    logoUrl: `/images/platforms/${id}-logo.svg`,
    primaryColor: "#000000",
    secondaryColor: "#333333",
    statistics: {
      totalSolved: 0,
      currentStreak: 0,
      longestStreak: 0,
      difficultyBreakdown: {
        easy: 0,
        medium: 0,
        hard: 0,
      },
      acceptanceRate: 0,
      contestsParticipated: 0,
      globalRanking: 0,
      totalPoints: 0,
    },
    achievements: [],
    recentActivity: [],
    isActive: true,
  };
}

/**
 * Merges platform data with updates while preserving structure
 */
export function mergePlatformData(
  existing: CodingPlatform,
  updates: Partial<CodingPlatform>
): CodingPlatform {
  return {
    ...existing,
    ...updates,
    statistics: {
      ...existing.statistics,
      ...(updates.statistics || {}),
      difficultyBreakdown: {
        ...existing.statistics.difficultyBreakdown,
        ...(updates.statistics?.difficultyBreakdown || {}),
      },
    },
    achievements: updates.achievements || existing.achievements,
    recentActivity: updates.recentActivity || existing.recentActivity,
  };
}
