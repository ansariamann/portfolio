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
        "group relative bg-white rounded-responsive shadow-responsive hover:shadow-responsive-hover transition-all duration-300 overflow-hidden cursor-pointer",
        // Mobile-specific enhancements
        "mobile-tap-highlight",
        touchDevice && "touch-target active:scale-98",
        isMobile && "shadow-depth-1 hover:shadow-depth-2"
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...hoverProps}
      onClick={() => onViewDetails(project)}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Featured
        </div>
      )}

      {/* Project image with optimized loading */}
      <div
        className={cn(
          "relative overflow-hidden bg-gray-100",
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
            "w-full h-full transition-transform duration-300",
            !shouldReduceAnimations && "group-hover:scale-105"
          )}
          priority={index < 3} // Prioritize first 3 images
        />
        <div
          className={cn(
            "absolute inset-0 bg-black/20 transition-colors duration-300",
            !shouldReduceAnimations && "group-hover:bg-black/10"
          )}
        />
      </div>

      {/* Content */}
      <div className="padding-responsive-sm">
        <div
          className={cn(
            "flex items-start justify-between mb-2 gap-2",
            isMobile && "flex-col sm:flex-row sm:items-center"
          )}
        >
          <h3
            className={cn(
              "font-bold text-gray-900 transition-colors leading-tight",
              project.featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl",
              !shouldReduceAnimations && "group-hover:text-blue-600"
            )}
          >
            {project.title}
          </h3>
          <div
            className={cn(
              "flex items-center text-gray-500 flex-shrink-0",
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
            "text-gray-600 mb-3 sm:mb-4 leading-relaxed",
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
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.technologies
            .slice(
              0,
              isMobile ? (project.featured ? 3 : 2) : project.featured ? 5 : 3
            )
            .map((tech) => (
              <span
                key={tech}
                className={cn(
                  "px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium",
                  "text-xs sm:text-xs"
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
                "px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium",
                "text-xs sm:text-xs"
              )}
            >
              +
              {project.technologies.length -
                (isMobile
                  ? project.featured
                    ? 3
                    : 2
                  : project.featured
                  ? 5
                  : 3)}{" "}
              more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div
          className={cn(
            "layout-mobile-center gap-3",
            isMobile && "flex-col sm:flex-row"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(project);
            }}
            className={cn(
              "text-blue-600 hover:text-blue-700 font-medium transition-colors focus-mobile-visible",
              "text-mobile-scale",
              touchDevice &&
                "touch-target py-2 px-3 -mx-3 rounded-lg hover:bg-blue-50 touch-feedback",
              isMobile && "w-responsive-full text-center"
            )}
          >
            View Details
          </button>

          <div
            className={cn(
              "flex items-center gap-4",
              isMobile && "justify-center sm:justify-end"
            )}
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "text-gray-500 hover:text-blue-600 transition-colors",
                  touchDevice &&
                    "touch-target p-2 -m-2 rounded-lg hover:bg-blue-50"
                )}
                {...(shouldReduceAnimations
                  ? {}
                  : {
                      whileHover: { scale: touchDevice ? 1 : 1.1 },
                      whileTap: { scale: 0.95 },
                    })}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={isMobile ? 20 : 18} />
              </motion.a>
            )}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "text-gray-500 hover:text-blue-600 transition-colors",
                touchDevice &&
                  "touch-target p-2 -m-2 rounded-lg hover:bg-blue-50"
              )}
              {...(shouldReduceAnimations
                ? {}
                : {
                    whileHover: { scale: touchDevice ? 1 : 1.1 },
                    whileTap: { scale: 0.95 },
                  })}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={isMobile ? 20 : 18} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
