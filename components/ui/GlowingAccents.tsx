"use client";

import React from "react";
import { motion } from "framer-motion";

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
  const colors = CATEGORY_COLORS[category];
  const baseIntensity = isHovered ? intensity : intensity * 0.3;

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Primary glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: baseIntensity,
        }}
        transition={{
          duration: isHovered ? 0.3 : 0.6,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${colors.primary}40, ${colors.primary}20, transparent 70%)`,
            width: `${size}%`,
            height: `${size}%`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: isHovered ? 2 : 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Secondary glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          filter: "blur(4px)",
        }}
        animate={{
          opacity: baseIntensity * 0.7,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${colors.secondary}30, ${colors.secondary}15, transparent 60%)`,
            width: `${size * 0.8}%`,
            height: `${size * 0.8}%`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: isHovered ? [1, 1.15, 1] : [1, 1.03, 1],
          }}
          transition={{
            duration: isHovered ? 3 : 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Accent glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          filter: "blur(2px)",
        }}
        animate={{
          opacity: baseIntensity * 0.5,
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${colors.accent}25, ${colors.accent}10, transparent 50%)`,
            width: `${size * 0.6}%`,
            height: `${size * 0.6}%`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: isHovered ? [1, 1.1, 1] : [1, 1.02, 1],
          }}
          transition={{
            duration: isHovered ? 2.5 : 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default GlowingAccents;
