import type { Metadata } from "next";
import { NotFoundView } from "./components/layout/NotFoundView";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
