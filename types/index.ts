// Re-export all types from organized modules
export * from "./core";
export * from "./components";
export * from "./animations";

// Theme configuration
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    section: string;
    container: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

// Breakpoint constants
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Section IDs for navigation
export const SECTION_IDS = {
  hero: "hero",
  about: "about",
  skills: "skills",
  projects: "projects",
  contact: "contact",
} as const;

// Skill categories with display names
export const SKILL_CATEGORIES = {
  frontend: "Frontend",
  backend: "Backend",
  languages: "Languages",
  databases: "Databases",
  tools: "Tools",
  cloud: "Cloud & DevOps",
} as const;

// Project categories with display names
export const PROJECT_CATEGORIES = {
  web: "Web Applications",
  mobile: "Mobile Apps",
  desktop: "Desktop Applications",
  other: "Other Projects",
} as const;
