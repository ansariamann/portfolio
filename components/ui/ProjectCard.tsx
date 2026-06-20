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
        "group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface shadow-card transition-all duration-300 cursor-pointer hover:border-accent/30 hover:shadow-card-hover"
      )}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceAnimations ? 0.15 : 0.3,
        delay: index * 0.04,
      }}
      whileHover={shouldReduceAnimations ? {} : { y: -6 }}
      onClick={() => onViewDetails(project)}
    >
      {/* Image */}
      <div className="relative h-[200px] sm:h-[220px] shrink-0 overflow-hidden bg-muted">
        <ProjectImage
          src={project.images?.[0] || "/images/placeholder.svg"}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {project.featured && (
          <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-md">
            <Star size={12} className="fill-current" />
            Featured
          </div>
        )}

        <div className="absolute bottom-4 left-4">
          <span
            className={cn(
              "inline-block h-2.5 w-2.5 rounded-full ring-2 ring-white/60",
              project.status === "completed"
                ? "bg-emerald-400"
                : project.status === "in-progress"
                  ? "bg-amber-400"
                  : "bg-blue-400"
            )}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg sm:text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              {formatDate(project.completedDate, {
                year: "numeric",
                month: "short",
              })}
            </span>
          </div>

          <span className="shrink-0 rounded-full border border-ink/10 bg-ink/[0.04] px-3 py-1.5 text-xs font-semibold capitalize text-muted-foreground">
            {project.category}
          </span>
        </div>

        <p className="mb-5 line-clamp-2 text-[15px] leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="tag !text-[10px] !px-2.5 !py-1">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="rounded-full border border-ink/10 bg-ink/[0.04] px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(project);
            }}
            className="flex items-center gap-1 text-sm font-bold text-accent transition-colors hover:text-accent-hover"
          >
            View Details
          </button>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-primary !text-xs !px-4 !py-2 !min-h-0 !rounded-full"
                title="Live Demo"
              >
                <ExternalLink size={14} />
                Live Site
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-xs font-bold text-muted-foreground transition-all hover:border-accent/30 hover:text-accent"
              title="Source Code"
            >
              <Github size={14} />
              Code
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
