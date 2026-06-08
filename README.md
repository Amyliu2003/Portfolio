# Portfolio

Interactive portfolio for Amy Liu — built with Vite + React. Browse works in a horizontal **Lava Tray** or masonry **Grid View**, open shareable project detail pages, and explore a separate **Tools Library** for live utilities.

## Stack

- React 18 + TypeScript
- Vite 6
- React Router 7 (`BrowserRouter`)
- Tailwind-style utility classes + `custom.css` typography
- Motion (animations), react-responsive-masonry

## Features

- **Dual browse modes** — horizontal snap-scroll tray with hover previews, or filterable masonry grid
- **Shareable project URLs** — each published project has a stable slug and dedicated route
- **Long-form case studies** — modular `contentBlocks` on project detail (stats, splits, accordions, embeds, etc.)
- **Live tool embeds** — projects can iframe a runtime tool in the hero (e.g. Course Tiermaker)
- **Admin editing** — password-gated inline edits on project detail pages (session state)
- **Tools Library** — standalone tools at `/tools` with metadata pages and runtime embed routes

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing page + Works interface (tray/grid) |
| `/works` | Same shell as home; auto-scrolls to Works section |
| `/works/:project_name` | Full-page project detail (slug-based, e.g. `/works/this-website`) |
| `/tools` | Tools library index |
| `/tools/:name/:id` | Tool detail page |
| `/tools/runtime/:slug` | Raw tool runtime (used in iframes) |

**Navigation behavior**

- Clicking a project in tray/grid → `/works/:slug`
- Close (`X`) on detail → `/works` (not browser back)
- Invalid slug → lightweight not-found with link back to Works

Routing is defined in `client/src/main.tsx`.

## Project Structure

```
client/src/
├── main.tsx                 # Router bootstrap
├── App.tsx                  # Landing + Works shell (tray/grid, filters, admin)
├── pages/
│   ├── WorksPage.tsx        # /works — renders App with initialSection="works"
│   └── WorkDetailPage.tsx   # /works/:project_name — project detail route
├── data/
│   ├── projects.ts          # Project data, slugs, contentBlocks types
│   └── projects-helpers.ts  # getProjectBySlug, adjacent slugs, routeable list
├── components/
│   ├── ProjectDetailModal.tsx   # Project detail UI + all content block renderers
│   ├── TrayView.tsx / GridView.tsx
│   └── ...
├── tools/                   # Tools library (pages, runtime apps, registry)
├── assets/                  # Title images and media
└── utils/theme.ts           # Color tokens (--accent, gradients)

scripts/
└── validate-project-slugs.mjs   # Slug count vs project slot sanity check

docs/
├── design-system.md         # Typography, colors, UI conventions
└── superpowers/             # Routing spec, implementation plans, Next.js spike (deferred)
```

## Project Data

Source of truth: `client/src/data/projects.ts`

Each project includes:

- `slug` — stable URL id (e.g. `campus-cravings`, `this-website`)
- `type` — `"special"` (clickable) or `"placeholder"` (reserved slot)
- `image` — hero/title image
- `embedUrl` — optional iframe src for live demos (hero uses full width)
- `contentBlocks` — optional long-form sections below About

**Content block types** (rendered in `ProjectDetailModal.tsx`):

`rich-text`, `split`, `image`, `full-width`, `grid`, `masonry`, `gallery-scroll`, `quote`, `process-steps`, `stats`, `card-grid`, `comparison`, `accordion`, `cta`, `video`, `code`

Example projects with full detail pages:

- `/works/this-website` — meta case study for the portfolio itself
- `/works/course-tiermaker` — live embed + process documentation

## Run Locally

```bash
npm install
npm run dev
```

Default URL: `http://localhost:3000`

Try:

- `http://localhost:3000/works`
- `http://localhost:3000/works/this-website`
- `http://localhost:3000/tools`

## Scripts

```bash
npm run dev              # Vite dev server
npm run build            # Production build → build/
npm run validate:slugs   # Verify slug count matches project slots in projects.ts
```

Run `validate:slugs` after adding or renaming projects.

## Design System

Visual tokens and typography rules: `docs/design-system.md`

Key values (`client/src/utils/theme.ts`):

- Primary blue: `#181A4B` / `#172FAB`
- Accent purple: `#BA76FF` (CSS var `--accent` on detail pages)
- Detail background: `linear-gradient(#181a4b, #172fab)`

Project detail hero behavior:

- **Title images** — fixed height (`clamp(280px, 70vh, 720px)`), width follows aspect ratio (`object-contain`)
- **Iframe embeds** — full content width, fixed height frame

## Deployment

GitHub Actions workflow in `.github/workflows/deploy.yml`:

1. Installs dependencies
2. Runs `npm run build`
3. Renames `build` → `dist`
4. Uploads `dist/` to `/var/www/app` via SCP

Required repository secrets: `SERVER_IP`, `SERVER_USER`, `SSH_PRIVATE_KEY`

## Further Reading

- Works routing design: `docs/superpowers/specs/2026-05-29-works-routing-and-next-migration-design.md`
- Vite routing implementation plan: `docs/superpowers/plans/2026-05-29-works-routing-vite-implementation.md`
- Tools library design: `docs/superpowers/specs/2026-05-28-tools-library-design.md`
- Next.js migration spike (deferred): `docs/superpowers/plans/2026-05-29-nextjs-migration-spike-plan.md`
