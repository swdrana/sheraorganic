// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ session: vi.fn(), findOne: vi.fn(), write: vi.fn(), connect: vi.fn(), images: vi.fn(), tag: vi.fn(), path: vi.fn(), cached: vi.fn() }));
vi.mock("next-auth", () => ({ getServerSession: mocks.session }));
vi.mock("@/app/api/auth/[...nextauth]/route", () => ({ authOptions: {} }));
vi.mock("@/app/backend/model/setting.model", () => ({ default: { findOne: mocks.findOne, findOneAndUpdate: mocks.write } }));
vi.mock("@/app/utils/database", () => ({ default: mocks.connect }));
vi.mock("@/app/backend/utils/cloudinaryServer", () => ({ destroyImages: mocks.images, diffRemoved: (old, next) => old && old !== next ? [old] : [] }));
vi.mock("@/app/data/cachedData", () => ({ getCachedSettingDoc: mocks.cached }));
vi.mock("next/cache", () => ({ revalidateTag: mocks.tag, revalidatePath: mocks.path }));
import { GET, POST, PATCH } from "./route";
const req = (setting) => ({ json: async () => ({ setting }) });
beforeEach(() => {
  vi.clearAllMocks();
  mocks.findOne.mockReturnValue({ sort: async () => ({ setting: { home: { logo: "old-home" }, brand: { og_image: "old-og" } } }) });
});
describe("settings API", () => {
  it("keeps GET public", async () => {
    expect((await GET()).status).toBe(200);
    expect(mocks.session).not.toHaveBeenCalled();
  });
  it.each([POST, PATCH])("blocks anonymous and customers before DB work", async (handler) => {
    for (const session of [null, { user: { role: "Customer" } }]) {
      mocks.session.mockResolvedValue(session);
      expect((await handler(req({ brand: { site_name: "x" } }))).status).toBe(401);
    }
    expect(mocks.write).not.toHaveBeenCalled();
    expect(mocks.connect).not.toHaveBeenCalled();
  });
  it.each([POST, PATCH])("uses leaf updates on both methods, invalidates cache, leaves unrelated images alone", async (handler) => {
    mocks.session.mockResolvedValue({ user: { role: "Admin" } });
    expect((await handler(req({ brand: { site_name: "Nobomukh" } }))).status).toBe(200);
    expect(mocks.write.mock.calls[0][1]).toEqual({ $set: { name: "storeCustomizationSetting", "setting.brand.site_name": "Nobomukh" } });
    expect(mocks.images).toHaveBeenCalledWith([]);
    expect(mocks.tag).toHaveBeenCalledWith("settings");
    expect(mocks.path).toHaveBeenCalledWith("/", "layout");
  });
  it("home save does not replace brand/tracking or destroy their images", async () => {
    mocks.session.mockResolvedValue({ user: { role: "Manager" } });
    await PATCH(req({ home: { phone: "017", logo: "new-home" } }));
    expect(mocks.write.mock.calls[0][1].$set).toEqual({ name: "storeCustomizationSetting", "setting.home.phone": "017", "setting.home.logo": "new-home" });
    expect(mocks.images).toHaveBeenCalledWith(["old-home"]);
  });
});

const invalid = {
  brand: { email_brand_color: "red", messenger_username: "bad?name", whatsapp_number: "+880 123" },
  tracking: { gtm_id: "bad", ga4_id: "bad", fb_pixel_id: "bad", clarity_id: "bad", tiktok_pixel_id: "bad" },
};
describe("settings write validation", () => {
  it.each([POST, PATCH])("returns all invalid field names before ANY side effects", async (handler) => {
    mocks.session.mockResolvedValue({ user: { role: "Admin" } });
    const response = await handler(req(invalid));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.invalidFields).toEqual(Object.entries(invalid).flatMap(([group, values]) => Object.keys(values).map((key) => `${group}.${key}`)));
    expect(mocks.connect).not.toHaveBeenCalled();
    expect(mocks.findOne).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
    expect(mocks.images).not.toHaveBeenCalled();
    expect(mocks.tag).not.toHaveBeenCalled();
  });
  it.each(Object.entries(invalid).flatMap(([group, values]) => Object.keys(values).map((key) => [group, key])))("rejects wrong types for %s.%s", async (group, key) => {
    mocks.session.mockResolvedValue({ user: { role: "Admin" } });
    for (const value of [null, 123, {}, [], false]) {
      const response = await PATCH(req({ [group]: { [key]: value } }));
      expect(response.status).toBe(400);
      expect((await response.json()).invalidFields).toEqual([`${group}.${key}`]);
    }
    expect(mocks.write).not.toHaveBeenCalled();
  });
  it("allows explicit clearing, omission and trimmed valid values", async () => {
    mocks.session.mockResolvedValue({ user: { role: "Admin" } });
    const response = await PATCH(req({ brand: { email_brand_color: "", whatsapp_number: "880123", messenger_username: "shop.name" }, tracking: { gtm_id: " GTM-ABC1234 ", ga4_id: "" } }));
    expect(response.status).toBe(200);
    expect(mocks.write.mock.calls[0][1].$set).toEqual({
      name: "storeCustomizationSetting", "setting.brand.email_brand_color": "", "setting.brand.whatsapp_number": "880123", "setting.brand.messenger_username": "shop.name", "setting.tracking.gtm_id": "GTM-ABC1234", "setting.tracking.ga4_id": "",
    });
  });
});
