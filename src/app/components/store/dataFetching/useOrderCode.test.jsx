import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getOrderByCode } from "@/app/backend/controllers/order.controller";
import useOrderCode from "./useOrderCode";

vi.mock("@/app/backend/controllers/order.controller", () => ({
  getOrderByCode: vi.fn(),
}));

describe("useOrderCode", () => {
  beforeEach(() => vi.resetAllMocks());

  it("passes the invoice token to the private order fetch", async () => {
    getOrderByCode.mockResolvedValue({ singleOrder: { orderCode: 12345 } });
    const { result } = renderHook(() => useOrderCode("12345", "private-token"));
    await waitFor(() => expect(result.current.codeOrderLoading).toBe(false));
    expect(getOrderByCode).toHaveBeenCalledWith("12345", "private-token");
    expect(result.current.codeOrder).toEqual({ orderCode: 12345 });
  });

  it("returns null for an unauthorized or missing order", async () => {
    getOrderByCode.mockResolvedValue(null);
    const { result } = renderHook(() => useOrderCode("12345"));
    await waitFor(() => expect(result.current.codeOrderLoading).toBe(false));
    expect(result.current.codeOrder).toBeNull();
  });
});
