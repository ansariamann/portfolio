"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

interface MobileOptimizedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: "light" | "dark" | "gradient" | "transparent";
  padding?: "none" | "sm" | "md" | "lg";
  fullHeight?: boolean;
  centerContent?: boolean;
}

export default function MobileOptimizedSection({
  children,
  id,
  className,
  background = "transparent",
  padding = "md",
  fullHeight = false,
  centerContent = false,
}: MobileOptimizedSectionProps) {
  const {
    isMobile,
    isTablet,
    shouldReduceAnimations,
    getResponsiveSpacing,
    getAnimationDuration,
  } = useMobileOptimizedAnimation();

  const backgroundClasses = {
    light: "bg-white dark:bg-gray-100",
    dark: "bg-gray-900 dark:bg-gray-800",
    gradient:
      "bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900",
    transparent: "bg-transparent",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16 lg:py-20",
    lg: "py-16 sm:py-20 lg:py-24",
  };

  const spacing = getResponsiveSpacing(16);

  return (
    <motion.section
      id={id}
      className={cn(
        "relative w-full",
        backgroundClasses[background],
        paddingClasses[padding],
        fullHeight && "min-h-screen-mobile",
        centerContent && "flex items-center justify-center",
        // Mobile-specific optimizations
        isMobile && "overflow-x-hidden",
        className
      )}
      initial={shouldReduceAnimations ? {} : { opacity: 0 }}
      whileInView={shouldReduceAnimations ? {} : { opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: getAnimationDuration(0.6),
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div
        className={cn(
          "container-responsive",
          centerContent &&
            "flex flex-col items-center justify-center min-h-full"
        )}
        style={{
          paddingTop: isMobile
            ? spacing.mobile
            : isTablet
            ? spacing.tablet
            : spacing.desktop,
          paddingBottom: isMobile
            ? spacing.mobile
            : isTablet
            ? spacing.tablet
            : spacing.desktop,
        }}
      >
        {children}
      </div>
    </motion.section>
  );
}
