import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import WorkCard from "@/components/ui/WorkCard";
import { projects } from "@/data/projects";

export default function WorkSection() {
  const featuredProjects = projects
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    )
    .slice(0, 4);

  return (
    <section id="work" className="section-shell border-t border-ink/10">
      <div className="container-main">
        <SectionHeader
          label="Selected work"
          title="Proof in production."
          titleAccent="Built under real constraints."
          description="Projects with attention to architecture, performance, and maintainability — not just demos."
          align="center"
        />

        <div className="mt-2 max-w-5xl mx-auto">
          {featuredProjects.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="btn-secondary !text-base !py-3 !px-6 !min-h-[48px]"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
