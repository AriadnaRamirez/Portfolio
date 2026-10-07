import type { Lang } from "@/app/components/lib/translations";
import type { ProjectId, TechId } from "./site";

type L = Record<Lang, string>;

export type StoryStep = {
  kicker: L;
  title: L;
  body: L;
  /** Path under /public */
  image: string;
  mobile?: string;
};

export type CaseStudy = {
  id: ProjectId;
  slug: string;
  client: string;
  liveUrl?: string;
  summary: L;
  facts: { label: L; value: L }[];
  tech: TechId[];
  challenge: L;
  goals: L[];
  process: { title: L; body: L }[];
  story: StoryStep[];
  /** Omit any metric you can't back with a real number. */
  results: { value: string; label: L }[];
  resultsNote?: L;
  /** Screenshot that backs a result, e.g. a search ranking. */
  evidence?: { image: string; caption: L };
  /** Screenshots of the site before the redesign. */
  before?: { image: string; caption: L }[];
  testimonial?: { quote: L; author: string; role: L };
  learnings?: L;
};

/*
 * Fields still waiting on real data are left out on purpose so nothing
 * unverified goes live: testimonial, Lighthouse scores, inquiry numbers.
 */
export const caseStudies: Record<string, CaseStudy> = {
  crm: {
    id: "crm",
    slug: "crm",
    client: "Grupo CRM Extintores",
    liveUrl: "https://www.crmextintores.com.mx/",
    summary: {
      es: "Sitio institucional end-to-end para una empresa de extintores y equipo contra incendios en CDMX: de la arquitectura y los contenidos al desarrollo, SEO local y lanzamiento.",
      en: "End-to-end institutional site for a fire-extinguisher and safety-equipment company in Mexico City: from architecture and content to development, local SEO, and launch.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Freelance · End-to-end", en: "Freelance · End-to-end" } },
      { label: { es: "Cliente", en: "Client" }, value: { es: "Grupo CRM Extintores", en: "Grupo CRM Extintores" } },
      { label: { es: "Lanzamiento", en: "Launch" }, value: { es: "Agosto 2026", en: "August 2026" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "UX · Contenido · Frontend · SEO · Deploy", en: "UX · Content · Frontend · SEO · Deploy" } },
    ],
    tech: ["html", "css", "javascript", "seo", "cursor"],
    challenge: {
      es: "El cliente necesitaba una presencia digital que generara confianza y convirtiera visitas en cotizaciones. Su catálogo anterior tenía productos sin imagen, contenido de prueba publicado y poca jerarquía, y la mayoría de sus clientes (condominios, restaurantes y oficinas) busca resolver rápido el cumplimiento de Protección Civil.",
      en: "The client needed a digital presence that built trust and turned visits into quote requests. Their previous catalog had products without images, published test content, and little hierarchy, and most customers (condos, restaurants, offices) want to sort out civil-protection compliance quickly.",
    },
    goals: [
      { es: "Cotizar en un clic vía WhatsApp desde cualquier página.", en: "One-tap WhatsApp quotes from any page." },
      { es: "Catálogo claro con fichas individuales y filtros por categoría.", en: "A clear catalog with product pages and category filters." },
      { es: "Aparecer en búsquedas locales de CDMX y Estado de México.", en: "Show up in local searches across Mexico City and State of Mexico." },
    ],
    process: [
      {
        title: { es: "Descubrimiento", en: "Discovery" },
        body: { es: "Sesiones con el cliente para entender su operación, clientes y objeciones de compra.", en: "Sessions with the client to understand operations, customers, and buying objections." },
      },
      {
        title: { es: "Arquitectura y contenido", en: "Architecture & content" },
        body: { es: "Mapa del sitio, jerarquía del catálogo y redacción orientada a cotizar.", en: "Sitemap, catalog hierarchy, and quote-oriented copy." },
      },
      {
        title: { es: "Diseño y desarrollo", en: "Design & build" },
        body: { es: "Interfaz responsive, fichas de producto, FAQ y CTAs persistentes.", en: "Responsive UI, product pages, FAQ, and persistent CTAs." },
      },
      {
        title: { es: "SEO y lanzamiento", en: "SEO & launch" },
        body: { es: "SEO on-page y local, dominio y despliegue en Vercel.", en: "On-page and local SEO, domain setup, and Vercel deploy." },
      },
    ],
    story: [
      {
        kicker: { es: "01 · Propuesta de valor", en: "01 · Value proposition" },
        title: { es: "Un mensaje que resuelve, no que adorna.", en: "A message that solves, not decorates." },
        body: {
          es: "El hero habla del problema real del cliente —cumplir con Protección Civil— y ofrece dos caminos inmediatos: llamar o cotizar por WhatsApp.",
          en: "The hero speaks to the customer's real problem — civil-protection compliance — and offers two immediate paths: call or quote via WhatsApp.",
        },
        image: "/projects/crm/desktop-1.webp",
        mobile: "/projects/crm/mobile-1.webp",
      },
      {
        kicker: { es: "02 · Catálogo", en: "02 · Catalog" },
        title: { es: "55 equipos, encontrables en segundos.", en: "55 products, findable in seconds." },
        body: {
          es: "Filtros por categoría, buscador y fichas individuales. Cada producto lleva su propio CTA de cotización.",
          en: "Category filters, search, and individual product pages. Every product carries its own quote CTA.",
        },
        image: "/projects/crm/desktop-2.webp",
        mobile: "/projects/crm/mobile-2.webp",
      },
      {
        kicker: { es: "03 · Conversión", en: "03 · Conversion" },
        title: { es: "Del formulario a WhatsApp, sin fricción.", en: "From form to WhatsApp, frictionless." },
        body: {
          es: "El formulario de contacto arma el mensaje y lo envía directo a WhatsApp, junto con dirección, horario y teléfonos visibles.",
          en: "The contact form composes the message and sends it straight to WhatsApp, with address, hours, and phone numbers in view.",
        },
        image: "/projects/crm/desktop-6.webp",
        mobile: "/projects/crm/mobile-6.webp",
      },
    ],
    results: [
      { value: "55", label: { es: "productos en catálogo", en: "catalog products" } },
      { value: "7", label: { es: "categorías con filtro", en: "filterable categories" } },
      { value: "1 clic", label: { es: "para cotizar por WhatsApp", en: "to quote via WhatsApp" } },
      { value: "Top 3", label: { es: "en Google para “extintores cuajimalpa”", en: "on Google for “extintores cuajimalpa”" } },
    ],
    evidence: {
      image: "/projects/crm/seo-cuajimalpa.webp",
      caption: {
        es: "Búsqueda en Google de “extintores cuajimalpa” (6 de octubre de 2026): Grupo CRM Extintores aparece entre los 3 negocios del bloque local de Maps, junto con el sitio en los resultados web.",
        en: "Google search for “extintores cuajimalpa” (October 6, 2026): Grupo CRM Extintores appears among the 3 businesses in the local Maps pack, alongside the site in the web results.",
      },
    },
    before: [
      {
        image: "/projects/crm/before-1.webp",
        caption: { es: "Portada: hero oscuro con texto pequeño y el CTA principal apuntando al catálogo, no a cotizar.", en: "Home: dark hero with small text and the main CTA pointing to the catalog, not to a quote." },
      },
      {
        image: "/projects/crm/before-2.webp",
        caption: { es: "Categorías con una “Sin categorizar” visible al público.", en: "Categories with an “Uncategorized” one visible to the public." },
      },
      {
        image: "/projects/crm/before-3.webp",
        caption: { es: "Productos sin imagen y un “Curso de prueba” publicado.", en: "Products without images and a published “test course”." },
      },
    ],
  },
  hmdv: {
    id: "hotel",
    slug: "hmdv",
    client: "Hotel Marqués del Valle",
    liveUrl: "https://www.hotelmarquesdelvalle.com.mx/",
    summary: {
      es: "Auditoría UX/CX, rediseño y frontend en producción para un hotel histórico en el corazón de Oaxaca: un sitio bilingüe y multimoneda pensado para que reservar sea lo más fácil de la página.",
      en: "UX/CX audit, redesign, and production frontend for a historic hotel in the heart of Oaxaca: a bilingual, multi-currency site where booking is the easiest thing on the page.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "UX/UI + Frontend", en: "UX/UI + Frontend" } },
      { label: { es: "Equipo", en: "Team" }, value: { es: "GROVA Marketing", en: "GROVA Marketing" } },
      { label: { es: "Ubicación", en: "Location" }, value: { es: "Centro Histórico, Oaxaca", en: "Historic center, Oaxaca" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Auditoría · Prototipo · Frontend · ES/EN", en: "Audit · Prototype · Frontend · ES/EN" } },
    ],
    tech: ["figma", "figmamake", "react", "typescript", "vite", "tailwind"],
    challenge: {
      es: "El sitio anterior se apoyaba en fotos y bloques de texto largos: no mostraba precios ni capacidad, y reservar dependía de encontrar un botón en el menú. El hotel —un edificio histórico a pasos del Zócalo— necesitaba convertir visitas en reservas directas, también para huéspedes internacionales que consultan en su idioma y moneda.",
      en: "The previous site leaned on photos and long blocks of text: no prices or capacity, and booking meant hunting for a button in the menu. The hotel — a historic building steps from the Zócalo — needed to turn visits into direct bookings, including international guests who browse in their own language and currency.",
    },
    goals: [
      { es: "Reservar desde cualquier página, con fechas y huéspedes siempre a mano.", en: "Book from any page, with dates and guests always at hand." },
      { es: "Precio por noche, capacidad y amenidades visibles en cada habitación.", en: "Nightly price, capacity, and amenities visible on every room." },
      { es: "Un sitio bilingüe ES/EN y multimoneda que respete el carácter del hotel.", en: "A bilingual ES/EN, multi-currency site that honors the hotel's character." },
    ],
    process: [
      {
        title: { es: "Auditoría UX/CX", en: "UX/CX audit" },
        body: { es: "Revisión del sitio anterior y del recorrido del huésped hasta reservar.", en: "Review of the previous site and the guest journey up to booking." },
      },
      {
        title: { es: "Arquitectura y wireframes", en: "Architecture & wireframes" },
        body: { es: "Mapa de páginas, jerarquía de contenido y puntos de reserva.", en: "Page map, content hierarchy, and booking touchpoints." },
      },
      {
        title: { es: "Prototipo", en: "Prototype" },
        body: { es: "Alta fidelidad en Figma y Figma Make, validado con marketing y dirección.", en: "High-fidelity in Figma and Figma Make, validated with marketing and leadership." },
      },
      {
        title: { es: "Frontend en producción", en: "Production frontend" },
        body: { es: "React, TypeScript y Vite: multipágina, responsive, ES/EN y multimoneda.", en: "React, TypeScript, and Vite: multi-page, responsive, ES/EN, and multi-currency." },
      },
    ],
    story: [
      {
        kicker: { es: "01 · Reserva", en: "01 · Booking" },
        title: { es: "Reservar, desde el primer segundo.", en: "Booking, from the very first second." },
        body: {
          es: "Una barra de reserva con fechas, adultos y niños acompaña toda la navegación, junto a dos atajos directos: WhatsApp y llamada.",
          en: "A booking bar with dates, adults, and children follows the whole visit, next to two direct shortcuts: WhatsApp and phone.",
        },
        image: "/projects/hotel/desktop-1.webp",
        mobile: "/projects/hotel/mobile-1.webp",
      },
      {
        kicker: { es: "02 · Ubicación", en: "02 · Location" },
        title: { es: "La ubicación como argumento.", en: "Location as the pitch." },
        body: {
          es: "El hotel está a pasos del Zócalo; el sitio lo convierte en una razón para reservar, con contenido sobre Oaxaca y sus alrededores.",
          en: "The hotel sits steps from the Zócalo; the site turns that into a reason to book, with content about Oaxaca and its surroundings.",
        },
        image: "/projects/hotel/desktop-2.webp",
        mobile: "/projects/hotel/mobile-2.webp",
      },
      {
        kicker: { es: "03 · Habitaciones", en: "03 · Rooms" },
        title: { es: "Habitaciones que se comparan solas.", en: "Rooms that compare themselves." },
        body: {
          es: "Cada habitación muestra precio por noche, capacidad, amenidades y su propia galería, con acceso directo a detalles o a reservar.",
          en: "Each room shows nightly price, capacity, amenities, and its own gallery, with direct links to details or booking.",
        },
        image: "/projects/hotel/desktop-4.webp",
        mobile: "/projects/hotel/mobile-4.webp",
      },
    ],
    results: [
      { value: "ES/EN", label: { es: "sitio bilingüe y multimoneda", en: "bilingual, multi-currency site" } },
      { value: "3", label: { es: "habitaciones con precio y capacidad visibles", en: "rooms with visible price and capacity" } },
      { value: "1 barra", label: { es: "de reserva en toda la navegación", en: "booking bar across the whole site" } },
      { value: "E2E", label: { es: "de la auditoría a producción", en: "from audit to production" } },
    ],
    before: [
      {
        image: "/projects/hotel/before-1.webp",
        caption: { es: "Portada: imagen protagonista, sin forma inmediata de reservar.", en: "Home: hero image, no immediate way to book." },
      },
      {
        image: "/projects/hotel/before-2.webp",
        caption: { es: "Secciones con bloques de texto largos y poca jerarquía.", en: "Sections with long text blocks and little hierarchy." },
      },
      {
        image: "/projects/hotel/before-3.webp",
        caption: { es: "Habitaciones sin precio ni capacidad visibles.", en: "Rooms without visible price or capacity." },
      },
    ],
  },
  ccst: {
    id: "ccst",
    slug: "ccst",
    client: "CCST Study Lab",
    liveUrl: "https://ccst-study-lab.vercel.app/",
    summary: {
      es: "Plataforma de estudio para la certificación Cisco CCST Cybersecurity: 51 tarjetas que se corrigen en el servidor y una pregunta queda dominada después de tres aciertos seguidos. Usé Cursor para acelerar el proceso, del diseño al deploy.",
      en: "Study platform for the Cisco CCST Cybersecurity certification: 51 cards graded on the server, and a question counts as mastered after three correct answers in a row. I used Cursor to speed up the process, from design to deploy.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Fullstack · Diseño y desarrollo", en: "Fullstack · Design & development" } },
      { label: { es: "Tipo", en: "Type" }, value: { es: "Proyecto personal", en: "Personal project" } },
      { label: { es: "Contenido", en: "Content" }, value: { es: "51 tarjetas · 5 tipos", en: "51 cards · 5 types" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "UX · Web · API · Base de datos · Deploy", en: "UX · Web · API · Database · Deploy" } },
    ],
    tech: ["nextjs", "nestjs", "typescript", "postgresql", "vercel", "render", "neon", "cursor"],
    challenge: {
      es: "Estudiar para una certificación con un banco de preguntas suele ser repetir lo mismo hasta memorizar el orden. Quería una herramienta que supiera qué te cuesta, te lo devolviera en el momento justo y no dejara ver las respuestas desde el navegador, para que el progreso fuera real.",
      en: "Studying for a certification with a question bank usually means repeating the same set until you memorize the order. I wanted a tool that knows what you struggle with, brings it back at the right moment, and keeps answers out of the browser so progress is real.",
    },
    goals: [
      { es: "Entrar con cuenta o jugar sin cuenta, sin fricción para empezar.", en: "Sign in or play without an account, with no friction to start." },
      { es: "Sesiones que priorizan lo débil y refuerzan los fallos en la misma sesión.", en: "Sessions that prioritize weak cards and reinforce misses within the same session." },
      { es: "Corrección en el servidor: las respuestas correctas nunca llegan al cliente.", en: "Server-side grading: correct answers never reach the client." },
    ],
    process: [
      {
        title: { es: "Modelo de dominio", en: "Mastery model" },
        body: { es: "Racha de 3 aciertos para dominar; un fallo la reinicia y los aciertos acumulados se conservan.", en: "A 3-answer streak to master; a miss resets it while total correct answers are kept." },
      },
      {
        title: { es: "Mezcla de sesión", en: "Session mix" },
        body: { es: "10, 20, 30 o 50 preguntas: débiles primero, luego en aprendizaje, nuevas y unas pocas dominadas.", en: "10, 20, 30, or 50 questions: weak first, then learning, new, and a few mastered ones." },
      },
      {
        title: { es: "Arquitectura", en: "Architecture" },
        body: { es: "Web en Next.js y API en NestJS. El navegador no llama a la API: Next reenvía la sesión con una clave interna.", en: "Next.js web and NestJS API. The browser never calls the API: Next forwards the session with an internal key." },
      },
      {
        title: { es: "Datos y deploy", en: "Data & deploy" },
        body: { es: "PostgreSQL guarda cuentas, preguntas, rachas, sesiones e intentos. Web en Vercel, API en Render, base en Neon. Cursor aceleró el desarrollo de punta a punta.", en: "PostgreSQL stores accounts, questions, streaks, sessions, and attempts. Web on Vercel, API on Render, database on Neon. Cursor sped up development end to end." },
      },
    ],
    story: [
      {
        kicker: { es: "01 · Sesión", en: "01 · Session" },
        title: { es: "Tú eliges cuánto; la app elige qué.", en: "You pick how much; the app picks what." },
        body: {
          es: "Una sesión pide 10, 20, 30 o 50 preguntas. La mezcla prioriza las débiles, luego las que están en aprendizaje, las nuevas y unas pocas ya dominadas.",
          en: "A session asks for 10, 20, 30, or 50 questions. The mix prioritizes weak cards, then those in progress, new ones, and a few already mastered.",
        },
        image: "/projects/ccst/desktop-2.webp",
        mobile: "/projects/ccst/mobile-2.webp",
      },
      {
        kicker: { es: "02 · Feedback", en: "02 · Feedback" },
        title: { es: "Cada respuesta enseña algo.", en: "Every answer teaches something." },
        body: {
          es: "Cada tarjeta es de un solo tipo: opción única, opción múltiple, relacionar, ordenar o verdadero/falso. Al responder ves si estuvo bien, la explicación y tu racha (2 / 3).",
          en: "Each card is a single type: single choice, multiple choice, matching, ordering, or true/false. After answering you see whether you got it right, the explanation, and your streak (2 / 3).",
        },
        image: "/projects/ccst/desktop-4.webp",
        mobile: "/projects/ccst/mobile-3.webp",
      },
      {
        kicker: { es: "03 · Refuerzo", en: "03 · Reinforcement" },
        title: { es: "Lo que fallas vuelve, sin alargar la sesión.", en: "What you miss comes back, without stretching the session." },
        body: {
          es: "Una tarjeta fallada puede volver más adelante en la misma sesión como refuerzo, sin cambiar el tamaño que pediste. Al final, el resumen te dice qué recuperaste y qué te espera en Repasar.",
          en: "A missed card can return later in the same session as reinforcement, without changing the size you asked for. At the end, the summary shows what you recovered and what's waiting in Review.",
        },
        image: "/projects/ccst/desktop-5.webp",
        mobile: "/projects/ccst/mobile-5.webp",
      },
    ],
    results: [
      { value: "9", label: { es: "usuarios el primer día", en: "users on day one" } },
      { value: "3 / 6", label: { es: "con cuenta / sin cuenta", en: "with / without an account" } },
      { value: "11", label: { es: "sesiones de estudio", en: "study sessions" } },
      { value: "254", label: { es: "respuestas corregidas en el servidor", en: "answers graded on the server" } },
      { value: "77.2%", label: { es: "precisión global", en: "overall accuracy" } },
      { value: "8", label: { es: "usuarios activos", en: "active users" } },
      { value: "4", label: { es: "usuarios con una sesión completa", en: "users who finished a session" } },
      { value: "51", label: { es: "tarjetas en el banco", en: "cards in the bank" } },
    ],
    resultsNote: {
      es: "Métricas reales del primer día en producción, tomadas del panel de administración. El dominio global sigue en 0 %: dominar una tarjeta pide tres aciertos seguidos, y eso no pasa en una sola tarde.",
      en: "Real metrics from the first day in production, taken from the admin panel. Overall mastery is still 0%: mastering a card takes three correct answers in a row, and that doesn't happen in a single afternoon.",
    },
  },
};

export function caseStudyFor(id: ProjectId) {
  return Object.values(caseStudies).find((cs) => cs.id === id);
}
