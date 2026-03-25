"use client";

import { motion } from "framer-motion";
import { Calendar, ExternalLink, Github, Star } from "lucide-react";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { cn, formatDate } from "@/lib/utils";
import { Project } from "@/types";
import ProjectImage from "./ProjectImage";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  index: number;
  isFeatured?: boolean;
}

export default function ProjectCard({
  project,
  onViewDetails,
  index,
}: ProjectCardProps) {
  const { shouldReduceAnimations } = useMobileOptimizedAnimation();

  return (
    <motion.div
      className={cn(
        "group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-border/40 bg-white/60 shadow-sm backdrop-blur-xl transition-all duration-400 cursor-pointer hover:border-primary/30 hover:shadow-xl dark:bg-gray-900/60 sm:flex-row"
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceAnimations ? 0.2 : 0.45,
        delay: index * 0.08,
      }}
      whileHover={shouldReduceAnimations ? {} : { y: -4 }}
      onClick={() => onViewDetails(project)}
    >
      <div className="relative min-h-[140px] shrink-0 overflow-hidden bg-muted sm:w-52 sm:min-h-0 md:w-60">
        <ProjectImage
          src={project.images?.[0] || "/images/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 sm:bg-gradient-to-l" />

        {project.featured && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-md backdrop-blur-sm">
            <Star size={10} className="fill-current" />
            Featured
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full ring-2 ring-white/60",
              project.status === "completed"
                ? "bg-emerald-400"
                : project.status === "in-progress"
                  ? "bg-amber-400"
                  : "bg-blue-400"
            )}
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
              {project.title}
            </h3>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Calendar size={10} />
              {formatDate(project.completedDate, {
                year: "numeric",
                month: "short",
              })}
            </span>
          </div>

          <span className="shrink-0 rounded-full border border-border/50 bg-secondary/80 px-2.5 py-1 text-[11px] font-medium capitalize text-muted-foreground">
            {project.category}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-primary/15 bg-primary/8 px-2 py-0.5 text-[11px] font-medium text-primary dark:bg-primary/10"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-md border border-border/50 bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/40 pt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(project);
            }}
            className="flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View Details
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
                title="Live Demo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={14} />
                Live Site
              </motion.a>
            )}

            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
              title="Source Code"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={14} />
              Code
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
