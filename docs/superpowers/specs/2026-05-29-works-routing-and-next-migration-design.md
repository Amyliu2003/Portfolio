# Works Routing and Next Migration Design

Date: 2026-05-29
Status: Approved in-session for draft write-up
Owner: Portfolio app

## 1) Context and Decision

The current portfolio runs as a Vite + React SPA with:

- Modal-based project detail in the main app (`ProjectDetailModal`)
- Existing tools routes (`/tools`, `/tools/:name/:id`, `/tools/runtime/:slug`)
- Project data already containing stable `slug` fields

We need a route for every project without taking on high migration risk today.

### Decision

- **Now (Plan A):** Keep Vite, implement canonical works routes immediately
- **Later (Plan B):** Prepare and document a Next.js migration path, but do not execute now

This preserves momentum while unblocking shareable project URLs and cleaner route architecture.

## 2) Goals and Non-Goals

### Goals

1. Add canonical project routes under `/works`
2. Keep visual design consistent with the current modal experience
3. Make project links directly shareable and reload-safe
4. Keep existing tools routing behavior intact
5. Capture a concrete Next.js migration plan for future execution

### Non-Goals (for Plan A)

1. No full framework rewrite now
2. No broad UI redesign
3. No URL-synced filter/search state in this pass
4. No backend/API redesign in this pass

## 3) Route Contract (Canonical)

### Works routes

- `/` -> existing home/landing behavior
- `/works` -> real route that renders the same home app and auto-scrolls/focuses the Works section
- `/works/:project_name` -> full-page project detail

### Tools routes (unchanged)

- `/tools`
- `/tools/:name/:id`
- `/tools/runtime/:slug`

### Param contract

- `project_name` uses existing project `slug` as canonical ID
- Do not generate path params from title at runtime
- Slugs must be unique for all routeable project items

## 4) UX and Navigation Behavior

### Entry behavior

- Clicking a project in tray/grid navigates to `/works/:project_name`
- The detail page is structurally a route page, not a modal overlay

### Visual behavior

- The route page should preserve current visual language from `ProjectDetailModal`
- Reuse existing typography, spacing, media behavior, and embed behavior

### Exit behavior

- `X` always navigates to `/works` (not history back)
- `/works` reliably lands user at Works section (auto-scroll/focus)

### Error behavior

- Invalid or missing slug renders a lightweight not-found state with:
  - message: project unavailable
  - primary action: Back to Works (`/works`)

## 5) Component and Data Design

### Reuse-first structure

Refactor existing project detail UI into shared presentation layers:

1. **Detail content renderer (shared)**
   - Takes a `ProjectItem`
   - Renders all existing content blocks and media/iframe behavior
2. **Route page wrapper**
   - Loads project by slug
   - Provides close action routing to `/works`
3. **Optional modal wrapper (legacy compatibility)**
   - Can keep using the same shared content renderer during transition

### Data helpers

Introduce a single source lookup utility (e.g., `getProjectBySlug`) for:

- route page resolution
- guard logic for missing project
- future reuse in Next migration

### Data quality requirements

- Ensure all routeable projects have non-empty unique `slug`
- Placeholder/non-routeable entries are not linked to `/works/:project_name`

## 6) Implementation Scope for Plan A

### In scope

1. Add `/works` and `/works/:project_name` routes
2. Route existing tray/grid selection to project route
3. Preserve existing look-and-feel with shared detail presentation
4. Add not-found handling for invalid slug
5. Keep tools routes stable

### Out of scope

1. Next.js migration work
2. SEO metadata overhaul
3. performance tuning beyond route split
4. major information architecture changes

## 7) Risks and Mitigations

1. **Risk:** Large `ProjectDetailModal` is tightly coupled to modal state
   - **Mitigation:** Extract presentation first, keep modal shell thin
2. **Risk:** Slug inconsistencies break deep links
   - **Mitigation:** Validate slug uniqueness before wiring routes
3. **Risk:** Scroll-to-Works behavior feels inconsistent
   - **Mitigation:** Use deterministic anchor/ref-based scroll trigger on `/works`
4. **Risk:** Regressions in embeds and SVG treatment
   - **Mitigation:** Keep existing media logic unchanged in shared renderer

## 8) Acceptance Criteria (Plan A)

1. Visiting `/works` always lands at Works section of the main app
2. Visiting `/works/:project_name` loads the correct project detail page
3. Clicking `X` in detail always returns to `/works`
4. Invalid slug returns clear fallback with Back to Works action
5. Existing `/tools*` routes still work
6. Visual appearance of project detail remains consistent with current experience

## 9) Test Plan (Plan A)

1. Manual route tests:
   - `/`, `/works`, valid `/works/:project_name`, invalid `/works/:project_name`
2. Navigation tests:
   - tray -> detail route
   - grid -> detail route
   - detail `X` -> `/works`
3. Regression tests:
   - iframe embed project renders correctly
   - SVG title image background/fit behavior preserved
   - tools pages continue to render and navigate normally

## 10) Plan B (Later): Next.js Migration Blueprint

This is a deferred plan and not active implementation work.

### B0 - Migration spike branch

- Create isolated branch (`next-migration-spike`)
- Target route parity first, not optimization

### B1 - App shell migration

- Move app shell to Next App Router
- Keep interactive components as client components where needed
- Preserve current project data contracts

### B2 - Route parity

- `/` -> `app/page.tsx`
- `/works` -> `app/works/page.tsx` (auto-scroll/focus behavior)
- `/works/:project_name` -> `app/works/[project_name]/page.tsx`
- `/tools*` parity maintained

### B3 - SEO/perf upgrades

- Add per-project metadata and OG data
- Incrementally adopt `next/image` where safe
- Re-verify embed/tool runtime behavior

### B4 - Cutover gate

Cut over only when all are true:

1. Route behavior parity
2. Visual parity in critical flows
3. No regressions in embeds/tools
4. Build/deploy path validated

## 11) PRD Note to Record

Decision log entry to include in PRD:

> Next.js is a better long-term fit for portfolio SEO, image optimization, and possible API routes. However, immediate work proceeds with low-risk Vite route restructuring (Plan A). Next.js migration is deferred as Plan B and will be revisited after current delivery priorities stabilize.

## 12) Open Questions (Deferred, Not Blocking Plan A)

1. Should `/works` filter/sort state become URL-addressable in a future pass?
2. Should project metadata be centralized for SSR-friendly generation before Plan B?
3. Should `/works` eventually become a dedicated page distinct from the home shell?
