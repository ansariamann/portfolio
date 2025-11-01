"use client";

import { useState, useEffect, useCallback } from "react";
import { CodingPlatform } from "@/types";

/**
 * Custom hook for managing platform data loading and error states
 * Provides loading states, error handling, and retry functionality
 */

export interface UsePlatformDataOptions {
  retryAttempts?: number;
  retryDelay?: number;
  enableAutoRetry?: boolean;
}

export interface UsePlatformDataReturn {
  data: CodingPlatform | null;
  isLoading: boolean;
  error: Error | null;
  retryCount: number;
  retry: () => void;
  reset: () => void;
}

export const usePlatformData = (
  platformId: string,
  options: UsePlatformDataOptions = {}
): UsePlatformDataReturn => {
  const {
    retryAttempts = 3,
    retryDelay = 1000,
    enableAutoRetry = false,
  } = options;

  const [data, setData] = useState<CodingPlatform | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadPlatformData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API call delay for demonstration
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Import platform data dynamically
      const { getPlatformData } = await import("@/data/coding-platforms");
      const platformData = getPlatformData(platformId);

      if (!platformData) {
        throw new Error(`Platform data not found for: ${platformId}`);
      }

      // Simulate potential network errors for testing
      if (process.env.NODE_ENV === "development" && Math.random() < 0.1) {
        throw new Error("Simulated network error");
      }

      setData(platformData);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error occurred");
      setError(error);

      // Auto-retry logic
      if (enableAutoRetry && retryCount < retryAttempts) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          loadPlatformData();
        }, retryDelay * Math.pow(2, retryCount)); // Exponential backoff
      }
    } finally {
      setIsLoading(false);
    }
  }, [platformId, retryCount, retryAttempts, retryDelay, enableAutoRetry]);

  const retry = useCallback(() => {
    if (retryCount < retryAttempts) {
      setRetryCount((prev) => prev + 1);
      loadPlatformData();
    }
  }, [retryCount, retryAttempts, loadPlatformData]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setRetryCount(0);
    setIsLoading(true);
    loadPlatformData();
  }, [loadPlatformData]);

  useEffect(() => {
    loadPlatformData();
  }, [loadPlatformData]);

  return {
    data,
    isLoading,
    error,
    retryCount,
    retry,
    reset,
  };
};

/**
 * Hook for managing multiple platform data loading
 */
export interface UseMultiplePlatformDataReturn {
  platforms: CodingPlatform[];
  isLoading: boolean;
  errors: Record<string, Error>;
  retryPlatform: (platformId: string) => void;
  retryAll: () => void;
}

export const useMultiplePlatformData = (
  platformIds: string[],
  options: UsePlatformDataOptions = {}
): UseMultiplePlatformDataReturn => {
  const [platforms, setPlatforms] = useState<CodingPlatform[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, Error>>({});
  const [retryCounters, setRetryCounters] = useState<Record<string, number>>(
    {}
  );

  const { retryAttempts = 3, retryDelay = 1000 } = options;

  const loadAllPlatforms = useCallback(async () => {
    setIsLoading(true);
    const loadedPlatforms: CodingPlatform[] = [];
    const loadErrors: Record<string, Error> = {};

    await Promise.allSettled(
      platformIds.map(async (platformId) => {
        try {
          // Simulate API call delay
          await new Promise((resolve) =>
            setTimeout(resolve, 300 + Math.random() * 400)
          );

          const { getPlatformData } = await import("@/data/coding-platforms");
          const platformData = getPlatformData(platformId);

          if (!platformData) {
            throw new Error(`Platform data not found for: ${platformId}`);
          }

          // Simulate potential errors
          if (process.env.NODE_ENV === "development" && Math.random() < 0.05) {
            throw new Error(`Simulated error for ${platformId}`);
          }

          loadedPlatforms.push(platformData);
        } catch (err) {
          const error =
            err instanceof Error ? err : new Error("Unknown error occurred");
          loadErrors[platformId] = error;
        }
      })
    );

    setPlatforms(loadedPlatforms);
    setErrors(loadErrors);
    setIsLoading(false);
  }, [platformIds]);

  const retryPlatform = useCallback(
    async (platformId: string) => {
      const currentRetryCount = retryCounters[platformId] || 0;

      if (currentRetryCount >= retryAttempts) {
        return;
      }

      setRetryCounters((prev) => ({
        ...prev,
        [platformId]: currentRetryCount + 1,
      }));

      try {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));

        const { getPlatformData } = await import("@/data/coding-platforms");
        const platformData = getPlatformData(platformId);

        if (!platformData) {
          throw new Error(`Platform data not found for: ${platformId}`);
        }

        setPlatforms((prev) => {
          const filtered = prev.filter((p) => p.id !== platformId);
          return [...filtered, platformData];
        });

        setErrors((prev) => {
          const { [platformId]: removed, ...rest } = prev;
          return rest;
        });
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Unknown error occurred");
        setErrors((prev) => ({
          ...prev,
          [platformId]: error,
        }));
      }
    },
    [retryAttempts, retryDelay, retryCounters]
  );

  const retryAll = useCallback(() => {
    setRetryCounters({});
    loadAllPlatforms();
  }, [loadAllPlatforms]);

  useEffect(() => {
    loadAllPlatforms();
  }, [loadAllPlatforms]);

  return {
    platforms,
    isLoading,
    errors,
    retryPlatform,
    retryAll,
  };
};

/**
 * Hook for managing image loading states
 */
export interface UseImageLoadingReturn {
  isLoading: boolean;
  hasError: boolean;
  retry: () => void;
}

export const useImageLoading = (src?: string): UseImageLoadingReturn => {
  const [isLoading, setIsLoading] = useState(!!src);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);

  const retry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setRetryKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const img = new Image();

    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, retryKey]);

  return {
    isLoading,
    hasError,
    retry,
  };
};

export default {
  usePlatformData,
  useMultiplePlatformData,
  useImageLoading,
};
