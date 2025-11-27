import React from "react";

/**
 * Certification Cross-Browser Testing Utilities
 *
 * Provides automated testing and validation for cross-browser compatibility
 */

// Test results interface
interface CompatibilityTestResult {
  feature: string;
  supported: boolean;
  fallbackAvailable: boolean;
  performance: "good" | "fair" | "poor";
  notes?: string;
}

interface BrowserTestSuite {
  browser: string;
  version: string;
  results: CompatibilityTestResult[];
  overallScore: number;
  recommendations: string[];
}

// Feature testing utilities
export const FeatureTesting = {
  // Test CSS backdrop-filter support
  testBackdropFilter: (): CompatibilityTestResult => {
    const supported =
      CSS.supports("backdrop-filter", "blur(10px)") ||
      CSS.supports("-webkit-backdrop-filter", "blur(10px)");

    return {
      feature: "backdrop-filter",
      supported,
      fallbackAvailable: true,
      performance: supported ? "good" : "fair",
      notes: supported ? "Native support available" : "Using opacity fallback",
    };
  },

  // Test CSS Grid support
  testCSSGrid: (): CompatibilityTestResult => {
    const supported = CSS.supports("display", "grid");

    return {
      feature: "css-grid",
      supported,
      fallbackAvailable: true,
      performance: supported ? "good" : "fair",
      notes: supported ? "Native grid support" : "Using flexbox fallback",
    };
  },

  // Test CSS transforms
  testTransforms: (): CompatibilityTestResult => {
    const supported = CSS.supports("transform", "translateX(0)");

    return {
      feature: "css-transforms",
      supported,
      fallbackAvailable: true,
      performance: supported ? "good" : "poor",
      notes: supported
        ? "Hardware acceleration available"
        : "Using position fallbacks",
    };
  },

  // Test Intersection Observer
  testIntersectionObserver: (): CompatibilityTestResult => {
    const supported = "IntersectionObserver" in window;

    return {
      feature: "intersection-observer",
      supported,
      fallbackAvailable: true,
      performance: supported ? "good" : "fair",
      notes: supported ? "Native API available" : "Using polyfill",
    };
  },

  // Test requestAnimationFrame
  testRequestAnimationFrame: (): CompatibilityTestResult => {
    const supported = "requestAnimationFrame" in window;

    return {
      feature: "request-animation-frame",
      supported,
      fallbackAvailable: true,
      performance: supported ? "good" : "poor",
      notes: supported
        ? "Smooth animations available"
        : "Using setTimeout fallback",
    };
  },

  // Test WebGL support
  testWebGL: (): CompatibilityTestResult => {
    let supported = false;
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      supported = !!gl;
    } catch (e) {
      supported = false;
    }

    return {
      feature: "webgl",
      supported,
      fallbackAvailable: true,
      performance: supported ? "good" : "fair",
      notes: supported
        ? "Hardware acceleration available"
        : "Using CSS animations",
    };
  },

  // Test modern JavaScript features
  testModernJS: (): CompatibilityTestResult => {
    const features = [
      typeof Symbol !== "undefined",
      typeof Promise !== "undefined",
      typeof Map !== "undefined",
      typeof Set !== "undefined",
      Array.from !== undefined,
      Object.assign !== undefined,
    ];

    const supported = features.every(Boolean);

    return {
      feature: "modern-javascript",
      supported,
      fallbackAvailable: true,
      performance: supported ? "good" : "fair",
      notes: supported ? "ES6+ features available" : "Using polyfills",
    };
  },
};

