"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAnimationPerformance from "@/lib/hooks/useAnimationPerformance";
import { PERFORMANCE_CONFIG } from "@/lib/certification-animation-config";

interface CinematicLoaderProps {
  isVisible: boolean;
  onComplete: () => void;
  theme?: "light" | "dark";
  duration?: number;
}

interface SpeedLine {
  id: number;
  angle: number;
  length: number;
  delay: number;
  opacity: number;
}

const CinematicLoader: React.FC<CinematicLoaderProps> = ({
  isVisible,
  onComplete,
  theme = "dark",
  duration = 800,
}) => {
  const [progress, setProgress] = useState(0);
  const [speedLines, setSpeedLines] = useState<SpeedLine[]>([]);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const completionTimeoutRef = useRef<NodeJS.Timeout>();

  const {
    requestAnimationFrame,
    cancelAnimationFrame,
    gpuAcceleration,
    getAdaptiveAnimationConfig,
    memoryCleanup,
  } = useAnimationPerformance();

  // Get adaptive configuration
  const adaptiveConfig = getAdaptiveAnimationConfig();

  // Generate speed lines with performance optimization
  useEffect(() => {
    const lines: SpeedLine[] = [];
    const lineCount = adaptiveConfig.quality === "low" ? 10 : 20;

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        id: i,
        angle: (360 / lineCount) * i,
        length: Math.random() * 100 + 50, // Random length between 50-150
        delay: Math.random() * 0.3, // Random delay up to 300ms
        opacity: Math.random() * 0.8 + 0.2, // Random opacity 0.2-1.0
      });
    }

    setSpeedLines(lines);
  }, [adaptiveConfig.quality]);

  // Optimized progress animation using requestAnimationFrame
  const updateProgress = useCallback(
    (timestamp: number) => {
      setProgress((prev) => {
        const newProgress = prev + (adaptiveConfig.quality === "low" ? 4 : 2);

        if (newProgress >= 100) {
          completionTimeoutRef.current = setTimeout(onComplete, 200);
          return 100;
        }

        // Continue animation if not complete
        requestAnimationFrame("cinematic-progress", updateProgress);
        return newProgress;
      });
    },
    [onComplete, adaptiveConfig.quality, requestAnimationFrame]
  );

  // Progress animation with performance optimization
  useEffect(() => {
    if (!isVisible) return;

    // Reset progress and start animation
    setProgress(0);
    requestAnimationFrame("cinematic-progress", updateProgress);

    return () => {
      cancelAnimationFrame("cinematic-progress");
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
      }
    };
  }, [isVisible, updateProgress, requestAnimationFrame, cancelAnimationFrame]);

  const themeClasses = {
    light: {
      bg: "bg-white/95",
      text: "text-gray-900",
      line: "bg-gray-900",
      progress: "bg-blue-600",
      progressBg: "bg-gray-200",
    },
    dark: {
      bg: "bg-gray-900/95",
      text: "text-white",
      line: "bg-white",
      progress: "bg-blue-400",
      progressBg: "bg-gray-700",
    },
  };

  const currentTheme = themeClasses[theme];

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame("cinematic-progress");
      memoryCleanup.cleanupTimers(
        [progressIntervalRef.current, completionTimeoutRef.current].filter(
          Boolean
        ) as NodeJS.Timeout[]
      );
    };
  }, [cancelAnimationFrame, memoryCleanup]);

  // Apply GPU acceleration based on performance
  const containerStyles = adaptiveConfig.enableGPU
    ? gpuAcceleration.getGPUStyles()
    : gpuAcceleration.removeGPUStyles();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{
            duration: 0.3 * adaptiveConfig.animationDuration,
          }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${currentTheme.bg} backdrop-blur-sm`}
          style={{
            backdropFilter:
              adaptiveConfig.blurIntensity > 0
                ? `blur(${adaptiveConfig.blurIntensity}px)`
                : "none",
            ...containerStyles,
          }}
        >
          {/* Speed Lines Container - Only render if performance allows */}
          {adaptiveConfig.enableComplexAnimations && (
            <div className="absolute inset-0 overflow-hidden">
              {speedLines.map((line) => (
                <motion.div
                  key={line.id}
                  className="absolute top-1/2 left-1/2 origin-left"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${line.angle}deg)`,
                    ...(adaptiveConfig.enableGPU && containerStyles),
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{
                    scaleX: 1,
                    opacity: line.opacity,
                    transition: {
                      delay: line.delay * adaptiveConfig.animationDuration,
                      duration: 0.6 * adaptiveConfig.animationDuration,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    scaleX: 0,
                    opacity: 0,
                    transition: {
                      duration: 0.3 * adaptiveConfig.animationDuration,
                    },
                  }}
                >
                  <div
                    className={`h-0.5 ${currentTheme.line} origin-left`}
                    style={{
                      width: `${line.length}px`,
                      opacity: line.opacity,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Central Loading Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="relative z-10 text-center"
          >
            {/* Loading Text */}

            {/* Progress Bar Container */}
            <div className="w-64 mx-auto">
              <div
                className={`h-2 ${currentTheme.progressBg} rounded-full overflow-hidden`}
              >
                <motion.div
                  className={`h-full ${currentTheme.progress} rounded-full`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    duration: 0.1,
                    ease: "easeOut",
                  }}
                />
              </div>

              {/* Progress Percentage */}
              <motion.p
                className={`text-sm ${currentTheme.text} mt-2 opacity-70`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>

            {/* Pulsing Dot Indicator */}
            <motion.div
              className="flex justify-center mt-6 space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 ${currentTheme.progress} rounded-full`}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Blur Overlay for Depth */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: `radial-gradient(circle at center, transparent 30%, ${
                theme === "dark" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"
              } 70%)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
