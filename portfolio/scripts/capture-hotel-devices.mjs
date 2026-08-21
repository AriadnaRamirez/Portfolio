import { chromium } from "playwright-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/projects/hotel");
const base = "https://www.hotelmarquesdelvalle.com.mx/";
const edge =
  "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";

async function dismissCookies(page) {
  try {
    await page.getByRole("button", { name: /aceptar/i }).click({ timeout: 5000 });
    await page.waitForTimeout(800);
  } catch {
    /* ignore */
  }
}

async function closeMenu(page) {
  await page.evaluate(() => {
    const x = [...document.querySelectorAll("button")].find((b) => {
      const t = (b.textContent || "").trim();
      return (t === "×" || t === "✕" || t === "X") && b.getBoundingClientRect().top < 140;
    });
    x?.click();
  });
  await page.waitForTimeout(250);
}

async function stickyOpen(page) {
  return page.evaluate(
    () => !!document.querySelector('[data-icon="chevron-up"], .fa-chevron-up'),
  );
}

async function setSticky(page, wantOpen) {
  for (let i = 0; i < 6; i++) {
    const open = await stickyOpen(page);
    if (open === wantOpen) {
      await closeMenu(page);
      return;
    }
    await page.evaluate((openWanted) => {
      const sel = openWanted
        ? '[data-icon="chevron-down"], .fa-chevron-down'
        : '[data-icon="chevron-up"], .fa-chevron-up';
      document.querySelector(sel)?.closest("button")?.click();
    }, wantOpen);
    await page.waitForTimeout(1100);
  }
}

/** Mark lazy imgs eager — do NOT scroll the page. */
async function markEager(page) {
  await page.evaluate(() => {
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
      for (const a of ["data-src", "data-lazy-src", "data-original"]) {
        const v = img.getAttribute(a);
        if (v && (!img.src || img.src.startsWith("data:"))) img.src = v;
      }
    });
  });
}

async function waitLoadedInView(page, { minWide = 300, min = 1, timeout = 70000 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    await markEager(page);
    const ok = await page.evaluate(({ minWide, min }) => {
      const vh = window.innerHeight;
      const candidates = [...document.images].filter((img) => {
        const r = img.getBoundingClientRect();
        return r.width > 100 && r.bottom > 100 && r.top < vh - 60;
      });
      const loaded = candidates.filter(
        (img) => img.complete && img.naturalWidth >= minWide,
      );
      return loaded.length >= min;
    }, { minWide, min });
    if (ok) {
      await page.waitForTimeout(4500);
      return true;
    }
    // Soft nudge to trigger IntersectionObserver without leaving section
    await page.evaluate(() => window.scrollBy(0, 40));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollBy(0, -40));
    await page.waitForTimeout(1400);
  }
  await page.waitForTimeout(3000);
  return false;
}

async function goto(page, suffix = "") {
  await page.goto(`${base}${suffix}`, {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await page.waitForTimeout(6000);
  await dismissCookies(page);
  await closeMenu(page);
  await markEager(page);
  await page.waitForTimeout(10000);
  await waitLoadedInView(page, { minWide: 400, min: 1, timeout: 60000 });
  await dismissCookies(page);
  await closeMenu(page);
}

async function scrollTo(page, yOrFn) {
  if (typeof yOrFn === "number") {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), yOrFn);
  } else {
    await page.evaluate(yOrFn);
  }
  await page.waitForTimeout(2500);
  await markEager(page);
}

async function shot(page, file) {
  await closeMenu(page);
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, file), type: "png" });
  const open = await stickyOpen(page);
  console.log(`→ ${file} stickyOpen=${open}`);
}

async function capture(browser, kind, viewport) {
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: kind === "mobile" ? 2 : 1,
    isMobile: kind === "mobile",
    hasTouch: kind !== "desktop",
  });

  // ---- 1 OPEN hero ----
  console.log(`\n[${kind}-1] hero open`);
  await goto(page, "");
  await setSticky(page, true);
  await scrollTo(page, 0);
  await waitLoadedInView(page, { minWide: 500, min: 1 });
  await shot(page, `${kind}-1.png`);

  // ---- 2 CLOSED about / alrededores ----
  console.log(`\n[${kind}-2] about closed`);
  await setSticky(page, false);
  await scrollTo(page, () => {
    const el = [...document.querySelectorAll("h1,h2,h3,p,button")].find((n) =>
      /EXPLORAR LOS ALREDEDORES|A PASOS DEL ZÓCALO|ubicad/i.test(n.textContent || ""),
    );
    if (el) el.scrollIntoView({ block: "center" });
    else window.scrollTo(0, Math.round(innerHeight * 0.9));
  });
  await waitLoadedInView(page, { minWide: 280, min: 1, timeout: 80000 });
  await setSticky(page, false);
  await shot(page, `${kind}-2.png`);

  // ---- 3 CLOSED mensaje CTA + photo ----
  console.log(`\n[${kind}-3] mensaje closed`);
  await setSticky(page, false);
  await scrollTo(page, () => {
    const el = [...document.querySelectorAll("h1,h2,h3")].find((n) =>
      /RESERVA TU ESTANCIA|MENSAJE/i.test(n.textContent || ""),
    );
    if (el) {
      el.scrollIntoView({ block: "start" });
      window.scrollBy(0, -120);
    } else window.scrollTo(0, Math.round(innerHeight * 1.65));
  });
  await waitLoadedInView(page, { minWide: 250, min: 1, timeout: 80000 });
  await setSticky(page, false);
  await shot(page, `${kind}-3.png`);

  // ---- 4 CLOSED rooms first card ----
  console.log(`\n[${kind}-4] rooms closed`);
  await goto(page, "rooms");
  await setSticky(page, false);
  await scrollTo(page, () => {
    const el = [...document.querySelectorAll("h1,h2,h3")].find((n) =>
      /DOBLE INTERIOR|INTERIOR/i.test((n.textContent || "").trim()),
    );
    if (el) {
      el.scrollIntoView({ block: "center" });
      window.scrollBy(0, -80);
    } else window.scrollTo(0, Math.round(innerHeight * 0.55));
  });
  await waitLoadedInView(page, { minWide: 280, min: 1, timeout: 90000 });
  await setSticky(page, false);
  await shot(page, `${kind}-4.png`);

  // ---- 5 CLOSED rooms exterior / deeper ----
  console.log(`\n[${kind}-5] rooms deep closed`);
  await setSticky(page, false);
  await scrollTo(page, () => {
    const el = [...document.querySelectorAll("h1,h2,h3")].find((n) =>
      /DOBLE EXTERIOR|EXTERIOR/i.test((n.textContent || "").trim()),
    );
    if (el) {
      el.scrollIntoView({ block: "center" });
      window.scrollBy(0, -60);
    } else window.scrollTo(0, Math.round(innerHeight * 1.35));
  });
  await waitLoadedInView(page, { minWide: 250, min: 1, timeout: 90000 });
  await setSticky(page, false);
  await shot(page, `${kind}-5.png`);

  await page.close();
}

async function main() {
  const browser = await chromium.launch({
    executablePath: edge,
    headless: true,
  });
  await capture(browser, "desktop", { width: 1440, height: 900 });
  await capture(browser, "tablet", { width: 834, height: 1112 });
  await capture(browser, "mobile", { width: 390, height: 844 });
  await browser.close();
  console.log("done — 15 varied hotel shots");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
