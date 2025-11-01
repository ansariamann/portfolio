import {
  CodingPlatform,
  PlatformConfig,
  CodingAchievement,
  RecentActivity,
  AchievementRarity,
} from "@/types";
import {
  USER_CONFIG,
  PLATFORM_CONFIGS,
  SAMPLE_PROBLEMS,
  PROGRAMMING_LANGUAGES,
} from "@/lib/coding-platforms-config";
import {
  validatePlatformData,
  calculateCurrentStreak,
  calculateLongestStreak,
} from "@/lib/coding-platforms-utils";

/**
 * LeetCode profile data
 * Automatically configured from USER_CONFIG
 */
export const leetcodeProfile: CodingPlatform = createLeetCodeProfile();

/**
 * HackerRank profile data
 * Automatically configured from USER_CONFIG
 */
export const hackerrankProfile: CodingPlatform = createHackerRankProfile();

/**
 * Factory functions to create platform profiles from configuration
 */

/**
 * Creates LeetCode profile from user configuration
 */
function createLeetCodeProfile(): CodingPlatform {
  const config = USER_CONFIG.leetcode;
  const platformConfig = PLATFORM_CONFIGS.leetcode;
  const recentActivity = generateLeetCodeActivity();

  const profile: CodingPlatform = {
    id: "leetcode",
    name: platformConfig.name,
    username: config.username,
    profileUrl: config.profileUrl,
    logoUrl: platformConfig.logoUrl,
    primaryColor: platformConfig.primaryColor,
    secondaryColor: platformConfig.secondaryColor,
    statistics: {
      ...config.customStats,
      // Recalculate streaks from activity if needed
      currentStreak: calculateCurrentStreak(recentActivity),
      longestStreak: Math.max(
        config.customStats.longestStreak,
        calculateLongestStreak(recentActivity)
      ),
    },
    achievements: createLeetCodeAchievements(),
    recentActivity,
    isActive: config.isActive,
  };

  // Validate the created profile
  if (!validatePlatformData(profile)) {
    console.warn("LeetCode profile validation failed, using defaults");
  }

  return profile;
}

/**
 * Creates HackerRank profile from user configuration
 */
function createHackerRankProfile(): CodingPlatform {
  const config = USER_CONFIG.hackerrank;
  const platformConfig = PLATFORM_CONFIGS.hackerrank;
  const recentActivity = generateHackerRankActivity();

  const profile: CodingPlatform = {
    id: "hackerrank",
    name: platformConfig.name,
    username: config.username,
    profileUrl: config.profileUrl,
    logoUrl: platformConfig.logoUrl,
    primaryColor: platformConfig.primaryColor,
    secondaryColor: platformConfig.secondaryColor,
    statistics: {
      ...config.customStats,
      // Recalculate streaks from activity if needed
      currentStreak: calculateCurrentStreak(recentActivity),
      longestStreak: Math.max(
        config.customStats.longestStreak,
        calculateLongestStreak(recentActivity)
      ),
    },
    achievements: createHackerRankAchievements(),
    recentActivity,
    isActive: config.isActive,
  };

  // Validate the created profile
  if (!validatePlatformData(profile)) {
    console.warn("HackerRank profile validation failed, using defaults");
  }

  return profile;
}

/**
 * Creates comprehensive LeetCode achievements
 */
