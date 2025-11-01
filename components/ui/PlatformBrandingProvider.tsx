"use client";

import { createContext, useContext, useMemo } from "react";
import {
  getPlatformBranding,
  generatePlatformCSSVariables,
  generatePlatformTailwindClasses,
  type PlatformBranding,
} from "@/lib/platform-branding";

interface PlatformBrandingContextValue {
  branding: PlatformBranding | null;
  cssVariables: string;
  tailwindClasses: Record<string, string>;
  platformId: string;
}

const PlatformBrandingContext =
  createContext<PlatformBrandingContextValue | null>(null);

interface PlatformBrandingProviderProps {
  platformId: string;
  children: React.ReactNode;
}

/**
 * Platform Branding Provider
 * Provides platform-specific branding context to child components
 */
export function PlatformBrandingProvider({
  platformId,
  children,
}: PlatformBrandingProviderProps) {
  const contextValue = useMemo(() => {
    const branding = getPlatformBranding(platformId);
    const cssVariables = generatePlatformCSSVariables(platformId);
    const tailwindClasses = generatePlatformTailwindClasses(platformId);

    return {
      branding,
      cssVariables,
      tailwindClasses,
      platformId,
    };
  }, [platformId]);

  return (
    <PlatformBrandingContext.Provider value={contextValue}>
      <div
        className="platform-branded-container"
        style={{
          // Inject CSS custom properties
          ...Object.fromEntries(
            contextValue.cssVariables
              .split(";")
              .filter(Boolean)
              .map((prop) => {
                const [key, value] = prop.split(":").map((s) => s.trim());
                return [key, value];
              })
          ),
        }}
      >
        {children}
      </div>
    </PlatformBrandingContext.Provider>
  );
}

/**
 * Hook to use platform branding context
 */
export function usePlatformBranding() {
  const context = useContext(PlatformBrandingContext);

  if (!context) {
    throw new Error(
      "usePlatformBranding must be used within a PlatformBrandingProvider"
    );
  }

  return context;
}

/**
 * Hook to get platform-specific styles
 */
export function usePlatformStyles() {
  const { branding, tailwindClasses } = usePlatformBranding();

  return useMemo(() => {
    if (!branding) return {};

    return {
      // CSS-in-JS styles
      styles: {
        primary: { color: branding.colors.primary },
        secondary: { color: branding.colors.secondary },
        accent: { color: branding.colors.accent },
        primaryBg: { backgroundColor: branding.colors.primary },
        secondaryBg: { backgroundColor: branding.colors.secondary },
        accentBg: { backgroundColor: branding.colors.accent },
        surfaceBg: { backgroundColor: branding.colors.surface },
        primaryGradient: { background: branding.gradients.primary },
        secondaryGradient: { background: branding.gradients.secondary },
        accentGradient: { background: branding.gradients.accent },
        backgroundGradient: { background: branding.gradients.background },
        primaryShadow: { boxShadow: branding.shadows.md },
        largeShadow: { boxShadow: branding.shadows.lg },
      },

      // Tailwind classes
      classes: tailwindClasses,

      // Direct color values for dynamic styling
      colors: branding.colors,
      gradients: branding.gradients,
      shadows: branding.shadows,
    };
  }, [branding, tailwindClasses]);
}

/**
 * Platform-themed Card Component
 */
interface PlatformCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  hover?: boolean;
  gradient?: boolean;
}

