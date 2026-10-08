import { orgs, type OrgId } from "@/app/lib/orgs";
import { assetPath } from "@/app/lib/siteUrl";

/**
 * Institution logo linking to its site. Grayscale at rest so mixed brand
 * colors don't fight the page; full color when an ancestor `.group` is
 * hovered. White on dark theme.
 */
export function OrgLogo({
  id,
  className = "",
  wrapperClassName = "",
}: {
  id: OrgId;
  className?: string;
  wrapperClassName?: string;
}) {
  const org = orgs[id];
  return (
    <a
      href={org.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${org.name} ↗`}
      title={org.name}
      className={`inline-block overflow-visible no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground ${wrapperClassName}`}
    >
      {org.mono ? (
        <span className="relative block">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, local assets */}
          <img
            src={assetPath(`/orgs/${org.mono}`)}
            alt=""
            loading="lazy"
            decoding="async"
            className={`block w-auto object-contain object-left opacity-70 grayscale transition duration-300 group-hover:opacity-0 dark:opacity-80 dark:brightness-0 dark:invert dark:group-hover:opacity-100 ${org.size} ${className}`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, local assets */}
          <img
            src={assetPath(`/orgs/${org.file}`)}
            alt=""
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 block w-auto object-contain object-left opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden ${org.size} ${className}`}
          />
        </span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element -- static export, local assets */
        <img
          src={assetPath(`/orgs/${org.file}`)}
          alt=""
          loading="lazy"
          decoding="async"
          className={`block w-auto object-contain object-left opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 dark:opacity-80 dark:brightness-0 dark:invert dark:group-hover:opacity-100 ${org.size} ${className}`}
        />
      )}
    </a>
  );
}
