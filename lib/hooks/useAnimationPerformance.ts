/**
 * Animation performance optimization hook for certifications section
 * Implements requestAnimationFrame management, GPU acceleration, throttling, and memory cleanup
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { usePerformanceMonitor } from "../performance-monitor";

interface AnimationFrameManager {
  id: number;
  callback: FrameRequestCallback;
  priority: "high" | "medium" | "low";
  startTime: number;
}

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  droppedFrames: number;
  memoryUsage: number;
}

export const useAnimationPerformance = () => {
  const { measureRender } = usePerformanceMonitor();
  const animationFramesRef = useRef<Map<string, AnimationFrameManager>>(
    new Map()
  );
  const performanceMetricsRef = useRef<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    droppedFrames: 0,
    memoryUsage: 0,
  });
  const lastFrameTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);
  const [isOptimized, setIsOptimized] = useState(false);

  // GPU acceleration utilities
  const gpuAcceleration = {
    // Apply GPU acceleration styles
    getGPUStyles: () => ({
      willChange: "transform, opacity",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden" as const,
      perspective: 1000,
    }),

    // Remove GPU acceleration when not needed
    removeGPUStyles: () => ({
      willChange: "auto",
      transform: "none",
      backfaceVisibility: "visible" as const,
      perspective: "none",
    }),

    // Check if GPU acceleration is supported
    isSupported: () => {
      if (typeof window === "undefined") return false;

      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      return !!gl;
    },
  };

  // RequestAnimationFrame manager with priority system
  const requestAnimationFrame = useCallback(
    (
      key: string,
      callback: FrameRequestCallback,
      priority: "high" | "medium" | "low" = "medium"
    ) => {
      // Cancel existing frame if it exists
      const existingFrame = animationFramesRef.current.get(key);
      if (existingFrame) {
        window.cancelAnimationFrame(existingFrame.id);
      }

      // Wrap callback with performance monitoring
      const wrappedCallback: FrameRequestCallback = (timestamp) => {
        const startTime = performance.now();

        try {
          callback(timestamp);
        } catch (error) {
          console.error(`Animation frame error for ${key}:`, error);
        }

        const endTime = performance.now();
        const frameTime = endTime - startTime;

        // Update performance metrics
        if (frameTime > 16.67) {
          performanceMetricsRef.current.droppedFrames++;
        }

        // Remove from active frames
        animationFramesRef.current.delete(key);
      };

      // Schedule the frame
      const frameId = window.requestAnimationFrame(wrappedCallback);

      // Store frame info
      animationFramesRef.current.set(key, {
        id: frameId,
        callback: wrappedCallback,
        priority,
        startTime: performance.now(),
      });

      return frameId;
    },
    []
  );

  // Cancel animation frame
  const cancelAnimationFrame = useCallback((key: string) => {
    const frame = animationFramesRef.current.get(key);
    if (frame) {
      window.cancelAnimationFrame(frame.id);
      animationFramesRef.current.delete(key);
    }
  }, []);

  // Throttled animation frame for lower priority animations
  const throttledAnimationFrame = useCallback(
    (
      key: string,
      callback: FrameRequestCallback,
      throttleMs: number = 33 // ~30fps
    ) => {
      const lastCallTime = lastFrameTimeRef.current;
      const now = performance.now();

      if (now - lastCallTime >= throttleMs) {
        lastFrameTimeRef.current = now;
        return requestAnimationFrame(key, callback, "low");
      }

      return null;
    },
    [requestAnimationFrame]
  );

  // Debounced animation frame for resize/scroll events
  const debouncedAnimationFrame = useCallback(
    (key: string, callback: FrameRequestCallback, debounceMs: number = 100) => {
      // Cancel existing debounced frame
      cancelAnimationFrame(`debounced-${key}`);

      // Schedule new debounced frame
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(`debounced-${key}`, callback, "low");
      }, debounceMs);

      // Store timeout for cleanup
      return timeoutId;
    },
    [requestAnimationFrame, cancelAnimationFrame]
  );

  // Performance monitoring
  const monitorPerformance = useCallback(() => {
    const monitor = () => {
      const now = performance.now();
      frameCountRef.current++;

      // Calculate FPS every second
      if (now - lastFrameTimeRef.current >= 1000) {
        const fps =
          (frameCountRef.current * 1000) / (now - lastFrameTimeRef.current);
        performanceMetricsRef.current.fps = fps;
        performanceMetricsRef.current.frameTime = 1000 / fps;

        // Reset counters
        frameCountRef.current = 0;
        lastFrameTimeRef.current = now;

        // Check if we need to optimize
        if (fps < 45) {
          setIsOptimized(true);
        } else if (fps > 55 && isOptimized) {
          setIsOptimized(false);
        }
      }

      // Get memory usage if available
      if ((performance as any).memory) {
        performanceMetricsRef.current.memoryUsage = (
          performance as any
        ).memory.usedJSHeapSize;
      }

      requestAnimationFrame("performance-monitor", monitor, "low");
    };

    requestAnimationFrame("performance-monitor", monitor, "low");
  }, [requestAnimationFrame, isOptimized]);

  // Memory cleanup utilities
  const memoryCleanup = {
    // Clean up animation listeners
    cleanupAnimationListeners: (element: HTMLElement) => {
      const events = [
        "animationstart",
        "animationend",
        "animationiteration",
        "transitionend",
      ];
      events.forEach((event) => {
        element.removeEventListener(event, () => {});
      });
    },

    // Clean up intersection observers
    cleanupObservers: (observers: IntersectionObserver[]) => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
    },

    // Clean up timeouts and intervals
    cleanupTimers: (timers: (NodeJS.Timeout | number)[]) => {
      timers.forEach((timer) => {
        clearTimeout(timer as NodeJS.Timeout);
      });
    },

    // Force garbage collection (if available)
    forceGC: () => {
      if (typeof window !== "undefined" && (window as any).gc) {
        (window as any).gc();
      }
    },
  };

  // Adaptive animation quality based on performance
  const getAdaptiveAnimationConfig = useCallback(() => {
    const fps = performanceMetricsRef.current.fps;
    const memoryUsage = performanceMetricsRef.current.memoryUsage;

    // High performance mode
    if (fps >= 55 && memoryUsage < 50 * 1024 * 1024) {
      // < 50MB
      return {
        quality: "high" as const,
        particleCount: 15,
        animationDuration: 1,
        blurIntensity: 4,
        enableComplexAnimations: true,
        enableGPU: true,
      };
    }

    // Medium performance mode
    if (fps >= 45 && memoryUsage < 100 * 1024 * 1024) {
      // < 100MB
      return {
        quality: "medium" as const,
        particleCount: 10,
        animationDuration: 0.8,
        blurIntensity: 2,
        enableComplexAnimations: true,
        enableGPU: true,
      };
    }

    // Low performance mode
    return {
      quality: "low" as const,
      particleCount: 5,
      animationDuration: 0.5,
      blurIntensity: 0,
      enableComplexAnimations: false,
      enableGPU: false,
    };
  }, []);

  // Optimized scroll handler
  const createOptimizedScrollHandler = useCallback(
    (handler: (scrollY: number, deltaY: number) => void) => {
      let lastScrollY = 0;
      let ticking = false;

      return (event: Event) => {
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY;

        if (!ticking) {
          requestAnimationFrame(
            "scroll-handler",
            () => {
              handler(scrollY, deltaY);
              lastScrollY = scrollY;
              ticking = false;
            },
            "high"
          );
          ticking = true;
        }
      };
    },
    [requestAnimationFrame]
  );

  // Optimized resize handler
  const createOptimizedResizeHandler = useCallback(
    (handler: (width: number, height: number) => void) => {
      let resizeTimeout: NodeJS.Timeout;

      return () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          requestAnimationFrame(
            "resize-handler",
            () => {
              handler(window.innerWidth, window.innerHeight);
            },
            "medium"
          );
        }, 100);
      };
    },
    [requestAnimationFrame]
  );

  // Batch DOM updates
  const batchDOMUpdates = useCallback(
    (updates: (() => void)[]) => {
      requestAnimationFrame(
        "batch-dom-updates",
        () => {
          // Measure phase
          const measurements = updates.map(() => ({}));

          // Mutate phase
          updates.forEach((update, index) => {
            try {
              update();
            } catch (error) {
              console.error(`Batch DOM update ${index} failed:`, error);
            }
          });
        },
        "high"
      );
    },
    [requestAnimationFrame]
  );

  // Initialize performance monitoring
  useEffect(() => {
    monitorPerformance();

    return () => {
      // Cleanup all active animation frames
      animationFramesRef.current.forEach((frame, key) => {
        window.cancelAnimationFrame(frame.id);
      });
      animationFramesRef.current.clear();
    };
  }, [monitorPerformance]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cancel all active frames
      animationFramesRef.current.forEach((frame) => {
        window.cancelAnimationFrame(frame.id);
      });
      animationFramesRef.current.clear();
    };
  }, []);

  return {
    // Animation frame management
    requestAnimationFrame,
    cancelAnimationFrame,
    throttledAnimationFrame,
    debouncedAnimationFrame,

    // GPU acceleration
    gpuAcceleration,

    // Performance monitoring
    performanceMetrics: performanceMetricsRef.current,
    isOptimized,
    getAdaptiveAnimationConfig,

    // Memory cleanup
    memoryCleanup,

    // Optimized handlers
    createOptimizedScrollHandler,
    createOptimizedResizeHandler,
    batchDOMUpdates,
  };
};

export default useAnimationPerformance;
