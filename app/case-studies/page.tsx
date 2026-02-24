import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import CaseStudyCard from "@/components/ui/CaseStudyCard";

export const metadata: Metadata = {
    title: "ML Case Studies",
    description:
        "Deep-dive machine learning case studies by Aman Ansari — covering DDoS detection, malware classification, and network anomaly detection.",
    keywords: [
        "machine learning case studies",
        "DDoS detection ML",
        "malware detection AI",
        "network anomaly detection",
        "cybersecurity machine learning",
    ],
};

export default function CaseStudiesPage() {
    return (
        <main id="main-content" className="min-h-screen bg-secondary/30">
            {/* ── Hero Banner — matches HeroSection exactly ─────── */}
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
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </Link>

                    {/* Badge — same style as HeroSection */}
                    <div className="inline-block mb-5">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-md flex items-center gap-2 w-fit">
                            <Brain size={13} />
                            Deep Dives
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
                        ML{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-pink-500">
                            Case Studies
                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-8">
                        Detailed explorations of machine learning projects — problem framing, methodology,
                        datasets, model selection, and real-world results.
                    </p>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-8">
                        {[
                            { label: "Case Studies", value: caseStudies.length },
                            { label: "Featured", value: caseStudies.filter((cs) => cs.featured).length },
                            { label: "Focus Area", value: "Cybersecurity" },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex flex-col">
                                <span className="text-2xl font-bold text-foreground">{value}</span>
                                <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Cards List ─────────────────────────────────────── */}
            <section className="container max-w-5xl mx-auto px-6 pb-20">
                <div className="flex flex-col gap-4">
                    {caseStudies.map((cs, i) => (
                        <CaseStudyCard key={cs.id} caseStudy={cs} index={i} />
                    ))}
                </div>

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