export function PlatformCard({
  children,
  className = "",
  variant = "default",
  size = "md",
  hover = true,
  gradient = false,
}: PlatformCardProps) {
  const { styles, colors } = usePlatformStyles();

  const sizeClasses = {
    sm: "p-3 sm:p-4 rounded-lg sm:rounded-xl",
    md: "p-4 sm:p-6 rounded-xl sm:rounded-2xl",
    lg: "p-6 sm:p-8 rounded-2xl sm:rounded-3xl",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return gradient
          ? { background: styles.primaryGradient.background }
          : { backgroundColor: colors.primary, color: colors.text.inverse };
      case "secondary":
        return gradient
          ? { background: styles.secondaryGradient.background }
          : { backgroundColor: colors.secondary, color: colors.text.inverse };
      case "accent":
        return gradient
          ? { background: styles.accentGradient.background }
          : { backgroundColor: colors.accent, color: colors.text.primary };
      default:
        return gradient
          ? { background: styles.backgroundGradient.background }
          : { backgroundColor: colors.surface };
    }
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${
          hover
            ? "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            : ""
        }
        backdrop-blur-sm border border-white/60 shadow-xl
        ${className}
      `}
      style={{
        ...getVariantStyles(),
        ...styles.primaryShadow,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Platform-themed Button Component
 */
interface PlatformButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  gradient?: boolean;
}

export function PlatformButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  gradient = false,
}: PlatformButtonProps) {
  const { styles, colors } = usePlatformStyles();

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-base rounded-xl",
    lg: "px-6 py-3 text-lg rounded-2xl",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return gradient
          ? {
              background: styles.primaryGradient.background,
              color: colors.text.inverse,
            }
          : {
              backgroundColor: colors.primary,
              color: colors.text.inverse,
            };
      case "secondary":
        return gradient
          ? {
              background: styles.secondaryGradient.background,
              color: colors.text.inverse,
            }
          : {
              backgroundColor: colors.secondary,
              color: colors.text.inverse,
            };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: colors.primary,
          border: `2px solid ${colors.primary}`,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: colors.primary,
        };
      default:
        return {
          backgroundColor: colors.primary,
          color: colors.text.inverse,
        };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${sizeClasses[size]}
        font-medium transition-all duration-300
        hover:scale-105 hover:shadow-lg
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${className}
      `}
      style={{
        ...getVariantStyles(),
        focusRingColor: colors.primary,
      }}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * Platform-themed Badge Component
 */
interface PlatformBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "neutral";
  size?: "sm" | "md" | "lg";
  gradient?: boolean;
}

export function PlatformBadge({
  children,
  className = "",
  variant = "primary",
  size = "md",
  gradient = false,
}: PlatformBadgeProps) {
  const { styles, colors } = usePlatformStyles();

  const sizeClasses = {
    sm: "px-2 py-1 text-xs rounded-full",
    md: "px-3 py-1.5 text-sm rounded-full",
    lg: "px-4 py-2 text-base rounded-full",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return gradient
          ? {
              background: styles.primaryGradient.background,
              color: colors.text.inverse,
            }
          : {
              backgroundColor: `${colors.primary}20`,
              color: colors.primary,
            };
      case "secondary":
        return gradient
          ? {
              background: styles.secondaryGradient.background,
              color: colors.text.inverse,
            }
          : {
              backgroundColor: `${colors.secondary}20`,
              color: colors.secondary,
            };
      case "accent":
        return gradient
          ? {
              background: styles.accentGradient.background,
              color: colors.text.primary,
            }
          : {
              backgroundColor: `${colors.accent}20`,
              color: colors.accent,
            };
      default:
        return {
          backgroundColor: "#F3F4F6",
          color: colors.text.secondary,
        };
    }
  };

  return (
    <span
      className={`
        ${sizeClasses[size]}
        font-medium inline-flex items-center
        ${className}
      `}
      style={getVariantStyles()}
    >
      {children}
    </span>
  );
}

/**
 * Platform-themed Progress Bar Component
 */
interface PlatformProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  gradient?: boolean;
  showLabel?: boolean;
  label?: string;
}

export function PlatformProgressBar({
  value,
  max = 100,
  className = "",
  size = "md",
  gradient = false,
  showLabel = false,
  label,
}: PlatformProgressBarProps) {
  const { styles, colors } = usePlatformStyles();

  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const progressStyle = gradient
    ? { background: styles.primaryGradient.background }
    : { backgroundColor: colors.primary };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-medium"
            style={{ color: colors.text.primary }}
          >
            {label}
          </span>
          <span className="text-sm" style={{ color: colors.text.secondary }}>
            {value}/{max}
          </span>
        </div>
      )}
      <div
        className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className={`${sizeClasses[size]} transition-all duration-500 ease-out rounded-full`}
          style={{
            width: `${percentage}%`,
            ...progressStyle,
          }}
        />
      </div>
    </div>
  );
}
