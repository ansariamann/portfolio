"use client";

import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  certifications,
  getCertificationsByCategory,
} from "@/data/certifications";
import { Certification, CERTIFICATION_CATEGORIES } from "@/types";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { useReducedMotion } from "@/lib/hooks/useScrollAnimations";
import StaggeredTextWave from "@/components/ui/StaggeredTextWave";

import CertificationModal from "@/components/ui/CertificationModal";
import CertificationErrorBoundary from "@/components/ui/CertificationErrorBoundary";
import GlowingAccents from "@/components/ui/GlowingAccents";
import GeometricShapes from "@/components/ui/GeometricShapes";
import AnimatedSectionHeading, {
  headingPresets,
} from "@/components/ui/AnimatedSectionHeading";
// Removed CertificationFallbacks import - component deleted
// Removed CertificationSectionSkeleton import - no loading states needed

// CertificationCard component
const CertificationCard = ({
  certification,
  index,
  showContent,
  onViewDetails,
  imageErrors,
  onImageError,
}: {
  certification: Certification;
  index: number;
  showContent: boolean;
  onViewDetails: (cert: Certification) => void;
  imageErrors: Set<string>;
  onImageError: (certificationId: string) => void;
}) => {
  const { isSmallMobile, shouldUseReducedAnimations, touchDevice } =
    useMobileOptimizedAnimation();

  const [isHovered, setIsHovered] = useState(false);

  const handleInteraction = () => {
    if (touchDevice) {
      setIsHovered(!isHovered);
    }
  };

  // Enhanced touch handling for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (touchDevice) {
      e.preventDefault();
      setIsHovered(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchDevice) {
      // Delay hiding hover state to allow for tap interactions
      setTimeout(() => setIsHovered(false), 300);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on verification link
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }
    onViewDetails(certification);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onViewDetails(certification);
    }
  };

  return (
    <motion.div
      className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        touchDevice ? "active:scale-95" : ""
      }`}
      initial={{
        opacity: 0,
        y: shouldUseReducedAnimations ? 0 : 50,
        scale: shouldUseReducedAnimations ? 1 : 0.8,
        rotateX: shouldUseReducedAnimations ? 0 : 15,
      }}
      animate={
        showContent
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
            }
          : {}
      }
      transition={{
        delay: showContent
          ? shouldUseReducedAnimations
            ? index * 0.05
            : index * 0.15
          : 0,
        duration: shouldUseReducedAnimations ? 0.4 : 0.8,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={shouldUseReducedAnimations ? {} : { y: -5, scale: 1.02 }}
      whileTap={{ scale: touchDevice ? 0.95 : 0.98 }}
      onHoverStart={() => !touchDevice && setIsHovered(true)}
      onHoverEnd={() => !touchDevice && setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${certification.title} certification from ${certification.issuer}. Press Enter or Space to open details.`}
      aria-describedby={`cert-${certification.id}-description`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        cursor: "pointer",
        // Enhanced touch target size for mobile
        minHeight: touchDevice ? "44px" : "auto",
      }}
    >
      {/* Hidden description for screen readers */}
      <div id={`cert-${certification.id}-description`} className="sr-only">
        {certification.description}. Skills covered:{" "}
        {certification.skills.join(", ")}.
        {certification.expiryDate &&
          ` Expires on ${new Date(
            certification.expiryDate
          ).toLocaleDateString()}.`}
      </div>

      {/* Card content */}
      <div className={`${isSmallMobile ? "p-3" : "p-4 sm:p-6"}`}>
        {/* Badge image with glowing accents */}
        <div className="flex justify-center mb-4">
          <div
            className={`relative ${
              isSmallMobile ? "w-12 h-12" : "w-16 h-16 sm:w-20 sm:h-20"
            }`}
          >
            {/* Glowing accents around badge */}
            {!shouldUseReducedAnimations && (
              <GlowingAccents
                isHovered={isHovered}
                category={certification.category}
                size={80}
                intensity={0.6}
                className="absolute -inset-2"
              />
            )}
            {imageErrors.has(certification.id) ? (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Badge unavailable</span>
              </div>
            ) : (
              <img
                src={certification.badgeImage}
                alt={`${certification.title} certification badge from ${certification.issuer}`}
                className="w-full h-full object-contain rounded-lg relative z-10"
                loading="lazy"
                decoding="async"
                onError={() => onImageError(certification.id)}
              />
            )}
          </div>
        </div>

        {/* Certification title with staggered text wave animation */}
        <h3
          className={`font-bold text-slate-800 text-center mb-2 ${
            isSmallMobile ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          <StaggeredTextWave
            text={certification.title}
            staggerDelay={shouldUseReducedAnimations ? 0.05 : 0.1}
            duration={shouldUseReducedAnimations ? 0.4 : 0.8}
            waveIntensity={isHovered ? 1.0 : 0.5}
          />
        </h3>

        {/* Issuer */}
        <p
          className={`text-slate-600 text-center mb-3 ${
            isSmallMobile ? "text-xs" : "text-sm"
          }`}
        >
          {certification.issuer}
        </p>

        {/* Issue date */}
        <div className="text-center mb-3">
          <span
            className={`text-slate-500 ${
              isSmallMobile ? "text-xs" : "text-sm"
            }`}
          >
            Issued: {new Date(certification.issueDate).toLocaleDateString()}
          </span>
          {certification.expiryDate && (
            <span
              className={`block text-slate-500 ${
                isSmallMobile ? "text-xs" : "text-sm"
              }`}
            >
              Expires: {new Date(certification.expiryDate).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Credential ID */}
        <div className="text-center mb-4">
          <span
            className={`text-slate-400 font-mono ${
              isSmallMobile ? "text-xs" : "text-sm"
            }`}
          >
            ID: {certification.credentialId}
          </span>
        </div>

        {/* Verification link */}
        {certification.verificationUrl && (
          <div className="text-center">
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 focus:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-colors ${
                isSmallMobile ? "text-xs p-1" : "text-sm p-2"
              } ${
                touchDevice ? "min-h-[44px] min-w-[44px] justify-center" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
              aria-label={`Verify ${certification.title} certificate on ${certification.issuer} website`}
            >
              Verify Certificate →
            </a>
          </div>
        )}

        {/* Category badge */}
        <div
          className={`absolute ${
            isSmallMobile ? "top-2 right-2" : "top-3 right-3"
          }`}
        >
          <span
            className={`px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium ${
              isSmallMobile ? "text-xs" : "text-sm"
            }`}
            aria-label={`Category: ${
              CERTIFICATION_CATEGORIES[certification.category]
            }`}
          >
            {CERTIFICATION_CATEGORIES[certification.category]}
          </span>
        </div>

        {/* Featured badge */}
        {certification.featured && (
          <div
            className={`absolute ${
              isSmallMobile ? "top-2 left-2" : "top-3 left-3"
            }`}
          >
            <span
              className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs font-medium"
              aria-label="Featured certification"
            >
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Hover overlay with skills */}
      {isHovered && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br from-blue-600/95 to-purple-600/95 backdrop-blur-sm rounded-2xl flex flex-col justify-center ${
            isSmallMobile ? "p-3" : "p-4 sm:p-6"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldUseReducedAnimations ? 0.1 : 0.3 }}
          role="dialog"
          aria-label={`Skills and details for ${certification.title}`}
        >
          <h4
            className={`text-white font-bold text-center mb-3 ${
              isSmallMobile ? "text-xs" : "text-sm sm:text-base"
            }`}
          >
            Skills Covered
          </h4>
          <div
            className={`flex flex-wrap justify-center mb-4 ${
              isSmallMobile ? "gap-1" : "gap-1 sm:gap-2"
            }`}
          >
            {certification.skills.map((skill, skillIndex) => (
              <span
                key={skill}
                className={`px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full font-medium ${
                  isSmallMobile ? "text-xs" : "text-xs"
                }`}
                aria-label={`Skill: ${skill}`}
              >
                {skill}
              </span>
            ))}
          </div>
          <p
            className={`text-white/90 text-center leading-relaxed mb-4 ${
              isSmallMobile ? "text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {certification.description}
          </p>
          <div className="text-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(certification);
              }}
              className={`bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/30 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors border border-white/30 ${
                isSmallMobile ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm"
              } ${touchDevice ? "min-h-[44px] min-w-[44px]" : ""}`}
              aria-label={`View detailed information for ${certification.title} certification`}
            >
              View Details
            </button>
          </div>
          {touchDevice && (
            <div
              className={`text-white/70 text-center mt-2 ${
                isSmallMobile ? "text-xs" : "text-xs"
              }`}
            >
              Tap card or button for details
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function CertificationsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [headerHovered, setHeaderHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedCategoryIndex, setFocusedCategoryIndex] = useState(-1);

  // Error handling states
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);
  const [dataLoadError, setDataLoadError] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const {
    isSmallMobile,
    shouldUseReducedAnimations,
    getOptimalGridColumns,
    touchDevice,
  } = useMobileOptimizedAnimation();
  const prefersReducedMotion = useReducedMotion();

  // Simple performance optimization
  const shouldUseComplexAnimations = !shouldUseReducedAnimations;

  const categories = Object.keys(CERTIFICATION_CATEGORIES) as Array<
    keyof typeof CERTIFICATION_CATEGORIES
  >;

  // Data validation and error handling
  const validateCertificationData = useCallback(() => {
    try {
      if (!certifications || certifications.length === 0) {
        throw new Error("No certification data available");
      }

      // Validate each certification has required fields
      certifications.forEach((cert, index) => {
        if (!cert.id || !cert.title || !cert.issuer) {
          throw new Error(`Invalid certification data at index ${index}`);
        }
      });

      return true;
    } catch (error) {
      setDataLoadError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "Data validation failed"
      );
      return false;
    }
  }, []);

  const filteredCertifications = React.useMemo(() => {
    try {
      if (dataLoadError) return [];

      const filtered =
        selectedCategory === "all"
          ? certifications
          : getCertificationsByCategory(
              selectedCategory as Certification["category"]
            );

      return filtered || [];
    } catch (error) {
      setDataLoadError(true);
      setErrorMessage("Failed to filter certifications");
      return [];
    }
  }, [selectedCategory, dataLoadError]);

  // Handle image loading errors
  const handleImageError = useCallback((certificationId: string) => {
    setImageErrors((prev) => new Set(prev).add(certificationId));
  }, []);

  // Retry functionality
  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
    setHasError(false);
    setDataLoadError(false);
    setErrorMessage("");
    setImageErrors(new Set());
    // Retry data validation
    setTimeout(() => {
      validateCertificationData();
    }, 500);
  }, [validateCertificationData]);

  // Determine grid columns based on screen size
  const gridColumns = getOptimalGridColumns(3);

  // Initialize and validate data immediately (no loading state)
  React.useEffect(() => {
    try {
      // Validate certification data synchronously
      const isValid = validateCertificationData();

      if (!isValid) {
        setHasError(true);
        setErrorMessage("Invalid certification data");
      }
    } catch (error) {
      setHasError(true);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to initialize certifications"
      );
    }
  }, [validateCertificationData, retryCount]);

  // Optimized scroll handler for parallax effects
  const handleScrollProgress = useCallback(
    (scrollY: number, deltaY: number) => {
      const element = document.getElementById("certifications");
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1) based on element visibility
      const scrollTop = -rect.top;
      const progress = Math.max(
        0,
        Math.min(1, scrollTop / (elementHeight - windowHeight))
      );

      setScrollProgress(progress);
    },
    []
  );

  // Handle scroll progress for parallax effects
  useEffect(() => {
    const throttledScrollHandler = () => {
      requestAnimationFrame(() => handleScrollProgress(window.scrollY, 0));
    };

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    handleScrollProgress(window.scrollY, 0); // Initial calculation

    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
    };
  }, [handleScrollProgress]);

  // Handle certification modal
  const handleViewCertificationDetails = useCallback(
    (certification: Certification) => {
      setSelectedCertification(certification);
      setIsModalOpen(true);
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Small delay before clearing the selected certification to allow for exit animation
    const timeoutId = setTimeout(() => setSelectedCertification(null), 300);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, []);

  // Keyboard navigation for category filters
  const handleCategoryKeyDown = (
    e: React.KeyboardEvent,
    category: string,
    index: number
  ) => {
    const allCategories = ["all", ...categories];

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        const prevIndex = index > 0 ? index - 1 : allCategories.length - 1;
        setFocusedCategoryIndex(prevIndex);
        // Focus the previous button
        const prevButton = document.querySelector(
          `[data-category-index="${prevIndex}"]`
        ) as HTMLButtonElement;
        prevButton?.focus();
        break;
      case "ArrowRight":
        e.preventDefault();
        const nextIndex = index < allCategories.length - 1 ? index + 1 : 0;
        setFocusedCategoryIndex(nextIndex);
        // Focus the next button
        const nextButton = document.querySelector(
          `[data-category-index="${nextIndex}"]`
        ) as HTMLButtonElement;
        nextButton?.focus();
        break;
      case "Home":
        e.preventDefault();
        setFocusedCategoryIndex(0);
        const firstButton = document.querySelector(
          `[data-category-index="0"]`
        ) as HTMLButtonElement;
        firstButton?.focus();
        break;
      case "End":
        e.preventDefault();
        const lastIndex = allCategories.length - 1;
        setFocusedCategoryIndex(lastIndex);
        const lastButton = document.querySelector(
          `[data-category-index="${lastIndex}"]`
        ) as HTMLButtonElement;
        lastButton?.focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        setSelectedCategory(category);
        break;
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Basic cleanup
    };
  }, []);

  // Skip error states to prevent any loading delays - render immediately
  // if (hasError && retryCount >= 3) {
  //   return (
  //     <CertificationErrorBoundary context="section">
  //       <CertificationDataErrorFallback onRetry={handleRetry} />
  //     </CertificationErrorBoundary>
  //   );
  // }

  // if (dataLoadError) {
  //   return (
  //     <section className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center py-16 sm:py-20">
  //       <div className="container mx-auto px-4 sm:px-6">
  //         <CertificationDataErrorFallback onRetry={handleRetry} />
  //       </div>
  //     </section>
  //   );
  // }

  return (
    <CertificationErrorBoundary
      context="section"
      onError={(error, errorInfo) => {
        setHasError(true);
        setErrorMessage(error.message);
        console.error("Certification section error:", error, errorInfo);
      }}
    >
      <section
        id="certifications"
        className={`min-h-screen bg-gradient-to-br from-slate-50 via-white via-gray-50 to-slate-100 relative overflow-hidden ${
          isSmallMobile ? "py-12" : "py-16 sm:py-20"
        }`}
        aria-label="Professional Certifications"
        role="region"
      >
        {/* Vector Animation Background */}
        {!shouldUseReducedAnimations && shouldUseComplexAnimations && (
          <CertificationErrorBoundary context="animation">
            {/* Geometric shapes with parallax */}
            <GeometricShapes
              isInView={true}
              scrollProgress={scrollProgress}
              shapeCount={8}
              className="absolute inset-0"
            />
          </CertificationErrorBoundary>
        )}

        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/10 to-purple-200/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tr from-purple-200/10 to-blue-200/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div
          className={`container mx-auto relative z-10 ${
            isSmallMobile ? "px-4" : "px-6"
          }`}
        >
          {/* Section header */}
          <motion.div
            className={`text-center ${
              isSmallMobile ? "mb-12" : "mb-16 sm:mb-20"
            }`}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0,
              delay: 0,
            }}
          >
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0, delay: 0 }}
              className={`inline-block ${isSmallMobile ? "mb-4" : "mb-6"}`}
            >
              <span
                className={`bg-blue-100/80 backdrop-blur-sm rounded-full font-medium text-blue-800 border border-blue-200 ${
                  isSmallMobile ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm"
                }`}
              >
                Professional Achievements
              </span>
            </motion.div>

            <AnimatedSectionHeading
              text="Certifications"
              className={`font-bold tracking-tight bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent ${
                isSmallMobile
                  ? "text-2xl mb-6"
                  : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8"
              }`}
              preset={shouldUseReducedAnimations ? "fast" : "default"}
            />

            <motion.p
              className={`text-gray-600 max-w-3xl mx-auto leading-relaxed font-light ${
                isSmallMobile
                  ? "text-sm px-2"
                  : "text-base sm:text-lg lg:text-xl"
              }`}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0, delay: 0 }}
            >
              Professional certifications and achievements that validate my
              expertise and commitment to continuous learning
            </motion.p>
          </motion.div>

          {/* Category filter */}
          <motion.div
            className={`flex flex-wrap justify-center gap-2 sm:gap-3 ${
              isSmallMobile ? "mb-8 px-2" : "mb-12 sm:mb-16"
            }`}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0, delay: 0 }}
            role="tablist"
            aria-label="Filter certifications by category"
          >
            <motion.button
              onClick={() => setSelectedCategory("all")}
              onKeyDown={(e) => handleCategoryKeyDown(e, "all", 0)}
              className={`rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                  : "bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white/90 focus:bg-white/90 shadow-md"
              } ${
                isSmallMobile
                  ? "text-xs px-2 py-1"
                  : "text-sm px-3 sm:px-4 py-2"
              } ${touchDevice ? "min-h-[44px]" : ""}`}
              whileHover={shouldUseReducedAnimations ? {} : { y: -1 }}
              whileTap={{ scale: 0.98 }}
              role="tab"
              aria-selected={selectedCategory === "all"}
              aria-controls="certifications-grid"
              aria-label="Show all certifications"
              data-category-index="0"
            >
              All Certifications
            </motion.button>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                onKeyDown={(e) => handleCategoryKeyDown(e, category, index + 1)}
                className={`rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                    : "bg-white/70 backdrop-blur-sm text-slate-600 hover:bg-white/90 focus:bg-white/90 shadow-md"
                } ${
                  isSmallMobile
                    ? "text-xs px-2 py-1"
                    : "text-sm px-3 sm:px-4 py-2"
                } ${touchDevice ? "min-h-[44px]" : ""}`}
                whileHover={shouldUseReducedAnimations ? {} : { y: -1 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldUseReducedAnimations ? 0 : 0.6 + index * 0.05,
                }}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls="certifications-grid"
                aria-label={`Show ${CERTIFICATION_CATEGORIES[category]} certifications`}
                data-category-index={index + 1}
              >
                {CERTIFICATION_CATEGORIES[category]}
              </motion.button>
            ))}
          </motion.div>

          {/* Certifications grid with error handling */}
          <motion.div
            id="certifications-grid"
            className={`max-w-6xl mx-auto ${
              filteredCertifications.length === 0
                ? ""
                : `grid ${isSmallMobile ? "gap-4" : "gap-6 sm:gap-8"} ${
                    gridColumns === 1
                      ? "grid-cols-1"
                      : gridColumns === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  }`
            }`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, delay: 0 }}
            role="tabpanel"
            aria-label={`${
              selectedCategory === "all"
                ? "All"
                : CERTIFICATION_CATEGORIES[
                    selectedCategory as keyof typeof CERTIFICATION_CATEGORIES
                  ]
            } certifications`}
          >
            {filteredCertifications.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No certifications found for this category.
                </p>
              </div>
            ) : (
              filteredCertifications.map((certification, index) => (
                <CertificationCard
                  key={certification.id}
                  certification={certification}
                  index={index}
                  showContent={true}
                  onViewDetails={handleViewCertificationDetails}
                  imageErrors={imageErrors}
                  onImageError={handleImageError}
                />
              ))
            )}
          </motion.div>

          {/* Summary stats */}
          <motion.div
            className={`text-center ${
              isSmallMobile ? "mt-12" : "mt-16 sm:mt-20"
            }`}
            initial={{ opacity: 0, y: shouldUseReducedAnimations ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldUseReducedAnimations ? 0.3 : 0.6,
              delay: 1.2,
            }}
          >
            <div
              className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl max-w-4xl mx-auto border border-white/60 ${
                isSmallMobile ? "p-4" : "p-6 sm:p-8"
              }`}
            >
              <h3
                className={`font-bold text-slate-800 mb-6 ${
                  isSmallMobile ? "text-base" : "text-lg sm:text-2xl"
                }`}
              >
                Certification Overview
              </h3>
              <div
                className={`grid gap-4 sm:gap-6 ${
                  isSmallMobile ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"
                }`}
                role="region"
                aria-label="Certification statistics"
              >
                <div className="text-center">
                  <div
                    className={`font-bold text-blue-600 mb-2 ${
                      isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                    }`}
                    aria-label={`${certifications.length} total certifications`}
                  >
                    {certifications.length}
                  </div>
                  <div
                    className={`text-slate-600 ${
                      isSmallMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    Total Certifications
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`font-bold text-purple-600 mb-2 ${
                      isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                    }`}
                    aria-label={`${
                      certifications.filter((cert) => cert.featured).length
                    } featured certifications`}
                  >
                    {certifications.filter((cert) => cert.featured).length}
                  </div>
                  <div
                    className={`text-slate-600 ${
                      isSmallMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    Featured
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`font-bold text-green-600 mb-2 ${
                      isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                    }`}
                    aria-label={`${categories.length} certification categories`}
                  >
                    {categories.length}
                  </div>
                  <div
                    className={`text-slate-600 ${
                      isSmallMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    Categories
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`font-bold text-orange-600 mb-2 ${
                      isSmallMobile ? "text-xl" : "text-2xl sm:text-3xl"
                    }`}
                    aria-label={`${
                      certifications.filter((cert) => {
                        if (!cert.expiryDate) return true;
                        return new Date(cert.expiryDate) > new Date();
                      }).length
                    } active certifications`}
                  >
                    {
                      certifications.filter((cert) => {
                        if (!cert.expiryDate) return true;
                        return new Date(cert.expiryDate) > new Date();
                      }).length
                    }
                  </div>
                  <div
                    className={`text-slate-600 ${
                      isSmallMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    Active
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certification Modal with error handling */}
        <CertificationErrorBoundary context="modal">
          <CertificationModal
            certification={selectedCertification}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </CertificationErrorBoundary>
      </section>
    </CertificationErrorBoundary>
  );
}
