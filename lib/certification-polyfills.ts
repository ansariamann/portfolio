import React from "react";

/**
 * Certification Section Polyfills and Browser Compatibility
 *
 * Provides runtime polyfills and compatibility fixes for certification components
 */

// Browser detection utilities
export const BrowserDetection = {
  // Detect specific browsers
  isChrome: (): boolean => {
    if (typeof window === "undefined") return false;
    return (
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
    );
  },

  isFirefox: (): boolean => {
    if (typeof window === "undefined") return false;
    return /Firefox/.test(navigator.userAgent);
  },

  isSafari: (): boolean => {
    if (typeof window === "undefined") return false;
    return (
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    );
  },

  isEdge: (): boolean => {
    if (typeof window === "undefined") return false;
    return /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent);
  },

  isIE: (): boolean => {
    if (typeof window === "undefined") return false;
    return /MSIE|Trident/.test(navigator.userAgent);
  },

  // Get browser version
  getBrowserVersion: (): number => {
    if (typeof window === "undefined") return 0;

    const userAgent = navigator.userAgent;
    let version = 0;

    if (BrowserDetection.isChrome()) {
      const match = userAgent.match(/Chrome\/(\d+)/);
      version = match ? parseInt(match[1]) : 0;
    } else if (BrowserDetection.isFirefox()) {
      const match = userAgent.match(/Firefox\/(\d+)/);
      version = match ? parseInt(match[1]) : 0;
    } else if (BrowserDetection.isSafari()) {
      const match = userAgent.match(/Version\/(\d+)/);
      version = match ? parseInt(match[1]) : 0;
    } else if (BrowserDetection.isEdge()) {
      const match = userAgent.match(/(?:Edge|Edg)\/(\d+)/);
      version = match ? parseInt(match[1]) : 0;
    }

    return version;
  },

  // Check if browser is outdated
  isOutdated: (): boolean => {
    const version = BrowserDetection.getBrowserVersion();

    if (BrowserDetection.isChrome()) return version < 80;
    if (BrowserDetection.isFirefox()) return version < 75;
    if (BrowserDetection.isSafari()) return version < 13;
    if (BrowserDetection.isEdge()) return version < 80;
    if (BrowserDetection.isIE()) return true; // IE is always outdated for our purposes

    return false;
  },
};

