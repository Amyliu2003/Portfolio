# CLAUDE.md

## Design rules

- `client/src/index.css` is precompiled Tailwind v4.1.3 output, and tailwindcss is not installed in this project, so a utility class that isn't already in use may not exist. Before using one, grep `index.css` to confirm it's there; if it isn't, write it in `client/src/custom.css` as a named class.
