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
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";

type FilterCategory = "all" | Project["category"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMobile } = useMobileOptimizedAnimation();

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (
          new Date(b.completedDate).getTime() -
          new Date(a.completedDate).getTime()
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

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen py-20 relative bg-gray-50">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-primary/20">
              My work
            </span>
          </motion.div>

          <AnimatedSectionHeading
            text="Featured Projects"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 bg-clip-text text-transparent"
            preset="default"
          />

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A curated selection of projects that showcase my passion for
            creating meaningful digital experiences.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {categories.map((category, index) => {
            const isActive = activeFilter === category;
            const count = getCategoryCount(category);

            return (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "bg-background/50 backdrop-blur-sm text-muted-foreground border-border hover:bg-muted"
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Filter size={14} />
                <span className="capitalize text-sm">
                  {category === "all" ? "All Projects" : category}
                </span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    layoutId="activeProjectFilter"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={cn(
              "grid gap-6",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
              isMobile && "px-2 sm:px-0"
            )}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <LazySection
                key={project.id}
                fallback={<ProjectCardSkeleton />}
                threshold={0.1}
                rootMargin="100px"
                delay={index * 50}
              >
                <div className="h-full">
                  <ProjectCard
                    project={project}
                    onViewDetails={handleViewDetails}
                    index={index}
                    isFeatured={project.featured}
                  />
                </div>
              </LazySection>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Grid size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
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
