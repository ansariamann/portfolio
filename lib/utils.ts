import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * Utility function to merge Tailwind CSS classes intelligently
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Development-only debug logger. No-op in production.
 */
export function debugLog(...args: unknown[]): void {
  if (process.env.NODE_ENV === "development") {
    // Use console.debug for development-only logs
    // eslint-disable-next-line no-console
    console.debug(...args);
  }
}

// Animation variants for consistent animations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Navigation utilities

/**
 * Smoothly scrolls to a section on the page
 * @param sectionId - CSS selector or ID of the target section (e.g., "#about")
 */
export function scrollToSection(sectionId: string): void {
  const element = document.querySelector(sectionId);
  if (element) {
    // Fallback calculation for more precise offset control
    const headerOffset = 80; // approximate header height in px
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// Viewport utilities

/**
 * Checks if an element is currently visible in the viewport
 * @param element - DOM element to check
 * @returns True if element is fully visible in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// String utilities

/**
 * Truncates text to a specified length and adds ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Converts text to URL-friendly slug format
 * @param text - Text to convert to slug
 * @returns URL-safe slug string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Capitalizes the first letter of a string
 * @param text - Text to capitalize
 * @returns Text with first letter capitalized
 */
export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Date utilities

/**
 * Formats a date using Intl.DateTimeFormat with customizable options
 * @param date - Date object to format
 * @param options - Optional Intl.DateTimeFormatOptions to override defaults
 * @returns Formatted date string (e.g., "January 15, 2024")
 */
export function formatDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", {
    ...defaultOptions,
    ...options,
  }).format(date);
}

/**
 * Returns a human-readable relative time string (e.g., "2 hours ago")
 * @param date - Date to compare against current time
 * @returns Relative time string or "just now" for recent dates
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Time intervals in seconds for calculating relative time
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  // Find the largest interval that fits and return formatted string
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

// Array utilities

/**
 * Groups array items by a specified key
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Object with grouped items
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Sorts array by a specified key in ascending or descending order
 * @param array - Array to sort
 * @param key - Key to sort by
 * @param direction - Sort direction ("asc" or "desc")
 * @returns New sorted array
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

// Performance utilities

/**
 * Creates a debounced function that delays invoking func until after wait milliseconds
 * @param func - Function to debounce
 * @param wait - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Creates a throttled function that only invokes func at most once per limit milliseconds
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Local storage utilities with error handling

/**
 * Safely retrieves and parses data from localStorage
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist or parsing fails
 * @returns Parsed value or default value
 */
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely stores data in localStorage with JSON serialization
 * @param key - Storage key
 * @param value - Value to store
 */
export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
}

// URL utilities

/**
 * Validates if a string is a valid URL
 * @param string - String to validate
 * @returns True if valid URL, false otherwise
 */
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the base URL for the application
 * @returns Base URL string
 */
export function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}
