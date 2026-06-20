import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import { experienceData, profileStats } from "@/data/about";
import { siteConfig } from "@/data/site-config";

export default function AboutSection() {
  return (
    <section id="about" className="section-shell border-t border-ink/10">
      <div className="container-main">
        {/* Centered header */}
        <SectionHeader
          label="About"
          title="Engineer first."
          titleAccent="Clarity under pressure."
          align="center"
        />

        {/* Two column: text + image */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start mt-4 max-w-5xl mx-auto">
          <div>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a software developer with a focus on{" "}
                <strong className="font-bold text-foreground">
                  modern web applications
                </strong>
                ,{" "}
                <strong className="font-bold text-foreground">
                  clean architecture
                </strong>
                , and{" "}
                <strong className="font-bold text-foreground">
                  accessible UI
                </strong>{" "}
                — building systems teams can maintain and extend.
              </p>
              <p>
                {siteConfig.author?.bio ?? ""} If you need someone who ships, explains
                trade-offs clearly, and cares about the details, we&apos;ll get
                along.
              </p>
            </div>

            <div className="mt-14">
              <h3 className="section-label mb-6">Where I&apos;ve worked</h3>
              <ul className="divide-y divide-border/50">
                {experienceData.map((item) => (
                  <li key={item.id} className="experience-item">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.04] text-base font-bold text-foreground">
                      {item.company.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-foreground text-base">{item.role}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {item.company}
                        {item.current && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground/80 tabular-nums">
                        {item.period}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 space-y-8">
            <div className="relative aspect-[4/5] w-full max-w-[300px] mx-auto overflow-hidden rounded-2xl border border-ink/10 bg-muted/30 shadow-card">
              <Image
                src="/images/profile-photo.jpg"
                alt={`${siteConfig.author?.name ?? "Aman Ansari"}, profile photo`}
                fill
                className="object-cover"
                sizes="300px"
                priority
              />
            </div>

            <dl className="grid gap-5">
              {profileStats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <dt className="stat-label">{stat.label}</dt>
                  <dd className="stat-value">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
