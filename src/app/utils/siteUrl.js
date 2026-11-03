// No cross-store fallback, including in builds without deployment environment variables.
export function getSiteUrl() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_BASE_URL);
    return /^https?:$/.test(url.protocol) ? url.origin : "";
  } catch {
    return "";
  }
}
