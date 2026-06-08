# Works Routing (Vite) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship canonical works routes (`/works` and `/works/:project_name`) while keeping the current portfolio visual style and tools routes unchanged.

**Architecture:** Keep Vite + React Router. Promote project detail from modal-first navigation to route-first navigation by extracting reusable detail rendering from `ProjectDetailModal` into a shared component used by a new `WorkDetailPage`. Keep `/works` as a real route that renders the same app shell and scrolls to the Works section.

**Tech Stack:** React, TypeScript, Vite, React Router DOM, existing Tailwind/CSS classes

---

## File Structure

- Create: `client/src/pages/WorksPage.tsx` (route wrapper that renders app shell and auto-scrolls to Works)
- Create: `client/src/pages/WorkDetailPage.tsx` (slug-resolved full-page project detail)
- Create: `client/src/components/project-detail/ProjectDetailContent.tsx` (shared detail presentation component)
- Create: `client/src/data/projects-helpers.ts` (`getProjectBySlug`, `getRouteableProjects`, slug guards)
- Create: `scripts/validate-project-slugs.mjs` (fast data validation script)
- Modify: `client/src/main.tsx` (route table)
- Modify: `client/src/App.tsx` (route-aware behavior for `/` and `/works`)
- Modify: `client/src/components/TrayView.tsx` (navigate to route instead of modal open)
- Modify: `client/src/components/GridView.tsx` (navigate to route instead of modal open)
- Modify: `client/src/components/ProjectDetailModal.tsx` (reuse shared `ProjectDetailContent`; legacy compatibility)
- Modify: `client/src/data/projects.ts` (ensure slug consistency for routeable projects)

---

### Task 1: Add slug validation safety net

**Files:**
- Create: `scripts/validate-project-slugs.mjs`
- Modify: `package.json`
- Test: `scripts/validate-project-slugs.mjs` (CLI run)

- [ ] **Step 1: Write the failing validation script**

```js
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectsPath = resolve(process.cwd(), "server/src/db/projects.json");
const raw = readFileSync(projectsPath, "utf8");
const projects = JSON.parse(raw);

const routeable = projects.filter((p) => p.type === "special");
const missing = routeable.filter((p) => !p.slug || !String(p.slug).trim());
const dupes = [];
const seen = new Set();
for (const p of routeable) {
  const slug = String(p.slug || "").trim();
  if (seen.has(slug)) dupes.push(slug);
  seen.add(slug);
}

if (missing.length || dupes.length) {
  console.error("Slug validation failed");
  if (missing.length) console.error("Missing slugs:", missing.map((p) => p.id));
  if (dupes.length) console.error("Duplicate slugs:", [...new Set(dupes)]);
  process.exit(1);
}

console.log(`Slug validation passed for ${routeable.length} routeable projects.`);
```

- [ ] **Step 2: Add npm script and run to verify current state**

Run: `npm run validate:slugs`  
Expected: If data has collisions/missing slugs, command exits non-zero with project IDs/slugs listed.

```json
{
  "scripts": {
    "validate:slugs": "node scripts/validate-project-slugs.mjs"
  }
}
```

- [ ] **Step 3: Fix any slug issues in project data**

```ts
// Example correction pattern in client/src/data/projects.ts
{
  id: 3,
  slug: "unicef-geosight", // ensure stable, unique, non-empty
  // ...
}
```

- [ ] **Step 4: Re-run validation to verify pass**

Run: `npm run validate:slugs`  
Expected: `Slug validation passed for <N> routeable projects.`

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/validate-project-slugs.mjs client/src/data/projects.ts
git commit -m "chore: add slug validation for works routes"
```

---

### Task 2: Add project lookup helpers

**Files:**
- Create: `client/src/data/projects-helpers.ts`
- Modify: `client/src/data/projects.ts`
- Test: `npm run build`

- [ ] **Step 1: Write helper module**

```ts
import { initialProjects, type ProjectItem } from "./projects";

