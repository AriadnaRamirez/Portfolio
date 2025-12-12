// components/navbar/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Solo después de montar podemos confiar en theme/systemTheme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mientras no está montado, devolvemos un botón "neutro"
  // que se verá igual en SSR y en el cliente
  if (!mounted) {
    return (
      <button
        className="px-3 py-1 rounded-full border text-xs border-gray-300 dark:border-gray-600"
        aria-label="Toggle theme"
      >
        🌙
      </button>
    );
  }

  const resolvedTheme =
    theme === "system" ? systemTheme : theme;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="px-3 py-1 rounded-full border text-xs border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      aria-label="Toggle theme"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
