import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "CV",
  description:
    "CV de Ariadna Ramírez, Fullstack Web Developer | Frontend · React · TypeScript · UX/UI. Consulta o descarga en PDF, en español o inglés.",
  path: "/resume/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