function createLeetCodeAchievements(): CodingAchievement[] {
  const achievements: CodingAchievement[] = [];
  const stats = USER_CONFIG.leetcode.customStats;
  const currentYear = new Date().getFullYear();

  // Annual badge
  achievements.push({
    id: `annual-badge-${currentYear}`,
    title: `Annual Badge ${currentYear}`,
    description: `Solved problems consistently throughout ${currentYear}`,
    iconUrl: `/images/badges/leetcode-annual-${currentYear}.svg`,
    earnedDate: new Date(`${currentYear}-12-31`),
    category: "badge",
    rarity: "rare",
  });

  // Streak achievements based on longest streak
  if (stats.longestStreak >= 30) {
    achievements.push({
      id: "30-days-streak",
      title: "30 Days Badge",
      description: "Solved at least one problem for 30 consecutive days",
      iconUrl: "/images/badges/leetcode-30-days.svg",
      earnedDate: new Date(currentYear, 5, 15), // June 15
      category: "streak",
      rarity: "epic",
      metadata: { streakLength: 30 },
    });
  }

  if (stats.longestStreak >= 50) {
    achievements.push({
      id: "50-days-streak",
      title: "50 Days Badge",
      description: "Solved at least one problem for 50 consecutive days",
      iconUrl: "/images/badges/leetcode-50-days.svg",
      earnedDate: new Date(currentYear, 6, 20), // July 20
      category: "streak",
      rarity: "legendary",
      metadata: { streakLength: 50 },
    });
  }

  // Contest achievements
  if (stats.contestsParticipated > 0) {
    achievements.push({
      id: "contest-participant",
      title: "Contest Participant",
      description: "Participated in LeetCode weekly contests",
      iconUrl: "/images/badges/leetcode-contest-participant.svg",
      earnedDate: new Date(currentYear, 2, 10), // March 10
      category: "contest",
      rarity: "common",
      metadata: {
        contestsParticipated: stats.contestsParticipated,
      },
    });
  }

  if (stats.contestRating && stats.contestRating > 1500) {
    achievements.push({
      id: "contest-rating-1500",
      title: "Contest Rating 1500+",
      description: "Achieved contest rating above 1500",
      iconUrl: "/images/badges/leetcode-contest-rating.svg",
      earnedDate: new Date(currentYear, 4, 25), // May 25
      category: "contest",
      rarity: "rare",
      metadata: {
        rating: stats.contestRating,
      },
    });
  }

  // Milestone achievements based on total solved
  const milestones = [50, 100, 200, 300, 500];
  milestones.forEach((milestone, index) => {
    if (stats.totalSolved >= milestone) {
      const rarities: AchievementRarity[] = [
        "common",
        "rare",
        "epic",
        "epic",
        "legendary",
      ];
      achievements.push({
        id: `milestone-${milestone}`,
        title:
          milestone === 100 ? "Century Club" : `${milestone} Problems Club`,
        description: `Solved ${milestone} problems milestone`,
        iconUrl: `/images/badges/leetcode-${milestone}.svg`,
        earnedDate: new Date(currentYear, index + 1, 1),
        category: "milestone",
        rarity: rarities[index] || "rare",
        metadata: { milestone },
      });
    }
  });

  // Difficulty-specific achievements
  if (stats.difficultyBreakdown.hard >= 10) {
    achievements.push({
      id: "hard-problems-10",
      title: "Hard Problems Solver",
      description: "Solved 10+ hard difficulty problems",
      iconUrl: "/images/badges/leetcode-hard-solver.svg",
      earnedDate: new Date(currentYear, 7, 15), // August 15
      category: "milestone",
      rarity: "epic",
      metadata: { hardProblems: stats.difficultyBreakdown.hard },
    });
  }

  return achievements.sort(
    (a, b) => b.earnedDate.getTime() - a.earnedDate.getTime()
  );
}

/**
 * Creates comprehensive HackerRank achievements
 */
function createHackerRankAchievements(): CodingAchievement[] {
  const achievements: CodingAchievement[] = [];
  const stats = USER_CONFIG.hackerrank.customStats;
  const currentYear = new Date().getFullYear();

  // Skill certifications
  const skills = [
    { name: "Python", level: "Gold", rarity: "epic" as const },
    { name: "Algorithms", level: "Silver", rarity: "rare" as const },
    { name: "Data Structures", level: "Bronze", rarity: "common" as const },
  ];

  skills.forEach((skill, index) => {
    achievements.push({
      id: `${skill.name.toLowerCase()}-${skill.level.toLowerCase()}-badge`,
      title: `${skill.name} (${skill.level})`,
      description: `Achieved ${skill.level} level certification in ${skill.name}`,
      iconUrl: `/images/badges/hackerrank-${skill.name.toLowerCase()}-${skill.level.toLowerCase()}.svg`,
      earnedDate: new Date(currentYear, 10 - index, 15),
      category: "certificate",
      rarity: skill.rarity,
    });
  });

  // Challenge completions
  const challenges = [
    { name: "30 Days of Code", rarity: "common" as const },
    { name: "10 Days of Statistics", rarity: "common" as const },
    { name: "Interview Preparation Kit", rarity: "rare" as const },
  ];

  challenges.forEach((challenge, index) => {
    achievements.push({
      id: `${challenge.name.toLowerCase().replace(/\s+/g, "-")}-challenge`,
      title: challenge.name,
      description: `Completed the ${challenge.name} challenge`,
      iconUrl: `/images/badges/hackerrank-${challenge.name
        .toLowerCase()
        .replace(/\s+/g, "-")}.svg`,
      earnedDate: new Date(currentYear, 8 - index, 30),
      category: "badge",
      rarity: challenge.rarity,
    });
  });

  // Contest participation
  if (stats.contestsParticipated > 0) {
    achievements.push({
      id: "contest-participant-hr",
      title: "Contest Participant",
      description: "Participated in HackerRank contests",
      iconUrl: "/images/badges/hackerrank-contest-participant.svg",
      earnedDate: new Date(currentYear, 3, 20),
      category: "contest",
      rarity: "common",
      metadata: {
        contestsParticipated: stats.contestsParticipated,
      },
    });
  }

  // Problem solving milestones
  const milestones = [25, 50, 100, 150];
  milestones.forEach((milestone, index) => {
    if (stats.totalSolved >= milestone) {
      const rarities: AchievementRarity[] = [
        "common",
        "rare",
        "epic",
        "legendary",
      ];
      achievements.push({
        id: `hr-milestone-${milestone}`,
        title: `${milestone} Problems Solved`,
        description: `Solved ${milestone} problems on HackerRank`,
        iconUrl: `/images/badges/hackerrank-${milestone}.svg`,
        earnedDate: new Date(currentYear, index + 2, 10),
        category: "milestone",
        rarity: rarities[index] || "rare",
        metadata: { milestone },
      });
    }
  });

  return achievements.sort(
    (a, b) => b.earnedDate.getTime() - a.earnedDate.getTime()
  );
}

