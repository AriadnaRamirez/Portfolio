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
        caption: { es: "Productos sin imagen y un “Curso de prueba” publicado como si fuera un artículo.", en: "Products without images and a “test course” published as if it were a product." },
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
        title: { es: "Pruebas sobre la lógica que importa", en: "Tests on the logic that matters" },
        body: {
          es: "Vitest cubre la corrección de los 5 tipos de pregunta, la regla de tres aciertos seguidos, la mezcla de la sesión y dónde reaparece un refuerzo, más una prueba de integración del flujo de sesión. Prisma gestiona el esquema y las migraciones en PostgreSQL.",
          en: "Vitest covers grading for all 5 question types, the three-in-a-row rule, the session mix, and where a reinforcement card reappears, plus an integration test for the session flow. Prisma manages the schema and migrations on PostgreSQL.",
        },
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
  serviyapp: {
    id: "servi",
    slug: "serviyapp",
    client: "ServiYApp",
    codeUrl: "https://github.com/ServiYApp-Inc/ServiYApp-Frontend",
    backendCodeUrl: "https://github.com/ServiYApp-Inc/ServiYApp-Backend",
    summary: {
      es: "Plataforma para reservar servicios de belleza a domicilio (peluquería, maquillaje, manicura, cejas, masajes y más) y coordinarlos de punta a punta. Como Frontend Developer en un equipo de 6, construí la autenticación por rol, el flujo de compra con Mercado Pago, la verificación de profesionales y el chat en tiempo real completo, del backend en NestJS a la interfaz.",
      en: "A platform to book at-home beauty services (hair, makeup, nails, brows, massage, and more) and coordinate them end to end. As a Frontend Developer on a team of 6, I built role-based authentication, the Mercado Pago purchase flow, professional verification, and the full real-time chat, from the NestJS backend to the UI.",
    },
    facts: [
      { label: { es: "Rol", en: "Role" }, value: { es: "Frontend · Chat fullstack", en: "Frontend · Fullstack chat" } },
      { label: { es: "Equipo", en: "Team" }, value: { es: "6 personas", en: "6 people" } },
      { label: { es: "Periodo", en: "Timeline" }, value: { es: "Oct — Nov 2025", en: "Oct — Nov 2025" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Auth · Pagos · Chat · Verificación", en: "Auth · Payments · Chat · Verification" } },
    ],
    tech: ["nextjs", "react", "typescript", "tailwind", "nestjs", "socketio", "oauth"],
    challenge: {
      es: "Un servicio a domicilio no termina en un catálogo: hay que pagar, agendar, coordinar la llegada y confiar en alguien que no conoces y que va a entrar a tu casa. ServiYApp conecta tres perfiles con sesión propia (el cliente reserva, el profesional publica y atiende, el administrador controla la plataforma), y los flujos entre ellos no se pueden romper. Todo en pocas semanas y con seis personas trabajando sobre el mismo código.",
      en: "An at-home service doesn't end at a catalog: you have to pay, schedule, coordinate arrival, and trust a stranger who's coming into your home. ServiYApp connects three profiles, each with its own session (the client books, the professional publishes and delivers, the admin runs the platform), and the flows between them can't break. All in a few weeks, with six people working on the same codebase.",
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
          es: "En el backend, un gateway de WebSockets en NestJS con Socket.IO; en el frontend, la interfaz de conversación y la lista de chats. Es la parte del proyecto que diseñé de punta a punta.",
          en: "On the backend, a NestJS WebSocket gateway with Socket.IO; on the frontend, the conversation UI, the chat list, and notifications. It's the part of the project I designed end to end.",
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
};

export function caseStudyFor(id: ProjectId) {
  return Object.values(caseStudies).find((cs) => cs.id === id);
}
