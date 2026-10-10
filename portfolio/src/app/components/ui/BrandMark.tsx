import type { BrandId } from "@/app/lib/brands";
import { brands } from "@/app/lib/brands";
import { assetPath } from "@/app/lib/siteUrl";

type BrandMarkProps = {
  id: BrandId;
  className?: string;
};

function LogoImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    // static export brand marks
    <img
      src={assetPath(src)}
      alt={alt}
      className={`object-contain ${className ?? ""}`}
      loading="lazy"
      decoding="async"
    />
  );
}

/** Brand marks: real logos when available, typographic fallback otherwise. */
export function BrandMark({ id, className = "h-8 w-auto max-w-[10rem]" }: BrandMarkProps) {
  const brand = brands[id];
  const name = brand.name;

  if (brand.logo) {
    const markClass = `${className} ${brand.logoClassName ?? ""}`;
    if (!brand.logoDark) {
      return <LogoImg src={brand.logo} alt={name} className={markClass} />;
    }
    return (
      <>
        <LogoImg src={brand.logo} alt={name} className={`${markClass} dark:hidden`} />
        <LogoImg src={brand.logoDark} alt={name} className={`${markClass} hidden dark:inline`} />
      </>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-semibold tracking-[0.14em] uppercase ${className}`}
    >
      {name}
    </span>
  );
}
