"use client";

import { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

interface ResponsiveTextProps {
  children: ReactNode;
  as?: ElementType;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "caption"
    | "small";
  className?: string;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  color?: "primary" | "secondary" | "muted" | "accent";
  align?: "left" | "center" | "right";
  truncate?: boolean;
  lineClamp?: number;
}

export default function ResponsiveText({
  children,
  as,
  variant = "body",
  className,
  weight = "normal",
  color = "primary",
  align = "left",
  truncate = false,
  lineClamp,
}: ResponsiveTextProps) {
  const { isMobile } = useMobileOptimizedAnimation();

  // Determine the HTML element to use
  const getDefaultElement = (): ElementType => {
    switch (variant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return variant;
      case "caption":
      case "small":
        return "span";
      default:
        return "p";
    }
  };

  const Component = as || getDefaultElement();

  // Responsive text size classes
  const sizeClasses = {
    h1: "text-responsive-2xl",
    h2: "text-responsive-xl",
    h3: "text-responsive-lg",
    h4: "text-responsive-md",
    h5: "text-responsive-sm",
    h6: "text-responsive-xs",
    body: "text-responsive-sm",
    caption: "text-xs sm:text-sm",
    small: "text-xs",
  };

  const weightClasses = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const colorClasses = {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-700 dark:text-gray-300",
    muted: "text-gray-600 dark:text-gray-400",
    accent: "text-blue-600 dark:text-blue-400",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const getLineClampClass = () => {
    if (lineClamp) {
      return `line-clamp-${lineClamp}`;
    }
    return "";
  };

  return (
    <Component
      className={cn(
        sizeClasses[variant],
        weightClasses[weight],
        colorClasses[color],
        alignClasses[align],
        truncate && "truncate",
        lineClamp && getLineClampClass(),
        // Mobile-specific optimizations
        isMobile && variant.startsWith("h") && "leading-tight",
        isMobile && variant === "body" && "leading-relaxed",
        className
      )}
    >
      {children}
    </Component>
  );
}
