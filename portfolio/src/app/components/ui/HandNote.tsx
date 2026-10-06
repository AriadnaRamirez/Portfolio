type Direction = "down-right" | "down-left" | "right" | "up-right";

const arrowPaths: Record<Direction, { body: string; head: string }> = {
  "down-right": {
    body: "M4 8c8-6 20-6 22 2s-10 10-11 3 11-10 19-4 9 14 8 24",
    head: "M35 27l7 7 5-8",
  },
  "down-left": {
    body: "M44 8c-8-6-20-6-22 2s10 10 11 3-11-10-19-4-9 14-8 24",
    head: "M13 27l-7 7-5-8",
  },
  right: {
    body: "M2 22c10-10 22-14 34-8",
    head: "M30 7l8 7-9 6",
  },
  "up-right": {
    body: "M4 32c6-12 16-20 32-22",
    head: "M29 4l8 6-8 6",
  },
};

export function HandArrow({
  direction = "down-right",
  className = "",
}: {
  direction?: Direction;
  className?: string;
}) {
  const p = arrowPaths[direction];
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`scribble ${className}`}
    >
      <path d={p.body} />
      <path d={p.head} />
    </svg>
  );
}

export function HandNote({
  children,
  arrow,
  color,
  as: Tag = "span",
  className = "",
  arrowClassName = "h-9 w-11",
}: {
  children: React.ReactNode;
  arrow?: Direction;
  color?: string;
  as?: "span" | "p" | "h3" | "h4";
  className?: string;
  arrowClassName?: string;
}) {
  return (
    <Tag
      style={color ? { color } : undefined}
      className={`hand-note inline-flex items-end gap-1 text-[1.65rem] ${className}`}
    >
      {arrow === "down-left" ? (
        <HandArrow direction={arrow} className={arrowClassName} />
      ) : null}
      <span>{children}</span>
      {arrow && arrow !== "down-left" ? (
        <HandArrow direction={arrow} className={arrowClassName} />
      ) : null}
    </Tag>
  );
}
