"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fallbackSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  fallbackSrc = "/images/placeholder.svg",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    console.log(`Image failed to load: ${imageSrc}`);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setIsLoading(true); // Try loading fallback
    } else {
      setHasError(true);
      setIsLoading(false);
    }
    onError?.();
  };

  const imageProps = {
    src: imageSrc,
    alt: alt || "",
    quality,
    priority,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className} ${
      isLoading ? "opacity-0" : "opacity-100"
    } transition-opacity duration-300`,
    ...(fill ? { fill: true } : { width, height }),
    ...(sizes && { sizes }),
    ...(placeholder === "blur" &&
      blurDataURL && {
        placeholder: "blur" as const,
        blurDataURL,
      }),
  };

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""} bg-gray-100`}>
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div
          className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${
            fill ? "w-full h-full" : ""
          }`}
          style={!fill ? { width: `${width}px`, height: `${height}px` } : {}}
        />
      )}

      {/* Optimized Image */}
      {!hasError && (
        <div className={fill ? "w-full h-full" : ""}>
          <Image {...imageProps} alt={alt || ""} />
        </div>
      )}

      {/* Error state with fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🖼️</div>
            <div className="text-sm font-medium">Image not available</div>
            <div className="text-xs text-gray-400 mt-1">
              {src.split("/").pop()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
