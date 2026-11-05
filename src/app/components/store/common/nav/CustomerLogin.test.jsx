import React from "react";
import { render, screen } from "@testing-library/react";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";
import Footer from "./Footer";
import Offcanvas from "./Offcanvas";

vi.stubGlobal("React", React);
afterAll(() => vi.unstubAllGlobals());
const fixture = vi.hoisted(() => ({ setting: { home: {}, brand: {} }, settingLoading: false }));
vi.mock("../../dataFetching/useSetting", () => ({ default: () => fixture }));
vi.mock("../../dataFetching/useCategory", () => ({ default: () => ({ categorys: [] }) }));
vi.mock("./FooterNav", () => ({ default: () => null }));
vi.mock("../../theme/Decor", () => ({ default: () => null }));
vi.mock("@/app/components/store/theme/Decor", () => ({ default: () => null }));
vi.mock("react-toastify", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("next-auth/react", () => ({ useSession: () => ({ data: null, status: "unauthenticated" }), signOut: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("react-use-cart", () => ({ useCart: () => ({ totalItems: 0 }) }));
vi.mock("../../provider/MainContextStore", () => ({ useMainContext: () => ({ openOffcanvas: true, setOpenOffcanvas: vi.fn() }) }));

describe("customer login links", () => {
  beforeEach(() => { fixture.setting = { home: {}, brand: {} }; });

  it("are shown by default (existing stores unchanged)", () => {
    render(<><Footer /><Offcanvas /></>);
    expect(screen.getByRole("link", { name: "Log In" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sing Up" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Registration" })).toBeInTheDocument();
  });

  it("are hidden for guests when the admin turns customer login off", () => {
    fixture.setting = { home: {}, brand: { customer_login: false } };
    render(<><Footer /><Offcanvas /></>);
    for (const name of ["Log In", "Sing Up", "Login", "Registration"]) {
      expect(screen.queryByRole("link", { name })).not.toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: "Checkout" })).toBeInTheDocument();
  });
});
