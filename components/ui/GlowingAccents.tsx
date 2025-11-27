"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useAnimationPerformance from "@/lib/hooks/useAnimationPerformance";

interface GlowingAccentsProps {
  isHovered: boolean;
  category: "technical" | "professional" | "academic" | "cloud";
  size?: number;
  className?: string;
  intensity?: number;
}

const CATEGORY_COLORS = {
  technical: {
    primary: "#3B82F6", // blue-500
    secondary: "#1D4ED8", // blue-700
    accent: "#60A5FA", // blue-400
  },
  professional: {
    primary: "#10B981", // emerald-500
    secondary: "#047857", // emerald-700
    accent: "#34D399", // emerald-400
  },
  academic: {
    primary: "#8B5CF6", // violet-500
    secondary: "#6D28D9", // violet-700
    accent: "#A78BFA", // violet-400
  },
  cloud: {
    primary: "#F59E0B", // amber-500
    secondary: "#D97706", // amber-600
    accent: "#FBBF24", // amber-400
  },
};

export const GlowingAccents: React.FC<GlowingAccentsProps> = ({
  isHovered,
  category,
  size = 80,
  className = "",
  intensity = 0.6,
}) => {
  const {
    cancelAnimationFrame,
    gpuAcceleration,
    getAdaptiveAnimationConfig,
    memoryCleanup,
  } = useAnimationPerformance();

  const colors = CATEGORY_COLORS[category];
  const adaptiveConfig = getAdaptiveAnimationConfig();
  const baseIntensity = isHovered ? intensity : intensity * 0.3;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(`glowing-accents-${category}`);
    };
  }, [category, cancelAnimationFrame]);

  // Apply GPU acceleration based on performance
  const containerStyles = adaptiveConfig.enableGPU
    ? gpuAcceleration.getGPUStyles()
    : gpuAcceleration.removeGPUStyles();

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        ...containerStyles,
      }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 60%, ${colors.primary}20 70%, transparent 100%)`,
          filter: adaptiveConfig.blurIntensity > 0 ? `blur(8px)` : "none",
          ...containerStyles,
        }}
        animate={
          adaptiveConfig.enableComplexAnimations
            ? {
                scale: isHovered ? [1, 1.3, 1.1] : [1, 1.05, 1],
                opacity: isHovered
                  ? [baseIntensity, baseIntensity * 1.5, baseIntensity * 1.2]
                  : [
                      baseIntensity * 0.5,
                      baseIntensity * 0.7,
                      baseIntensity * 0.5,
                    ],
              }
            : {}
        }
        transition={
          adaptiveConfig.enableComplexAnimations
            ? {
                duration:
                  (isHovered ? 2 : 4) * adaptiveConfig.animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />

      {/* Middle glow ring */}
      <motion.div
        className="absolute inset-2 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 50%, ${colors.secondary}30 65%, transparent 100%)`,
          filter: adaptiveConfig.blurIntensity > 0 ? `blur(4px)` : "none",
          ...containerStyles,
        }}
        animate={
          adaptiveConfig.enableComplexAnimations
            ? {
                scale: isHovered ? [1, 1.2, 1.05] : [1, 1.03, 1],
                opacity: isHovered
                  ? [baseIntensity * 0.8, baseIntensity * 1.3, baseIntensity]
                  : [
                      baseIntensity * 0.4,
                      baseIntensity * 0.6,
                      baseIntensity * 0.4,
                    ],
                rotate: [0, 180, 360],
              }
            : {}
        }
        transition={
          adaptiveConfig.enableComplexAnimations
            ? {
                duration:
                  (isHovered ? 3 : 6) * adaptiveConfig.animationDuration,
                repeat: Infinity,
                ease: "linear",
              }
            : {}
        }
      />

      {/* Inner accent ring */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{
          background: `radial-gradient(circle, transparent 40%, ${colors.accent}40 55%, transparent 100%)`,
          filter: adaptiveConfig.blurIntensity > 0 ? `blur(2px)` : "none",
          ...containerStyles,
        }}
        animate={
          adaptiveConfig.enableComplexAnimations
            ? {
                scale: isHovered ? [1, 1.15, 1.02] : [1, 1.02, 1],
                opacity: isHovered
                  ? [
                      baseIntensity * 0.6,
                      baseIntensity * 1.1,
                      baseIntensity * 0.8,
                    ]
                  : [
                      baseIntensity * 0.3,
                      baseIntensity * 0.5,
                      baseIntensity * 0.3,
                    ],
                rotate: [0, -120, -240, -360],
              }
            : {}
        }
        transition={
          adaptiveConfig.enableComplexAnimations
            ? {
                duration:
                  (isHovered ? 2.5 : 5) * adaptiveConfig.animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />

      {/* Pulsing core */}
      <motion.div
        className="absolute inset-6 rounded-full"
        style={{
          background: `radial-gradient(circle, ${colors.primary}50 0%, ${colors.secondary}30 30%, transparent 70%)`,
          filter: adaptiveConfig.blurIntensity > 0 ? `blur(1px)` : "none",
          ...containerStyles,
        }}
        animate={
          adaptiveConfig.enableComplexAnimations
            ? {
                scale: isHovered ? [1, 1.4, 1.1] : [1, 1.1, 1],
                opacity: isHovered
                  ? [
                      baseIntensity * 0.4,
                      baseIntensity * 0.9,
                      baseIntensity * 0.6,
                    ]
                  : [
                      baseIntensity * 0.2,
                      baseIntensity * 0.4,
                      baseIntensity * 0.2,
                    ],
              }
            : {}
        }
        transition={
          adaptiveConfig.enableComplexAnimations
            ? {
                duration:
                  (isHovered ? 1.5 : 3) * adaptiveConfig.animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />

      {/* Sparkle effects on hover - Only render if performance allows */}
      {isHovered && adaptiveConfig.enableComplexAnimations && (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={`sparkle-${index}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: colors.accent,
                filter:
                  adaptiveConfig.blurIntensity > 0 ? `blur(0.5px)` : "none",
                left: `${20 + Math.cos((index * 60 * Math.PI) / 180) * 25}%`,
                top: `${20 + Math.sin((index * 60 * Math.PI) / 180) * 25}%`,
                ...containerStyles,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180],
              }}
              transition={{
                duration: 1 * adaptiveConfig.animationDuration,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}

      {/* Border highlight */}
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: colors.primary,
          borderWidth: "1px",
          opacity: 0,
          ...containerStyles,
        }}
        animate={
          adaptiveConfig.enableComplexAnimations
            ? {
                opacity: isHovered ? [0, 0.6, 0.3] : [0, 0.2, 0],
                scale: isHovered ? [1, 1.05, 1.02] : [1, 1.01, 1],
              }
            : {}
        }
        transition={
          adaptiveConfig.enableComplexAnimations
            ? {
                duration:
                  (isHovered ? 2 : 4) * adaptiveConfig.animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
      />
    </div>
  );
};

export default GlowingAccents;
