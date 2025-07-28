// Core domain interfaces

/**
 * Represents a project in the portfolio
 * Used for displaying project information in the projects section
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Display title of the project */
  title: string;
  /** Brief description shown in project cards */
  description: string;
  /** Detailed description shown in project modals */
  longDescription?: string;
  /** Array of technologies/frameworks used in the project */
  technologies: string[];
  /** Project category for filtering and organization */
  category: "web" | "mobile" | "desktop" | "other";
  /** Array of image URLs for project screenshots */
  images: string[];
  /** URL to the live/deployed version of the project */
  liveUrl?: string;
  /** URL to the project's GitHub repository */
  githubUrl: string;
  /** Whether this project should be featured prominently */
  featured: boolean;
  /** Date when the project was completed */
  completedDate: Date;
  /** Current status of the project */
  status: "completed" | "in-progress" | "planned";
  /** Key achievements or features of the project */
  highlights?: string[];
  /** Technical or design challenges faced during development */
  challenges?: string[];
  /** Key learnings or skills gained from the project */
  learnings?: string[];
}

/**
 * Represents a technical skill or technology
 * Used for displaying skills in the skills section with proficiency levels
 */
export interface Skill {
  /** Unique identifier for the skill */
  id: string;
  /** Display name of the skill/technology */
  name: string;
  /** Category for grouping skills in the UI */
  category:
    | "frontend"
    | "backend"
    | "tools"
    | "languages"
    | "databases"
    | "cloud";
  /** Proficiency level from 1 (beginner) to 5 (expert) */
  proficiency: 1 | 2 | 3 | 4 | 5;
  /** Icon identifier or URL for visual representation */
  icon: string;
  /** Optional detailed description of skill usage */
  description?: string;
  /** Years of experience with this technology */
  yearsOfExperience?: number;
  /** Brand color for visual consistency */
  color?: string;
  /** Array of related skill IDs for cross-referencing */
  relatedSkills?: string[];
}

/**
 * Contact form data structure for form submissions
 * Used with React Hook Form and Zod validation
 */
export interface ContactForm {
  /** Full name of the person contacting */
  name: string;
  /** Email address for response */
  email: string;
  /** Optional company name */
  company?: string;
  /** Subject line for the message */
  subject: string;
  /** Main message content */
  message: string;
}

/**
 * Contact form validation errors
 * Maps form field names to error messages
 */
export interface ContactFormErrors {
  /** Name field validation error */
  name?: string;
  /** Email field validation error */
  email?: string;
  /** Company field validation error */
  company?: string;
  /** Subject field validation error */
  subject?: string;
  /** Message field validation error */
  message?: string;
}

/**
 * Timeline item for the About section
 * Represents career milestones, education, and achievements
 */
export interface TimelineItem {
  /** Unique identifier for the timeline item */
  id: string;
  /** Title of the milestone or position */
  title: string;
  /** Company or institution name (optional) */
  company?: string;
  /** Time period (e.g., "2022 - Present", "Summer 2023") */
  period: string;
  /** Detailed description of the experience */
  description: string;
  /** Technologies or skills used/learned (optional) */
  technologies?: string[];
  /** Type of timeline item for styling and categorization */
  type: "education" | "work" | "project" | "achievement";
}

/**
 * Achievement or statistic for the About section
 * Used for animated counters and highlights
 */
export interface Achievement {
  /** Unique identifier for the achievement */
  id: string;
  /** Display title of the achievement */
  title: string;
  /** Description explaining the achievement */
  description: string;
  /** Numeric or string value to display (e.g., "50+", 1000) */
  value: string | number;
  /** Optional emoji or icon identifier */
  icon?: string;
  /** Optional color for theming */
  color?: string;
}

/**
 * Social media link configuration
 * Used in footer and contact sections
 */
export interface SocialLink {
  /** Platform name (e.g., "GitHub", "LinkedIn") */
  name: string;
  /** Full URL to the profile */
  url: string;
  /** Icon identifier for rendering */
  icon: string;
  /** Optional brand color for styling */
  color?: string;
}

/**
 * Contact information configuration
 * Centralizes all contact-related data
 */
export interface ContactInfo {
  /** Primary email address */
  email: string;
  /** Optional phone number */
  phone?: string;
  /** Current location or availability */
  location: string;
  /** Array of social media links */
  socialLinks: SocialLink[];
  /** Current availability status */
  availability: string;
}

/**
 * SEO metadata configuration
 * Used for meta tags and structured data
 */
export interface SEOMetadata {
  /** Page title for SEO */
  title: string;
  /** Meta description */
  description: string;
  /** SEO keywords array */
  keywords: string[];
  /** Author name */
  author: string;
  /** Open Graph image URL (optional) */
  ogImage?: string;
  /** Canonical URL (optional) */
  canonicalUrl?: string;
  /** JSON-LD structured data (optional) */
  structuredData?: Record<string, any>;
}

/**
 * Main site configuration
 * Central configuration object for the entire website
 */
export interface SiteConfig {
  /** Site name */
  name: string;
  /** Full site title */
  title: string;
  /** Site description */
  description: string;
  /** Site URL */
  url: string;
  /** Author information */
  author: {
    /** Full name */
    name: string;
    /** Contact email */
    email: string;
    /** Professional title */
    title: string;
    /** Bio/description */
    bio: string;
    /** Profile image path */
    image: string;
  };
  /** Contact information */
  contact: ContactInfo;
  /** SEO configuration */
  seo: SEOMetadata;
}
