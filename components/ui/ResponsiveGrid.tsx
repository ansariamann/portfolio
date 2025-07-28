"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: "sm" | "md" | "lg";
  autoFit?: boolean;
  minItemWidth?: number;
}

export default function ResponsiveGrid({
  children,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  gap = "md",
  autoFit = false,
  minItemWidth = 280,
}: ResponsiveGridProps) {
  const gapClasses = {
    sm: "gap-3 sm:gap-4",
    md: "gap-4 sm:gap-6",
    lg: "gap-6 sm:gap-8",
  };

  const getGridColumns = () => {
    if (autoFit) {
      return `grid-cols-[repeat(auto-fit,minmax(${minItemWidth}px,1fr))]`;
    }

    const mobileColumns = columns.mobile || 1;
    const tabletColumns = columns.tablet || 2;
    const desktopColumns = columns.desktop || 3;

    return cn(
      `grid-cols-${mobileColumns}`,
      `sm:grid-cols-${tabletColumns}`,
      `lg:grid-cols-${desktopColumns}`
    );
  };

  return (
    <div className={cn("grid", getGridColumns(), gapClasses[gap], className)}>
      {children}
    </div>
  );
}
