/**
 * Type definitions for coding platforms integration
 * Defines interfaces and types for LeetCode, HackerRank and other coding platforms
 */

// Difficulty levels for problems
export type Difficulty = "easy" | "medium" | "hard";

// Achievement categories
export type AchievementCategory =
  | "badge"
  | "certificate"
  | "contest"
  | "milestone"
  | "streak";

// Achievement rarity levels
export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

// Visualization modes for the platforms section
export type VisualizationMode =
  | "dashboard"
  | "achievements"
  | "heatmap"
  | "progress";

// Platform statistics breakdown by difficulty
export interface DifficultyBreakdown {
  easy: number;
  medium: number;
  hard: number;
}

// Individual platform statistics
export interface PlatformStatistics {
  totalSolved: number;
  ranking?: number;
  currentStreak: number;
  longestStreak: number;
  difficultyBreakdown: DifficultyBreakdown;
  acceptanceRate: number;
  contestRating?: number;
  contestsParticipated: number;
  globalRanking: number;
  totalPoints: number;
}

// Achievement metadata for additional context
export interface AchievementMetadata {
  streakLength?: number;
  contestName?: string;
  rank?: number;
  participants?: number;
  skills?: string[];
  [key: string]: any;
}

// Individual coding achievement
export interface CodingAchievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  earnedDate: Date;
  category: AchievementCategory;
  rarity: AchievementRarity;
  metadata?: AchievementMetadata;
}

// Recent activity entry
export interface RecentActivity {
  id: string;
  problemTitle: string;
  problemUrl?: string;
  difficulty: Difficulty;
  solvedDate: Date;
  tags: string[];
  timeSpent?: number; // in minutes
  language?: string;
  isAccepted: boolean;
  attemptCount?: number;
}

// Platform configuration for branding
export interface PlatformConfig {
  id: string;
  name: string;
  baseUrl: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  gradientColors: {
    from: string;
    to: string;
  };
  textColor: string;
}

// Main coding platform interface
export interface CodingPlatform {
  id: string;
  name: string;
  username: string;
  profileUrl: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  statistics: PlatformStatistics;
  achievements: CodingAchievement[];
  recentActivity: RecentActivity[];
  isActive: boolean;
}

// Props for platform components
export interface PlatformComponentProps {
  platform: CodingPlatform;
  animate?: boolean;
  className?: string;
}

// Props for statistics visualization
export interface StatisticsVisualizationProps {
  statistics: PlatformStatistics;
  primaryColor: string;
  secondaryColor: string;
  animate?: boolean;
  className?: string;
}

// Props for achievements display
export interface AchievementsBadgesProps {
  achievements: CodingAchievement[];
  layout?: "grid" | "list" | "carousel";
  showTooltips?: boolean;
  filterCategories?: AchievementCategory[];
  maxItems?: number;
  className?: string;
}

// Props for activity heatmap
export interface ActivityHeatmapProps {
  activities: RecentActivity[];
  timePeriod?: "month" | "quarter" | "year";
  colorScale: {
    empty: string;
    low: string;
    medium: string;
    high: string;
  };
  interactive?: boolean;
  className?: string;
}

// Props for recent activity timeline
export interface RecentActivityProps {
  activities: RecentActivity[];
  maxItems?: number;
  expandable?: boolean;
  groupByDate?: boolean;
  showDifficulty?: boolean;
  className?: string;
}

// Color scheme for difficulty levels
export interface DifficultyColors {
  easy: string;
  medium: string;
  hard: string;
}

// Theme configuration for components
export interface PlatformTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  difficulty: DifficultyColors;
  gradients: {
    primary: string;
    achievement: string;
    background: string;
  };
}

// Loading state configuration
export interface LoadingState {
  isLoading: boolean;
  error?: string;
  retryCount?: number;
}

// Component props for error boundaries
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: any) => void;
}

// Props for platform card component
export interface PlatformCardProps {
  platform: CodingPlatform;
  isActive?: boolean;
  onClick?: () => void;
  showDetails?: boolean;
  animate?: boolean;
  className?: string;
}
