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
      es: "El cliente necesitaba una presencia digital que generara confianza y convirtiera visitas en cotizaciones. Su oferta —55 equipos en 7 categorías— no tenía un catálogo consultable, y la mayoría de sus clientes (condominios, restaurantes y oficinas) busca resolver rápido el cumplimiento de Protección Civil.",
      en: "The client needed a digital presence that built trust and turned visits into quote requests. Their offer — 55 products across 7 categories — had no browsable catalog, and most customers (condos, restaurants, offices) want to sort out civil-protection compliance quickly.",
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
      { value: "E2E", label: { es: "de la idea a producción", en: "from idea to production" } },
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
};

export function caseStudyFor(id: ProjectId) {
  return Object.values(caseStudies).find((cs) => cs.id === id);
}
