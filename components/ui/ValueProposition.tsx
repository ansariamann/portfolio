"use client";

import { motion } from "framer-motion";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

interface ValuePropositionProps {
  headline: string;
  subheadline: string;
  description: string;
  className?: string;
}

export function ValueProposition({
  headline,
  subheadline,
  description,
  className = "",
}: ValuePropositionProps) {
  const {
    shouldReduceAnimations,
    isMobile,
    isSmallMobile,
    getResponsiveFontSize,
  } = useMobileOptimizedAnimation();

  const animationProps = shouldReduceAnimations
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.2 },
      };

  // Calculate responsive font sizes ensuring minimum readability
  const headlineSizes = getResponsiveFontSize(48); // Base 48px
  const subheadlineSizes = getResponsiveFontSize(24); // Base 24px
  const descriptionSizes = getResponsiveFontSize(16); // Base 16px

  return (
    <motion.header className={`${className}`} {...animationProps}>
      {/* Main headline with semantic H1 - Mobile-optimized sizing */}
      <h1
        className={`
          font-bold text-white tracking-tight leading-tight
          ${
            isSmallMobile
              ? "text-2xl mb-3"
              : isMobile
              ? "text-3xl mb-4"
              : "text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4"
          }
        `}
        style={{
          // Ensure minimum font size for mobile readability
          fontSize: isMobile
            ? `${Math.max(headlineSizes.mobile, 24)}px`
            : undefined,
        }}
        role="heading"
        aria-level={1}
      >
        <span
          className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
          aria-label={headline}
        >
          {headline}
        </span>
      </h1>

      {/* Value proposition with semantic H2 - Mobile-optimized */}
      <h2
        className={`
          font-semibold text-gray-300 leading-tight
          ${
            isSmallMobile
              ? "text-lg mb-4"
              : isMobile
              ? "text-xl mb-5"
              : "text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6"
          }
        `}
        style={{
          // Ensure minimum font size for mobile readability
          fontSize: isMobile
            ? `${Math.max(subheadlineSizes.mobile, 18)}px`
            : undefined,
        }}
        role="heading"
        aria-level={2}
      >
        {subheadline}
      </h2>

      {/* Description - Mobile-optimized with better line height */}
      <p
        className={`
          text-gray-300 max-w-2xl
          ${
            isSmallMobile
              ? "text-sm leading-relaxed"
              : isMobile
              ? "text-base leading-relaxed"
              : "text-base md:text-lg lg:text-xl leading-relaxed"
          }
        `}
        style={{
          // Ensure minimum font size and optimal line height for mobile
          fontSize: isMobile
            ? `${Math.max(descriptionSizes.mobile, 16)}px`
            : undefined,
          lineHeight: isMobile ? "1.6" : undefined,
          // Prevent text from being too wide on mobile
          maxWidth: isMobile ? "100%" : undefined,
        }}
      >
        {description}
      </p>
    </motion.header>
  );
}
