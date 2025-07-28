"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useScrollAnimations";
import { cn } from "@/lib/utils";

interface MotionWrapperProps extends Omit<MotionProps, "children"> {
  children: React.ReactNode;
  className?: string;
  as?: keyof typeof motion;
  animationType?:
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "rotate";
  delay?: number;
  duration?: number;
  disabled?: boolean;
}

/**
 * A wrapper component that automatically handles reduced motion preferences
 * for Framer Motion animations throughout the application
 */
export function MotionWrapper({
  children,
  className,
  as = "div",
  animationType = "fadeIn",
  delay = 0,
  duration,
  disabled = false,
  ...motionProps
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
    },
  };

  const transition = {
    default: { duration: 0.6 },
  };

  // If animations are disabled or user prefers reduced motion, render static div
  if (disabled || prefersReducedMotion) {
    return (
      <div className={cn(className, "motion-reduce-scroll")}>{children}</div>
    );
  }

  // Suppress unused variable warning for 'as' parameter
  void as;

  // Get the motion component
  // const MotionComponent = motion[as];

  // Get animation variant
  const animationVariant = variants[animationType];

  // Create transition with custom duration and delay
  const customTransition = {
    ...transition.default,
    ...(duration && { duration }),
    delay,
  };

  const Component = motion.div;

  return (
    <Component
      className={className}
      initial={animationVariant.initial}
      animate={animationVariant.animate}
      transition={customTransition}
      {...motionProps}
    >
      {children}
    </Component>
  );
}

/**
 * Pre-configured motion components for common use cases
 */
export const MotionDiv = (props: Omit<MotionWrapperProps, "as">) => (
  <MotionWrapper as="div" {...props} />
);

export const MotionSection = (props: Omit<MotionWrapperProps, "as">) => (
  <MotionWrapper as="section" {...props} />
);

export const MotionArticle = (props: Omit<MotionWrapperProps, "as">) => (
  <MotionWrapper as="article" {...props} />
);

export const MotionHeader = (props: Omit<MotionWrapperProps, "as">) => (
  <MotionWrapper as="header" {...props} />
);

export const MotionFooter = (props: Omit<MotionWrapperProps, "as">) => (
  <MotionWrapper as="footer" {...props} />
);

/**
 * Staggered animation wrapper for lists and grids
 */
interface StaggerWrapperProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
  animationType?: MotionWrapperProps["animationType"];
  disabled?: boolean;
}

export function StaggerWrapper({
  children,
  className,
  staggerDelay = 0.1,
  animationType = "slideUp",
  disabled = false,
}: StaggerWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  if (disabled || prefersReducedMotion) {
    return (
      <div className={cn(className, "motion-reduce-scroll")}>
        {children.map((child, index) => (
          <div key={index}>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children.map((child, index) => (
        <MotionWrapper
          key={index}
          animationType={animationType}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {child}
        </MotionWrapper>
      ))}
    </motion.div>
  );
}

/**
 * Hover animation wrapper that respects reduced motion preferences
 */
interface HoverWrapperProps {
  children: React.ReactNode;
  className?: string;
  hoverType?: "scale" | "lift" | "glow";
  disabled?: boolean;
}

export function HoverWrapper({
  children,
  className,
  hoverType = "scale",
  disabled = false,
}: HoverWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const hover = {
    scale: { scale: 1.05 },
    lift: { y: -5 },
    glow: { boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" },
  };

  const tap = {
    scale: { scale: 0.95 },
  };

  if (disabled || prefersReducedMotion) {
    return (
      <div className={cn(className, "motion-reduce-hover")}>{children}</div>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={hover[hoverType]}
      whileTap={tap.scale}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scroll-triggered animation wrapper
 */
interface ScrollRevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  animationType?: MotionWrapperProps["animationType"];
  threshold?: number;
  disabled?: boolean;
}

export function ScrollRevealWrapper({
  children,
  className,
  animationType = "slideUp",
  threshold = 0.1,
  disabled = false,
}: ScrollRevealWrapperProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -10 },
      animate: { opacity: 1, rotate: 0 },
    },
  };

  if (disabled || prefersReducedMotion) {
    return (
      <div className={cn(className, "motion-reduce-scroll")}>{children}</div>
    );
  }

  const animationVariant = variants[animationType];

  return (
    <motion.div
      className={className}
      initial={animationVariant.initial}
      whileInView={animationVariant.animate}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
