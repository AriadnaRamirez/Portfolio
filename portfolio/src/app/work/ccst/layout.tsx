import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Caso de estudio: CCST Study Lab",
  description:
    "Plataforma de estudio para la certificación Cisco CCST Cybersecurity: 51 tarjetas corregidas en el servidor, rachas de dominio y sesiones adaptativas con Next.js, NestJS y PostgreSQL.",
  path: "/work/ccst/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
