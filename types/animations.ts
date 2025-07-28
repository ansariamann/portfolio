// Animation-related types and constants for Framer Motion

/**
 * Standard animation variants for Framer Motion components
 * Defines hidden and visible states for consistent animations across the app
 */
export interface AnimationVariants {
  /** Initial/hidden state properties */
  hidden: {
    /** Opacity level (0 = invisible, 1 = fully visible) */
    opacity: number;
    /** Vertical offset in pixels (negative = up, positive = down) */
    y?: number;
    /** Horizontal offset in pixels (negative = left, positive = right) */
    x?: number;
    /** Scale factor (0.5 = half size, 1 = normal, 2 = double) */
    scale?: number;
    /** Rotation in degrees */
    rotate?: number;
  };
  /** Final/visible state properties */
  visible: {
    /** Opacity level (0 = invisible, 1 = fully visible) */
    opacity: number;
    /** Vertical offset in pixels (negative = up, positive = down) */
    y?: number;
    /** Horizontal offset in pixels (negative = left, positive = right) */
    x?: number;
    /** Scale factor (0.5 = half size, 1 = normal, 2 = double) */
    scale?: number;
    /** Rotation in degrees */
    rotate?: number;
    /** Animation timing and behavior configuration */
    transition?: {
      /** Animation duration in seconds */
      duration?: number;
      /** Delay before animation starts in seconds */
      delay?: number;
      /** Easing function (string name or cubic-bezier array) */
      ease?: string | number[];
      /** Delay between child animations in seconds */
      staggerChildren?: number;
      /** Initial delay before child animations start */
      delayChildren?: number;
    };
  };
}

/**
 * Animation variants for staggered child animations
 * Used when animating lists or grids with sequential timing
 */
export interface StaggerAnimationVariants {
  /** Initial state for parent container */
  hidden: {
    /** Container opacity */
    opacity: number;
  };
  /** Final state with staggered child animations */
  visible: {
    /** Container opacity */
    opacity: number;
    /** Transition configuration for child elements */
    transition: {
      /** Delay between each child animation in seconds */
      staggerChildren: number;
      /** Initial delay before first child animation starts */
      delayChildren?: number;
    };
  };
}

/**
 * Configuration object for animation settings
 * Provides consistent animation parameters across components
 */
export interface AnimationConfig {
  /** Animation duration in seconds */
  duration: number;
  /** Delay before animation starts in seconds */
  delay: number;
  /** Easing function (string name or cubic-bezier array) */
  ease: string | number[];
  /** Optional stagger delay for child animations */
  stagger?: number;
  /** Viewport intersection observer settings */
  viewport?: {
    /** Whether animation should only trigger once */
    once?: boolean;
    /** Root margin for intersection observer */
    margin?: string;
    /** Threshold for triggering animation */
    amount?: number | "some" | "all";
  };
}

/**
 * Props for scroll-triggered animation hooks
 * Configures intersection observer behavior
 */
export interface UseScrollAnimationProps {
  /** Intersection threshold (0-1) */
  threshold?: number;
  /** Whether animation should only trigger once */
  triggerOnce?: boolean;
  /** Root margin for intersection observer */
  rootMargin?: string;
}

/**
 * Predefined animation duration constants
 * Provides consistent timing across the application
 */
export const ANIMATION_DURATION = {
  /** Fast animations for micro-interactions (0.2s) */
  fast: 0.2,
  /** Normal animations for most UI elements (0.3s) */
  normal: 0.3,
  /** Slow animations for larger elements (0.5s) */
  slow: 0.5,
  /** Slower animations for complex transitions (0.8s) */
  slower: 0.8,
} as const;

/**
 * Predefined easing functions for consistent motion
 * Uses cubic-bezier curves for natural-feeling animations
 */
export const ANIMATION_EASE = {
  /** Ease out - starts fast, ends slow */
  easeOut: [0.0, 0.0, 0.2, 1],
  /** Ease in - starts slow, ends fast */
  easeIn: [0.4, 0.0, 1, 1],
  /** Ease in-out - slow start and end, fast middle */
  easeInOut: [0.4, 0.0, 0.2, 1],
  /** Bounce effect for playful interactions */
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// Animation presets for consistent animations across the app
export const ANIMATION_PRESETS = {
  // Fade in from bottom with slight upward movement
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },

  // Simple fade in animation
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },

  // Scale in animation for modals and overlays
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },

  // Stagger container for animating lists
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },

  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  },
};
