"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { skills, getSkillsByCategory } from "@/data/skills";
import { Skill, SKILL_CATEGORIES } from "@/types";
import { StaggeredList, ScrollReveal } from "@/components/ui";
import LazySection from "@/components/ui/LazySection";
import { SkillCardSkeleton } from "@/components/ui/SkeletonLoader";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { SkillIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

// Skill card component - Clean & Minimalist
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      className="group flex flex-col items-center justify-center p-6 h-full rounded-[1.5rem] bg-gradient-to-br from-gray-900/80 to-gray-800/70 backdrop-blur-lg border border-white/10 hover:bg-gray-800/80 transition-all duration-300 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className="w-12 h-12 mb-3 flex items-center justify-center p-2.5 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
        <SkillIcon
          skillId={skill.id}
          size={28}
          color={skill.color}
          className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
        />
      </div>

      <h3 className="font-semibold text-gray-200 text-sm mb-1 text-center">
        {skill.name}
      </h3>

      {/* Percentage Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
        <motion.div
          className="h-full bg-primary/80 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${(skill.proficiency / 5) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
        />
      </div>

      <div className="mt-2 text-xs text-gray-400 group-hover:text-gray-200 transition-colors">
        {skill.yearsOfExperience ? `${skill.yearsOfExperience}y exp` : "Competent"}
      </div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { isMobile } = useMobileOptimizedAnimation();

  const categories = Object.keys(SKILL_CATEGORIES) as Array<
    keyof typeof SKILL_CATEGORIES
  >;

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : getSkillsByCategory(selectedCategory as Skill["category"]);

  return (
    <section id="skills" className="min-h-screen py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-primary/20 inline-block mb-6">
            Expertise
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">
            My Skills
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A comprehensive toolkit of technologies and frameworks I use to
            bring ideas to life.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
              selectedCategory === "all"
                ? "bg-white/10 border border-white/20 text-white"
                : "text-gray-300 hover:text-white border-gray-700"
            )}
          >
            All Skills
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                selectedCategory === category
                  ? "bg-white/10 border border-white/20 text-white"
                  : "text-gray-300 hover:text-white border-gray-700"
              )}
            >
              {SKILL_CATEGORIES[category]}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <LazySection
                key={skill.id}
                fallback={<SkillCardSkeleton />}
                threshold={0.1}
                rootMargin="50px"
                delay={index * 10}
              >
                <SkillCard skill={skill} index={index} />
              </LazySection>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
