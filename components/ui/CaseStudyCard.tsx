"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Calendar, ChevronRight, BarChart3, Star } from "lucide-react";
import { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";
import CaseStudyModal from "./CaseStudyModal";

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
    index: number;
}

export default function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <motion.article
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className={cn(
                    "group relative flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-border/40",
                    "bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-400 cursor-pointer"
                )}
                onClick={() => setIsModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setIsModalOpen(true)}
                aria-label={`View case study: ${caseStudy.title}`}
            >
                {/* Left — colour accent strip + icon panel */}
                <div className="relative sm:w-52 md:w-60 shrink-0 flex flex-col items-center justify-center gap-3 p-6 overflow-hidden min-h-[120px]">
                    {/* Gradient background */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-15", caseStudy.color)} />
                    {/* Top accent line */}
                    <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", caseStudy.color)} />

                    {/* Icon */}
                    <span className="text-4xl relative z-10" role="img" aria-label={caseStudy.domain}>
                        {caseStudy.icon}
                    </span>

                    {/* Domain badge */}
                    <span
                        className={cn(
                            "relative z-10 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r",
                            caseStudy.color
                        )}
                    >
                        {caseStudy.domain}
                    </span>

                    {/* Featured star */}
                    {caseStudy.featured && (
                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            <Star size={9} className="fill-current" />
                            Featured
                        </div>
                    )}
                </div>

                {/* Right — Content */}
                <div className="flex flex-col flex-1 p-5 min-w-0">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {caseStudy.title}
                        </h3>
                        <span className="shrink-0 flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                            <Calendar size={10} />
                            {caseStudy.completedDate}
                        </span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs font-medium text-primary/70 italic mb-3">
                        {caseStudy.tagline}
                    </p>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {caseStudy.summary}
                    </p>

                    {/* Key Metrics — horizontal mini row */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {caseStudy.metrics.slice(0, 3).map((metric) => (
                            <div
                                key={metric.label}
                                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/60 border border-border/30 text-xs"
                            >
                                <span>{metric.icon}</span>
                                <span className="font-bold text-foreground">{metric.value}</span>
                                <span className="text-muted-foreground">{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {caseStudy.technologies.slice(0, 5).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-primary/8 dark:bg-primary/10 text-primary border border-primary/15"
                            >
                                {tech}
                            </span>
                        ))}
                        {caseStudy.technologies.length > 5 && (
                            <span className="px-2 py-0.5 text-[11px] rounded-md bg-secondary text-muted-foreground border border-border/40">
                                +{caseStudy.technologies.length - 5}
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                        <button
                            className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                        >
                            <BarChart3 size={13} />
                            Read Full Study
                            <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {caseStudy.githubUrl && caseStudy.githubUrl !== "#" && (
                            <motion.a
                                href={caseStudy.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                aria-label="GitHub"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github size={15} />
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.article>

            <CaseStudyModal
                caseStudy={caseStudy}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
