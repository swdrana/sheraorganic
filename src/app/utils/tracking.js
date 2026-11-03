export const TRACKING_PATTERNS = {
  gtm_id: /^GTM-[A-Z0-9]{4,10}$/,
  ga4_id: /^G-[A-Z0-9]{4,12}$/,
  fb_pixel_id: /^\d{10,20}$/,
  clarity_id: /^[a-z0-9]{6,12}$/,
  tiktok_pixel_id: /^[A-Z0-9]{15,25}$/,
};
export const TRACKING_KEYS = ["enabled", ...Object.keys(TRACKING_PATTERNS)];
export const isValidTrackingId = (key, value) =>
  typeof value === "string" && !!TRACKING_PATTERNS[key]?.test(value.trim());
export function normalizeTracking(setting) {
  const raw = setting?.tracking || {};
  return {
    enabled: raw.enabled === true,
    ...Object.fromEntries(Object.keys(TRACKING_PATTERNS).map((key) => [key, isValidTrackingId(key, raw[key]) ? raw[key].trim() : ""])),
  };
}
