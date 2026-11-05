// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/backend/utils/apiAuth", () => ({
  getApiSession: vi.fn(),
  isStaff: vi.fn((session) => session?.user?.role === "Admin"),
}));
vi.mock("@/app/utils/database", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/model/order.model", () => ({
  default: { findOne: vi.fn() },
}));

import { getApiSession } from "@/app/backend/utils/apiAuth";
import Order from "@/app/backend/model/order.model";
import { GET } from "./route";

const savedOrder = (overrides = {}) => ({
  orderCode: 12345,
  user: "owner-id",
  accessToken: "0123456789abcdef0123456789abcdef",
  user_info: { name: "Customer", contact: "01712345678" },
  cart: [{ name: "Product" }],
  ...overrides,
});
const selectOrder = vi.fn();

const request = (token = "") =>
  new Request(`https://example.test/api/v1/order-code/12345${token ? `?t=${token}` : ""}`);

beforeEach(() => {
  vi.clearAllMocks();
  getApiSession.mockResolvedValue(null);
  Order.findOne.mockReturnValue({ select: selectOrder });
  selectOrder.mockResolvedValue(savedOrder());
});

describe("private order-code lookup", () => {
  it("returns 404 without a session or token", async () => {
    const response = await GET(request(), { params: { code: "12345" } });
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ message: "অর্ডারটি পাওয়া যায়নি।" });
  });

  it("returns 404 for a wrong token", async () => {
    const response = await GET(request("wrong-token"), { params: { code: "12345" } });
    expect(response.status).toBe(404);
  });

  it("returns the order for the right token without exposing that token", async () => {
    const response = await GET(
      request("0123456789abcdef0123456789abcdef"),
      { params: { code: "12345" } }
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.singleOrder.orderCode).toBe(12345);
    expect(body.singleOrder).not.toHaveProperty("accessToken");
  });

  it("returns the order to staff without a token", async () => {
    getApiSession.mockResolvedValue({ user: { id: "staff-id", role: "Admin" } });
    const response = await GET(request(), { params: { code: "12345" } });
    expect(response.status).toBe(200);
    expect((await response.json()).singleOrder).not.toHaveProperty("accessToken");
  });

  it("returns the order to its signed-in owner without a token", async () => {
    getApiSession.mockResolvedValue({ user: { id: "owner-id", role: "Customer" } });
    const response = await GET(request(), { params: { code: "12345" } });
    expect(response.status).toBe(200);
  });

  it("never token-matches a legacy order that has no token", async () => {
    selectOrder.mockResolvedValue(savedOrder({ accessToken: undefined }));
    const response = await GET(request("anything"), { params: { code: "12345" } });
    expect(response.status).toBe(404);
  });
});
