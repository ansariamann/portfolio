"use client";

import { motion } from "framer-motion";
import { Github, CheckCircle2 } from "lucide-react";
import { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  return (
    <section className="relative py-12 md:py-16">
      {/* Gradient accent top bar */}
      <div
        className={cn("h-1 w-full mb-8 bg-gradient-to-r", caseStudy.color)}
      />

      {/* Header with Icon & Title */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:gap-6 mb-6">
          <span className="text-6xl md:text-7xl mb-4 md:mb-0">
            {caseStudy.icon}
          </span>
          <div className="flex-1">
            <span
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r mb-2",
                caseStudy.color
              )}
            >
              {caseStudy.domain}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-2">
              {caseStudy.title}
            </h2>
            <p className="text-base md:text-lg text-primary/80 italic">
              {caseStudy.tagline}
            </p>

            {/* GitHub Link */}
            {caseStudy.githubUrl && caseStudy.githubUrl !== "#" && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50 transition-all"
              >
                <Github size={16} />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Key Results Metrics Grid */}
      <section className="mb-12">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Key Results
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {caseStudy.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-2xl bg-secondary/40 border border-border/40 text-center flex flex-col items-center gap-2"
            >
              <span className="text-2xl">{metric.icon}</span>
              <span className="text-xl font-bold text-foreground">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-primary">
                {metric.label}
              </span>
              {metric.description && (
                <span className="text-[11px] text-muted-foreground leading-tight text-center">
                  {metric.description}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Problem, Approach, Results */}
      <div className="space-y-10">
        {[
          { label: "🎯 Problem Statement", content: caseStudy.problem },
          { label: "🔬 Approach & Methodology", content: caseStudy.approach },
          { label: "📊 Results & Impact", content: caseStudy.results },
        ].map(({ label, content }) => (
          <motion.section
            key={label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
              {label}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {content}
            </p>
          </motion.section>
        ))}
      </div>

      {/* ML Pipeline Section */}
      <section className="mt-10">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
          ⚙️ ML Pipeline
        </h3>
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
                  <span className="text-xs font-bold text-primary">
                    {step.step}
                  </span>
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-start gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-semibold text-foreground">
                      {step.title}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {step.tools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 text-[10px] rounded bg-primary/10 text-primary font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="mt-10">
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
          💡 Key Takeaways
        </h3>
        <ul className="space-y-3">
          {caseStudy.keyTakeaways.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-3 text-sm md:text-base text-muted-foreground"
            >
              <CheckCircle2
                size={18}
                className="text-primary mt-0.5 flex-shrink-0"
              />
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Technologies & Dataset */}
      <section className="mt-10 grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs rounded-lg bg-secondary border border-border/50 text-secondary-foreground font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {caseStudy.dataset && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Dataset
            </h3>
            <p className="text-sm md:text-base text-foreground font-medium">
              {caseStudy.dataset}
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
