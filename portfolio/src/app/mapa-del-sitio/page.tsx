import Link from "next/link";
import { pageMetadata } from "@/app/lib/seo";
import { site } from "@/app/lib/site";
import { assetPath } from "@/app/lib/siteUrl";

export const metadata = pageMetadata({
  title: "Mapa del sitio",
  description: `Mapa del sitio de ${site.name}: proyectos, stack, certificaciones, experiencia, formación, CV y contacto.`,
  path: "/mapa-del-sitio/",
});

const pages = [
  { href: "/", label: "Inicio" },
  { href: "/work/", label: "Proyectos" },
  { href: "/work/crm/", label: "Caso de estudio: Grupo CRM Extintores" },
  { href: "/work/hmdv/", label: "Caso de estudio: Hotel Marqués del Valle" },
  { href: "/work/ccst/", label: "Caso de estudio: CCST Study Lab" },
  { href: "/experience/", label: "Experiencia" },
  { href: "/about/", label: "Sobre mí" },
  { href: "/contact/", label: "Contacto" },
  { href: "/resume/", label: "CV" },
];

const sections = [
  { href: "/#work", label: "Proyectos destacados" },
  { href: "/#skills", label: "Stack" },
  { href: "/#certs", label: "Certificaciones y programas" },
  { href: "/#about", label: "Sobre mí" },
  { href: "/#experience", label: "Experiencia" },
  { href: "/#education", label: "Formación" },
  { href: "/#contact", label: "Contacto" },
];

const resources = [
  { href: "/sitemap.xml", label: "sitemap.xml" },
  { href: "/robots.txt", label: "robots.txt" },
];

const linkClass = "text-foreground transition-colors hover:text-accent";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-mono-label text-muted">{title}</h2>
      <ul className="mt-4 space-y-3 border-t border-border pt-4">{children}</ul>
    </section>
  );
}

export default function SiteMapPage() {
  return (
    <div className="page-shell py-20 sm:py-28">
      <p className="section-kicker is-visible">{site.name}</p>
      <h1 className="section-title mt-5">Mapa del sitio</h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        Todas las páginas y secciones del portfolio en un solo lugar.
      </p>

      <div className="mt-12 grid gap-10 sm:grid-cols-3">
        <Group title="Páginas">
          {pages.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className={linkClass}>
                {p.label}
              </Link>
            </li>
          ))}
        </Group>
        <Group title="Secciones del inicio">
          {sections.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className={linkClass}>
                {s.label}
              </Link>
            </li>
          ))}
        </Group>
        <Group title="Recursos">
          {resources.map((r) => (
            <li key={r.href}>
              <a href={assetPath(r.href)} className={linkClass}>
                {r.label}
              </a>
            </li>
          ))}
        </Group>
      </div>
    </div>
  );
}
