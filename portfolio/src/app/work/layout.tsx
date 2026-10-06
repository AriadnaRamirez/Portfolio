import { pageMetadata } from "../lib/seo";

export const metadata = pageMetadata({
  title: "Proyectos",
  description:
    "Proyectos de Ariadna Ramírez en producción: Grupo CRM Extintores, Hotel Marqués del Valle, SENDA y ServiYApp. React, TypeScript, UX/UI y despliegue.",
  path: "/work/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
