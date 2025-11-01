/**
 * Performance optimization utilities for the coding platforms section
 */

import { lazy } from "react";

// Lazy load heavy components for better performance
export const LazyStatisticsVisualization = lazy(
  () => import("@/components/ui/StatisticsVisualization")
);

export const LazyAchievementsBadges = lazy(
  () => import("@/components/ui/AchievementsBadges")
);

export const LazyActivityHeatmap = lazy(
  () => import("@/components/ui/ActivityHeatmap")
);

export const LazyRecentActivity = lazy(
  () => import("@/components/ui/RecentActivity")
);

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== "undefined" && "performance" in window) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
  } else {
    fn();
  }
};

// Core Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window !== "undefined" && "web-vitals" in window) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};

// Animation performance optimization
export const optimizeAnimations = () => {
  // Reduce animations on slower devices
  const isSlowDevice = () => {
    if (typeof navigator === "undefined") return false;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return true;

    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory;
    if (deviceMemory && deviceMemory < 4) return true;

    // Check connection speed
    const connection = (navigator as any).connection;
    if (
      connection &&
      (connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g")
    ) {
      return true;
    }

    return false;
  };

  return {
    shouldReduceAnimations: isSlowDevice(),
    getAnimationDuration: (defaultDuration: number) =>
      isSlowDevice() ? defaultDuration * 0.5 : defaultDuration,
  };
};

// Image optimization utilities
export const optimizeImages = () => {
  const preloadCriticalImages = (imagePaths: string[]) => {
    if (typeof window === "undefined") return;

    imagePaths.forEach((path) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = path;
      document.head.appendChild(link);
    });
  };

  const lazyLoadImages = () => {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  };

  return { preloadCriticalImages, lazyLoadImages };
};

// Bundle size optimization
export const optimizeBundles = () => {
  // Dynamic imports for non-critical features
  const loadChartLibrary = () => import("chart.js");
  const loadFramerMotion = () => import("framer-motion");

  return { loadChartLibrary, loadFramerMotion };
};

// Memory management
export const memoryOptimization = () => {
  const cleanupEventListeners = (element: Element) => {
    // Clone node to remove all event listeners
    const newElement = element.cloneNode(true);
    element.parentNode?.replaceChild(newElement, element);
  };

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const throttle = <T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  return { cleanupEventListeners, debounce, throttle };
};
