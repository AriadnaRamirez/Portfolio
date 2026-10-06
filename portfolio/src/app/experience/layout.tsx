import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Experiencia",
  description:
    "Trayectoria de Ariadna Ramírez como Web Developer: freelance y GROVA Marketing. SaaS, sitios institucionales, UX/UI, APIs REST y despliegue.",
  path: "/experience/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
