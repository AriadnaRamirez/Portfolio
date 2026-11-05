import { chromium } from "playwright-core";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/projects/aws");
const base = "https://aws-practitioner-study-lab.vercel.app";
const edge =
  process.env.EDGE_PATH ||
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const email = process.env.AWS_EMAIL;
const password = process.env.AWS_PASSWORD;
if (!email || !password) {
  console.error("AWS_EMAIL and AWS_PASSWORD are required");
  process.exit(1);
}

async function pause(page, ms = 900) {
  await page.waitForTimeout(ms);
}

async function skipTour(page) {
  const skip = page.getByRole("button", { name: /^saltar$/i });
  if (await skip.count()) {
    await skip.first().click({ timeout: 4000 }).catch(() => {});
    await pause(page, 400);
  }
}

async function login(page) {
  await page.goto(`${base}/login`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.getByLabel(/correo|usuario/i).fill(email);
  await page.getByLabel(/^contraseña$/i).fill(password);
  await page.getByRole("button", { name: /^entrar$/i }).click();
  await page.waitForURL(/\/(dashboard|estudiar)/, { timeout: 60000 });
  await skipTour(page);
  await pause(page, 600);
}

async function shoot(page, file) {
  await page.screenshot({ path: path.join(outDir, file), type: "png" });
  console.log(file);
}

function choice(page) {
  return page.getByRole("button", { name: /^A\b/ });
}

async function answerOnce(page) {
  const option = choice(page);
  if (!(await option.count())) return false;
  await option.first().click();
  await page.getByRole("button", { name: /siguiente/i }).waitFor({ timeout: 25000 }).catch(() => {});
  await pause(page, 600);
  return true;
}

async function finishSession(page) {
  for (let i = 0; i < 24; i += 1) {
    if (await page.getByRole("button", { name: /iniciar partida/i }).count()) return;
    const next = page.getByRole("button", { name: /siguiente/i });
    if (await next.count()) {
      await next.first().click();
      await pause(page, 700);
      continue;
    }
    if (await answerOnce(page)) continue;
    const done = page.getByRole("link", { name: /inicio|estudiar|nueva partida/i });
    if (await done.count()) {
      await done.first().click();
      await pause(page, 800);
    } else {
      break;
    }
  }
}

async function openCrossword(page) {
  await page.goto(`${base}/minijuegos`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.getByRole("button", { name: /Servicios de cómputo/i }).first().waitFor({ timeout: 30000 });
  await page.getByRole("button", { name: /Servicios de cómputo/i }).first().click();
  await page.getByRole("heading", { name: "Crucigrama" }).waitFor({ timeout: 15000 });
  await pause(page, 700);
}

async function captureLoggedIn(page, prefix) {
  await page.goto(`${base}/dashboard`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await skipTour(page);
  await pause(page, 1200);

  const resume = page.getByRole("link", { name: /continuar partida/i });
  if (await resume.count()) {
    await resume.first().click();
    await choice(page).first().waitFor({ timeout: 30000 });
    await pause(page, 500);
    await shoot(page, `${prefix}-3.png`);
    await answerOnce(page);
    await shoot(page, `${prefix}-4.png`);
    await finishSession(page);
  }

  await page.goto(`${base}/estudiar`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.getByRole("button", { name: /iniciar partida/i }).waitFor({ timeout: 30000 });
  await pause(page, 900);
  await shoot(page, `${prefix}-2.png`);

  if (!(await import("node:fs").then((fs) => fs.existsSync(path.join(outDir, `${prefix}-3.png`))))) {
    await page.getByRole("button", { name: /iniciar partida/i }).click();
    await choice(page).first().waitFor({ timeout: 30000 });
    await pause(page, 500);
    await shoot(page, `${prefix}-3.png`);
    await answerOnce(page);
    await shoot(page, `${prefix}-4.png`);
    await finishSession(page);
  }

  await page.goto(`${base}/guias`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.getByRole("link", { name: /descargar pdf/i }).first().waitFor({ timeout: 30000 });
  await pause(page, 800);
  await shoot(page, `${prefix}-5.png`);

  await openCrossword(page);
  await shoot(page, `${prefix}-6.png`);
}

async function toWebp(kind, n) {
  const src = path.join(outDir, `${kind}-${n}.png`);
  const dest = path.join(outDir, `${kind}-${n}.webp`);
  const smDir = path.join(outDir, "sm");
  const thumbDir = path.join(outDir, "thumbs");
  const phone = kind === "mobile";
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  await sharp(src).resize({ width: phone ? 300 : 840 }).webp({ quality: 78 }).toFile(path.join(smDir, `${kind}-${n}.webp`));
  if (!phone) {
    await sharp(src).resize({ width: 240 }).webp({ quality: 74 }).toFile(path.join(thumbDir, `${kind}-${n}.webp`));
  }
}

async function main() {
  const fs = await import("node:fs/promises");
  await fs.mkdir(path.join(outDir, "sm"), { recursive: true });
  await fs.mkdir(path.join(outDir, "thumbs"), { recursive: true });

  const browser = await chromium.launch({ executablePath: edge, headless: true });

  if (process.env.MOBILE_ONLY === "1") {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await login(page);
    await page.goto(`${base}/estudiar`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.getByRole("heading", { name: /arma tu partida|estudiar/i }).first().waitFor({ timeout: 30000 });
    await pause(page, 1200);
    await shoot(page, "mobile-2.png");
    await page.goto(`${base}/guias`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.getByRole("link", { name: /descargar pdf|ver guía/i }).first().waitFor({ timeout: 30000 });
    await pause(page, 800);
    await shoot(page, "mobile-5.png");
    await openCrossword(page);
    await shoot(page, "mobile-6.png");
    await page.close();
    await browser.close();
    for (const kind of ["desktop", "mobile"]) {
      for (let n = 1; n <= 6; n += 1) await toWebp(kind, n);
    }
    console.log("webp ok");
    return;
  }

  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.goto(base, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.getByRole("link", { name: /probar sin cuenta/i }).waitFor({ timeout: 20000 });
    await pause(page, 1200);
    await shoot(page, "desktop-1.png");
    await page.close();
  }

  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await page.goto(base, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.getByRole("link", { name: /probar sin cuenta/i }).waitFor({ timeout: 20000 });
    await pause(page, 1200);
    await shoot(page, "mobile-1.png");
    await page.close();
  }

  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await login(page);
    await captureLoggedIn(page, "desktop");
    await page.close();
  }

  {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await login(page);
    await captureLoggedIn(page, "mobile");
    await page.close();
  }

  await browser.close();

  for (const kind of ["desktop", "mobile"]) {
    for (let n = 1; n <= 6; n += 1) {
      await toWebp(kind, n);
    }
  }
  console.log("webp ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
