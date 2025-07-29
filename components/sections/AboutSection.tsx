"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import { timelineData, achievementsData } from "@/data/about";
import { TimelineItem, Achievement } from "@/types";
import {
  StaggeredList,
  ScrollReveal,
  ParallaxContainer,
} from "@/components/ui";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

// Counter animation hook
function useCountAnimation(endValue: string, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const numericValue = parseInt(endValue.replace(/\D/g, "")) || 0;
  const suffix = endValue.replace(/\d/g, "");

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, numericValue, duration]);

  return { count: count + suffix, startAnimation: () => setHasAnimated(true) };
}

// Modern Achievement Counter Component
function AchievementCounter({
  achievement,
  delay,
}: {
  achievement: Achievement;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { count, startAnimation } = useCountAnimation(
    achievement.value.toString()
  );

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(startAnimation, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, startAnimation, delay]);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.6 }}
    >
      {/* Glassmorphism card */}
      <motion.div
        className="relative p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Gradient background on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.div
            className="text-5xl mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {achievement.icon}
          </motion.div>

          <motion.div
            className="text-4xl font-bold mb-3 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {count}
          </motion.div>

          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            {achievement.title}
          </h3>

          <p className="text-slate-600 leading-relaxed">
            {achievement.description}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40" />
      </motion.div>
    </motion.div>
  );
}

