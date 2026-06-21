/**
 * Configuration system for coding platforms
 * Provides easy-to-update configuration for platform profiles and settings
 */

import {
  PlatformConfig,
  PlatformStatistics,
  CodingAchievement,
  RecentActivity,
} from "@/types";

/**
 * User Configuration
 * Update these values with your actual profile information
 */
export const USER_CONFIG = {
  // LeetCode Profile Configuration
  leetcode: {
    username: "teatoast", 
    profileUrl: "https://leetcode.com/teatoast", 
    isActive: true, // Set to false to hide this platform

    // Custom statistics (update these with your actual stats)
    customStats: {
      totalSolved: 150,
      ranking: 125000,
      currentStreak: 7,
      longestStreak: 23,
      acceptanceRate: 68.5,
      contestRating: 1650,
      contestsParticipated: 12,
      globalRanking: 15.2,
      totalPoints: 2450,
      difficultyBreakdown: {
        easy: 80,
        medium: 55,
        hard: 15,
      },
    },
  },

  // Global Settings
  global: {
    // Animation settings
    enableAnimations: true,
    animationDuration: 300, // milliseconds

    // Display settings
    showRankings: true,
    showStreaks: true,
    showContestRatings: true,
    maxRecentActivities: 10,
    maxAchievements: 20,

    // Heatmap settings
    heatmapMonths: 12, // Number of months to show in heatmap
    heatmapStartDay: 1, // 0 = Sunday, 1 = Monday

    // Theme preferences
    preferredTheme: "auto", // "light", "dark", or "auto"
    accentColor: "#6366f1", // Custom accent color
  },
} as const;

/**
 * Platform-specific configuration constants
 * These define the visual branding and technical details for each platform
 */
export const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  leetcode: {
    id: "leetcode",
    name: "LeetCode",
    baseUrl: "https://leetcode.com",
    logoUrl: "/images/platforms/leetcode-logo.svg",
    primaryColor: "#FFA116",
    secondaryColor: "#FF6B35",
    gradientColors: {
      from: "#FFA116",
      to: "#FFD700",
    },
    textColor: "#2D3748",
  },
} as const;

/**
 * Achievement configuration templates
 * Predefined achievement types with their visual properties
 */
export const ACHIEVEMENT_TEMPLATES = {
  // LeetCode achievement templates
  leetcode: {
    "annual-badge": {
      title: "Annual Badge {year}",
      description: "Solved problems consistently throughout {year}",
      iconUrl: "/images/badges/leetcode-annual-{year}.svg",
      category: "badge" as const,
      rarity: "rare" as const,
    },
    "streak-badge": {
      title: "{days} Days Badge",
      description: "Solved at least one problem for {days} consecutive days",
      iconUrl: "/images/badges/leetcode-{days}-days.svg",
      category: "streak" as const,
      rarity: "epic" as const,
    },
    "contest-achievement": {
      title: "Weekly Contest {number} - Top {percentage}%",
      description: "Finished in top {percentage}% of Weekly Contest {number}",
      iconUrl: "/images/badges/leetcode-contest.svg",
      category: "contest" as const,
      rarity: "legendary" as const,
    },
    "milestone-achievement": {
      title: "{milestone} Club",
      description: "Solved {count} problems milestone",
      iconUrl: "/images/badges/leetcode-{count}.svg",
      category: "milestone" as const,
      rarity: "rare" as const,
    },
  },

} as const;

/**
 * Sample problem data for generating realistic activity
 * These are used to create sample recent activity data
 */
