"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlatformImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}

/**
 * Optimized image component for platform logos and assets
 * Supports WebP format, fallbacks, and performance optimization
 */
export default function PlatformImage({
  src,
  alt,
  width = 32,
  height = 32,
  className,
  priority = false,
  quality = 90,
  placeholder = "empty",
  blurDataURL,
  fallbackSrc,
  onLoad,
  onError,
  sizes,
  fill = false,
  style,
  ...props
}: PlatformImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle image load success
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  }, [onLoad]);

  // Handle image load error with fallback
  const handleError = useCallback(() => {
    console.log(`Failed to load platform image: ${currentSrc}`);
    setIsLoading(false);
    setHasError(true);

    // Try fallback source if available and not already using it
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
    } else {
      // Generate a simple SVG placeholder if no fallback
      const placeholderSvg = generatePlaceholderSvg(width, height, alt);
      setCurrentSrc(placeholderSvg);
    }

    onError?.();
  }, [currentSrc, fallbackSrc, width, height, alt, onError]);

  // Generate WebP source if supported
  const getOptimizedSrc = (originalSrc: string): string => {
    // If it's already a data URL or external URL, return as-is
    if (originalSrc.startsWith("data:") || originalSrc.startsWith("http")) {
      return originalSrc;
    }

    // For SVG files, return as-is since they're already optimized
    if (originalSrc.endsWith(".svg")) {
      return originalSrc;
    }

    // For other formats, we could add WebP conversion logic here
    // For now, return the original source
    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(currentSrc);

  // Common image props
  const imageProps = {
    src: optimizedSrc,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    priority,
    quality,
    placeholder,
    blurDataURL,
    sizes,
    className: cn(
      "transition-opacity duration-300",
      isLoading && "opacity-0",
      !isLoading && "opacity-100",
      hasError && "opacity-50",
      className
    ),
    style,
    ...props,
  };

  if (fill) {
    return (
      <div className="relative" style={{ width, height }}>
        <Image {...imageProps} fill sizes={sizes || `${width}px`} />
        {isLoading && (
          <div
            className="absolute inset-0 bg-gray-200 animate-pulse rounded"
            style={{ width, height }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <Image {...imageProps} width={width} height={height} />
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

/**
 * Generate a simple SVG placeholder for failed images
 */
function generatePlaceholderSvg(
  width: number,
  height: number,
  alt: string
): string {
  const firstLetter = alt.charAt(0).toUpperCase() || "?";

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" rx="6" fill="#E5E7EB"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="${
        Math.min(width, height) * 0.4
      }" font-weight="bold" fill="#6B7280">
        ${firstLetter}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Platform Logo Component
 * Specialized component for platform logos with consistent sizing and styling
 */
interface PlatformLogoProps {
  platformId: string;
  platformName: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showName?: boolean;
  priority?: boolean;
}

export function PlatformLogo({
  platformId,
  platformName,
  size = "md",
  className,
  showName = false,
  priority = false,
}: PlatformLogoProps) {
  const sizeMap = {
    xs: { width: 16, height: 16, textSize: "text-xs" },
    sm: { width: 24, height: 24, textSize: "text-sm" },
    md: { width: 32, height: 32, textSize: "text-base" },
    lg: { width: 48, height: 48, textSize: "text-lg" },
    xl: { width: 64, height: 64, textSize: "text-xl" },
  };

  const { width, height, textSize } = sizeMap[size];
  const logoSrc = `/images/platforms/${platformId}-logo.svg`;
  const fallbackSrc = generatePlaceholderSvg(width, height, platformName);

  if (showName) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <PlatformImage
          src={logoSrc}
          alt={`${platformName} logo`}
          width={width}
          height={height}
          fallbackSrc={fallbackSrc}
          priority={priority}
          className="flex-shrink-0"
        />
        <span className={cn("font-medium text-gray-900", textSize)}>
          {platformName}
        </span>
      </div>
    );
  }

  return (
    <PlatformImage
      src={logoSrc}
      alt={`${platformName} logo`}
      width={width}
      height={height}
      fallbackSrc={fallbackSrc}
      priority={priority}
      className={className}
    />
  );
}

/**
 * Achievement Badge Image Component
 * Specialized component for achievement badge images with rarity styling
 */
interface AchievementBadgeImageProps {
  badgeId: string;
  platformId: string;
  badgeName: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  showGlow?: boolean;
  priority?: boolean;
}

export function AchievementBadgeImage({
  badgeId,
  platformId,
  badgeName,
  rarity = "common",
  size = "md",
  className,
  showGlow = false,
  priority = false,
}: AchievementBadgeImageProps) {
  const sizeMap = {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 48, height: 48 },
    lg: { width: 64, height: 64 },
    xl: { width: 80, height: 80 },
  };

  const { width, height } = sizeMap[size];
  const badgeSrc = `/images/badges/${platformId}-${badgeId}.svg`;
  const fallbackSrc = generateBadgePlaceholder(
    width,
    height,
    badgeName,
    rarity
  );

  const rarityGlowMap = {
    common: "shadow-gray-400/50",
    rare: "shadow-blue-400/50",
    epic: "shadow-purple-400/50",
    legendary: "shadow-yellow-400/50",
  };

  return (
    <div className={cn("relative", className)}>
      <PlatformImage
        src={badgeSrc}
        alt={`${badgeName} achievement badge`}
        width={width}
        height={height}
        fallbackSrc={fallbackSrc}
        priority={priority}
        className={cn(
          "transition-all duration-300",
          showGlow && ["drop-shadow-lg", rarityGlowMap[rarity]]
        )}
      />

      {/* Rarity indicator */}
      {rarity !== "common" && (
        <div
          className={cn(
            "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
            rarity === "rare" && "bg-blue-500",
            rarity === "epic" && "bg-purple-500",
            rarity === "legendary" && "bg-yellow-500"
          )}
        />
      )}
    </div>
  );
}

/**
 * Generate a placeholder for achievement badges
 */
function generateBadgePlaceholder(
  width: number,
  height: number,
  badgeName: string,
  rarity: string
): string {
  const rarityColors = {
    common: "#6B7280",
    rare: "#3B82F6",
    epic: "#8B5CF6",
    legendary: "#F59E0B",
  };

  const color = rarityColors[rarity as keyof typeof rarityColors] || "#6B7280";
  const firstLetter = badgeName.charAt(0).toUpperCase() || "?";

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${width / 2}" cy="${height / 2}" r="${
    Math.min(width, height) / 2 - 2
  }" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="${width / 2}" cy="${height / 2}" r="${
    Math.min(width, height) / 2 - 8
  }" fill="white" opacity="0.9"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.3em" font-family="Arial, sans-serif" font-size="${
        Math.min(width, height) * 0.3
      }" font-weight="bold" fill="${color}">
        ${firstLetter}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
