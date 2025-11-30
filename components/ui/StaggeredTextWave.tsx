"use client";

import React from "react";
import { motion } from "framer-motion";

interface StaggeredTextWaveProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  duration?: number;
  waveIntensity?: number;
}

const StaggeredTextWave: React.FC<StaggeredTextWaveProps> = ({
  text,
  className = "",
  staggerDelay = 0.1,
  duration = 0.8,
  waveIntensity = 0.5,
}) => {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: wordIndex * staggerDelay,
            ease: "easeOut",
          }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: duration * 0.8,
                delay: wordIndex * staggerDelay + charIndex * 0.02,
                ease: "easeOut",
              }}
              whileHover={{
                y: -2 * waveIntensity,
                transition: { duration: 0.2 },
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </div>
  );
};

export default StaggeredTextWave;
