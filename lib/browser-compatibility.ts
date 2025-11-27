import React from "react";

/**
 * Browser Compatibility Utilities
 *
 * Provides feature detection and graceful degradation for certification components
 */

// Feature detection utilities
export const BrowserFeatures = {
  // Check if CSS backdrop-filter is supported
  supportsBackdropFilter: (): boolean => {
    if (typeof window === "undefined") return false;
    return (
      CSS.supports("backdrop-filter", "blur(10px)") ||
      CSS.supports("-webkit-backdrop-filter", "blur(10px)")
    );
  },

  // Check if CSS Grid is supported
  supportsCSSGrid: (): boolean => {
    if (typeof window === "undefined") return false;
    return CSS.supports("display", "grid");
  },

  // Check if Flexbox is supported
  supportsFlexbox: (): boolean => {
    if (typeof window === "undefined") return false;
    return CSS.supports("display", "flex");
  },

  // Check if CSS transforms are supported
  supportsTransforms: (): boolean => {
    if (typeof window === "undefined") return false;
    return CSS.supports("transform", "translateX(0)");
  },

  // Check if CSS animations are supported
  supportsAnimations: (): boolean => {
    if (typeof window === "undefined") return false;
    return CSS.supports("animation", "none");
  },

  // Check if Intersection Observer is supported
  supportsIntersectionObserver: (): boolean => {
    if (typeof window === "undefined") return false;
    return "IntersectionObserver" in window;
  },

  // Check if requestAnimationFrame is supported
  supportsRequestAnimationFrame: (): boolean => {
    if (typeof window === "undefined") return false;
    return "requestAnimationFrame" in window;
  },

  // Check if WebGL is supported
  supportsWebGL: (): boolean => {
    if (typeof window === "undefined") return false;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      );
    } catch {
      return false;
    }
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  // Check if device has touch capabilities
  isTouchDevice: (): boolean => {
    if (typeof window === "undefined") return false;
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  },

  // Check if device is mobile
  isMobileDevice: (): boolean => {
    if (typeof window === "undefined") return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  // Check if browser supports modern JavaScript features
  supportsModernJS: (): boolean => {
    if (typeof window === "undefined") return false;
    try {
      // Check for ES6+ features
      return (
        typeof Symbol !== "undefined" &&
        typeof Promise !== "undefined" &&
        typeof Map !== "undefined" &&
        typeof Set !== "undefined"
      );
    } catch {
      return false;
    }
  },
};

// Browser information
export const BrowserInfo = {
  // Get browser name
  getBrowserName: (): string => {
    if (typeof window === "undefined") return "unknown";

    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) return "chrome";
    if (userAgent.includes("Firefox")) return "firefox";
    if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
      return "safari";
    if (userAgent.includes("Edge")) return "edge";
    if (userAgent.includes("Opera")) return "opera";
    return "unknown";
  },

  // Get browser version
  getBrowserVersion: (): string => {
    if (typeof window === "undefined") return "unknown";

    const userAgent = navigator.userAgent;
    const match = userAgent.match(/(chrome|firefox|safari|edge|opera)\/(\d+)/i);
    return match ? match[2] : "unknown";
  },

  // Check if browser is outdated
  isOutdatedBrowser: (): boolean => {
    if (typeof window === "undefined") return false;

    const browserName = BrowserInfo.getBrowserName();
    const version = parseInt(BrowserInfo.getBrowserVersion());

    // Define minimum supported versions
    const minVersions: Record<string, number> = {
      chrome: 80,
      firefox: 75,
      safari: 13,
      edge: 80,
      opera: 67,
    };

    return version < (minVersions[browserName] || 0);
  },
};

// Performance utilities
export const PerformanceUtils = {
  // Check if device has good performance capabilities
  hasGoodPerformance: (): boolean => {
    if (typeof window === "undefined") return true;

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 1;

    // Check memory (if available)
    const memory = (navigator as any).deviceMemory || 4;

    // Check connection speed (if available)
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || "4g";

    return (
      cores >= 4 &&
      memory >= 4 &&
      effectiveType !== "slow-2g" &&
      effectiveType !== "2g"
    );
  },

  // Get recommended animation settings based on performance
  getAnimationSettings: () => {
    const hasGoodPerf = PerformanceUtils.hasGoodPerformance();
    const prefersReduced = BrowserFeatures.prefersReducedMotion();
    const isMobile = BrowserFeatures.isMobileDevice();

    return {
      enableComplexAnimations: hasGoodPerf && !prefersReduced && !isMobile,
      enableParticles: hasGoodPerf && !prefersReduced,
      enableBlur: BrowserFeatures.supportsBackdropFilter() && hasGoodPerf,
      enableTransforms: BrowserFeatures.supportsTransforms(),
      maxParticleCount: hasGoodPerf ? 15 : isMobile ? 5 : 10,
      animationDuration: prefersReduced ? 0.1 : isMobile ? 0.3 : 0.6,
    };
  },
};

