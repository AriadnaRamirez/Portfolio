"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 md:items-center">

      {/* Imagen */}
      <div className="flex justify-center">
        <div className="rounded-3xl overflow-hidden shadow-lg w-full max-w-md">
          <Image
            src="/images/ari-biblioteca.jpg"
            alt="Ariadna Ramírez"
            width={600}
            height={800}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Texto */}
      <div className="space-y-4">
        <p className="text-sm tracking-[0.25em] uppercase">
          Portfolio
        </p>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          {t.hero_title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground">
          {t.hero_subtitle}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a className="px-5 py-2 rounded-full bg-sky-600 text-white text-sm">
            {t.hero_cta_primary}
          </a>

          <a className="px-5 py-2 rounded-full bg-amber-500 text-white text-sm">
            {t.hero_cta_secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
