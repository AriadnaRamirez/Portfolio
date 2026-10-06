import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Sobre mí",
  description:
    "Conoce a Ariadna Ramírez, Fullstack Web Developer en Oaxaca, México: enfoque en Frontend React y TypeScript, criterio UX/UI y entregas a producción.",
  path: "/about/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