// Modern Timeline Item Component
function TimelineItemComponent({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { isMobile, shouldReduceAnimations } = useMobileOptimizedAnimation();
  const isEven = index % 2 === 0;

  const getTypeGradient = (type: TimelineItem["type"]) => {
    switch (type) {
      case "education":
        return "from-blue-400 to-blue-600";
      case "work":
        return "from-green-400 to-green-600";
      case "project":
        return "from-purple-400 to-purple-600";
      case "achievement":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const getTypeIcon = (type: TimelineItem["type"]) => {
    switch (type) {
      case "education":
        return "🎓";
      case "work":
        return "💼";
      case "project":
        return "🚀";
      case "achievement":
        return "🏆";
      default:
        return "📍";
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`relative mb-12 ${
        isMobile
          ? "ml-8"
          : isEven
          ? "md:ml-0 md:mr-8 md:text-right"
          : "md:ml-8 md:mr-0"
      }`}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        delay: shouldReduceAnimations ? index * 0.1 : index * 0.2,
        duration: 0.6,
      }}
    >
      {/* Modern timeline card */}
      <motion.div
        className="relative group"
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Glassmorphism card */}
        <div className="relative p-6 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
          {/* Gradient background on hover */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${getTypeGradient(
              item.type
            )}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            initial={false}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header with icon and title */}
            <div className="flex items-start mb-4">
              <motion.div
                className="flex-shrink-0 mr-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${getTypeGradient(
                    item.type
                  )} flex items-center justify-center text-white text-xl shadow-lg`}
                >
                  {getTypeIcon(item.type)}
                </div>
              </motion.div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1">
                  {item.title}
                </h3>
                {item.company && (
                  <p className="text-sm font-medium text-slate-600">
                    {item.company}
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-1">{item.period}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-700 leading-relaxed mb-4">
              {item.description}
            </p>

            {/* Technologies */}
            {item.technologies && (
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    className="px-3 py-1 bg-slate-100/80 backdrop-blur-sm text-slate-700 text-sm rounded-full border border-slate-200/50"
                    whileHover={{ scale: 1.05, y: -1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div
            className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${getTypeGradient(
              item.type
            )} rounded-full opacity-60`}
          />
        </div>
      </motion.div>

      {/* Modern timeline connector */}
      {!isMobile && (
        <div
          className={`absolute top-6 ${
            isEven ? "right-0 mr-[-2rem]" : "left-0 ml-[-2rem]"
          } w-8 h-8 flex items-center justify-center`}
        >
          <motion.div
            className={`w-4 h-4 rounded-full bg-gradient-to-r ${getTypeGradient(
              item.type
            )} shadow-lg relative z-10`}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {!shouldReduceAnimations && (
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${getTypeGradient(
                  item.type
                )} opacity-75`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.75, 0, 0.75] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { isMobile, shouldReduceAnimations } = useMobileOptimizedAnimation();

  return (
    <section
      id="about"
      className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Modern background elements */}
      <div className="absolute inset-0 overflow-hidden">
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
        {/* Modern section header with photo */}
        <motion.div
          ref={ref}
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Header section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-slate-600 border border-white/40">
                Get to know me
              </span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h2>
          </div>

          {/* Two-column layout with photo and content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left Column - Photo */}
            <motion.div
              className="relative flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative">
                {/* Animated background elements */}
                <motion.div
                  className="absolute -inset-6 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Decorative floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Photo container */}
                <motion.div
                  className="relative w-80 h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Photo placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-center">
                      <motion.div
                        className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
                        animate={{
                          boxShadow: [
                            "0 0 30px rgba(59, 130, 246, 0.4)",
                            "0 0 50px rgba(147, 51, 234, 0.6)",
                            "0 0 30px rgba(59, 130, 246, 0.4)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="text-4xl font-bold text-white">A</span>
                      </motion.div>
                      <p className="text-slate-600 font-medium">Aman Ansari</p>
                      <p className="text-slate-500 text-sm mt-2">
                        Add your professional photo here
                      </p>
                    </div>
                  </div>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/60 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400/60 rounded-full" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {/* Main description */}
              <div className="space-y-6">
                <motion.p
                  className="text-xl text-slate-700 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Hi! I&apos;m{" "}
                  <span className="font-semibold text-blue-600">
                    Aman Ansari
                  </span>
                  , a passionate junior software developer who loves crafting
                  <span className="text-purple-600 font-medium">
                    {" "}
                    digital experiences
                  </span>
                  that make a difference.
                </motion.p>

                <motion.p
                  className="text-lg text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  I specialize in modern web technologies and have a keen eye
                  for design. My journey in software development is driven by
                  curiosity, creativity, and the desire to build solutions that
                  truly matter.
                </motion.p>
              </div>

              {/* Key highlights */}
              <motion.div
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                {[
                  { icon: "🚀", label: "Fast Learner", desc: "Quick to adapt" },
                  {
                    icon: "💡",
                    label: "Problem Solver",
                    desc: "Creative solutions",
                  },
                  {
                    icon: "🎨",
                    label: "Design Focused",
                    desc: "User-centric approach",
                  },
                  { icon: "⚡", label: "Performance", desc: "Optimized code" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 hover:shadow-lg transition-all duration-300"
                    whileHover={{ y: -2, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-slate-800 text-sm">
                      {item.label}
                    </h4>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Personal touch */}
              <motion.div
                className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <p className="text-slate-700 italic leading-relaxed">
                  &quot;I believe that great software is not just about clean
                  code, but about creating meaningful experiences that connect
                  with people and solve real-world problems.&quot;
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <span className="text-slate-600 font-medium">-Aman</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <ScrollReveal
          delay={shouldReduceAnimations ? 100 : 200}
          className="mb-16 sm:mb-20"
        >
          <h3 className="text-responsive-lg font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Achievements & Stats
          </h3>
          <StaggeredList
            className="grid-responsive-1-2-4 gap-4 sm:gap-6"
            staggerDelay={shouldReduceAnimations ? 0.05 : 0.15}
          >
            {achievementsData.map((achievement, index) => (
              <AchievementCounter
                key={achievement.id}
                achievement={achievement}
                delay={shouldReduceAnimations ? index * 100 : index * 200}
              />
            ))}
          </StaggeredList>
        </ScrollReveal>

        {/* Timeline Section */}
        <ScrollReveal
          delay={shouldReduceAnimations ? 200 : 400}
          className="relative"
        >
          <h3 className="text-responsive-lg font-bold text-center text-gray-800 mb-8 sm:mb-12">
            My Journey
          </h3>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line with parallax effect - desktop only */}
            {!isMobile && !shouldReduceAnimations && (
              <ParallaxContainer
                speed={0.2}
                className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 via-purple-500 to-blue-400 hidden md:block"
              >
                <div />
              </ParallaxContainer>
            )}

            <StaggeredList
              staggerDelay={shouldReduceAnimations ? 0.1 : 0.2}
              direction="left"
            >
              {timelineData.map((item, index) => (
                <TimelineItemComponent
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
            </StaggeredList>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
