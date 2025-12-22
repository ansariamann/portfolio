// Animation constants defined locally to avoid circular imports
export const ANIMATION_PRESETS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  },
  stagger: {
    delayChildren: 0.1,
    staggerChildren: 0.1,
  },
} as const;

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
} as const;

export const ANIMATION_EASE = {
  easeInOut: "easeInOut",
  easeIn: "easeIn",
  easeOut: "easeOut",
  spring: "spring",
} as const;

// Z-index layers for consistent layering
export const Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const;

// Common breakpoint values
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Performance optimization constants
export const PERFORMANCE = {
  // Intersection Observer options
  intersectionThreshold: 0.1,
  intersectionRootMargin: "-100px",

  // Debounce/throttle delays
  scrollDebounce: 100,
  resizeDebounce: 250,
  searchDebounce: 300,

  // Animation performance
  reducedMotionQuery: "(prefers-reduced-motion: reduce)",
} as const;
