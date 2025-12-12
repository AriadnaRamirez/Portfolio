// app/page.tsx

import { Navbar } from "./components/navbar/Navbar";
import Hero from "./components/sections/Hero";

export default function HomePage() {
  return (
    <>
      {/* HEADER / NAVBAR */}
      <Navbar />

      {/* CONTENIDO PRINCIPAL */}
      <main className="bg-background text-foreground min-h-screen">
        {/* HERO */}
        <Hero />

        {/* Sección Proyectos */}
        {/* <section id="projects" className="max-w-5xl mx-auto px-4 py-16">
          <ProjectsSection />
        </section> */}

        {/* Sección Tech Stack */}
        {/* <section id="stack" className="max-w-5xl mx-auto px-4 py-16">
          <StackSection />
        </section> */}

        {/* Sección Sobre mí */}
        {/* <section id="about" className="max-w-5xl mx-auto px-4 py-16">
          <AboutSection />
        </section> */}

        {/* Sección Contacto */}
        {/* <section id="contact" className="max-w-5xl mx-auto px-4 py-16">
          <ContactSection />
        </section> */}
      </main>
    </>
  );
}
