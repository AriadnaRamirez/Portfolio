// Static export writes RSC segment payloads as nested folders
// (work/crm/__next.work/crm/__PAGE__.txt) while the client router requests
// dot-joined names (work/crm/__next.work.crm.__PAGE__.txt). Copy each nested
// payload to the flat name so client navigation doesn't 404 on static hosts.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const outDir = path.resolve("out");
let copied = 0;

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    return statSync(full).isDirectory() ? filesUnder(full) : [full];
  });
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const rel = path.relative(full, file).split(path.sep).join(".");
        const target = path.join(dir, `${name}.${rel}`);
        if (!existsSync(target)) {
          copyFileSync(file, target);
          copied++;
        }
      }
    } else if (name !== "_next") {
      walk(full);
    }
  }
}

if (existsSync(outDir)) {
  walk(outDir);
  console.log(`fix-rsc-export: ${copied} segment file(s) flattened`);
}
