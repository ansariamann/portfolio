"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ChevronRight, CheckCircle2 } from "lucide-react";
import { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

interface CaseStudyModalProps {
    caseStudy: CaseStudy;
    isOpen: boolean;
    onClose: () => void;
}

export default function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            scrollRef.current?.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Escape key handler
    useEffect(() => {
        const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 400 }}
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-[101] flex flex-col rounded-3xl overflow-hidden bg-background border border-border/50 shadow-2xl"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="case-study-title"
                    >
                        {/* Gradient accent top bar */}
                        <div className={cn("h-1.5 w-full flex-shrink-0 bg-gradient-to-r", caseStudy.color)} />

                        {/* Header */}
                        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-border/50 flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <span className="text-4xl">{caseStudy.icon}</span>
                                <div>
                                    <span
                                        className={cn(
                                            "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r mb-1",
                                            caseStudy.color
                                        )}
                                    >
                                        {caseStudy.domain}
                                    </span>
                                    <h2
                                        id="case-study-title"
                                        className="text-xl md:text-2xl font-bold text-foreground leading-tight"
                                    >
                                        {caseStudy.title}
                                    </h2>
                                    <p className="text-sm text-primary/80 italic mt-0.5">{caseStudy.tagline}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                {caseStudy.githubUrl && caseStudy.githubUrl !== "#" && (
                                    <a
                                        href={caseStudy.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50 transition-all"
                                        aria-label="View on GitHub"
                                    >
                                        <Github size={14} />
                                        <span className="hidden sm:inline">GitHub</span>
                                    </a>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable body */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
                            <div className="p-6 space-y-8 max-w-4xl mx-auto pb-10">

                                {/* Metrics Grid */}
                                <section>
                                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Key Results</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {caseStudy.metrics.map((metric) => (
                                            <div
                                                key={metric.label}
                                                className="p-4 rounded-2xl bg-secondary/40 border border-border/40 text-center flex flex-col items-center gap-1"
                                            >
                                                <span className="text-2xl">{metric.icon}</span>
                                                <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                                                <span className="text-xs font-semibold text-primary">{metric.label}</span>
                                                {metric.description && (
                                                    <span className="text-[11px] text-muted-foreground leading-tight">{metric.description}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Problem, Approach, Results */}
                                {[
                                    { label: "🎯 Problem Statement", content: caseStudy.problem },
                                    { label: "🔬 Approach & Methodology", content: caseStudy.approach },
                                    { label: "📊 Results & Impact", content: caseStudy.results },
                                ].map(({ label, content }) => (
                                    <section key={label}>
                                        <h3 className="text-base font-bold text-foreground mb-3">{label}</h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
                                    </section>
                                ))}

                                {/* ML Pipeline */}
                                <section>
                                    <h3 className="text-base font-bold text-foreground mb-4">⚙️ ML Pipeline</h3>
                                    <div className="relative">
                                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/60 to-transparent rounded-full" />
                                        <div className="space-y-4">
                                            {caseStudy.pipeline.map((step, i) => (
                                                <motion.div
                                                    key={step.step}
                                                    initial={{ opacity: 0, x: -15 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.07 }}
                                                    className="flex gap-4 pl-2"
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center z-10">
                                                        <span className="text-xs font-bold text-primary">{step.step}</span>
                                                    </div>
                                                    <div className="flex-1 pb-4">
                                                        <div className="flex items-start gap-2 flex-wrap">
                                                            <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                                                            <div className="flex flex-wrap gap-1">
                                                                {step.tools.map((tool) => (
                                                                    <span key={tool} className="px-1.5 py-0.5 text-[10px] rounded bg-primary/10 text-primary font-medium">
                                                                        {tool}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* Key Takeaways */}
                                <section>
                                    <h3 className="text-base font-bold text-foreground mb-3">💡 Key Takeaways</h3>
                                    <ul className="space-y-2.5">
                                        {caseStudy.keyTakeaways.map((point, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.06 }}
                                                className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                            >
                                                <CheckCircle2 size={15} className="text-primary mt-0.5 flex-shrink-0" />
                                                <span>{point}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </section>

                                {/* Technologies & Dataset */}
                                <section className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Technologies</h3>
                                        <div className="flex flex-wrap gap-1.5">
                                            {caseStudy.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2.5 py-1 text-xs rounded-lg bg-secondary border border-border/50 text-secondary-foreground font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    {caseStudy.dataset && (
                                        <div>
                                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Dataset</h3>
                                            <p className="text-sm text-foreground font-medium">{caseStudy.dataset}</p>
                                        </div>
                                    )}
                                </section>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
