import type { Lang } from "@/app/components/lib/translations";
import type { ResumeCopy } from "@/app/lib/resumeContentShared";

/**
 * Extended CV source (same as): AriadnaRamirez_CV_2026 (2).pdf — US Letter, 2 pages.
 * Content matches the PDF as-is (no condensation).
 */
const es: ResumeCopy = {
  headline: "Fullstack Web Developer | Frontend · React · TypeScript · UX/UI",
  location: "",
  summary:
    "Desarrolladora Fullstack Web especializada en Frontend, React y TypeScript, con experiencia práctica en productos SaaS, sitios web y soluciones a medida para clientes reales; desarrollo interfaces responsivas, componentes reutilizables e integraciones con APIs REST, participando desde el análisis de necesidades y UX/UI hasta la implementación, pruebas, debugging y despliegue. Combino desarrollo frontend, criterio UX/UI y pensamiento analítico para crear experiencias funcionales y alineadas con las necesidades de usuarios y negocio, con experiencia complementaria en optimización web y SEO básico aplicado a proyectos reales. Utilizo IA generativa como herramienta de apoyo en diseño, prototipado y desarrollo, revisando, adaptando, depurando y validando el código generado.",
  experience: [
    {
      org: "Trabajo Independiente",
      role: "Freelance Web Developer",
      period: "Ago 2026 — Actualidad · Remoto",
      bullets: [
        "Desarrollo de soluciones web a la medida para clientes reales, cubriendo desde la arquitectura y UX hasta el desarrollo, SEO y despliegue en producción.",
      ],
      nestedProjects: [
        {
          title: "Grupo CRM Extintores",
          bullets: [
            "Desarrollé end-to-end un sitio web institucional responsive para un cliente real, desde la arquitectura y estructura de contenidos hasta el desarrollo y despliegue en producción.",
            "Definí la experiencia de navegación y organización del contenido, priorizando claridad, accesibilidad y conversión.",
            "Implementé un catálogo de 50+ productos con fichas individuales, servicios, FAQ, contacto y CTAs de cotización vía WhatsApp.",
            "Apliqué SEO on-page y SEO local, posicionando el sitio en la primera página de Google para \"extintores Cuajimalpa\".",
            "Realicé el despliegue en Vercel y configuración relacionada con dominio y publicación.",
            "Trabajé directamente con el cliente para traducir necesidades de negocio en soluciones web.",
            "Utilicé herramientas de IA generativa como apoyo durante la implementación y debugging, validando manualmente el código y el resultado final.",
          ],
        },
      ],
    },
    {
      org: "GROVA Marketing",
      role: "Web Developer",
      period: "Colaboración por proyectos · Ago 2025 — Ago 2026 · Remoto",
      bullets: [
        "Desarrollo de sitios web y productos digitales para clientes de la agencia, con enfoque en frontend, UX/UI, APIs y mantenimiento.",
      ],
      nestedProjects: [
        {
          title: "SENDA",
          bullets: [
            "Desarrollé funcionalidades para una SPA SaaS multi-comercio de gestión de citas, pacientes, servicios, productos y personal.",
            "Implementé 12 formularios CRUD con React, TypeScript, Formik y Yup, además de extender un sistema de formularios dinámicos basado en configuraciones JSON.",
            "Desarrollé flujos de gestión de citas y componentes reutilizables.",
            "Implementé manejo de estado global con Zustand, incluyendo sesión y contexto del comercio.",
            "Integré APIs REST con autenticación JWT.",
            "Realicé pruebas de integración frontend-API y debugging con Chrome DevTools e Insomnia.",
            "Trabajé con Git/GitHub mediante branches, pull requests y code review.",
          ],
        },
        {
          title: "HMDV — Hotel Marqués del Valle",
          bullets: [
            "Realicé auditoría UX/CX, arquitectura de páginas, wireframes y prototipo de alta fidelidad en Figma/Figma Make junto con marketing y dirección.",
            "Desarrollé el frontend completo utilizando React, TypeScript y Vite.",
            "Implementé una experiencia multipágina responsive, bilingüe ES/EN y multimoneda.",
            "Desarrollé secciones de habitaciones, reservas, restaurante, galería, blog, agencia de viajes, ubicación, FAQ y contacto.",
            "Diseñé y optimicé el flujo de reserva, priorizando descubrimiento de habitaciones, visibilidad de CTAs y reducción de fricción.",
            "Utilicé herramientas de IA como Codex y GitHub Copilot como apoyo al desarrollo, validando y adaptando el código. Frontend integrado en producción.",
          ],
        },
        {
          title: "FitPlus",
          bullets: [
            "Gestioné actualizaciones de contenido y modificaciones para campañas promocionales en producción utilizando WordPress y Elementor.",
          ],
        },
      ],
      footerBullets: [
        "Stack: React 19 · TypeScript · JavaScript · Vite · Formik · Yup · Zustand · Tailwind CSS · Material UI · Motion · REST APIs · JWT · WordPress · Git · GitHub",
      ],
    },
  ],
  projects: [
    {
      title:
        "ServiYApp — Frontend Developer · Equipo de 6 · Next.js · React · TypeScript · Zustand · Socket.IO · Mercado Pago · Tailwind CSS",
      bullets: [
        "Marketplace de servicios de belleza a domicilio con paneles para clientes, proveedores y administradores.",
        "Implementé autenticación, Google OAuth, rutas protegidas por rol y persistencia de sesión con Zustand y JWT.",
        "Integré checkout con Mercado Pago con soporte para MXN, COP y ARS.",
        "Construí el chat en tiempo real con Socket.IO, incluyendo historial, estado online/offline, indicador de escritura y confirmaciones de lectura.",
        "Desarrollé el backoffice con métricas y aprobación de documentos.",
        "Participé en el desarrollo y despliegue mediante Vercel y Render.",
      ],
    },
  ],
  education: [
    {
      left: "SoyHenry — Bootcamp Full Stack Web Developer",
      right: "May 2025 — Nov 2025",
      sub: "+800 horas · React · Node.js · TypeScript · PostgreSQL · Git/GitHub · Scrum",
    },
    { left: "EBAC — Diplomado en UX/UI Design", right: "2024" },
    {
      left: "Universidad La Salle Oaxaca — Licenciatura en Ingeniería Civil",
      right: "2015 — 2020",
      sub: "GPA 9.2/10 · Primer lugar de generación · Medalla Hermano Miguel Febres Cordero · Honors",
    },
    {
      left: "The University of Kansas — Graduate Studies in Civil Engineering",
      right: "Ago 2022 — Ene 2023",
    },
  ],
  programs: [
    {
      left: "Generation México — AWS re/Start + AI Foundational · Cohorte 03",
      right: "Seleccionada · Beca completa · Inicio 12 oct. 2026",
      sub: "Programa intensivo de formación en cloud computing, AWS, Linux, networking e inteligencia artificial (15 semanas). Certificaciones oficiales AWS previstas al completar el programa: AWS Certified Cloud Practitioner · AWS Certified AI Practitioner.",
    },
    {
      left: "EPAM — IT Operations and Support Training Program",
      right: "12 oct. — 5 dic. 2026",
      sub: "Programa de formación orientado a IT Support, IT Operations, Service Management, Knowledge Management, troubleshooting y soporte técnico.",
    },
    {
      left: "Global HITSS — Semillero de Talento de Global HITSS",
      right: "28 sept. — 17 dic. 2026",
      sub: "Programa de capacitación y primer empleo tecnológico orientado a la incorporación de talento junior al ecosistema laboral de TI, mediante formación práctica y acompañamiento.",
    },
    {
      left: "Junior Achievement Americas — Mujer Digital · 7.ª generación",
      right: "2026 · En curso",
      sub: "Formación en ciberseguridad, redes y soporte, con acompañamiento para empleabilidad. Cisco Digital Badges: Introduction to Cybersecurity · Networking Basics · Network Defense · Cyber Threat Management.",
    },
  ],
  skills: [
    {
      left: "Frontend",
      sub: "React · Next.js · TypeScript · JavaScript · Vite · HTML5 · CSS3 · Material UI · Tailwind CSS · Redux · Zustand",
    },
    {
      left: "Backend & APIs",
      sub: "Node.js · Express · REST APIs · JWT · TypeORM · Mongoose · PostgreSQL · MongoDB · SQL",
    },
    {
      left: "UX/UI & Testing",
      sub: "Figma · Figma Make · UX Audit · Wireframing · Prototyping · Formik · Yup · Jest · Vitest · React Testing Library · Chrome DevTools · Insomnia",
    },
    {
      left: "Web",
      sub: "Responsive Web Design · Web Performance · WordPress · Elementor · SEO básico · SEO local",
    },
    {
      left: "Cloud & Deployment",
      sub: "Vercel · Render · GitHub Pages",
    },
    {
      left: "Development & AI",
      sub: "Git · GitHub · Branching · Pull Requests · Cursor · Cursor Agents · Codex · GitHub Copilot · Prompt Engineering · AI-assisted Development",
    },
  ],
  certifications: [
    { left: "Full Stack Developer Certificate — SoyHenry", right: "2025" },
    { left: "Diplomado en UX/UI Design — EBAC", right: "2024" },
    { left: "Cisco Certified Support Technician (CCST)", right: "En preparación" },
    {
      left: "Cisco Digital Badges",
      right: "2026",
      sub: "Introduction to Cybersecurity · Networking Basics · Networking Devices and Initial Configuration · Endpoint Security · Network Defense · Cyber Threat Management",
    },
    {
      left: "Python for Data Analysis · Programming with Python — Emerging Technologies Institute",
      right: "2020",
    },
  ],
  honors: [],
  languages: ["Español: Nativo", "Inglés: Bilingüe (C1) · TOEFL iBT 100/120 · 2026"],
};

