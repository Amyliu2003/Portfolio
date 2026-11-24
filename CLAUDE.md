# CLAUDE.md

## Design rules

- Tailwind v4 is generated at dev/build time by `@tailwindcss/vite` (see `vite.config.ts`), with the `@tailwindcss/typography` and `tailwind-scrollbar` plugins. Utility classes can be used directly.
- `client/src/index.css` holds only `@import "tailwindcss"`, the plugins, and custom content carried over from the old Figma Make export (base rules and shadcn-style `:root`/`.dark` tokens). Don't paste generated CSS back into it.
- `client/src/custom.css` is unlayered, so its named classes (`ui-*`, `tray-*`, `.tools-page`, …) override Tailwind utilities regardless of specificity. Put site/UI-kit component styles there.

## Supported widths

- The minimum supported viewport width is **360px**. Check layouts at 360, 375, 480, 640, 768 and 1280; widths below 360px are not designed for (no overflow fixes or extra breakpoints for them).
