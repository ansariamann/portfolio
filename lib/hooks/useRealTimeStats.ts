/**
 * Hook for fetching real-time coding platform statistics
 * Falls back to static configuration if API fails
 */

import { useState, useEffect } from "react";
import { PlatformStatistics } from "@/types";
import { getCachedLeetCodeStats } from "@/lib/api/leetcode-api";
import { USER_CONFIG } from "@/lib/coding-platforms-config";

interface UseRealTimeStatsOptions {
  enableRealTime?: boolean;
  refreshInterval?: number; // in milliseconds
  fallbackToStatic?: boolean;
}

interface UseRealTimeStatsReturn {
  stats: PlatformStatistics | null;
  isLoading: boolean;
  error: Error | null;
  isRealTime: boolean;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

export function useRealTimeStats(
  platformId: string,
  username: string,
  options: UseRealTimeStatsOptions = {}
): UseRealTimeStatsReturn {
  const {
    enableRealTime = true,
    refreshInterval = 5 * 60 * 1000, // 5 minutes
    fallbackToStatic = true,
  } = options;

  const [stats, setStats] = useState<PlatformStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [isRealTime, setIsRealTime] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const getStaticStats = (): PlatformStatistics => {
    const config = USER_CONFIG[platformId as keyof typeof USER_CONFIG];
    if (config && "customStats" in config) {
      return config.customStats;
    }
    throw new Error(
      `No static configuration found for platform: ${platformId}`
    );
  };

  const fetchRealTimeStats = async (): Promise<PlatformStatistics | null> => {
    if (platformId === "leetcode") {
      const leetcodeStats = await getCachedLeetCodeStats(username);
      if (leetcodeStats) {
        return {
          totalSolved: leetcodeStats.totalSolved,
          ranking: leetcodeStats.ranking,
          currentStreak: 0, // Not available from API
          longestStreak: 0, // Not available from API
          acceptanceRate: leetcodeStats.acceptanceRate,
          contestRating: 0, // Would need separate API call
          contestsParticipated: 0, // Not available from API
          globalRanking: 0, // Not available from API
          totalPoints: 0, // Not available from API
          difficultyBreakdown: {
            easy: leetcodeStats.easySolved,
            medium: leetcodeStats.mediumSolved,
            hard: leetcodeStats.hardSolved,
          },
        };
      }
    }

    // Add other platforms here (HackerRank, CodeChef, etc.)

    return null;
  };

  const refresh = async () => {
    if (!enableRealTime) {
      // Use static data
      try {
        const staticStats = getStaticStats();
        setStats(staticStats);
        setIsRealTime(false);
        setError(null);
        setLastUpdated(new Date());
      } catch (err) {
        setError(err as Error);
      }
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const realTimeStats = await fetchRealTimeStats();

      if (realTimeStats) {
        setStats(realTimeStats);
        setIsRealTime(true);
        setLastUpdated(new Date());
      } else if (fallbackToStatic) {
        // Fallback to static data
        const staticStats = getStaticStats();
        setStats(staticStats);
        setIsRealTime(false);
        setLastUpdated(new Date());
      } else {
        throw new Error(
          "Failed to fetch real-time data and fallback is disabled"
        );
      }
    } catch (err) {
      setError(err as Error);

      if (fallbackToStatic) {
        try {
          const staticStats = getStaticStats();
          setStats(staticStats);
          setIsRealTime(false);
          setLastUpdated(new Date());
        } catch (staticErr) {
          setError(staticErr as Error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    refresh();
  }, [platformId, username, enableRealTime]);

  // Auto-refresh interval
  useEffect(() => {
    if (!enableRealTime || refreshInterval <= 0) return;

    const interval = setInterval(refresh, refreshInterval);
    return () => clearInterval(interval);
  }, [enableRealTime, refreshInterval]);

  return {
    stats,
    isLoading,
    error,
    isRealTime,
    lastUpdated,
    refresh,
  };
}

/**
 * Hook for multiple platforms
 */
export function useMultipleRealTimeStats(
  platforms: Array<{ platformId: string; username: string }>,
  options: UseRealTimeStatsOptions = {}
) {
  const results = platforms.map(({ platformId, username }) =>
    useRealTimeStats(platformId, username, options)
  );

  return {
    stats: results.map((r) => r.stats),
    isLoading: results.some((r) => r.isLoading),
    errors: results.map((r) => r.error),
    isRealTime: results.map((r) => r.isRealTime),
    lastUpdated: results.map((r) => r.lastUpdated),
    refresh: () => Promise.all(results.map((r) => r.refresh())),
  };
}

/**
 * Configuration for real-time stats
 */
export const REAL_TIME_CONFIG = {
  // Enable/disable real-time fetching globally
  enabled: true,

  // Refresh intervals for different scenarios
  intervals: {
    active: 5 * 60 * 1000, // 5 minutes when tab is active
    background: 15 * 60 * 1000, // 15 minutes when tab is in background
    error: 30 * 1000, // 30 seconds after an error
  },

  // Retry configuration
  retry: {
    maxAttempts: 3,
    backoffMultiplier: 2,
    initialDelay: 1000,
  },

  // Cache configuration
  cache: {
    duration: 5 * 60 * 1000, // 5 minutes
    maxSize: 100, // Maximum number of cached entries
  },
} as const;
