import type { Metadata } from "next";
import { HashRedirect } from "../components/ui/HashRedirect";

export const metadata: Metadata = {
  title: "Proyectos",
  robots: { index: false, follow: true },
};

export default function WorkIndexPage() {
  return <HashRedirect to="/#work" />;
}
