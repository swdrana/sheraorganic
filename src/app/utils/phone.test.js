import { describe, expect, it } from "vitest";
import { isValidBdPhone, normalizeBdPhone } from "./phone";

describe("Bangladesh mobile numbers", () => {
  it.each([
    "01712345678",
    "০১৭১২৩৪৫৬৭৮",
    "+8801712345678",
    "8801712345678",
    " +৮৮ (০১৭১২) ৩৪৫-৬৭৮ ",
    "01712-345678",
    "01712.345.678",
    "(01712) 345 678",
  ])("normalizes and accepts %s", (value) => {
    expect(normalizeBdPhone(value)).toBe("01712345678");
    expect(isValidBdPhone(value)).toBe(true);
  });

  it.each(["01312345678", "01412345678", "01512345678", "01612345678", "01812345678", "01912345678"])(
    "accepts supported prefix %s", (value) => expect(isValidBdPhone(value)).toBe(true)
  );

  it.each(["", null, undefined, "01212345678", "01112345678", "02012345678", "1712345678", "0171234567", "017123456789", "+101712345678", "01712abc678", "01712/345678"])(
    "rejects invalid prefix, length or characters: %s", (value) => expect(isValidBdPhone(value)).toBe(false)
  );
});
