import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useOrderFilter from "./useOrderFilter";

vi.mock("next/navigation", () => ({ useRouter: () => ({ refresh: vi.fn() }) }));

const orders = [
  { orderCode: 54321, user_info: { name: "Rahim", contact: "01712345678" }, createdAt: "2026-11-04", status: "Pending", paymentMethod: "cod" },
  { orderCode: 67890, user_info: { name: "Karim", contact: "+৮৮০১৮১২-৩৪৫৬৭৮" }, createdAt: "2026-11-05", status: "Delivered", paymentMethod: "cod" },
  { orderCode: 99999, createdAt: "2026-11-03" },
];

describe("admin order search", () => {
  it.each([
    ["01712-345678", 54321], ["০১৭১২৩৪৫৬৭৮", 54321], ["+8801712345678", 54321],
    ["01812345678", 67890], ["54321", 54321], ["6789", 67890], ["rAhIm", 54321],
  ])("finds %s by phone, order code or name", (search, code) => {
    const { result } = renderHook(() => useOrderFilter(orders));
    act(() => result.current.setSearchText(search));
    expect(result.current.filterOrder.map((order) => order.orderCode)).toEqual([code]);
    expect(result.current.pageCount).toBe(1);
  });

  it("does not match every phone when search contains only separators", () => {
    const { result } = renderHook(() => useOrderFilter(orders));
    act(() => result.current.setSearchText("---"));
    expect(result.current.filterOrder).toEqual([]);
  });

  it("combines search with existing status and payment filters", () => {
    const { result } = renderHook(() => useOrderFilter(orders));
    act(() => {
      result.current.setSearchText("01712-345678");
      result.current.setMethod("COD");
      result.current.setStatus("Delivered");
    });
    expect(result.current.filterOrder).toEqual([]);
    act(() => result.current.setStatus("Pending"));
    expect(result.current.filterOrder).toEqual([orders[0]]);
  });

  it("preserves newest-first ordering and pagination", () => {
    const { result } = renderHook(() => useOrderFilter(orders));
    act(() => result.current.setItemsPerPage(1));
    expect(result.current.pageCount).toBe(3);
    expect(result.current.filterOrder).toEqual([orders[1]]);
    act(() => result.current.handlePageChange({ selected: 1 }));
    expect(result.current.filterOrder).toEqual([orders[0]]);
  });
});
