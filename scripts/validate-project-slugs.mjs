import { readFileSync, readdirSync } from "node:fs";
import { resolve, basename } from "node:path";

// Checks that client/src/data/order.ts and client/src/data/projects/*.ts agree:
// one file per project, file name === slug, every ORDER slug has a file,
// every file is listed in ORDER, and no slug appears twice.

const dataDir = resolve(process.cwd(), "client/src/data");
const projectsDir = resolve(dataDir, "projects");

const orderSource = readFileSync(resolve(dataDir, "order.ts"), "utf8");
const orderBody = orderSource.match(/ORDER[^=]*=\s*\[([\s\S]*?)\]/);
const order = orderBody
  ? [...orderBody[1].matchAll(/"([^"]*)"/g)].map((m) => m[1])
  : [];

const files = readdirSync(projectsDir).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts",
);

const errors = [];
const fileSlugs = new Map(); // slug -> file

for (const file of files) {
  const source = readFileSync(resolve(projectsDir, file), "utf8");
  const slugs = [...source.matchAll(/^\s*slug:\s*"([^"]*)"/gm)].map((m) => m[1]);
  if (slugs.length !== 1) {
    errors.push(`${file}: expected exactly one slug, found ${slugs.length}`);
    continue;
  }
  const slug = slugs[0].trim();
  if (!slug) errors.push(`${file}: empty slug`);
  if (basename(file, ".ts") !== slug)
    errors.push(`${file}: file name does not match slug "${slug}"`);
  if (fileSlugs.has(slug))
    errors.push(`Duplicate slug "${slug}" in ${fileSlugs.get(slug)} and ${file}`);
  fileSlugs.set(slug, file);
}

if (!order.length) errors.push("order.ts: could not read ORDER");

const seen = new Set();
for (const slug of order) {
  if (seen.has(slug)) errors.push(`order.ts: "${slug}" listed twice`);
  seen.add(slug);
  if (!fileSlugs.has(slug)) errors.push(`order.ts: "${slug}" has no project file`);
}
for (const slug of fileSlugs.keys()) {
  if (!seen.has(slug)) errors.push(`projects/${slug}.ts is not listed in ORDER`);
}

if (errors.length) {
  console.error("Slug validation failed");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Slug validation passed for ${order.length} projects.`);
