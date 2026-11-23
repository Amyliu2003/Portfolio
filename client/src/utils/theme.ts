/** Home / landing / works — purple wash + sky-to-deep-blue */
export const GRADIENT_HOME =
  "linear-gradient(180deg, rgba(186, 118, 255, 0.30) 0%, rgba(186, 118, 255, 0.00) 20%), linear-gradient(180deg, #D5DCD9 0%, #83C1E6 20%, #1D5DE5 40%, #172FAB 56%, #181A4B 80%)";

/** Project detail and modal shells — deep blue vertical */
export const GRADIENT_DETAIL =
  "linear-gradient(180deg, #181A4B 0%, #172FAB 100%)";

export const GRADIENTS = {
  home: GRADIENT_HOME,
  detail: GRADIENT_DETAIL,
} as const;

export const COLORS = {
  primary: "#181A4B",
  secondary: "#172FAB",
  text: "#FFFFFF",
  accent: "#BA76FF",
  dim: "rgba(255, 255, 255, 0.2)",
  /** @deprecated Use GRADIENTS.home */
  backgroundGradient: GRADIENT_HOME,
};

/** Design system tokens — source of truth: docs/design-system.html (mirrored as CSS variables in custom.css) */
export const DS_COLORS = {
  bg: "#080a14",
  surface: "#0e1128",
  primary: COLORS.primary,
  secondary: COLORS.secondary,
  accent: COLORS.accent,
  accent2: "#4affed",
  /** Design-system text color; COLORS.text (#FFFFFF) stays for the live site */
  text: "#e8e8f0",
  border: "rgba(186, 118, 255, 0.15)",
  danger: "#ff5d6c",
} as const;

export const FONTS = {
  mono: 'Menlo, "Share Tech Mono", monospace',
  body: '"publicSans", "Public Sans", system-ui, sans-serif',
  display: '"din-condensed", "DIN Condensed", "DIN Alternate", "Arial Narrow", sans-serif',
} as const;

export const RADII = {
  none: "0",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  pill: "999px",
} as const;

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1280,
  wide: 1920,
} as const;

export const THEME = {
  bg: `bg-[${COLORS.primary}]`,
  text: `text-[${COLORS.text}]`,
  font: "font-['publicSans',_serif] uppercase tracking-wide",
};
