"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { skills, getSkillsByCategory } from "@/data/skills";
import { Skill, SKILL_CATEGORIES } from "@/types";
import { SkillIcon } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

/* ─── Single skill tile — small square with icon + name ─── */
const SkillTile = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.div
    className="skill-grid-item group cursor-default"
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.92 }}
    transition={{ duration: 0.2, delay: index * 0.025 }}
    layout
  >
    <div className="flex flex-col items-center justify-center gap-2.5 w-full">
      <div className="w-10 h-10 flex items-center justify-center">
        <SkillIcon
          skillId={skill.id}
          size={32}
          color={skill.color}
          className="opacity-85 group-hover:opacity-100 transition-opacity"
        />
      </div>
      <span className="text-[13px] font-semibold text-foreground text-center leading-tight">
        {skill.name}
      </span>
    </div>
  </motion.div>
);

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = Object.keys(SKILL_CATEGORIES) as Array<
    keyof typeof SKILL_CATEGORIES
  >;

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : getSkillsByCategory(selectedCategory as Skill["category"]);

  return (
    <section id="skills" className="section-shell border-t border-ink/10">
      <div className="container-main">
        {/* Centered header */}
        <header className="mb-12 text-center max-w-2xl mx-auto">
          <p className="section-label mb-4">Skills</p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.12]">
            Tools I use to ship.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            A focused toolkit of technologies and frameworks for building
            reliable web applications.
          </p>
        </header>

        {/* Category Filter — centered pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border",
              selectedCategory === "all"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-ink/15 hover:border-ink/30 hover:text-foreground"
            )}
          >
            All Skills
          </button>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border",
                selectedCategory === category
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-ink/15 hover:border-ink/30 hover:text-foreground"
              )}
            >
              {SKILL_CATEGORIES[category]}
            </button>
          ))}
        </div>

        {/* Skills Grid — tight square tiles like hashton.dev */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillTile key={skill.id} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
