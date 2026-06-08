import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectsPath = resolve(process.cwd(), "client/src/data/projects.ts");
const raw = readFileSync(projectsPath, "utf8");

const lengthMatch = raw.match(/Array\.from\(\{\s*length:\s*(\d+)/);
const projectCount = lengthMatch ? Number(lengthMatch[1]) : 0;

const slugs = [...raw.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

const missing = slugs.filter((slug) => !slug.trim());
const dupes = [];
const seen = new Set();

for (const slug of slugs) {
  const normalized = slug.trim();
  if (seen.has(normalized)) dupes.push(normalized);
  seen.add(normalized);
}

if (projectCount !== slugs.length || missing.length || dupes.length) {
  console.error("Slug validation failed");
  if (projectCount !== slugs.length) {
    console.error(
      `Expected ${projectCount} slugs, found ${slugs.length} (check projects.ts)`,
    );
  }
  if (missing.length) console.error("Empty slugs detected");
  if (dupes.length) console.error("Duplicate slugs:", [...new Set(dupes)]);
  process.exit(1);
}

console.log(`Slug validation passed for ${slugs.length} projects.`);
