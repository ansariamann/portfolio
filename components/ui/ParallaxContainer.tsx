"use client";

import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { useParallax, useReducedMotion } from "@/lib/hooks/useScrollAnimations";

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: number;
  enableOpacity?: boolean;
}

export default function ParallaxContainer({
  children,
  speed = 0.5,
  className = "",
  offset = 0,
  enableOpacity = false,
}: ParallaxContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { y, opacity } = useParallax(speed, ref);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: prefersReducedMotion ? 0 : y,
        opacity: enableOpacity && !prefersReducedMotion ? opacity : 1,
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </motion.div>
  );
}
