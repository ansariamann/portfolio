"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  useStaggeredAnimation,
  useMobileOptimizedAnimation,
} from "@/lib/hooks/useScrollAnimations";

interface StaggeredListProps {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  rootMargin?: string;
}

export default function StaggeredList({
  children,
  className = "",
  itemClassName = "",
  staggerDelay = 0.1,
  direction = "up",
  threshold = 0.1,
  rootMargin = "-50px",
}: StaggeredListProps) {
  const { ref, isInView } = useStaggeredAnimation(
    children.length,
    staggerDelay,
    { threshold, rootMargin }
  );
  const { shouldReduceAnimations } = useMobileOptimizedAnimation();

  const getDirectionVariants = () => {
    const distance = shouldReduceAnimations ? 10 : 30;

    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -distance },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: distance },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -distance },
          visible: { opacity: 1, x: 0 },
        };
      default:
        return {
          hidden: { opacity: 0, y: distance },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  const variants = getDirectionVariants();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceAnimations
          ? staggerDelay * 0.5
          : staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration: shouldReduceAnimations ? 0.3 : 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          variants={itemVariants}
          custom={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
