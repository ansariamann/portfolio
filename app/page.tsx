import { Layout } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  CertificationsSection,
  ProjectsSection,
  ContactSection,
} from "@/components/sections";
import CodingPlatformsSectionOptimized from "@/components/sections/CodingPlatformsSectionOptimized";
import { ScrollProgressIndicator } from "@/components/ui";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <Layout>
      <ScrollProgressIndicator />
      <main id="main-content" role="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <CodingPlatformsSectionOptimized />
        <ProjectsSection />
        <ContactSection />
      </main>

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
