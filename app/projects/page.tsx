"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Filter, Grid, Layers } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { ProjectCard, ProjectModal } from "@/components/ui";
import { ProjectCardSkeleton } from "@/components/ui/SkeletonLoader";
import LazySection from "@/components/ui/LazySection";
import { cn } from "@/lib/utils";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

type FilterCategory = "all" | Project["category"];

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isMobile } = useMobileOptimizedAnimation();

    const filteredProjects = useMemo(() => {
        if (activeFilter === "all") {
            return [...projects].sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime();
            });
        }
        return projects
            .filter((p) => p.category === activeFilter)
            .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime());
    }, [activeFilter]);

    const categories = useMemo(() => {
        const unique = Array.from(new Set(projects.map((p) => p.category)));
        return ["all", ...unique] as FilterCategory[];
    }, []);

    const getCategoryCount = (cat: FilterCategory) =>
        cat === "all" ? projects.length : projects.filter((p) => p.category === cat).length;

    const handleViewDetails = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedProject(null), 300);
    };

    return (
        <main id="main-content" className="min-h-screen bg-secondary/30">
            {/* ── Hero Banner — matches HeroSection exactly ────────── */}
            <section className="relative overflow-hidden pt-28 pb-16 min-h-[40vh] flex items-center">
                {/* Animated gradient orbs — identical to HeroSection */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-orb-float" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-orb-float-slow" />
                    <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-orb-float" style={{ animationDelay: "3s" }} />
                    {/* Grid overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                <div className="container max-w-5xl mx-auto px-6 relative z-10 w-full">
                    {/* Back link */}
                    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group">
                            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Portfolio
                        </Link>
                    </motion.div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-5"
                    >
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-md flex items-center gap-2 w-fit">
                            <Layers size={13} />
                            All Projects
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4"
                    >
                        My{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-violet-500">
                            Projects
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-muted-foreground text-lg max-w-xl leading-relaxed mb-8"
                    >
                        A complete collection spanning web development, machine learning, and cybersecurity.
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-8"
                    >
                        {[
                            { label: "Total Projects", value: projects.length },
                            { label: "Featured", value: projects.filter((p) => p.featured).length },
                            { label: "Completed", value: projects.filter((p) => p.status === "completed").length },
                            { label: "Categories", value: categories.length - 1 },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Project List ─────────────────────────────────────── */}
            <section className="container max-w-5xl mx-auto px-6 pb-20">
                {/* Category Filters */}
                <motion.div
                    className="flex flex-wrap gap-3 mb-8"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                >
                    {categories.map((cat, i) => {
                        const isActive = activeFilter === cat;
                        return (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={cn(
                                    "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border",
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                                        : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-muted-foreground border-border/50 hover:bg-white/80 dark:hover:bg-gray-900/80"
                                )}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                            >
                                <Filter size={13} />
                                <span className="capitalize">{cat === "all" ? "All" : cat}</span>
                                <span className={cn("px-1.5 py-0.5 rounded-full text-[10px] font-bold", isActive ? "bg-white/20 text-white" : "bg-muted text-muted-foreground")}>
                                    {getCategoryCount(cat)}
                                </span>
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Cards — single-column stacked list */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFilter}
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {filteredProjects.map((project, index) => (
                            <LazySection
                                key={project.id}
                                fallback={<ProjectCardSkeleton />}
                                threshold={0.05}
                                rootMargin="80px"
                                delay={index * 40}
                            >
                                <ProjectCard
                                    project={project}
                                    onViewDetails={handleViewDetails}
                                    index={index}
                                    isFeatured={project.featured}
                                />
                            </LazySection>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                            <Grid size={24} className="text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
                        <p className="text-muted-foreground">Try selecting a different filter.</p>
                    </motion.div>
                )}

                {/* CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-muted-foreground mb-4">Interested in collaborating or have a project in mind?</p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25"
                    >
                        Let&#39;s Work Together →
                    </Link>
                </motion.div>
            </section>

            <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />
        </main>
    );
}
