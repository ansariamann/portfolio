/**
 * Animation-related type definitions
 */

export interface AnimationVariant {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}

export interface StaggerConfig {
  delayChildren?: number;
  staggerChildren?: number;
}

export interface AnimationPreset {
  fadeIn: AnimationVariant;
  fadeInUp: AnimationVariant;
  fadeInDown: AnimationVariant;
  fadeInLeft: AnimationVariant;
  fadeInRight: AnimationVariant;
  scaleIn: AnimationVariant;
  slideInUp: AnimationVariant;
  slideInDown: AnimationVariant;
  slideInLeft: AnimationVariant;
  slideInRight: AnimationVariant;
  stagger: StaggerConfig;
}

export interface MotionConfig {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  whileHover?: any;
  whileTap?: any;
  whileInView?: any;
  viewport?: any;
}

export interface ScrollAnimationConfig {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  duration?: number;
}

// Animation constants
export const ANIMATION_PRESETS: AnimationPreset = {
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
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6 },
  },
  slideInUp: {
    initial: { y: 100 },
    animate: { y: 0 },
    transition: { duration: 0.6 },
  },
  slideInDown: {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { duration: 0.6 },
  },
  slideInLeft: {
    initial: { x: -100 },
    animate: { x: 0 },
    transition: { duration: 0.6 },
  },
  slideInRight: {
    initial: { x: 100 },
    animate: { x: 0 },
    transition: { duration: 0.6 },
  },
  stagger: {
    delayChildren: 0.1,
    staggerChildren: 0.1,
  },
};

export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
};

export const ANIMATION_EASE = {
  easeInOut: "easeInOut",
  easeIn: "easeIn",
  easeOut: "easeOut",
  spring: "spring",
};