// Fallback configurations
export const FallbackConfigs = {
  // CSS fallbacks for unsupported features
  css: {
    backdropFilter: {
      fallback: "background-color: rgba(255, 255, 255, 0.9);",
      modern: "backdrop-filter: blur(10px);",
    },
    grid: {
      fallback: "display: flex; flex-wrap: wrap;",
      modern: "display: grid;",
    },
    transforms: {
      fallback: "position: relative;",
      modern: "transform: translateX(0);",
    },
  },

  // Animation fallbacks
  animations: {
    staggeredText: {
      fallback: { duration: 0, delay: 0 },
      reduced: { duration: 0.2, delay: 0.05 },
      full: { duration: 0.6, delay: 0.1 },
    },
    cardHover: {
      fallback: {},
      reduced: { scale: 1.01, duration: 0.2 },
      full: { scale: 1.05, y: -5, duration: 0.3 },
    },
    particles: {
      fallback: { count: 0, enabled: false },
      reduced: { count: 3, enabled: true },
      full: { count: 15, enabled: true },
    },
  },
};

// Polyfills and feature additions
export const Polyfills = {
  // Add Intersection Observer polyfill if needed
  addIntersectionObserverPolyfill: async (): Promise<void> => {
    if (!BrowserFeatures.supportsIntersectionObserver()) {
      try {
        // Try to load intersection-observer polyfill from CDN as fallback
        const script = document.createElement("script");
        script.src =
          "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver";
        script.onload = () =>
          console.log("Intersection Observer polyfill loaded from CDN");
        script.onerror = () =>
          console.warn("Failed to load Intersection Observer polyfill");
        document.head.appendChild(script);
      } catch (error) {
        console.warn("Failed to load Intersection Observer polyfill:", error);
      }
    }
  },

  // Add requestAnimationFrame polyfill if needed
  addRequestAnimationFramePolyfill: (): void => {
    if (!BrowserFeatures.supportsRequestAnimationFrame()) {
      let lastTime = 0;
      (window as any).requestAnimationFrame = (
        callback: FrameRequestCallback
      ) => {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }
  },
};

// Main compatibility checker
export const CompatibilityChecker = {
  // Get overall compatibility score (0-100)
  getCompatibilityScore: (): number => {
    const features = [
      BrowserFeatures.supportsBackdropFilter(),
      BrowserFeatures.supportsCSSGrid(),
      BrowserFeatures.supportsFlexbox(),
      BrowserFeatures.supportsTransforms(),
      BrowserFeatures.supportsAnimations(),
      BrowserFeatures.supportsIntersectionObserver(),
      BrowserFeatures.supportsRequestAnimationFrame(),
      BrowserFeatures.supportsModernJS(),
      !BrowserInfo.isOutdatedBrowser(),
      PerformanceUtils.hasGoodPerformance(),
    ];

    const supportedCount = features.filter(Boolean).length;
    return Math.round((supportedCount / features.length) * 100);
  },

  // Get recommended configuration based on compatibility
  getRecommendedConfig: () => {
    const score = CompatibilityChecker.getCompatibilityScore();
    const animationSettings = PerformanceUtils.getAnimationSettings();

    return {
      compatibilityScore: score,
      tier: score >= 80 ? "high" : score >= 60 ? "medium" : "low",
      animations: animationSettings,
      features: {
        backdropFilter: BrowserFeatures.supportsBackdropFilter(),
        cssGrid: BrowserFeatures.supportsCSSGrid(),
        transforms: BrowserFeatures.supportsTransforms(),
        intersectionObserver: BrowserFeatures.supportsIntersectionObserver(),
      },
      fallbacks: {
        useSimpleAnimations:
          score < 60 || BrowserFeatures.prefersReducedMotion(),
        useStaticBackgrounds: !BrowserFeatures.supportsBackdropFilter(),
        useFlexboxFallback: !BrowserFeatures.supportsCSSGrid(),
        disableParticles: score < 40 || BrowserFeatures.isMobileDevice(),
      },
    };
  },

  // Initialize compatibility features
  initialize: async (): Promise<void> => {
    // Add polyfills
    await Polyfills.addIntersectionObserverPolyfill();
    Polyfills.addRequestAnimationFramePolyfill();

    // Log compatibility info in development
    if (process.env.NODE_ENV === "development") {
      const config = CompatibilityChecker.getRecommendedConfig();
      console.log("Browser Compatibility:", config);
    }
  },
};

// React hook for using compatibility features
export const useCompatibility = () => {
  const [config, setConfig] = React.useState(() =>
    CompatibilityChecker.getRecommendedConfig()
  );

  React.useEffect(() => {
    CompatibilityChecker.initialize();

    // Update config on resize (for performance changes)
    const handleResize = () => {
      setConfig(CompatibilityChecker.getRecommendedConfig());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return config;
};

export default {
  BrowserFeatures,
  BrowserInfo,
  PerformanceUtils,
  FallbackConfigs,
  Polyfills,
  CompatibilityChecker,
  useCompatibility,
};
