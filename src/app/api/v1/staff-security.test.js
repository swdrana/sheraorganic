// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("@/app/api/auth/[...nextauth]/route", () => ({ authOptions: {} }));
vi.mock("@/app/utils/database", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/model/user.model", () => ({
  default: { find: vi.fn(), findOne: vi.fn(), findById: vi.fn(), updateOne: vi.fn() },
}));
vi.mock("@/app/backend/model/product.model", () => ({ default: vi.fn() }));
vi.mock("@/app/backend/utils/productSlug", () => ({ resolveProductSlug: vi.fn() }));
vi.mock("@/app/data/cachedData", () => ({
  CACHE_TAGS: { products: "products", stats: "stats" }, getCachedProductList: vi.fn(),
}));
vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));
vi.mock("@/app/backend/utils/cloudinaryServer", () => ({ destroyImages: vi.fn(), diffRemoved: vi.fn() }));

import { getServerSession } from "next-auth";
import connectDB from "@/app/utils/database";
import User from "@/app/backend/model/user.model";
import Product from "@/app/backend/model/product.model";
import { resolveProductSlug } from "@/app/backend/utils/productSlug";
import { revalidateTag } from "next/cache";
import { POST as createProduct } from "./products/route";
import { GET as listStaff, POST as createStaff } from "./staffs/route";
import { GET as getStaff, PATCH as editStaff } from "./staffs/[staffId]/route";
import { PATCH as editUser } from "./user/[id]/route";
import { staffUpdate } from "@/app/backend/actions/staff.action";

const request = (data) => ({ json: vi.fn().mockResolvedValue(data) });
const session = (role) => ({ user: { id: "owner", role } });

beforeEach(() => vi.resetAllMocks());

describe("guarded catalog writes", () => {
  it("rejects anonymous writes before reading input or touching DB/cache", async () => {
    getServerSession.mockResolvedValue(null);
    const req = request({ name: "Product" });
    expect((await createProduct(req)).status).toBe(401);
    expect(req.json).not.toHaveBeenCalled();
    expect(connectDB).not.toHaveBeenCalled();
    expect(Product).not.toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("saves and revalidates with a staff session", async () => {
    getServerSession.mockResolvedValue(session("Manager"));
    resolveProductSlug.mockResolvedValue("product");
    const product = { _id: "product-id", name: "Product" };
    const save = vi.fn().mockResolvedValue(product);
    Product.mockImplementation(function () { this.save = save; });
    const response = await createProduct(request({ name: "Product" }));
    expect(response.status).toBe(200);
    expect((await response.json()).product).toEqual(product);
    expect(connectDB).toHaveBeenCalledOnce();
    expect(save).toHaveBeenCalledOnce();
    expect(revalidateTag).toHaveBeenCalledWith("products");
  });
});

describe("private staff reads", () => {
  it.each([null, session("Customer")])("guards both staff GET routes", async (auth) => {
    getServerSession.mockResolvedValue(auth);
    expect((await listStaff()).status).toBe(401);
    expect((await getStaff(null, { params: { staffId: "staff" } })).status).toBe(401);
    expect(connectDB).not.toHaveBeenCalled();
    expect(User.find).not.toHaveBeenCalled();
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it("excludes passwords from list and detail queries and responses", async () => {
    getServerSession.mockResolvedValue(session("Admin"));
    const secretDoc = { _id: "staff", name: "Staff", password: "secret" };
    const select = vi.fn(async (projection) => {
      expect(projection).toBe("-password");
      const { password, ...safe } = secretDoc;
      return safe;
    });
    User.find.mockReturnValue({ select: async (projection) => [await select(projection)] });
    User.findOne.mockReturnValue({ select });
    const list = await (await listStaff()).json();
    const detail = await (await getStaff(null, { params: { staffId: "staff" } })).json();
    expect(list.staffs).toEqual([{ _id: "staff", name: "Staff" }]);
    expect(detail.staffDetails).toEqual({ _id: "staff", name: "Staff" });
    expect(JSON.stringify([list, detail])).not.toContain("secret");
  });
});

describe("role assignment", () => {
  it.each(["Manager", "Super Admin", "Accountant"])("blocks %s from creating staff", async (role) => {
    getServerSession.mockResolvedValue(session(role));
    expect((await createStaff(request({ role: "Admin" }))).status).toBe(403);
    expect(connectDB).not.toHaveBeenCalled();
  });

  it.each(["Manager", "Super Admin", "Accountant"])("blocks %s role changes through every edit path", async (role) => {
    getServerSession.mockResolvedValue(session(role));
    const save = vi.fn();
    User.findById.mockResolvedValue({ role: "Customer", save });
    expect((await editStaff(request({ role: "Admin" }), { params: { staffId: "staff" } })).status).toBe(403);
    expect((await editUser(request({ role: "Admin" }), { params: { id: "staff" } })).status).toBe(403);
    expect((await staffUpdate("staff", { role: "Admin" })).status).toBe(403);
    expect(save).not.toHaveBeenCalled();
    expect(User.updateOne).not.toHaveBeenCalled();
  });

  it.each(["Admin", "CEO"])("allows %s to change roles", async (role) => {
    getServerSession.mockResolvedValue(session(role));
    const staff = { role: "Customer", save: vi.fn() };
    User.findById.mockResolvedValue(staff);
    expect((await editStaff(request({ role: "Manager" }), { params: { staffId: "staff" } })).status).toBe(200);
    expect(staff.role).toBe("Manager");
    expect(staff.save).toHaveBeenCalledOnce();
  });

  it("allows other staff to save an unchanged role", async () => {
    getServerSession.mockResolvedValue(session("Manager"));
    const staff = { role: "Accountant", save: vi.fn() };
    User.findById.mockResolvedValue(staff);
    expect((await staffUpdate("staff", { role: "Accountant", status: "hide" })).status).toBeUndefined();
    expect(staff.save).toHaveBeenCalledOnce();
    expect(staff.status).toBe("hide");
  });
});