/**
 * Combined array of all coding platforms
 * Dynamically created from active platforms
 */
export const codingPlatforms: CodingPlatform[] = [
  ...(USER_CONFIG.leetcode.isActive ? [leetcodeProfile] : []),
  ...(USER_CONFIG.hackerrank.isActive ? [hackerrankProfile] : []),
];

/**
 * Helper function to get platform configuration by ID
 */
export const getPlatformConfig = (
  platformId: string
): PlatformConfig | undefined => {
  return PLATFORM_CONFIGS[platformId];
};

/**
 * Helper function to get platform data by ID
 */
export const getPlatformData = (
  platformId: string
): CodingPlatform | undefined => {
  return codingPlatforms.find((platform) => platform.id === platformId);
};

/**
 * Helper function to get active platforms only
 */
export const getActivePlatforms = (): CodingPlatform[] => {
  return codingPlatforms.filter((platform) => platform.isActive);
};

/**
 * Helper function to calculate total problems solved across all platforms
 */
export const getTotalProblemsAcrossPlatforms = (): number => {
  return codingPlatforms.reduce((total, platform) => {
    return total + platform.statistics.totalSolved;
  }, 0);
};

/**
 * Helper function to get combined achievements from all platforms
 */
export const getAllAchievements = (): Array<{
  achievement: CodingAchievement;
  platform: string;
}> => {
  return codingPlatforms.flatMap((platform) =>
    platform.achievements.map((achievement) => ({
      achievement,
      platform: platform.name,
    }))
  );
};

/**
 * Helper function to get recent activity across all platforms
 */
export const getAllRecentActivity = (
  limit?: number
): Array<{ activity: RecentActivity; platform: string }> => {
  const allActivity = codingPlatforms.flatMap((platform) =>
    platform.recentActivity.map((activity) => ({
      activity,
      platform: platform.name,
    }))
  );

  // Sort by date (most recent first)
  allActivity.sort(
    (a, b) =>
      new Date(b.activity.solvedDate).getTime() -
      new Date(a.activity.solvedDate).getTime()
  );

  return limit ? allActivity.slice(0, limit) : allActivity;
};

/**
 * Generate comprehensive LeetCode activity data for heatmap visualization
 * Creates realistic activity patterns spanning multiple months
 */
