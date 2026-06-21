import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "ML Case Studies",
  description:
    "Deep-dive machine learning case studies by Aman Ansari — DDoS detection, malware classification, and network anomaly detection.",
};

export default function CaseStudiesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <section className="section-shell pt-24 md:pt-28 pb-12">
        <div className="container-wide max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10 group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to home
          </Link>

          <SectionHeader
            label="Case studies"
            title="ML deep dives."
            titleAccent="Problem, method, and results."
            description="Detailed explorations of machine learning projects — problem framing, methodology, datasets, model selection, and outcomes. This section lives off the homepage scroll; reach it from the navigation."
          />

          <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-ink/10 py-6">
            {[
              { label: "Case studies", value: caseStudies.length },
              {
                label: "Featured",
                value: caseStudies.filter((cs) => cs.featured).length,
              },
              { label: "Focus", value: "Cybersecurity ML" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="stat-label">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-wide max-w-4xl">
          <div className="divide-y divide-ink/10">
            {caseStudies.map((study) => (
              <article key={study.id} className="work-row group">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1 min-w-0 space-y-3">
                    <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {study.domain}
                    </p>
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                      {study.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-[1.0625rem] leading-[1.65] max-w-2xl">
                      {study.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.slice(0, 5).map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/case-studies/${study.id}`}
                    className="font-mono inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-transparent bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-accent-foreground shadow-md hover:bg-accent-hover hover:shadow-lg active:scale-[0.98] shrink-0 self-start md:self-center"
                  >
                    Read case study
                    <ArrowUpRight size={15} aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Interested in collaborating or discussing these projects?
            </p>
            <Link href="/#contact" className="btn-primary">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
