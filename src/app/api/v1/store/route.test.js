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
