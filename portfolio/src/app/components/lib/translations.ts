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

    // PROYECTOS
    projects_title: "Proyectos destacados",
    projects_subtitle:
      "Una selección de aplicaciones y plataformas en las que he trabajado recientemente.",
    projects_grova_title: "GROVA",
    projects_grova_role: "Frontend / UX",
    projects_grova_desc:
      "Plataforma de gestión de comercios y servicios con panel de administración, reservas y analíticos.",
    projects_servi_title: "ServiYApp",
    projects_servi_role: "Fullstack / Producto",
    projects_servi_desc:
      "Marketplace de servicios de belleza con registro de proveedor, agenda, pagos y chat en tiempo real.",
    projects_fram_title: "Colectivo Framboyán",
    projects_fram_role: "Frontend / E-commerce",
    projects_fram_desc:
      "Tienda online para artesanías oaxaqueñas, enfocada en una experiencia de compra limpia y minimalista.",
    projects_senda_title: "SENDA",
    projects_senda_role: "UX/UI / Concepto",
    projects_senda_desc:
      "Concepto de plataforma para bienestar y autocuidado, centrada en hábitos saludables y balance emocional.",

    // TECH STACK
    stack_title: "Tech Stack",
    stack_subtitle:
      "Herramientas con las que trabajo a gusto para construir experiencias digitales completas.",
    stack_frontend: "Frontend",
    stack_backend: "Backend & APIs",
    stack_tools: "Herramientas & Otros",

    // ABOUT
    about_title: "Sobre mí",
    about_intro:
      "Soy Ariadna, ingeniera civil que se enamoró del desarrollo web y el diseño de interfaces.",
    about_body:
      "Disfruto crear productos digitales que se sientan claros, estéticos y útiles. Tengo experiencia en proyectos fullstack, e-commerce y plataformas de servicios, y me gusta cuidar tanto el código como la experiencia de usuario.",
    about_highlight_1:
      "Formación en ingeniería civil y transición al desarrollo web.",
    about_highlight_2:
      "Experiencia en proyectos reales con clientes, equipos remotos y herramientas modernas.",
    about_now_title: "Actualmente",
    about_now_body:
      "Busco oportunidades como Frontend Developer (o Fullstack) en entornos donde el diseño y la experiencia de usuario sean una prioridad.",

    // CONTACTO
    contact_title: "Hablemos",
    contact_subtitle:
      "Si tienes una idea, un proyecto o simplemente quieres conectar, estaré feliz de leerte.",
    contact_email_label: "Email directo",
    contact_networks_label: "Redes y repositorios",
    contact_cta_email: "Escríbeme un correo",
    contact_cta_linkedin: "Ver perfil en LinkedIn",
    contact_cta_github: "Explorar repos en GitHub",
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

    // PROJECTS
    projects_title: "Featured projects",
    projects_subtitle:
      "A selection of applications and platforms I’ve worked on recently.",
    projects_grova_title: "GROVA",
    projects_grova_role: "Frontend / UX",
    projects_grova_desc:
      "Commerce and services management platform with admin panel, bookings and analytics.",
    projects_servi_title: "ServiYApp",
    projects_servi_role: "Fullstack / Product",
    projects_servi_desc:
      "Beauty services marketplace with provider onboarding, scheduling, payments and real-time chat.",
    projects_fram_title: "Colectivo Framboyán",
    projects_fram_role: "Frontend / E-commerce",
    projects_fram_desc:
      "Online shop for Oaxacan crafts, focused on a clean and minimal shopping experience.",
    projects_senda_title: "SENDA",
    projects_senda_role: "UX/UI / Concept",
    projects_senda_desc:
      "Concept platform for wellbeing and self-care, centered around healthy habits and emotional balance.",

    // TECH STACK
    stack_title: "Tech Stack",
    stack_subtitle:
      "Tools I enjoy using to build complete digital experiences.",
    stack_frontend: "Frontend",
    stack_backend: "Backend & APIs",
    stack_tools: "Tools & Others",

    // ABOUT
    about_title: "About me",
    about_intro:
      "I'm Ariadna, a civil engineer who fell in love with web development and interface design.",
    about_body:
      "I enjoy building digital products that feel clear, aesthetic and useful. I have experience in fullstack projects, e-commerce and service platforms, and I like to care about both the code and the user experience.",
    about_highlight_1:
      "Background in civil engineering and a transition into web development.",
    about_highlight_2:
      "Experience with real-world projects, clients, remote teams and modern tooling.",
    about_now_title: "Currently",
    about_now_body:
      "I’m looking for opportunities as a Frontend Developer (or Fullstack) in environments where design and UX are a priority.",

    // CONTACT
    contact_title: "Let’s talk",
    contact_subtitle:
      "If you have an idea, a project or simply want to connect, I’d be happy to hear from you.",
    contact_email_label: "Direct email",
    contact_networks_label: "Networks & repos",
    contact_cta_email: "Send me an email",
    contact_cta_linkedin: "View LinkedIn profile",
    contact_cta_github: "Explore GitHub repos",
  },
};

export type Lang = keyof typeof translations;
