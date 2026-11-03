import { describe, expect, it } from "vitest";
import { BRAND_KEYS, normalizeBrand } from "./brand";
import { normalizeTracking, TRACKING_PATTERNS, isValidTrackingId } from "./tracking";
import { settingsUpdate } from "./storeSettings";
import { brandPreset, missingSettings } from "../../../scripts/seed-brand-settings.mjs";

describe("brand normalization", () => {
  it("returns every key, neutral text, and the legacy grocery banner default", () => {
    const brand = normalizeBrand();
    expect(Object.keys(brand).sort()).toEqual([...BRAND_KEYS].sort());
    expect(brand.site_name).toBe("");
    expect(brand.email_brand_color).toBe("");
    expect(brand.decoration_theme).toBe("grocery");
    expect(brand.product_sidebar_banner_show).toBe(true);
    expect(JSON.stringify(brand)).not.toMatch(/Shera|shera|Organic/);
  });
  it.each(["tech", "none"])("defaults banner off for %s", (theme) => {
    expect(normalizeBrand({ brand: { decoration_theme: theme } }).product_sidebar_banner_show).toBe(false);
  });
  it("honors explicit banner flags and cleans unsafe or non-string values", () => {
    const brand = normalizeBrand({ brand: { product_sidebar_banner_show: false, whatsapp_number: "+880 17-123", email_brand_color: "red;background:url(x)", og_image: "javascript:alert(1)", messenger_username: "x?y", site_name: {} } });
    expect(brand.product_sidebar_banner_show).toBe(false);
    expect(brand.whatsapp_number).toBe("88017123");
    expect(brand.email_brand_color).toBe("");
    expect(brand.og_image).toBe("");
    expect(brand.site_name).toBe("");
    expect(brand.messenger_username).toBe("");
    expect(normalizeBrand({ brand: { decoration_theme: "tech", product_sidebar_banner_show: true, email_brand_color: "#aB091F" } }).product_sidebar_banner_show).toBe(true);
  });
});
describe("tracking validators", () => {
  const valid = { gtm_id: "GTM-MMLFB63S", ga4_id: "G-ABC1234567", fb_pixel_id: "123456789012345", clarity_id: "abc1234567", tiktok_pixel_id: "ABCDEFGHIJKLMNOPQRST" };
  it("is disabled unless explicitly true", () => {
    expect(normalizeTracking().enabled).toBe(false);
    expect(normalizeTracking({ tracking: { enabled: "true" } }).enabled).toBe(false);
  });
  it.each(Object.keys(TRACKING_PATTERNS))("accepts a valid %s and drops script injection", (key) => {
    expect(isValidTrackingId(key, valid[key])).toBe(true);
    expect(normalizeTracking({ tracking: { [key]: ` ${valid[key]} ` } })[key]).toBe(valid[key]);
    for (const value of ["<script>alert(1)</script>", `${valid[key]}?x=1`, "x", 123, null]) {
      expect(normalizeTracking({ tracking: { [key]: value } })[key]).toBe("");
    }
  });
});
describe("leaf-only settings writes", () => {
  it("home save cannot wipe brand/tracking; brand save cannot wipe home", () => {
    expect(settingsUpdate({ home: { phone: "017" }, brand: undefined })).toEqual({ name: "storeCustomizationSetting", "setting.home.phone": "017" });
    expect(settingsUpdate({ brand: { site_name: "Nobomukh", unknown: "ignored" } })).toEqual({ name: "storeCustomizationSetting", "setting.brand.site_name": "Nobomukh" });
    expect(settingsUpdate({ tracking: { enabled: false, gtm_id: "bad", script: "bad" } })).toEqual({ name: "storeCustomizationSetting", "setting.tracking.enabled": false, "setting.tracking.gtm_id": "" });
  });
  it("preserves explicit empty strings and false; unknown groups/keys cannot be written", () => {
    expect(settingsUpdate({ brand: { site_name: "", product_sidebar_banner_show: false }, admin: true })).toEqual({ name: "storeCustomizationSetting", "setting.brand.site_name": "", "setting.brand.product_sidebar_banner_show": false });
  });
});
describe("seed presets (no DB)", () => {
  it("seeds exact existing shop values and safe tech defaults", () => {
    expect(brandPreset("mehedi").tracking.gtm_id).toBe("GTM-MMLFB63S");
    expect(brandPreset("mehedi").brand.messenger_greeting).toBe("Hello! I'm coming from your Website.");
    expect(brandPreset("raihan").brand.decoration_theme).toBe("tech");
    expect(brandPreset("raihan").tracking.enabled).toBe(false);
  });
  it("never overwrites existing keys, including false, empty, and null", () => {
    const update = missingSettings({ setting: { brand: { site_name: "", og_image: null, product_sidebar_banner_show: false }, tracking: { enabled: false } } }, brandPreset("mehedi"));
    for (const key of ["setting.brand.site_name", "setting.brand.og_image", "setting.brand.product_sidebar_banner_show", "setting.tracking.enabled"]) expect(update).not.toHaveProperty(key);
    expect(update["setting.brand.decoration_theme"]).toBe("grocery");
    expect(Object.keys(update).every((key) => /^setting\.(brand|tracking)\./.test(key))).toBe(true);
  });
});
