import dynamic from "next/dynamic";
import { Layout } from "@/components/layout";
import { HeroSection, AboutSection, ContactSection } from "@/components/sections";

// Lazy-load heavy, below-the-fold sections
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection"),
  {
    ssr: false,
    loading: () => (
      <section
        id="skills"
        className="min-h-screen py-20 bg-secondary/30 flex items-center justify-center"
      >
        <p className="text-muted-foreground text-sm">Loading skills...</p>
      </section>
    ),
  }
);

const CertificationsSection = dynamic(
  () => import("@/components/sections/CertificationsSection"),
  {
    ssr: false,
    loading: () => (
      <section
        id="certifications"
        className="min-h-screen py-20 bg-secondary/30 flex items-center justify-center"
      >
        <p className="text-muted-foreground text-sm">Loading certifications...</p>
      </section>
    ),
  }
);

const CodingPlatformsSection = dynamic(
  () => import("@/components/sections/CodingPlatformsSection"),
  {
    ssr: false,
    loading: () => (
      <section
        id="coding-platforms"
        className="min-h-screen py-20 bg-background flex items-center justify-center"
      >
        <p className="text-muted-foreground text-sm">Loading coding platforms...</p>
      </section>
    ),
  }
);

export default function Home() {
  return (
    <Layout>
      <main id="main-content" role="main">
        {/* Above-the-fold — server rendered */}
        <HeroSection />
        <AboutSection />

        {/* Heavy sections load progressively */}
        <SkillsSection />
        <CertificationsSection />
        <CodingPlatformsSection />

        {/* Contact — server rendered */}
        <ContactSection />
      </main>
    </Layout>
  );
}
