"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, debugLog } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function ProjectImage({
  src,
  alt,
  className = "",
  priority = false,
}: ProjectImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    debugLog(`Failed to load image: ${currentSrc}`);
    if (currentSrc !== "/images/placeholder.svg") {
      // Try fallback to placeholder
      setCurrentSrc("/images/placeholder.svg");
      setIsLoading(true);
    } else {
      // Even placeholder failed, show error state
      setHasError(true);
      setIsLoading(false);
    }
  };

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200",
          className
        )}
      >
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 bg-gray-300 rounded-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm text-gray-500 font-medium">Project Image</p>
          <p className="text-xs text-gray-400 mt-1">Preview not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-lg" />
      )}

      {/* Image */}
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={cn(
          "transition-opacity duration-300",
          currentSrc.endsWith(".svg") ? "object-contain p-4" : "object-cover",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        quality={85}
        unoptimized={currentSrc.endsWith(".svg")}
      />
    </div>
  );
}
