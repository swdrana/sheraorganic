// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/app/backend/utils/apiAuth", () => ({ getApiSession: vi.fn(), isStaff: vi.fn(), unauthorized: vi.fn() }));
vi.mock("@/app/utils/database", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/controllers/order.controller", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/model/order.model", () => ({ default: Object.assign(vi.fn(), { findOne: vi.fn() }) }));
vi.mock("@/app/backend/model/user.model", () => ({ default: { findById: vi.fn() } }));
vi.mock("@/app/backend/model/product.model", () => ({ default: { findById: vi.fn() } }));
vi.mock("@/app/backend/model/coupon.model", () => ({ default: { findOne: vi.fn() } }));
vi.mock("@/app/backend/model/setting.model", () => ({ default: { findOne: vi.fn() } }));
vi.mock("@/app/backend/model/attributes.model", () => ({ default: { find: vi.fn() } }));
vi.mock("@/app/data/cachedData", () => ({ CACHE_TAGS: { stats: "stats" } }));
vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));
vi.mock("@/app/backend/utils/orderEmail", () => ({ sendOrderConfirmation: vi.fn() }));

import { getApiSession } from "@/app/backend/utils/apiAuth";
import connectDB from "@/app/utils/database";
import getNextOrderCode from "@/app/backend/controllers/order.controller";
import Order from "@/app/backend/model/order.model";
import User from "@/app/backend/model/user.model";
import Product from "@/app/backend/model/product.model";
import Coupon from "@/app/backend/model/coupon.model";
import Setting from "@/app/backend/model/setting.model";
import Attribute from "@/app/backend/model/attributes.model";
import { revalidateTag } from "next/cache";
import { sendOrderConfirmation } from "@/app/backend/utils/orderEmail";
import { POST } from "./route";

