// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("@/app/api/auth/[...nextauth]/route", () => ({ authOptions: {} }));
vi.mock("@/app/utils/database", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/model/order.model", () => ({ default: { aggregate: vi.fn() } }));

import { getServerSession } from "next-auth";
import connectDB from "@/app/utils/database";
import Order from "@/app/backend/model/order.model";
import { GUEST_CUSTOMER_PIPELINE } from "@/app/backend/utils/guestCustomers";
import { GET } from "./route";

const session = (role) => ({ user: { id: "user-id", role } });
const at = (day) => new Date(`2026-11-${day}T10:00:00.000Z`);

beforeEach(() => vi.resetAllMocks());

describe("guest customers access", () => {
  it("rejects anonymous requests with 401 before touching the DB", async () => {
    getServerSession.mockResolvedValue(null);
    expect((await GET()).status).toBe(401);
    expect(connectDB).not.toHaveBeenCalled();
    expect(Order.aggregate).not.toHaveBeenCalled();
  });

  it.each(["Customer", "Driver", undefined])("rejects signed-in non-staff role %s with 403", async (role) => {
    getServerSession.mockResolvedValue(session(role));
    expect((await GET()).status).toBe(403);
    expect(connectDB).not.toHaveBeenCalled();
    expect(Order.aggregate).not.toHaveBeenCalled();
  });

  it("returns 500 without details when the aggregation fails", async () => {
    getServerSession.mockResolvedValue(session("Manager"));
    Order.aggregate.mockRejectedValue(new Error("db down: secret"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await GET();
    expect(response.status).toBe(500);
    expect(JSON.stringify(await response.json())).not.toContain("secret");
  });
});

describe("guest customer grouping", () => {
  it("only projects buyer fields in the aggregation (no tokens, cart or user docs)", () => {
    const text = JSON.stringify(GUEST_CUSTOMER_PIPELINE);
    expect(text).not.toMatch(/accessToken|password|clientToken|\$cart/);
  });

  it("merges Bengali digits, +88 and dashes into one buyer with summed totals", async () => {
    getServerSession.mockResolvedValue(session("Admin"));
    Order.aggregate.mockResolvedValue([
      {
        _id: "01712345678",
        name: { at: at("01"), value: "Rahim" },
        address: { at: at("01"), value: "Old address" },
        email: { at: at("01"), value: "rahim@example.com" },
        orderCount: 2, cancelledCount: 1, totalSpent: 330,
        firstOrderAt: at("01"), lastOrderAt: at("02"), registered: 0,
      },
      {
        _id: "+৮৮ ০১৭১২-৩৪৫৬৭৮",
        name: { at: at("04"), value: "Rahim Uddin" },
        address: { at: at("04"), value: "New address, Dhaka" },
        email: null,
        orderCount: 1, cancelledCount: 0, totalSpent: 180.5,
        firstOrderAt: at("04"), lastOrderAt: at("04"), registered: 1,
      },
      {
        _id: "8801812-345678",
        name: { at: at("03"), value: "Karim" },
        address: { at: at("03"), value: "Chattogram" },
        email: { at: at("03"), value: "2026-10-11t08:26:00.116z@anonymous.com" },
        orderCount: 1, cancelledCount: 1, totalSpent: 0,
        firstOrderAt: at("03"), lastOrderAt: at("03"), registered: 0,
      },
      { _id: " - ", orderCount: 5, totalSpent: 999, firstOrderAt: at("05"), lastOrderAt: at("05") },
    ]);

    const response = await GET();
    expect(response.status).toBe(200);
    expect(connectDB).toHaveBeenCalledOnce();
    expect(Order.aggregate).toHaveBeenCalledWith(GUEST_CUSTOMER_PIPELINE);
    const { customers } = await response.json();

    expect(customers).toEqual([
      {
        phone: "01712345678",
        name: "Rahim Uddin",
        address: "New address, Dhaka",
        email: "rahim@example.com",
        orderCount: 3,
        cancelledCount: 1,
        totalSpent: 510.5,
        firstOrderAt: at("01").toISOString(),
        lastOrderAt: at("04").toISOString(),
        registered: true,
      },
      {
        phone: "01812345678",
        name: "Karim",
        address: "Chattogram",
        email: "",
        orderCount: 1,
        cancelledCount: 1,
        totalSpent: 0,
        firstOrderAt: at("03").toISOString(),
        lastOrderAt: at("03").toISOString(),
        registered: false,
      },
    ]);
    expect(JSON.stringify(customers)).not.toMatch(/accessToken|password/);
  });

  it("excludes Cancel orders from spend in the pipeline", () => {
    const group = GUEST_CUSTOMER_PIPELINE.find((stage) => stage.$group).$group;
    expect(group.totalSpent.$sum.$cond[0].$in[1]).toContain("Cancel");
    expect(group.totalSpent.$sum.$cond[1]).toBe(0);
  });
});
