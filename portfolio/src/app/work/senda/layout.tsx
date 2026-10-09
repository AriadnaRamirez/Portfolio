import { pageMetadata } from "../../lib/seo";

export const metadata = pageMetadata({
  title: "Caso de estudio: SENDA",
  description:
    "SaaS de citas para una clínica de procedimientos estéticos: formularios con Formik y Yup, errores del backend legibles e interfaz por comercio. Frontend Developer en GROVA.",
  path: "/work/senda/",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
