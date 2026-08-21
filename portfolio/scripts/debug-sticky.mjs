import { chromium } from "playwright-core";

const edge =
  "C:\\\\Program Files (x86)\\\\Microsoft\\\\Edge\\\\Application\\\\msedge.exe";
const url = "https://www.hotelmarquesdelvalle.com.mx/";

async function main() {
  const browser = await chromium.launch({ executablePath: edge, headless: true });
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(8000);
  try {
    await page.getByRole("button", { name: /aceptar/i }).click({ timeout: 3000 });
  } catch {}
  await page.waitForTimeout(2000);

  const info = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")].map((b, i) => {
      const r = b.getBoundingClientRect();
      return {
        i,
        text: (b.textContent || "").trim().slice(0, 40),
        html: b.innerHTML.slice(0, 120),
        x: Math.round(r.left),
        y: Math.round(r.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
      };
    });
    const titles = [...document.querySelectorAll("body *")]
      .filter((el) => (el.textContent || "").replace(/\s+/g, " ").trim().includes("RESERVAR AHORA"))
      .slice(0, 8)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName,
          t: (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60),
          kids: el.children.length,
          x: Math.round(r.left),
          y: Math.round(r.top),
          w: Math.round(r.width),
          h: Math.round(r.height),
        };
      });
    return { buttons: buttons.filter((b) => b.y < 400 && b.w > 0), titles };
  });

  console.log(JSON.stringify(info, null, 2));

  // Try clicking each small button in sticky zone
  for (const b of info.buttons.filter((b) => b.w <= 60 && b.h <= 60 && b.y > 40)) {
    console.log("clicking", b);
    await page.evaluate((i) => {
      document.querySelectorAll("button")[i]?.click();
    }, b.i);
    await page.waitForTimeout(800);
    const open = await page.evaluate(() =>
      /LLEGADA/.test(document.body.innerText) &&
      [...document.querySelectorAll("body *")].some((el) => {
        const t = (el.textContent || "").trim();
        if (t !== "LLEGADA") return false;
        const r = el.getBoundingClientRect();
        return r.top > 50 && r.top < 400 && r.height > 5;
      }),
    );
    console.log("  after click open=", open);
    if (!open) {
      console.log("SUCCESS with button", b.i);
      break;
    }
  }

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
