import { afterEach, describe, expect, it, vi } from "vitest";
import { getAllAttributes } from "./attribute.controller";

describe("getAllAttributes", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns an empty list when the attribute API fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://example.test");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await expect(getAllAttributes()).resolves.toEqual([]);
  });
});
