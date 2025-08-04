"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

const themes = [
  { key: "light", icon: Sun, label: "Light" },
  { key: "dark", icon: Moon, label: "Dark" },
  { key: "system", icon: Monitor, label: "System" },
] as const;

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function ThemeToggle({
  className,
  showLabel = false,
  size = "md",
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  // Always call hooks at the top level
  let theme: Theme = "system";
  let toggleTheme = () => {};
  let resolvedTheme: ResolvedTheme = "dark";

  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
    resolvedTheme = themeContext.resolvedTheme;
  } catch {
    // ThemeProvider not available during SSR
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm",
          sizes[size],
          showLabel && "gap-2 px-4 py-2 w-auto",
          className
        )}
      >
        <Monitor className="text-gray-700 dark:text-gray-300" />
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            System
          </span>
        )}
      </div>
    );
  }

  const currentTheme = themes.find((t) => t.key === theme) || themes[0];
  const Icon = currentTheme.icon;

  return (
    <motion.div className={cn("relative", className)}>
      <motion.button
        onClick={toggleTheme}
        className={cn(
          "relative flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900",
          sizes[size],
          showLabel && "gap-2 px-4 py-2 w-auto"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${themes[
          (themes.findIndex((t) => t.key === theme) + 1) % themes.length
        ].label.toLowerCase()} theme`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Icon className="text-gray-700 dark:text-gray-300" />
          </motion.div>
        </AnimatePresence>

        {showLabel && (
          <motion.span
            key={theme}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {currentTheme.label}
          </motion.span>
        )}

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 hover:opacity-100"
          initial={false}
          animate={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 0.3,
          }}
        />
      </motion.button>

      {/* Theme indicator dots */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {themes.map((themeOption) => (
          <motion.div
            key={themeOption.key}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              theme === themeOption.key
                ? "bg-blue-500 dark:bg-blue-400"
                : "bg-gray-300 dark:bg-gray-600"
            )}
            animate={{
              scale: theme === themeOption.key ? 1.2 : 1,
              opacity: theme === themeOption.key ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 pointer-events-none transition-opacity duration-300 whitespace-nowrap"
        whileHover={{ opacity: 1 }}
      >
        {`Current: ${currentTheme.label}${
          theme === "system" ? ` (${resolvedTheme})` : ""
        }`}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-gray-100" />
      </motion.div>
    </motion.div>
  );
}