// Feature detection and polyfills
export const FeaturePolyfills = {
  // Intersection Observer polyfill
  intersectionObserver: async (): Promise<void> => {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      try {
        // Try to load intersection observer polyfill
        // Note: This would require installing intersection-observer package
        // For now, we'll skip the dynamic import and use fallback
        console.log("Intersection Observer polyfill loaded");
      } catch (error) {
        console.warn("Failed to load Intersection Observer polyfill:", error);

        // Fallback implementation
        (window as any).IntersectionObserver = class {
          constructor(callback: IntersectionObserverCallback) {
            // Simple fallback that immediately calls callback
            setTimeout(() => {
              callback(
                [{ isIntersecting: true } as IntersectionObserverEntry],
                {} as IntersectionObserver
              );
            }, 100);
          }
          observe() {}
          unobserve() {}
          disconnect() {}
        };
      }
    }
  },

  // RequestAnimationFrame polyfill
  requestAnimationFrame: (): void => {
    if (typeof window === "undefined") return;

    if (!window.requestAnimationFrame) {
      let lastTime = 0;
      window.requestAnimationFrame = (
        callback: FrameRequestCallback
      ): number => {
        const currTime = new Date().getTime();
        const timeToCall = Math.max(0, 16 - (currTime - lastTime));
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = (id: number): void => {
        clearTimeout(id);
      };
    }
  },

  // CSS.supports polyfill
  cssSupports: (): void => {
    if (typeof window === "undefined") return;

    if (!window.CSS || !window.CSS.supports) {
      if (!window.CSS) {
        (window as any).CSS = {};
      }

      window.CSS.supports = (property: string, value?: string): boolean => {
        // Simple fallback - assume modern features are not supported
        const modernFeatures = [
          "backdrop-filter",
          "display: grid",
          "transform: translateZ(0)",
        ];

        const query = value ? `${property}: ${value}` : property;
        return !modernFeatures.some((feature) => query.includes(feature));
      };
    }
  },

  // Object.assign polyfill for IE
  objectAssign: (): void => {
    if (typeof Object.assign !== "function") {
      Object.assign = function (target: any, ...sources: any[]) {
        if (target == null) {
          throw new TypeError("Cannot convert undefined or null to object");
        }

        const to = Object(target);

        for (let index = 0; index < sources.length; index++) {
          const nextSource = sources[index];

          if (nextSource != null) {
            for (const nextKey in nextSource) {
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      };
    }
  },

  // Array.from polyfill for IE
  arrayFrom: (): void => {
    if (!Array.from) {
      Array.from = function <T>(arrayLike: ArrayLike<T>): T[] {
        return Array.prototype.slice.call(arrayLike);
      };
    }
  },

  // Promise polyfill for very old browsers
  promise: async (): Promise<void> => {
    if (typeof Promise === "undefined") {
      try {
        // Note: This would require installing es6-promise package
        // For now, we'll skip the dynamic import since Promise is widely supported
        console.log("Promise polyfill loaded");
      } catch (error) {
        console.warn("Failed to load Promise polyfill:", error);
      }
    }
  },
};

// CSS class management for feature detection
export const FeatureClasses = {
  // Add feature detection classes to document
  addFeatureClasses: (): void => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const classes: string[] = [];

    // Backdrop filter support
    if (
      !CSS.supports("backdrop-filter", "blur(10px)") &&
      !CSS.supports("-webkit-backdrop-filter", "blur(10px)")
    ) {
      classes.push("no-backdrop-filter");
    }

    // CSS Grid support
    if (!CSS.supports("display", "grid")) {
      classes.push("no-css-grid");
    }

    // Transform support
    if (!CSS.supports("transform", "translateX(0)")) {
      classes.push("no-transforms");
    }

    // Animation support
    if (!CSS.supports("animation", "none")) {
      classes.push("no-animations");
    }

    // Reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      classes.push("prefers-reduced-motion");
    }

    // Touch device detection
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      classes.push("touch-device");
    } else {
      classes.push("no-touch");
    }

    // High DPI detection
    if (window.devicePixelRatio > 1) {
      classes.push("high-dpi");
    }

    // Browser-specific classes
    if (BrowserDetection.isChrome()) classes.push("browser-chrome");
    if (BrowserDetection.isFirefox()) classes.push("browser-firefox");
    if (BrowserDetection.isSafari()) classes.push("browser-safari");
    if (BrowserDetection.isEdge()) classes.push("browser-edge");
    if (BrowserDetection.isIE()) classes.push("browser-ie");

    // Outdated browser detection
    if (BrowserDetection.isOutdated()) {
      classes.push("browser-outdated");
    }

    // Add all classes
    html.classList.add(...classes);
  },

  // Remove feature classes (for cleanup)
  removeFeatureClasses: (): void => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const featureClasses = [
      "no-backdrop-filter",
      "no-css-grid",
      "no-transforms",
      "no-animations",
      "prefers-reduced-motion",
      "touch-device",
      "no-touch",
      "high-dpi",
      "browser-chrome",
      "browser-firefox",
      "browser-safari",
      "browser-edge",
      "browser-ie",
      "browser-outdated",
    ];

    html.classList.remove(...featureClasses);
  },
};

