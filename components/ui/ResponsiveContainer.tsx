"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  centerContent?: boolean;
  mobileFullWidth?: boolean;
}

export default function ResponsiveContainer({
  children,
  className,
  maxWidth = "lg",
  padding = "md",
  centerContent = false,
  mobileFullWidth = true,
}: ResponsiveContainerProps) {
  const { isMobile } = useMobileOptimizedAnimation();

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-none",
  };

  const paddingClasses = {
    none: "",
    sm: "px-4 sm:px-6",
    md: "px-4 sm:px-6 lg:px-8",
    lg: "px-6 sm:px-8 lg:px-12",
  };

  return (
    <div
      className={cn(
        "mx-auto",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centerContent && "flex flex-col items-center",
        mobileFullWidth && isMobile && "w-full",
        className
      )}
    >
      {children}
    </div>
  );
}
