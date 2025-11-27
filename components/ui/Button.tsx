"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled = false,
  type = "button",
  href,
  target = "_self",
}: ButtonProps) {
  const { isMobile, touchDevice, shouldReduceAnimations } =
    useMobileOptimizedAnimation();

  const baseClasses = cn(
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    // Enhanced accessibility
    "focus-visible:ring-4 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:select-none",
    // Mobile-specific enhancements
    "mobile-tap-highlight",
    touchDevice && "touch-target",
    isMobile && "active:scale-95"
  );

  const variants = {
    primary: cn(
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl",
      // Mobile-specific styles
      isMobile && "active:bg-blue-800 shadow-responsive"
    ),
    secondary: cn(
      "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 shadow-lg hover:shadow-xl",
      isMobile && "active:bg-gray-800 shadow-responsive"
    ),
    outline: cn(
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500",
      isMobile && "active:bg-blue-700 active:border-blue-700"
    ),
    ghost: cn(
      "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
      isMobile && "active:bg-gray-200"
    ),
  };

  const sizes = {
    sm: cn(
      "px-3 py-1.5 text-sm",
      isMobile && "px-4 py-2 text-base min-h-[40px]",
      touchDevice && "min-w-[88px]" // Double the minimum touch target
    ),
    md: cn(
      "px-4 py-2 text-base",
      isMobile && "px-5 py-3 text-base min-h-[44px]",
      touchDevice && "min-w-[100px]"
    ),
    lg: cn(
      "px-6 py-3 text-lg",
      isMobile && "px-8 py-4 text-lg min-h-[48px]",
      touchDevice && "min-w-[120px]"
    ),
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  // Animation variants based on device capabilities
  const animationProps = shouldReduceAnimations
    ? {}
    : {
        whileHover: disabled ? {} : { scale: touchDevice ? 1 : 1.02 },
        whileTap: disabled ? {} : { scale: 0.98 },
        transition: { type: "spring" as const, stiffness: 400, damping: 17 },
      };

  const MotionComponent = motion.button;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        className={classes}
        {...animationProps}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.open(href, target);
          }
        }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <MotionComponent
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...animationProps}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </MotionComponent>
  );
}
