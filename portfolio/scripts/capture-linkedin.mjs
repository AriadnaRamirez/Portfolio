import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../../linkedin-capturas");
const rawDir = path.join(outDir, "_raw");
const base = "http://localhost:3000";
const displayUrl = "ariadnaramirez.github.io/Portfolio";

const project = (n) => `#work .mt-10 > article:nth-child(${n})`;

/* `offset` is how far above the target the viewport stops (positive = more space above). */
const shots = [
  { id: "01-presentacion", target: null },
  { id: "02-proyecto-crm", target: project(1), offset: { desktop: 72, mobile: 84 } },
  { id: "03-proyecto-hotel", target: project(2), offset: { desktop: 72, mobile: 84 } },
  { id: "04-proyecto-ccst", target: project(3), offset: { desktop: 72, mobile: 84 } },
  { id: "05-proyecto-senda", target: project(4), offset: { desktop: 72, mobile: 84 } },
  { id: "06-proyecto-serviyapp", target: project(5), offset: { desktop: 72, mobile: 84 } },
  { id: "07-stack", target: "#skills h2", offset: { desktop: 130, mobile: 120 } },
];

const devices = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
};

const candidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];
const executablePath = candidates.find((p) => fs.existsSync(p));
if (!executablePath) throw new Error("No se encontró Edge ni Chrome");

fs.mkdirSync(rawDir, { recursive: true });
for (const file of fs.readdirSync(outDir)) {
  if (file.endsWith(".png")) fs.rmSync(path.join(outDir, file));
}

const browser = await chromium.launch({ executablePath, headless: true });

async function captureDevice(kind) {
  const context = await browser.newContext({
    ...devices[kind],
    deviceScaleFactor: 2,
    colorScheme: "light",
    locale: "es-MX",
  });
  const page = await context.newPage();
  await page.goto(base + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector("header", { timeout: 15000 });
  // The Next.js dev badge only exists on localhost, never on the published site.
  await page.addStyleTag({ content: "nextjs-portal { display: none !important; }" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(1500);

  for (const shot of shots) {
    if (shot.target) {
      // Walk down the page like a visitor so scroll-triggered reveals play.
      await page.evaluate(
        async ({ target, offset }) => {
          const el = document.querySelector(target);
          if (!el) throw new Error(`Missing ${target}`);
          // Sections above render lazily and grow while scrolling, so re-measure every step.
          const goal = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
          for (let i = 0; i < 200 && Math.abs(window.scrollY - goal()) > 4; i++) {
            const g = goal();
            window.scrollBy(0, Math.sign(g - window.scrollY) * Math.min(400, Math.abs(g - window.scrollY)));
            await new Promise((r) => setTimeout(r, 60));
          }
          await new Promise((r) => setTimeout(r, 400));
          window.scrollTo(0, goal());
        },
        { target: shot.target, offset: shot.offset[kind] },
      );
    } else {
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(rawDir, `${shot.id}-${kind}.png`) });
  }
  await context.close();
}

function compositeHtml(deskFile, mobFile) {
  const desk = pathToFileURL(deskFile).href;
  const mob = pathToFileURL(mobFile).href;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1920px; height: 1080px; overflow: hidden; }
  body {
    background:
      radial-gradient(820px 480px at 12% 0%, rgba(165,123,255,0.18), transparent 70%),
      radial-gradient(760px 480px at 100% 100%, rgba(249,139,92,0.18), transparent 68%),
      #fafaf9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ui-sans-serif, "Segoe UI", sans-serif;
  }
  .stage { position: relative; width: 1570px; height: 980px; }
  .browser {
    position: absolute;
    left: 0;
    top: 20px;
    width: 1360px;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 30px 60px -30px rgba(20,20,40,0.35);
  }
  .chrome {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 52px;
    padding: 0 16px;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
  }
  .dots { display: flex; gap: 7px; }
  .dots i { width: 11px; height: 11px; border-radius: 50%; background: #e6e6e6; display: block; }
  .url {
    margin: 0 auto;
    background: #fafaf9;
    color: #6b6b6b;
    border-radius: 999px;
    padding: 5px 16px;
    font-size: 14px;
    letter-spacing: 0.01em;
    white-space: nowrap;
  }
  .spacer { width: 46px; }
  .screen { height: 850px; background: #fafaf9; }
  .screen img, .phone-screen img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
  .phone {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 280px;
    background: #242424;
    border-radius: 32px;
    padding: 8px;
    box-shadow: 0 24px 40px -20px rgba(20,20,40,0.5);
  }
  .phone-screen {
    height: 574px;
    border-radius: 24px;
    overflow: hidden;
    background: #fafaf9;
  }
</style>
</head>
<body>
  <div class="stage">
    <div class="browser">
      <div class="chrome">
        <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <div class="url">${displayUrl}</div>
        <span class="spacer"></span>
      </div>
      <div class="screen"><img src="${desk}" alt="" /></div>
    </div>
    <div class="phone">
      <div class="phone-screen"><img src="${mob}" alt="" /></div>
    </div>
  </div>
</body>
</html>`;
}

await captureDevice("desktop");
await captureDevice("mobile");

const board = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
const boardPage = await board.newPage();
for (const shot of shots) {
  const htmlPath = path.join(rawDir, `${shot.id}.html`);
  fs.writeFileSync(
    htmlPath,
    compositeHtml(path.join(rawDir, `${shot.id}-desktop.png`), path.join(rawDir, `${shot.id}-mobile.png`)),
  );
  await boardPage.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await boardPage.waitForTimeout(200);
  const out = path.join(outDir, `${shot.id}.png`);
  await boardPage.screenshot({ path: out });
  console.log("ok", out);
}

await browser.close();
fs.rmSync(rawDir, { recursive: true, force: true });
