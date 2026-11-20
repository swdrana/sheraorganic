export const TRACKING_PATTERNS = {
  gtm_id: /^GTM-[A-Z0-9]{4,10}$/,
  ga4_id: /^G-[A-Z0-9]{4,12}$/,
  fb_pixel_id: /^\d{10,20}$/,
  clarity_id: /^[a-z0-9]{6,12}$/,
  tiktok_pixel_id: /^[A-Z0-9]{15,25}$/,
  // Not a script ID: rendered as <meta name="facebook-domain-verification"> (even when tracking is
  // off); the loader never reads it.
  fb_domain_verification: /^[a-z0-9]{20,40}$/,
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

// Next.js metadata for Meta Business domain verification: only a validated code from this store's
// own settings, nothing when unset/invalid.
export function domainVerificationMetadata(setting) {
  const code = normalizeTracking(setting).fb_domain_verification;
  return code ? { other: { "facebook-domain-verification": code } } : {};
}
