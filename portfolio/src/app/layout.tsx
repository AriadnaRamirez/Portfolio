// app/layout.tsx
import { LanguageProvider } from "./context/LanguageContext";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
