/**
 * Generates both CV PDFs (ES + EN) from resumeContentCompact into public/cv/,
 * the same files the /resume page previews and the download button serves.
 */
import { pdf } from "@react-pdf/renderer";
import React from "react";
import fs from "fs";
import path from "path";
import { HarvardResumePdf } from "../src/app/components/resume/HarvardResumePdf.tsx";
import { resumeLabels } from "../src/app/components/resume/resumeLabels.ts";
import { translations } from "../src/app/components/lib/translations.ts";
import { buildResume } from "../src/app/lib/resume.ts";
import { resumePdfFiles } from "../src/app/lib/resumePdf.ts";

for (const lang of ["es", "en"] as const) {
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
  const out = path.join("public", "cv", resumePdfFiles[lang].filename);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  const pages = (buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`Wrote ${out} (${buf.length} bytes, ${pages} pages)`);
}
