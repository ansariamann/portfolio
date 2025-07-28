"use client";

import { motion } from "framer-motion";
import {
  useScrollProgress,
  useReducedMotion,
} from "@/lib/hooks/useScrollAnimations";

interface ScrollProgressIndicatorProps {
  className?: string;
  showPercentage?: boolean;
  position?: "top" | "bottom" | "left" | "right";
  thickness?: number;
  color?: string;
}

export default function ScrollProgressIndicator({
  className = "",
  showPercentage = false,
  position = "top",
  thickness = 4,
  color = "#3B82F6",
}: ScrollProgressIndicatorProps) {
  const scrollProgress = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();

  const getPositionStyles = () => {
    const baseStyles = {
      position: "fixed" as const,
      zIndex: 1000,
      backgroundColor: color,
    };

    switch (position) {
      case "top":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          right: 0,
          height: thickness,
        };
      case "bottom":
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          right: 0,
          height: thickness,
        };
      case "left":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          bottom: 0,
          width: thickness,
        };
      case "right":
        return {
          ...baseStyles,
          top: 0,
          right: 0,
          bottom: 0,
          width: thickness,
        };
      default:
        return baseStyles;
    }
  };

  const getTransformOrigin = () => {
    switch (position) {
      case "top":
      case "bottom":
        return "left";
      case "left":
      case "right":
        return "top";
      default:
        return "left";
    }
  };

  const getScaleProperty = () => {
    switch (position) {
      case "top":
      case "bottom":
        return { scaleX: scrollProgress };
      case "left":
      case "right":
        return { scaleY: scrollProgress };
      default:
        return { scaleX: scrollProgress };
    }
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className={className}
        style={{
          ...getPositionStyles(),
          transformOrigin: getTransformOrigin(),
          ...getScaleProperty(),
        }}
        initial={{ scale: 0 }}
        animate={prefersReducedMotion ? {} : getScaleProperty()}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 400, damping: 40 }
        }
      />

      {/* Optional percentage indicator */}
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: scrollProgress > 0.05 ? 1 : 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {Math.round(scrollProgress * 100)}%
        </motion.div>
      )}
    </>
  );
}
