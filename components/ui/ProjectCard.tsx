"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Star } from "lucide-react";
import { Project } from "@/types";
import { formatDate, cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
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
        "group relative flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden border border-border/40 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-400 cursor-pointer"
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
      {/* Left — Image strip */}
      <div className="relative sm:w-52 md:w-60 shrink-0 overflow-hidden bg-muted min-h-[140px] sm:min-h-0">
        <ProjectImage
          src={project.images?.[0] || "/images/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          priority={index < 3}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 sm:bg-gradient-to-l" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full text-[11px] font-semibold shadow-md backdrop-blur-sm">
            <Star size={10} className="fill-current" />
            Featured
          </div>
        )}

        {/* Status dot */}
        <div className="absolute bottom-3 left-3">
          <span
            className={cn(
              "inline-block w-2 h-2 rounded-full ring-2 ring-white/60",
              project.status === "completed" ? "bg-emerald-400" :
                project.status === "in-progress" ? "bg-amber-400" : "bg-blue-400"
            )}
          />
        </div>
      </div>

      {/* Right — Content */}
      <div className="flex flex-col flex-1 p-5 min-w-0">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug truncate">
              {project.title}
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
              <Calendar size={10} />
              {formatDate(project.completedDate, { year: "numeric", month: "short" })}
            </span>
          </div>

          {/* Category badge */}
          <span className="shrink-0 px-2.5 py-1 rounded-full bg-secondary/80 border border-border/50 text-[11px] font-medium text-muted-foreground capitalize">
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-primary/8 dark:bg-primary/10 text-primary text-[11px] font-medium rounded-md border border-primary/15"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-[11px] font-medium rounded-md border border-border/50">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
          <button
            onClick={(e) => { e.stopPropagation(); onViewDetails(project); }}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            View Details →
          </button>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                title="Live Demo"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={15} />
              </motion.a>
            )}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
              title="Source Code"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={15} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
