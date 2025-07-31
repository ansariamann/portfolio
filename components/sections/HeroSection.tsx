"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useMobileOptimizedAnimation } from "@/lib/hooks";
import { Github as GitHubIcon, Linkedin, Mail, Download } from "lucide-react";

// Advanced animated background with sophisticated graphics
const AdvancedAnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep blue gradient orbs matching the reference */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-indigo-700/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-700/20 to-purple-800/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional atmospheric elements */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated geometric network */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 102, 255, 0.5)" />
            <stop offset="50%" stopColor="rgba(139, 0, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(255, 0, 128, 0.5)" />
          </linearGradient>
        </defs>

        {/* Animated connecting lines */}
        {[...Array(12)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${10 + i * 8}%`}
            y1={`${20 + Math.sin(i) * 30}%`}
            x2={`${20 + i * 7}%`}
            y2={`${60 + Math.cos(i) * 20}%`}
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
              x1: [`${10 + i * 8}%`, `${15 + i * 8}%`, `${10 + i * 8}%`],
              y1: [
                `${20 + Math.sin(i) * 30}%`,
                `${25 + Math.sin(i) * 30}%`,
                `${20 + Math.sin(i) * 30}%`,
              ],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Animated nodes */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={`${15 + i * 12}%`}
            cy={`${30 + Math.sin(i * 0.5) * 40}%`}
            r="3"
            fill="rgba(0, 102, 255, 0.6)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1.5, 1, 0],
              opacity: [0, 0.8, 1, 0.8, 0],
              cy: [
                `${30 + Math.sin(i * 0.5) * 40}%`,
                `${35 + Math.sin(i * 0.5) * 40}%`,
                `${30 + Math.sin(i * 0.5) * 40}%`,
              ],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Floating code-like elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`code-${i}`}
          className="absolute text-vibrant-cyan/40 font-mono text-sm select-none"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 15}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          {["<div>", "function()", "{ }", "const", "return", "=> {}"][i]}
        </motion.div>
      ))}

      {/* Animated hexagonal patterns */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute w-16 h-16 border border-vibrant-purple/40"
          style={{
            top: `${25 + i * 20}%`,
            right: `${10 + i * 8}%`,
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Particle system */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      ))}

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
};

// Interactive cursor follower
const CursorFollower = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
};

// Typewriter effect with modern styling
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { shouldReduceAnimations, getResponsiveValue } =
    useMobileOptimizedAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  // Modern typewriter effect
  const typewriterSpeed = getResponsiveValue(80, 60, 40);
  const mainTitle = useTypewriter("Creative Developer", typewriterSpeed);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setShowContent(true);
      },
      shouldReduceAnimations ? 300 : 1000
    );

    return () => clearTimeout(timer);
  }, [shouldReduceAnimations]);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Download CV function
  const handleDownloadCV = () => {
    // List of possible CV file names to try
    const cvFiles = [
      "/cv/Aman_Ansari_CV.pdf",
      "/cv/Aman_Ansari_CV.docx",
      "/cv/Aman_Ansari_CV.txt",
      "/cv/resume.pdf",
      "/cv/cv.pdf",
    ];

    // Function to try downloading a file
    const tryDownload = async (filePath: string): Promise<boolean> => {
      try {
        const response = await fetch(filePath, { method: "HEAD" });
        if (response.ok) {
          // File exists, create download link
          const link = document.createElement("a");
          link.href = filePath;
          link.download = filePath.split("/").pop() || "Aman_Ansari_CV";
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    };

    // Try each file until one is found
    const downloadCV = async () => {
      for (const filePath of cvFiles) {
        const success = await tryDownload(filePath);
        if (success) {
          console.log(`CV downloaded: ${filePath}`);
          return;
        }
      }

      // If no CV file is found, show a helpful message
      alert(
        "CV file not found. Please add your CV file to the /public/cv/ directory.\n\n" +
          "Supported formats:\n" +
          "• Aman_Ansari_CV.pdf (recommended)\n" +
          "• Aman_Ansari_CV.docx\n" +
          "• Aman_Ansari_CV.txt\n\n" +
          "Place your CV file in the public/cv/ folder and it will be automatically available for download."
      );
    };

    downloadCV();
  };

  return (
    <>
      <CursorFollower />
      <section
        ref={containerRef}
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-900"
      >
        {/* Advanced animated background */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY, opacity }}
        >
          <AdvancedAnimatedBackground />
        </motion.div>

        {/* Main content - Two column layout */}
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Column - Text Content */}
            <motion.div
              className="text-left lg:text-left"
              style={{ y: shouldReduceAnimations ? 0 : textY }}
            >
              {/* Modern greeting text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-blue-300 border border-white/20">
                  👋 Hello, I&apos;m
                </span>
              </motion.div>

              {/* Large name with modern typography */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mb-8"
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    Aman
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Ansari
                  </span>
                  <br />
                  <div className="mt-4 flex items-center">
                    <span className="text-green-400 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-mono mr-2"></span>
                    <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-mono text-green-300 bg-black/20 px-4 py-2 rounded-lg border border-green-400/30 backdrop-blur-sm">
                      {shouldReduceAnimations
                        ? "Software Developer"
                        : `${mainTitle.replace(
                            "Creative Developer",
                            "Software Developer"
                          )}`}
                    </span>
                  </div>
                  {!shouldReduceAnimations && (
                    <motion.span
                      className="inline-block w-1.5 h-12 md:h-16 lg:h-20 bg-gradient-to-b from-blue-400 to-purple-400 ml-3"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </h1>
              </motion.div>

              {/* Modern subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-10"
              >
                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
                  I craft{" "}
                  <span className="text-blue-400 font-medium">
                    digital experiences
                  </span>{" "}
                  that blend creativity with functionality, turning ideas into{" "}
                  <span className="text-purple-400 font-medium">
                    beautiful reality
                  </span>
                </p>
              </motion.div>

              {/* Social links with modern design */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex space-x-6 mb-12"
              >
                {[
                  {
                    icon: GitHubIcon,
                    href: "https://github.com",
                    label: "GitHub",
                  },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:john@example.com",
                    label: "Email",
                  },
                ].map(({ icon: Icon, href, label }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300"
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                    <span className="sr-only">{label}</span>

                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                  </motion.a>
                ))}
              </motion.div>

              {/* Modern CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={showContent ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <Button
                    onClick={() => scrollToSection("projects")}
                    className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl border-0 shadow-xl transition-all duration-300"
                  >
                    View My Work
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <Button
                    onClick={handleDownloadCV}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Photo Section */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Animated photo container */}
              <div className="relative">
                {/* Animated background elements for photo */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Static vibrant border */}
                <div
                  className="absolute -inset-2 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(45deg, #0066ff, #8b00ff, #ff0080, #00ffff)",
                  }}
                />

                {/* Professional photo with sophisticated styling */}
                <motion.div
                  className="relative w-80 h-96 lg:w-96 lg:h-[28rem] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden border-4 border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Profile Image */}
                  <img
                    src="/images/profile-photo.jpg"
                    alt="Aman Ansari - Software Developer"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />

                  {/* Fallback placeholder (hidden by default) */}
                  <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="text-center">
                      <motion.div
                        className="w-24 h-24 bg-gradient-to-r from-vibrant-blue to-vibrant-purple rounded-full mx-auto mb-4 flex items-center justify-center"
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(0, 102, 255, 0.4)",
                            "0 0 40px rgba(139, 0, 255, 0.6)",
                            "0 0 20px rgba(0, 102, 255, 0.4)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="text-3xl font-bold text-white">A</span>
                      </motion.div>
                      <p className="text-gray-400 text-sm">Aman Ansari</p>
                      <p className="text-gray-500 text-xs mt-2">
                        Software Developer
                      </p>
                    </div>
                  </div>

                  {/* Overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Floating particles around photo */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`photo-particle-${i}`}
                      className="absolute w-2 h-2 bg-vibrant-cyan/60 rounded-full"
                      style={{
                        top: `${20 + i * 15}%`,
                        left: `${10 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/20 pointer-events-none" />
      </section>
    </>
  );
}
