export const DECOR_THEMES = Object.freeze(["grocery", "tech", "none"]);

// Older stores have no brand settings and must retain their existing appearance.
export function normalizeTheme(value) {
  const theme = typeof value === "string" ? value.trim().toLowerCase() : "";
  return DECOR_THEMES.includes(theme) ? theme : "grocery";
}
