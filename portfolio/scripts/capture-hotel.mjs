import { chromium } from "playwright-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/projects/hotel");
const url = "https://www.hotelmarquesdelvalle.com.mx/";
const edge =
  process.env.EDGE_PATH ||
  "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";

async function dismissCookies(page) {
  const accept = page.getByRole("button", { name: /aceptar/i });
  try {
    if (await accept.count()) {
      await accept.first().click({ timeout: 3000 });
      await page.waitForTimeout(800);
    }
  } catch {
    /* banner may already be gone */
  }
}

async function waitForHero(page) {
  await page.waitForTimeout(4000);
  try {
    await page.waitForFunction(
      () => {
        const imgs = [...document.images];
        if (!imgs.length) return false;
        return imgs.some((img) => img.complete && img.naturalWidth > 200);
      },
      { timeout: 20000 },
    );
  } catch {
    /* continue with whatever painted */
  }
  await page.waitForTimeout(1500);
}

async function open(page) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  try {
    await page.waitForLoadState("load", { timeout: 20000 });
  } catch {
    /* ok */
  }
  await waitForHero(page);
  await dismissCookies(page);
}

async function main() {
  const browser = await chromium.launch({
    executablePath: edge,
    headless: true,
  });

  // Desktop home
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await open(page);
    await page.screenshot({
      path: path.join(outDir, "desktop.png"),
      type: "png",
      fullPage: false,
    });
    await page.close();
    console.log("desktop.png ok");
  }

  // Mobile rooms (or home if rooms route differs)
  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await open(page);

    // Prefer a clean rooms listing on mobile
    try {
      await page.goto(`${url}habitaciones`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(3500);
      await dismissCookies(page);
    } catch {
      const rooms = page.getByRole("link", { name: /habitaciones/i }).first();
      if (await rooms.count()) {
        try {
          await rooms.click({ timeout: 5000 });
          await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
          await page.waitForTimeout(3000);
          await dismissCookies(page);
        } catch {
          /* keep home */
        }
      }
    }

    // Close open dropdowns if any
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(400);

    await page.screenshot({
      path: path.join(outDir, "mobile.png"),
      type: "png",
      fullPage: false,
    });
    await page.close();
    console.log("mobile.png ok");
  }

  // Detail: scroll to rooms / mid-page section on desktop
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    await open(page);

    try {
      await page.goto(`${url}habitaciones`, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });
      await page.waitForTimeout(3500);
      await dismissCookies(page);
    } catch {
      const rooms = page.getByRole("link", { name: /habitaciones/i }).first();
      if (await rooms.count()) {
        try {
          await rooms.click({ timeout: 5000 });
          await page.waitForLoadState("domcontentloaded", { timeout: 20000 });
          await page.waitForTimeout(3000);
          await dismissCookies(page);
        } catch {
          await page.evaluate(() =>
            window.scrollBy(0, Math.round(window.innerHeight * 1.2)),
          );
          await page.waitForTimeout(1500);
        }
      } else {
        await page.evaluate(() =>
          window.scrollBy(0, Math.round(window.innerHeight * 1.2)),
        );
        await page.waitForTimeout(1500);
      }
    }

    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(500);
    // Scroll past the rooms hero into the listing cards
    await page.evaluate(() =>
      window.scrollBy(0, Math.round(window.innerHeight * 0.85)),
    );
    await page.waitForTimeout(1200);

    await page.screenshot({
      path: path.join(outDir, "detail.png"),
      type: "png",
      fullPage: false,
    });
    await page.close();
    console.log("detail.png ok");
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
