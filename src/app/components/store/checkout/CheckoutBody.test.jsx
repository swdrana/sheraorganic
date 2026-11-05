import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import CheckoutBody from "./CheckoutBody";
import { createOrder } from "@/app/controlers/order.controler";
import { getUserById, updateUserProfile } from "@/app/controlers/user.controler";
import { notifyError } from "@/app/utils/toast";

vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());
const mocks = vi.hoisted(() => ({
  session: { data: null, status: "unauthenticated" },
  push: vi.fn(), emptyCart: vi.fn(),
}));
vi.mock("@/app/components/store/theme/Decor", () => ({ default: () => null }));
vi.mock("@/app/controlers/order.controler", () => ({ createOrder: vi.fn() }));
vi.mock("@/app/controlers/user.controler", () => ({ getUserById: vi.fn(), updateUserProfile: vi.fn() }));
vi.mock("@/app/backend/controllers/coupon.controller", () => ({ getAllCoupons: async () => [] }));
vi.mock("@/app/utilities/facebookPixel", () => ({ InitiateCheckout: vi.fn(), Purchase: vi.fn() }));
vi.mock("@/app/utils/toast", () => ({ notifyError: vi.fn() }));
vi.mock("next-auth/react", () => ({ useSession: () => mocks.session }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock("react-use-cart", () => ({ useCart: () => ({
  items: [{ id: "product-id", quantity: 1, price: 250 }], cartTotal: 250,
  emptyCart: mocks.emptyCart,
}) }));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.session = { data: null, status: "unauthenticated" };
  createOrder.mockResolvedValue({ order: { orderCode: 12345 } });
});

const fillGuestForm = (phone = "০১৭১২-৩৪৫৬৭৮") => {
  fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "Customer" } });
  fireEvent.change(screen.getByLabelText("Phone"), { target: { value: phone } });
  fireEvent.change(screen.getByPlaceholderText("Street Address"), { target: { value: "Dhaka" } });
  fireEvent.click(screen.getByLabelText(/ঢাকার ভেতর/));
};

describe("checkout validation and order feedback", () => {
  it("submits normalized guest phone with email left empty", async () => {
    render(React.createElement(CheckoutBody));
    expect(screen.getByLabelText("Phone")).toHaveAttribute("inputmode", "tel");
    expect(screen.getByLabelText("Email (ঐচ্ছিক)")).not.toBeRequired();
    fillGuestForm();
    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));
    await waitFor(() => expect(createOrder).toHaveBeenCalledOnce());
    expect(createOrder.mock.calls[0][0]).toMatchObject({
      user: undefined, user_info: { contact: "01712345678", email: "" }, total: 330,
    });
    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/thank-you/12345"));
    expect(mocks.emptyCart).toHaveBeenCalledOnce();
    expect(updateUserProfile).not.toHaveBeenCalled();
  });

  it("shows Bengali validation below an invalid phone and does not submit", async () => {
    render(React.createElement(CheckoutBody));
    fillGuestForm("01212345678");
    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));
    const error = await screen.findByText("সঠিক বাংলাদেশি মোবাইল নম্বর দিন।");
    expect(error.parentElement).toBe(screen.getByLabelText("Phone").parentElement);
    expect(createOrder).not.toHaveBeenCalled();
  });

  it("rejects a non-empty malformed email", async () => {
    render(React.createElement(CheckoutBody));
    fillGuestForm();
    fireEvent.change(screen.getByLabelText("Email (ঐচ্ছিক)"), { target: { value: "bad-email" } });
    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));
    expect(await screen.findByText("সঠিক ইমেইল ঠিকানা দিন।")).toBeInTheDocument();
    expect(createOrder).not.toHaveBeenCalled();
  });

  it.each([
    [{ error: "অর্ডার নম্বর তৈরি হয়নি। আবার চেষ্টা করুন।" }, "অর্ডার নম্বর তৈরি হয়নি। আবার চেষ্টা করুন।"],
    [null, "অর্ডার সম্পন্ন হয়নি।"],
  ])("shows server feedback or fallback and keeps cart for retry", async (response, message) => {
    createOrder.mockResolvedValue(response);
    render(React.createElement(CheckoutBody));
    fillGuestForm();
    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));
    await waitFor(() => expect(notifyError).toHaveBeenCalledWith(message));
    expect(screen.getByRole("button", { name: "Place Order" })).toBeEnabled();
    expect(mocks.emptyCart).not.toHaveBeenCalled();
    expect(mocks.push).not.toHaveBeenCalled();
  });

  it("retains logged-in profile loading, profile update and checkout redirect", async () => {
    mocks.session = { data: { user: { id: "session-user" } }, status: "authenticated" };
    getUserById.mockResolvedValue({ name: "Customer", contact: "01712-345678", email: "customer@example.test", address: "Dhaka" });
    render(React.createElement(CheckoutBody));
    await waitFor(() => expect(screen.getByLabelText("Phone")).toHaveValue("01712-345678"));
    fireEvent.click(screen.getByLabelText(/ঢাকার ভেতর/));
    fireEvent.click(screen.getByRole("button", { name: "Place Order" }));
    await waitFor(() => expect(mocks.push).toHaveBeenCalledWith("/thank-you/12345"));
    expect(createOrder.mock.calls[0][0]).toMatchObject({ user_info: { email: "customer@example.test", contact: "01712345678" } });
    expect(updateUserProfile).toHaveBeenCalledWith("session-user", { name: "Customer", contact: "01712345678", address: "Dhaka" });
  });
});
