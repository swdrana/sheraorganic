// Shared by server and browser. Missing text is deliberately neutral: never another shop's brand.
export const BRAND_TEXT_KEYS = [
  "site_name", "meta_title", "meta_description", "og_image", "login_welcome",
  "whatsapp_number", "messenger_username", "messenger_greeting", "email_brand_color",
  "product_sidebar_banner_img", "product_sidebar_banner_title", "product_sidebar_banner_subtitle",
];
export const BRAND_KEYS = [...BRAND_TEXT_KEYS, "decoration_theme", "product_sidebar_banner_show"];
export const safeImageUrl = (value) => {
  if (typeof value !== "string") return "";
  const url = value.trim();
  return /^(https?:\/\/|\/(?!\/))/.test(url) ? url : "";
};
export function normalizeBrand(setting) {
  const raw = setting?.brand || {};
  const brand = Object.fromEntries(BRAND_TEXT_KEYS.map((key) => [key, typeof raw[key] === "string" ? raw[key].trim() : ""]));
  brand.decoration_theme = ["grocery", "tech", "none"].includes(raw.decoration_theme) ? raw.decoration_theme : "grocery";
  brand.product_sidebar_banner_show = typeof raw.product_sidebar_banner_show === "boolean"
    ? raw.product_sidebar_banner_show : raw.product_sidebar_banner_show === undefined && brand.decoration_theme === "grocery";
  brand.whatsapp_number = brand.whatsapp_number.replace(/\D/g, "");
  brand.messenger_username = /^[a-zA-Z0-9._-]+$/.test(brand.messenger_username) ? brand.messenger_username : "";
  brand.email_brand_color = /^#[0-9a-fA-F]{6}$/.test(brand.email_brand_color) ? brand.email_brand_color : "";
  brand.og_image = safeImageUrl(brand.og_image);
  brand.product_sidebar_banner_img = safeImageUrl(brand.product_sidebar_banner_img);
  return brand;
}
