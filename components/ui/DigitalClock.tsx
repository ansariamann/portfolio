"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface DigitalClockProps {
  className?: string;
  showSeconds?: boolean;
  format24Hour?: boolean;
  showDate?: boolean;
}

export default function DigitalClock({
  className = "",
  showSeconds = true,
  format24Hour = true,
  showDate = false,
}: DigitalClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let ampm = "";

    if (!format24Hour) {
      ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
    }

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    let timeString = `${formattedHours}:${formattedMinutes}`;

    if (showSeconds) {
      timeString += `:${formattedSeconds}`;
    }

    if (!format24Hour) {
      timeString += ` ${ampm}`;
    }

    return timeString;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      className={`font-mono text-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Digital Clock Display */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg blur-sm opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Main time display */}
        <div className="relative bg-black/20 backdrop-blur-sm border border-green-400/30 rounded-lg px-3 py-2">
          <motion.span
            className="text-green-400 font-bold tracking-wider"
            key={formatTime(time)} // Re-animate on time change
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {formatTime(time)}
          </motion.span>

          {/* Blinking colon effect for seconds */}
          {showSeconds && (
            <motion.span
              className="text-green-300 ml-1"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              •
            </motion.span>
          )}
        </div>

        {/* Optional date display */}
        {showDate && (
          <motion.div
            className="mt-1 text-xs text-gray-400 font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {formatDate(time)}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// Export a simplified version for header use
export function HeaderClock({ isScrolled }: { isScrolled: boolean }) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Show placeholder during hydration
  if (!mounted) {
    return (
      <div className="font-mono text-sm sm:text-base font-bold min-w-max">
        <div className="relative bg-black/30 backdrop-blur-sm border border-blue-400/40 rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center space-x-1">
            <span
              className={`transition-colors duration-300 ${
                isScrolled ? "text-blue-600" : "text-blue-400"
              }`}
            >
              ⚡
            </span>
            <span
              className={`font-mono font-bold tracking-wider transition-colors duration-300 ${
                isScrolled ? "text-slate-800" : "text-blue-300"
              }`}
              style={{
                fontFamily: '"Courier New", "Lucida Console", monospace',
                letterSpacing: "0.1em",
                minWidth: "5rem",
              }}
            >
              --:--:--
            </span>
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isScrolled ? "bg-blue-600" : "bg-blue-400"
              }`}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm sm:text-base font-bold min-w-max">
      {/* Digital clock container - Optimized for mobile */}
      <div className="relative group">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Main clock display - Fixed positioning optimized */}
        <div className="relative bg-black/30 backdrop-blur-sm border border-blue-400/40 rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center space-x-1">
            {/* Digital clock icon */}
            <span
              className={`transition-colors duration-300 ${
                isScrolled ? "text-blue-600" : "text-blue-400"
              }`}
            >
              ⚡
            </span>

            {/* Time display */}
            <span
              className={`font-mono font-bold tracking-wider transition-colors duration-300 ${
                isScrolled
                  ? "text-slate-800 group-hover:text-blue-600"
                  : "text-blue-300 group-hover:text-blue-200"
              }`}
              style={{
                fontFamily: '"Courier New", "Lucida Console", monospace',
                letterSpacing: "0.1em",
                minWidth: "5rem",
              }}
            >
              {formatTime(time)}
            </span>

            {/* Blinking indicator - CSS animation for better performance */}
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                isScrolled ? "bg-blue-600" : "bg-blue-400"
              }`}
              style={{
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
