// Re-export animation constants from types/animations for consistency
export {
  ANIMATION_PRESETS,
  ANIMATION_DURATION,
  ANIMATION_EASE,
} from "@/types/animations";

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
