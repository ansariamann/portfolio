/**
 * Central export file for all type definitions
 * Re-exports types from individual modules for easy importing
 */

// Coding platforms types removed - feature not implemented

// Certification types
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl?: string;
  badgeImage: string;
  category: "technical" | "professional" | "academic" | "cloud";
  skills: string[];
  description: string;
  featured: boolean;
}

export const CERTIFICATION_CATEGORIES = {
  technical: "Technical",
  professional: "Professional",
  academic: "Academic",
  cloud: "Cloud & DevOps",
} as const;

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: "web" | "mobile" | "desktop" | "other";
  images: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  highlights?: string[];
  challenges?: string[];
  learnings?: string[];
  status?: "completed" | "in-progress" | "planned";
  startDate?: Date;
  endDate?: Date;
  completedDate: Date;
}

// Skills types
export interface Skill {
  id: string;
  name: string;
  category:
    | "frontend"
    | "backend"
    | "tools"
    | "languages"
    | "databases"
    | "cloud";
  proficiency: 1 | 2 | 3 | 4 | 5;
  icon: string;
  description?: string;
  yearsOfExperience?: number;
  projects?: string[];
  color?: string;
  relatedSkills?: string[];
}

export const SKILL_CATEGORIES = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & Technologies",
  languages: "Programming Languages",
  databases: "Databases",
  cloud: "Cloud & DevOps",
} as const;

// About/Timeline types
export interface TimelineItem {
  id: string;
  title: string;
  company?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  description: string;
  technologies?: string[];
  type: "education" | "work" | "project" | "achievement";
  current?: boolean;
  period?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: "award" | "certification" | "milestone" | "recognition";
  icon?: string;
  url?: string;
  value?: string | number;
  color?: string;
}

// UI Component types
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

// Core application types
export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface CertificationAnimationConfig {
  staggeredText: {
    letterDelay: number;
    waveAmplitude: number;
    duration: number;
  };
  cinematic: {
    transitionDuration: number;
    speedLineCount: number;
    blurIntensity: number;
  };
  vectors: {
    particleCount: number;
    glowIntensity: number;
    parallaxStrength: number;
  };
}

export interface ResponsiveConfig {
  mobile?: any;
  tablet?: any;
  desktop?: any;
}

// SEO and metadata types
export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  canonicalUrl?: string;
  ogImage?: string;
  structuredData?: any;
}

// Site configuration
export interface SiteConfig {
  name: string;
  title?: string;
  description?: string;
  url: string;
  author?: {
    name: string;
    email: string;
    title: string;
    bio: string;
    image: string;
  };
  seo: SEOConfig;
  contact?: {
    email?: string;
    phone?: string;
    location?: string;
    availability?: string;
    social?: Record<string, string>;
    socialLinks?: Array<{
      name: string;
      url: string;
      icon: string;
      color?: string;
    }>;
  };
}

// Performance monitoring
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fid?: number; // First Input Delay
  ttfb?: number; // Time to First Byte
}

// Error handling
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  eventId?: string;
}

export interface CustomError extends Error {
  code?: string;
  statusCode?: number;
  context?: Record<string, any>;
}
