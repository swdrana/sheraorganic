import React from "react";
import { render, screen } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import FooterNav from "./FooterNav";
import ThankYou from "../../order/ThankYou";

vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());
const fixture = vi.hoisted(() => ({ setting: { brand: {} }, session: { data: null } }));
vi.mock("../../dataFetching/useSetting", () => ({ default: () => ({ setting: fixture.setting }) }));
vi.mock("next-auth/react", () => ({ useSession: () => fixture.session }));
vi.mock("react-use-cart", () => ({ useCart: () => ({ totalItems: 0, cartTotal: 0 }) }));
vi.mock("../../provider/MainContextStore", () => ({ useMainContext: () => ({ setOpenCategoryDrawer: vi.fn(), setOpenCartDrawer: vi.fn() }) }));

describe("Profile links (mobile bar + thank-you)", () => {
  beforeEach(() => { fixture.setting = { brand: {} }; fixture.session = { data: null }; });

  it("show by default", () => {
    render(<><FooterNav /><ThankYou orderCode="123" /></>);
    expect(screen.getAllByRole("link", { name: /Profile/ })).toHaveLength(2);
  });

  it("hide for guests when customer login is off, keeping the order link", () => {
    fixture.setting = { brand: { customer_login: false } };
    render(<><FooterNav /><ThankYou orderCode="123" /></>);
    expect(screen.queryByRole("link", { name: /Profile/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View Order" })).toHaveAttribute("href", "/invoice/123");
  });

  it("stay for a signed-in customer even when off", () => {
    fixture.setting = { brand: { customer_login: false } };
    fixture.session = { data: { user: { email: "a@b.c" } } };
    render(<><FooterNav /><ThankYou orderCode="123" /></>);
    expect(screen.getAllByRole("link", { name: /Profile/ })).toHaveLength(2);
  });
});
