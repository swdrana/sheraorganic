import { describe, expect, it, vi } from "vitest";
import { buildOrderEmail } from "./orderEmail";

vi.mock("@/app/backend/model/user.model", () => ({ default: {} }));

const order = {
  orderCode: 10234,
  user_info: { name: "<b>Rahim</b>", contact: "017", address: "Dhaka" },
  cart: [
    { name: "Honey-500g", quantity: 2, price: 450 },
    { name: "🎁 রিভিউ গিফট: Ghee", quantity: 1, price: 0, isGift: true },
  ],
  subTotal: 900,
  shippingCost: 60,
  discount: 50,
  total: 910,
  paymentMethod: "cod",
};

describe("buildOrderEmail", () => {
  it("lists items, totals and the invoice link", () => {
    const { subject, html, text } = buildOrderEmail(order);
    expect(subject).toContain("#10234");
    expect(html).toContain("Honey-500g");
    expect(html).toContain("৳900");
    expect(html).toContain("-৳50");
    expect(html).toContain("৳910");
    expect(html).toContain("/invoice/10234");
    expect(html).toContain("ক্যাশ অন ডেলিভারি");
    expect(text).toContain("Honey-500g x 2: ৳900");
  });

  it("escapes customer-entered HTML", () => {
    const { html } = buildOrderEmail(order);
    expect(html).not.toContain("<b>Rahim</b>");
    expect(html).toContain("&lt;b&gt;Rahim&lt;/b&gt;");
  });

  it("hides the discount row when there is no discount", () => {
    const { html } = buildOrderEmail({ ...order, discount: 0 });
    expect(html).not.toContain("ডিসকাউন্ট");
  });
});
