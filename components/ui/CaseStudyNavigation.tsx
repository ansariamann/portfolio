"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

interface CaseStudyNavigationProps {
  otherCaseStudies: CaseStudy[];
  currentId: string;
}

export default function CaseStudyNavigation({
  otherCaseStudies,
  currentId,
}: CaseStudyNavigationProps) {
  if (otherCaseStudies.length === 0) return null;

  return (
    <section className="py-12 md:py-16 border-t border-border/40">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Explore Other Case Studies
        </h2>
        <p className="text-muted-foreground">
          Dive deeper into other projects and discoveries
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {otherCaseStudies.map((cs, idx) => (
          <Link
            key={cs.id}
            href={`/case-studies/${cs.id}`}
            className={cn(
              "group relative flex flex-col rounded-2xl overflow-hidden border border-border/40",
              "bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300",
              "no-underline"
            )}
          >
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex flex-col h-full"
            >
              {/* Top accent bar */}
              <div
                className={cn(
                  "h-1 w-full flex-shrink-0 bg-gradient-to-r",
                  cs.color
                )}
              />

              <div className="p-5 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{cs.icon}</span>
                    <div className="flex-1">
                      <span
                        className={cn(
                          "inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r mb-0.5",
                          cs.color
                        )}
                      >
                        {cs.domain}
                      </span>
                      {cs.featured && (
                        <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          <Star size={9} className="fill-current" />
                          Featured
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1 leading-snug">
                  {cs.title}
                </h3>

                {/* Tagline */}
                <p className="text-xs font-medium text-primary/70 italic mb-3">
                  {cs.tagline}
                </p>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {cs.summary}
                </p>

                {/* Key metric preview */}
                <div className="flex items-center gap-2 mb-4 mt-auto pt-3 border-t border-border/40">
                  {cs.metrics.length > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary/60 border border-border/30 text-xs">
                      <span>{cs.metrics[0].icon}</span>
                      <span className="font-bold text-foreground">
                        {cs.metrics[0].value}
                      </span>
                      <span className="text-muted-foreground">
                        {cs.metrics[0].label}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-primary/80 transition-colors w-fit">
                  View Case Study
                  <ChevronRight
                    size={12}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </span>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}
