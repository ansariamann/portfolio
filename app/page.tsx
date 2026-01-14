import dynamic from "next/dynamic";
import { Layout } from "@/components/layout";
import { HeroSection, AboutSection, ContactSection } from "@/components/sections";

// Lazy-load heavy, below-the-fold sections on the client to
// reduce initial bundle size and improve first interaction time.
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection"),
  {
    ssr: false,
    loading: () => (
      <section
        id="skills"
        className="min-h-screen py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center"
      >
        <p className="text-gray-500 text-sm">Loading skills...</p>
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
        className="min-h-screen py-20 bg-slate-900 flex items-center justify-center"
      >
        <p className="text-gray-300 text-sm">Loading certifications...</p>
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
        className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex items-center justify-center"
      >
        <p className="text-gray-300 text-sm">Loading coding platforms...</p>
      </section>
    ),
  }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection"),
  {
    ssr: false,
    loading: () => (
      <section
        id="projects"
        className="min-h-screen py-20 bg-slate-950 flex items-center justify-center"
      >
        <p className="text-gray-300 text-sm">Loading projects...</p>
      </section>
    ),
  }
);

export default function Home() {
  return (
    <Layout>
      <main id="main-content" role="main">
        {/* Above-the-fold sections are rendered on the server for fast first paint */}
        <HeroSection />
        <AboutSection />

        {/* Heavy sections load progressively on the client */}
        <SkillsSection />
        <CertificationsSection />
        <CodingPlatformsSection />
        <ProjectsSection />

        {/* Contact section remains server-rendered for accessibility/SEO */}
        <ContactSection />
      </main>
    </Layout>
  );
}
