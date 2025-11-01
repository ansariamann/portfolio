import { Layout } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  CodingPlatformsSection,
  ProjectsSection,
  ContactSection,
} from "@/components/sections";
import { ScrollProgressIndicator } from "@/components/ui";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import PerformanceToggle from "@/components/ui/PerformanceToggle";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <ScrollProgressIndicator />
      <PerformanceMonitor />
      <PerformanceToggle />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <CodingPlatformsSection />
      <ProjectsSection />
      <ContactSection />

      {/* Copyright Section */}
      <div className="bg-slate-900 text-center py-8 border-t border-gray-800">
        <p className="text-gray-400 font-light">
          © {currentYear} Crafted with <span className="text-red-400">♥</span>{" "}
          using Next.js, TypeScript, and Framer Motion.
        </p>
      </div>
    </Layout>
  );
}
