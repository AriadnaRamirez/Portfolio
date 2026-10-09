import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../..");
const outDir = path.join(root, "linkedin-capturas");
const rawDir = path.join(outDir, "_raw");
const base = "http://localhost:3000";

const shots = [
  { id: "01-inicio", path: "/", section: null, url: "ariadnaramirez.github.io/Portfolio" },
  { id: "02-proyectos", path: "/", section: "#work", url: "ariadnaramirez.github.io/Portfolio" },
  { id: "03-servicios", path: "/", section: "#services", url: "ariadnaramirez.github.io/Portfolio" },
  { id: "04-sobre-mi", path: "/", section: "#about", url: "ariadnaramirez.github.io/Portfolio" },
  { id: "05-caso-crm", path: "/work/crm/", section: null, url: "ariadnaramirez.github.io/Portfolio/work/crm/" },
];

const edgeCandidates = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];

function browserPath() {
  const found = edgeCandidates.find((p) => fs.existsSync(p));
  if (!found) throw new Error("No se encontró Edge ni Chrome");
  return found;
}

const settleCss = `
  nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog-overlay] { display: none !important; }
  .hero-rise { animation: none !important; opacity: 1 !important; transform: none !important; }
  .hero-clip { animation: none !important; clip-path: none !important; transform: none !important; }
  .gallery-rise { animation: none !important; opacity: 1 !important; transform: none !important; }
`;

async function prep(page, { hideNav }) {
  await page.addStyleTag({ content: settleCss + (hideNav ? ".floating-nav { display: none !important; }" : "") });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(350);
}

async function frame(page, shot) {
  await page.evaluate((spec) => {
    window.scrollTo(0, 0);
    if (spec.mobile === "photo") {
      const fig = document.querySelector("figure");
      if (!fig) return;
      const top = fig.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, Math.max(0, top - window.innerHeight * 0.18));
      return;
    }
    if (!spec.section) return;
    const el = document.querySelector(spec.section);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 12;
    window.scrollTo(0, Math.max(0, top));
  }, { section: shot.section, mobile: shot.mobile && page.viewportSize().width < 500 ? shot.mobile : null });
  await page.waitForTimeout(250);
}

async function capturePair(browser, shot) {
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
    locale: "es-MX",
  });
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    colorScheme: "light",
    locale: "es-MX",
    isMobile: true,
    hasTouch: true,
  });

  const deskPage = await desktop.newPage();
  const mobPage = await mobile.newPage();
  await deskPage.goto(base + shot.path, { waitUntil: "domcontentloaded", timeout: 30000 });
  await mobPage.goto(base + shot.path, { waitUntil: "domcontentloaded", timeout: 30000 });
  await deskPage.waitForSelector("header", { timeout: 15000 });
  await mobPage.waitForSelector("header", { timeout: 15000 });
  await prep(deskPage, { hideNav: true });
  await prep(mobPage, { hideNav: false });
  await frame(deskPage, { ...shot, mobile: null });
  await frame(mobPage, shot);

  const deskFile = path.join(rawDir, `${shot.id}-desktop.png`);
  const mobFile = path.join(rawDir, `${shot.id}-mobile.png`);
  await deskPage.screenshot({ path: deskFile });
  await mobPage.screenshot({ path: mobFile });
  await desktop.close();
  await mobile.close();
  return { deskFile, mobFile };
}

function compositeHtml(shot, deskFile, mobFile) {
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
    max-width: 62%;
    background: #fafaf9;
    color: #6b6b6b;
    border-radius: 999px;
    padding: 5px 16px;
    font-size: 14px;
    letter-spacing: 0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
        <div class="url">${shot.url}</div>
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

const browser = await chromium.launch({ executablePath: browserPath(), headless: true });
fs.mkdirSync(rawDir, { recursive: true });

const board = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const boardPage = await board.newPage();

for (const shot of shots) {
  const { deskFile, mobFile } = await capturePair(browser, shot);
  const htmlPath = path.join(rawDir, `${shot.id}.html`);
  fs.writeFileSync(htmlPath, compositeHtml(shot, deskFile, mobFile));
  await boardPage.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await boardPage.waitForTimeout(200);
  const out = path.join(outDir, `${shot.id}.png`);
  await boardPage.screenshot({ path: out });
  console.log("ok", out);
}

await browser.close();
fs.rmSync(rawDir, { recursive: true, force: true });
