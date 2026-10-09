import { describe, expect, it } from "vitest";
import { cleanSeo } from "./productSeo";

describe("cleanSeo", () => {
  it("trims and collapses whitespace in text and keywords", () => {
    expect(cleanSeo({
      seoTitle: "  Organic\n Honey\t ",
      seoDescription: "  খাঁটি\n\t মধু  ",
      seoKeywords: ["  raw\t honey ", " খাঁটি\n মধু "],
    })).toEqual({
      seoTitle: "Organic Honey",
      seoDescription: "খাঁটি মধু",
      seoKeywords: ["raw honey", "খাঁটি মধু"],
    });
  });

  it("limits title, description and keyword lengths", () => {
    const result = cleanSeo({
      seoTitle: "a".repeat(121),
      seoDescription: "b".repeat(301),
      seoKeywords: ["c".repeat(61)],
    });
    expect(result.seoTitle).toBe("a".repeat(120));
    expect(result.seoDescription).toBe("b".repeat(300));
    expect(result.seoKeywords).toEqual(["c".repeat(60)]);
  });

  it("splits comma-separated strings on English and Arabic commas", () => {
    expect(cleanSeo({ seoKeywords: " Honey, , মধু، organic ، " }).seoKeywords)
      .toEqual(["Honey", "মধু", "organic"]);
  });

  it("drops empty and non-string array entries and deduplicates ignoring case", () => {
    expect(cleanSeo({
      seoKeywords: ["Honey", " honey ", "HONEY", "", "  ", null, 4, {}, ["x"], "Organic"],
    }).seoKeywords).toEqual(["Honey", "Organic"]);
  });

  it("deduplicates after keyword truncation", () => {
    expect(cleanSeo({
      seoKeywords: ["a".repeat(60) + "x", "A".repeat(60) + "y"],
    }).seoKeywords).toEqual(["a".repeat(60)]);
  });

  it("keeps at most twenty distinct keywords", () => {
    const keywords = Array.from({ length: 25 }, (_, i) => `keyword ${i}`);
    expect(cleanSeo({ seoKeywords: keywords }).seoKeywords).toEqual(keywords.slice(0, 20));
  });

  it("returns empty fields for missing and non-string input", () => {
    const empty = { seoTitle: "", seoDescription: "", seoKeywords: [] };
    expect(cleanSeo()).toEqual(empty);
    expect(cleanSeo({})).toEqual(empty);
    expect(cleanSeo({ seoTitle: 42, seoDescription: {}, seoKeywords: true })).toEqual(empty);
    expect(cleanSeo({ seoTitle: null, seoDescription: [], seoKeywords: null })).toEqual(empty);
  });
});
