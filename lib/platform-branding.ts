/**
 * Platform Branding and Visual Assets Configuration
 * Provides comprehensive branding, color schemes, and visual assets for coding platforms
 */

export interface PlatformBranding {
  id: string;
  name: string;
  displayName: string;

  // Visual Identity
  logo: {
    svg: string;
    png?: string;
    favicon?: string;
    width: number;
    height: number;
  };

  // Color Palette
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };

  // Gradients
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };

  // Typography
  typography: {
    fontFamily: string;
    fontWeights: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };

  // Spacing and Layout
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };

  // Border Radius
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };

  // Shadows
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  // Animation
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
    easing: {
      ease: string;
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
}

/**
 * LeetCode Platform Branding
 */
export const leetcodeBranding: PlatformBranding = {
  id: "leetcode",
  name: "LeetCode",
  displayName: "LeetCode",

  logo: {
    svg: "/images/platforms/leetcode-logo.svg",
    width: 32,
    height: 32,
  },

  colors: {
    primary: "#FFA116",
    secondary: "#FF6B35",
    accent: "#FFD700",
    background: "#FFFBF0",
    surface: "#FFFFFF",
    text: {
      primary: "#2D3748",
      secondary: "#4A5568",
      inverse: "#FFFFFF",
    },
    status: {
      success: "#48BB78",
      warning: "#ED8936",
      error: "#F56565",
      info: "#4299E1",
    },
  },

  gradients: {
    primary: "linear-gradient(135deg, #FFA116 0%, #FFD700 100%)",
    secondary: "linear-gradient(135deg, #FF6B35 0%, #FFA116 100%)",
    accent: "linear-gradient(135deg, #FFD700 0%, #FFF2CC 100%)",
    background: "linear-gradient(135deg, #FFFBF0 0%, #FFF8E1 100%)",
  },

  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },

  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(255, 161, 22, 0.05)",
    md: "0 4px 6px -1px rgba(255, 161, 22, 0.1), 0 2px 4px -1px rgba(255, 161, 22, 0.06)",
    lg: "0 10px 15px -3px rgba(255, 161, 22, 0.1), 0 4px 6px -2px rgba(255, 161, 22, 0.05)",
    xl: "0 20px 25px -5px rgba(255, 161, 22, 0.1), 0 10px 10px -5px rgba(255, 161, 22, 0.04)",
  },

  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      ease: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};



/**
 * Platform Branding Registry
 */
export const platformBranding: Record<string, PlatformBranding> = {
  leetcode: leetcodeBranding,
};

/**
 * Get platform branding by ID
 */
export function getPlatformBranding(
  platformId: string
): PlatformBranding | null {
  return platformBranding[platformId] || null;
}

/**
 * Get all available platform brandings
 */
export function getAllPlatformBrandings(): PlatformBranding[] {
  return Object.values(platformBranding);
}

/**
 * Achievement Badge Configuration
 */
