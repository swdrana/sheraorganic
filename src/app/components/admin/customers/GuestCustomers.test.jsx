import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import GuestCustomers from "./GuestCustomers";

vi.mock("../loader/TableLoading", () => ({ default: () => <div>Loading</div> }));

const customers = [
  {
    phone: "01712345678", name: "Rahim Uddin", address: "Dhaka", email: "",
    orderCount: 3, cancelledCount: 1, totalSpent: 1510.5,
    firstOrderAt: "2026-11-01T10:00:00.000Z", lastOrderAt: "2026-11-04T10:00:00.000Z", registered: false,
  },
  {
    phone: "01812345678", name: "Karim", address: "Chattogram", email: "karim@example.com",
    orderCount: 1, cancelledCount: 0, totalSpent: 180,
    firstOrderAt: "2026-11-03T10:00:00.000Z", lastOrderAt: "2026-11-03T10:00:00.000Z", registered: true,
  },
];

const table = () => screen.getByRole("table");
const rowNames = () =>
  within(table()).queryAllByRole("row").slice(1).map((row) => within(row).getAllByRole("cell")[0].textContent);

afterEach(() => vi.unstubAllGlobals());

describe("Guest customers view", () => {
  it("loads buyers with the session cookie and shows Bengali labels, totals and type", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ customers }) });
    vi.stubGlobal("fetch", fetch);
    render(<GuestCustomers />);

    expect(await screen.findByText(/মোট 2 জন ক্রেতা · অতিথি 1 জন/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      "/api/v1/orders/guest-customers",
      expect.objectContaining({ credentials: "include", cache: "no-store" })
    );
    expect(within(table()).getByText("মোট কেনা")).toBeInTheDocument();
    expect(rowNames()).toEqual(["Rahim Uddin", "Karim"]);
    const rahim = within(table()).getAllByRole("row")[1];
    expect(within(rahim).getByText("৳1,510.5")).toBeInTheDocument();
    expect(within(rahim).getByText("অতিথি")).toBeInTheDocument();
    expect(within(rahim).getByRole("link", { name: "01712345678" })).toHaveAttribute("href", "tel:01712345678");
    expect(screen.getAllByTestId("guest-card")).toHaveLength(2);
  });

  it("searches by name and by phone in Bengali digits or with +88, and filters guests only", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ customers }) }));
    render(<GuestCustomers />);
    const search = await screen.findByLabelText("নাম বা ফোন নম্বর দিয়ে খুঁজুন");

    fireEvent.change(search, { target: { value: "karim" } });
    expect(rowNames()).toEqual(["Karim"]);
    fireEvent.change(search, { target: { value: "+৮৮০১৭১২-৩৪৫" } });
    expect(rowNames()).toEqual(["Rahim Uddin"]);
    fireEvent.change(search, { target: { value: "nobody" } });
    expect(screen.getByText("কোনো ক্রেতা পাওয়া যায়নি।")).toBeInTheDocument();

    fireEvent.change(search, { target: { value: "" } });
    fireEvent.click(screen.getByLabelText("শুধু অতিথি ক্রেতা"));
    expect(rowNames()).toEqual(["Rahim Uddin"]);
  });

  it("shows an error message when the request fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401 }));
    render(<GuestCustomers />);
    expect(await screen.findByRole("alert")).toHaveTextContent("ক্রেতাদের তথ্য আনা যায়নি");
  });
});
