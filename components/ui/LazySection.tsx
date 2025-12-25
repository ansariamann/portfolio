"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  skeletonVariant?: "text" | "image" | "card" | "avatar" | "button";
  skeletonCount?: number;
  delay?: number;
}

/**
 * Simplified LazySection component that just renders children with animation
 * No lazy loading - just provides consistent rendering and animation
 */
export default function LazySection({
  children,
  className = "",
}: LazySectionProps) {
  return <div className={className}>{children}</div>;
}