function generateLeetCodeActivity(): RecentActivity[] {
  const activities: RecentActivity[] = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1); // Start of year
  const problems = SAMPLE_PROBLEMS.leetcode;
  const languages = PROGRAMMING_LANGUAGES;
  const stats = USER_CONFIG.leetcode.customStats;

  let activityId = 1;
  let totalGenerated = 0;
  const targetTotal = stats.totalSolved;

  // Calculate how many activities to generate per day on average
  const daysSinceStart = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const averagePerDay = targetTotal / daysSinceStart;

  // Generate activity with realistic patterns (more activity on weekdays, some gaps)
  for (
    let d = new Date(startDate);
    d <= today && totalGenerated < targetTotal;
    d.setDate(d.getDate() + 1)
  ) {
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Higher probability of activity on weekdays
    const activityProbability = isWeekend ? 0.3 : 0.7;

    // Some days have no activity, some have multiple problems
    if (Math.random() < activityProbability && totalGenerated < targetTotal) {
      const problemsToday =
        Math.random() < 0.3 ? Math.min(2, targetTotal - totalGenerated) : 1;

      for (let i = 0; i < problemsToday && totalGenerated < targetTotal; i++) {
        const problem = problems[Math.floor(Math.random() * problems.length)];
        const language =
          languages[Math.floor(Math.random() * languages.length)];

        activities.push({
          id: `lc-activity-${activityId++}`,
          problemTitle: problem.title,
          difficulty: problem.difficulty,
          solvedDate: new Date(d),
          problemUrl: problem.url,
          tags: [...problem.tags],
          language,
          timeSpent:
            problem.estimatedTime + Math.floor(Math.random() * 20) - 10, // Add some variance
          isAccepted: Math.random() > 0.3, // 70% first attempt success rate
          attemptCount:
            Math.random() > 0.3 ? 1 : Math.floor(Math.random() * 3) + 2,
        });

        totalGenerated++;
      }
    }
  }

  // Ensure we have the right difficulty distribution
  const targetEasy = stats.difficultyBreakdown.easy;
  const targetMedium = stats.difficultyBreakdown.medium;
  const targetHard = stats.difficultyBreakdown.hard;

  // Adjust difficulty distribution to match target
  const easyActivities = activities.filter((a) => a.difficulty === "easy");
  const mediumActivities = activities.filter((a) => a.difficulty === "medium");
  const hardActivities = activities.filter((a) => a.difficulty === "hard");

  // If we need to adjust, modify some activities
  while (
    easyActivities.length < targetEasy &&
    (mediumActivities.length > targetMedium ||
      hardActivities.length > targetHard)
  ) {
    const toChange =
      mediumActivities.length > targetMedium
        ? mediumActivities[Math.floor(Math.random() * mediumActivities.length)]
        : hardActivities[Math.floor(Math.random() * hardActivities.length)];
    toChange.difficulty = "easy";
    easyActivities.push(toChange);
  }

  return activities.sort(
    (a, b) => b.solvedDate.getTime() - a.solvedDate.getTime()
  );
}

/**
 * Generate comprehensive HackerRank activity data for heatmap visualization
 * Creates realistic activity patterns spanning multiple months
 */
function generateHackerRankActivity(): RecentActivity[] {
  const activities: RecentActivity[] = [];
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1); // Start of year
  const problems = SAMPLE_PROBLEMS.hackerrank;
  const languages = PROGRAMMING_LANGUAGES;
  const stats = USER_CONFIG.hackerrank.customStats;

  let activityId = 1;
  let totalGenerated = 0;
  const targetTotal = stats.totalSolved;

  // Calculate how many activities to generate per day on average
  const daysSinceStart = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const averagePerDay = targetTotal / daysSinceStart;

  // Generate activity with slightly different patterns than LeetCode
  for (
    let d = new Date(startDate);
    d <= today && totalGenerated < targetTotal;
    d.setDate(d.getDate() + 1)
  ) {
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Slightly lower activity rate than LeetCode
    const activityProbability = isWeekend ? 0.2 : 0.5;

    if (Math.random() < activityProbability && totalGenerated < targetTotal) {
      const problemsToday =
        Math.random() < 0.2 ? Math.min(2, targetTotal - totalGenerated) : 1;

      for (let i = 0; i < problemsToday && totalGenerated < targetTotal; i++) {
        const problem = problems[Math.floor(Math.random() * problems.length)];
        const language =
          languages[Math.floor(Math.random() * languages.length)];

        activities.push({
          id: `hr-activity-${activityId++}`,
          problemTitle: problem.title,
          difficulty: problem.difficulty,
          solvedDate: new Date(d),
          problemUrl: problem.url,
          tags: [...problem.tags],
          language,
          timeSpent: problem.estimatedTime + Math.floor(Math.random() * 15) - 7, // Add some variance
          isAccepted: Math.random() > 0.4, // 60% first attempt success rate
          attemptCount:
            Math.random() > 0.4 ? 1 : Math.floor(Math.random() * 3) + 2,
        });

        totalGenerated++;
      }
    }
  }

  // Ensure we have the right difficulty distribution
  const targetEasy = stats.difficultyBreakdown.easy;
  const targetMedium = stats.difficultyBreakdown.medium;
  const targetHard = stats.difficultyBreakdown.hard;

  // Adjust difficulty distribution to match target
  const easyActivities = activities.filter((a) => a.difficulty === "easy");
  const mediumActivities = activities.filter((a) => a.difficulty === "medium");
  const hardActivities = activities.filter((a) => a.difficulty === "hard");

  // If we need to adjust, modify some activities
  while (
    easyActivities.length < targetEasy &&
    (mediumActivities.length > targetMedium ||
      hardActivities.length > targetHard)
  ) {
    const toChange =
      mediumActivities.length > targetMedium
        ? mediumActivities[Math.floor(Math.random() * mediumActivities.length)]
        : hardActivities[Math.floor(Math.random() * hardActivities.length)];
    toChange.difficulty = "easy";
    easyActivities.push(toChange);
  }

  return activities.sort(
    (a, b) => b.solvedDate.getTime() - a.solvedDate.getTime()
  );
}
