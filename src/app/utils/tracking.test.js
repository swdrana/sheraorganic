import { describe, expect, it } from "vitest";
import { domainVerificationMetadata, normalizeTracking, TRACKING_KEYS } from "./tracking";
import { invalidSettingsFields, settingsUpdate } from "./storeSettings";

const code = "abcdefghij0123456789abcdefghij";

describe("Facebook domain verification setting", () => {
  it("is a normal tracking key: validated, trimmed, empty when missing", () => {
    expect(TRACKING_KEYS).toContain("fb_domain_verification");
    expect(normalizeTracking({ tracking: { fb_domain_verification: ` ${code} ` } }).fb_domain_verification).toBe(code);
    expect(normalizeTracking({}).fb_domain_verification).toBe("");
    // Mehedi's current doc (GTM only, no new key) stays exactly as it was.
    expect(normalizeTracking({ tracking: { enabled: true, gtm_id: "GTM-MMLFB63S" } })).toMatchObject({ enabled: true, gtm_id: "GTM-MMLFB63S", fb_pixel_id: "", fb_domain_verification: "" });
  });
  it("rejects HTML or the whole meta tag, allows explicit clearing, never writes an omitted leaf", () => {
    expect(invalidSettingsFields({ tracking: { fb_domain_verification: `<meta name="facebook-domain-verification" content="${code}">` } })).toEqual(["tracking.fb_domain_verification"]);
    expect(settingsUpdate({ tracking: { fb_domain_verification: "" } })).toEqual({ name: "storeCustomizationSetting", "setting.tracking.fb_domain_verification": "" });
    expect(settingsUpdate({ tracking: { gtm_id: "GTM-ABC1234" } })).not.toHaveProperty("setting.tracking.fb_domain_verification");
  });
  it("adds the meta tag only for a valid code, even when tracking is off", () => {
    expect(domainVerificationMetadata({ tracking: { enabled: false, fb_domain_verification: code } })).toEqual({ other: { "facebook-domain-verification": code } });
    expect(domainVerificationMetadata({ tracking: { fb_domain_verification: "bad code" } })).toEqual({});
    expect(domainVerificationMetadata(null)).toEqual({});
  });
});
