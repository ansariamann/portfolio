import { Layout } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  CertificationsSection,
  CodingPlatformsSection,
  ProjectsSection,
  ContactSection,
} from "@/components/sections";

export default function Home() {


  return (
    <Layout>
      <main id="main-content" role="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <CertificationsSection />
        <CodingPlatformsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Copyright Section */}

    </Layout>
  );
}