export function getRouteableProjects(items: ProjectItem[] = initialProjects): ProjectItem[] {
  return items.filter((item) => item.type === "special" && !!item.slug);
}

export function getProjectBySlug(
  slug: string,
  items: ProjectItem[] = initialProjects,
): ProjectItem | null {
  const normalized = slug.trim().toLowerCase();
  return (
    getRouteableProjects(items).find(
      (item) => String(item.slug).trim().toLowerCase() === normalized,
    ) ?? null
  );
}
```

- [ ] **Step 2: Export any missing types/fields needed by route layer**

```ts
export interface ProjectItem {
  id: number;
  slug: string;
  // existing fields...
}
```

- [ ] **Step 3: Run build to verify type and import integrity**

Run: `npm run build`  
Expected: Vite build completes with no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add client/src/data/projects.ts client/src/data/projects-helpers.ts
git commit -m "feat: add reusable project lookup helpers"
```

---

### Task 3: Extract shared detail presentation from modal

**Files:**
- Create: `client/src/components/project-detail/ProjectDetailContent.tsx`
- Modify: `client/src/components/ProjectDetailModal.tsx`
- Test: `npm run build`

- [ ] **Step 1: Create shared presentational component skeleton**

```tsx
import React from "react";
import type { ProjectItem } from "../../data/projects";

interface ProjectDetailContentProps {
  project: ProjectItem;
  isAdmin: boolean;
  onUpdate: (updated: ProjectItem) => void;
}

export function ProjectDetailContent({
  project,
  isAdmin,
  onUpdate,
}: ProjectDetailContentProps) {
  return (
    <section className="w-full">
      <h1>{project.title}</h1>
      <p>{project.role}</p>
      <p>{project.description}</p>
      {/* Keep the current media/embed block logic exactly as implemented today */}
    </section>
  );
}
```

- [ ] **Step 2: Move existing markup/logic from modal body into shared component**

```tsx
// In ProjectDetailModal.tsx
import { ProjectDetailContent } from "./project-detail/ProjectDetailContent";

// Replace large body section with:
<ProjectDetailContent
  project={formData}
  isAdmin={isAdmin}
  onUpdate={(next) => {
    setFormData(next);
    onUpdate(next);
  }}
/>
```

- [ ] **Step 3: Keep modal-only chrome in modal file**

```tsx
return (
  <div className="fixed inset-0 z-50">
    <button onClick={onClose} aria-label="Close">X</button>
    <ProjectDetailContent project={formData} isAdmin={isAdmin} onUpdate={handleUpdate} />
    <button onClick={onPrev}>Prev</button>
    <button onClick={onNext}>Next</button>
  </div>
);
```

- [ ] **Step 4: Run build for regression confidence**

Run: `npm run build`  
Expected: Build passes; modal still renders existing detail UI.

- [ ] **Step 5: Commit**

```bash
git add client/src/components/ProjectDetailModal.tsx client/src/components/project-detail/ProjectDetailContent.tsx
git commit -m "refactor: extract shared project detail content renderer"
```

---

### Task 4: Add works routes and route pages

**Files:**
- Create: `client/src/pages/WorksPage.tsx`
- Create: `client/src/pages/WorkDetailPage.tsx`
- Modify: `client/src/main.tsx`
- Test: `npm run build`

- [ ] **Step 1: Create `/works` page wrapper with scroll-to-works behavior**

```tsx
import React, { useEffect } from "react";
import App from "../App";

export function WorksPage() {
  useEffect(() => {
    requestAnimationFrame(() => {
      const target = document.getElementById("works-section");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return <App initialSection="works" />;
}
```

- [ ] **Step 2: Create `/works/:project_name` detail page**

