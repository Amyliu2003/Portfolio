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

export const THEME = {
  bg: `bg-[${COLORS.primary}]`,
  text: `text-[${COLORS.text}]`,
  font: "font-['publicSans',_serif] uppercase tracking-wide",
};
