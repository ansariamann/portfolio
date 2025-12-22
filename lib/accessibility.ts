/**
 * Accessibility utilities for the coding platforms integration
 * Provides functions for color contrast, screen reader support, and keyboard navigation
 */

/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return 1; // Return minimum contrast if colors can't be parsed
  }

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 * AA requires 4.5:1 for normal text, 3:1 for large text
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Check if color combination meets WCAG AAA standards
 * AAA requires 7:1 for normal text, 4.5:1 for large text
 */
export function meetsWCAGAAA(
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  return isLargeText ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Get accessible text color (black or white) for a given background
 */
export function getAccessibleTextColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio("#ffffff", backgroundColor);
  const blackContrast = getContrastRatio("#000000", backgroundColor);

  return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}

/**
 * Ensure a color meets minimum contrast requirements
 * Returns an adjusted color if needed
 */
export function ensureContrast(
  foreground: string,
  background: string,
  targetRatio: number = 4.5
): string {
  const currentRatio = getContrastRatio(foreground, background);

  if (currentRatio >= targetRatio) {
    return foreground; // Already meets requirements
  }

  // Try to darken or lighten the foreground color
  const rgb = hexToRgb(foreground);
  if (!rgb) return foreground;

  // Determine if we should darken or lighten
  const backgroundRgb = hexToRgb(background);
  if (!backgroundRgb) return foreground;

  const backgroundLum = getLuminance(
    backgroundRgb.r,
    backgroundRgb.g,
    backgroundRgb.b
  );
  const shouldDarken = backgroundLum > 0.5;

  // Adjust color iteratively
  let adjustedColor = foreground;
  let iterations = 0;
  const maxIterations = 20;

  while (
    getContrastRatio(adjustedColor, background) < targetRatio &&
    iterations < maxIterations
  ) {
    const currentRgb = hexToRgb(adjustedColor);
    if (!currentRgb) break;

    const adjustment = shouldDarken ? -10 : 10;
    const newR = Math.max(0, Math.min(255, currentRgb.r + adjustment));
    const newG = Math.max(0, Math.min(255, currentRgb.g + adjustment));
    const newB = Math.max(0, Math.min(255, currentRgb.b + adjustment));

    adjustedColor = `#${newR.toString(16).padStart(2, "0")}${newG
      .toString(16)
      .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
    iterations++;
  }

  return adjustedColor;
}

/**
 * Generate screen reader friendly text for statistics
 */
export function generateStatsSummary(stats: {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  currentStreak: number;
  longestStreak: number;
  ranking?: number;
  acceptanceRate?: number;
}): string {
  const {
    totalSolved,
    easy,
    medium,
    hard,
    currentStreak,
    longestStreak,
    ranking,
    acceptanceRate,
  } = stats;

  let summary = `Statistics summary: ${totalSolved} total problems solved. `;
  summary += `Difficulty breakdown: ${easy} easy problems (${(
    (easy / totalSolved) *
    100
  ).toFixed(1)}%), `;
  summary += `${medium} medium problems (${(
    (medium / totalSolved) *
    100
  ).toFixed(1)}%), `;
  summary += `and ${hard} hard problems (${((hard / totalSolved) * 100).toFixed(
    1
  )}%). `;
  summary += `Current streak: ${currentStreak} days. Longest streak: ${longestStreak} days. `;

  if (ranking) {
    summary += `Global ranking: ${ranking.toLocaleString()}. `;
  }

  if (acceptanceRate) {
    summary += `Acceptance rate: ${acceptanceRate.toFixed(1)}%. `;
  }

  return summary;
}

/**
 * Generate screen reader friendly text for achievements
 */
export function generateAchievementsSummary(
  achievements: Array<{
    title: string;
    category: string;
    rarity?: string;
    earnedDate: Date;
  }>
): string {
  if (achievements.length === 0) {
    return "No achievements earned yet.";
  }

  const categories = Array.from(new Set(achievements.map((a) => a.category)));
  const rarities = achievements.filter((a) => a.rarity).map((a) => a.rarity!);
  const recentAchievements = achievements
    .sort((a, b) => b.earnedDate.getTime() - a.earnedDate.getTime())
    .slice(0, 3);

  let summary = `${achievements.length} achievements earned across ${
    categories.length
  } categories: ${categories.join(", ")}. `;

  if (rarities.length > 0) {
    const rarityCount = rarities.reduce((acc, rarity) => {
      acc[rarity] = (acc[rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const rarityText = Object.entries(rarityCount)
      .map(([rarity, count]) => `${count} ${rarity}`)
      .join(", ");
    summary += `Rarity distribution: ${rarityText}. `;
  }

  summary += `Most recent achievements: ${recentAchievements
    .map((a) => a.title)
    .join(", ")}.`;

  return summary;
}

/**
 * Generate screen reader friendly text for activity heatmap
 */
export function generateHeatmapSummary(
  activities: Array<{ solvedDate: Date; count?: number }>,
  timePeriod: "month" | "quarter" | "year"
): string {
  if (activities.length === 0) {
    return `No coding activity in the selected ${timePeriod}.`;
  }

  const totalProblems = activities.reduce(
    (sum, day) => sum + (day.count || 1),
    0
  );
  const activeDays = activities.filter((day) => (day.count || 1) > 0).length;
  const averagePerDay = totalProblems / activeDays;

  // Find streaks
  const sortedDates = activities.map((a) => a.solvedDate.toDateString()).sort();

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i - 1]);
    const currentDate = new Date(sortedDates[i]);
    const dayDiff =
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

    if (dayDiff === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak);

  // Check if today is part of current streak
  const today = new Date().toDateString();
  const lastActivityDate = sortedDates[sortedDates.length - 1];
  const daysSinceLastActivity =
    (new Date(today).getTime() - new Date(lastActivityDate).getTime()) /
    (1000 * 60 * 60 * 24);

  if (daysSinceLastActivity <= 1) {
    currentStreak = tempStreak;
  }

  let summary = `Activity summary for ${timePeriod}: ${totalProblems} problems solved across ${activeDays} active days. `;
  summary += `Average of ${averagePerDay.toFixed(1)} problems per active day. `;
  summary += `Longest streak: ${longestStreak} consecutive days. `;

  if (currentStreak > 0) {
    summary += `Current streak: ${currentStreak} days. `;
  }

  return summary;
}

/**
 * Keyboard navigation helper for grid/list components
 */
export function handleGridNavigation(
  event: React.KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  columns: number,
  onNavigate: (newIndex: number) => void
): boolean {
  const { key } = event;
  let newIndex = currentIndex;

  switch (key) {
    case "ArrowRight":
      newIndex = Math.min(currentIndex + 1, totalItems - 1);
      break;
    case "ArrowLeft":
      newIndex = Math.max(currentIndex - 1, 0);
      break;
    case "ArrowDown":
      newIndex = Math.min(currentIndex + columns, totalItems - 1);
      break;
    case "ArrowUp":
      newIndex = Math.max(currentIndex - columns, 0);
      break;
    case "Home":
      newIndex = 0;
      break;
    case "End":
      newIndex = totalItems - 1;
      break;
    default:
      return false; // Key not handled
  }

  if (newIndex !== currentIndex) {
    event.preventDefault();
    onNavigate(newIndex);
    return true;
  }

  return false;
}

/**
 * Announce changes to screen readers
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
): void {
  if (typeof window === "undefined") return;

  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Trap focus within a container
   */
  trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  },

  /**
   * Save and restore focus
   */
  saveFocus(): () => void {
    const activeElement = document.activeElement as HTMLElement;
    return () => {
      activeElement?.focus();
    };
  },
};
