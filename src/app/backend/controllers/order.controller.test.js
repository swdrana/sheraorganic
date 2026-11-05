// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../model/counter.model", () => ({ default: {} }));

import { getOrderByCode } from "./order.controller";

describe("getOrderByCode", () => {
  const originalBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://example.test";
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ singleOrder: { orderCode: 12345 } }),
      })
    );
  });

  afterEach(() => {
    if (originalBaseUrl === undefined) delete process.env.NEXT_PUBLIC_BASE_URL;
    else process.env.NEXT_PUBLIC_BASE_URL = originalBaseUrl;
    vi.unstubAllGlobals();
  });

  it("forwards the encoded invoice token and session cookie", async () => {
    await getOrderByCode("12345", "private token");
    expect(fetch).toHaveBeenCalledWith(
      "https://example.test/api/v1/order-code/12345?t=private%20token",
      { credentials: "include" }
    );
  });
});
