import { useEffect, useState, useRef, RefObject, useCallback } from "react";
import {
  useInView,
  useScroll,
  useTransform,
  MotionValue,
  type UseInViewOptions,
} from "framer-motion";
import { throttle } from "@/lib/utils";

// Animation constants for consistent configuration
const ANIMATION_CONSTANTS = {
  DEFAULT_THRESHOLD: 0.1,
  DEFAULT_ROOT_MARGIN: "-100px",
  STAGGER_ROOT_MARGIN: "-50px",
  REVEAL_ROOT_MARGIN: "-50px",
  SCROLL_THROTTLE_MS: 16, // ~60fps
  RESIZE_THROTTLE_MS: 250,
  MOBILE_BREAKPOINT: 768,
  DEFAULT_STAGGER_DELAY: 0.1,
} as const;

// Types for better type safety
interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface StaggeredAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Hook for managing scroll-triggered animations with Intersection Observer
 */
export function useScrollAnimation(options?: ScrollAnimationOptions): {
  ref: RefObject<HTMLDivElement>;
  isInView: boolean;
} {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: options?.threshold || ANIMATION_CONSTANTS.DEFAULT_THRESHOLD,
    margin: options?.rootMargin || ANIMATION_CONSTANTS.DEFAULT_ROOT_MARGIN,
    once: options?.triggerOnce ?? true,
  } as UseInViewOptions);

  return { ref, isInView };
}

/**
 * Hook for creating staggered animations for lists and grids
 */
export function useStaggeredAnimation(
  itemCount: number,
  delay: number = ANIMATION_CONSTANTS.DEFAULT_STAGGER_DELAY,
  options?: StaggeredAnimationOptions
): {
  ref: RefObject<HTMLDivElement>;
  isInView: boolean;
  getItemDelay: (index: number) => number;
} {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: options?.threshold || ANIMATION_CONSTANTS.DEFAULT_THRESHOLD,
    margin: options?.rootMargin || ANIMATION_CONSTANTS.STAGGER_ROOT_MARGIN,
    once: true,
  } as UseInViewOptions);

  const getItemDelay = (index: number): number => {
    return isInView ? index * delay : 0;
  };

  return { ref, isInView, getItemDelay };
}

/**
 * Hook for parallax effects on background elements
 */
export function useParallax(
  speed: number = 0.5,
  targetRef?: RefObject<HTMLElement>
): {
  y: MotionValue<string>;
  opacity: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
} {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return { y, opacity, scrollYProgress };
}

/**
 * Hook for scroll position progress indicator
 */
export function useScrollProgress(): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = winHeightPx > 0 ? scrollPx / winHeightPx : 0;
      setScrollProgress(Math.min(Math.max(scrolled, 0), 1)); // Clamp between 0 and 1
    };

    // Throttle scroll events for better performance
    const throttledUpdate = throttle(
      updateScrollProgress,
      ANIMATION_CONSTANTS.SCROLL_THROTTLE_MS
    );

    window.addEventListener("scroll", throttledUpdate, { passive: true });
    updateScrollProgress(); // Initial call

    return () => window.removeEventListener("scroll", throttledUpdate);
  }, []);

  return scrollProgress;
}

/**
 * Hook for detecting reduced motion preference
 * Includes fallback for browsers that don't support matchMedia
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if matchMedia is supported
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Check if addEventListener is supported (older browsers might not have it)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that returns animation variants based on reduced motion preference
 * Returns reduced variants if user prefers reduced motion, full variants otherwise
 */
export function useMotionVariants<T extends Record<string, unknown>>(
  fullVariants: T,
  reducedVariants?: Partial<T>
): T {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion && reducedVariants) {
    return { ...fullVariants, ...reducedVariants } as T;
  }

  if (prefersReducedMotion) {
    // Create reduced motion variants by removing animations
    const reduced = {} as T;

    Object.keys(fullVariants).forEach((key) => {
      const variant = fullVariants[key];
      if (typeof variant === "object" && variant !== null) {
        // Remove animation properties but keep final state
        const variantObj = variant as Record<string, unknown>;
        const { transition, animate, initial, exit, ...finalState } =
          variantObj;
        // Suppress unused variable warnings for destructured properties
        void transition;
        void animate;
        void initial;
        void exit;

        reduced[key as keyof T] = {
          ...finalState,
          transition: { duration: 0 },
        } as T[keyof T];
      } else {
        reduced[key as keyof T] = variant as T[keyof T];
      }
    });

    return reduced;
  }

  return fullVariants;
}

/**
 * Hook that returns animation configuration based on reduced motion preference
 */
