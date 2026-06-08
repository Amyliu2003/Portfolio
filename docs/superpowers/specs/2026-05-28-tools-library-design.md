# Tools Library Design

Date: 2026-05-28  
Project: `amyliusiyan.com/tools`  
Scope: MVP design for Tools Library inside the current Vite + React portfolio app

## 1) One-line Definition

`amyliusiyan.com/tools` is a library of Amy's vibe-coded tools, where each tool runs directly inside the portfolio experience.

## 2) Platform Alignment

This repository is a Vite + React app, so this design adapts the original PRD to `react-router-dom` route paths.

- Keep URL semantics from PRD
- Implement routes in current app architecture
- Do not migrate to Next.js for MVP
- Use `docs/design-system.md` as the UI guidance baseline

## 2.1) UI Guidance Baseline (Approved)

Tools Library UI follows a reuse-first strategy with balanced flexibility:

- Strategy: **Extract-and-Reuse**
- Default rule: reuse existing component patterns before creating new ones
- Source references:
  - `client/src/components/Header.tsx`
  - `client/src/components/Controls.tsx`
  - `client/src/components/GridView.tsx`
  - `docs/design-system.md`

Practical interpretation:

- Reuse existing layout and interaction language for cards, filter chips, and top-level framing.
- Build tools-specific components as thin wrappers around extracted shared primitives.
- Allow small local exceptions only when tool runtime constraints require them (for example iframe sizing).

## 3) URL Structure

- `/tools` -> Library index (all tools browse page)
- `/tools/:name/:id` -> Single tool page

Examples:

- `/tools/course-tiermaker/003`
- `/tools/chess-pgn-converter/002`
- `/tools/escape-room-chess/004`
- `/tools/prisense/001`

## 4) Data Model

Tool metadata will be stored as local TypeScript records in:

- `client/src/tools/data/tools.ts`

```ts
type Tool = {
  id: string; // e.g. "001"
  slug: string; // e.g. "course-tiermaker"
  name: string; // display name
  description: string;
  tags: string[]; // e.g. ["vibe-code", "AI", "chess"]
  status: "live" | "wip" | "prototype";
  year: number;
  featured?: boolean; // shows in spotlight on index
  type: "component" | "embed"; // component = local JSX; embed = iframe
  embedUrl?: string; // used when type === "embed"
  githubUrl?: string; // optional
};
```

MVP rules:

- `id + slug` uniquely identify a tool route
- only `type: "embed"` uses `embedUrl`
- metadata is hardcoded (no CMS for MVP)

## 5) Page Design

### 5.1 Library Index (`/tools`)

Sections:

1. Spotlight (featured tool)
2. Tag filter
3. Tool grid

Behavior:

- Spotlight uses the first tool marked `featured: true`
- Tag filter updates grid instantly (client-side state only)
- Grid excludes spotlight tool to avoid duplication
- No pagination, no search, no sorting UI
- Featured selection is intentionally manual in MVP (edit `tools.ts`), so swapping the featured tool is explicit and predictable.
- Modular v2 option: centralize spotlight selection via a small resolver (for example `getFeaturedTool(tools)` or a dedicated `featuredToolId` constant) to avoid touching individual records.

Tag set for MVP:

- `ALL`
- `vibe-code`
- `chess`
- `AI`
- `interactive`
- `design`

Status badge mapping:

- `live` -> `LIVE`
- `wip` -> `WIP`
- `prototype` -> `PROTOTYPE`

### 5.2 Tool Detail (`/tools/:name/:id`)

Header block:

- Back link to `/tools`
- Tool name
- Status badge
- Description
- Tag chips
- Year
- optional GitHub link

Content block:

- `type: "component"` -> lazy-load and render local component
- `type: "embed"` -> render full-width iframe with `embedUrl`

## 6) Rendering Strategy

### 6.1 Component tools

Local tool components are stored by slug:

- `client/src/tools/runtime/<slug>.tsx`

The detail page resolves by metadata slug and lazy-loads the runtime component.

Example (explicit loader map, avoids bundler guesswork):

