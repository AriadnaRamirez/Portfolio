"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

/** Sends trimmed URLs (e.g. /work/) to the matching landing section. */
export function HashRedirect({ to }: { to: string }) {
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <section className="page-shell flex min-h-[60dvh] items-center justify-center py-24">
      <Link href={to} className="btn-ghost">
        {t.hero_cta_secondary}
        <span aria-hidden className="btn-arrow">→</span>
      </Link>
    </section>
  );
}