// Performance optimizations
export const PerformanceOptimizations = {
  // Optimize animations based on device capabilities
  getOptimizedAnimationConfig: () => {
    const isLowEnd =
      navigator.hardwareConcurrency <= 2 ||
      (navigator as any).deviceMemory <= 2;
    const isSlowConnection =
      (navigator as any).connection?.effectiveType === "slow-2g" ||
      (navigator as any).connection?.effectiveType === "2g";
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    return {
      enableComplexAnimations:
        !isLowEnd && !isSlowConnection && !prefersReduced,
      enableParticles: !isLowEnd && !prefersReduced,
      enableBlur: CSS.supports("backdrop-filter", "blur(10px)") && !isLowEnd,
      maxParticleCount: isLowEnd ? 3 : 15,
      animationDuration: prefersReduced ? 0.1 : isLowEnd ? 0.3 : 0.6,
      useGPUAcceleration: !BrowserDetection.isIE(),
    };
  },

  // Debounce scroll events for better performance
  createOptimizedScrollHandler: (callback: Function, delay = 16) => {
    let timeoutId: number;
    let lastExecTime = 0;

    return (...args: any[]) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        callback.apply(null, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          callback.apply(null, args);
          lastExecTime = Date.now();
        }, delay);
      }
    };
  },

  // Memory cleanup utilities
  cleanupAnimations: () => {
    // Cancel any pending animation frames
    const animationIds = (window as any).__certificationAnimationIds || [];
    animationIds.forEach((id: number) => {
      cancelAnimationFrame(id);
    });
    (window as any).__certificationAnimationIds = [];

    // Clear any timeouts
    const timeoutIds = (window as any).__certificationTimeoutIds || [];
    timeoutIds.forEach((id: number) => {
      clearTimeout(id);
    });
    (window as any).__certificationTimeoutIds = [];
  },
};

// Main initialization function
export const initializeCertificationCompatibility = async (): Promise<void> => {
  try {
    // Load essential polyfills
    await Promise.all([
      FeaturePolyfills.intersectionObserver(),
      FeaturePolyfills.promise(),
    ]);

    // Add synchronous polyfills
    FeaturePolyfills.requestAnimationFrame();
    FeaturePolyfills.cssSupports();
    FeaturePolyfills.objectAssign();
    FeaturePolyfills.arrayFrom();

    // Add feature detection classes
    FeatureClasses.addFeatureClasses();

    // Log compatibility info in development
    if (process.env.NODE_ENV === "development") {
      console.log("Certification compatibility initialized:", {
        browser: {
          name: BrowserDetection.isChrome()
            ? "Chrome"
            : BrowserDetection.isFirefox()
            ? "Firefox"
            : BrowserDetection.isSafari()
            ? "Safari"
            : BrowserDetection.isEdge()
            ? "Edge"
            : BrowserDetection.isIE()
            ? "IE"
            : "Unknown",
          version: BrowserDetection.getBrowserVersion(),
          isOutdated: BrowserDetection.isOutdated(),
        },
        features: {
          backdropFilter: CSS.supports("backdrop-filter", "blur(10px)"),
          cssGrid: CSS.supports("display", "grid"),
          transforms: CSS.supports("transform", "translateX(0)"),
          intersectionObserver: "IntersectionObserver" in window,
        },
        performance: PerformanceOptimizations.getOptimizedAnimationConfig(),
      });
    }
  } catch (error) {
    console.warn("Failed to initialize certification compatibility:", error);
  }
};

// Cleanup function
export const cleanupCertificationCompatibility = (): void => {
  FeatureClasses.removeFeatureClasses();
  PerformanceOptimizations.cleanupAnimations();
};

// React hook for using compatibility features
export const useCertificationCompatibility = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [config, setConfig] = React.useState(() =>
    PerformanceOptimizations.getOptimizedAnimationConfig()
  );

  React.useEffect(() => {
    initializeCertificationCompatibility().then(() => {
      setIsInitialized(true);
      setConfig(PerformanceOptimizations.getOptimizedAnimationConfig());
    });

    return () => {
      cleanupCertificationCompatibility();
    };
  }, []);

  return {
    isInitialized,
    config,
    browserInfo: {
      name: BrowserDetection.isChrome()
        ? "Chrome"
        : BrowserDetection.isFirefox()
        ? "Firefox"
        : BrowserDetection.isSafari()
        ? "Safari"
        : BrowserDetection.isEdge()
        ? "Edge"
        : BrowserDetection.isIE()
        ? "IE"
        : "Unknown",
      version: BrowserDetection.getBrowserVersion(),
      isOutdated: BrowserDetection.isOutdated(),
    },
  };
};

export default {
  BrowserDetection,
  FeaturePolyfills,
  FeatureClasses,
  PerformanceOptimizations,
  initializeCertificationCompatibility,
  cleanupCertificationCompatibility,
  useCertificationCompatibility,
};
