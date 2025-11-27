"use client";

import { motion } from "framer-motion";

import { Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

interface CTAAction {
  label: string;
  onClick: () => void;
}

interface CTAButtonsProps {
  primaryAction: CTAAction;
  secondaryAction: CTAAction;
  className?: string;
}

export function CTAButtons({
  primaryAction,
  secondaryAction,
  className,
}: CTAButtonsProps) {
  const {
    shouldReduceAnimations,
    isMobile,
    isSmallMobile,
    touchDevice,
    getTouchTargetSize,
  } = useMobileOptimizedAnimation();

  const touchTargetSize = getTouchTargetSize();

  const animationProps = shouldReduceAnimations
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.8 },
      };

  const buttonHoverProps =
    shouldReduceAnimations || touchDevice
      ? {}
      : { whileHover: { y: -2 }, whileTap: { scale: 0.98 } };

  return (
    <motion.div
      {...animationProps}
      className={cn(
        "flex gap-4 justify-center lg:justify-start",
        isMobile ? "flex-col w-full" : "flex-col sm:flex-row",
        className
      )}
    >
      {/* Primary CTA Button - Enhanced for mobile */}
      <motion.div {...buttonHoverProps}>
        <button
          onClick={primaryAction.onClick}
          className={cn(
            "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-300 group",
            // Enhanced focus styles for accessibility
            "focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900",
            // Mobile-specific optimizations
            isMobile
              ? [
                  "w-full px-6 py-4 text-base",
                  `min-h-[${touchTargetSize}px]`,
                  "active:scale-95 active:bg-blue-700",
                  "touch-feedback-primary",
                ]
              : ["px-8 py-4 min-h-[44px]"],
            // Small mobile specific adjustments
            isSmallMobile && [
              "px-4 py-3 text-sm",
              "min-h-[48px]", // Slightly larger for easier tapping
            ]
          )}
          aria-label={`${primaryAction.label} - Navigate to projects section`}
          role="button"
          type="button"
        >
          {primaryAction.label}
          <ArrowRight
            className={cn(
              "ml-2 transition-transform duration-200",
              isMobile ? "w-4 h-4" : "w-5 h-5",
              !touchDevice && "group-hover:translate-x-1"
            )}
            aria-hidden="true"
          />
        </button>
      </motion.div>

      {/* Secondary CTA Button - Enhanced for mobile */}
      <motion.div {...buttonHoverProps}>
        <button
          onClick={secondaryAction.onClick}
          className={cn(
            "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 group",
            // Enhanced focus styles for accessibility
            "focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-900",
            // Mobile-specific optimizations
            isMobile
              ? [
                  "w-full px-6 py-4 text-base",
                  `min-h-[${touchTargetSize}px]`,
                  "active:scale-95 active:bg-white/30 active:border-white/50",
                  "touch-feedback",
                ]
              : ["px-8 py-4 min-h-[44px]"],
            // Small mobile specific adjustments
            isSmallMobile && ["px-4 py-3 text-sm", "min-h-[48px]"]
          )}
          aria-label={`${secondaryAction.label} - Open email client or contact form`}
          role="button"
          type="button"
        >
          <Mail
            className={cn(
              "mr-2 transition-transform duration-200",
              isMobile ? "w-4 h-4" : "w-5 h-5",
              !touchDevice && "group-hover:scale-110"
            )}
            aria-hidden="true"
          />
          {secondaryAction.label}
        </button>
      </motion.div>
    </motion.div>
  );
}
