"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const Star = ({ x, y, size, delay, hue }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: `hsl(${hue}, 100%, 90%)`,
      boxShadow: `0 0 ${size * 2}px hsl(${hue}, 100%, 80%)`,
    }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: [0, 1, 0.7, 1, 0.9, 1], scale: 1 }}
    transition={{
      duration: Math.random() * 2 + 1.5,
      delay,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    }}
  />
);

export function Background() {
  const stars = useMemo(() => {
    return Array.from({ length: 250 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 70, // Concentrate stars in the upper 70%
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 8,
      hue: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#01000e] via-[#040024] to-[#0b0033]">
      {stars.map((star, i) => (
        <Star key={i} {...star} />
      ))}

      {/* Subtle Aurora Effects */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2/3"
        style={{
          background: "radial-gradient(ellipse at 20% 30%, hsla(260, 100%, 70%, 0.1), transparent 70%)",
        }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-full h-1/2"
        style={{
          background: "radial-gradient(ellipse at 80% 70%, hsla(200, 100%, 60%, 0.15), transparent 70%)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />

      {/* Mountain Landscape Silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        <div 
          className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#0b0033] to-transparent"
        />
        <div
          className="absolute bottom-0 left-[-10%] w-[120%] h-[80%] bg-[#040024] rounded-t-[100%] transform-gpu"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 75% 50%, 50% 25%, 25% 60%, 0 40%)' }}
        />
        <div
          className="absolute bottom-[-5%] left-[-10%] w-[120%] h-[70%] bg-[#01000e] rounded-t-[100%] transform-gpu"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 40%, 80% 30%, 60% 50%, 40% 35%, 20% 55%, 0 45%)' }}
        />
      </div>
    </div>
  );
}

export default Background;
