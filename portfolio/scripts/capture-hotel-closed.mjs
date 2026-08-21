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
    await page.getByRole("button", { name: /aceptar/i }).click({ timeout: 4000 });
    await page.waitForTimeout(700);
  } catch {
    /* ignore */
  }
}

async function ensureStickyClosed(page) {
  for (let i = 0; i < 5; i++) {
    const open = await page.evaluate(
      () => !!document.querySelector('[data-icon="chevron-up"], .fa-chevron-up'),
    );
    if (!open) return;
    await page.evaluate(() => {
      document
        .querySelector('[data-icon="chevron-up"], .fa-chevron-up')
        ?.closest("button")
        ?.click();
    });
    await page.waitForTimeout(1000);
  }
}

async function hydrateImages(page) {
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll("img")];
    for (const img of imgs) {
      img.loading = "eager";
      for (const attr of ["data-src", "data-lazy-src", "data-original"]) {
        const v = img.getAttribute(attr);
        if (v) img.setAttribute("src", v);
      }
      try {
        img.scrollIntoView({ block: "center", inline: "nearest" });
      } catch {
        /* ignore */
      }
      await new Promise((r) => setTimeout(r, 350));
    }
  });
}

async function waitUntilViewportPhotos(page, { minWide = 320, timeout = 90000 } = {}) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    await hydrateImages(page);
    const stats = await page.evaluate((wide) => {
      const vh = window.innerHeight;
      const inView = [...document.images].filter((img) => {
        const r = img.getBoundingClientRect();
        return r.bottom > 80 && r.top < vh - 40 && r.width > 80;
      });
      const loaded = inView.filter(
        (img) => img.complete && img.naturalWidth >= wide,
      );
      return { inView: inView.length, loaded: loaded.length };
    }, minWide);
    console.log(`  viewport photos ${stats.loaded}/${stats.inView}`);
    if (stats.inView > 0 && stats.loaded >= Math.min(2, stats.inView)) {
      await page.waitForTimeout(4000);
      return;
    }
    await page.waitForTimeout(1600);
  }
  await page.waitForTimeout(3000);
}

async function settle(page, suffix) {
  await page.goto(`${base}${suffix}`, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(5000);
  await dismissCookies(page);
  await page.waitForTimeout(2000);
  await hydrateImages(page);
  await page.waitForTimeout(8000);
  await waitUntilViewportPhotos(page, { minWide: 280, timeout: 70000 });
  await dismissCookies(page);
}

async function shot(page, file) {
  await ensureStickyClosed(page);
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, file), type: "png" });
  console.log("→", file);
}

async function captureClosed(browser, kind, viewport) {
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: kind === "mobile" ? 2 : 1,
    isMobile: kind === "mobile",
    hasTouch: kind !== "desktop",
  });

  // 2 about
  console.log(`\n[${kind}-2]`);
  await settle(page, "");
  await ensureStickyClosed(page);
  await page.evaluate(() => window.scrollTo(0, Math.round(innerHeight * 1.0)));
  await page.waitForTimeout(2500);
  await waitUntilViewportPhotos(page);
  await shot(page, `${kind}-2.png`);

  // 3 cta
  console.log(`\n[${kind}-3]`);
  await ensureStickyClosed(page);
  await page.evaluate(() => window.scrollTo(0, Math.round(innerHeight * 1.75)));
  await page.waitForTimeout(2500);
  await waitUntilViewportPhotos(page);
  await shot(page, `${kind}-3.png`);

  // 4 rooms
  console.log(`\n[${kind}-4]`);
  await settle(page, "rooms");
  await ensureStickyClosed(page);
  await page.evaluate(() => window.scrollTo(0, Math.round(innerHeight * 0.6)));
  await page.waitForTimeout(3000);
  await waitUntilViewportPhotos(page, { minWide: 250, timeout: 90000 });
  // Advance first carousel once to force next asset
  await page.evaluate(() => {
    const next = [...document.querySelectorAll("button")].find((b) => {
      const r = b.getBoundingClientRect();
      return r.width > 28 && r.width < 56 && r.top > 200 && r.top < 700 && r.left > window.innerWidth * 0.35;
    });
    next?.click();
  });
  await page.waitForTimeout(2500);
  await waitUntilViewportPhotos(page, { minWide: 250, timeout: 40000 });
  await shot(page, `${kind}-4.png`);

  // 5 rooms deep
  console.log(`\n[${kind}-5]`);
  await ensureStickyClosed(page);
  await page.evaluate(() => window.scrollTo(0, Math.round(innerHeight * 1.4)));
  await page.waitForTimeout(3000);
  await waitUntilViewportPhotos(page, { minWide: 220, timeout: 90000 });
  await shot(page, `${kind}-5.png`);

  await page.close();
}

async function main() {
  const browser = await chromium.launch({ executablePath: edge, headless: true });
  await captureClosed(browser, "desktop", { width: 1440, height: 900 });
  await captureClosed(browser, "tablet", { width: 834, height: 1112 });
  await captureClosed(browser, "mobile", { width: 390, height: 844 });
  await browser.close();
  console.log("done — closed sticky shots refreshed");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
