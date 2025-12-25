"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ensureBlurForSrc } from "@/lib/image-optimization";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

// Image optimization utilities removed - using Next.js Image component directly

interface VisualAnchorProps {
  primaryImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  fallbackContent: {
    initials: string;
    backgroundColor: string;
    textColor: string;
    name?: string;
    role?: string;
  };
  className?: string;
}

export function VisualAnchor({
  primaryImage,
  fallbackContent,
  className = "",
}: VisualAnchorProps) {
  const { touchDevice, shouldReduceAnimations } = useMobileOptimizedAnimation();
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div
      id="visual-anchor-container"
      className={`relative ${className}`}
      role="img"
      aria-label="Professional profile photo"
    >
      {/* Hidden description for screen readers */}
      <div id="profile-description" className="sr-only">
        Professional headshot of {fallbackContent.name || "software developer"},
        {fallbackContent.role && ` working as ${fallbackContent.role}`}. This
        image serves as a visual anchor to build trust and personal connection.
      </div>

      {/* Subtle glow effect - respects reduced motion */}
      {!shouldReduceAnimations && (
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image container with 3:4 aspect ratio - Mobile optimized */}
      <motion.div
        className={cn(
          "relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/50",
          // Mobile-first responsive sizing
          "w-[240px] h-[320px]", // Small mobile (375px)
          "xs:w-[260px] xs:h-[347px]", // Large mobile (475px+)
          "sm:w-[280px] sm:h-[373px]", // Tablet
          "md:w-[320px] md:h-[427px]" // Desktop
        )}
        whileHover={
          touchDevice || shouldReduceAnimations ? {} : { scale: 1.02 }
        }
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Professional Image - Lazy loaded */}
        {!imageError && (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover"
            priority
            onError={handleImageError}
            sizes="(max-width: 768px) 280px, 320px"
            quality={85}
            role="img"
            aria-describedby="profile-description"
          />
        )}

        {/* Fallback placeholder when image fails to load */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="text-center">
              <div
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                style={{
                  color: fallbackContent.textColor,
                }}
              >
                <span className="text-2xl font-bold">
                  {fallbackContent.initials}
                </span>
              </div>
              {fallbackContent.name && (
                <p className="text-gray-300 text-sm font-medium">
                  {fallbackContent.name}
                </p>
              )}
              {fallbackContent.role && (
                <p className="text-gray-400 text-xs mt-1">
                  {fallbackContent.role}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Subtle overlay for better visual depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Inner border highlight */}
        <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none" />
      </motion.div>
    </div>
  );
}
