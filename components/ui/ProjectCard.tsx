"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar } from "lucide-react";
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
  const { isMobile, touchDevice, shouldReduceAnimations } =
    useMobileOptimizedAnimation();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceAnimations ? 0.3 : 0.5,
        delay: shouldReduceAnimations ? index * 0.05 : index * 0.1,
      },
    },
  };

  // Mobile-optimized animation props
  const hoverProps = shouldReduceAnimations
    ? {}
    : {
      whileHover: touchDevice ? {} : { y: -8, scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { type: "spring" as const, stiffness: 300, damping: 20 },
    };

  return (
    <motion.div
      className={cn(
        // Allow featured projects to span wider on large screens
        project.featured ? "lg:col-span-2" : "",
        "group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-lg hover:border-blue-500/30 hover:shadow-2xl transition-all duration-300",
        // Mobile-specific enhancements
        "mobile-tap-highlight",
        touchDevice && "touch-target active:scale-98",
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...hoverProps}
      onClick={() => onViewDetails(project)}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
          Featured
        </div>
      )}

      {/* Project image with optimized loading */}
      <div
        className={cn(
          "relative overflow-hidden bg-slate-800",
          // Larger visual for featured projects
          project.featured
            ? "h-56 sm:h-64 md:h-72 lg:h-80"
            : "h-40 sm:h-44 md:h-48",
          isMobile && "aspect-responsive-video"
        )}
      >
        <ProjectImage
          src={project.images?.[0] || "/images/placeholder.svg"}
          alt={`${project.title} - Project Screenshot`}
          className={cn(
            "w-full h-full transition-transform duration-500",
            !shouldReduceAnimations && "group-hover:scale-105"
          )}
          priority={index < 3} // Prioritize first 3 images
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 transition-opacity duration-300",
            !shouldReduceAnimations && "group-hover:opacity-40"
          )}
        />
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div
          className={cn(
            "flex items-start justify-between mb-2 gap-2",
            isMobile && "flex-col sm:flex-row sm:items-center"
          )}
        >
          <h3
            className={cn(
              "font-bold text-slate-900 transition-colors leading-tight",
              project.featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
              !shouldReduceAnimations && "group-hover:text-blue-600"
            )}
          >
            {project.title}
          </h3>
          <div
            className={cn(
              "flex items-center text-slate-500 flex-shrink-0",
              "text-xs sm:text-sm"
            )}
          >
            <Calendar size={isMobile ? 12 : 14} className="mr-1" />
            {formatDate(project.completedDate, {
              year: "numeric",
              month: "short",
            })}
          </div>
        </div>

        <p
          className={cn(
            "text-slate-600 mb-4 leading-relaxed",
            project.featured ? "text-base sm:text-lg" : "text-sm sm:text-base",
            isMobile
              ? project.featured
                ? "line-clamp-5"
                : "line-clamp-3"
              : project.featured
                ? "line-clamp-4"
                : "line-clamp-2"
          )}
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies
            .slice(
              0,
              isMobile ? (project.featured ? 3 : 2) : project.featured ? 5 : 3
            )
            .map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-2.5 py-1 bg-gray-100 text-slate-700 rounded-md font-medium border border-slate-200",
                  "text-xs"
                )}
              >
                {tech}
              </span>
            ))}
          {project.technologies.length >
            (isMobile
              ? project.featured
                ? 3
                : 2
              : project.featured
                ? 5
                : 3) && (
              <span
                className={cn(
                  "px-2.5 py-1 bg-gray-100 text-slate-700 rounded-md font-medium border border-slate-200",
                  "text-xs"
                )}
              >
                +{project.technologies.length -
                  (isMobile
                    ? project.featured
                      ? 3
                      : 2
                    : project.featured
                      ? 5
                      : 3)}
              </span>
            )}
        </div>

        {/* Action buttons */}
        <div
          className={cn(
            "flex items-center justify-between mt-auto pt-4 border-t border-slate-100",
            isMobile && "flex-col sm:flex-row gap-3"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(project);
            }}
            className={cn(
              "text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none flex items-center gap-1",
              "text-sm",
              touchDevice &&
              "touch-target py-2 px-3 -mx-3 rounded-lg hover:bg-gray-100",
              isMobile && "w-full justify-center"
            )}
          >
            View Details <span aria-hidden="true">&rarr;</span>
          </button>

          <div
            className={cn(
              "flex items-center gap-3",
              isMobile && "justify-center w-full sm:w-auto"
            )}
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
              </motion.a>
            )}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              title="View Code"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
