# Coding Platforms Setup Guide

This guide will help you configure and update your coding platform profiles (LeetCode and HackerRank) in your portfolio website.

## Quick Start

1. **Update Configuration**: Edit `lib/coding-platforms-config.ts`
2. **Replace Sample Data**: Update usernames, URLs, and statistics
3. **Validate Configuration**: Run the validation function
4. **Test Display**: Check the portfolio section

## Configuration Files

### Main Configuration File

- **Location**: `lib/coding-platforms-config.ts`
- **Purpose**: Contains all user-configurable settings
- **Sections**: User profiles, global settings, platform configs

### Data Processing

- **Location**: `data/coding-platforms.ts`
- **Purpose**: Generates platform profiles from configuration
- **Auto-generated**: Uses configuration to create platform data

### Utility Functions

- **Location**: `lib/coding-platforms-utils.ts`
- **Purpose**: Data validation, calculations, and processing
- **Features**: Validation, streak calculation, data formatting

## Step-by-Step Setup

### Step 1: Update Basic Profile Information

Open `lib/coding-platforms-config.ts` and update the `USER_CONFIG` object:

```typescript
export const USER_CONFIG = {
  leetcode: {
    username: "your-actual-leetcode-username", // ← Change this
    profileUrl: "https://leetcode.com/your-actual-leetcode-username", // ← And this
    isActive: true, // Set to false to hide this platform
    // ... rest of configuration
  },
  hackerrank: {
    username: "your-actual-hackerrank-username", // ← Change this
    profileUrl: "https://www.hackerrank.com/your-actual-hackerrank-username", // ← And this
    isActive: true, // Set to false to hide this platform
    // ... rest of configuration
  },
};
```

### Step 2: Update Statistics

Update the `customStats` object for each platform with your actual statistics:

```typescript
leetcode: {
  customStats: {
    totalSolved: 250,        // Your total problems solved
    ranking: 125000,         // Your current ranking (optional)
    currentStreak: 15,       // Current daily streak
    longestStreak: 45,       // Longest streak achieved
    acceptanceRate: 72.5,    // Acceptance rate percentage
    contestRating: 1650,     // Contest rating (optional)
    contestsParticipated: 12, // Number of contests participated
    globalRanking: 15.2,     // Global ranking percentage
    totalPoints: 2450,       // Total points earned
    difficultyBreakdown: {
      easy: 120,   // Easy problems solved
      medium: 100, // Medium problems solved
      hard: 30,    // Hard problems solved
      // Note: easy + medium + hard should equal totalSolved
    },
  },
},
```

````

### Step 3: Ensure Data Consistency

**Important**: Make sure your difficulty breakdown adds up correctly:

```typescript
// Example: If totalSolved = 250
difficultyBreakdown: {
  easy: 120,   // 48%
  medium: 100, // 40%
  hard: 30,    // 12%
  // Total: 120 + 100 + 30 = 250 ✓
}
````

### Step 4: Configure Global Settings

Customize display preferences in the `global` section:

```typescript
global: {
  // Animation settings
  enableAnimations: true,
  animationDuration: 300,

  // Display settings
  showRankings: true,
  showStreaks: true,
  showContestRatings: true,
  maxRecentActivities: 10,
  maxAchievements: 20,

  // Heatmap settings
  heatmapMonths: 12,
  heatmapStartDay: 1, // 0 = Sunday, 1 = Monday

  // Theme preferences
  preferredTheme: "auto", // "light", "dark", or "auto"
  accentColor: "#6366f1",
}
```

### Step 5: Validate Configuration

The system includes built-in validation. Check for errors:

```typescript
import { validateUserConfig } from "@/lib/coding-platforms-config";

const validation = validateUserConfig();
console.log("Validation result:", validation);

