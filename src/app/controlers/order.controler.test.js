import { afterEach, describe, expect, it, vi } from "vitest";
import { createOrder } from "./order.controler";

afterEach(() => vi.unstubAllGlobals());

describe("checkout order request", () => {
  it("passes the server error message back to checkout", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ message: "সঠিক বাংলাদেশি মোবাইল নম্বর দিন।" }) }));
    expect(await createOrder({ cart: [] })).toEqual({ error: "সঠিক বাংলাদেশি মোবাইল নম্বর দিন।" });
  });

  it("keeps the successful order response", async () => {
    const body = { order: { orderCode: 12345 } };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => body }));
    expect(await createOrder({ cart: [] })).toEqual(body);
  });

  it("leaves an absent server message available for the checkout fallback", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));
    expect(await createOrder({ cart: [] })).toEqual({ error: undefined });
  });
});
