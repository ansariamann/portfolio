"use client";

import React from "react";
import { motion, type Easing } from "framer-motion";
import StaggeredTextWave from "./StaggeredTextWave";

interface AnimationConfig {
  staggerDelay?: number;
  duration?: number;
  ease?: Easing;
  enableWave?: boolean;
  waveIntensity?: number;
}

interface AnimatedSectionHeadingProps {
  text: string;
  className?: string;
  animationConfig?: AnimationConfig;
  preset?: keyof typeof headingPresets;
}

// Predefined animation presets
export const headingPresets = {
  default: {
    staggerDelay: 0.1,
    duration: 0.8,
    ease: "easeOut",
    enableWave: true,
    waveIntensity: 0.5,
  },
  fast: {
    staggerDelay: 0.05,
    duration: 0.4,
    ease: "easeOut",
    enableWave: false,
  },
  slow: {
    staggerDelay: 0.15,
    duration: 1.2,
    ease: "easeInOut",
    enableWave: true,
    waveIntensity: 0.8,
  },
  wave: {
    staggerDelay: 0.08,
    duration: 0.6,
    ease: "easeOut",
    enableWave: true,
    waveIntensity: 1.0,
  },
} as const;

const AnimatedSectionHeading: React.FC<AnimatedSectionHeadingProps> = ({
  text,
  className = "",
  animationConfig,
  preset = "default",
}) => {
  const config = animationConfig || headingPresets[preset];

  if (config.enableWave) {
    return (
      <StaggeredTextWave
        text={text}
        className={className}
        staggerDelay={config.staggerDelay}
        duration={config.duration}
        waveIntensity={config.waveIntensity}
      />
    );
  }

  // Fallback to simple motion.h1 if wave is disabled
  return (
    <motion.h1
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: config.duration,
        ease: config.ease,
      }}
    >
      {text}
    </motion.h1>
  );
};

export default AnimatedSectionHeading;
