"use client";

import { motion } from "framer-motion";

interface ValuePropositionProps {
  headline: string;
  subheadline: string;
  description: string;
  className?: string;
}

export function ValueProposition({
  headline,
  subheadline,
  description,
  className = "",
}: ValuePropositionProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Animated Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {headline}
          </span>
        </h1>
      </motion.div>

      {/* Subheadline with typing effect or fade */}
      <motion.h2
        className="font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        {subheadline}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        {description}
      </motion.p>
    </div>
  );
}
