import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useProductSubmit from "./useProductSubmit";

const mocks = vi.hoisted(() => ({
  addProduct: vi.fn(),
  productUpdate: vi.fn(),
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
  context: {
    productDetails: {},
    isProductDrawerOpen: true,
    setIsProductDrawerOpen: vi.fn(),
    setUpdateProduct: vi.fn(),
  },
}));

vi.mock("../backend/controllers/product.controller", () => ({
  addProduct: mocks.addProduct,
}));
vi.mock("../backend/actions/product.action", () => ({
  productUpdate: mocks.productUpdate,
}));
vi.mock("../components/admin/context/mainContext", () => ({
  useMainContext: () => mocks.context,
}));
vi.mock("react-toastify", () => ({
  toast: { error: mocks.toastError, success: mocks.toastSuccess },
}));
vi.mock("sweetalert", () => ({ default: vi.fn() }));
vi.mock("./useUtilsFunction", () => ({
  default: () => ({
    getNumber: (value) => Number(value),
    getNumberTwo: (value) => Number(value),
  }),
}));

const attributes = [
  {
    _id: "color-id",
    title: "Color",
    option: "Dropdown",
    variants: [{ _id: "red-id", name: "Red" }],
  },
  {
    _id: "size-id",
    title: "Size",
    option: "Dropdown",
    variants: [{ _id: "large-id", name: "Large" }],
  },
];

const product = {
  _id: "product-id",
  productId: "SKU-1",
  name: "Test product",
  description: "Description",
  slug: "test-product",
  videoUrl: "https://example.test/video",
  show: true,
  sku: "SKU-1",
  barcode: "BAR-1",
  stock: 2,
  flashSale: false,
  tag: "[]",
  image: ["https://example.test/product.jpg"],
  brand: "Brand",
  category: "Food",
  categories: ["Food"],
  prices: { originalPrice: 100, price: 90 },
  isCombination: true,
  variants: [
    {
      "color-id": "red-id",
      originalPrice: 100,
      price: 90,
      quantity: 2,
      sku: "SKU-1",
    },
  ],
};

const formData = {
  name: product.name,
  videoUrl: product.videoUrl,
  slug: product.slug,
  sku: product.sku,
  barcode: product.barcode,
  stock: product.stock,
  originalPrice: product.prices.originalPrice,
  price: product.prices.price,
};

describe("useProductSubmit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.context.productDetails = {};
    mocks.context.isProductDrawerOpen = true;
    mocks.addProduct.mockResolvedValue({ message: "success", product });
  });

  it("uses the nested product variants after a successful combination create", async () => {
    const { result } = renderHook(() => useProductSubmit(attributes));

    act(() => {
      result.current.setImageUrl(product.image);
      result.current.setBrand(product.brand);
      result.current.setSelectedCategory([{ label: "Food", value: "Food" }]);
      result.current.handleIsCombination();
    });

    await act(async () => result.current.onSubmit(formData));

    expect(mocks.toastError).not.toHaveBeenCalled();
    expect(mocks.toastSuccess).toHaveBeenCalledWith(
      "Product Added Successfully!"
    );
  });

  it("hydrates edit attributes/options and does not regenerate duplicates", () => {
    mocks.context.productDetails = product;
    const { result } = renderHook(() => useProductSubmit(attributes));

    expect(result.current.attributes.map((item) => item._id)).toEqual([
      "color-id",
    ]);
    expect(result.current.values).toEqual({ "color-id": ["red-id"] });

    act(() => result.current.handleGenerateCombination());
    expect(result.current.variants).toHaveLength(1);
  });

  it("removes stale option values when an attribute is deselected", () => {
    const { result } = renderHook(() => useProductSubmit(attributes));

    act(() => {
      result.current.handleAddAtt([
        { label: "Color", value: "Color" },
        { label: "Size", value: "Size" },
      ]);
      result.current.setValues({
        "color-id": ["red-id"],
        "size-id": ["large-id"],
      });
    });
    act(() =>
      result.current.handleAddAtt([{ label: "Color", value: "Color" }])
    );

    expect(result.current.values).toEqual({ "color-id": ["red-id"] });
  });

  it("does not submit a product without a category", async () => {
    const { result } = renderHook(() => useProductSubmit(attributes));
    act(() => {
      result.current.setImageUrl(product.image);
      result.current.setBrand(product.brand);
    });

    await act(async () => result.current.onSubmit(formData));

    expect(mocks.addProduct).not.toHaveBeenCalled();
    expect(mocks.toastError).toHaveBeenCalledWith("Category is required!");
  });

  it("defaults new products to the title path and follows name changes", async () => {
    const { result } = renderHook(() => useProductSubmit(attributes));

    expect(result.current.sameAsTitle).toBe(true);
    act(() => {
      result.current.register("name").onChange({
        target: { name: "name", value: "বাংলা Organic Oil" },
        type: "change",
      });
    });
    expect(result.current.slug).toBe("বাংলা-organic-oil");

    act(() => {
      result.current.setImageUrl(product.image);
      result.current.setBrand(product.brand);
      result.current.setSelectedCategory([{ label: "Food", value: "Food" }]);
    });
    await act(async () =>
      result.current.onSubmit({ ...formData, name: "বাংলা Organic Oil", slug: "custom" })
    );
    expect(mocks.addProduct.mock.calls[0][0].slug).toBe("বাংলা-organic-oil");
  });

  it("keeps an existing path when its title changes", async () => {
    mocks.context.productDetails = product;
    mocks.productUpdate.mockResolvedValue({ message: "Updated" });
    const { result } = renderHook(() => useProductSubmit(attributes));

    expect(result.current.sameAsTitle).toBe(false);
    act(() => {
      result.current.register("name").onChange({
        target: { name: "name", value: "Changed title" },
        type: "change",
      });
    });
    expect(result.current.slug).toBe(product.slug);

    await act(async () =>
      result.current.onSubmit({ ...formData, name: "Changed title" })
    );
    expect(mocks.productUpdate.mock.calls[0][1].slug).toBe(product.slug);
  });

  it("resets the title checkbox when switching between products and a new form", () => {
    const { result, rerender } = renderHook(() => useProductSubmit(attributes));

    act(() => result.current.setSameAsTitle(false));
    mocks.context.productDetails = product;
    rerender();
    expect(result.current.sameAsTitle).toBe(false);

    mocks.context.productDetails = { ...product, _id: "another-id", slug: "" };
    rerender();
    expect(result.current.sameAsTitle).toBe(true);

    mocks.context.productDetails = {};
    rerender();
    expect(result.current.sameAsTitle).toBe(true);
    expect(result.current.slug).toBe("");
  });
});
