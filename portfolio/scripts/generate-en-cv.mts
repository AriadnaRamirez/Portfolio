/**
 * Generates the English CV PDF from resumeContentCompact EN copy
 * into public/cv/AriadnaRamirez_CV_2026_ENG.pdf
 */
import { pdf } from "@react-pdf/renderer";
import React from "react";
import fs from "fs";
import path from "path";
import { HarvardResumePdf } from "../src/app/components/resume/HarvardResumePdf.tsx";
import { resumeLabels } from "../src/app/components/resume/resumeLabels.ts";
import { translations } from "../src/app/components/lib/translations.ts";
import { buildResume } from "../src/app/lib/resume.ts";

const lang = "en" as const;
const t = translations[lang];
const resume = buildResume(lang, t, "compact");
const labels = resumeLabels(t, "compact");
const instance = pdf(React.createElement(HarvardResumePdf, { resume, labels }));
const stream = await instance.toBuffer();
const chunks: Buffer[] = [];
for await (const chunk of stream as AsyncIterable<Buffer>) {
  chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
}
const buf = Buffer.concat(chunks);
const out = path.join("public", "cv", "AriadnaRamirez_CV_2026_ENG.pdf");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, buf);
const s = buf.toString("latin1");
const pages = (s.match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log(`Wrote ${out} (${buf.length} bytes, ${pages} pages)`);
