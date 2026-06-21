import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { formatDate } from "@/lib/utils";

interface WorkCardProps {
  project: Project;
}

function formatPeriod(date: Date): string {
  return formatDate(date, { year: "numeric", month: "short" });
}

export default function WorkCard({ project }: WorkCardProps) {
  const period = formatPeriod(project.completedDate);
  const href = `/projects?highlight=${project.id}`;

  return (
    <article className="work-row group">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 min-w-0 space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground tabular-nums">
            {period}
          </p>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground capitalize font-medium">
              {project.category} · {(project.status ?? "completed").replace("-", " ")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl text-base md:text-[17px]">
            {project.description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3 md:items-center md:pt-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-ink/10 bg-transparent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-all hover:bg-ink/5 hover:border-ink/20 active:scale-[0.98]"
            >
              Code
              <ArrowUpRight size={15} aria-hidden />
            </a>
          )}
          <Link
            href={href}
            className="font-mono inline-flex min-h-[3.25rem] items-center gap-2 rounded-full border border-transparent bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-accent-foreground shadow-md hover:bg-accent-hover hover:shadow-lg active:scale-[0.98]"
          >
            View project
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}