// Performance testing
export const PerformanceTesting = {
  // Test animation performance
  testAnimationPerformance: async (): Promise<CompatibilityTestResult> => {
    return new Promise((resolve) => {
      const testElement = document.createElement("div");
      testElement.style.cssText = `
        position: fixed;
        top: -100px;
        left: -100px;
        width: 50px;
        height: 50px;
        background: red;
        transition: transform 0.3s ease;
      `;
      document.body.appendChild(testElement);

      let frameCount = 0;
      const startTime = performance.now();

      const animate = () => {
        frameCount++;
        testElement.style.transform = `translateX(${frameCount}px)`;

        if (frameCount < 60) {
          requestAnimationFrame(animate);
        } else {
          const endTime: number = performance.now();
          const duration: number = endTime - startTime;
          const fps: number = (frameCount / duration) * 1000;

          document.body.removeChild(testElement);

          const performanceRating: "good" | "fair" | "poor" =
            fps >= 55 ? "good" : fps >= 30 ? "fair" : "poor";

          resolve({
            feature: "animation-performance",
            supported: fps >= 30,
            fallbackAvailable: true,
            performance: performanceRating,
            notes: `Achieved ${fps.toFixed(1)} FPS`,
          });
        }
      };

      requestAnimationFrame(animate);
    });
  },

  // Test memory usage
  testMemoryUsage: (): CompatibilityTestResult => {
    const memory: any = (performance as any).memory;

    if (!memory) {
      return {
        feature: "memory-monitoring",
        supported: false,
        fallbackAvailable: false,
        performance: "fair",
        notes: "Memory API not available",
      };
    }

    const usedMB: number = memory.usedJSHeapSize / 1024 / 1024;
    const totalMB = memory.totalJSHeapSize / 1024 / 1024;
    const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;

    const memoryPerformance: "good" | "fair" | "poor" =
      usedMB < limitMB * 0.5
        ? "good"
        : usedMB < limitMB * 0.8
        ? "fair"
        : "poor";

    return {
      feature: "memory-usage",
      supported: true,
      fallbackAvailable: false,
      performance: memoryPerformance,
      notes: `Using ${usedMB.toFixed(1)}MB of ${limitMB.toFixed(1)}MB limit`,
    };
  },

  // Test device capabilities
  testDeviceCapabilities: (): CompatibilityTestResult => {
    const cores = navigator.hardwareConcurrency || 1;
    const memory = (navigator as any).deviceMemory || 4;
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || "4g";

    const score =
      (cores >= 4 ? 2 : cores >= 2 ? 1 : 0) +
      (memory >= 8 ? 2 : memory >= 4 ? 1 : 0) +
      (effectiveType === "4g" ? 2 : effectiveType === "3g" ? 1 : 0);

    const performance = score >= 5 ? "good" : score >= 3 ? "fair" : "poor";

    return {
      feature: "device-capabilities",
      supported: true,
      fallbackAvailable: true,
      performance,
      notes: `${cores} cores, ${memory}GB RAM, ${effectiveType} connection`,
    };
  },
};

// Browser-specific testing
export const BrowserSpecificTesting = {
  // Test Safari-specific issues
  testSafariCompatibility: (): CompatibilityTestResult[] => {
    const isSafari =
      /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

    if (!isSafari) return [];

    return [
      {
        feature: "safari-backdrop-filter",
        supported: CSS.supports("-webkit-backdrop-filter", "blur(10px)"),
        fallbackAvailable: true,
        performance: "good",
        notes: "Safari requires -webkit- prefix",
      },
      {
        feature: "safari-smooth-scrolling",
        supported: CSS.supports("scroll-behavior", "smooth"),
        fallbackAvailable: true,
        performance: "fair",
        notes: "Safari has limited smooth scrolling support",
      },
    ];
  },

  // Test Firefox-specific issues
  testFirefoxCompatibility: (): CompatibilityTestResult[] => {
    const isFirefox = /Firefox/.test(navigator.userAgent);

    if (!isFirefox) return [];

    return [
      {
        feature: "firefox-backdrop-filter",
        supported: CSS.supports("backdrop-filter", "blur(10px)"),
        fallbackAvailable: true,
        performance: "good",
        notes: "Firefox has good backdrop-filter support",
      },
      {
        feature: "firefox-css-grid",
        supported: CSS.supports("display", "grid"),
        fallbackAvailable: true,
        performance: "good",
        notes: "Firefox has excellent CSS Grid support",
      },
    ];
  },

  // Test Chrome-specific issues
  testChromeCompatibility: (): CompatibilityTestResult[] => {
    const isChrome =
      /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    if (!isChrome) return [];

    return [
      {
        feature: "chrome-performance",
        supported: true,
        fallbackAvailable: false,
        performance: "good",
        notes: "Chrome has excellent performance characteristics",
      },
    ];
  },

  // Test Edge-specific issues
  testEdgeCompatibility: (): CompatibilityTestResult[] => {
    const isEdge =
      /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent);

    if (!isEdge) return [];

    return [
      {
        feature: "edge-modern-features",
        supported: true,
        fallbackAvailable: true,
        performance: "good",
        notes: "Modern Edge has good compatibility",
      },
    ];
  },
};

