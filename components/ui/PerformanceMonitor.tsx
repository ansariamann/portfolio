"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Zap, Clock, Eye } from "lucide-react";
import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from "web-vitals";

interface WebVitals {
  CLS: number;
  INP: number;
  FCP: number;
  LCP: number;
  TTFB: number;
}

interface PerformanceData {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  memoryUsage?: {
    used: number;
    total: number;
  };
}

export default function PerformanceMonitor() {
  const [webVitals, setWebVitals] = useState<Partial<WebVitals>>({});
  const [performanceData, setPerformanceData] =
    useState<PerformanceData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    // Ensure performance monitor starts hidden on website load
    // Clear any previous session state and start fresh
    if (!localStorage.getItem("show-performance-monitor")) {
      localStorage.setItem("show-performance-monitor", "false");
    }

    const shouldShow =
      localStorage.getItem("show-performance-monitor") === "true";
    setIsVisible(shouldShow);

    // Always collect performance data (even when hidden) so it's ready when shown

    // Collect Web Vitals
    onCLS((metric: Metric) => {
      setWebVitals((prev) => ({ ...prev, CLS: metric.value }));
    });

    onINP((metric: Metric) => {
      setWebVitals((prev) => ({ ...prev, INP: metric.value }));
    });

    onFCP((metric: Metric) => {
      setWebVitals((prev) => ({ ...prev, FCP: metric.value }));
    });

    onLCP((metric: Metric) => {
      setWebVitals((prev) => ({ ...prev, LCP: metric.value }));
    });

    onTTFB((metric: Metric) => {
      setWebVitals((prev) => ({ ...prev, TTFB: metric.value }));
    });

    // Collect Navigation Timing data
    if (typeof window !== "undefined" && window.performance) {
      const navigation = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        setPerformanceData({
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
          firstPaint: 0,
          firstContentfulPaint: 0,
          largestContentfulPaint: 0,
        });
      }

      // Get paint timing
      const paintEntries = performance.getEntriesByType("paint");
      const fpEntry = paintEntries.find(
        (entry) => entry.name === "first-paint"
      );
      const fcpEntry = paintEntries.find(
        (entry) => entry.name === "first-contentful-paint"
      );

      if (fpEntry || fcpEntry) {
        setPerformanceData((prev) =>
          prev
            ? {
                ...prev,
                firstPaint: fpEntry?.startTime || 0,
                firstContentfulPaint: fcpEntry?.startTime || 0,
              }
            : null
        );
      }

      // Get memory usage (Chrome only)
      if ("memory" in performance) {
        const memInfo = (
          performance as Performance & {
            memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
          }
        ).memory;
        if (memInfo) {
          setPerformanceData((prev) =>
            prev
              ? {
                  ...prev,
                  memoryUsage: {
                    used: Math.round(memInfo.usedJSHeapSize / 1048576), // MB
                    total: Math.round(memInfo.totalJSHeapSize / 1048576), // MB
                  },
                }
              : null
          );
        }
      }
    }

    // Get connection info
    if ("connection" in navigator) {
      const conn =
        (
          navigator as Navigator & {
            connection?: {
              effectiveType?: string;
              type?: string;
            };
            mozConnection?: {
              effectiveType?: string;
              type?: string;
            };
            webkitConnection?: {
              effectiveType?: string;
              type?: string;
            };
          }
        ).connection ||
        (
          navigator as Navigator & {
            mozConnection?: {
              effectiveType?: string;
              type?: string;
            };
          }
        ).mozConnection ||
        (
          navigator as Navigator & {
            webkitConnection?: {
              effectiveType?: string;
              type?: string;
            };
          }
        ).webkitConnection;

      if (conn) {
        setConnectionType(conn.effectiveType || conn.type || "unknown");
      }
    }

    // Keyboard shortcut to toggle monitor
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        const currentState =
          localStorage.getItem("show-performance-monitor") === "true";
        localStorage.setItem(
          "show-performance-monitor",
          (!currentState).toString()
        );
        setIsVisible(!currentState);
      }
    };

    // Listen for toggle events from the button
    const handleToggleEvent = () => {
      const currentState =
        localStorage.getItem("show-performance-monitor") === "true";
      setIsVisible(currentState);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("performance-monitor-toggle", handleToggleEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener(
        "performance-monitor-toggle",
        handleToggleEvent
      );
    };
  }, []);

  const getScoreColor = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      CLS: { good: 0.1, poor: 0.25 },
      INP: { good: 200, poor: 500 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return "text-gray-400";

    if (value <= threshold.good) return "text-green-400";
    if (value <= threshold.poor) return "text-yellow-400";
    return "text-red-400";
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed bottom-20 right-4 z-50 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg border border-gray-700 max-w-sm text-xs font-mono"
      >
        <div className="flex items-center gap-2 mb-3">
          <Activity size={16} className="text-blue-400" />
          <span className="font-semibold">Performance Monitor</span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto text-gray-400 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Web Vitals */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-gray-300">Web Vitals</span>
          </div>

          {Object.entries(webVitals).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-gray-400">{key}:</span>
              <span className={getScoreColor(key, value)}>
                {key === "CLS" ? value.toFixed(3) : Math.round(value)}
                {key !== "CLS" && "ms"}
              </span>
            </div>
          ))}
        </div>

        {/* Performance Data */}
        {performanceData && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-green-400" />
              <span className="text-gray-300">Timing</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">Load:</span>
              <span className="text-blue-400">
                {Math.round(performanceData.loadTime)}ms
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400">DOMReady:</span>
              <span className="text-blue-400">
                {Math.round(performanceData.domContentLoaded)}ms
              </span>
            </div>

            {performanceData.memoryUsage && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Memory:</span>
                <span className="text-purple-400">
                  {performanceData.memoryUsage.used}/
                  {performanceData.memoryUsage.total}MB
                </span>
              </div>
            )}
          </div>
        )}

        {/* Connection Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye size={12} className="text-cyan-400" />
            <span className="text-gray-300">Connection</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Type:</span>
            <span className="text-cyan-400 capitalize">{connectionType}</span>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-500">
          Press Ctrl+Shift+P to toggle
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
