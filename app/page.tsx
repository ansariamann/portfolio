import dynamic from "next/dynamic";
import { Layout } from "@/components/layout";
import {
  HeroSection,
  AboutSection,
  WorkSection,
  ContactSection,
} from "@/components/sections";

const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection"),
  { loading: () => <SectionPlaceholder id="skills" label="Skills" /> }
);

const CertificationsSection = dynamic(
  () => import("@/components/sections/CertificationsSection"),
  { loading: () => <SectionPlaceholder id="certifications" label="Certifications" /> }
);

const CodingPlatformsSection = dynamic(
  () => import("@/components/sections/CodingPlatformsSection"),
  { loading: () => <SectionPlaceholder id="coding-platforms" label="Coding platforms" /> }
);

function SectionPlaceholder({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} className="section-shell border-t border-ink/10">
      <div className="container-main">
        <p className="section-label">{label}</p>
        <div className="mt-6 h-32 rounded-xl bg-secondary/40 animate-pulse" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout>
      <main id="main-content" role="main">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <SkillsSection />
        <CertificationsSection />
        <CodingPlatformsSection />
        <ContactSection />
      </main>
    </Layout>
  );
}
