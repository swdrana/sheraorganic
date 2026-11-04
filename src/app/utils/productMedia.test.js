import { describe, expect, it } from "vitest";
import { productMedia } from "./productMedia";

describe("quick view product media", () => {
  it("uses only the selected product's images and inserts its video after the first", () => {
    expect(productMedia({ image: ["/one.jpg", "/two.jpg"], videoUrl: "/demo.mp4" })).toEqual([
      { type: "image", src: "/one.jpg" },
      { type: "video", src: "/demo.mp4" },
      { type: "image", src: "/two.jpg" },
    ]);
  });

  it("never substitutes template pictures when product media are missing or malformed", () => {
    for (const product of [null, {}, { image: "bad" }, { image: [null, 0, "", " "] }]) {
      expect(productMedia(product)).toEqual([]);
    }
    expect(productMedia({ image: [], videoUrl: "/demo.mp4" })).toEqual([
      { type: "video", src: "/demo.mp4" },
    ]);
  });
});
