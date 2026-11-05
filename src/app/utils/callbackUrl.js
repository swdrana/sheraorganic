// Post-login redirects stay on this site: only same-origin paths. Control characters and
// backslashes are rejected because the URL parser drops/normalizes them ("/\t/x" -> "//x").
export const safeCallbackUrl = (value) => {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "/";
  if ([...value].some((ch) => ch <= "\u001f" || ch === "\u007f" || ch === "\\")) return "/";
  try {
    return new URL(value, "http://local.invalid").origin === "http://local.invalid" ? value : "/";
  } catch {
    return "/";
  }
};