// Check for errors and warnings
if (!validation.isValid) {
  console.error("Configuration errors:", validation.errors);
}
if (validation.warnings.length > 0) {
  console.warn("Configuration warnings:", validation.warnings);
}
```

## Advanced Configuration

### Adding Custom Achievements

Achievements are automatically generated based on your statistics, but you can customize them by modifying the achievement creation functions in `data/coding-platforms.ts`.

### Customizing Activity Generation

The system generates realistic activity patterns based on your total solved count. The activity generation considers:

- Weekday vs weekend patterns
- Realistic daily problem counts
- Proper difficulty distribution
- Streak calculations

### Platform Branding

Platform colors and branding are configured in `PLATFORM_CONFIGS`:

```typescript
export const PLATFORM_CONFIGS = {
  leetcode: {
    primaryColor: "#FFA116",
    secondaryColor: "#FF6B35",
    gradientColors: {
      from: "#FFA116",
      to: "#FFD700",
    },
    // ... other config
  },
  // ... other platforms
};
```

## Troubleshooting

### Common Issues

1. **Difficulty Breakdown Mismatch**

   - Error: "Difficulty breakdown total doesn't match totalSolved"
   - Solution: Ensure easy + medium + hard = totalSolved

2. **Invalid Percentage Values**

   - Error: "Acceptance rate must be between 0 and 100"
   - Solution: Check acceptanceRate and globalRanking values

3. **Missing Profile URLs**
   - Warning: "Profile URL is still set to default value"
   - Solution: Update profileUrl with your actual profile link

### Validation Functions

Use these utility functions to check your configuration:

```typescript
import {
  validateUserConfig,
  validateAndFixConfiguration,
  createConfigurationBackup,
} from "@/lib/coding-platforms-config";

// Basic validation
const validation = validateUserConfig();

// Auto-fix common issues
const fixResult = validateAndFixConfiguration();

// Create backup before changes
const backup = createConfigurationBackup();
```

### Data Processing Utilities

```typescript
import {
  validatePlatformData,
  calculateCurrentStreak,
  calculateLongestStreak,
  formatTimeSpent,
  getDifficultyColor,
} from "@/lib/coding-platforms-utils";

// Validate complete platform data
const isValid = validatePlatformData(platformData);

// Calculate streaks from activity
const currentStreak = calculateCurrentStreak(activities);
const longestStreak = calculateLongestStreak(activities);
```

## Sample Data Generation

For testing and development, you can generate sample data:

```typescript
import { generateSampleData } from "@/lib/coding-platforms-config";

const sampleData = generateSampleData("leetcode", {
  totalProblems: 150,
  timeRange: 365,
  includeContest: true,
});
```

## Configuration Export

Export your configuration for backup or external tools:

```typescript
import { exportConfiguration } from "@/lib/coding-platforms-config";

// Export as JSON
const jsonConfig = exportConfiguration("json");

// Export as environment variables
const envConfig = exportConfiguration("env");

// Export as YAML
const yamlConfig = exportConfiguration("yaml");
```

## Best Practices

1. **Keep Statistics Updated**: Regularly update your statistics to reflect current progress
2. **Validate Regularly**: Run validation after making changes
3. **Backup Configuration**: Create backups before major updates
4. **Test Changes**: Preview changes in development before deploying
5. **Monitor Performance**: Ensure animations and data loading perform well

## Integration with Portfolio

The coding platforms section integrates seamlessly with your portfolio:

- **Navigation**: Automatically added to main navigation
- **Smooth Scrolling**: Works with existing scroll behavior
- **Responsive Design**: Adapts to all screen sizes
- **Theme Integration**: Follows your portfolio's theme system
- **Performance**: Optimized loading and animations

## Support and Updates

- **Configuration Guide**: Use `getConfigurationGuide()` for step-by-step instructions
- **Validation**: Built-in validation catches common errors
- **Documentation**: This guide covers all configuration options
- **Type Safety**: TypeScript ensures configuration correctness

For additional help, refer to the inline documentation in the configuration files or check the component implementations for advanced customization options.
