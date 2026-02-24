"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ValueProposition } from "@/components/ui/ValueProposition";
import { CTAButtons } from "@/components/ui/CTAButtons";
import { VisualAnchor } from "@/components/ui/VisualAnchor";
import { TechStack } from "@/components/ui/TechStack";
import { SocialProof } from "@/components/ui/SocialProof";

export default function HeroSection() {
  const handleContact = () => {
    window.location.href = "mailto:amanansari@example.com?subject=Let's%20work%20together";
  };

  const handleDownloadCV = () => {
    window.open("/cv/Aman_Ansari_CV.pdf", "_blank");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-secondary/30"
      role="banner"
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-orb-float" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-orb-float-slow" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-orb-float" style={{ animationDelay: "3s" }} />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-md">
                👋 Hello, I&apos;m
              </span>
            </motion.div>

            <ValueProposition
              headline="Aman Ansari"
              subheadline="Software Engineer & Machine Learning Enthusiast"
              description="I build production-ready web applications that are fast, secure, and visually stunning. Specialized in the React ecosystem and modern frontend architecture."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <TechStack />
              <div className="mt-8">
                <SocialProof />
              </div>
            </motion.div>
          </div>

          {/* Visual Anchor / Image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Glow effect behind visual anchor */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 transform scale-110" />
              <VisualAnchor
                primaryImage={{
                  src: "/images/profile-photo.jpg",
                  alt: "Aman Ansari",
                  width: 400,
                  height: 500,
                }}
                fallbackContent={{
                  initials: "AA",
                  backgroundColor: "#3B82F6",
                  textColor: "#FFFFFF",
                  name: "Aman Ansari",
                  role: "Software Engineer",
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
