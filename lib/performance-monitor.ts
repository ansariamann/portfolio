/**
 * Performance monitoring and Core Web Vitals tracking
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from "web-vitals";

export interface PerformanceMetrics {
  cls: number;
  fid: number;
  fcp: number;
  lcp: number;
  ttfb: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initializeWebVitals();
    this.initializeCustomMetrics();
  }

  private initializeWebVitals() {
    if (typeof window === "undefined") return;

    try {
      const handleMetric = (metric: Metric) => {
        this.metrics[metric.name.toLowerCase() as keyof PerformanceMetrics] =
          metric.value;
        this.reportMetric(metric);
      };

      onCLS(handleMetric);
      onINP(handleMetric);
      onFCP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);
    } catch (error) {
      console.warn("Web Vitals initialization failed:", error);
    }
  }

  private initializeCustomMetrics() {
    if (typeof window === "undefined" || !("PerformanceObserver" in window))
      return;

    // Monitor long tasks
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`, entry);
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ["longtask"] });
      this.observers.push(longTaskObserver);
    } catch (e) {
      console.warn("Long task observer not supported");
    }

    // Monitor layout shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry: any) => {
          if (entry.hadRecentInput) return;
          console.log("Layout shift detected:", entry.value);
        });
      });
      layoutShiftObserver.observe({ entryTypes: ["layout-shift"] });
      this.observers.push(layoutShiftObserver);
    } catch (e) {
      console.warn("Layout shift observer not supported");
    }

    // Monitor resource loading
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 1000) {
            console.warn(
              `Slow resource loading: ${entry.name} took ${entry.duration}ms`
            );
          }
        });
      });
      resourceObserver.observe({ entryTypes: ["resource"] });
      this.observers.push(resourceObserver);
    } catch (e) {
      console.warn("Resource observer not supported");
    }
  }

  private reportMetric(metric: Metric) {
    // In production, send to analytics service
    if (process.env.NODE_ENV === "development") {
      console.log(`Performance metric - ${metric.name}:`, metric.value);
    }

    // Example: Send to Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value
        ),
        non_interaction: true,
      });
    }
  }

  public measureComponentRender(componentName: string, renderFn: () => void) {
    const startTime = performance.now();
    renderFn();
    const endTime = performance.now();
    const duration = endTime - startTime;

    if (duration > 16) {
      // More than one frame at 60fps
      console.warn(
        `Slow component render: ${componentName} took ${duration.toFixed(2)}ms`
      );
    }

    return duration;
  }

  public measureAsyncOperation<T>(
    operationName: string,
    operation: () => Promise<T>
  ): Promise<T> {
    const startTime = performance.now();

    return operation().then((result) => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`${operationName} completed in ${duration.toFixed(2)}ms`);
      return result;
    });
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics, timestamp: Date.now() };
  }

  public cleanup() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export const getPerformanceMonitor = (): PerformanceMonitor => {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
};

// Hook for React components
export const usePerformanceMonitor = () => {
  const monitor = getPerformanceMonitor();

  return {
    measureRender: monitor.measureComponentRender.bind(monitor),
    measureAsync: monitor.measureAsyncOperation.bind(monitor),
    getMetrics: monitor.getMetrics.bind(monitor),
  };
};

// Performance budget checker
export const checkPerformanceBudget = (
  metrics: Partial<PerformanceMetrics>
) => {
  const budgets = {
    lcp: 2500, // 2.5s
    fid: 100, // 100ms
    cls: 0.1, // 0.1
    fcp: 1800, // 1.8s
    ttfb: 800, // 800ms
  };

  const violations: string[] = [];

  Object.entries(budgets).forEach(([metric, budget]) => {
    const value = metrics[metric as keyof PerformanceMetrics];
    if (value && value > budget) {
      violations.push(
        `${metric.toUpperCase()}: ${value} exceeds budget of ${budget}`
      );
    }
  });

  return {
    passed: violations.length === 0,
    violations,
  };
};
