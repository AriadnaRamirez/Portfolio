const KEY = "portfolio-landing-pos";
const RESTORE = "portfolio-landing-restore";
const LINE = 96;

export type LandingPosition = { id: string; offset: number };

let restoring = false;
let timer = 0;
const cancelEvents = ["wheel", "touchstart", "keydown"] as const;

function stopRestore() {
  restoring = false;
  window.clearTimeout(timer);
  for (const type of cancelEvents) window.removeEventListener(type, stopRestore);
}

/** Remembers the section on screen and how far it sits from the top. */
export function captureLandingPosition() {
  if (restoring) return;
  // Only the landing has #work. A scroll on the next page must not overwrite this.
  if (!document.getElementById("work")) return;
  const sections = [...document.querySelectorAll<HTMLElement>("section[id]")];
  let current: HTMLElement | null = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= LINE) current = section;
    else break;
  }
  const pos: LandingPosition = current
    ? { id: current.id, offset: Math.round(current.getBoundingClientRect().top) }
    : { id: "top", offset: 0 };
  sessionStorage.setItem(KEY, JSON.stringify(pos));
}

export function readLandingPosition(): LandingPosition | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const pos = JSON.parse(raw) as LandingPosition;
    if (typeof pos.id === "string" && typeof pos.offset === "number") return pos;
  } catch {
    /* ignore broken storage */
  }
  return null;
}

export function markLandingRestore() {
  if (readLandingPosition()) sessionStorage.setItem(RESTORE, "1");
}

export function consumeLandingRestore() {
  const marked = sessionStorage.getItem(RESTORE) === "1";
  if (marked) sessionStorage.removeItem(RESTORE);
  return marked;
}

/** Puts the saved section back at the same spot, including after lazy sections settle. */
export function restoreLandingPosition(tries = 12) {
  const pos = readLandingPosition();
  if (!pos) return;
  restoring = true;
  if (pos.id === "top") {
    if (window.scrollY > 2) window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    const el = document.getElementById(pos.id);
    if (el) {
      const delta = el.getBoundingClientRect().top - pos.offset;
      if (Math.abs(delta) > 2) {
        window.scrollTo({ top: Math.max(0, window.scrollY + delta), behavior: "instant" });
      }
    }
  }
  if (tries === 12) {
    for (const type of cancelEvents) {
      window.addEventListener(type, stopRestore, { passive: true });
    }
  }
  if (tries > 1) timer = window.setTimeout(() => restoreLandingPosition(tries - 1), 100);
  else stopRestore();
}
