import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Caso de estudio: Grupo CRM Extintores",
  description:
    "Cómo diseñé y desarrollé end-to-end el sitio de Grupo CRM Extintores: catálogo de 55 productos, cotización por WhatsApp en un clic y SEO local en CDMX.",
  path: "/work/crm/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