```tsx
import { lazy } from "react";

const toolLoaders = {
  "course-tiermaker": () => import("../runtime/course-tiermaker"),
  "chess-pgn-converter": () => import("../runtime/chess-pgn-converter"),
  "escape-room-chess": () => import("../runtime/escape-room-chess"),
} as const;

export function getToolComponent(slug: string) {
  const loader = toolLoaders[slug as keyof typeof toolLoaders];
  return loader ? lazy(loader) : null;
}
```

Alternative (for a more scalable registry) is `import.meta.glob("../runtime/*.tsx")`, but MVP can start with the explicit map above for clarity and safety.

### 6.2 Embedded tools

For `type: "embed"`:

- render `<iframe src={embedUrl} />`
- full width
- sensible min-height (desktop-targeted MVP)

## 7) Proposed File Structure (Vite)

```text
client/src/
  tools/
    data/
      tools.ts
    shared/
      ToolCardBase.tsx
      FilterChipGroupBase.tsx
      PageHeaderBase.tsx
    pages/
      ToolsIndexPage.tsx
      ToolDetailPage.tsx
    components/
      ToolCard.tsx
      SpotlightCard.tsx
      StatusBadge.tsx
      TagFilter.tsx
    runtime/
      course-tiermaker.tsx
      chess-pgn-converter.tsx
      escape-room-chess.tsx
      # prisense uses embed, no local runtime component required
```

## 8) Routing Integration

MVP integration with existing app:

- keep existing portfolio flow intact
- add `/tools` and `/tools/:name/:id` routes in router layer
- add a `Tools` entry link in the header area so users can reach `/tools` from the main portfolio view

## 8.1) Component Contract Mapping

Each tools component must map back to existing design system and component language:

- `ToolCard`
  - based on current `GridView` card shell behavior
  - typography: `tk-din-condensed` title, `publicSans-text` body, `font-mono` meta
- `SpotlightCard`
  - same token family as `ToolCard`, larger featured layout
- `TagFilter`
  - reuses `Controls` chip interaction pattern (active accent, inactive outlined)
- `StatusBadge`
  - capsule/chip style, with non-color-only state signaling

## 9) Error Handling

Required fallback states:

1. Unknown route params (`name`/`id` mismatch) -> tool not found UI with back link
2. Missing component file for a `component` tool -> fallback panel with friendly error
3. `embed` tool missing `embedUrl` -> fallback panel with metadata shown
4. Unknown status value -> default neutral badge to avoid hard crash

## 10) QA Checklist (MVP)

- `/tools` renders spotlight + filter + grid
- each filter option updates results without reload
- each tool card navigates to correct detail route
- all status badges render correctly
- all 5 initial tools resolve expected render mode
- invalid route shows safe not-found screen
- layout is usable on desktop and mobile widths
- all tools UI components use approved font helpers and token families from `docs/design-system.md`
- chip/card focus states are keyboard-visible
- status indicators remain understandable without color alone

## 11) Initial Tool Records (Seed List)

| ID  | Slug                  | Name                       | Type      | Status    | Featured |
|-----|-----------------------|----------------------------|-----------|-----------|----------|
| 001 | prisense              | Prisense                   | embed     | live      | yes      |
| 002 | chess-pgn-converter   | Chess ↔ Narrative          | component | wip       | no       |
| 003 | course-tiermaker      | Course Tiermaker           | component | live      | no       |
| 004 | escape-room-chess     | Escape Room Chess Puzzle   | component | prototype | no       |
| 005 | productivity-enforcer | Productivity Enforcer      | embed     | wip       | no       |

## 12) Out of Scope (MVP)

- CMS integration (Notion/Sanity/etc.)
- user comments or ratings
- in-tool search
- analytics per tool
- multilingual support

## 13) Build Order

1. Create `tools.ts` metadata model and records
2. Build `/tools` index page with spotlight + filter + grid
3. Build detail page with metadata header + renderer switch
4. Integrate first local component tool (`course-tiermaker`)
5. Integrate `prisense` iframe
6. Add remaining tools incrementally

## 14) Notes for Implementation Planning

- Keep all tool logic isolated under `client/src/tools/` to avoid tangling with existing portfolio data modules.
- Reuse shared visual tokens/colors from current theme where practical.
- Keep state local to tools pages for MVP; avoid introducing new global stores.
- Prefer extracting shared primitives from existing components before creating tools-only one-off UI.
