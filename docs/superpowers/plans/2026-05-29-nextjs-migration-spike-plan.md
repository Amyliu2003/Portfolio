# Next.js Migration Spike Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Validate a safe, parity-first migration path from the current Vite portfolio to Next.js App Router on an isolated branch, without disrupting production delivery.

**Architecture:** Build a parallel Next.js spike that mirrors the route contract already established in Vite (`/`, `/works`, `/works/:project_name`, `/tools*`). Reuse existing data contracts and incrementally wrap interactive components as client components. Optimize only after behavior parity is proven.

**Tech Stack:** Next.js (App Router), React, TypeScript, existing portfolio components/data

---

## File Structure

- Create (spike branch): `next.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/works/page.tsx`
- Create: `app/works/[project_name]/page.tsx`
- Create: `app/tools/page.tsx`
- Create: `app/tools/[name]/[id]/page.tsx`
- Create: `app/tools/runtime/[slug]/page.tsx`
- Create: `app/globals.css` (mapped from existing CSS entry points)
- Create: `lib/projects.ts` (project lookup helpers, parity with Vite helpers)
- Modify: `package.json` (Next scripts on spike branch only)
- Modify: `tsconfig.json` (Next plugin + config compatibility)

---

### Task 1: Prepare isolated spike branch and baseline

**Files:**
- Modify: Git branch state only
- Test: `git status`, `npm run build` (current Vite baseline)

- [ ] **Step 1: Create migration spike branch**

Run: `git checkout -b next-migration-spike`  
Expected: Branch switches successfully.

- [ ] **Step 2: Capture Vite baseline build before migration**

Run: `npm run build`  
Expected: Current app builds successfully; keep output for parity comparison.

- [ ] **Step 3: Commit branch bootstrap marker**

```bash
git commit --allow-empty -m "chore: start isolated nextjs migration spike"
```

---

### Task 2: Install Next.js and scaffold app shell

**Files:**
- Modify: `package.json`
- Create: `next.config.mjs`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Modify: `tsconfig.json`
- Test: `npm run dev`

- [ ] **Step 1: Add Next.js dependencies and scripts**

```json
{
  "dependencies": {
    "next": "latest",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

- [ ] **Step 2: Add baseline Next config**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 3: Add app shell files**

```tsx
// app/layout.tsx
import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx
import React from "react";
import AppShell from "../client/src/App";

export default function HomePage() {
  return <AppShell />;
}
```

- [ ] **Step 4: Update TypeScript config for Next**

```json
{
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "jsx": "preserve"
  }
}
```

- [ ] **Step 5: Run dev server to verify shell boots**

Run: `npm run dev`  
Expected: Next app serves `/` without immediate runtime crash.

- [ ] **Step 6: Commit**

```bash
git add package.json next.config.mjs app/layout.tsx app/page.tsx app/globals.css tsconfig.json
git commit -m "feat: scaffold next app router shell for migration spike"
```

---

### Task 3: Port route contract with parity pages

**Files:**
- Create: `app/works/page.tsx`
- Create: `app/works/[project_name]/page.tsx`
- Create: `app/tools/page.tsx`
- Create: `app/tools/[name]/[id]/page.tsx`
- Create: `app/tools/runtime/[slug]/page.tsx`
- Create: `lib/projects.ts`
- Test: `npm run build`

- [ ] **Step 1: Implement reusable lookup helpers in `lib/projects.ts`**

```ts
import { initialProjects, type ProjectItem } from "../client/src/data/projects";

export function getProjectBySlug(slug: string): ProjectItem | null {
  const normalized = slug.trim().toLowerCase();
  return (
    initialProjects.find(
      (item) => item.type === "special" && String(item.slug).trim().toLowerCase() === normalized,
    ) ?? null
  );
}
```

- [ ] **Step 2: Add `/works` parity page**

```tsx
// app/works/page.tsx
"use client";

import React, { useEffect } from "react";
import AppShell from "../../client/src/App";

