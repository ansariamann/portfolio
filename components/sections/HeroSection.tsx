"use client";

import Link from "next/link";
import { scrollToSection } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";

export default function HeroSection() {
  const handleContact = () => scrollToSection("#contact");

  return (
    <section
      id="hero"
      className="section-shell pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20"
      role="banner"
    >
      <div className="container-main reveal">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-foreground leading-[1.05]">
            {siteConfig.author?.name ?? "Aman Ansari"}
          </h1>

          <p className="mt-7 text-lg md:text-xl lg:text-[1.35rem] text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
            Full-stack development — <strong className="font-semibold text-foreground">Java</strong>,{" "}
            <strong className="font-semibold text-foreground">React</strong>, and production systems
            for teams that need reliable delivery without unnecessary complexity.
          </p>

          <p className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {siteConfig.contact?.location ?? "Pune, IN"}. Using AI to create something that would take months in days .Open to
            full-time, contract, internship, or junior individual contributor
            roles.
          </p>

          <div className="mt-12 mx-auto flex max-w-4xl flex-col gap-6 rounded-[28px] border border-ink/10 bg-surface/80 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button type="button" onClick={handleContact} className="btn-primary flex-1 sm:min-w-[220px]">
                Hire me
              </button>
              <Link
                href="/cv/Aman_Ansari_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary flex-1 sm:min-w-[220px]"
              >
                See resume
              </Link>
            </div>

            <div className="flex justify-center">
              <Link href="/projects" className="btn-primary w-full sm:w-auto min-w-[280px] sm:min-w-[320px] bg-surface text-foreground border border-ink/10 hover:bg-muted">
                See my work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
