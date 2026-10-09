import type { Lang } from "@/app/components/lib/translations";
import type { ProjectId, TechId } from "./site";

type L = Record<Lang, string>;

export type StoryStep = {
  kicker: L;
  /** The pain this step solves, shown before the solution title. */
  problem?: L;
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
  codeUrl?: string;
  /** When set, `codeUrl` is labeled as the frontend repo. */
  backendCodeUrl?: string;
  summary: L;
  facts: { label: L; value: L }[];
  tech: TechId[];
  challenge: L;
  goals: L[];
  process: { title: L; body: L }[];
  /** Design artifact shown as a thumbnail inside process step `step` (0-based). */
  artifact?: { step: number; image: string; label: L; caption: L };
  story: StoryStep[];
  /** Architecture, security, and testing choices for technical readers. */
  engineering?: { title: L; body: L }[];
  /** Omit any metric you can't back with a real number. */
  results: { value: string | L; label: L }[];
  resultsNote?: L;
  /** Screenshot that backs a result, e.g. a search ranking. */
  evidence?: { image: string; caption: L };
  /** Screenshots of the site before the redesign. */
  before?: { image: string; after: string; caption: L; afterCaption: L }[];
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
    codeUrl: "https://github.com/AriadnaRamirez/grupoCRM",
    summary: {
      es: "Sitio para una empresa de extintores y equipo contra incendios en CDMX, hecho de punta a punta: estructura, textos, desarrollo, SEO local y lanzamiento. La meta: que cotizar esté a un clic.",
      en: "Site for a fire-extinguisher and safety-equipment company in Mexico City, built end to end: structure, copy, development, local SEO, and launch. The goal: put a quote one tap away.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Freelance · End-to-end", en: "Freelance · End-to-end" } },
      { label: { es: "Cliente", en: "Client" }, value: { es: "Grupo CRM Extintores", en: "Grupo CRM Extintores" } },
      { label: { es: "Lanzamiento", en: "Launch" }, value: { es: "Agosto 2026", en: "August 2026" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "UX · Contenido · Frontend · SEO · Deploy", en: "UX · Content · Frontend · SEO · Deploy" } },
    ],
    tech: ["html", "css", "javascript", "seo", "cursor"],
    challenge: {
      es: "El cliente necesitaba un sitio que generara confianza y recibiera cotizaciones. Su catálogo tenía productos sin foto, contenido de prueba publicado y poco orden. Sus clientes (condominios, restaurantes y oficinas) quieren cumplir rápido con Protección Civil.",
      en: "The client needed a site that built trust and brought in quote requests. Their catalog had products without photos, published test content, and little order. Their customers (condos, restaurants, offices) want to meet civil-protection rules quickly.",
    },
    goals: [
      { es: "Cotizar en un clic vía WhatsApp desde cualquier página.", en: "One-tap WhatsApp quotes from any page." },
      { es: "Catálogo claro con fichas individuales y filtros por categoría.", en: "A clear catalog with product pages and category filters." },
      { es: "Aparecer en búsquedas locales de CDMX y Estado de México.", en: "Show up in local searches across Mexico City and the State of Mexico." },
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
        problem: { es: "Un hero oscuro, de texto pequeño, cuyo botón principal llevaba al catálogo y no a cotizar.", en: "A dark hero with small text whose main button led to the catalog, not to a quote." },
        title: { es: "Un mensaje que resuelve, no que adorna.", en: "A message that solves, not one that decorates." },
        body: {
          es: "El hero habla del problema real del cliente —cumplir con Protección Civil— y ofrece dos caminos inmediatos: llamar o cotizar por WhatsApp.",
          en: "The hero speaks to the customer's real problem — civil-protection compliance — and offers two immediate paths: call or quote via WhatsApp.",
        },
        image: "/projects/crm/desktop-1.webp",
        mobile: "/projects/crm/mobile-1.webp",
      },
      {
        kicker: { es: "02 · Catálogo", en: "02 · Catalog" },
        problem: { es: "Productos sin imagen, contenido de prueba publicado y una categoría “Sin categorizar” a la vista.", en: "Products without images, published test content, and an “Uncategorized” category in plain view." },
        title: { es: "50+ equipos, encontrables en segundos.", en: "50+ products, findable in seconds." },
        body: {
          es: "Filtros por categoría, buscador y fichas individuales. Cada producto lleva su propio CTA de cotización.",
          en: "Category filters, search, and individual product pages. Every product carries its own quote CTA.",
        },
        image: "/projects/crm/desktop-2.webp",
        mobile: "/projects/crm/mobile-2.webp",
      },
      {
        kicker: { es: "03 · Conversión", en: "03 · Conversion" },
        problem: { es: "Cotizar no era el camino evidente: el visitante tenía que buscar cómo contactar.", en: "Asking for a quote wasn't the obvious path: visitors had to hunt for a way to get in touch." },
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
      { value: "50+", label: { es: "productos en catálogo", en: "catalog products" } },
      { value: "7", label: { es: "categorías con filtro", en: "filterable categories" } },
      { value: { es: "1 clic", en: "1 tap" }, label: { es: "para cotizar por WhatsApp", en: "to quote via WhatsApp" } },
      { value: { es: "Pág. 1", en: "Page 1" }, label: { es: "de Google para “extintores cuajimalpa”", en: "on Google for “extintores cuajimalpa”" } },
    ],
    evidence: {
      image: "/projects/crm/seo-cuajimalpa.webp",
      caption: {
        es: "Búsqueda en Google de “extintores cuajimalpa” (6 de octubre de 2026): una ficha de producto de crmextintores.com.mx aparece en la primera página de resultados web orgánicos, sin anuncios de por medio.",
        en: "Google search for “extintores cuajimalpa” (October 6, 2026): a crmextintores.com.mx product page shows up on the first page of organic web results, with no ads involved.",
      },
    },
    before: [
      {
        image: "/projects/crm/before-1.webp",
        after: "/projects/crm/desktop-1.webp",
        caption: { es: "Hero oscuro con texto pequeño; el botón principal llevaba al catálogo, no a cotizar.", en: "Dark hero with small text; the main button led to the catalog, not to a quote." },
        afterCaption: { es: "Un mensaje que habla del problema real —cumplir con Protección Civil— y dos caminos inmediatos: llamar o cotizar por WhatsApp.", en: "A message about the real problem — civil-protection compliance — and two immediate paths: call or quote via WhatsApp." },
      },
      {
        image: "/projects/crm/before-2.webp",
        after: "/projects/crm/desktop-2.webp",
        caption: { es: "Categorías con conteos sueltos y una “Sin categorizar” visible al público.", en: "Categories with loose counts and an “Uncategorized” one visible to the public." },
        afterCaption: { es: "Catálogo de 50+ equipos en 7 categorías reales, con filtros, buscador y cotización en cada producto.", en: "A 50+ product catalog in 7 real categories, with filters, search, and a quote button on every product." },
      },
      {
        image: "/projects/crm/before-3.webp",
        after: "/projects/crm/after-3.webp",
        caption: { es: "Productos sin imagen y un “Curso de prueba” publicado como si fuera un producto.", en: "Products without images and a “test course” published as if it were a product." },
        afterCaption: { es: "Cada producto con foto, clave, especificaciones y dos acciones claras: ver detalle o cotizar por WhatsApp.", en: "Every product with a photo, SKU, specs, and two clear actions: view details or quote via WhatsApp." },
      },
    ],
  },
  hmdv: {
    id: "hotel",
    slug: "hmdv",
    client: "Hotel Marqués del Valle",
    liveUrl: "https://www.hotelmarquesdelvalle.com.mx/",
    summary: {
      es: "Auditoría UX/CX, rediseño y frontend en producción para un hotel histórico a pasos del Zócalo de Oaxaca. Un sitio bilingüe y multimoneda donde reservar es lo más fácil de hacer.",
      en: "UX/CX audit, redesign, and production frontend for a historic hotel steps from Oaxaca's Zócalo. A bilingual, multi-currency site where booking is the easiest thing to do.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "UX/UI + Frontend", en: "UX/UI + Frontend" } },
      { label: { es: "Equipo", en: "Team" }, value: { es: "GROVA Marketing", en: "GROVA Marketing" } },
      { label: { es: "Ubicación", en: "Location" }, value: { es: "Centro Histórico, Oaxaca", en: "Historic center, Oaxaca" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Auditoría · Prototipo · Frontend · ES/EN", en: "Audit · Prototype · Frontend · ES/EN" } },
    ],
    tech: ["figma", "figmamake", "react", "typescript", "vite", "tailwind"],
    challenge: {
      es: "El sitio anterior tenía fotos y bloques largos de texto. No mostraba precios ni capacidad, y para reservar había que buscar un botón en el menú. El hotel necesitaba más reservas directas, también de huéspedes extranjeros que navegan en su idioma y su moneda.",
      en: "The previous site had photos and long blocks of text. It showed no prices or capacity, and booking meant hunting for a button in the menu. The hotel needed more direct bookings, including from international guests who browse in their own language and currency.",
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
    artifact: {
      step: 1,
      image: "/projects/hotel/wireframes.webp",
      label: { es: "Wireframes v1.0 en Figma", en: "v1.0 wireframes in Figma" },
      caption: {
        es: "Wireframes de la versión 1.0 en Figma: la estructura de cada página y del flujo de reserva por pasos, antes del prototipo de alta fidelidad. Los círculos son los comentarios de revisión con el equipo.",
        en: "Version 1.0 wireframes in Figma: the structure of every page and the step-by-step booking flow, before the high-fidelity prototype. The circles are review comments from the team.",
      },
    },
    story: [
      {
        kicker: { es: "01 · Reserva", en: "01 · Booking" },
        problem: { es: "La fachada era la protagonista y reservar dependía de encontrar un botón en el menú.", en: "The façade was the star, and booking meant hunting for a button in the menu." },
        title: { es: "Reservar, desde el primer segundo.", en: "Booking from the very first second." },
        body: {
          es: "Una barra de reserva con fechas, adultos y niños acompaña toda la navegación, junto a dos atajos directos: WhatsApp y llamada.",
          en: "A booking bar with dates, adults, and children follows the whole visit, next to two direct shortcuts: WhatsApp and phone.",
        },
        image: "/projects/hotel/desktop-1.webp",
        mobile: "/projects/hotel/mobile-1.webp",
      },
      {
        kicker: { es: "02 · Ubicación", en: "02 · Location" },
        problem: { es: "Bloques de texto largos escondían su mayor ventaja: estar a pasos del Zócalo.", en: "Long blocks of text buried its biggest advantage: being steps from the Zócalo." },
        title: { es: "La ubicación como argumento.", en: "Location as the selling point." },
        body: {
          es: "El hotel está a pasos del Zócalo; el sitio lo convierte en una razón para reservar, con contenido sobre Oaxaca y sus alrededores.",
          en: "The hotel sits steps from the Zócalo; the site turns that into a reason to book, with content about Oaxaca and its surroundings.",
        },
        image: "/projects/hotel/desktop-2.webp",
        mobile: "/projects/hotel/mobile-2.webp",
      },
      {
        kicker: { es: "03 · Habitaciones", en: "03 · Rooms" },
        problem: { es: "Las habitaciones no mostraban precio ni capacidad, así que compararlas era imposible.", en: "Rooms showed no price or capacity, so comparing them was impossible." },
        title: { es: "Habitaciones que se comparan solas.", en: "Rooms that are easy to compare." },
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
      { value: { es: "1 barra", en: "1 bar" }, label: { es: "de reserva en toda la navegación", en: "for booking, on every page" } },
      { value: "E2E", label: { es: "de la auditoría a producción", en: "from audit to production" } },
    ],
    before: [
      {
        image: "/projects/hotel/before-1.webp",
        after: "/projects/hotel/desktop-1.webp",
        caption: { es: "Una foto de fachada como protagonista y ninguna forma inmediata de reservar.", en: "A façade photo as the hero and no immediate way to book." },
        afterCaption: { es: "Barra de reserva con fechas, adultos y niños desde el primer segundo, más atajos directos a WhatsApp y llamada.", en: "A booking bar with dates, adults, and children from the first second, plus direct WhatsApp and phone shortcuts." },
      },
      {
        image: "/projects/hotel/before-2.webp",
        after: "/projects/hotel/desktop-2.webp",
        caption: { es: "Secciones con bloques de texto largos y poca jerarquía.", en: "Sections with long text blocks and little hierarchy." },
        afterCaption: { es: "Contenido escaneable que convierte la ubicación —a pasos del Zócalo— en una razón para reservar.", en: "Scannable content that turns the location — steps from the Zócalo — into a reason to book." },
      },
      {
        image: "/projects/hotel/before-3.webp",
        after: "/projects/hotel/desktop-4.webp",
        caption: { es: "Habitaciones sin precio ni capacidad visibles.", en: "Rooms without visible price or capacity." },
        afterCaption: { es: "Cada habitación con precio por noche, capacidad, amenidades y galería propia, lista para comparar y reservar.", en: "Each room with nightly price, capacity, amenities, and its own gallery, ready to compare and book." },
      },
    ],
  },
  ccst: {
    id: "ccst",
    slug: "ccst",
    client: "CCST Study Lab",
    liveUrl: "https://ccst-study-lab.vercel.app/",
    codeUrl: "https://github.com/AriadnaRamirez/ccst-study-lab",
    summary: {
      es: "App para estudiar la certificación Cisco CCST Cybersecurity: 51 tarjetas corregidas en el servidor y un repaso que prioriza lo que más fallas. Una pregunta cuenta como dominada tras tres aciertos seguidos.",
      en: "App to study for the Cisco CCST Cybersecurity certification: 51 cards graded on the server and a review mode that prioritizes what you miss most. A question counts as mastered after three correct answers in a row.",
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
        problem: { es: "Repetir el mismo banco de preguntas enseña el orden, no el contenido.", en: "Repeating the same question bank teaches the order, not the material." },
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
        problem: { es: "Saber que fallaste no sirve de mucho si no entiendes por qué.", en: "Knowing you got it wrong doesn't help much if you don't understand why." },
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
        problem: { es: "Lo que fallas se olvida si no vuelve en el momento justo.", en: "What you miss fades if it doesn't come back at the right moment." },
        title: { es: "Lo que fallas vuelve, sin alargar la sesión.", en: "What you miss comes back, without stretching the session." },
        body: {
          es: "Una tarjeta fallada puede volver más adelante en la misma sesión como refuerzo, sin cambiar el tamaño que pediste. Al final, el resumen te dice qué recuperaste y qué te espera en Repasar.",
          en: "A missed card can return later in the same session as reinforcement, without changing the size you asked for. At the end, the summary shows what you recovered and what's waiting in Review.",
        },
        image: "/projects/ccst/desktop-5.webp",
        mobile: "/projects/ccst/mobile-5.webp",
      },
    ],
    engineering: [
      {
        title: { es: "La respuesta correcta nunca sale del servidor", en: "The right answer never leaves the server" },
        body: {
          es: "La API en NestJS corrige cada respuesta y solo devuelve el resultado. Como el cliente nunca recibe la solución, no se puede hacer trampa desde las DevTools y el progreso es real.",
          en: "The NestJS API grades every answer and only returns the result. Since the client never receives the solution, you can't cheat from DevTools, and progress is real.",
        },
      },
      {
        title: { es: "El navegador no habla con la API", en: "The browser never talks to the API" },
        body: {
          es: "Next.js hace de intermediario: reenvía la sesión a Nest con una clave interna compartida, y la API rechaza cualquier petición que no la traiga.",
          en: "Next.js acts as a go-between: it forwards the session to Nest with a shared internal key, and the API rejects any request without it.",
        },
      },
      {
        title: { es: "Sesiones y contraseñas", en: "Sessions and passwords" },
        body: {
          es: "Contraseñas con hash bcrypt y sesión firmada como JWT dentro de una cookie httpOnly, que el JavaScript del navegador no puede leer. Zod valida las entradas en la web y en la API.",
          en: "Passwords hashed with bcrypt and a signed JWT session inside an httpOnly cookie that browser JavaScript can't read. Zod validates input on both the web and the API.",
        },
      },
      {
        title: { es: "Esquema y migraciones", en: "Schema and migrations" },
        body: {
          es: "Prisma gestiona el esquema y las migraciones en PostgreSQL.",
          en: "Prisma manages the schema and migrations on PostgreSQL.",
        },
      },
    ],
    results: [
      { value: "32", label: { es: "usuarios", en: "users" } },
      { value: "9 / 23", label: { es: "con cuenta / sin cuenta", en: "with / without an account" } },
      { value: "55", label: { es: "sesiones de estudio", en: "study sessions" } },
      { value: "1204", label: { es: "respuestas corregidas en el servidor", en: "answers graded on the server" } },
      { value: "83.8%", label: { es: "precisión global", en: "overall accuracy" } },
      { value: "10", label: { es: "activos hoy", en: "active today" } },
      { value: "16", label: { es: "usuarios con una sesión completa", en: "users who finished a session" } },
      { value: "7.3%", label: { es: "dominio global", en: "overall mastery" } },
    ],
    resultsNote: {
      es: "Al tercer día de lanzamiento, tomadas del panel de administración. Los 32 usuarios son nuevos en los últimos 30 días; 27 estuvieron activos tanto en 7 como en 30 días. El dominio crece despacio a propósito: una tarjeta cuenta como dominada solo después de tres aciertos seguidos.",
      en: "On day three after launch, taken from the admin panel. All 32 users are new in the last 30 days; 27 were active over both the last 7 and 30 days. Mastery grows slowly on purpose: a card only counts as mastered after three correct answers in a row.",
    },
  },
  serviyapp: {
    id: "servi",
    slug: "serviyapp",
    client: "ServiYApp",
    codeUrl: "https://github.com/ServiYApp-Inc/ServiYApp-Frontend",
    backendCodeUrl: "https://github.com/ServiYApp-Inc/ServiYApp-Backend",
    summary: {
      es: "Plataforma para reservar belleza a domicilio (peluquería, maquillaje, manicura, masajes y más). Fui Frontend Developer en un equipo de 6 y construí el login por rol, el pago con Mercado Pago, la verificación de profesionales y el chat en tiempo real, este último completo, del backend a la interfaz.",
      en: "Platform to book at-home beauty services (hair, makeup, nails, massage, and more). I was a Frontend Developer on a team of 6 and built role-based login, Mercado Pago payments, professional verification, and real-time chat, the latter in full, from backend to UI.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Frontend · Chat fullstack", en: "Frontend · Fullstack chat" } },
      { label: { es: "Equipo", en: "Team" }, value: { es: "6 personas", en: "6 people" } },
      { label: { es: "Periodo", en: "Timeline" }, value: { es: "Oct — Nov 2025", en: "Oct — Nov 2025" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Auth · Pagos · Chat · Verificación", en: "Auth · Payments · Chat · Verification" } },
    ],
    tech: ["nextjs", "react", "typescript", "tailwind", "nestjs", "socketio", "oauth"],
    challenge: {
      es: "Un servicio a domicilio no termina en un catálogo. Hay que pagar, agendar, coordinar la llegada y confiar en alguien que va a entrar a tu casa. La plataforma tiene tres tipos de usuario (cliente, profesional y administrador) y cada uno ve solo lo suyo. Lo hicimos en pocas semanas, seis personas sobre el mismo código.",
      en: "An at-home service doesn't end at a catalog. You have to pay, schedule, coordinate arrival, and trust someone who's coming into your home. The platform has three kinds of users (client, professional, and admin), and each sees only their own part. We built it in a few weeks, six people on the same codebase.",
    },
    goals: [
      { es: "Que cada rol entre a su propio panel y solo vea sus rutas.", en: "Each role lands on its own panel and only sees its own routes." },
      { es: "Del catálogo a la cita sin salir del flujo: filtrar, pagar con Mercado Pago, agendar y seguir el estado.", en: "From catalog to appointment without leaving the flow: filter, pay with Mercado Pago, schedule, and track status." },
      { es: "Confianza entre desconocidos: chat en tiempo real y profesionales verificados antes de operar.", en: "Trust between strangers: real-time chat and professionals verified before they can operate." },
    ],
    process: [
      {
        title: { es: "Auth y roles", en: "Auth & roles" },
        body: { es: "Registro e inicio de sesión con Google OAuth, rutas protegidas por rol y sesión persistida con Zustand y JWT.", en: "Sign-up and sign-in with Google OAuth, role-protected routes, and sessions persisted with Zustand and JWT." },
      },
      {
        title: { es: "Compra y citas", en: "Checkout & appointments" },
        body: { es: "Carrito con dirección en Google Maps, orden de servicio, checkout de Mercado Pago con MXN, COP y ARS, y vistas de citas para los tres roles.", en: "Cart with a Google Maps address, service order, Mercado Pago checkout in MXN, COP, and ARS, and appointment views for all three roles." },
      },
      {
        title: { es: "Chat en tiempo real", en: "Real-time chat" },
        body: { es: "De punta a punta: gateway en NestJS con Socket.IO y mensajes guardados con TypeORM; en el front, historial, estado en línea, escribiendo y leído.", en: "End to end: a NestJS gateway with Socket.IO and messages stored with TypeORM; on the front, history, online status, typing, and read receipts." },
      },
      {
        title: { es: "Verificación y deploy", en: "Verification & deploy" },
        body: { es: "Carga de documentos del proveedor, aprobación desde el panel de administración con métricas y despliegue en Vercel y Render.", en: "Provider document upload, approval from the admin dashboard with metrics, and deployment on Vercel and Render." },
      },
    ],
    story: [
      {
        kicker: { es: "01 · Reserva", en: "01 · Booking" },
        problem: { es: "Reservar a domicilio pide más que un catálogo: la dirección, el pedido y el pago tienen que ir juntos.", en: "Booking at home takes more than a catalog: address, order, and payment have to go together." },
        title: { es: "Del catálogo al pago, sin salir del flujo.", en: "From catalog to payment, without leaving the flow." },
        body: {
          es: "La clienta filtra por precio, duración, categoría y zona, elige su dirección en el mapa, arma el pedido y paga con Mercado Pago. Construí el flujo de compra, desde el carrito con la dirección en Google Maps hasta la orden de servicio y el checkout.",
          en: "The client filters by price, duration, category, and area, picks her address on the map, builds the order, and pays with Mercado Pago. I built the purchase flow, from the cart with a Google Maps address to the service order and checkout.",
        },
        image: "/projects/servi/desktop-2.webp",
      },
      {
        kicker: { es: "02 · Agenda", en: "02 · Scheduling" },
        problem: { es: "Un pago sin fecha ni estado deja a la clienta adivinando cuándo llega el servicio.", en: "A payment with no date or status leaves the client guessing when the service will arrive." },
        title: { es: "Una cita real, no solo un pedido.", en: "A real appointment, not just an order." },
        body: {
          es: "Después de pagar, la clienta agenda el turno en un calendario con los horarios reales del profesional y sigue el estado de la cita: pagada, aceptada, finalizada o cancelada. Trabajé las vistas de citas de los tres roles, incluido el botón para dar por finalizado el servicio.",
          en: "After paying, the client books a slot on a calendar with the professional's real hours and tracks the appointment status: paid, accepted, completed, or canceled. I worked on the appointment views for all three roles, including the button to mark a service as completed.",
        },
        image: "/projects/servi/desktop-4.webp",
      },
      {
        kicker: { es: "03 · Chat", en: "03 · Chat" },
        problem: { es: "Sin un canal propio, coordinar la llegada se dispersa entre llamadas y apps externas.", en: "Without a built-in channel, coordinating arrival scatters across calls and outside apps." },
        title: { es: "Coordinar sin salir de la app.", en: "Coordinate without leaving the app." },
        body: {
          es: "El chat usa WebSockets: el mensaje llega al instante, se ve si la otra persona está en línea o escribiendo, y queda marcado como entregado o leído. Así se coordinan la hora de llegada, el acceso al domicilio y los detalles del look. Construí el chat completo, backend y frontend.",
          en: "The chat runs on WebSockets: messages arrive instantly, you can see whether the other person is online or typing, and each message is marked delivered or read. That's how arrival time, home access, and look details get sorted out. I built the whole chat, backend and frontend.",
        },
        image: "/projects/servi/chat.webp",
      },
      {
        kicker: { es: "04 · Verificación", en: "04 · Verification" },
        problem: { es: "Dejar entrar a un desconocido a tu casa exige saber que alguien lo revisó antes.", en: "Letting a stranger into your home means knowing someone vetted them first." },
        title: { es: "Nadie opera sin pasar por revisión.", en: "No one operates without review." },
        body: {
          es: "El alta del profesional no es solo un formulario: carga su documento, se toma una foto de verificación con la cámara y adjunta su cuenta bancaria. El administrador revisa el expediente y aprueba o rechaza antes de que pueda operar, lo que reduce perfiles falsos y pagos a cuentas no verificadas. Construí la carga de documentos y la tabla donde el administrador los aprueba o rechaza.",
          en: "Professional sign-up isn't just a form: they upload an ID, take a verification photo with the camera, and add a bank account. The admin reviews the file and approves or rejects it before they can operate, which cuts down on fake profiles and payouts to unverified accounts. I built the document upload and the table where the admin approves or rejects them.",
        },
        image: "/projects/servi/desktop-6.webp",
      },
    ],
    engineering: [
      {
        title: { es: "Construí el chat completo: backend y frontend", en: "I built the whole chat: backend and frontend" },
        body: {
          es: "En el backend, un gateway de WebSockets en NestJS con Socket.IO; en el frontend, la interfaz de conversación, la lista de chats y las notificaciones. Es la parte que diseñé de punta a punta.",
          en: "On the backend, a NestJS WebSocket gateway with Socket.IO; on the frontend, the conversation UI, the chat list, and notifications. It's the part I designed end to end.",
        },
      },
      {
        title: { es: "Una sala por usuario", en: "One room per user" },
        body: {
          es: "Cada conexión se une a una sala con el id de su usuario. Enviar un mensaje es emitirlo a la sala del receptor y a la del remitente, así que funciona igual con varias pestañas abiertas.",
          en: "Each connection joins a room named after its user id. Sending a message means emitting to the receiver's room and the sender's, so it works the same with several tabs open.",
        },
      },
      {
        title: { es: "Primero se guarda, luego se emite", en: "Save first, then emit" },
        body: {
          es: "Cada mensaje se guarda con TypeORM (remitente, receptor, hora, entregado y leído) antes de emitirse, así el historial sobrevive a recargas y desconexiones. Los eventos cubren en línea, escribiendo, entregado, leído y aviso de mensaje nuevo.",
          en: "Each message is saved with TypeORM (sender, receiver, time, delivered, and read) before it's emitted, so history survives reloads and disconnects. Events cover online, typing, delivered, read, and new-message alerts.",
        },
      },
      {
        title: { es: "REST para lo que no es tiempo real", en: "REST for what isn't real-time" },
        body: {
          es: "Endpoints para listar las conversaciones con foto y nombre de la otra persona, cargar el historial entre dos usuarios y borrar un chat.",
          en: "Endpoints to list conversations with the other person's photo and name, load the history between two users, and delete a chat.",
        },
      },
    ],
    results: [
      { value: "170", label: { es: "commits propios en el frontend", en: "commits of my own in the frontend" } },
      { value: "70%", label: { es: "de los commits del repositorio", en: "of the repository's commits" } },
      { value: "3", label: { es: "paneles por rol: cliente, proveedor y admin", en: "role panels: client, provider, and admin" } },
      { value: "3", label: { es: "monedas en el checkout: MXN, COP y ARS", en: "checkout currencies: MXN, COP, and ARS" } },
    ],
    resultsNote: {
      es: "Proyecto estudiantil desarrollado en equipo de 6 entre octubre y noviembre de 2025. Las cifras salen del historial de Git del repositorio frontend; las capturas son de una demo local con datos de prueba.",
      en: "Student project built by a team of 6 between October and November 2025. Figures come from the frontend repository's Git history; screenshots are from a local demo with sample data.",
    },
  },
  senda: {
    id: "senda",
    slug: "senda",
    client: "SENDA",
    summary: {
      es: "Sistema de citas para una clínica estética (bótox, ácido hialurónico y más) que puede atender varios comercios. Fui Frontend Developer en GROVA, en un equipo de dos. Hice los formularios principales, los mensajes de error claros y una interfaz que cambia según el comercio.",
      en: "Appointments system for an aesthetics clinic (Botox, hyaluronic acid, and more) that can serve several locations. I was a Frontend Developer at GROVA, on a team of two. I built the main forms, clear error messages, and a UI that adapts to each business.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Frontend Developer · GROVA", en: "Frontend Developer · GROVA" } },
      { label: { es: "Equipo", en: "Team" }, value: { es: "2 desarrolladores", en: "2 developers" } },
      { label: { es: "Periodo", en: "Timeline" }, value: { es: "Ago 2025 — Ene 2026", en: "Aug 2025 — Jan 2026" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Formularios · Vistas · UI multi-comercio", en: "Forms · Views · Multi-business UI" } },
    ],
    tech: ["react", "typescript", "vite", "tailwind"],
    challenge: {
      es: "Una clínica estética agenda tratamientos como bótox o ácido hialurónico y guarda el expediente de cada paciente. Puede tener varios comercios, cada uno con sus pacientes, servicios, horarios y personal, sin que los datos se mezclen. Cada tipo de dato necesitaba su formulario, con la misma validación y errores claros cuando el servidor rechaza algo. Como es un cliente privado, no se pueden mostrar sus datos reales.",
      en: "An aesthetics clinic books treatments like Botox or hyaluronic acid and keeps a record for each patient. It can run several locations, each with its own patients, services, schedules, and staff, without their data mixing. Every data type needed its own form, with the same validation and clear errors when the server rejects something. Since it's a private client, its real data can't be shown.",
    },
    goals: [
      { es: "Dar de alta y editar cada entidad con la misma validación y los mismos mensajes.", en: "Create and edit every entity with the same validation and the same messages." },
      { es: "Que cada comercio se sienta propio: sus datos, su color, su contexto.", en: "Make each business feel like its own: its data, its color, its context." },
      { es: "Mostrar el producto sin exponer datos reales de clientes.", en: "Show the product without exposing real customer data." },
    ],
    process: [
      {
        title: { es: "Formularios por entidad", en: "Per-entity forms" },
        body: { es: "12 formularios CRUD con Formik y Yup para ocho entidades (categorías, comercios, pacientes, productos, servicios, expedientes, horarios y citas), reutilizados en las pantallas de crear y editar.", en: "12 Formik and Yup CRUD forms for eight entities (categories, businesses, patients, products, services, records, schedules, and appointments), reused across the create and edit screens." },
      },
      {
        title: { es: "Vistas y estado", en: "Views & state" },
        body: { es: "Vistas de comercios, categorías y servicios. El comercio activo sale del store de Zustand, así cada alta queda ligada a él sin pedirlo en el formulario.", en: "Business, category, and service views. The active business comes from the Zustand store, so every new record is tied to it without asking in the form." },
      },
      {
        title: { es: "Errores y feedback", en: "Errors & feedback" },
        body: { es: "Un componente que muestra los errores de validación que regresa el backend, alertas con react-hot-toast y confirmaciones con un formato común.", en: "A component that shows the validation errors the backend returns, react-hot-toast alerts, and confirmations with a shared format." },
      },
      {
        title: { es: "Interfaz multi-comercio", en: "Multi-business UI" },
        body: { es: "Color del comercio en el tema y el scrollbar, sidebar responsive, menú de usuario con cambio de tema y una propuesta de diseño para el detalle de cita y el perfil.", en: "The business color on the theme and scrollbar, a responsive sidebar, a user menu with a theme toggle, and a design proposal for the appointment detail and profile." },
      },
    ],
    story: [
      {
        kicker: { es: "01 · Agenda", en: "01 · Calendar" },
        problem: { es: "Una lista de citas no dice cómo viene la semana ni quién está agendando.", en: "A list of appointments doesn't tell you how the week looks or who's booking." },
        title: { es: "La semana completa, de un vistazo.", en: "The whole week at a glance." },
        body: {
          es: "La agenda semanal acomoda las citas por día y hora, marca los días cerrados y resume la semana: citas, completadas, inasistencias y cuántas agendó el agente. El color de cada tarjeta distingue el origen de la cita.",
          en: "The weekly calendar lays out appointments by day and hour, marks closed days, and sums up the week: appointments, completed, no-shows, and how many the agent booked. Each card's color shows where the appointment came from.",
        },
        image: "/projects/senda/desktop-1.webp",
      },
      {
        kicker: { es: "02 · Profesionales", en: "02 · Professionals" },
        problem: { es: "Con varios profesionales, la agenda de todos mezcla jornadas que no son tuyas.", en: "With several professionals, the shared calendar mixes in shifts that aren't yours." },
        title: { es: "La agenda de una sola persona.", en: "One person's calendar." },
        body: {
          es: "Un filtro deja solo las citas de un profesional y recalcula el resumen de la semana para él. La vista por profesional pone a cada uno en su propia columna.",
          en: "A filter keeps only one professional's appointments and recalculates the week's summary for them. The per-professional view gives each one their own column.",
        },
        image: "/projects/senda/desktop-2.webp",
      },
      {
        kicker: { es: "03 · Detalle", en: "03 · Detail" },
        problem: { es: "Para resolver una duda sobre una cita había que abrirla en otra pantalla.", en: "Answering a question about an appointment meant opening it on another screen." },
        title: { es: "Todo lo de la cita, sin salir de la agenda.", en: "Everything about the appointment, without leaving the calendar." },
        body: {
          es: "Al tocar una cita aparece su estado y origen, el paciente con teléfono y correo, el servicio con duración y precio, y el profesional, con acciones para editar, eliminar o abrirla. Parte de la propuesta de diseño del detalle de cita que hice en el proyecto.",
          en: "Tapping an appointment shows its status and source, the patient with phone and email, the service with duration and price, and the professional, with actions to edit, delete, or open it. It builds on the appointment-detail design proposal I made on the project.",
        },
        image: "/projects/senda/desktop-3.webp",
      },
      {
        kicker: { es: "04 · Nueva cita", en: "04 · New appointment" },
        problem: { es: "Agendar no puede depender de recordar ids de pacientes, servicios o doctores.", en: "Booking can't depend on remembering patient, service, or doctor ids." },
        title: { es: "Agendar con selectores, no con ids.", en: "Book with pickers, not ids." },
        body: {
          es: "El formulario pide paciente, servicio, profesional, fecha y horario, y valida antes de enviar. Maqueté su primera versión en el proyecto.",
          en: "The form asks for patient, service, professional, date, and time, and validates before sending. I built its first layout on the project.",
        },
        image: "/projects/senda/desktop-4.webp",
      },
      {
        kicker: { es: "05 · Expediente", en: "05 · Records" },
        problem: { es: "La historia clínica de un paciente no puede vivir en notas sueltas.", en: "A patient's history can't live in scattered notes." },
        title: { es: "Ficha y expediente en una vista.", en: "Profile and records in one view." },
        body: {
          es: "Los datos de contacto arriba y, debajo, el expediente por tipo de registro, con alta de registros nuevos. Construí los formularios de pacientes y de expedientes.",
          en: "Contact details on top and, below, the records by type, with new entries added in place. I built the patient and record forms.",
        },
        image: "/projects/senda/desktop-5.webp",
      },
      {
        kicker: { es: "06 · Multi-comercio", en: "06 · Multi-business" },
        problem: { es: "Un mismo equipo atiende negocios distintos, con datos que no se pueden mezclar.", en: "One team serves different businesses whose data can't mix." },
        title: { es: "Cambiar de comercio es cambiar de contexto.", en: "Switching business switches context." },
        body: {
          es: "Al elegir otro comercio, la app muestra solo sus citas, sus profesionales y sus servicios, con su propio color. Implementé el cambio de color según el comercio y que los formularios tomen el comercio activo del store.",
          en: "Picking another business shows only its appointments, professionals, and services, in its own color. I implemented the per-business color and made the forms take the active business from the store.",
        },
        image: "/projects/senda/desktop-6.webp",
      },
    ],
    engineering: [
      {
        title: { es: "Errores del backend, legibles", en: "Readable backend errors" },
        body: {
          es: "Una función normaliza la respuesta de error de la API en una lista de mensajes, y un componente los muestra encima del formulario cuando un alta falla, en lugar de un error genérico.",
          en: "A function normalizes the API's error response into a list of messages, and a component shows them above the form when a save fails, instead of a generic error.",
        },
      },
      {
        title: { es: "El comercio vive en el store", en: "The business lives in the store" },
        body: {
          es: "El id del comercio activo se toma de Zustand y viaja en campos ocultos, así ningún registro queda huérfano ni se pide un dato que el usuario no debería tocar.",
          en: "The active business id is read from Zustand and sent in hidden fields, so no record ends up orphaned and users aren't asked for data they shouldn't touch.",
        },
      },
      {
        title: { es: "Validación declarativa", en: "Declarative validation" },
        body: {
          es: "Cada formulario define su esquema con Yup y los campos dependen del estado: por ejemplo, el número de sesiones de un servicio solo aparece si tiene varias sesiones activadas.",
          en: "Each form defines its schema with Yup and fields depend on state: for example, a service's session count only appears when multiple sessions are enabled.",
        },
      },
      {
        title: { es: "Una demo sin tocar las pantallas", en: "A demo without touching the screens" },
        body: {
          es: "Para el portafolio, la función que llama a la API desvía cada petición a un manejador local con datos semilla cuando el modo demo está activo. Las pantallas siguen llamando a la misma API, con alta, edición, búsqueda y paginación funcionando en el navegador.",
          en: "For the portfolio, the function that calls the API routes every request to a local handler with seed data when demo mode is on. The screens keep calling the same API, with create, edit, search, and pagination working in the browser.",
        },
      },
    ],
    results: [
      { value: "44%", label: { es: "de los commits del repositorio", en: "of the repository's commits" } },
      { value: "12", label: { es: "formularios CRUD para 8 entidades, con Formik y Yup", en: "CRUD forms for 8 entities, with Formik and Yup" } },
      { value: "2", label: { es: "comercios en la demo, cada uno con sus datos", en: "businesses in the demo, each with its own data" } },
    ],
    resultsNote: {
      es: "Proyecto de GROVA para un cliente privado; el código y los datos reales no son públicos. El porcentaje sale del historial de Git, sin contar merges, y solo incluye lo que subí desde mi cuenta: parte de mi trabajo lo subió mi compañero. Las capturas son de una demo local con datos ficticios.",
      en: "A GROVA project for a private client; the code and real data aren't public. The percentage comes from the Git history, excluding merges, and only counts what I pushed from my own account: my teammate pushed part of my work. Screenshots are from a local demo with fictitious data.",
    },
  },
};

export function caseStudyFor(id: ProjectId) {
  return Object.values(caseStudies).find((cs) => cs.id === id);
}
