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
    <main id="main-content" className="min-h-screen bg-background relative">
      {/* Full-page continuous subtle grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <section className="section-shell pt-24 md:pt-28 pb-8 relative z-10">
        <div className="container-wide max-w-4xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back to case studies
          </Link>
        </div>
      </section>

      <section className="container-wide max-w-4xl pb-12 md:pb-16 relative z-10">
        <CaseStudyDetail caseStudy={caseStudy} />
      </section>

      <section className="container-wide max-w-4xl pb-20 md:pb-28 relative z-10">
        <CaseStudyNavigation
          otherCaseStudies={otherCaseStudies}
          currentId={caseStudy.id}
        />

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Interested in collaborating or discussing these projects?
          </p>
          <Link href="/#contact" className="btn-primary">
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
