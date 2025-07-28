import { ReactNode } from "react";
import { Project, Skill, TimelineItem, Achievement } from "./core";

// Navigation and Layout Component Types

/**
 * Navigation menu item configuration
 * Used for header navigation and mobile menu
 */
export interface NavigationItem {
  /** Display text for the navigation item */
  label: string;
  /** URL or section ID to navigate to */
  href: string;
  /** Optional icon component to display */
  icon?: React.ComponentType;
  /** Whether this navigation item is currently active */
  isActive?: boolean;
}

/**
 * Base layout component props
 * Used for main layout wrapper components
 */
export interface LayoutProps {
  /** Child components to render inside the layout */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Section component props for main page sections
 * Provides consistent structure for Hero, About, Skills, etc.
 */
export interface SectionProps {
  /** HTML id attribute for navigation anchoring */
  id?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Child components to render inside the section */
  children: ReactNode;
  /** Whether to enable scroll-triggered animations */
  animate?: boolean;
}

// UI Components

/**
 * Button component props with multiple variants and sizes
 * Supports both button and link functionality
 */
export interface ButtonProps {
  /** Content to display inside the button */
  children: ReactNode;
  /** Visual style variant of the button */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size of the button */
  size?: "sm" | "md" | "lg";
  /** Additional CSS classes to apply */
  className?: string;
  /** Click handler function */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
  /** Optional href to make button behave as a link */
  href?: string;
  /** Link target attribute when href is provided */
  target?: "_blank" | "_self";
}

/**
 * Card component props for consistent card styling
 * Used for project cards, skill cards, etc.
 */
export interface CardProps {
  /** Additional CSS classes to apply */
  className?: string;
  /** Content to display inside the card */
  children: ReactNode;
  /** Whether to enable hover effects */
  hover?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
}

/**
 * Modal component props for overlay dialogs
 * Used for project details, image galleries, etc.
 */
export interface ModalProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Function to call when modal should be closed */
  onClose: () => void;
  /** Content to display inside the modal */
  children: ReactNode;
  /** Optional title for the modal header */
  title?: string;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Form field component props for consistent form inputs
 * Supports various input types with validation
 */
export interface FormFieldProps {
  /** Label text for the form field */
  label: string;
  /** Name attribute for the input */
  name: string;
  /** Type of input field */
  type?: "text" | "email" | "textarea" | "select";
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Current value of the input */
  value?: string;
  /** Change handler function */
  onChange?: (value: string) => void;
  /** Options for select inputs */
  options?: { value: string; label: string }[];
}

// Section-specific Props

/**
 * Props for the Hero section component
 * Configures the main landing section with title, description, and CTAs
 */
export interface HeroSectionProps {
  /** Main heading text */
  title: string;
  /** Secondary heading text */
  subtitle: string;
  /** Descriptive paragraph text */
  description: string;
  /** Call-to-action button configuration */
  ctaButtons: {
    /** Primary action button (e.g., "View Projects") */
    primary: { text: string; href: string };
    /** Secondary action button (e.g., "Contact Me") */
    secondary: { text: string; href: string };
  };
  /** Optional background image URL */
  backgroundImage?: string;
}

/**
 * Props for the Skills section component
 * Configures skill display with various visualization modes
 */
export interface SkillsSectionProps {
  /** Array of skills to display */
  skills: Skill[];
  /** Visual presentation mode for skills */
  displayMode?: "cards" | "bubbles" | "progress" | "code-editor";
  /** Whether to group skills by categories */
  showCategories?: boolean;
  /** Base delay for staggered animations in milliseconds */
  animationDelay?: number;
}

/**
 * Props for the Projects section component
 * Configures project showcase with filtering and pagination
 */
export interface ProjectsSectionProps {
  /** Array of projects to display */
  projects: Project[];
  /** Whether to show category filter buttons */
  showFilters?: boolean;
  /** Number of projects to show per page */
  itemsPerPage?: number;
  /** Default category to filter by on load */
  defaultCategory?: Project["category"];
}

/**
 * Props for the About section component
 * Configures personal introduction with timeline and achievements
 */
export interface AboutSectionProps {
  /** Personal introduction text */
  introduction: string;
  /** Optional timeline of career milestones */
  timeline?: TimelineItem[];
  /** Optional achievement statistics */
  achievements?: Achievement[];
  /** Optional personal/professional photo URL */
  personalImage?: string;
}
