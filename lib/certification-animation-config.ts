import { CertificationAnimationConfig } from "@/types";

export const CERTIFICATION_ANIMATIONS: CertificationAnimationConfig = {
  staggeredText: {
    letterDelay: 50, // milliseconds between each letter animation
    waveAmplitude: 8, // pixels of vertical movement
    duration: 600, // total animation duration in milliseconds
  },
  cinematic: {
    transitionDuration: 800, // milliseconds for page transitions
    speedLineCount: 20, // number of speed lines in cinematic effect
    blurIntensity: 4, // blur radius in pixels
  },
  vectors: {
    particleCount: 15, // number of floating particles
    glowIntensity: 0.6, // glow effect intensity (0-1)
    parallaxStrength: 0.3, // parallax scroll multiplier (0-1)
  },
} as const;

// Animation variants for Framer Motion
export const CERTIFICATION_VARIANTS = {
  // Card entrance animations
  cardContainer: {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  },

  // Staggered text wave animations
  textWave: {
    initial: { y: 0, opacity: 1 },
    hover: (index: number) => ({
      y: [-8, 0],
      opacity: [0.7, 1],
      transition: {
        delay:
          (index * CERTIFICATION_ANIMATIONS.staggeredText.letterDelay) / 1000,
        duration: CERTIFICATION_ANIMATIONS.staggeredText.duration / 1000,
        ease: "easeInOut",
        repeat: 1,
        repeatType: "reverse" as const,
      },
    }),
  },

  // Cinematic loader animations
  cinematicLoader: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: CERTIFICATION_ANIMATIONS.cinematic.transitionDuration / 1000,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  },

  // Speed lines animation
  speedLines: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (index: number) => ({
      pathLength: 1,
      opacity: [0, 1, 0],
      transition: {
        delay: index * 0.05,
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  },

  // Floating particles animation
  floatingParticle: {
    animate: (index: number) => ({
      y: [0, -20, 0],
      x: [0, Math.sin(index) * 10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
  },

  // Glowing accents animation
  glowingAccent: {
    idle: {
      scale: 1,
      opacity: 0.6,
    },
    hover: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // Modal animations
  modal: {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  },

  // Backdrop animation
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
} as const;

// Responsive animation configurations
export const RESPONSIVE_ANIMATIONS = {
  mobile: {
    ...CERTIFICATION_ANIMATIONS,
    staggeredText: {
      ...CERTIFICATION_ANIMATIONS.staggeredText,
      letterDelay: 30, // Faster on mobile for better UX
      waveAmplitude: 4, // Smaller amplitude for mobile
    },
    vectors: {
      ...CERTIFICATION_ANIMATIONS.vectors,
      particleCount: 8, // Fewer particles on mobile for performance
    },
  },
  tablet: {
    ...CERTIFICATION_ANIMATIONS,
    vectors: {
      ...CERTIFICATION_ANIMATIONS.vectors,
      particleCount: 12, // Moderate particle count for tablets
    },
  },
  desktop: CERTIFICATION_ANIMATIONS,
} as const;

// Performance optimization settings
export const PERFORMANCE_CONFIG = {
  // Reduce animations on low-end devices
  reducedMotion: {
    staggeredText: {
      letterDelay: 0,
      waveAmplitude: 0,
      duration: 0,
    },
    cinematic: {
      transitionDuration: 200,
      speedLineCount: 0,
      blurIntensity: 0,
    },
    vectors: {
      particleCount: 0,
      glowIntensity: 0,
      parallaxStrength: 0,
    },
  },

  // GPU acceleration hints
  gpuAcceleration: {
    willChange: "transform, opacity",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden" as const,
    perspective: 1000,
  },

  // Animation frame management
  frameManagement: {
    targetFPS: 60,
    throttleFPS: 30,
    performanceThreshold: 45, // FPS below which optimizations kick in
    memoryThreshold: 100 * 1024 * 1024, // 100MB
  },

  // Adaptive quality levels
  qualityLevels: {
    high: {
      particleCount: 15,
      animationDuration: 1,
      blurIntensity: 4,
      enableComplexAnimations: true,
      enableGPU: true,
    },
    medium: {
      particleCount: 10,
      animationDuration: 0.8,
      blurIntensity: 2,
      enableComplexAnimations: true,
      enableGPU: true,
    },
    low: {
      particleCount: 5,
      animationDuration: 0.5,
      blurIntensity: 0,
      enableComplexAnimations: false,
      enableGPU: false,
    },
  },

  // Memory management
  memoryManagement: {
    cleanupInterval: 30000, // 30 seconds
    maxAnimationInstances: 20,
    enableGarbageCollection: true,
  },

  // Throttling and debouncing
  throttling: {
    scroll: 16, // ~60fps
    resize: 100,
    hover: 50,
    intersection: 100,
  },
} as const;
