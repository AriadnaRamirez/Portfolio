import { chromium } from "playwright-core";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/projects/hotel");
const url = "https://www.hotelmarquesdelvalle.com.mx/";
const edge =
  "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";

async function dismissCookies(page) {
  try {
    const accept = page.getByRole("button", { name: /aceptar/i });
    if (await accept.count()) {
      await accept.first().click({ timeout: 3000 });
      await page.waitForTimeout(800);
    }
  } catch {
    /* ignore */
  }
}

async function main() {
  const browser = await chromium.launch({
    executablePath: edge,
    headless: true,
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(6000);
  await dismissCookies(page);
  await page.waitForTimeout(2500);

  await page.locator("text=HABITACIONES").first().click({ timeout: 10000 });
  await page.waitForTimeout(800);
  const all = page.getByText(/todas las habitaciones/i).first();
  if (await all.isVisible().catch(() => false)) {
    await all.click();
  }
  await page.waitForTimeout(7000);
  await dismissCookies(page);
  await page.keyboard.press("Escape").catch(() => {});
  await page.waitForTimeout(1000);

  // Land on the first room card, not the footer
  await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 0.9)));
  await page.waitForTimeout(5000);

  // Try to force lazy images near viewport
  await page.evaluate(() => {
    document.querySelectorAll("img").forEach((img) => {
      if ("loading" in img) img.loading = "eager";
    });
  });
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: path.join(outDir, "detail.png"),
    type: "png",
  });
  console.log("detail.png ok");
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
