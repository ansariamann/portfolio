import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import CaseStudyDetail from "@/components/ui/CaseStudyDetail";
import CaseStudyNavigation from "@/components/ui/CaseStudyNavigation";
import { notFound } from "next/navigation";

interface CaseStudyPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = caseStudies.find((cs) => cs.id === params.id);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
      description: "The case study you're looking for doesn't exist.",
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    keywords: [
      caseStudy.domain,
      caseStudy.title,
      ...caseStudy.keyTakeaways.slice(0, 3),
    ],
  };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({
    id: cs.id,
  }));
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudies.find((cs) => cs.id === params.id);

  if (!caseStudy) {
    notFound();
  }

  const otherCaseStudies = caseStudies.filter((cs) => cs.id !== params.id);

  return (
    <main id="main-content" className="min-h-screen bg-secondary/30">
      {/* ── Hero Banner ────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 min-h-[40vh] flex items-center">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-orb-float" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-orb-float-slow" />
          <div
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-orb-float"
            style={{ animationDelay: "3s" }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container max-w-5xl mx-auto px-6 relative z-10 w-full">
          {/* Back button */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Case Studies
          </Link>
        </div>
      </section>

      {/* ── Case Study Detail ────────────────────────────────── */}
      <section className="container max-w-4xl mx-auto px-6 py-12 md:py-16">
        <CaseStudyDetail caseStudy={caseStudy} />
      </section>

      {/* ── Other Case Studies Navigation ────────────────────── */}
      <section className="container max-w-4xl mx-auto px-6 pb-20">
        <CaseStudyNavigation
          otherCaseStudies={otherCaseStudies}
          currentId={caseStudy.id}
        />

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4 text-sm">
            Interested in collaborating or discussing these projects?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
