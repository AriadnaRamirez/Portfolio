import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Caso de estudio: Hotel Marqués del Valle",
  description:
    "Auditoría UX/CX, rediseño y frontend en producción para el Hotel Marqués del Valle en Oaxaca: sitio bilingüe y multimoneda con reserva siempre a mano.",
  path: "/work/hmdv/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
