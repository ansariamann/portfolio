interface SectionHeaderProps {
  label: string;
  title: string;
  titleAccent?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  label,
  title,
  titleAccent,
  description,
  className = "",
  align = "left",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`mb-10 md:mb-14 max-w-3xl ${alignClass} ${className}`}>
      <p className="section-label mb-4">{label}</p>
      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-foreground leading-[1.12]">
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="text-muted-foreground font-medium">{titleAccent}</span>
          </>
        )}
      </h2>
      {description && (
        <p className="mt-5 text-muted-foreground leading-relaxed text-balance text-base md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
