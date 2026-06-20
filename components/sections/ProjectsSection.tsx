"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectCard, ProjectModal, ScrollReveal } from "@/components/ui";
import LazySection from "@/components/ui/LazySection";
import { ProjectCardSkeleton } from "@/components/ui/SkeletonLoader";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

type FilterCategory = "all" | Project["category"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMobile } = useMobileOptimizedAnimation();

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return [...projects].sort((a, b) => {
        return (
          new Date(b.completedDate).getTime() -
          new Date(a.completedDate).getTime() ||
          Number(b.featured) - Number(a.featured)
        );
      });
    }
    return projects
      .filter((project) => project.category === activeFilter)
      .sort(
        (a, b) =>
          new Date(b.completedDate).getTime() -
          new Date(a.completedDate).getTime()
      );
  }, [activeFilter]);

  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((p) => p.category))
    );
    return ["all", ...uniqueCategories] as FilterCategory[];
  }, []);

  const getCategoryCount = (category: FilterCategory) => {
    if (category === "all") return projects.length;
    return projects.filter((p) => p.category === category).length;
  };

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section
      id="projects"
      className="section-shell py-20 bg-background"
    >
      <div className="container-main relative z-10">
        {/* Header — centered */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-4">My work</p>

          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.12] mb-5">
            Featured Projects
          </h2>

          <motion.p
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A curated selection of projects that showcase my passion for
            creating meaningful digital experiences.
          </motion.p>
        </motion.div>

        {/* Filters — centered */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          {categories.map((category, index) => {
            const isActive = activeFilter === category;
            const count = getCategoryCount(category);

            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border flex items-center gap-2",
                  isActive
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-ink/15 hover:border-ink/30 hover:text-foreground"
                )}
              >
                <span className="capitalize">
                  {category === "all" ? "All Projects" : category}
                </span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-background/20 text-background"
                      : "bg-ink/[0.06] text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Grid — centered, max-w-6xl */}
        <motion.div
          key={activeFilter}
          className={cn(
            "grid gap-6 max-w-6xl mx-auto",
            "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="h-full">
              <ProjectCard
                project={project}
                onViewDetails={handleViewDetails}
                index={index}
                isFeatured={project.featured}
              />
            </div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Grid size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground">
              Try selecting a different filter.
            </p>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
