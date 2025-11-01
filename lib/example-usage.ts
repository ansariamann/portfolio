/**
 * Example usage of the coding platforms configuration system
 * This file demonstrates how to use the configuration and validation tools
 */

// Import the main data and utilities
import {
  codingPlatforms,
  getPlatformData,
  getTotalProblemsAcrossPlatforms,
} from "@/data/coding-platforms";
import { validateUserConfig, USER_CONFIG } from "./coding-platforms-config";
import {
  printValidationSummary,
  isConfigurationValid,
} from "./validate-config";
import {
  calculateCurrentStreak,
  calculateDifficultyPercentages,
  formatTimeSpent,
  getDifficultyColor,
} from "./coding-platforms-utils";

/**
 * Example 1: Basic configuration validation
 */
export function exampleValidation() {
  console.log("=== Configuration Validation Example ===");

  // Quick validation check
  const isValid = isConfigurationValid();
  console.log(`Configuration is valid: ${isValid}`);

  // Detailed validation with summary
  printValidationSummary();

  // Manual validation
  const validation = validateUserConfig();
  console.log("Validation details:", validation);
}

/**
 * Example 2: Working with platform data
 */
export function examplePlatformData() {
  console.log("=== Platform Data Example ===");

  // Get all active platforms
  console.log(`Active platforms: ${codingPlatforms.length}`);
  codingPlatforms.forEach((platform) => {
    console.log(
      `- ${platform.name}: ${platform.statistics.totalSolved} problems`
    );
  });

  // Get specific platform data
  const leetcodeData = getPlatformData("leetcode");
  if (leetcodeData) {
    console.log(
      `LeetCode: ${leetcodeData.statistics.totalSolved} problems solved`
    );
  }

  // Calculate totals across platforms
  const totalProblems = getTotalProblemsAcrossPlatforms();
  console.log(`Total problems across all platforms: ${totalProblems}`);
}

/**
 * Example 3: Using utility functions
 */
export function exampleUtilities() {
  console.log("=== Utility Functions Example ===");

  const platform = codingPlatforms[0];
  if (platform) {
    // Calculate difficulty percentages
    const percentages = calculateDifficultyPercentages(
      platform.statistics.difficultyBreakdown
    );
    console.log("Difficulty distribution:", percentages);

    // Calculate current streak
    const currentStreak = calculateCurrentStreak(platform.recentActivity);
    console.log(`Current streak: ${currentStreak} days`);

    // Format time spent
    const timeFormatted = formatTimeSpent(45);
    console.log(`Time formatted: ${timeFormatted}`);

    // Get difficulty colors
    const easyColor = getDifficultyColor("easy");
    console.log(`Easy difficulty color: ${easyColor}`);
  }
}

/**
 * Example 4: Configuration customization
 */
export function exampleCustomization() {
  console.log("=== Configuration Customization Example ===");

  // Show current configuration
  console.log("Current LeetCode username:", USER_CONFIG.leetcode.username);
  console.log("Current HackerRank username:", USER_CONFIG.hackerrank.username);

  // Show global settings
  console.log("Animation enabled:", USER_CONFIG.global.enableAnimations);
  console.log("Max recent activities:", USER_CONFIG.global.maxRecentActivities);

  // Show platform activity status
  console.log("LeetCode active:", USER_CONFIG.leetcode.isActive);
  console.log("HackerRank active:", USER_CONFIG.hackerrank.isActive);
}

/**
 * Example 5: Working with achievements and activity
 */
export function exampleAchievementsAndActivity() {
  console.log("=== Achievements and Activity Example ===");

  codingPlatforms.forEach((platform) => {
    console.log(`\n${platform.name}:`);

    // Show achievements
    console.log(`  Achievements: ${platform.achievements.length}`);
    const recentAchievements = platform.achievements.slice(0, 3);
    recentAchievements.forEach((achievement) => {
      console.log(`    - ${achievement.title} (${achievement.rarity})`);
    });

    // Show recent activity
    console.log(`  Recent activities: ${platform.recentActivity.length}`);
    const recentActivities = platform.recentActivity.slice(0, 3);
    recentActivities.forEach((activity) => {
      console.log(`    - ${activity.problemTitle} (${activity.difficulty})`);
    });
  });
}

/**
 * Run all examples
 */
export function runAllExamples() {
  console.log("🚀 Running Coding Platforms Configuration Examples\n");

  try {
    exampleValidation();
    console.log("\n");

    examplePlatformData();
    console.log("\n");

    exampleUtilities();
    console.log("\n");

    exampleCustomization();
    console.log("\n");

    exampleAchievementsAndActivity();

    console.log("\n✅ All examples completed successfully!");
  } catch (error) {
    console.error("❌ Error running examples:", error);
  }
}

// Export individual examples
export default {
  exampleValidation,
  examplePlatformData,
  exampleUtilities,
  exampleCustomization,
  exampleAchievementsAndActivity,
  runAllExamples,
};

/**
 * Usage Instructions:
 *
 * 1. Import this file in your development environment:
 *    import { runAllExamples } from '@/lib/example-usage';
 *
 * 2. Run all examples:
 *    runAllExamples();
 *
 * 3. Or run individual examples:
 *    import { exampleValidation } from '@/lib/example-usage';
 *    exampleValidation();
 *
 * 4. Use in development console:
 *    // In browser console or Node.js
 *    import('@/lib/example-usage').then(({ runAllExamples }) => runAllExamples());
 */