export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    // Transition configurations
    transition: {
      default: prefersReducedMotion ? { duration: 0 } : { duration: 0.3 },
      slow: prefersReducedMotion ? { duration: 0 } : { duration: 0.6 },
      fast: prefersReducedMotion ? { duration: 0 } : { duration: 0.15 },
      spring: prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 300, damping: 30 },
      bounce: prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 400, damping: 10 },
    },

    // Common animation variants
    variants: {
      fadeIn: prefersReducedMotion
        ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
        : { initial: { opacity: 0 }, animate: { opacity: 1 } },
      slideUp: prefersReducedMotion
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
      slideDown: prefersReducedMotion
        ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
        : { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
      slideLeft: prefersReducedMotion
        ? { initial: { opacity: 1, x: 0 }, animate: { opacity: 1, x: 0 } }
        : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
      slideRight: prefersReducedMotion
        ? { initial: { opacity: 1, x: 0 }, animate: { opacity: 1, x: 0 } }
        : { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
      scale: prefersReducedMotion
        ? {
            initial: { opacity: 1, scale: 1 },
            animate: { opacity: 1, scale: 1 },
          }
        : {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
          },
      rotate: prefersReducedMotion
        ? {
            initial: { opacity: 1, rotate: 0 },
            animate: { opacity: 1, rotate: 0 },
          }
        : {
            initial: { opacity: 0, rotate: -5 },
            animate: { opacity: 1, rotate: 0 },
          },
    },

    // Stagger configurations
    stagger: {
      container: prefersReducedMotion
        ? { transition: { staggerChildren: 0 } }
        : { transition: { staggerChildren: 0.1 } },
      fast: prefersReducedMotion
        ? { transition: { staggerChildren: 0 } }
        : { transition: { staggerChildren: 0.05 } },
      slow: prefersReducedMotion
        ? { transition: { staggerChildren: 0 } }
        : { transition: { staggerChildren: 0.2 } },
    },

    // Hover and interaction animations
    hover: {
      scale: prefersReducedMotion ? {} : { scale: 1.05 },
      lift: prefersReducedMotion ? {} : { y: -2, scale: 1.02 },
      glow: prefersReducedMotion
        ? {}
        : { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
    },

    // Tap animations
    tap: {
      scale: prefersReducedMotion ? {} : { scale: 0.95 },
      press: prefersReducedMotion ? {} : { scale: 0.98, y: 1 },
    },
  };
}

/**
 * Enhanced hook for optimized mobile animations and responsive behavior
 */
export function useMobileOptimizedAnimation(): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallMobile: boolean;
  isLargeMobile: boolean;
  prefersReducedMotion: boolean;
  shouldReduceAnimations: boolean;
  getAnimationVariant: <T>(desktop: T, mobile: T, tablet?: T) => T;
  getResponsiveValue: <T>(mobile: T, tablet: T, desktop: T) => T;
  getResponsiveClasses: (
    mobile: string,
    tablet: string,
    desktop: string
  ) => string;
  touchDevice: boolean;
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  // Enhanced responsive utilities
  getResponsiveSpacing: (base: number) => {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  getResponsiveFontSize: (base: number) => {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  getOptimalImageSize: (
    baseWidth: number,
    baseHeight: number
  ) => { width: number; height: number };
  shouldUseReducedAnimations: boolean;
  getAnimationDuration: (baseDuration: number) => number;
  getTouchTargetSize: () => number;
  getOptimalGridColumns: (maxColumns: number) => number;
} {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isSmallMobile: false,
    isLargeMobile: false,
    width: 0,
    height: 0,
  });
  const [touchDevice, setTouchDevice] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        isMobile: width < ANIMATION_CONSTANTS.MOBILE_BREAKPOINT,
        isTablet:
          width >= ANIMATION_CONSTANTS.MOBILE_BREAKPOINT && width < 1024,
        isDesktop: width >= 1024,
        isSmallMobile: width < 475, // xs breakpoint
        isLargeMobile:
          width >= 475 && width < ANIMATION_CONSTANTS.MOBILE_BREAKPOINT,
        width,
        height,
      });

      setIsLandscape(width > height);
      setDevicePixelRatio(window.devicePixelRatio || 1);
    };

    const checkTouchDevice = () => {
      setTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          ((navigator as Navigator & { msMaxTouchPoints?: number })
            .msMaxTouchPoints || 0) > 0
      );
    };

    // Throttle resize events for better performance
    const throttledCheckScreenSize = throttle(
      checkScreenSize,
      ANIMATION_CONSTANTS.RESIZE_THROTTLE_MS
    );

    checkScreenSize(); // Initial check
    checkTouchDevice(); // Initial check

    window.addEventListener("resize", throttledCheckScreenSize, {
      passive: true,
    });
    window.addEventListener("orientationchange", throttledCheckScreenSize, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", throttledCheckScreenSize);
      window.removeEventListener("orientationchange", throttledCheckScreenSize);
    };
  }, []);

  // Enhanced logic for reducing animations
  const shouldReduceAnimations =
    screenSize.isMobile ||
    prefersReducedMotion ||
    (touchDevice && screenSize.isSmallMobile) ||
    devicePixelRatio < 2; // Reduce animations on lower DPI screens

  const getAnimationVariant = useCallback(
    <T>(desktop: T, mobile: T, tablet?: T): T => {
      if (screenSize.isMobile) return mobile;
      if (screenSize.isTablet && tablet !== undefined) return tablet;
      return desktop;
    },
    [screenSize]
  );

  const getResponsiveValue = useCallback(
    <T>(mobile: T, tablet: T, desktop: T): T => {
      if (screenSize.isMobile) return mobile;
      if (screenSize.isTablet) return tablet;
      return desktop;
    },
    [screenSize]
  );

  const getResponsiveClasses = useCallback(
    (mobile: string, tablet: string, desktop: string): string => {
      const classes = [mobile];
      if (tablet) classes.push(`sm:${tablet}`);
      if (desktop) classes.push(`lg:${desktop}`);
      return classes.join(" ");
    },
    []
  );

  // Enhanced responsive utilities
  const getResponsiveSpacing = useCallback(
    (base: number) => ({
      mobile: Math.max(base * 0.75, 8), // Minimum 8px on mobile
      tablet: base,
      desktop: base * 1.25,
    }),
    []
  );

  const getResponsiveFontSize = useCallback(
    (base: number) => ({
      mobile: Math.max(base * 0.875, 14), // Minimum 14px on mobile for readability
      tablet: base,
      desktop: base * 1.125,
    }),
    []
  );

  const getOptimalImageSize = useCallback(
    (baseWidth: number, baseHeight: number) => {
      const aspectRatio = baseWidth / baseHeight;
      const maxWidth = screenSize.width * devicePixelRatio;

      if (screenSize.isMobile) {
        // Mobile: optimize for smaller screens and bandwidth
        const width = Math.min(maxWidth, baseWidth * 0.8);
        return {
          width: Math.round(width),
          height: Math.round(width / aspectRatio),
        };
      } else if (screenSize.isTablet) {
        // Tablet: balance between quality and performance
        const width = Math.min(maxWidth, baseWidth * 0.9);
        return {
          width: Math.round(width),
          height: Math.round(width / aspectRatio),
        };
      } else {
        // Desktop: full quality
        return {
          width: baseWidth,
          height: baseHeight,
        };
      }
    },
    [screenSize, devicePixelRatio]
  );

  const shouldUseReducedAnimations = shouldReduceAnimations;

  const getAnimationDuration = useCallback(
    (baseDuration: number) => {
      if (shouldReduceAnimations) return baseDuration * 0.5;
      if (screenSize.isMobile) return baseDuration * 0.75;
      return baseDuration;
    },
    [shouldReduceAnimations, screenSize.isMobile]
  );

  const getTouchTargetSize = useCallback(() => {
    // Apple and Android guidelines recommend minimum 44px touch targets
    return touchDevice ? 44 : 32;
  }, [touchDevice]);

  const getOptimalGridColumns = useCallback(
    (maxColumns: number) => {
      if (screenSize.isSmallMobile) return 1;
      if (screenSize.isLargeMobile) return Math.min(2, maxColumns);
      if (screenSize.isTablet) return Math.min(3, maxColumns);
      return maxColumns;
    },
    [screenSize]
  );

  return {
    isMobile: screenSize.isMobile,
    isTablet: screenSize.isTablet,
    isDesktop: screenSize.isDesktop,
    isSmallMobile: screenSize.isSmallMobile,
    isLargeMobile: screenSize.isLargeMobile,
    prefersReducedMotion,
    shouldReduceAnimations,
    getAnimationVariant,
    getResponsiveValue,
    getResponsiveClasses,
    touchDevice,
    isLandscape,
    screenWidth: screenSize.width,
    screenHeight: screenSize.height,
    devicePixelRatio,
    // Enhanced responsive utilities
    getResponsiveSpacing,
    getResponsiveFontSize,
    getOptimalImageSize,
    shouldUseReducedAnimations,
    getAnimationDuration,
    getTouchTargetSize,
    getOptimalGridColumns,
  };
}

/**
 * Hook for scroll-based element reveal with custom timing
 */
export function useScrollReveal(delay: number = 0): {
  ref: RefObject<HTMLDivElement>;
  isInView: boolean;
  shouldAnimate: boolean;
} {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: ANIMATION_CONSTANTS.DEFAULT_THRESHOLD,
    margin: ANIMATION_CONSTANTS.REVEAL_ROOT_MARGIN,
    once: true,
  });

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay]);

  return { ref, isInView, shouldAnimate };
}
