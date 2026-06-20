"use client";

import { cn } from "@/lib/utils";
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
}

interface TechStackProps {
  technologies?: Technology[];
  className?: string;
}

const defaultTechnologies: Technology[] = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
];

export function TechStack({
  technologies = defaultTechnologies,
  className = "",
}: TechStackProps) {
  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="list"
      aria-label="Technology stack"
    >
      {technologies.map((tech) => {
        const Icon = tech.icon;
        return (
          <span
            key={tech.name}
            className="tag inline-flex items-center gap-1.5 py-1"
            role="listitem"
          >
            <Icon
              className="w-3.5 h-3.5 dark:text-inherit"
              style={{ color: tech.color }}
              aria-hidden
            />
            {tech.name}
          </span>
        );
      })}
    </div>
  );
}

export default TechStack;