// Main testing suite
export const CertificationCompatibilityTester = {
  // Run all compatibility tests
  runFullTestSuite: async (): Promise<BrowserTestSuite> => {
    const browserName = /Chrome/.test(navigator.userAgent)
      ? "Chrome"
      : /Firefox/.test(navigator.userAgent)
      ? "Firefox"
      : /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent)
      ? "Safari"
      : /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent)
      ? "Edge"
      : "Unknown";

    const version =
      navigator.userAgent.match(
        /(?:Chrome|Firefox|Safari|Edge|Edg)\/(\d+)/
      )?.[1] || "Unknown";

    // Run core feature tests
    const coreTests = [
      FeatureTesting.testBackdropFilter(),
      FeatureTesting.testCSSGrid(),
      FeatureTesting.testTransforms(),
      FeatureTesting.testIntersectionObserver(),
      FeatureTesting.testRequestAnimationFrame(),
      FeatureTesting.testWebGL(),
      FeatureTesting.testModernJS(),
    ];

    // Run performance tests
    const performanceTests = [
      await PerformanceTesting.testAnimationPerformance(),
      PerformanceTesting.testMemoryUsage(),
      PerformanceTesting.testDeviceCapabilities(),
    ];

    // Run browser-specific tests
    const browserSpecificTests = [
      ...BrowserSpecificTesting.testSafariCompatibility(),
      ...BrowserSpecificTesting.testFirefoxCompatibility(),
      ...BrowserSpecificTesting.testChromeCompatibility(),
      ...BrowserSpecificTesting.testEdgeCompatibility(),
    ];

    const allResults = [
      ...coreTests,
      ...performanceTests,
      ...browserSpecificTests,
    ];

    // Calculate overall score
    const supportedCount = allResults.filter((r) => r.supported).length;
    const overallScore = Math.round((supportedCount / allResults.length) * 100);

    // Generate recommendations
    const recommendations =
      CertificationCompatibilityTester.generateRecommendations(allResults);

    return {
      browser: `${browserName} ${version}`,
      version,
      results: allResults,
      overallScore,
      recommendations,
    };
  },

  // Generate recommendations based on test results
  generateRecommendations: (results: CompatibilityTestResult[]): string[] => {
    const recommendations: string[] = [];

    const unsupportedFeatures = results.filter((r) => !r.supported);
    const poorPerformance = results.filter((r) => r.performance === "poor");

    if (unsupportedFeatures.length > 0) {
      recommendations.push(
        `Consider enabling fallbacks for: ${unsupportedFeatures
          .map((r) => r.feature)
          .join(", ")}`
      );
    }

    if (poorPerformance.length > 0) {
      recommendations.push(
        `Performance optimizations needed for: ${poorPerformance
          .map((r) => r.feature)
          .join(", ")}`
      );
    }

    const backdropFilterResult = results.find(
      (r) => r.feature === "backdrop-filter"
    );
    if (backdropFilterResult && !backdropFilterResult.supported) {
      recommendations.push(
        "Use solid background colors instead of backdrop blur effects"
      );
    }

    const gridResult = results.find((r) => r.feature === "css-grid");
    if (gridResult && !gridResult.supported) {
      recommendations.push("Flexbox fallback will be used for layout");
    }

    const animationResult = results.find(
      (r) => r.feature === "animation-performance"
    );
    if (animationResult && animationResult.performance === "poor") {
      recommendations.push(
        "Consider reducing animation complexity or disabling animations"
      );
    }

    return recommendations;
  },

  // Quick compatibility check
  quickCompatibilityCheck: (): { compatible: boolean; issues: string[] } => {
    const issues: string[] = [];

    // Check critical features
    if (!CSS.supports("display", "flex")) {
      issues.push("Flexbox not supported - layout may be broken");
    }

    if (!("requestAnimationFrame" in window)) {
      issues.push("Animations may be choppy");
    }

    if (!("IntersectionObserver" in window)) {
      issues.push("Scroll animations may not work properly");
    }

    const isIE = /MSIE|Trident/.test(navigator.userAgent);
    if (isIE) {
      issues.push("Internet Explorer is not fully supported");
    }

    return {
      compatible: issues.length === 0,
      issues,
    };
  },

  // Log test results to console
  logTestResults: (testSuite: BrowserTestSuite): void => {
    console.group(
      `🧪 Certification Compatibility Test Results - ${testSuite.browser}`
    );
    console.log(`Overall Score: ${testSuite.overallScore}%`);

    console.group("Feature Support:");
    testSuite.results.forEach((result) => {
      const icon = result.supported ? "✅" : "❌";
      const perfIcon =
        result.performance === "good"
          ? "🟢"
          : result.performance === "fair"
          ? "🟡"
          : "🔴";
      console.log(
        `${icon} ${perfIcon} ${result.feature}: ${result.notes || "No notes"}`
      );
    });
    console.groupEnd();

    if (testSuite.recommendations.length > 0) {
      console.group("Recommendations:");
      testSuite.recommendations.forEach((rec) => console.log(`💡 ${rec}`));
      console.groupEnd();
    }

    console.groupEnd();
  },
};

// React hook for compatibility testing
export const useCertificationCompatibilityTesting = () => {
  const [testResults, setTestResults] = React.useState<BrowserTestSuite | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const runTests = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const results = await CertificationCompatibilityTester.runFullTestSuite();
      setTestResults(results);

      if (process.env.NODE_ENV === "development") {
        CertificationCompatibilityTester.logTestResults(results);
      }
    } catch (error) {
      console.error("Failed to run compatibility tests:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const quickCheck = React.useMemo(
    () => CertificationCompatibilityTester.quickCompatibilityCheck(),
    []
  );

  React.useEffect(() => {
    // Run tests on mount in development
    if (process.env.NODE_ENV === "development") {
      runTests();
    }
  }, [runTests]);

  return {
    testResults,
    isLoading,
    runTests,
    quickCheck,
  };
};

export default {
  FeatureTesting,
  PerformanceTesting,
  BrowserSpecificTesting,
  CertificationCompatibilityTester,
  useCertificationCompatibilityTesting,
};
