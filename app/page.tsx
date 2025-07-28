import { Layout } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
} from "@/components/sections";
import { ScrollProgressIndicator } from "@/components/ui";

export default function Home() {
  return (
    <Layout>
      <ScrollProgressIndicator />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
    </Layout>
  );
}
