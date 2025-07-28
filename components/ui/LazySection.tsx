"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import SkeletonLoader from "./SkeletonLoader";

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

export default function LazySection({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = "50px",
  className = "",
  skeletonVariant = "card",
  skeletonCount = 1,
  delay = 0,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add delay before rendering content
          setTimeout(() => {
            setShouldRender(true);
          }, delay);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  const defaultFallback = (
    <div className="space-y-4">
      <SkeletonLoader
        variant={skeletonVariant}
        count={skeletonCount}
        animate={true}
      />
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {shouldRender ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      ) : isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {fallback || defaultFallback}
        </motion.div>
      ) : (
        <div className="min-h-[200px]" /> // Placeholder to maintain layout
      )}
    </div>
  );
}
