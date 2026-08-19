import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { PagePager } from "./components/layout/PagePager";
import { RouteEffects } from "./components/layout/RouteEffects";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteNav } from "./components/layout/SiteNav";
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ariadna Ramírez · Fullstack web developer",
    template: "%s · Ariadna Ramírez",
  },
  description:
    "Fullstack web developer · UX/UI · Cybersecurity · DevOps. TypeScript, React, Next.js. Mexico · remote.",
  openGraph: {
    title: "Ariadna Ramírez · Fullstack web developer · UX/UI · Cybersecurity · DevOps",
    description:
      "Fullstack web developer · UX/UI · Cybersecurity · DevOps. React, Next.js, TypeScript. Mexico · remote / hybrid / on-site.",
    locale: "es_MX",
    type: "website",
  },
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
      className={`${display.variable} ${body.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <SiteNav />
              <RouteEffects>
                <main className="flex-1">{children}</main>
                <PagePager />
              </RouteEffects>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
