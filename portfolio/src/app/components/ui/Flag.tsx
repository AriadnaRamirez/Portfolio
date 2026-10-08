/** Inline flags: emoji flags render as plain letters on Windows. */
export function Flag({ country, className = "h-3.5 w-5" }: { country: "mx" | "us"; className?: string }) {
  return (
    <svg
      viewBox="0 0 21 14"
      preserveAspectRatio="none"
      className={`shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10 dark:ring-white/15 ${className}`}
      aria-hidden
    >
      {country === "mx" ? (
        <>
          <rect width="7" height="14" fill="#006847" />
          <rect x="7" width="7" height="14" fill="#fff" />
          <rect x="14" width="7" height="14" fill="#ce1126" />
          <circle cx="10.5" cy="7" r="1.7" fill="#8c5a2b" />
          <path d="M8.9 8.1q1.6 1.4 3.2 0" fill="none" stroke="#2f7d32" strokeWidth="0.6" />
        </>
      ) : (
        <>
          <rect width="21" height="14" fill="#fff" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} y={(i * 2 * 14) / 13} width="21" height={14 / 13} fill="#b22234" />
          ))}
          <rect width="9.5" height={(7 * 14) / 13} fill="#3c3b6e" />
          {[1.4, 3.7, 6].flatMap((cy, row) =>
            [1.4, 3.6, 5.8, 8].map((cx) => (
              <circle key={`${row}-${cx}`} cx={cx + (row % 2 ? 1.1 : 0)} cy={cy} r="0.45" fill="#fff" />
            )),
          )}
        </>
      )}
    </svg>
  );
}