```tsx
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects-helpers";
import { ProjectDetailContent } from "../components/project-detail/ProjectDetailContent";

export function WorkDetailPage() {
  const { project_name = "" } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(project_name);

  if (!project) {
    return (
      <main className="min-h-dvh flex items-center justify-center">
        <div>
          <p>Project unavailable.</p>
          <Link to="/works">Back to Works</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh">
      <button onClick={() => navigate("/works")} aria-label="Close project">
        X
      </button>
      <ProjectDetailContent project={project} isAdmin={false} onUpdate={() => {}} />
    </main>
  );
}
```

- [ ] **Step 3: Wire routes in `main.tsx`**

```tsx
<Routes>
  <Route path="/" element={<App />} />
  <Route path="/works" element={<WorksPage />} />
  <Route path="/works/:project_name" element={<WorkDetailPage />} />
  <Route path="/tools" element={<ToolsIndexPage />} />
  <Route path="/tools/:name/:id" element={<ToolDetailPage />} />
  <Route path="/tools/runtime/:slug" element={<ToolRuntimePage />} />
</Routes>
```

- [ ] **Step 4: Run build to verify route compile**

Run: `npm run build`  
Expected: Route build passes; no unresolved imports.

- [ ] **Step 5: Commit**

```bash
git add client/src/main.tsx client/src/pages/WorksPage.tsx client/src/pages/WorkDetailPage.tsx
git commit -m "feat: add canonical works routes and detail page"
```

---

### Task 5: Route project card clicks to `/works/:project_name`

**Files:**
- Modify: `client/src/App.tsx`
- Modify: `client/src/components/TrayView.tsx`
- Modify: `client/src/components/GridView.tsx`
- Test: `npm run build`

- [ ] **Step 1: Replace modal-open callback usage with route navigation callback**

```tsx
// App.tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const openProjectRoute = (slug: string) => navigate(`/works/${slug}`);
```

- [ ] **Step 2: Update TrayView interaction**

```tsx
// TrayView.tsx props
onSelectProjectBySlug: (slug: string) => void;

// click handler
if (item.slug) onSelectProjectBySlug(item.slug);
```

- [ ] **Step 3: Update GridView interaction**

```tsx
// GridView.tsx props
onSelectProjectBySlug: (slug: string) => void;

// click handler
if (item.slug) onSelectProjectBySlug(item.slug);
```

- [ ] **Step 4: Keep modal state only where needed**

```tsx
const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

// Keep modal rendering only for admin editing or explicit non-route flow.
const shouldShowLegacyModal = isLoggedIn && !!selectedProject;

{shouldShowLegacyModal && (
  <ProjectDetailModal
    project={selectedProject}
    isOpen
    onClose={() => setSelectedProject(null)}
    isAdmin={isLoggedIn}
    onUpdate={handleUpdateProject}
    onNext={handleNextProject}
    onPrev={handlePrevProject}
  />
)}
```

- [ ] **Step 5: Run build**

Run: `npm run build`  
Expected: Build passes with updated prop signatures.

- [ ] **Step 6: Commit**

```bash
git add client/src/App.tsx client/src/components/TrayView.tsx client/src/components/GridView.tsx
git commit -m "feat: navigate works cards to route-based project pages"
```

---

### Task 6: Final verification and docs touch-up

**Files:**
- Modify: `Portfolio/README.md` (route docs, if needed)
- Test: build + manual route checks

- [ ] **Step 1: Build once in clean state**

Run: `npm run build`  
Expected: Successful production build.

- [ ] **Step 2: Run manual route verification checklist**

Run: `npm run dev`  
Expected checks:
- `http://localhost:5173/works` scrolls to Works section
- Clicking a project opens `http://localhost:5173/works/<slug>`
- `X` returns to `http://localhost:5173/works`
- Invalid slug shows fallback and Back to Works action
- `/tools`, `/tools/:name/:id`, `/tools/runtime/:slug` still function

- [ ] **Step 3: Update README route section**

```md
## Routes
- `/` Home
- `/works` Works section route
- `/works/:project_name` Work detail
- `/tools` Tools index
- `/tools/:name/:id` Tool detail
- `/tools/runtime/:slug` Raw tool runtime
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add canonical works route contract"
```

