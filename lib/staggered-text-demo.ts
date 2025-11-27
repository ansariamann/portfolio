/**
 * Staggered Text Animation Demo Configuration
 *
 * This file demonstrates the different animation configurations
 * available for section headings with staggered text wave effects.
 */

import { headingPresets } from "@/components/ui/AnimatedSectionHeading";

// Example configurations for different section types
export const demoConfigurations = {
  // Hero section - bold and impactful
  hero: {
    text: "Welcome to My Portfolio",
    className: "text-6xl md:text-8xl font-bold mb-8 tracking-tight",
    gradientClassName:
      "bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent",
    animationConfig: headingPresets.hero.animationConfig,
    description:
      "Large, bold heading with strong wave effect for maximum impact",
  },

  // Main section headings - balanced and professional
  section: {
    text: "About Me",
    className: "text-5xl md:text-7xl font-bold mb-8 tracking-tight",
    gradientClassName:
      "bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent",
    animationConfig: headingPresets.section.animationConfig,
    description: "Standard section heading with moderate wave amplitude",
  },

  // Subsection headings - subtle and refined
  subsection: {
    text: "Skills Overview",
    className: "text-3xl md:text-4xl font-bold mb-6 tracking-tight",
    gradientClassName:
      "bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent",
    animationConfig: headingPresets.subsection.animationConfig,
    description: "Smaller heading with gentle wave effect for subsections",
  },

  // Custom configuration examples
  custom: {
    // Fast and energetic
    energetic: {
      text: "Let's Build Something Amazing",
      animationConfig: {
        letterDelay: 30,
        waveAmplitude: 15,
        duration: 400,
      },
      description: "Quick, energetic animation with high amplitude",
    },

    // Slow and elegant
    elegant: {
      text: "Crafted with Precision",
      animationConfig: {
        letterDelay: 80,
        waveAmplitude: 6,
        duration: 1000,
      },
      description: "Slow, elegant animation with subtle wave effect",
    },

    // Dramatic and bold
    dramatic: {
      text: "Innovation Meets Design",
      animationConfig: {
        letterDelay: 60,
        waveAmplitude: 20,
        duration: 800,
      },
      description: "Bold animation with dramatic wave amplitude",
    },
  },
};

// Animation timing guidelines
export const timingGuidelines = {
  letterDelay: {
    fast: "20-40ms - Quick, snappy animations",
    normal: "50-70ms - Balanced, readable animations",
    slow: "80-120ms - Elegant, deliberate animations",
  },
  waveAmplitude: {
    subtle: "4-6px - Gentle, professional wave",
    moderate: "8-12px - Noticeable but not distracting",
    dramatic: "15-25px - Bold, attention-grabbing effect",
  },
  duration: {
    quick: "300-500ms - Fast, energetic feel",
    standard: "600-800ms - Balanced animation timing",
    slow: "900-1200ms - Elegant, luxurious feel",
  },
};

// Best practices for different contexts
export const bestPractices = {
  hero: "Use bold animations with higher amplitude to create strong first impressions",
  sections:
    "Balance readability with visual interest - moderate settings work best",
  subsections:
    "Keep animations subtle to maintain hierarchy and avoid distraction",
  mobile:
    "Consider reducing animation intensity on mobile devices for better performance",
  accessibility: "Always respect user's reduced motion preferences",
  performance: "Use GPU acceleration and optimize for 60fps on all devices",
};

// Usage examples
export const usageExamples = `
// Basic usage with preset
<AnimatedSectionHeading
  text="About Me"
  className="text-5xl font-bold"
  gradientClassName="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
  animationConfig={headingPresets.section.animationConfig}
/>

// Custom configuration
<AnimatedSectionHeading
  text="Custom Heading"
  className="text-4xl font-bold"
  animationConfig={{
    letterDelay: 60,
    waveAmplitude: 10,
    duration: 700
  }}
  motionProps={{
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  }}
/>
`;
