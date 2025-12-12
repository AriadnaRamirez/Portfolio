// lib/translations.ts
export const translations = {
  es: {
    nav_projects: "Proyectos",
    nav_stack: "Tech Stack",
    nav_portfolio: "Portfolio",
    nav_about: "Sobre mí",
    nav_contact: "Contáctame",

    hero_title: "Creo tu sitio o web app",
    hero_subtitle:
      "Soy Ariadna Ramírez, Frontend Developer con pasión por crear interfaces estéticas, intuitivas y centradas en el usuario.",
    hero_cta_primary: "Únete a mi red",
    hero_cta_secondary: "Explora mis repositorios",
    // ...
  },
  en: {
    nav_projects: "Projects",
    nav_stack: "Tech Stack",
    nav_portfolio: "Portfolio",
    nav_about: "About me",
    nav_contact: "Contact",

    hero_title: "I build your website or web app",
    hero_subtitle:
      "I'm Ariadna Ramírez, a Frontend Developer passionate about creating aesthetic, intuitive, user-centered interfaces.",
    hero_cta_primary: "Connect on LinkedIn",
    hero_cta_secondary: "Explore my repos",
    // ...
  },
};

export type Lang = keyof typeof translations;
