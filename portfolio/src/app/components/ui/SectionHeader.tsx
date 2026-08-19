type SectionHeaderProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({
  kicker,
  title,
  subtitle,
  as = "h1",
}: SectionHeaderProps) {
  const TitleTag = as;

  return (
    <header className="max-w-3xl space-y-4">
      <p className="section-kicker">{kicker}</p>
      <div className="rule-accent" />
      <TitleTag className="section-title">{title}</TitleTag>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
