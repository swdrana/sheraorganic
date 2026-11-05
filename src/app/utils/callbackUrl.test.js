import { describe, expect, it } from "vitest";
import { safeCallbackUrl } from "./callbackUrl";

describe("post-login redirect", () => {
  it("keeps same-site paths", () => {
    expect(safeCallbackUrl("/my-account")).toBe("/my-account");
    expect(safeCallbackUrl("/products?q=phone")).toBe("/products?q=phone");
  });
  it.each([null, undefined, "", "https://localhost:80/my-account", "//evil.example", "/\\evil.example", "javascript:alert(1)", "/\t/evil.example", "/\n/evil.example", "/\r/evil.example"])(
    "falls back to home for %s",
    (value) => expect(safeCallbackUrl(value)).toBe("/")
  );
});
