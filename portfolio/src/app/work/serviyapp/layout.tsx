import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Caso de estudio: ServiYApp",
  description:
    "Reserva de belleza a domicilio de punta a punta: checkout con Mercado Pago, agenda con horarios reales, chat en tiempo real con WebSockets y verificación de profesionales. Frontend Developer en equipo de 6.",
  path: "/work/serviyapp/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
