"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { assetPath } from "@/app/lib/siteUrl";

/** Illustrated avatar standing on a soft category-coloured disc. */
export function Character({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`character relative isolate shrink-0 ${className}`}>
      <span
        aria-hidden
        className="absolute inset-x-[-28%] bottom-[6%] -z-10 aspect-square rounded-full bg-[radial-gradient(circle_at_50%_35%,color-mix(in_srgb,var(--cat-from,#f5b062)_34%,var(--background)),color-mix(in_srgb,var(--cat-to,#f7d6c4)_18%,var(--background))_72%)]"
      />
      <img
        src={assetPath("/images/ariadna-character.png")}
        alt={t.character_alt}
        width={118}
        height={281}
        loading="lazy"
        decoding="async"
        className="character-img relative h-full w-auto"
      />
    </div>
  );
}
