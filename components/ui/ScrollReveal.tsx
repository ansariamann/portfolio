"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  useScrollReveal,
  useMobileOptimizedAnimation,
} from "@/lib/hooks/useScrollAnimations";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.6,
}: ScrollRevealProps) {
  const { ref, shouldAnimate } = useScrollReveal(delay);
  const { shouldReduceAnimations } = useMobileOptimizedAnimation();

  const getAnimationVariants = () => {
    const adjustedDistance = shouldReduceAnimations ? distance * 0.5 : distance;
    const adjustedDuration = shouldReduceAnimations ? duration * 0.7 : duration;

    const baseVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: adjustedDuration,
          ease: [0.4, 0, 0.2, 1] as const,
        },
      },
    };

    switch (direction) {
      case "up":
        return {
          hidden: { ...baseVariants.hidden, y: adjustedDistance },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case "down":
        return {
          hidden: { ...baseVariants.hidden, y: -adjustedDistance },
          visible: { ...baseVariants.visible, y: 0 },
        };
      case "left":
        return {
          hidden: { ...baseVariants.hidden, x: adjustedDistance },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case "right":
        return {
          hidden: { ...baseVariants.hidden, x: -adjustedDistance },
          visible: { ...baseVariants.visible, x: 0 },
        };
      case "scale":
        return {
          hidden: { ...baseVariants.hidden, scale: 0.8 },
          visible: { ...baseVariants.visible, scale: 1 },
        };
      case "fade":
        return baseVariants;
      default:
        return {
          hidden: { ...baseVariants.hidden, y: adjustedDistance },
          visible: { ...baseVariants.visible, y: 0 },
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
