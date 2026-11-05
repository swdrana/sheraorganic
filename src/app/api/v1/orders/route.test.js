// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/backend/utils/apiAuth", () => ({ getApiSession: vi.fn(), isStaff: vi.fn(), unauthorized: vi.fn() }));
vi.mock("@/app/utils/database", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/controllers/order.controller", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/model/order.model", () => ({ default: Object.assign(vi.fn(), { findOne: vi.fn() }) }));
vi.mock("@/app/backend/model/user.model", () => ({ default: { findById: vi.fn() } }));
vi.mock("@/app/backend/model/product.model", () => ({ default: { findById: vi.fn() } }));
vi.mock("@/app/backend/model/setting.model", () => ({ default: { findOne: vi.fn() } }));
vi.mock("@/app/data/cachedData", () => ({ CACHE_TAGS: { stats: "stats" } }));
vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));
vi.mock("@/app/backend/utils/orderEmail", () => ({ sendOrderConfirmation: vi.fn() }));

import { getApiSession } from "@/app/backend/utils/apiAuth";
import connectDB from "@/app/utils/database";
import getNextOrderCode from "@/app/backend/controllers/order.controller";
import Order from "@/app/backend/model/order.model";
import User from "@/app/backend/model/user.model";
import Product from "@/app/backend/model/product.model";
import Setting from "@/app/backend/model/setting.model";
import { revalidateTag } from "next/cache";
import { sendOrderConfirmation } from "@/app/backend/utils/orderEmail";
import { POST } from "./route";

const save = vi.fn();
const orderData = () => ({
  user: "not-a-valid-user-id",
  clientToken: "checkout-token",
  cart: [{ _id: "product-id", name: "Product", quantity: 1, price: 250 }],
  user_info: { name: "Customer", contact: "+৮৮ (০১৭১২) ৩৪৫-৬৭৮", address: "Dhaka" },
  subTotal: 250, shippingCost: 80, discount: 0, taxes: 0, total: 330,
  shippingOption: "80", paymentMethod: "cod", status: "Pending",
});
const request = (data) => ({ json: async () => data });

beforeEach(() => {
  vi.resetAllMocks();
  getApiSession.mockResolvedValue(null);
  getNextOrderCode.mockResolvedValue(12345);
  Order.mockImplementation(function (data) {
    Object.assign(this, data);
    this.save = save;
    this.toObject = () => data;
  });
});

describe("order creation", () => {
  it("creates a guest order without trusting a body user id or touching review gifts", async () => {
    const data = orderData();
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    const { order } = await response.json();
    expect(order.orderCode).toBe(12345);
    expect(order.user).toBeUndefined();
    expect(order.user_info).toEqual({ ...data.user_info, contact: "01712345678", email: "" });
    expect(order.cart).toEqual(data.cart);
    for (const key of ["subTotal", "shippingCost", "discount", "taxes", "total", "shippingOption", "paymentMethod", "status"]) {
      expect(order[key]).toBe(data[key]);
    }
    expect(User.findById).not.toHaveBeenCalled();
    expect(Setting.findOne).not.toHaveBeenCalled();
    expect(save).toHaveBeenCalledOnce();
    expect(revalidateTag).toHaveBeenCalledWith("stats");
    expect(sendOrderConfirmation).toHaveBeenCalledOnce();
  });

  it("assigns the session owner and redeems only their gift even with a different body user", async () => {
    getApiSession.mockResolvedValue({ user: { id: "session-user" } });
    Setting.findOne.mockReturnValue({ sort: async () => ({ setting: { home: { review_gift_enabled: true } } }) });
    const pending = { productId: "gift-product", redeemed: false };
    const userSave = vi.fn();
    User.findById.mockResolvedValue({ pendingGifts: [pending], save: userSave });
    Product.findById.mockResolvedValue({ _id: "gift-product", name: "Gift", image: [] });
    const response = await POST(request(orderData()));
    expect(response.status).toBe(201);
    const { order } = await response.json();
    expect(order.user).toBe("session-user");
    expect(User.findById).toHaveBeenCalledOnce();
    expect(User.findById).toHaveBeenCalledWith("session-user");
    expect(order.cart[0]).toMatchObject({ isGift: true, price: 0, quantity: 1 });
    expect(order.cart.slice(1)).toEqual(orderData().cart);
    expect(pending).toMatchObject({ redeemed: true, redeemedOrderCode: 12345 });
    expect(userSave).toHaveBeenCalledOnce();
  });

  it("keeps logged-in ownership when no body user is supplied", async () => {
    getApiSession.mockResolvedValue({ user: { id: "session-user" } });
    Setting.findOne.mockReturnValue({ sort: async () => null });
    const data = orderData();
    delete data.user;
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect((await response.json()).order.user).toBe("session-user");
  });

  it.each(["01212345678", "0171234567", "017123456789", "not-a-phone", "", null])(
    "rejects invalid phone %s before DB/cache/email side effects", async (contact) => {
      const data = orderData();
      data.user_info.contact = contact;
      const response = await POST(request(data));
      expect(response.status).toBe(400);
      expect((await response.json()).message).toMatch(/[\u0980-\u09FF]/);
      expect(connectDB).not.toHaveBeenCalled();
      expect(Order.findOne).not.toHaveBeenCalled();
      expect(getNextOrderCode).not.toHaveBeenCalled();
      expect(Order).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
      expect(revalidateTag).not.toHaveBeenCalled();
      expect(sendOrderConfirmation).not.toHaveBeenCalled();
    }
  );

  it.each([undefined, "", "invalid-email", "a@b", "<a>@example.com", 123])("stores optional/invalid email %s as empty", async (email) => {
    const data = orderData();
    data.user_info.email = email;
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect((await response.json()).order.user_info.email).toBe("");
  });

  it("preserves a valid trimmed email", async () => {
    const data = orderData();
    data.user_info.email = " customer@example.test ";
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect((await response.json()).order.user_info.email).toBe("customer@example.test");
  });

  it.each([null, undefined])("does not save or redeem gifts without an order code (%s)", async (code) => {
    getApiSession.mockResolvedValue({ user: { id: "session-user" } });
    getNextOrderCode.mockResolvedValue(code);
    const response = await POST(request(orderData()));
    expect(response.status).toBe(500);
    expect(Order).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
    expect(Setting.findOne).not.toHaveBeenCalled();
    expect(User.findById).not.toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(sendOrderConfirmation).not.toHaveBeenCalled();
  });

  it("returns the existing order on a retry without saving, redeeming or emailing again", async () => {
    Order.findOne.mockResolvedValue({ orderCode: 12345 });
    const response = await POST(request(orderData()));
    expect(response.status).toBe(200);
    expect((await response.json()).order.orderCode).toBe(12345);
    expect(Order.findOne).toHaveBeenCalledWith({ clientToken: "checkout-token" });
    expect(getNextOrderCode).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
    expect(User.findById).not.toHaveBeenCalled();
    expect(sendOrderConfirmation).not.toHaveBeenCalled();
  });
});
