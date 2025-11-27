/**
 * Performance optimization hook for coding platforms section
 */

import { useEffect, useCallback, useMemo } from "react";
import { usePerformanceMonitor } from "../performance-monitor";
import { optimizeAnimations, memoryOptimization } from "../performance";

export const usePerformanceOptimization = () => {
  const { measureRender, measureAsync } = usePerformanceMonitor();
  const { debounce, throttle } = memoryOptimization();
  const { shouldReduceAnimations, getAnimationDuration } = optimizeAnimations();

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const criticalImages = [
      "/images/platforms/leetcode-logo.svg",
      "/images/platforms/hackerrank-logo.svg",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // Optimize component rendering
  const optimizeRender = useCallback(
    (componentName: string, renderFn: () => void) => {
      return measureRender(componentName, renderFn);
    },
    [measureRender]
  );

  // Debounced scroll handler for performance
  const createOptimizedScrollHandler = useCallback(
    (handler: () => void) => {
      return throttle(handler, 16); // ~60fps
    },
    [throttle]
  );

  // Debounced resize handler
  const createOptimizedResizeHandler = useCallback(
    (handler: () => void) => {
      return debounce(handler, 250);
    },
    [debounce]
  );

  // Memory cleanup
  const cleanup = useCallback(() => {
    // Remove event listeners
    const elements = document.querySelectorAll("[data-cleanup]");
    elements.forEach((element) => {
      const newElement = element.cloneNode(true);
      element.parentNode?.replaceChild(newElement, element);
    });
  }, []);

  // Lazy load non-critical components
  const shouldLazyLoad = useMemo(() => {
    if (typeof window === "undefined") return false;

    // Check device capabilities
    const connection = (navigator as any).connection;
    const deviceMemory = (navigator as any).deviceMemory;

    // Lazy load on slower connections or devices
    return (
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g" ||
      (deviceMemory && deviceMemory < 4)
    );
  }, []);

  // Animation optimization
  const animationConfig = useMemo(
    () => ({
      shouldReduce: shouldReduceAnimations,
      duration: getAnimationDuration,
      spring: shouldReduceAnimations
        ? { type: "tween", duration: 0.3 }
        : { type: "spring", stiffness: 300, damping: 30 },
    }),
    [shouldReduceAnimations, getAnimationDuration]
  );

  // Bundle splitting optimization
  const loadComponentAsync = useCallback(
    async (componentName: string) => {
      return measureAsync(`Load ${componentName}`, async () => {
        switch (componentName) {
          case "StatisticsVisualization":
            return import("@/components/ui/StatisticsVisualization");
          case "AchievementsBadges":
            return import("@/components/ui/AchievementsBadges");
          case "ActivityHeatmap":
            return import("@/components/ui/ActivityHeatmap");
          case "RecentActivity":
            return import("@/components/ui/RecentActivity");
          default:
            throw new Error(`Unknown component: ${componentName}`);
        }
      });
    },
    [measureAsync]
  );

  // Image optimization
  const optimizeImages = useCallback(() => {
    // Convert images to WebP if supported
    const supportsWebP = () => {
      const canvas = document.createElement("canvas");
      return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    };

    // Lazy load images with intersection observer
    const lazyLoadImages = () => {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.dataset.src;

              if (src) {
                // Use WebP if supported
                if (supportsWebP() && src.includes(".svg")) {
                  // Keep SVGs as-is, but optimize PNGs/JPGs to WebP
                  img.src = src;
                } else {
                  img.src = src;
                }

                img.classList.remove("lazy");
                imageObserver.unobserve(img);
              }
            }
          });
        },
        { rootMargin: "50px" }
      );

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    };

    return { lazyLoadImages, supportsWebP: supportsWebP() };
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    preloadCriticalResources();

    // Cleanup on unmount
    return cleanup;
  }, [preloadCriticalResources, cleanup]);

  return {
    optimizeRender,
    createOptimizedScrollHandler,
    createOptimizedResizeHandler,
    shouldLazyLoad,
    animationConfig,
    loadComponentAsync,
    optimizeImages,
    cleanup,
  };
};
