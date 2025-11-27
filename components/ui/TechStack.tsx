"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
} from "react-icons/si";
import { IconType } from "react-icons";

interface Technology {
  name: string;
  icon: IconType;
  color: string;
  proficiency: "expert" | "advanced" | "intermediate";
}

interface TechStackProps {
  technologies?: Technology[];
  className?: string;
}

const defaultTechnologies: Technology[] = [
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    proficiency: "advanced",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    proficiency: "advanced",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    proficiency: "intermediate",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
    proficiency: "advanced",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    proficiency: "expert",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#336791",
    proficiency: "advanced",
  },
];

export function TechStack({
  technologies = defaultTechnologies,
  className = "",
}: TechStackProps) {
  const { shouldReduceAnimations, isMobile, isSmallMobile, touchDevice } =
    useMobileOptimizedAnimation();

  const animationProps = shouldReduceAnimations
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.4 },
      };

  return (
    <motion.div {...animationProps} className={`${className}`}>
      <div
        className={cn(
          "flex flex-wrap justify-center lg:justify-start",
          isMobile ? "gap-2" : "gap-4"
        )}
        role="list"
        aria-label="Technology stack and skills"
      >
        {technologies.map((tech, index) => {
          const IconComponent = tech.icon;

          const itemAnimationProps = shouldReduceAnimations
            ? {}
            : {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: {
                  duration: 0.4,
                  delay: 0.5 + index * 0.1,
                  ease: "easeOut" as const,
                },
              };

          const hoverProps =
            shouldReduceAnimations || touchDevice
              ? {}
              : {
                  whileHover: {
                    scale: 1.1,
                    y: -2,
                    transition: { duration: 0.2 },
                  },
                };

          return (
            <motion.div
              key={tech.name}
              {...itemAnimationProps}
              {...hoverProps}
              className={cn(
                "group flex items-center bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300",
                // Enhanced focus styles for accessibility
                "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 focus:ring-offset-slate-900",
                // Mobile-optimized spacing and sizing
                isMobile
                  ? [
                      "gap-1.5 px-2 py-1.5",
                      touchDevice && "active:scale-95 active:bg-white/10",
                    ]
                  : ["gap-2 px-3 py-2"],
                isSmallMobile && "gap-1 px-2 py-1"
              )}
              role="listitem"
              aria-label={`${tech.name} - ${tech.proficiency} proficiency level`}
              tabIndex={0}
            >
              <IconComponent
                className={cn(
                  "transition-colors duration-300",
                  isMobile ? "w-4 h-4" : "w-5 h-5"
                )}
                style={{ color: tech.color }}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-medium text-gray-300 group-hover:text-white transition-colors duration-300",
                  isMobile ? "text-xs" : "text-sm",
                  isSmallMobile && "text-xs"
                )}
              >
                {tech.name}
              </span>

              {/* Proficiency indicator - Hidden on small mobile to save space */}
              {!isSmallMobile && (
                <div className={cn("flex gap-1", isMobile ? "ml-0.5" : "ml-1")}>
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        "rounded-full transition-colors duration-300",
                        isMobile ? "w-0.5 h-0.5" : "w-1 h-1",
                        (tech.proficiency === "expert" && level <= 3) ||
                          (tech.proficiency === "advanced" && level <= 2) ||
                          (tech.proficiency === "intermediate" && level <= 1)
                          ? "bg-blue-400"
                          : "bg-gray-600"
                      )}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
