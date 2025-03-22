"use client";
import ProductTable from "./ProductTable";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { usePathname } from "next/navigation";
import { useMainContext } from "../context/mainContext";
import DeleteModal from "../modal/DeleteModal";
import ProductDrawer from "../drawer/ProductDrawer";
import useProductFilter from "@/app/hooks/useProductFilter";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/app/backend/controllers/product.controller";
import { getAllAttributes } from "@/app/backend/controllers/attribute.controller";
import TableLoading from "../loader/TableLoading";
import { getAllCategories } from "@/app/backend/controllers/category.controller";

const Products = () => {
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [attribue, setAttribue] = useState([]);
  const [categories, setCategorys] = useState([]);
  const {
    searchText,
    setSearchText,
    category,
    setCategory,
    shotvalue,
    setShotValue,
    filteredProducts,
    handelResetFiltering,
    pageCount,
    handlePageChange,
  } = useProductFilter(products);

  const {
    productDetails,
    setIsProductDrawerOpen,
    setProductDetails,
    updateCategory,
    updateProduct,
    updateAttribute,
  } = useMainContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCategories();
      // console.log('res..in',res )
      setCategorys(res);
      setLoading(false);
    };

    fetchData();
  }, [updateCategory]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProducts();
      // console.log("res..in", res);
      setProducts(res);
      setLoading(false);
    };

    fetchData();
  }, [updateProduct]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAttributes();
      // console.log('res..in',res )
      setAttribue(res);
      setLoading(false);
    };

    fetchData();
  }, [updateAttribute]);

  // console.log("loading..", loading);
  return (
    <>
      <ProductDrawer
        products={products}
        attribue={attribue}
        categoriesList={categories}
      />
      <DeleteModal productId={productDetails._id} />
      <section className="mx-auto w-full  px-4 py-4 ">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="basis-1/2">
            <h2 className="text-lg font-semibold">Products</h2>
          </div>

          {path === "/admin/product" && (
            <>
              <div>
                <button
                  onClick={() => {
                    setIsProductDrawerOpen(true), setProductDetails({});
                  }}
                  type="button"
                  className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add new product
                </button>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-4  mt-8 flex-col sm:flex-row py-3 ">
          <div className="basis-1/2">
            <div className=" relative ">
              <input
                type="text"
                placeholder="Search products"
                value={searchText}
                // onKeyPress={handleSearch}
                onChange={(e) => setSearchText(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
              />
              <p className="absolute top-2 left-3">
                <FiSearch size={20} />
              </p>
              {searchText.length !== 0 && (
                <p
                  onClick={() => setSearchText("")}
                  className="absolute top-3 right-2 cursor-pointer"
                >
                  <GrClose size={15} />
                </p>
              )}
            </div>
          </div>

          <div className="basis-1/2">
            <div className="bg-white px-3 rounded-md border border-gray-200">
              <select
                id="location"
                name="location"
                className="block w-full text-gray-900 py-2 border-0 border-transparent ring-inset ring-gray-300 focus:ring-0 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none shadow-none"
                onChange={(e) => setShotValue(e.target.value)}
                value={shotvalue}
              >
                <option value="All" defaultValue hidden>
                  Price
                </option>
                <option>A _ Z Order</option>
                <option>Z _ A Order</option>
                <option>Low _ High Price</option>
                <option>High _ Low Price</option>
              </select>
            </div>
          </div>
          <div className="basis-1/2">
            <div className="bg-white px-3 rounded-md border border-gray-200">
              <select
                id="location"
                name="location"
                className="block w-full text-gray-900 py-2 border-0 border-transparent ring-inset ring-gray-300 focus:ring-0 focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none shadow-none"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="All" defaultValue hidden>
                  Category
                </option>
                {categories.map((ct, index) => (
                  <option key={index} value={ct.name}>
                    {ct.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="basis-1/3">
            <button
              onClick={() => handelResetFiltering()}
              type="button"
              className="rounded-md w-full bg-dark px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Reset filtering
            </button>
          </div>
        </div>
        {loading ? (
          <>
            {" "}
            <TableLoading />{" "}
          </>
        ) : (
          <ProductTable
            products={filteredProducts}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
};

export default Products;
