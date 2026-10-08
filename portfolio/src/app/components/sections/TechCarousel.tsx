import { assetPath } from "@/app/lib/siteUrl";

type Logo = {
  file: string;
  label: string;
  /** Monochrome black marks that need flipping on the dark theme. */
  mono?: boolean;
};

const rowA: Logo[] = [
  { file: "react", label: "React" },
  { file: "nextjs", label: "Next.js", mono: true },
  { file: "typescript", label: "TypeScript" },
  { file: "javascript", label: "JavaScript" },
  { file: "tailwindcss", label: "Tailwind CSS" },
  { file: "vitejs", label: "Vite" },
  { file: "redux", label: "Redux" },
  { file: "zustand", label: "Zustand", mono: true },
  { file: "materialui", label: "Material UI" },
  { file: "html5", label: "HTML5" },
  { file: "css3", label: "CSS3" },
  { file: "figma", label: "Figma" },
];

const rowB: Logo[] = [
  { file: "nodejs", label: "Node.js" },
  { file: "nestjs", label: "NestJS" },
  { file: "express", label: "Express", mono: true },
  { file: "socketio", label: "Socket.IO", mono: true },
  { file: "postgresql", label: "PostgreSQL" },
  { file: "prisma", label: "Prisma", mono: true },
  { file: "mongodb", label: "MongoDB" },
  { file: "git", label: "Git" },
  { file: "github", label: "GitHub", mono: true },
  { file: "jest", label: "Jest" },
  { file: "vitest", label: "Vitest" },
  { file: "vercel", label: "Vercel", mono: true },
];

function LogoCard({ logo, hidden }: { logo: Logo; hidden: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="flex h-16 shrink-0 items-center gap-3 rounded-2xl border border-border bg-background px-5 shadow-[var(--shadow-card)] sm:h-20 sm:gap-4 sm:px-7"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, local SVGs */}
      <img
        src={assetPath(`/stack/${logo.file}.svg`)}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className={`h-7 w-7 object-contain sm:h-9 sm:w-9 ${logo.mono ? "dark:invert" : ""}`}
      />
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-foreground sm:text-base">
        {logo.label}
      </span>
    </li>
  );
}

function Track({ logos, reverse = false }: { logos: Logo[]; reverse?: boolean }) {
  return (
    <ul className={`diag-track ${reverse ? "is-reverse" : ""}`}>
      {[...logos, ...logos].map((logo, i) => (
        <LogoCard key={`${logo.file}-${i}`} logo={logo} hidden={i >= logos.length} />
      ))}
    </ul>
  );
}

export function TechCarousel({ label }: { label: string }) {
  const names = [...rowA, ...rowB].map((l) => l.label).join(", ");
  return (
    <div className="diag-stage" role="img" aria-label={`${label} ${names}`}>
      <div className="diag-rows">
        <Track logos={rowA} />
        <Track logos={rowB} reverse />
      </div>
    </div>
  );
}