export default function WorksPage() {
  useEffect(() => {
    document.getElementById("works-section")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  return <AppShell initialSection="works" />;
}
```

- [ ] **Step 3: Add `/works/[project_name]` detail page**

```tsx
// app/works/[project_name]/page.tsx
import Link from "next/link";
import { getProjectBySlug } from "../../../lib/projects";
import { ProjectDetailContent } from "../../../client/src/components/project-detail/ProjectDetailContent";

export default function WorkDetailPage({ params }: { params: { project_name: string } }) {
  const project = getProjectBySlug(params.project_name);
  if (!project) {
    return (
      <main>
        <p>Project unavailable.</p>
        <Link href="/works">Back to Works</Link>
      </main>
    );
  }
  return (
    <main>
      <Link href="/works" aria-label="Close project">X</Link>
      <ProjectDetailContent project={project} isAdmin={false} onUpdate={() => {}} />
    </main>
  );
}
```

- [ ] **Step 4: Add tools parity pages**

```tsx
// app/tools/page.tsx
import { ToolsIndexPage } from "../../client/src/tools/pages/ToolsIndexPage";
export default function ToolsPage() { return <ToolsIndexPage />; }
```

```tsx
// app/tools/[name]/[id]/page.tsx
import { ToolDetailPage } from "../../../../client/src/tools/pages/ToolDetailPage";
export default function ToolDetail() { return <ToolDetailPage />; }
```

```tsx
// app/tools/runtime/[slug]/page.tsx
import { ToolRuntimePage } from "../../../../../client/src/tools/pages/ToolRuntimePage";
export default function ToolRuntime() { return <ToolRuntimePage />; }
```

- [ ] **Step 5: Run build to verify route compile**

Run: `npm run build`  
Expected: Next build succeeds with route files recognized.

- [ ] **Step 6: Commit**

```bash
git add app/works/page.tsx app/works/[project_name]/page.tsx app/tools/page.tsx app/tools/[name]/[id]/page.tsx app/tools/runtime/[slug]/page.tsx lib/projects.ts
git commit -m "feat: port canonical works and tools routes to next app router"
```

---

### Task 4: Stabilize client boundaries and runtime compatibility

**Files:**
- Modify: route files using hooks/state
- Modify: shared components requiring client boundaries
- Test: `npm run dev`, `npm run build`

- [ ] **Step 1: Mark interactive entry points as client components**

```tsx
// app/page.tsx
"use client";

// app/works/page.tsx
"use client";

// app/tools/page.tsx
"use client";

// app/tools/[name]/[id]/page.tsx
"use client";

// app/tools/runtime/[slug]/page.tsx
"use client";
```

- [ ] **Step 2: Fix browser-only APIs behind client guards**

```ts
if (typeof window !== "undefined") {
  const saved = window.localStorage.getItem("ctm_pool");
  const isEmbedded = window.self !== window.top;
  console.log("runtime flags", { hasSaved: !!saved, isEmbedded });
}
```

- [ ] **Step 3: Validate tool runtime and embed behavior**

Run: `npm run dev`  
Expected:
- `/tools/runtime/course-tiermaker` renders correctly
- embedded flows remain functional

- [ ] **Step 4: Run production build**

Run: `npm run build`  
Expected: Build succeeds without server/client boundary errors.

- [ ] **Step 5: Commit**

```bash
git add app client/src
git commit -m "fix: align client boundaries and runtime behavior in next spike"
```

---

### Task 5: SEO/perf pass and migration report

**Files:**
- Modify: `app/works/[project_name]/page.tsx` (metadata)
- Create: `docs/superpowers/specs/next-spike-report.md`
- Test: `npm run build`

- [ ] **Step 1: Add per-project metadata generation**

```tsx
export async function generateMetadata({ params }: { params: { project_name: string } }) {
  const project = getProjectBySlug(params.project_name);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}
```

- [ ] **Step 2: Replace one high-impact image with `next/image` as validation**

```tsx
import Image from "next/image";
<Image src={project.image} alt={project.title} width={1600} height={900} />
```

- [ ] **Step 3: Build and compare against Vite baseline**

Run: `npm run build`  
Expected: Build success plus parity checklist complete:
- route parity (`/`, `/works`, `/works/:project_name`, `/tools*`)
- no regressions in detail UX and tool runtime embeds

- [ ] **Step 4: Write migration report**

```md
# Next Migration Spike Report
- What worked
- What broke and fixes required
- Estimated effort for production migration
- Go/No-go recommendation
```

- [ ] **Step 5: Commit**

```bash
git add app docs/superpowers/specs/next-spike-report.md
git commit -m "docs: record next migration spike findings and recommendation"
```

