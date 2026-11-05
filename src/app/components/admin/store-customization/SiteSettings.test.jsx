import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { toast } from "react-toastify";
import SiteSettings from "./SiteSettings";
const fixture = vi.hoisted(() => ({ setting: { brand: { site_name: "Tech shop", decoration_theme: "tech" }, tracking: { enabled: false } }, settingLoading: false }));
vi.mock("@/app/components/store/dataFetching/useSetting", () => ({ default: () => fixture }));
vi.mock("react-toastify", () => ({ toast: { error: vi.fn() } }));
vi.mock("../imageUploader/Uploader", () => ({ default: () => <div>Image uploader</div> }));
vi.mock("@/app/components/store/dataFetching/sharedFetch", () => ({ forgetShared: vi.fn() }));
afterEach(() => vi.unstubAllGlobals());
describe("Site Settings form", () => {
  it("edits all brand fields and submits only the brand group with session credentials", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true }); vi.stubGlobal("fetch", fetch);
    render(<SiteSettings group="brand" />);
    fireEvent.change(screen.getByLabelText("সাইটের নাম"), { target: { value: "Changed shop" } });
    expect(screen.getAllByText("Image uploader")).toHaveLength(2);
    expect(screen.getByLabelText("সাজসজ্জার ধরন")).toHaveValue("tech");
    expect(screen.getByLabelText("পণ্যের পাশের ব্যানার দেখান")).not.toBeChecked();
    const loginToggle = screen.getByLabelText("ক্রেতাদের Login/Registration দেখান");
    expect(loginToggle).toBeChecked();
    fireEvent.click(loginToggle);
    fireEvent.click(screen.getByRole("button", { name: "সেভ করুন" }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const options = fetch.mock.calls[0][1];
    expect(options.credentials).toBe("include");
    const { setting } = JSON.parse(options.body);
    expect(Object.keys(setting)).toEqual(["brand"]);
    expect(setting.brand.site_name).toBe("Changed shop");
    expect(setting.brand.customer_login).toBe(false);
    expect(await screen.findByText("সেভ হয়েছে।")).toBeInTheDocument();
  });
  it("renders every tracking ID with hints and preserves the disabled switch", async () => {
    const fetch = vi.fn().mockResolvedValue({ ok: true }); vi.stubGlobal("fetch", fetch);
    render(<SiteSettings group="tracking" />);
    expect(screen.getByRole("switch")).not.toBeChecked();
    expect(screen.getByLabelText("fb_pixel_id10–20 digits")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("gtm_idGTM-ABC1234"), { target: { value: "GTM-ABC1234" } });
    fireEvent.click(screen.getByRole("button", { name: "সেভ করুন" }));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const { setting } = JSON.parse(fetch.mock.calls[0][1].body);
    expect(Object.keys(setting)).toEqual(["tracking"]);
    expect(setting.tracking.enabled).toBe(false);
  });
});

it.each(["brand", "tracking"])("shows server validation fields in the %s form AND an error toast without claiming success", async (group) => {
  const invalidFields = [group === "brand" ? "brand.whatsapp_number" : "tracking.gtm_id"];
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 400, json: async () => ({ message: "Invalid settings fields", invalidFields }) }));
  render(<SiteSettings group={group} />);
  fireEvent.click(screen.getByRole("button", { name: "সেভ করুন" }));
  await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent(invalidFields[0]));
  expect(toast.error).toHaveBeenCalledWith(`সঠিক মান দিন: ${invalidFields[0]}`);
  expect(screen.queryByText("সেভ হয়েছে।")).not.toBeInTheDocument();
});
