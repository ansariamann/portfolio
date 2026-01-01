"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { ValueProposition } from "@/components/ui/ValueProposition";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { VisualAnchor } from "@/components/ui/VisualAnchor";
import { TechStack } from "@/components/ui/TechStack";
import { SocialProof } from "@/components/ui/SocialProof";
import { useMobileOptimizedAnimation } from "@/lib/hooks";

// Simplified animated background with performance optimizations
const SimplifiedBackground = ({
  shouldReduceAnimations = false,
  blurIntensity = 1,
}) => {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const shouldAnimate = !shouldReduceAnimations && !prefersReducedMotion;
  const blurClass = blurIntensity > 0 ? "blur-3xl" : "";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle gradient orbs */}
      <motion.div
        className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-indigo-700/10 rounded-full ${blurClass}`}
        animate={
          shouldAnimate
            ? {
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }
            : {}
        }
        transition={
          shouldAnimate
            ? {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
        style={{
          willChange: shouldAnimate ? "transform, opacity" : "auto",
        }}
      />
      <motion.div
        className={`absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-700/10 to-purple-800/10 rounded-full ${blurClass}`}
        animate={
          shouldAnimate
            ? {
                scale: [1.1, 1, 1.1],
                opacity: [0.3, 0.1, 0.3],
              }
            : {}
        }
        transition={
          shouldAnimate
            ? {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : {}
        }
        style={{
          willChange: shouldAnimate ? "transform, opacity" : "auto",
        }}
      />

      {/* Subtle grid pattern - only show if not reducing animations */}
      {!shouldReduceAnimations && (
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
      )}
    </div>
  );
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const {
    shouldReduceAnimations,
    isMobile,
    isSmallMobile,
    touchDevice,
    screenHeight,
    getTouchTargetSize,
  } = useMobileOptimizedAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Simplified parallax effects for better performance
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "2%"] : ["0%", "10%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.9]);

  // We avoid client-only state that affects the initial render to prevent
  // React hydration mismatches between server and client.
  // Animations are now based only on `shouldReduceAnimations`.

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Contact/Email function
  const handleContact = () => {
    // Try to open email client first
    const email = "contact@example.com"; // Replace with actual email
    const subject = "Let's work together";
    const body =
      "Hi Aman, I'd like to discuss a potential project opportunity.";

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      window.location.href = mailtoLink;
    } catch (error) {
      // Fallback: scroll to contact section if email client fails
      scrollToSection("contact");
    }
  };

  // Download CV function
  const handleDownloadCV = () => {
    // Direct path to the CV file
    const cvPath = "/cv/Aman_Ansari_CV.pdf";

    // Create a temporary anchor element and trigger download
    const link = document.createElement("a");
    link.href = cvPath;
    link.download = "Aman_Ansari_CV.pdf";
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800",
        // Prevent horizontal scrolling
        "mobile-no-scroll"
      )}
      style={{
        // Ensure minimum height is always viewport height
        minHeight: "100vh",
      }}
      role="banner"
      aria-label="Hero section - Introduction and main call-to-action"
    >
      {/* Simplified animated background - reduced on mobile */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: shouldReduceAnimations ? 0 : backgroundY,
          opacity: shouldReduceAnimations ? 1 : opacity,
        }}
      >
        <SimplifiedBackground
          shouldReduceAnimations={shouldReduceAnimations}
          blurIntensity={1}
        />
      </motion.div>

      {/* Main content container with enhanced mobile-first responsive structure */}
      <div className="container-responsive relative z-10 max-w-7xl">
        <div
          className={`
          grid gap-6 items-center min-h-screen-mobile
          ${
            isMobile
              ? "grid-cols-1 py-8 px-4"
              : "lg:grid-cols-[3fr_2fr] gap-12 py-20 px-6"
          }
        `}
        >
          {/* Content Section - Mobile-first stacked layout */}
          <div
            className={`
            ${
              isMobile
                ? "text-center space-y-6 order-2"
                : "text-center lg:text-left order-1"
            }
          `}
          >
            {/* Greeting - Mobile optimized */}
            <motion.div
              initial={{
                opacity: shouldReduceAnimations ? 1 : 0,
                y: shouldReduceAnimations ? 0 : 20,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceAnimations
                  ? {
                      type: "tween" as const,
                      duration: 0.2,
                      delay: 0,
                    }
                  : {
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 30,
                      delay: 0.1,
                    }
              }
              className={`${isMobile ? "mb-4" : "mb-6"}`}
              role="presentation"
            >
              <span
                className={`
                inline-block bg-white/10 backdrop-blur-sm rounded-full font-medium text-blue-300 border border-white/20
                ${isMobile ? "px-3 py-2 text-sm" : "px-4 py-2 text-sm"}
              `}
                aria-label="Greeting message"
              >
                👋 Hello, I&apos;m
              </span>
            </motion.div>

            {/* Value Proposition Component */}
            <ValueProposition
              headline="Aman Ansari"
              subheadline="I build reliable, production-ready web applications with React & Node.js"
              description="Transforming complex business requirements into scalable, user-friendly solutions. Specialized in modern JavaScript frameworks and full-stack development."
              className={isMobile ? "mb-6" : "mb-8"}
            />

            {/* Technology Stack */}
            <TechStack className={isMobile ? "mb-6" : "mb-8"} />

            {/* Social Proof and Links */}
            <SocialProof className={isMobile ? "mb-8" : "mb-10"} />

            {/* CTA buttons - Enhanced for mobile touch */}
            <div
              className={`
              ${isMobile ? "flex flex-col gap-4 px-2" : ""}
            `}
            >
              <CTAButtons
                primaryAction={{
                  label: "Download CV",
                  onClick: handleDownloadCV,
                }}
                secondaryAction={{
                  label: "Let's Talk",
                  onClick: handleContact,
                }}
              />
            </div>
          </div>

          {/* Visual Section - Mobile-first positioning */}
          <motion.div
            className={`
              relative flex justify-center
              ${
                isMobile
                  ? "order-1 mb-4"
                  : "lg:justify-end order-first lg:order-last"
              }
            `}
            initial={{
              opacity: shouldReduceAnimations ? 1 : 0,
              x: shouldReduceAnimations ? 0 : isMobile ? 0 : 30,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              shouldReduceAnimations
                ? {
                    type: "tween" as const,
                    duration: 0.2,
                    delay: 0,
                  }
                : {
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2,
                  }
            }
          >
            <VisualAnchor
              primaryImage={{
                src: "/images/profile-photo.jpg",
                alt: "Aman Ansari - Software Developer",
                width: isMobile ? 240 : 320,
                height: isMobile ? 320 : 427,
              }}
              fallbackContent={{
                initials: "AA",
                backgroundColor: "#3B82F6",
                textColor: "#FFFFFF",
                name: "Aman Ansari",
                role: "Software Developer",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Enhanced gradient overlay for better mobile text readability */}
      <div
        className={`
        absolute inset-0 pointer-events-none
        ${
          isMobile
            ? "bg-gradient-to-b from-transparent via-transparent to-gray-900/20"
            : "bg-gradient-to-b from-transparent via-transparent to-gray-900/10"
        }
      `}
      />
    </section>
  );
}
