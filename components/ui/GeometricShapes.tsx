"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
// Removed performance optimization imports

interface Shape {
  id: string;
  type: "triangle" | "circle" | "line" | "square";
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
  parallaxStrength: number;
}

interface GeometricShapesProps {
  isInView: boolean;
  scrollProgress: number;
  className?: string;
  shapeCount?: number;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#3B82F620", // blue-500 with opacity
  "#8B5CF620", // violet-500 with opacity
  "#06B6D420", // cyan-500 with opacity
  "#10B98120", // emerald-500 with opacity
  "#F59E0B20", // amber-500 with opacity
];

export const GeometricShapes: React.FC<GeometricShapesProps> = ({
  isInView,
  scrollProgress,
  className = "",
  shapeCount = 8,
  colors = DEFAULT_COLORS,
}) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cleanupTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Simple shape count optimization
  const optimizedShapeCount = Math.min(shapeCount, 8);

  // Initialize shapes with performance optimization
  useEffect(() => {
    if (!isInView) return;

    // Get viewport dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({ width, height });

    const initialShapes: Shape[] = Array.from(
      { length: optimizedShapeCount },
      (_, index) => ({
        id: `shape-${index}`,
        type: ["triangle", "circle", "line", "square"][
          Math.floor(Math.random() * 4)
        ] as Shape["type"],
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 60 + 20, // 20-80px
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4
        color: colors[Math.floor(Math.random() * colors.length)],
        parallaxStrength: Math.random() * 0.5 + 0.2, // 0.2-0.7
      })
    );

    setShapes(initialShapes);
  }, [isInView, optimizedShapeCount, colors]);

  // Optimized resize handler
  const handleResize = useCallback(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Handle resize
  useEffect(() => {
    const throttledResizeHandler = () => {
      requestAnimationFrame(handleResize);
    };
    window.addEventListener("resize", throttledResizeHandler);

    return () => {
      window.removeEventListener("resize", throttledResizeHandler);
    };
  }, [handleResize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupTimersRef.current.forEach(clearTimeout);
      cleanupTimersRef.current = [];
    };
  }, []);

  const renderShape = useCallback(
    (shape: Shape) => {
      // Simple parallax effect
      const parallaxY = scrollProgress * 100 * shape.parallaxStrength;
      const parallaxX = scrollProgress * 50 * shape.parallaxStrength * 0.5;

      const gpuStyles = {
        willChange: "transform",
        transform: "translateZ(0)",
      };

      const shapeProps = {
        style: {
          ...gpuStyles,
          transform: `translate(${shape.x + parallaxX}px, ${
            shape.y + parallaxY
          }px)`,
        },
        animate: {
          rotate: [shape.rotation, shape.rotation + 360],
          scale: [1, 1.1, 1],
          opacity: [shape.opacity, shape.opacity * 1.5, shape.opacity],
        },
        transition: {
          duration: 8 + Math.random() * 4, // 8-12 seconds
          repeat: Infinity,
          ease: "linear" as const,
        },
      };

      switch (shape.type) {
        case "triangle":
          return (
            <motion.div key={shape.id} className="absolute" {...shapeProps}>
              <svg width={shape.size} height={shape.size} viewBox="0 0 100 100">
                <polygon
                  points="50,10 90,90 10,90"
                  fill={shape.color}
                  stroke={shape.color.replace("20", "40")}
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          );

        case "circle":
          return (
            <motion.div
              key={shape.id}
              className="absolute rounded-full border"
              style={{
                ...shapeProps.style,
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                borderColor: shape.color.replace("20", "40"),
                borderWidth: "1px",
              }}
              animate={shapeProps.animate}
              transition={shapeProps.transition}
            />
          );

        case "line":
          return (
            <motion.div key={shape.id} className="absolute" {...shapeProps}>
              <svg width={shape.size} height="2" viewBox="0 0 100 2">
                <line
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  stroke={shape.color.replace("20", "60")}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          );

        case "square":
          return (
            <motion.div
              key={shape.id}
              className="absolute border"
              style={{
                ...shapeProps.style,
                width: shape.size,
                height: shape.size,
                backgroundColor: shape.color,
                borderColor: shape.color.replace("20", "40"),
                borderWidth: "1px",
              }}
              animate={shapeProps.animate}
              transition={shapeProps.transition}
            />
          );

        default:
          return null;
      }
    },
    [scrollProgress]
  );

  if (!isInView) return null;

  // Apply GPU acceleration
  const containerStyles = {
    willChange: "transform",
    transform: "translateZ(0)",
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={containerStyles}
    >
      {shapes.map(renderShape)}

      {/* Additional floating geometric elements */}
      <motion.div
        className="absolute top-1/4 left-1/4"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translateY(${scrollProgress * 30}px)`,
          willChange: "transform",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="#3B82F630"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-3/4 right-1/4"
        animate={{
          x: [0, 15, 0],
          rotate: [0, -90, -180],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translateY(${scrollProgress * -40}px)`,
          willChange: "transform",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <polygon
            points="15,5 25,25 5,25"
            fill="none"
            stroke="#8B5CF630"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/3"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translate(${scrollProgress * 20}px, ${
            scrollProgress * -25
          }px)`,
          willChange: "transform",
        }}
      >
        <svg width="25" height="25" viewBox="0 0 25 25">
          <rect
            x="2"
            y="2"
            width="21"
            height="21"
            fill="none"
            stroke="#10B98130"
            strokeWidth="2"
            rx="3"
          />
        </svg>
      </motion.div>

      {/* Parallax lines */}
      <motion.div
        className="absolute top-0 left-1/2"
        style={{
          transform: `translateX(-50%) translateY(${scrollProgress * 60}px)`,
          willChange: "transform",
        }}
      >
        <svg width="200" height="2" viewBox="0 0 200 2">
          <line
            x1="0"
            y1="1"
            x2="200"
            y2="1"
            stroke="#06B6D420"
            strokeWidth="1"
            strokeDasharray="10,5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-1/6"
        style={{
          transform: `translateY(${scrollProgress * -35}px)`,
          willChange: "transform",
        }}
      >
        <svg width="150" height="2" viewBox="0 0 150 2">
          <line
            x1="0"
            y1="1"
            x2="150"
            y2="1"
            stroke="#F59E0B20"
            strokeWidth="1"
            strokeDasharray="8,3"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default GeometricShapes;
