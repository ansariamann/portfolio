"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import useAnimationPerformance from "@/lib/hooks/useAnimationPerformance";
import { PERFORMANCE_CONFIG } from "@/lib/certification-animation-config";

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  color: string;
  lifespan: number;
  age: number;
}

interface FloatingParticlesProps {
  isInView: boolean;
  scrollProgress: number;
  particleCount?: number;
  className?: string;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#3B82F6", // blue-500
  "#8B5CF6", // violet-500
  "#06B6D4", // cyan-500
  "#10B981", // emerald-500
  "#F59E0B", // amber-500
];

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  isInView,
  scrollProgress,
  particleCount = 15,
  className = "",
  colors = DEFAULT_COLORS,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cleanupTimersRef = useRef<NodeJS.Timeout[]>([]);

  const {
    requestAnimationFrame,
    cancelAnimationFrame,
    throttledAnimationFrame,
    gpuAcceleration,
    getAdaptiveAnimationConfig,
    memoryCleanup,
    createOptimizedResizeHandler,
  } = useAnimationPerformance();

  // Get adaptive configuration
  const adaptiveConfig = getAdaptiveAnimationConfig();
  const optimizedParticleCount = Math.min(
    particleCount,
    adaptiveConfig.particleCount
  );

  // Initialize particles with performance optimization
  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    setDimensions({ width: rect.width, height: rect.height });

    const initialParticles: Particle[] = Array.from(
      { length: optimizedParticleCount },
      (_, index) => ({
        id: `particle-${index}`,
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 4 + 2, // 2-6px
        opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
        velocityX: (Math.random() - 0.5) * 0.5, // -0.25 to 0.25
        velocityY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        lifespan: Math.random() * 10000 + 5000, // 5-15 seconds
        age: 0,
      })
    );

    setParticles(initialParticles);
  }, [isInView, optimizedParticleCount, colors]);

  // Optimized resize handler
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
  }, []);

  // Handle resize with performance optimization
  useEffect(() => {
    if (!containerRef.current) return;

    const optimizedResizeHandler = createOptimizedResizeHandler(handleResize);
    const resizeObserver = new ResizeObserver(optimizedResizeHandler);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize, createOptimizedResizeHandler, memoryCleanup]);

  // Optimized animation loop with performance monitoring
  useEffect(() => {
    if (!isInView || particles.length === 0) return;

    const animate = (timestamp: number) => {
      setParticles((prevParticles) => {
        return prevParticles.map((particle) => {
          // Update position
          let newX = particle.x + particle.velocityX;
          let newY = particle.y + particle.velocityY;

          // Bounce off edges
          if (newX <= 0 || newX >= dimensions.width) {
            particle.velocityX *= -1;
            newX = Math.max(0, Math.min(dimensions.width, newX));
          }
          if (newY <= 0 || newY >= dimensions.height) {
            particle.velocityY *= -1;
            newY = Math.max(0, Math.min(dimensions.height, newY));
          }

          // Update age with adaptive frame rate
          const frameTime = adaptiveConfig.quality === "low" ? 33 : 16; // 30fps or 60fps
          const newAge = particle.age + frameTime;

          // If particle is too old, respawn it
          if (newAge > particle.lifespan) {
            return {
              ...particle,
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              size: Math.random() * 4 + 2,
              opacity: Math.random() * 0.6 + 0.2,
              velocityX: (Math.random() - 0.5) * 0.5,
              velocityY: (Math.random() - 0.5) * 0.5,
              color: colors[Math.floor(Math.random() * colors.length)],
              lifespan: Math.random() * 10000 + 5000,
              age: 0,
            };
          }

          // Apply scroll-based parallax effect (reduced for low performance)
          const parallaxStrength =
            adaptiveConfig.quality === "low" ? 0.05 : 0.1;
          const parallaxOffset = scrollProgress * 50;

          return {
            ...particle,
            x: newX,
            y: newY + parallaxOffset * parallaxStrength,
            age: newAge,
            opacity: Math.max(
              0.1,
              particle.opacity * (1 - (newAge / particle.lifespan) * 0.3)
            ),
          };
        });
      });

      // Use throttled animation frame for low performance
      if (adaptiveConfig.quality === "low") {
        throttledAnimationFrame(
          "floating-particles",
          animate,
          PERFORMANCE_CONFIG.throttling.scroll * 2
        );
      } else {
        requestAnimationFrame("floating-particles", animate);
      }
    };

    // Start animation loop
    requestAnimationFrame("floating-particles", animate);

    return () => {
      cancelAnimationFrame("floating-particles");
    };
  }, [
    isInView,
    particles.length,
    dimensions,
    scrollProgress,
    colors,
    adaptiveConfig,
    requestAnimationFrame,
    cancelAnimationFrame,
    throttledAnimationFrame,
  ]);

  if (!isInView) return null;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame("floating-particles");
      memoryCleanup.cleanupTimers(cleanupTimersRef.current);
      cleanupTimersRef.current = [];
    };
  }, [cancelAnimationFrame, memoryCleanup]);

  // Apply GPU acceleration based on performance
  const containerStyles = adaptiveConfig.enableGPU
    ? gpuAcceleration.getGPUStyles()
    : gpuAcceleration.removeGPUStyles();

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={containerStyles}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={containerStyles}
      >
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            style={{
              filter:
                adaptiveConfig.blurIntensity > 0
                  ? `blur(${particle.size * 0.2}px)`
                  : "none",
              ...(adaptiveConfig.enableGPU && {
                willChange: "transform, opacity",
              }),
            }}
            animate={
              adaptiveConfig.enableComplexAnimations
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [
                      particle.opacity,
                      particle.opacity * 0.7,
                      particle.opacity,
                    ],
                  }
                : {}
            }
            transition={
              adaptiveConfig.enableComplexAnimations
                ? {
                    duration: 3 * adaptiveConfig.animationDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {}
            }
          />
        ))}
      </svg>
    </div>
  );
};

export default FloatingParticles;
