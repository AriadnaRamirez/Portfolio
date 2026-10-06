import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Contacto",
  description:
    "Contacta a Ariadna Ramírez para vacantes o proyectos de desarrollo web: Frontend React/TypeScript, UX/UI y fullstack. Remoto, híbrido o presencial.",
  path: "/contact/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
