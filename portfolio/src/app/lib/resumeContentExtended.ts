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
    "Desarrolladora Fullstack Web especializada en Frontend, React y TypeScript, con experiencia práctica en productos SaaS, sitios web y soluciones a medida para clientes reales; desarrollo interfaces responsivas, componentes reutilizables e integraciones con APIs REST, participando desde el análisis de necesidades y UX/UI hasta la implementación, debugging y despliegue. Combino desarrollo frontend, criterio UX/UI y pensamiento analítico para crear experiencias funcionales y alineadas con las necesidades de usuarios y negocio, con experiencia complementaria en optimización web y SEO básico aplicado a proyectos reales. Utilizo IA generativa como herramienta de apoyo en diseño, prototipado y desarrollo, revisando, adaptando, depurando y validando el código generado.",
  experience: [
    {
      org: "Trabajo Independiente",
      role: "Freelance Web Developer",
      period: "Ago 2026 — Actualidad · Remoto",
      bullets: [
        "Trabajo directo con el cliente, de la necesidad de negocio al sitio publicado.",
      ],
      nestedProjects: [
        {
          title: "Grupo CRM Extintores",
          url: "https://www.crmextintores.com.mx/",
          bullets: [
            "Una ficha de producto aparece en la primera página de Google para “extintores Cuajimalpa”.",
            "Implementé un catálogo de 50+ productos con fichas individuales, servicios, FAQ, contacto y CTAs de cotización vía WhatsApp.",
            "Definí la navegación y el contenido priorizando claridad y conversión, y publiqué el sitio en Vercel con dominio propio.",
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
            "Implementé 12 formularios CRUD para 8 entidades con React, TypeScript, Formik y Yup, además de extender un sistema de formularios dinámicos basado en configuraciones JSON.",
            "Conecté el frontend a APIs REST con JWT y Zustand (sesión y comercio), y trabajé en Git mediante branches, pull requests y code review.",
            "Quedaron operando la agenda de citas, los formularios de las 8 entidades y el cambio de comercio sin mezclar datos.",
          ],
        },
        {
          title: "HMDV — Hotel Marqués del Valle",
          url: "https://www.hotelmarquesdelvalle.com.mx/",
          bullets: [
            "Realicé auditoría UX/CX, arquitectura de páginas, wireframes y prototipo de alta fidelidad en Figma/Figma Make junto con marketing y dirección.",
            "Desarrollé el frontend completo utilizando React, TypeScript y Vite.",
            "En producción quedó un sitio bilingüe ES/EN y multimoneda, con precio y capacidad en las 3 habitaciones y la reserva visible en toda la navegación.",
          ],
        },
        {
          title: "FitPlus",
          bullets: [
            "Gestioné actualizaciones de contenido y modificaciones para campañas promocionales en producción utilizando WordPress y Elementor.",
          ],
        },
      ],
    },
  ],
  projects: [
    {
      title:
        "CCST Study Lab — Proyecto personal · Fullstack · Next.js · NestJS · TypeScript · PostgreSQL · Prisma",
      url: "https://ccst-study-lab.vercel.app/",
      bullets: [
        "Plataforma de estudio para la certificación Cisco CCST Cybersecurity con 51 tarjetas de 5 tipos y sesiones adaptativas.",
        "Diseñé y desarrollé de punta a punta: corrección en el servidor, sesión JWT en cookie httpOnly, validación con Zod y despliegue en Vercel, Render y Neon.",
        "Al tercer día de lanzamiento: 32 usuarios, 55 sesiones y 1204 respuestas corregidas en el servidor.",
      ],
    },
    {
      title:
        "ServiYApp — Proyecto estudiantil · Frontend Developer · Equipo de 6 · Next.js · React · TypeScript · Zustand · Socket.IO · Mercado Pago · Tailwind CSS",
      bullets: [
        "Marketplace de servicios de belleza a domicilio con paneles para clientes, proveedores y administradores.",
        "Implementé autenticación, Google OAuth, rutas protegidas por rol y persistencia de sesión con Zustand y JWT.",
        "Integré checkout con Mercado Pago con soporte para MXN, COP y ARS.",
        "Construí el chat de punta a punta: el gateway de WebSockets en NestJS con Socket.IO y, en el frontend, historial, estado online/offline, indicador de escritura y confirmaciones de lectura.",
        "Desarrollé el backoffice con métricas y aprobación de documentos.",
        "170 commits propios en el frontend (70% del repositorio). Despliegue en Vercel y Render.",
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
      sub: "Programa intensivo (15 semanas) en cloud computing, AWS, Linux, networking e inteligencia artificial. Certificaciones previstas: AWS Certified Cloud Practitioner · AWS Certified AI Practitioner.",
    },
    {
      left: "EPAM — IT Operations and Support Training Program",
      right: "12 oct. — 5 dic. 2026",
      sub: "Formación orientada a IT Support, IT Operations, Service Management, Knowledge Management, troubleshooting y soporte técnico.",
    },
    {
      left: "Global HITSS — Semillero de Talento de Global HITSS",
      right: "28 sept. — 17 dic. 2026",
      sub: "Capacitación y primer empleo tecnológico para talento junior en el ecosistema laboral de TI, mediante formación práctica y acompañamiento.",
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
      sub: "React · Next.js · TypeScript · JavaScript · Vite · HTML5 · CSS3 · Material UI · Tailwind CSS · Zustand",
    },
    {
      left: "Backend & APIs",
      sub: "Node.js · NestJS · REST APIs · JWT · Prisma · TypeORM · PostgreSQL · Socket.IO · SQL",
    },
    {
      left: "UX/UI",
      sub: "Figma · Figma Make · UX Audit · Wireframing · Prototyping · Formik · Yup · Zod · Chrome DevTools · Insomnia",
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
      sub: "Git · GitHub · Branching · Pull Requests · Cursor · Codex · GitHub Copilot",
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
  languages: ["Español: Nativo", "Inglés: Avanzado (C1) · TOEFL iBT 100/120 · 2026"],
};

const en: ResumeCopy = {
  headline: "Fullstack Web Developer | Frontend · React · TypeScript · UX/UI",
  location: "",
  summary:
    "Fullstack web developer specialized in Frontend, React, and TypeScript, with hands-on experience in SaaS products, websites, and custom solutions for real clients; I build responsive interfaces, reusable components, and REST API integrations, taking part from needs analysis and UX/UI through implementation, debugging, and deployment. I combine frontend development, UX/UI judgment, and analytical thinking to create functional experiences aligned with user and business needs, with complementary experience in web optimization and basic SEO applied to real projects. I use generative AI as a support tool in design, prototyping, and development, reviewing, adapting, debugging, and validating generated code.",
  experience: [
    {
      org: "Independent work",
      role: "Freelance Web Developer",
      period: "Aug 2026 — Present · Remote",
      bullets: [
        "I work directly with the client, from the business need to the published site.",
      ],
      nestedProjects: [
        {
          title: "Grupo CRM Extintores",
          url: "https://www.crmextintores.com.mx/",
          bullets: [
            "A product page appears on Google's first page for “extintores Cuajimalpa”.",
            "Implemented a 50+ product catalog with individual detail pages, services, FAQ, contact, and WhatsApp quote CTAs.",
            "Defined navigation and content for clarity and conversion, and published the site on Vercel with its own domain.",
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
            "Implemented 12 CRUD forms across 8 entities with React, TypeScript, Formik, and Yup, and extended a dynamic form system based on JSON configurations.",
            "Connected the frontend to REST APIs with JWT and Zustand (session and store), and worked in Git with branches, pull requests, and code review.",
            "The appointment calendar, the forms for all 8 entities, and business switching shipped, without mixing data across stores.",
          ],
        },
        {
          title: "HMDV — Hotel Marqués del Valle",
          url: "https://www.hotelmarquesdelvalle.com.mx/",
          bullets: [
            "Conducted UX/CX audit, page architecture, wireframes, and high-fidelity prototype in Figma/Figma Make with marketing and leadership.",
            "Built the complete frontend using React, TypeScript, and Vite.",
            "The live site is bilingual (ES/EN) and multi-currency, with price and capacity on all 3 rooms and booking available across the whole navigation.",
          ],
        },
        {
          title: "FitPlus",
          bullets: [
            "Managed content updates and changes for promotional campaigns in production using WordPress and Elementor.",
          ],
        },
      ],
    },
  ],
  projects: [
    {
      title:
        "CCST Study Lab — Personal project · Fullstack · Next.js · NestJS · TypeScript · PostgreSQL · Prisma",
      url: "https://ccst-study-lab.vercel.app/",
      bullets: [
        "Study platform for the Cisco CCST Cybersecurity certification with 51 cards across 5 types and adaptive sessions.",
        "Designed and built it end to end: server-side grading, a JWT session in an httpOnly cookie, Zod validation, and deployment on Vercel, Render, and Neon.",
        "On day three after launch: 32 users, 55 sessions, and 1,204 answers graded on the server.",
      ],
    },
    {
      title:
        "ServiYApp — Student project · Frontend Developer · Team of 6 · Next.js · React · TypeScript · Zustand · Socket.IO · Mercado Pago · Tailwind CSS",
      bullets: [
        "At-home beauty services marketplace with client, provider, and admin panels.",
        "Implemented authentication, Google OAuth, role-protected routes, and session persistence with Zustand and JWT.",
        "Integrated Mercado Pago checkout with support for MXN, COP, and ARS.",
        "Built the real-time chat end to end: the NestJS WebSocket gateway with Socket.IO and, on the frontend, history, online/offline status, typing indicator, and read receipts.",
        "Built the backoffice with metrics and document approval.",
        "170 commits of my own in the frontend (70% of the repository). Deployed on Vercel and Render.",
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
      sub: "React · Next.js · TypeScript · JavaScript · Vite · HTML5 · CSS3 · Material UI · Tailwind CSS · Zustand",
    },
    {
      left: "Backend & APIs",
      sub: "Node.js · NestJS · REST APIs · JWT · Prisma · TypeORM · PostgreSQL · Socket.IO · SQL",
    },
    {
      left: "UX/UI",
      sub: "Figma · Figma Make · UX Audit · Wireframing · Prototyping · Formik · Yup · Zod · Chrome DevTools · Insomnia",
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
      sub: "Git · GitHub · Branching · Pull Requests · Cursor · Codex · GitHub Copilot",
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
  languages: ["Spanish: Native", "English: Advanced (C1) · TOEFL iBT 100/120 · 2026"],
};

export function getExtendedResumeCopy(lang: Lang): ResumeCopy {
  return lang === "en" ? en : es;
}
