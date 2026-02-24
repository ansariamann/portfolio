"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import AnimatedSectionHeading from "@/components/ui/AnimatedSectionHeading";



export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="min-h-screen py-20 bg-secondary/30 relative overflow-hidden"
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
              <span className="px-4 py-2 bg-secondary/50 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-border/50">
                Get to know me
              </span>
            </motion.div>

            <AnimatedSectionHeading
              text="About Me"
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-foreground"
              preset="default"
            />
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
                  {/* About Section Profile Image */}
                  <Image
                    src="/images/about-photo.jpg"
                    alt="Aman Ansari - About Me"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.parentElement?.querySelector(
                        ".fallback-placeholder"
                      ) as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />

                  {/* Fallback placeholder (hidden by default) */}
                  <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-center">
                      <motion.div
                        className="w-32 h-32 bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl"
                        animate={{
                          boxShadow: [
                            "0 0 30px rgba(0, 102, 255, 0.5)",
                            "0 0 50px rgba(139, 0, 255, 0.7)",
                            "0 0 30px rgba(0, 102, 255, 0.5)",
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
                        Software Developer
                      </p>
                    </div>
                  </div>

                  {/* Overlay gradient for better text readability when image loads */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-vibrant-blue/60 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-vibrant-purple/60 rounded-full" />
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
                  className="text-xl text-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Hi! I&apos;m{" "}
                  <span className="font-semibold text-primary">
                    Aman Ansari
                  </span>
                  , a passionate junior software developer who loves crafting
                  <span className="text-primary font-medium">
                    {" "}
                    digital experiences
                  </span>
                  that make a difference.
                </motion.p>

                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
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
                    className="glass-card p-4 rounded-2xl transition-all duration-300 relative group overflow-hidden"
                    whileHover={{ y: -2, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  >
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="text-2xl mb-2 relative z-10">{item.icon}</div>
                    <h4 className="font-semibold text-foreground text-sm relative z-10">
                      {item.label}
                    </h4>
                    <p className="text-xs text-muted-foreground relative z-10">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Personal touch */}
              <motion.div
                className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <p className="text-muted-foreground italic leading-relaxed">
                  &quot;I believe that great software is not just about clean
                  code, but about creating meaningful experiences that connect
                  with people and solve real-world problems.&quot;
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-foreground text-sm font-bold">A</span>
                  </div>
                  <span className="text-muted-foreground font-medium">-Aman</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
