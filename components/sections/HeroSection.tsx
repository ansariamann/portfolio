"use client";

import Link from "next/link";
import { scrollToSection } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";
import { TechStack } from "@/components/ui/TechStack";

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
            Full-stack development — <strong className="font-semibold text-foreground">React</strong>,{" "}
            <strong className="font-semibold text-foreground">TypeScript</strong>, and production systems
            for teams that need reliable delivery without unnecessary complexity.
          </p>

          <div className="mt-10">
            <p className="section-label mb-4">Stack</p>
            <div className="flex justify-center">
              <TechStack />
            </div>
          </div>

          <p className="mt-10 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {siteConfig.contact?.location ?? "Pune, IN"}. 2+ years shipping web apps. Open to
            full-time, contract, internship, or junior individual contributor
            roles.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center flex-wrap gap-4">
            <button type="button" onClick={handleContact} className="btn-primary">
              Hire me
            </button>
            <Link href="/projects" className="btn-secondary">
              See my work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
