import { describe, expect, it } from "vitest";
import { isHiddenListing, isVisible, onlyVisible } from "./visibility";

describe("visibility", () => {
  it("treats only status hide as hidden; missing status stays visible", () => {
    expect(isVisible({ status: "show" })).toBe(true);
    expect(isVisible({})).toBe(true);
    expect(isVisible({ status: "hide" })).toBe(false);
    expect(isVisible(null)).toBe(false);
  });
  it("filters lists and tolerates non-arrays", () => {
    expect(onlyVisible([{ name: "a" }, { name: "b", status: "hide" }, null])).toEqual([{ name: "a" }]);
    expect(onlyVisible(undefined)).toEqual([]);
  });
  it("recognises links to hidden categories by id or link name", () => {
    const list = [
      { _id: "1", name: "Oil", status: "hide" },
      { _id: "2", name: "Honey", status: "show" },
      { _id: "3", name: "Fresh Fruit", status: "hide" },
      { _id: "4", name: "freshfruit" },
    ];
    expect(isHiddenListing(list, "oil", "1")).toBe(true);
    expect(isHiddenListing(list, "oil", undefined)).toBe(true);
    expect(isHiddenListing(list, "honey", "2")).toBe(false);
    // A visible item sharing the link name keeps the page reachable.
    expect(isHiddenListing(list, "freshfruit", undefined)).toBe(false);
    // Id wins over the name part of the link.
    expect(isHiddenListing(list, "honey", "1")).toBe(true);
    expect(isHiddenListing(list, "unknown", "99")).toBe(false);
    expect(isHiddenListing(null, "oil")).toBe(false);
  });
});
