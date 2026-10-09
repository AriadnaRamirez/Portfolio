import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { JsonLd } from "./components/seo/JsonLd";
import { PagePager } from "./components/layout/PagePager";
import { RouteEffects } from "./components/layout/RouteEffects";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteNav } from "./components/layout/SiteNav";
import { LanguageProvider } from "./context/LanguageContext";
import { OG_IMAGE } from "./lib/seo";
import { site } from "./lib/site";
import { absoluteUrl, assetPath, SITE_URL } from "./lib/siteUrl";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "./fonts/OpenRunde-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/OpenRunde-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/OpenRunde-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/OpenRunde-Bold.woff2", weight: "700", style: "normal" },
  ],
});

const title = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["600", "700", "800"],
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["500", "600", "700"],
  preload: false,
});

const siteUrl = SITE_URL.replace(/\/$/, "");

/** Cookieless analytics; only loads when the Umami website ID is set at build time. */
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#161616" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Ariadna Ramírez | Fullstack Web Developer · Frontend React & TypeScript",
    template: "%s | Ariadna Ramírez",
  },
  description:
    "Ariadna Ramírez — Fullstack Web Developer especializada en Frontend, React, TypeScript y UX/UI. Diseño e implemento SaaS, sitios web y productos digitales en producción. México · remoto, híbrido o presencial.",
  keywords: [
    "Ariadna Ramírez",
    "Fullstack Web Developer",
    "Frontend Developer",
    "React",
    "TypeScript",
    "Next.js",
    "UX/UI",
    "México",
    "desarrolladora web",
    "portfolio",
    "SaaS",
  ],
  authors: [{ name: site.fullName, url: siteUrl }],
  creator: site.fullName,
  publisher: site.name,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    url: absoluteUrl("/"),
    siteName: `${site.name} Portfolio`,
    title:
      "Ariadna Ramírez | Fullstack Web Developer · Frontend React & TypeScript",
    description:
      "Frontend React/TypeScript, UX/UI, APIs REST y despliegue a producción. Freelance y experiencia en productos SaaS reales.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ariadna Ramírez | Fullstack Web Developer",
    description:
      "Frontend React · TypeScript · UX/UI. SaaS, sitios y productos en producción. Disponible en México y remoto.",
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: [
      { url: assetPath("/favicon.ico"), sizes: "16x16 32x32 48x48" },
      { url: assetPath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { url: assetPath("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: assetPath("/apple-touch-icon.png"), sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${body.variable} ${title.variable} ${hand.variable}`}
    >
      <body className="font-sans antialiased">
        <JsonLd siteUrl={siteUrl} />
        <div aria-hidden className="scroll-progress" />
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-[100dvh] flex-col">
              <SiteNav />
              <RouteEffects>
                <main id="main-content" className="flex-1">
                  {children}
                </main>
                <PagePager />
              </RouteEffects>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
        {umamiWebsiteId ? (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
