"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { skills, getSkillsByCategory } from "@/data/skills";
import { Skill, SKILL_CATEGORIES } from "@/types";
import { StaggeredList, ScrollReveal } from "@/components/ui";
import LazySection from "@/components/ui/LazySection";
import { SkillCardSkeleton } from "@/components/ui/SkeletonLoader";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { SkillIcon } from "@/lib/skill-icons";
import AnimatedSectionHeading, {
  headingPresets,
} from "@/components/ui/AnimatedSectionHeading";

// Skill visualization modes
type VisualizationMode = "cards" | "bubbles" | "editor" | "rings";

// Skill card component with mobile-optimized flip animation
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { touchDevice, shouldReduceAnimations } = useMobileOptimizedAnimation();

  // Handle touch interactions for mobile
  const handleInteraction = () => {
    if (touchDevice) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      className="relative h-28 sm:h-32 w-full cursor-pointer perspective-1000 select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: shouldReduceAnimations ? index * 0.05 : index * 0.1,
        duration: shouldReduceAnimations ? 0.3 : 0.5,
      }}
      onHoverStart={() => !touchDevice && setIsFlipped(true)}
      onHoverEnd={() => !touchDevice && setIsFlipped(false)}
      onClick={handleInteraction}
      whileHover={shouldReduceAnimations ? {} : { scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{
          transformStyle: "preserve-3d",
          transition: shouldReduceAnimations
            ? "none"
            : "transform 700ms ease-in-out",
        }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-3 sm:p-4 flex flex-col items-center justify-center border border-blue-200">
          <div className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 flex items-center justify-center">
            <SkillIcon
              skillId={skill.id}
              size={32}
              color={skill.color}
              className="sm:w-12 sm:h-12 w-8 h-8"
            />
          </div>
          <h3 className="font-semibold text-slate-700 text-center text-xs sm:text-sm leading-tight">
            {skill.name}
          </h3>
          <div className="flex mt-1 sm:mt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mx-0.5 ${
                  i < skill.proficiency ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          {touchDevice && (
            <div className="text-xs text-gray-400 mt-1">Tap to flip</div>
          )}
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 flex flex-col justify-center text-white"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-xs sm:text-sm text-center mb-1 sm:mb-2 leading-tight">
            {skill.description}
          </p>
          <div className="text-xs text-center opacity-90">
            {skill.yearsOfExperience && (
              <span>{skill.yearsOfExperience} years experience</span>
            )}
          </div>
          {touchDevice && (
            <div className="text-xs text-center opacity-75 mt-1">
              Tap to flip back
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Floating skill bubbles component
const SkillBubbles = ({ skills }: { skills: Skill[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-96 overflow-hidden">
      {skills.map((skill, index) => {
        const size = 60 + skill.proficiency * 15; // Size based on proficiency
        const x = (index % 6) * 120 + Math.random() * 50;
        const y = Math.floor(index / 6) * 100 + Math.random() * 50;

        return (
          <motion.div
            key={skill.id}
            className="absolute rounded-full flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-slate-800/90 backdrop-blur-sm border-2"
            style={{
              width: size,
              height: size,
              borderColor: skill.color || "#3B82F6",
              left: x,
              top: y,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.2, opacity: 1, zIndex: 10 }}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
          >
            <SkillIcon
              skillId={skill.id}
              size={size * 0.4}
              color={skill.color}
              className="mb-1"
            />
            <span className="text-xs text-center px-1 text-slate-100 font-medium">
              {skill.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

// Code editor mockup component
const CodeEditorMockup = ({ skills }: { skills: Skill[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const languageSkills = skills.filter(
    (skill) => skill.category === "languages"
  );

  const codeExamples = {
    javascript: `// Modern JavaScript with ES6+
const skills = ['React', 'Node.js', 'TypeScript'];
const developer = {
  name: 'Junior Developer',
  experience: skills.map(skill => ({
    name: skill,
    proficiency: 'Begineer'
  }))
};`,
    typescript: `// TypeScript with strong typing
interface Developer {
  name: string;
  skills: Skill[];
  experience: number;
}

const createDeveloper = (data: Developer): Developer => {
  return { ...data, experience: data.experience + 1 };
};`,
    python: `# Python for backend development
class Developer:
    def __init__(self, name: str, skills: list):
        self.name = name
        self.skills = skills
    
    def add_skill(self, skill: str) -> None:
        self.skills.append(skill)
        print(f"Added {skill} to skillset!")`,
  };

  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
      {/* Editor header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex space-x-1 ml-4">
          {languageSkills.slice(0, 3).map((skill, index) => (
            <button
              key={skill.id}
              className={`px-3 py-1 text-sm rounded-t-md transition-colors ${
                activeTab === index
                  ? "bg-gray-900 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor content */}
      <div className="p-4 h-64 overflow-auto">
        <pre className="text-green-400 text-sm font-mono leading-relaxed">
          <motion.code
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {codeExamples[
              languageSkills[activeTab]?.id as keyof typeof codeExamples
            ] || codeExamples.javascript}
          </motion.code>
        </pre>
      </div>
    </div>
  );
};

// Animated progress rings component
const ProgressRing = ({ skill, index }: { skill: Skill; index: number }) => {
  const [progress, setProgress] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((skill.proficiency / 5) * 100);
    }, index * 200);
    return () => clearTimeout(timer);
  }, [skill.proficiency, index]);

  return (
    <motion.div
      className="flex flex-col items-center p-4 bg-white backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={skill.color || "#3B82F6"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <SkillIcon skillId={skill.id} size={28} color={skill.color} />
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 text-center text-sm">
        {skill.name}
      </h3>
      <div className="text-xs text-gray-500 text-center mt-1">
        <div className="font-medium">{skill.proficiency}/5</div>
        <div>{skill.yearsOfExperience}y exp</div>
      </div>
    </motion.div>
  );
};

export default function SkillsSection() {
  const [activeMode, setActiveMode] = useState<VisualizationMode>("cards");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { isMobile } = useMobileOptimizedAnimation();

  const categories = Object.keys(SKILL_CATEGORIES) as Array<
    keyof typeof SKILL_CATEGORIES
  >;

  const filteredSkills =
    selectedCategory === "all"
      ? skills
      : getSkillsByCategory(selectedCategory as Skill["category"]);

  // Simplified visualization modes for mobile
  const visualizationModes = [
    { id: "cards" as const, name: "Cards", icon: "🃏" },
    { id: "rings" as const, name: "Progress", icon: "⭕" },
    // Show advanced modes only on desktop
    ...(isMobile
      ? []
      : [
          { id: "bubbles" as const, name: "Bubbles", icon: "🫧" },
          { id: "editor" as const, name: "Code Editor", icon: "💻" },
        ]),
  ];

  // Auto-switch to cards mode on mobile if current mode is not available
  useEffect(() => {
    if (isMobile && (activeMode === "bubbles" || activeMode === "editor")) {
      setActiveMode("cards");
    }
  }, [isMobile, activeMode]);

  return (
    <section
      id="skills"
      className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white via-gray-50 to-slate-100 relative"
    >
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
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
            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-blue-800 border border-white/30">
              What I work with
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Skills
          </h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A comprehensive toolkit of technologies and frameworks I use to
            bring ideas to life
          </motion.p>
        </motion.div>

        {/* Modern visualization mode selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {visualizationModes.map((mode, index) => (
            <motion.button
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={`relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                activeMode === mode.id
                  ? "bg-slate-800/90 backdrop-blur-sm text-purple-400 shadow-xl scale-105 border border-purple-500/50"
                  : "bg-slate-800/60 backdrop-blur-sm text-slate-200 hover:bg-slate-800/80 shadow-lg border border-slate-700/50"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <span className="mr-2 text-lg">{mode.icon}</span>
              <span className={isMobile ? "hidden xs:inline" : ""}>
                {mode.name}
              </span>
              {activeMode === mode.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl"
                  layoutId="activeMode"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Modern category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                : "bg-slate-800/80 backdrop-blur-sm text-slate-200 hover:bg-slate-800/95 shadow-md border border-slate-700/50"
            }`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            All Skills
          </motion.button>
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                  : "bg-slate-800/80 backdrop-blur-sm text-slate-200 hover:bg-slate-800/95 shadow-md border border-slate-700/50"
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
            >
              {SKILL_CATEGORIES[category]}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills visualization */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {activeMode === "cards" && (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {filteredSkills.map((skill, index) => (
                  <LazySection
                    key={skill.id}
                    fallback={<SkillCardSkeleton />}
                    threshold={0.1}
                    rootMargin="50px"
                    delay={index * 30}
                  >
                    <SkillCard skill={skill} index={index} />
                  </LazySection>
                ))}
              </motion.div>
            )}

            {activeMode === "bubbles" && (
              <motion.div
                key="bubbles"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-slate-700/50"
              >
                <SkillBubbles skills={filteredSkills} />
              </motion.div>
            )}

            {activeMode === "editor" && (
              <motion.div
                key="editor"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <CodeEditorMockup skills={filteredSkills} />
              </motion.div>
            )}

            {activeMode === "rings" && (
              <motion.div
                key="rings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              >
                {filteredSkills.map((skill, index) => (
                  <ProgressRing key={skill.id} skill={skill} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Skills summary */}
        <ScrollReveal delay={600} className="mt-16 text-center">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-slate-700/50">
            <h3 className="text-2xl font-bold text-slate-100 mb-6">
              Skills Overview
            </h3>
            <StaggeredList
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
              staggerDelay={0.1}
              direction="up"
            >
              {categories.map((category) => {
                const categorySkills = getSkillsByCategory(category);
                const avgProficiency =
                  categorySkills.reduce(
                    (sum, skill) => sum + skill.proficiency,
                    0
                  ) / categorySkills.length;

                return (
                  <div key={category} className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">
                      {categorySkills.length}
                    </div>
                    <div className="text-sm text-gray-300 mb-1">
                      {SKILL_CATEGORIES[category]}
                    </div>
                    <div className="text-xs text-gray-400">
                      Avg: {avgProficiency.toFixed(1)}/5
                    </div>
                  </div>
                );
              })}
            </StaggeredList>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