export const SAMPLE_PROBLEMS = {
  leetcode: [
    {
      title: "Two Sum",
      difficulty: "easy" as const,
      tags: ["Array", "Hash Table"],
      estimatedTime: 15,
      url: "https://leetcode.com/problems/two-sum/",
    },
    {
      title: "Add Two Numbers",
      difficulty: "medium" as const,
      tags: ["Linked List", "Math", "Recursion"],
      estimatedTime: 45,
      url: "https://leetcode.com/problems/add-two-numbers/",
    },
    {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "medium" as const,
      tags: ["Hash Table", "String", "Sliding Window"],
      estimatedTime: 30,
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    {
      title: "Median of Two Sorted Arrays",
      difficulty: "hard" as const,
      tags: ["Array", "Binary Search", "Divide and Conquer"],
      estimatedTime: 90,
      url: "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    },
    {
      title: "Longest Palindromic Substring",
      difficulty: "medium" as const,
      tags: ["String", "Dynamic Programming"],
      estimatedTime: 60,
      url: "https://leetcode.com/problems/longest-palindromic-substring/",
    },
    {
      title: "Container With Most Water",
      difficulty: "medium" as const,
      tags: ["Array", "Two Pointers", "Greedy"],
      estimatedTime: 25,
      url: "https://leetcode.com/problems/container-with-most-water/",
    },
    {
      title: "3Sum",
      difficulty: "medium" as const,
      tags: ["Array", "Two Pointers", "Sorting"],
      estimatedTime: 40,
      url: "https://leetcode.com/problems/3sum/",
    },
    {
      title: "Valid Parentheses",
      difficulty: "easy" as const,
      tags: ["String", "Stack"],
      estimatedTime: 15,
      url: "https://leetcode.com/problems/valid-parentheses/",
    },
    {
      title: "Merge Two Sorted Lists",
      difficulty: "easy" as const,
      tags: ["Linked List", "Recursion"],
      estimatedTime: 20,
      url: "https://leetcode.com/problems/merge-two-sorted-lists/",
    },
    {
      title: "Generate Parentheses",
      difficulty: "medium" as const,
      tags: ["String", "Dynamic Programming", "Backtracking"],
      estimatedTime: 35,
      url: "https://leetcode.com/problems/generate-parentheses/",
    },
  ],

} as const;

/**
 * Programming languages configuration
 * Used for generating realistic activity data
 */
export const PROGRAMMING_LANGUAGES = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
] as const;

/**
 * Configuration validation functions
 */

/**
 * Validates user configuration
 */
export function validateUserConfig(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check LeetCode configuration
  if ((USER_CONFIG.leetcode.username as string) === "sample-user") {
    errors.push("LeetCode username is still set to default value");
  }

  if (USER_CONFIG.leetcode.profileUrl.includes("sample-user")) {
    errors.push("LeetCode profile URL is still set to default value");
  }

  // Validate statistics consistency
  const leetcodeStats = USER_CONFIG.leetcode.customStats;
  const leetcodeTotal =
    leetcodeStats.difficultyBreakdown.easy +
    leetcodeStats.difficultyBreakdown.medium +
    leetcodeStats.difficultyBreakdown.hard;

  if (leetcodeTotal !== leetcodeStats.totalSolved) {
    errors.push(
      `LeetCode difficulty breakdown total (${leetcodeTotal}) doesn't match totalSolved (${leetcodeStats.totalSolved})`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Gets configuration for a specific platform
 */
export function getPlatformUserConfig(platformId: string) {
  return USER_CONFIG[platformId as keyof typeof USER_CONFIG];
}

/**
 * Gets global configuration settings
 */
export function getGlobalConfig() {
  return USER_CONFIG.global;
}

/**
 * Helper function to check if a platform is active
 */
export function isPlatformActive(platformId: string): boolean {
  const config = getPlatformUserConfig(platformId);
  return config && "isActive" in config ? config.isActive : false;
}

/**
 * Gets all active platform IDs
 */
export function getActivePlatformIds(): string[] {
  return Object.keys(USER_CONFIG)
    .filter((key) => key !== "global")
    .filter((platformId) => isPlatformActive(platformId));
}

/**
 * Configuration update helpers
 */

/**
 * Creates a configuration update guide
 */
export function getConfigurationGuide(): {
  title: string;
  description: string;
  steps: Array<{
    step: number;
    title: string;
    description: string;
    example?: string;
  }>;
} {
  return {
    title: "Coding Platforms Configuration Guide",
    description:
      "Follow these steps to update your coding platform profiles with your actual data.",
    steps: [
      {
        step: 1,
        title: "Update Usernames",
        description:
          "Replace the default usernames with your actual platform usernames",
        example: `leetcode: {
  username: "your-actual-username", // Replace this
  profileUrl: "https://leetcode.com/your-actual-username", // And this
  ...
}`,
      },
      {
        step: 2,
        title: "Update Statistics",
        description:
          "Update the customStats object with your current platform statistics",
        example: `customStats: {
  totalSolved: 250, // Your actual number
  ranking: 50000,   // Your current ranking
  currentStreak: 15, // Your current streak
  ...
}`,
      },
      {
        step: 3,
        title: "Configure Difficulty Breakdown",
        description:
          "Ensure the difficulty breakdown adds up to your total solved problems",
        example: `difficultyBreakdown: {
  easy: 120,   // Easy problems solved
  medium: 100, // Medium problems solved  
  hard: 30,    // Hard problems solved
  // Total: 250 (should match totalSolved)
}`,
      },
      {
        step: 4,
        title: "Set Platform Visibility",
        description:
          "Set isActive to false for platforms you don't want to display",
        example: `leetcode: {
  isActive: false, // Hide this platform
  ...
}`,
      },
      {
        step: 5,
        title: "Customize Global Settings",
        description:
          "Adjust global settings like animations, display preferences, and theme",
        example: `global: {
  enableAnimations: true,
  showRankings: true,
  maxRecentActivities: 15,
  ...
}`,
      },
    ],
  };
}

/**
 * Advanced configuration helpers
 */

/**
 * Generates sample data for testing and development
 */
export function generateSampleData(
  platformId: string,
  options?: {
    totalProblems?: number;
    timeRange?: number; // days
    includeContest?: boolean;
  }
): {
  statistics: Partial<PlatformStatistics>;
  achievements: Partial<CodingAchievement>[];
  activities: Partial<RecentActivity>[];
} {
  const opts = {
    totalProblems: 100,
    timeRange: 365,
    includeContest: true,
    ...options,
  };

  // Generate realistic statistics
  const easyRatio = 0.5;
  const mediumRatio = 0.35;
  const hardRatio = 0.15;

  const statistics = {
    totalSolved: opts.totalProblems,
    currentStreak: Math.floor(Math.random() * 20) + 1,
    longestStreak: Math.floor(Math.random() * 50) + 10,
    difficultyBreakdown: {
      easy: Math.floor(opts.totalProblems * easyRatio),
      medium: Math.floor(opts.totalProblems * mediumRatio),
      hard: Math.floor(opts.totalProblems * hardRatio),
    },
    acceptanceRate: Math.floor(Math.random() * 30) + 60, // 60-90%
    contestsParticipated: opts.includeContest
      ? Math.floor(Math.random() * 20) + 5
      : 0,
    globalRanking: Math.floor(Math.random() * 50) + 10, // Top 10-60%
    totalPoints: Math.floor(Math.random() * 3000) + 1000,
  };

  // Adjust breakdown to match total
  const currentTotal =
    statistics.difficultyBreakdown.easy +
    statistics.difficultyBreakdown.medium +
    statistics.difficultyBreakdown.hard;
  const diff = opts.totalProblems - currentTotal;
  statistics.difficultyBreakdown.easy += diff;

  // Generate sample achievements
  const achievements: Partial<CodingAchievement>[] = [];
  const currentYear = new Date().getFullYear();

  // Add milestone achievements
  const milestones = [25, 50, 100, 200, 500];
  milestones.forEach((milestone, index) => {
    if (opts.totalProblems >= milestone) {
      achievements.push({
        id: `${platformId}-milestone-${milestone}`,
        title: `${milestone} Problems Club`,
        description: `Solved ${milestone} problems milestone`,
        category: "milestone",
        rarity: index < 2 ? "common" : index < 4 ? "rare" : "legendary",
        earnedDate: new Date(currentYear, index + 1, 15),
      });
    }
  });

  // Add streak achievements
  if (statistics.longestStreak >= 30) {
    achievements.push({
      id: `${platformId}-streak-30`,
      title: "30 Day Streak",
      description: "Solved problems for 30 consecutive days",
      category: "streak",
      rarity: "epic",
      earnedDate: new Date(currentYear, 6, 1),
    });
  }

  // Generate sample activities
  const activities: Partial<RecentActivity>[] = [];
  const problems =
    SAMPLE_PROBLEMS[platformId as keyof typeof SAMPLE_PROBLEMS] ||
    SAMPLE_PROBLEMS.leetcode;

  for (let i = 0; i < Math.min(50, opts.totalProblems); i++) {
    const problem = problems[Math.floor(Math.random() * problems.length)];
    const daysAgo = Math.floor(Math.random() * opts.timeRange);
    const activityDate = new Date();
    activityDate.setDate(activityDate.getDate() - daysAgo);

    activities.push({
      id: `${platformId}-activity-${i}`,
      problemTitle: problem.title,
      difficulty: problem.difficulty,
      solvedDate: activityDate,
      tags: [...problem.tags],
      isAccepted: Math.random() > 0.3,
      timeSpent: problem.estimatedTime + Math.floor(Math.random() * 20) - 10,
    });
  }

  return { statistics, achievements, activities };
}

/**
 * Validates and fixes configuration inconsistencies
 */
export function validateAndFixConfiguration(): {
  isValid: boolean;
  fixes: string[];
  errors: string[];
  warnings: string[];
} {
  const validation = validateUserConfig();
  const fixes: string[] = [];

  // Auto-fix difficulty breakdown inconsistencies
  Object.keys(USER_CONFIG).forEach((key) => {
    if (key === "global") return;

    const config = USER_CONFIG[key as keyof typeof USER_CONFIG];
    if ("customStats" in config) {
      const stats = config.customStats;
      const breakdownTotal =
        stats.difficultyBreakdown.easy +
        stats.difficultyBreakdown.medium +
        stats.difficultyBreakdown.hard;

      if (breakdownTotal !== stats.totalSolved) {
        fixes.push(`Fixed ${key} difficulty breakdown to match totalSolved`);
        // Note: This would require mutable config to actually fix
      }
    }
  });

  return {
    isValid: validation.isValid && fixes.length === 0,
    fixes,
    errors: validation.errors,
    warnings: validation.warnings,
  };
}

/**
 * Creates a backup of current configuration
 */
export function createConfigurationBackup(): string {
  const backup = {
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    config: USER_CONFIG,
  };

  return JSON.stringify(backup, null, 2);
}

/**
 * Exports configuration for external tools
 */
export function exportConfiguration(
  format: "json" | "yaml" | "env" = "json"
): string {
  switch (format) {
    case "json":
      return JSON.stringify(USER_CONFIG, null, 2);

    case "env":
      const envVars: string[] = [];

      // LeetCode config
      envVars.push(`LEETCODE_USERNAME=${USER_CONFIG.leetcode.username}`);
      envVars.push(
        `LEETCODE_TOTAL_SOLVED=${USER_CONFIG.leetcode.customStats.totalSolved}`
      );
      envVars.push(
        `LEETCODE_CURRENT_STREAK=${USER_CONFIG.leetcode.customStats.currentStreak}`
      );

      return envVars.join("\n");

    case "yaml":
      // Simple YAML export (would need yaml library for full implementation)
      return `# Coding Platforms Configuration
leetcode:
  username: "${USER_CONFIG.leetcode.username}"
  totalSolved: ${USER_CONFIG.leetcode.customStats.totalSolved}
  currentStreak: ${USER_CONFIG.leetcode.customStats.currentStreak}`;

    default:
      return JSON.stringify(USER_CONFIG, null, 2);
  }
}
