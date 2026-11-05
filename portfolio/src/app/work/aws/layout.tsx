import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Caso de estudio: AWS Study Lab",
  description:
    "App para estudiar la certificación AWS Cloud Practitioner: 352 cartas, 208 preguntas originales y un examen de hasta 65 preguntas en 90 minutos. Next.js, NestJS y PostgreSQL.",
  path: "/work/aws/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
