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
import AnimatedSectionHeading, {
  headingPresets,
} from "@/components/ui/AnimatedSectionHeading";

type FilterCategory = "all" | Project["category"];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isMobile, shouldReduceAnimations } = useMobileOptimizedAnimation();

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects.sort((a, b) => {
        // Featured projects first, then by completion date (newest first)
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

  // Get category counts for filter buttons
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
    <section
      id="projects"
      className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white via-blue-50 via-gray-50 to-slate-100 relative overflow-hidden"
    >
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-60 right-40 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-cyan-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-60 left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern section header */}
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
            <span className="px-4 py-2 bg-slate-800/90 backdrop-blur-sm rounded-full text-sm font-medium text-slate-100 border border-slate-700/60">
              My work
            </span>
          </motion.div>

          <AnimatedSectionHeading
            text="Featured Projects"
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent"
            preset="default"
          />

          <motion.p
            className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A curated selection of projects that showcase my passion for
            creating meaningful digital experiences
          </motion.p>
        </motion.div>

        {/* Modern filter buttons */}
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
                className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-slate-800/90 backdrop-blur-sm text-indigo-400 shadow-xl scale-105 border border-indigo-500/50"
                    : "bg-slate-800/60 backdrop-blur-sm text-slate-200 hover:bg-slate-800/80 shadow-lg border border-slate-700/50"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Filter size={16} />
                <span className="capitalize">
                  {category === "all" ? "All Projects" : category}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-2xl"
                    layoutId="activeProjectFilter"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className={cn(
              "grid gap-4 sm:gap-6 lg:gap-8",
              // Mobile-first responsive grid
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
              // Ensure proper spacing on mobile
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
                <ProjectCard
                  project={project}
                  onViewDetails={handleViewDetails}
                  index={index}
                />
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
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <Grid size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600">
              No projects match the selected category. Try selecting a different
              filter.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        <ScrollReveal
          delay={shouldReduceAnimations ? 200 : 400}
          className={cn("text-center", "mt-12 sm:mt-14 lg:mt-16")}
        >
          <div
            className={cn(
              "bg-slate-800/80 backdrop-blur-sm rounded-responsive shadow-responsive border border-slate-700/50",
              // Mobile-first layout
              "flex flex-col sm:flex-row items-center justify-center",
              "p-4 sm:p-6 gap-4 sm:gap-6 lg:gap-8",
              "max-w-2xl mx-auto",
              isMobile && "mx-4"
            )}
          >
            <div className="text-center flex-1">
              <div
                className={cn("font-bold text-blue-600", "text-xl sm:text-2xl")}
              >
                {projects.length}
              </div>
              <div className={cn("text-gray-600", "text-xs sm:text-sm")}>
                Total Projects
              </div>
            </div>
            <div className={cn("bg-gray-200", "w-full h-px sm:w-px sm:h-8")} />
            <div className="text-center flex-1">
              <div
                className={cn(
                  "font-bold text-green-600",
                  "text-xl sm:text-2xl"
                )}
              >
                {projects.filter((p) => p.featured).length}
              </div>
              <div className={cn("text-gray-600", "text-xs sm:text-sm")}>
                Featured
              </div>
            </div>
            <div className={cn("bg-gray-200", "w-full h-px sm:w-px sm:h-8")} />
            <div className="text-center flex-1">
              <div
                className={cn(
                  "font-bold text-purple-600",
                  "text-xl sm:text-2xl"
                )}
              >
                {
                  Array.from(new Set(projects.flatMap((p) => p.technologies)))
                    .length
                }
              </div>
              <div className={cn("text-gray-600", "text-xs sm:text-sm")}>
                Technologies
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
