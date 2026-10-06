import { site } from "@/app/lib/site";

type JsonLdProps = {
  siteUrl: string;
};

export function JsonLd({ siteUrl }: JsonLdProps) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.fullName,
    alternateName: site.name,
    url: siteUrl,
    email: site.email,
    telephone: site.phoneHref.replace("tel:", ""),
    image: `${siteUrl}${site.photo}`,
    jobTitle: "Fullstack Web Developer",
    description:
      "Fullstack Web Developer specialized in Frontend, React, TypeScript, and UX/UI. Builds SaaS products, websites, and custom digital solutions from brief to production.",
    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Frontend development",
      "UX/UI design",
      "REST APIs",
      "Node.js",
      "Web development",
      "SaaS",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
    },
    sameAs: [site.linkedin, site.github],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad La Salle Oaxaca",
      },
      {
        "@type": "EducationalOrganization",
        name: "SoyHenry",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${site.name} Portfolio`,
    description:
      "Portfolio of Ariadna Ramírez — Fullstack Web Developer focused on Frontend, React, TypeScript, and UX/UI.",
    inLanguage: ["es-MX", "en"],
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: `${site.name} — Web Development`,
    url: siteUrl,
    image: `${siteUrl}${site.photo}`,
    description:
      "Frontend and fullstack web development: React/TypeScript interfaces, UX/UI, REST integrations, and production deployment. Available remote, hybrid, or on-site in Mexico.",
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: [
      { "@type": "Country", name: "Mexico" },
      { "@type": "Place", name: "Remote" },
    ],
    serviceType: [
      "Frontend development",
      "Fullstack web development",
      "UX/UI implementation",
      "SaaS product development",
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/contact/`,
    },
  };

  const payloads = [person, website, professionalService];

  return (
    <>
      {payloads.map((data) => (
        <script
          key={String(data["@id"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