const en: ResumeCopy = {
  headline: "Fullstack Web Developer | Frontend · React · TypeScript · UX/UI",
  location: "",
  summary:
    "Fullstack web developer specialized in Frontend, React, and TypeScript, with hands-on experience in SaaS products, websites, and custom solutions for real clients; I build responsive interfaces, reusable components, and REST API integrations, taking part from needs analysis and UX/UI through implementation, testing, debugging, and deployment. I combine frontend development, UX/UI judgment, and analytical thinking to create functional experiences aligned with user and business needs, with complementary experience in web optimization and basic SEO applied to real projects. I use generative AI as a support tool in design, prototyping, and development, reviewing, adapting, debugging, and validating generated code.",
  experience: [
    {
      org: "Independent work",
      role: "Freelance Web Developer",
      period: "Aug 2026 — Present · Remote",
      bullets: [
        "Custom web solutions for real clients, covering architecture and UX through development, SEO, and production deployment.",
      ],
      nestedProjects: [
        {
          title: "Grupo CRM Extintores",
          bullets: [
            "Built an end-to-end responsive institutional website for a real client, from architecture and content structure through development and production deployment.",
            "Defined navigation experience and content organization, prioritizing clarity, accessibility, and conversion.",
            "Implemented a 50+ product catalog with individual detail pages, services, FAQ, contact, and WhatsApp quote CTAs.",
            "Applied on-page and local SEO, ranking the site on Google's first page for \"extintores Cuajimalpa\".",
            "Handled deployment on Vercel and related domain and publication setup.",
            "Worked directly with the client to translate business needs into web solutions.",
            "Used generative AI tools as support during implementation and debugging, manually validating the code and final result.",
          ],
        },
      ],
    },
    {
      org: "GROVA Marketing",
      role: "Web Developer",
      period: "Project-based · Aug 2025 — Aug 2026 · Remote",
      bullets: [
        "Websites and digital products for agency clients, focused on frontend, UX/UI, APIs, and maintenance.",
      ],
      nestedProjects: [
        {
          title: "SENDA",
          bullets: [
            "Built features for a multi-store SaaS SPA for managing appointments, patients, services, products, and staff.",
            "Implemented 12 CRUD forms with React, TypeScript, Formik, and Yup, and extended a dynamic form system based on JSON configurations.",
            "Built appointment management flows and reusable components.",
            "Implemented global state with Zustand, including session and store context.",
            "Integrated REST APIs with JWT authentication.",
            "Ran frontend–API integration testing and debugging with Chrome DevTools and Insomnia.",
            "Worked with Git/GitHub using branches, pull requests, and code review.",
          ],
        },
        {
          title: "HMDV — Hotel Marqués del Valle",
          bullets: [
            "Conducted UX/CX audit, page architecture, wireframes, and high-fidelity prototype in Figma/Figma Make with marketing and leadership.",
            "Built the complete frontend using React, TypeScript, and Vite.",
            "Implemented a responsive multipage experience, bilingual ES/EN and multi-currency.",
            "Built rooms, booking, restaurant, gallery, blog, travel agency, location, FAQ, and contact sections.",
            "Designed and optimized the booking flow, prioritizing room discovery, CTA visibility, and reduced friction.",
            "Used AI tools such as Codex and GitHub Copilot as development support, validating and adapting the code. Frontend integrated in production.",
          ],
        },
        {
          title: "FitPlus",
          bullets: [
            "Managed content updates and changes for promotional campaigns in production using WordPress and Elementor.",
          ],
        },
      ],
      footerBullets: [
        "Stack: React 19 · TypeScript · JavaScript · Vite · Formik · Yup · Zustand · Tailwind CSS · Material UI · Motion · REST APIs · JWT · WordPress · Git · GitHub",
      ],
    },
  ],
  projects: [
    {
      title:
        "ServiYApp — Frontend Developer · Team of 6 · Next.js · React · TypeScript · Zustand · Socket.IO · Mercado Pago · Tailwind CSS",
      bullets: [
        "At-home beauty services marketplace with client, provider, and admin panels.",
        "Implemented authentication, Google OAuth, role-protected routes, and session persistence with Zustand and JWT.",
        "Integrated Mercado Pago checkout with support for MXN, COP, and ARS.",
        "Built real-time chat with Socket.IO, including history, online/offline status, typing indicator, and read receipts.",
        "Built the backoffice with metrics and document approval.",
        "Took part in development and deployment via Vercel and Render.",
      ],
    },
  ],
  education: [
    {
      left: "SoyHenry — Full Stack Web Developer Bootcamp",
      right: "May 2025 — Nov 2025",
      sub: "+800 hours · React · Node.js · TypeScript · PostgreSQL · Git/GitHub · Scrum",
    },
    { left: "EBAC — UX/UI Design Diploma", right: "2024" },
    {
      left: "Universidad La Salle Oaxaca — B.S. Civil Engineering",
      right: "2015 — 2020",
      sub: "GPA 9.2/10 · Class valedictorian · Hermano Miguel Febres Cordero Medal · Honors",
    },
    {
      left: "The University of Kansas — Graduate Studies in Civil Engineering",
      right: "Aug 2022 — Jan 2023",
    },
  ],
  programs: [
    {
      left: "Generation Mexico — AWS re/Start + AI Foundational · Cohort 03",
      right: "Selected · Full scholarship · Starts Oct 12, 2026",
      sub: "Intensive training program in cloud computing, AWS, Linux, networking, and artificial intelligence (15 weeks). Planned official AWS certifications upon completion: AWS Certified Cloud Practitioner · AWS Certified AI Practitioner.",
    },
    {
      left: "EPAM — IT Operations and Support Training Program",
      right: "Oct 12 — Dec 5, 2026",
      sub: "Training program focused on IT Support, IT Operations, Service Management, Knowledge Management, troubleshooting, and technical support.",
    },
    {
      left: "Global HITSS — Global HITSS Talent Seedbed",
      right: "Sep 28 — Dec 17, 2026",
      sub: "Training and first tech job program aimed at bringing junior talent into the IT labor ecosystem through practical training and mentorship.",
    },
    {
      left: "Junior Achievement Americas — Mujer Digital · 7th cohort",
      right: "2026 · In progress",
      sub: "Training in cybersecurity, networking, and support, with employability mentoring. Cisco Digital Badges: Introduction to Cybersecurity · Networking Basics · Network Defense · Cyber Threat Management.",
    },
  ],
  skills: [
    {
      left: "Frontend",
      sub: "React · Next.js · TypeScript · JavaScript · Vite · HTML5 · CSS3 · Material UI · Tailwind CSS · Redux · Zustand",
    },
    {
      left: "Backend & APIs",
      sub: "Node.js · Express · REST APIs · JWT · TypeORM · Mongoose · PostgreSQL · MongoDB · SQL",
    },
    {
      left: "UX/UI & Testing",
      sub: "Figma · Figma Make · UX Audit · Wireframing · Prototyping · Formik · Yup · Jest · Vitest · React Testing Library · Chrome DevTools · Insomnia",
    },
    {
      left: "Web",
      sub: "Responsive Web Design · Web Performance · WordPress · Elementor · Basic SEO · Local SEO",
    },
    {
      left: "Cloud & Deployment",
      sub: "Vercel · Render · GitHub Pages",
    },
    {
      left: "Development & AI",
      sub: "Git · GitHub · Branching · Pull Requests · Cursor · Cursor Agents · Codex · GitHub Copilot · Prompt Engineering · AI-assisted Development",
    },
  ],
  certifications: [
    { left: "Full Stack Developer Certificate — SoyHenry", right: "2025" },
    { left: "UX/UI Design Diploma — EBAC", right: "2024" },
    { left: "Cisco Certified Support Technician (CCST)", right: "In progress" },
    {
      left: "Cisco Digital Badges",
      right: "2026",
      sub: "Introduction to Cybersecurity · Networking Basics · Networking Devices and Initial Configuration · Endpoint Security · Network Defense · Cyber Threat Management",
    },
    {
      left: "Python for Data Analysis · Programming with Python — Emerging Technologies Institute",
      right: "2020",
    },
  ],
  honors: [],
  languages: ["Spanish: Native", "English: Bilingual (C1) · TOEFL iBT 100/120 · 2026"],
};

export function getExtendedResumeCopy(lang: Lang): ResumeCopy {
  return lang === "en" ? en : es;
}