const save = vi.fn();
const selectExistingOrder = vi.fn();
const product = () => ({
  _id: "product-id",
  name: "Product",
  image: ["product.jpg"],
  prices: { price: 250, originalPrice: 300, discount: 50 },
  variants: [],
});
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
  Product.findById.mockResolvedValue(product());
  Coupon.findOne.mockResolvedValue(null);
  Order.findOne.mockReturnValue({ select: selectExistingOrder });
  selectExistingOrder.mockResolvedValue(null);
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
    expect(order.cart[0]).toMatchObject({
      _id: "product-id", quantity: 1, price: 250, itemTotal: 250,
      prices: { price: 250, originalPrice: 300, discount: 50 },
    });
    expect(order.accessToken).toMatch(/^[a-f0-9]{32}$/);
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
    Product.findById.mockImplementation(async (id) =>
      id === "gift-product"
        ? { _id: "gift-product", name: "Gift", image: [] }
        : product()
    );
    const response = await POST(request(orderData()));
    expect(response.status).toBe(201);
    const { order } = await response.json();
    expect(order.user).toBe("session-user");
    expect(User.findById).toHaveBeenCalledOnce();
    expect(User.findById).toHaveBeenCalledWith("session-user");
    expect(order.cart[0]).toMatchObject({ isGift: true, price: 0, quantity: 1 });
    expect(order.cart.slice(1)[0]).toMatchObject({ _id: "product-id", price: 250 });
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

  it("ignores browser prices and saves the database price", async () => {
    const data = orderData();
    data.cart[0].price = 1;
    data.cart[0].prices = { price: 1, originalPrice: 1 };
    data.subTotal = 1;
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    const { order } = await response.json();
    expect(order.subTotal).toBe(250);
    expect(order.total).toBe(330);
    expect(order.cart[0]).toMatchObject({ price: 250, itemTotal: 250 });
  });

  it("uses the matching database variant price", async () => {
    Product.findById.mockResolvedValue({
      ...product(),
      variants: [
        {
          colorAttributeId: "green-option-id",
          productId: "variant-sku-1",
          price: 325,
          originalPrice: 350,
          discount: 25,
        },
      ],
    });
    const data = orderData();
    data.cart[0].variant = {
      colorAttributeId: "green-option-id",
      productId: "variant-sku-1",
      price: 1,
    };
    data.cart[0].price = 1;
    data.subTotal = 1;
    data.total = 405;
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    const { order } = await response.json();
    expect(order.cart[0].price).toBe(325);
    expect(order.cart[0].variant.price).toBe(325);
    expect(order.subTotal).toBe(325);
    expect(order.total).toBe(405);
  });

  it("matches variants by option values even when generated productIds repeat", async () => {
    Product.findById.mockResolvedValue({
      ...product(),
      variants: [
        { colorAttributeId: "red-option-id", productId: "dup-sku", price: 300 },
        { colorAttributeId: "green-option-id", productId: "dup-sku", price: 325 },
      ],
    });
    const data = orderData();
    data.cart[0].variant = { colorAttributeId: "green-option-id", productId: "dup-sku" };
    data.total = 405;
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect((await response.json()).order.cart[0].price).toBe(325);
  });

  it("rejects a browser total that differs from the server total and returns current prices", async () => {
    const data = orderData();
    data.cart[0].id = "product-id";
    data.cart[0].price = 1;
    data.subTotal = 1;
    data.total = 81;
    const response = await POST(request(data));
    expect(response.status).toBe(409);
    const body = await response.json();
    expect(body.message).toMatch(/নতুন দাম/);
    expect(body.currentPrices).toEqual({ "product-id": 250 });
    expect(Order).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });

  it("always creates the order as Pending", async () => {
    const data = orderData();
    data.status = "Delivered";
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect((await response.json()).order.status).toBe("Pending");
  });

  it("rejects shipping outside the checkout choices", async () => {
    const data = orderData();
    data.shippingCost = 1;
    data.shippingOption = "1";
    data.total = 251;
    const response = await POST(request(data));
    expect(response.status).toBe(400);
    expect(Order).not.toHaveBeenCalled();
    expect(Product.findById).not.toHaveBeenCalled();
  });

  it("rejects a missing product without writing an order", async () => {
    Product.findById.mockResolvedValue(null);
    const response = await POST(request(orderData()));
    expect(response.status).toBe(400);
    expect((await response.json()).message).toMatch(/পণ্য/);
    expect(Order).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
  });

  it("applies an active coupon from the database", async () => {
    Coupon.findOne.mockResolvedValue({
      couponCode: "SAVE10",
      discountPercentage: 10,
      endTime: new Date(Date.now() + 60_000),
    });
    const data = orderData();
    data.couponCode = "save10";
    data.discount = 999;
    data.total = 305;
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    const { order } = await response.json();
    expect(order.discount).toBe(25);
    expect(order.total).toBe(305);
    expect(Coupon.findOne).toHaveBeenCalledWith({
      couponCode: { $regex: "^save10$", $options: "i" },
    });
  });

  it("treats an expired coupon as no discount", async () => {
    Coupon.findOne.mockResolvedValue({
      discountPercentage: 10,
      endTime: new Date(Date.now() - 60_000),
    });
    const data = orderData();
    data.couponCode = "OLD10";
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect((await response.json()).order.discount).toBe(0);
  });

  it.each([0, 1.5, 1000])("rejects invalid quantity %s", async (quantity) => {
    const data = orderData();
    data.cart[0].quantity = quantity;
    const response = await POST(request(data));
    expect(response.status).toBe(400);
    expect(Order).not.toHaveBeenCalled();
  });

  it("rejects payment methods not offered by checkout", async () => {
    const data = orderData();
    data.paymentMethod = "card";
    const response = await POST(request(data));
    expect(response.status).toBe(400);
    expect(Order).not.toHaveBeenCalled();
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
    selectExistingOrder.mockResolvedValue({
      orderCode: 12345,
      accessToken: "same-private-token",
    });
    const response = await POST(request(orderData()));
    expect(response.status).toBe(200);
    expect((await response.json()).order).toMatchObject({
      orderCode: 12345,
      accessToken: "same-private-token",
    });
    expect(Order.findOne).toHaveBeenCalledWith({ clientToken: "checkout-token" });
    expect(selectExistingOrder).toHaveBeenCalledWith("+accessToken");
    expect(getNextOrderCode).not.toHaveBeenCalled();
    expect(save).not.toHaveBeenCalled();
    expect(User.findById).not.toHaveBeenCalled();
    expect(sendOrderConfirmation).not.toHaveBeenCalled();
  });

  it("builds saved lines from the database product, not browser-supplied fields", async () => {
    Product.findById.mockResolvedValue({
      toObject: () => ({
        _id: "product-id",
        name: "Real honey",
        slug: "real-honey",
        image: ["real.jpg"],
        prices: { price: 250, originalPrice: 300, discount: 50 },
        variants: [],
        ratings: [{ rating: 5, comment: "x" }],
        description: "<p>long</p>",
        slugHistory: ["old"],
        __v: 3,
      }),
      _id: "product-id",
      name: "Real honey",
      prices: { price: 250, originalPrice: 300, discount: 50 },
      variants: [],
    });
    const data = orderData();
    Object.assign(data.cart[0], {
      id: "client-line-id",
      name: "Fake name",
      image: ["https://evil.example/fake.jpg"],
      slug: "fake-slug",
      isGift: true,
      junk: "x".repeat(10_000),
    });
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    const line = (await response.json()).order.cart[0];
    expect(line).toMatchObject({
      _id: "product-id",
      id: "client-line-id",
      name: "Real honey",
      slug: "real-honey",
      image: ["real.jpg"],
      quantity: 1,
      price: 250,
      itemTotal: 250,
    });
    for (const key of ["isGift", "junk", "ratings", "description", "slugHistory", "__v"]) {
      expect(line).not.toHaveProperty(key);
    }
  });

  it("falls back to the product id as the line id and still keys 409 prices by the client id", async () => {
    const data = orderData();
    const response = await POST(request(data));
    expect((await response.json()).order.cart[0].id).toBe("product-id");

    const stale = orderData();
    stale.cart[0].id = "product-id-variant-a";
    stale.total = 1;
    const conflict = await POST(request(stale));
    expect(conflict.status).toBe(409);
    expect((await conflict.json()).currentPrices).toEqual({ "product-id-variant-a": 250 });
  });

  it("names a multi-variant line from database attribute option names", async () => {
    const attrId = "64b000000000000000000001";
    const optionId = "64b0000000000000000000aa";
    Product.findById.mockResolvedValue({
      ...product(),
      variants: [
        { [attrId]: "64b0000000000000000000bb", price: 200 },
        { [attrId]: optionId, price: 250 },
      ],
    });
    const lean = vi.fn().mockResolvedValue([
      { _id: attrId, variants: [{ _id: "64b0000000000000000000bb", name: "250g" }, { _id: optionId, name: "500g" }] },
    ]);
    Attribute.find.mockReturnValue({ sort: () => ({ lean }) });
    const data = orderData();
    data.cart[0].variant = { [attrId]: optionId };
    data.cart[0].name = "Anything";
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect((await response.json()).order.cart[0]).toMatchObject({ name: "Product-500g", price: 250 });
    expect(Attribute.find).toHaveBeenCalledWith({ _id: { $in: [attrId] } });
  });

  it("ignores a non-string clientToken instead of using it as a query", async () => {
    const data = orderData();
    data.clientToken = { $ne: null };
    const response = await POST(request(data));
    expect(response.status).toBe(201);
    expect(Order.findOne).not.toHaveBeenCalled();
    expect((await response.json()).order.clientToken).toBeUndefined();
  });

  it("returns the winning order when a simultaneous submit hits the clientToken unique index", async () => {
    save.mockRejectedValue(Object.assign(new Error("E11000 duplicate key error index: clientToken_unique"), {
      code: 11000, keyPattern: { clientToken: 1 }, keyValue: { clientToken: "checkout-token" },
    }));
    selectExistingOrder
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ orderCode: 777, accessToken: "winner-token" });
    const response = await POST(request(orderData()));
    expect(response.status).toBe(200);
    expect((await response.json()).order).toMatchObject({ orderCode: 777, accessToken: "winner-token" });
    expect(Order.findOne).toHaveBeenCalledTimes(2);
    expect(selectExistingOrder).toHaveBeenLastCalledWith("+accessToken");
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(sendOrderConfirmation).not.toHaveBeenCalled();
  });

  it("does not redeem a review gift when the order save loses the race", async () => {
    getApiSession.mockResolvedValue({ user: { id: "session-user" } });
    Setting.findOne.mockReturnValue({ sort: async () => ({ setting: { home: { review_gift_enabled: true } } }) });
    const pending = { productId: "gift-product", redeemed: false };
    const userSave = vi.fn();
    User.findById.mockResolvedValue({ pendingGifts: [pending], save: userSave });
    Product.findById.mockImplementation(async (id) =>
      id === "gift-product" ? { _id: "gift-product", name: "Gift", image: [] } : product()
    );
    save.mockRejectedValue(Object.assign(new Error("E11000"), { code: 11000, keyPattern: { clientToken: 1 } }));
    selectExistingOrder
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ orderCode: 777, accessToken: "winner-token" });
    const response = await POST(request(orderData()));
    expect(response.status).toBe(200);
    expect(pending.redeemed).toBe(false);
    expect(pending.redeemedOrderCode).toBeUndefined();
    expect(userSave).not.toHaveBeenCalled();
  });

  it("returns 500 for other save errors without redeeming a gift", async () => {
    getApiSession.mockResolvedValue({ user: { id: "session-user" } });
    Setting.findOne.mockReturnValue({ sort: async () => ({ setting: { home: { review_gift_enabled: true } } }) });
    const pending = { productId: "gift-product", redeemed: false };
    const userSave = vi.fn();
    User.findById.mockResolvedValue({ pendingGifts: [pending], save: userSave });
    Product.findById.mockImplementation(async (id) =>
      id === "gift-product" ? { _id: "gift-product", name: "Gift", image: [] } : product()
    );
    save.mockRejectedValue(new Error("db down"));
    const response = await POST(request(orderData()));
    expect(response.status).toBe(500);
    expect(pending.redeemed).toBe(false);
    expect(userSave).not.toHaveBeenCalled();
  });
});
