// components/navbar/Navbar.tsx
"use client";

import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { useLanguage } from "@/app/context/LanguageContext";

export function Navbar() {
	const { t } = useLanguage();

	return (
		<header className="sticky top-0 z-20 bg-white/80 dark:bg-black/70 backdrop-blur border-b">
			<nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* LOGO / NOMBRE */}
				<span className="font-semibold tracking-[0.2em] text-xs">
					ARIADNA RAMIREZ
				</span>

				{/* LINKS DESKTOP */}
				<div className="hidden md:flex gap-6 text-sm">
					<a href="#projects">{t.nav_projects}</a>
					<a href="#stack">{t.nav_stack}</a>
					<a href="#portfolio">{t.nav_portfolio}</a>
					<a href="#about">{t.nav_about}</a>
					<a href="#contact">{t.nav_contact}</a>
				</div>

				{/* TOGGLES */}
				<div className="flex items-center gap-2">
					<LangToggle />
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