export interface AchievementBadgeConfig {
  id: string;
  name: string;
  description: string;
  iconPath: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: "milestone" | "streak" | "contest" | "certificate" | "badge";
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

/**
 * LeetCode Achievement Badges
 */
export const leetcodeAchievementBadges: Record<string, AchievementBadgeConfig> =
  {
    "annual-2024": {
      id: "annual-2024",
      name: "Annual Badge 2024",
      description: "Solved problems consistently throughout 2024",
      iconPath: "/images/badges/leetcode-annual-2024.svg",
      rarity: "rare",
      category: "badge",
      colors: {
        primary: "#FFA116",
        secondary: "#FFD700",
        background: "#FFFBF0",
      },
    },
    "30-days-streak": {
      id: "30-days-streak",
      name: "30 Days Streak",
      description: "Solved at least one problem for 30 consecutive days",
      iconPath: "/images/badges/leetcode-30-days.svg",
      rarity: "epic",
      category: "streak",
      colors: {
        primary: "#FF6B35",
        secondary: "#FFA116",
        background: "#FFF5F0",
      },
    },
    "50-days-streak": {
      id: "50-days-streak",
      name: "50 Days Streak",
      description: "Solved at least one problem for 50 consecutive days",
      iconPath: "/images/badges/leetcode-50-days.svg",
      rarity: "legendary",
      category: "streak",
      colors: {
        primary: "#8B5CF6",
        secondary: "#A855F7",
        background: "#FAF5FF",
      },
    },
    "contest-participant": {
      id: "contest-participant",
      name: "Contest Participant",
      description: "Participated in LeetCode weekly contests",
      iconPath: "/images/badges/leetcode-contest-participant.svg",
      rarity: "common",
      category: "contest",
      colors: {
        primary: "#3B82F6",
        secondary: "#1D4ED8",
        background: "#EFF6FF",
      },
    },
    "contest-rating-1500": {
      id: "contest-rating-1500",
      name: "Contest Rating 1500+",
      description: "Achieved contest rating above 1500",
      iconPath: "/images/badges/leetcode-contest-rating.svg",
      rarity: "rare",
      category: "contest",
      colors: {
        primary: "#F59E0B",
        secondary: "#D97706",
        background: "#FFFBEB",
      },
    },
    "milestone-50": {
      id: "milestone-50",
      name: "50 Problems Club",
      description: "Solved 50 problems milestone",
      iconPath: "/images/badges/leetcode-50.svg",
      rarity: "common",
      category: "milestone",
      colors: {
        primary: "#10B981",
        secondary: "#059669",
        background: "#ECFDF5",
      },
    },
    "milestone-100": {
      id: "milestone-100",
      name: "Century Club",
      description: "Solved 100 problems milestone",
      iconPath: "/images/badges/leetcode-100.svg",
      rarity: "rare",
      category: "milestone",
      colors: {
        primary: "#F59E0B",
        secondary: "#D97706",
        background: "#FFFBEB",
      },
    },
    "milestone-200": {
      id: "milestone-200",
      name: "200 Problems Club",
      description: "Solved 200 problems milestone",
      iconPath: "/images/badges/leetcode-200.svg",
      rarity: "epic",
      category: "milestone",
      colors: {
        primary: "#8B5CF6",
        secondary: "#7C3AED",
        background: "#FAF5FF",
      },
    },
    "milestone-300": {
      id: "milestone-300",
      name: "300 Problems Club",
      description: "Solved 300 problems milestone",
      iconPath: "/images/badges/leetcode-300.svg",
      rarity: "epic",
      category: "milestone",
      colors: {
        primary: "#EF4444",
        secondary: "#DC2626",
        background: "#FEF2F2",
      },
    },
    "milestone-500": {
      id: "milestone-500",
      name: "500 Problems Club",
      description: "Solved 500 problems milestone",
      iconPath: "/images/badges/leetcode-500.svg",
      rarity: "legendary",
      category: "milestone",
      colors: {
        primary: "#7C2D12",
        secondary: "#451A03",
        background: "#FEF7ED",
      },
    },
    "hard-solver": {
      id: "hard-solver",
      name: "Hard Problems Solver",
      description: "Solved 10+ hard difficulty problems",
      iconPath: "/images/badges/leetcode-hard-solver.svg",
      rarity: "epic",
      category: "milestone",
      colors: {
        primary: "#DC2626",
        secondary: "#991B1B",
        background: "#FEF2F2",
      },
    },
  };



/**
 * Get achievement badge configuration
 */
export function getAchievementBadge(
  platformId: string,
  badgeId: string
): AchievementBadgeConfig | null {
  const badges = leetcodeAchievementBadges;

  return badges[badgeId] || null;
}

/**
 * Get all achievement badges for a platform
 */
export function getPlatformAchievementBadges(
  platformId: string
): Record<string, AchievementBadgeConfig> {
  return leetcodeAchievementBadges;
}

/**
 * Rarity color mapping
 */
export const rarityColors = {
  common: {
    primary: "#6B7280",
    secondary: "#4B5563",
    background: "#F9FAFB",
    border: "#D1D5DB",
  },
  rare: {
    primary: "#3B82F6",
    secondary: "#1D4ED8",
    background: "#EFF6FF",
    border: "#BFDBFE",
  },
  epic: {
    primary: "#8B5CF6",
    secondary: "#7C3AED",
    background: "#FAF5FF",
    border: "#C4B5FD",
  },
  legendary: {
    primary: "#F59E0B",
    secondary: "#D97706",
    background: "#FFFBEB",
    border: "#FCD34D",
  },
};

/**
 * Get rarity-based styling
 */
export function getRarityColors(
  rarity: "common" | "rare" | "epic" | "legendary"
) {
  return rarityColors[rarity];
}

/**
 * CSS Custom Properties Generator
 * Generates CSS custom properties for platform branding
 */
export function generatePlatformCSSVariables(platformId: string): string {
  const branding = getPlatformBranding(platformId);
  if (!branding) return "";

  return `
    --platform-primary: ${branding.colors.primary};
    --platform-secondary: ${branding.colors.secondary};
    --platform-accent: ${branding.colors.accent};
    --platform-background: ${branding.colors.background};
    --platform-surface: ${branding.colors.surface};
    --platform-text-primary: ${branding.colors.text.primary};
    --platform-text-secondary: ${branding.colors.text.secondary};
    --platform-text-inverse: ${branding.colors.text.inverse};
    --platform-gradient-primary: ${branding.gradients.primary};
    --platform-gradient-secondary: ${branding.gradients.secondary};
    --platform-gradient-accent: ${branding.gradients.accent};
    --platform-gradient-background: ${branding.gradients.background};
    --platform-shadow-sm: ${branding.shadows.sm};
    --platform-shadow-md: ${branding.shadows.md};
    --platform-shadow-lg: ${branding.shadows.lg};
    --platform-shadow-xl: ${branding.shadows.xl};
  `;
}

/**
 * Tailwind CSS Class Generator
 * Generates Tailwind-compatible classes for platform branding
 */
export function generatePlatformTailwindClasses(
  platformId: string
): Record<string, string> {
  const branding = getPlatformBranding(platformId);
  if (!branding) {
    return {
      bgPrimary: "",
      bgSecondary: "",
      bgAccent: "",
      bgSurface: "",
      textPrimary: "",
      textSecondary: "",
      textInverse: "",
      borderPrimary: "",
      borderSecondary: "",
      gradientPrimary: "",
      gradientSecondary: "",
    };
  }

  return {
    // Background classes
    bgPrimary: `bg-[${branding.colors.primary}]`,
    bgSecondary: `bg-[${branding.colors.secondary}]`,
    bgAccent: `bg-[${branding.colors.accent}]`,
    bgSurface: `bg-[${branding.colors.surface}]`,

    // Text classes
    textPrimary: `text-[${branding.colors.text.primary}]`,
    textSecondary: `text-[${branding.colors.text.secondary}]`,
    textInverse: `text-[${branding.colors.text.inverse}]`,

    // Border classes
    borderPrimary: `border-[${branding.colors.primary}]`,
    borderSecondary: `border-[${branding.colors.secondary}]`,

    // Gradient classes (using arbitrary values)
    gradientPrimary: `bg-gradient-to-r from-[${branding.colors.primary}] to-[${branding.colors.accent}]`,
    gradientSecondary: `bg-gradient-to-r from-[${branding.colors.secondary}] to-[${branding.colors.primary}]`,
  };
}
