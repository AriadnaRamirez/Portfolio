"use client";

import { useId, useState, type ReactNode } from "react";

export type TabItem = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  defaultId?: string;
  className?: string;
};

export function Tabs({ items, defaultId, className = "" }: TabsProps) {
  const baseId = useId();
  const [active, setActive] = useState(defaultId ?? items[0]?.id);

  if (!items.length) return null;

  const current = items.find((item) => item.id === active) ?? items[0];

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Sections"
        className="flex gap-0 overflow-x-auto border-b border-border [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => {
          const selected = item.id === current.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              className={`relative shrink-0 px-3 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition sm:px-5 sm:text-[0.7rem] ${
                selected
                  ? "text-highlight"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
              {selected ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-highlight" />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${current.id}`}
        aria-labelledby={`${baseId}-tab-${current.id}`}
        className="pt-8 animate-fade"
        key={current.id}
      >
        {current.content}
      </div>
    </div>
  );
}
