import { orgs, type OrgId } from "@/app/lib/orgs";
import { assetPath } from "@/app/lib/siteUrl";

/**
 * Institution logo. Grayscale at rest so mixed brand colors don't fight the
 * page; full color when an ancestor `.group` is hovered. White on dark theme.
 */
export function OrgLogo({ id, className = "" }: { id: OrgId; className?: string }) {
  const org = orgs[id];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, local assets
    <img
      src={assetPath(`/orgs/${org.file}`)}
      alt={org.name}
      loading="lazy"
      decoding="async"
      className={`w-auto object-contain object-left opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-80 dark:brightness-0 dark:invert dark:group-hover:opacity-100 max-w-[9rem] ${org.size} ${className}`}
    />
  );
}
