"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function PerformanceToggle() {
  const togglePerformanceMonitor = () => {
    const currentState = localStorage.getItem("show-performance-monitor") === "true";
    localStorage.setItem("show-performance-monitor", (!currentState).toString());
    // Trigger a custom event to notify the PerformanceMonitor component
    window.dispatchEvent(new CustomEvent('performance-monitor-toggle'));
  };

  return (
    <motion.button
      onClick={togglePerformanceMonitor}
      className="fixed bottom-4 right-4 z-40 p-3 bg-black/90 backdrop-blur-sm text-white rounded-full border border-gray-700 hover:border-blue-400/50 transition-all duration-300 shadow-xl"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      title="Toggle Performance Monitor (Ctrl+Shift+P)"
      aria-label="Toggle Performance Monitor"
    >
      <Activity size={20} className="text-blue-400" />
      
      {/* Pulse animation for attention */}
      <motion.div
        className="absolute inset-0 bg-blue-400/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
}
