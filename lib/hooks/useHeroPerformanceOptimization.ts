"use client";

import { useEffect, useCallback, useMemo, useState } from "react";
import { usePerformanceMonitor } from "../performance-monitor";
import { optimizeAnimations, memoryOptimization } from "../performance";
import {
  preloadImages,
  getBestImageFormat,
  isWebPSupported,
  createImageLazyLoader,
} from "../image-optimization";

/**
 * Hero section performance optimization hook
 * Implements lazy loading, preconnect/prefetch, reduced motion, and progressive loading
 */
export const useHeroPerformanceOptimization = () => {
  const { measureRender, measureAsync } = usePerformanceMonitor();
  const { debounce, throttle } = memoryOptimization();
  const { shouldReduceAnimations, getAnimationDuration } = optimizeAnimations();

  const [webpSupported, setWebpSupported] = useState<boolean>(false);
  const [bestImageFormat, setBestImageFormat] = useState<string>("jpeg");
  const [criticalResourcesLoaded, setCriticalResourcesLoaded] = useState(false);
  const [progressiveLoadingStage, setProgressiveLoadingStage] = useState(0);

  // Detect image format support
  useEffect(() => {
    const detectImageSupport = async () => {
      try {
        const webpSupported = await isWebPSupported();
        const bestFormat = await getBestImageFormat();

        setWebpSupported(webpSupported);
        setBestImageFormat(bestFormat);
      } catch (error) {
        console.warn("Image format detection failed:", error);
        setWebpSupported(false);
        setBestImageFormat("jpeg");
      }
    };

    detectImageSupport();
  }, []);

  // Preconnect to critical external resources
  const preconnectCriticalResources = useCallback(() => {
    const criticalDomains = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://github.com",
      "https://linkedin.com",
    ];

    criticalDomains.forEach((domain) => {
      // Check if preconnect link already exists
      const existingLink = document.querySelector(`link[href="${domain}"]`);
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = domain;
        if (domain.includes("gstatic")) {
          link.crossOrigin = "anonymous";
        }
        document.head.appendChild(link);
      }
    });
  }, []);

  // Prefetch critical resources
  const prefetchCriticalResources = useCallback(() => {
    const criticalResources = [
      // Critical images for hero section
      "/images/profile-photo.webp",
      "/images/profile-photo.jpg", // Fallback
      "/images/placeholder.svg",
      // Critical icons
      "/images/platforms/leetcode-logo.svg",
      "/images/platforms/hackerrank-logo.svg",
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = resource.endsWith(".svg") ? "image" : "image";
      link.href = resource;
      document.head.appendChild(link);
    });
  }, []);

  // Preload critical images with format optimization
  const preloadCriticalImages = useCallback(async () => {
    const criticalImages = [
      webpSupported
        ? "/images/profile-photo.webp"
        : "/images/profile-photo.jpg",
      "/images/placeholder.svg",
    ];

    try {
      await measureAsync("Preload Critical Images", async () => {
        await preloadImages(criticalImages);
      });
      setCriticalResourcesLoaded(true);
    } catch (error) {
      console.warn("Failed to preload critical images:", error);
      setCriticalResourcesLoaded(true); // Continue anyway
    }
  }, [webpSupported, measureAsync]);

  // Progressive loading stages
  const progressiveLoad = useCallback(() => {
    const stages = [
      // Stage 0: Critical resources
      () => {
        preconnectCriticalResources();
        prefetchCriticalResources();
        setProgressiveLoadingStage(1);
      },
      // Stage 1: Critical images
      () => {
        preloadCriticalImages();
        setProgressiveLoadingStage(2);
      },
      // Stage 2: Non-critical resources
      () => {
        // Load non-critical images after a delay
        setTimeout(() => {
          const nonCriticalImages = [
            "/images/badges/leetcode-100.svg",
            "/images/badges/hackerrank-100.svg",
          ];
          preloadImages(nonCriticalImages).catch(console.warn);
        }, 1000);
        setProgressiveLoadingStage(3);
      },
    ];

    // Execute stages with delays for progressive enhancement
    stages.forEach((stage, index) => {
      setTimeout(stage, index * 100);
    });
  }, [
    preconnectCriticalResources,
    prefetchCriticalResources,
    preloadCriticalImages,
  ]);

  // Optimized scroll handler for parallax effects
  const createOptimizedScrollHandler = useCallback(
    (handler: (scrollY: number) => void) => {
      let ticking = false;

      return throttle(() => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handler(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      }, 16); // ~60fps
    },
    [throttle]
  );

  // Optimized resize handler
  const createOptimizedResizeHandler = useCallback(
    (handler: () => void) => {
      return debounce(handler, 250);
    },
    [debounce]
  );

  // Reduced motion configuration
  const motionConfig = useMemo(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isSlowDevice =
      typeof navigator !== "undefined" &&
      (navigator as any).deviceMemory &&
      (navigator as any).deviceMemory < 4;

    const isSlowConnection =
      typeof navigator !== "undefined" &&
      (navigator as any).connection &&
      ((navigator as any).connection.effectiveType === "slow-2g" ||
        (navigator as any).connection.effectiveType === "2g");

    const shouldReduce =
      prefersReducedMotion ||
      shouldReduceAnimations ||
      isSlowDevice ||
      isSlowConnection;

    return {
      shouldReduceAnimations: shouldReduce,
      animationDuration: shouldReduce ? 0.2 : 0.6,
      springConfig: shouldReduce
        ? { type: "tween", duration: 0.2 }
        : { type: "spring", stiffness: 300, damping: 30 },
      parallaxIntensity: shouldReduce ? 0.1 : 1,
      blurIntensity: shouldReduce ? 0 : 1,
    };
  }, [shouldReduceAnimations]);

  // Lazy loading intersection observer
  const createLazyLoader = useCallback(
    (
      callback: (entry: IntersectionObserverEntry) => void,
      options: IntersectionObserverInit = {}
    ) => {
      const defaultOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
        ...options,
      };

      return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      }, defaultOptions);
    },
    []
  );

  // Image optimization utilities
  const getOptimizedImageSrc = useCallback(
    (src: string, width?: number) => {
      // Return WebP version if supported and available
      if (webpSupported && src.includes(".jpg") && !src.includes(".webp")) {
        const webpSrc = src.replace(/\.(jpg|jpeg)$/i, ".webp");
        return webpSrc;
      }

      // Add width parameter for Next.js Image optimization
      if (width && !src.includes("?")) {
        return `${src}?w=${width}&q=85`;
      }

      return src;
    },
    [webpSupported]
  );

  // Performance monitoring for hero section
  const measureHeroPerformance = useCallback(
    (componentName: string, fn: () => void) => {
      return measureRender(`Hero-${componentName}`, fn);
    },
    [measureRender]
  );

  // Memory cleanup
  const cleanup = useCallback(() => {
    // Remove prefetch links to free up memory
    const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
    prefetchLinks.forEach((link) => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    });

    // Clear any pending timeouts (simplified approach)
    // Note: This is a basic cleanup, in production you'd track timeout IDs
    try {
      for (let i = 1; i < 1000; i++) {
        clearTimeout(i);
      }
    } catch (error) {
      // Ignore errors from clearing non-existent timeouts
    }
  }, []);

  // Initialize performance optimizations
  useEffect(() => {
    // Start progressive loading
    progressiveLoad();

    // Cleanup on unmount
    return cleanup;
  }, [progressiveLoad, cleanup]);

  // Monitor reduced motion preference changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      // Force re-render when motion preference changes
      window.dispatchEvent(new CustomEvent("motionPreferenceChange"));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return {
    // Image optimization
    webpSupported,
    bestImageFormat,
    getOptimizedImageSrc,

    // Loading states
    criticalResourcesLoaded,
    progressiveLoadingStage,

    // Motion configuration
    motionConfig,

    // Optimized handlers
    createOptimizedScrollHandler,
    createOptimizedResizeHandler,
    createLazyLoader,

    // Performance monitoring
    measureHeroPerformance,

    // Utilities
    preloadCriticalImages,
    cleanup,
  };
};
