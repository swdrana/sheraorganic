import { describe, expect, it } from "vitest";
import { DECOR_THEMES, normalizeTheme } from "./theme";

describe("decoration theme contract", () => {
  it("supports the three shared settings values", () => {
    expect(DECOR_THEMES).toEqual(["grocery", "tech", "none"]);
    for (const theme of DECOR_THEMES) expect(normalizeTheme(theme)).toBe(theme);
  });

  it("defaults missing, malformed and unknown values to the legacy grocery look", () => {
    for (const value of [undefined, null, "", "invalid", false, 0, [], {}, "__proto__"]) {
      expect(normalizeTheme(value)).toBe("grocery");
    }
  });

  it("normalizes casing and surrounding whitespace", () => {
    expect(normalizeTheme(" TECH ")).toBe("tech");
    expect(normalizeTheme(" None ")).toBe("none");
  });
});
