# Portfolio Design System

Purpose: keep all new pages aligned with the current portfolio visual language and interaction style.

## Source of Truth

- Color/theme constants: `client/src/utils/theme.ts`
- Base/global styles: `client/src/index.css`
- Project-specific typography/fonts/helpers: `client/src/custom.css`
- Existing composition patterns: `client/src/components/`

When creating new UI, match these sources first before introducing new tokens.

## Core Brand Direction

- Tone: editorial + experimental + creative-tech
- Contrast model: bright foreground over deep blue gradient backgrounds
- Accent behavior: purple highlight used sparingly for action and emphasis
- Motion: subtle transitions, smooth scroll, hover lift/opacity shifts

## Design Tokens (Current)

Use these values unless there is a clear design reason to expand the system.

### Colors

From `client/src/utils/theme.ts`:

- `primary`: `#181A4B`
- `secondary`: `#172FAB`
- `text`: `#FFFFFF`
- `accent`: `#BA76FF`
- `dim`: `rgba(255, 255, 255, 0.2)`
- `backgroundGradient`: project gradient string

### Usage Rules

- Page-level backgrounds should prefer the existing gradient family.
- Body text on dark surfaces should remain white or white with opacity variants.
- Accent purple is for:
  - active states
  - focus/selection affordances
  - important interactive emphasis
- Avoid introducing one-off saturated colors for major UI surfaces.

## Typography System

### Font Loading Sources (Current App)

Fonts are currently loaded from three places:

1. Typekit in `index.html`
   - `https://use.typekit.net/erp6tlo.css`
2. Google Fonts imports inside `App.tsx`
   - `Tinos`
   - `Caesar Dressing`
   - `Special Elite`
   - `Alegreya Sans`
   - `Share Tech Mono`
   - `Space Mono`
   - `Underdog`
   - `Warnes`
3. Local `@font-face` declarations in `custom.css`
   - `Yarding`
   - `publicSans`
   - `publicSan_italic` (note: naming currently differs from `publicSans` spelling)

### Active Font Roles (Design Usage Map)

- `Tinos`: default body/editorial reading face
- `Underdog` + `Warnes`: hero name lockup display
- `Yarding`: system/terminal decorative labels
- `publicSans`: compact metadata UI and chips
- `din-condensed` (`tk-din-condensed`): section labels like `Work / 22-26`
- `font-mono` utilities: diagnostics/system text and form/meta microcopy
- `font-sans` utilities: tray index numerals and neutral UI fallback

### Practical Rules for New Pages

- Keep one display style + one body style per section.
- Use uppercase tracking-heavy styles only for labels/navigation/meta, not paragraphs.
- Maintain readable body rhythm:
  - minimum `16px` equivalent for paragraph text
  - line-height around `1.5` or more for dense text blocks
- Prefer existing utility classes from `custom.css` before introducing new font class names.
- If adding a new font, document source and fallback stack in this file and `custom.css`.

### Font Consistency Notes

- Keep naming consistent for future additions (`publicSansItalic` style names are preferred over mixed spellings).
- `Timeline.tsx` currently uses `publicSans-texts`, which does not match the defined `publicSans-text` helper. Normalize these class names when touching that component.

## Spacing and Layout

Current app relies on Tailwind utility spacing scale (4px base).

### Layout Rules

- Mobile-first composition.
- Use consistent horizontal padding per section (`px-4` -> `px-8` patterns).
- Prefer `max-width` containers for dense text sections.
- Keep card/list gaps consistent (`gap-3`, `gap-4`, `gap-6` families).

### Breakpoint Guidance

- Base: mobile defaults
- `md` and up: enhance density/columns, do not redesign structure
- For new grid pages (like tools), start at 1 column mobile, expand on `md+`

## Component Patterns

Mirror behavior already present in `client/src/components/`.

### Cards

- Use bordered/translucent dark surfaces for cards over gradient backgrounds.
- Hover states should be subtle:
  - slight lift/scale OR border/accent shift
  - avoid aggressive motion
- Keep click target fully interactive when card is clickable.

### Buttons/Interactive Controls

- Minimum touch target: 44px height where possible.
- Include visible hover and focus states.
- Primary action can use accent background or accent border.
- Secondary actions should stay low emphasis (white/transparent variants).

### Status/Meta Chips

- Rounded pill/capsule style with compact text.
- Distinguish by contrast and border, not only hue.

## Accessibility Baseline (Required)

Every new page should meet this minimum:

- Semantic structure (`main`, headings in order, list semantics)
- Keyboard reachable controls
- Visible focus indicator (`:focus-visible`)
- Non-color-only state signaling (text/icon/border difference)
- Descriptive labels for icon-only buttons (`aria-label`)
- Informative `alt` text on meaningful images

## Motion and Performance

- Use short transitions (`150-300ms`) for hover/focus/state changes.
- Prefer transform/opacity animation over layout-thrashing properties.
- Lazy-load heavy visual components when route/page-scoped.
- Keep font loading practical; reuse existing families before adding new files.

## New Page Checklist

Before shipping a new page, verify:

1. Uses existing color tokens from `theme.ts`
2. Uses existing font families/utilities from `custom.css`
3. Follows mobile-first layout and existing spacing scale
4. Has accessible keyboard/focus/label behavior
5. Avoids one-off visual styles that break portfolio cohesion

## Suggested Structure for Future UI Work

If a new section grows, organize UI under feature folders:

```text
client/src/<feature>/
  pages/
  components/
  styles/
  data/
```

Keep shared primitives reusable and consistent with this design system.
