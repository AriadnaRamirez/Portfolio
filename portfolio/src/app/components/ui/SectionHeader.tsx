import { HandNote } from "./HandNote";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  note?: string;
  as?: "h1" | "h2";
};

export function SectionHeader({
  kicker,
  title,
  subtitle,
  note,
  as = "h1",
}: SectionHeaderProps) {
  const TitleTag = as;

  return (
    <header className="max-w-3xl space-y-5">
      <Reveal variant="left">
        <p className="section-kicker">{kicker}</p>
      </Reveal>
      <Reveal variant="blur" delay={100}>
        <TitleTag className="section-title">{title}</TitleTag>
      </Reveal>
      {subtitle ? (
        <Reveal variant="up" delay={200}>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      ) : null}
      {note ? (
        <Reveal variant="drop" delay={320}>
          <HandNote as="h3" arrow="down-right" className="rotate-1">
            {note}
          </HandNote>
        </Reveal>
      ) : null}
    </header>
  );
}
