"use client";
import DeleteModal from "../modal/DeleteModal";
import { FiSearch } from "react-icons/fi";
import { useMainContext } from "../context/mainContext";
import useCategoryFilter from "@/app/hooks/useCategoryFilter";
import { useEffect, useState } from "react";
import TableLoading from "../loader/TableLoading";
import BrandDrawer from "../drawer/BrandDrawer";
import { getAllBrands } from "@/app/backend/controllers/brand.controller";
import BrandsTable from "./BrandsTable";
import useBrandFilter from "@/app/hooks/useBrandFilter";
const Brands = () => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const {
    isOpenBrandDrawer,
    setIsOpenBrandDrawer,
    brandDetails,
    setBrandDetails,
    brandId,
    setBrandId,
    brandUpdate,
    setBrandUpdate,
  } = useMainContext();
  const {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    handlePageChange,
    pageCount,
    filterBrand,
  } = useBrandFilter(brands);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllBrands();
      // console.log('res..in',res )
      setBrands(res);
      setLoading(false);
    };

    fetchData();
  }, [brandUpdate]);

  return (
    <>
      <BrandDrawer />
      <DeleteModal brandId={brandDetails._id} />

      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Brands</h2>
          </div>

          <div>
            <button
              onClick={() => {
                setIsOpenBrandDrawer(true), setBrandDetails({});
              }}
              type="button"
              className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {!brandDetails?._id ? <> Add Brand</> : <>Update Brand</>}
            </button>
          </div>
        </div>

        <div className=" relative my-10">
          <input
            type="text"
            placeholder="Search Brands"
            value={searchText}
            // onKeyPress={handleSearch}
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-md border-0 py-2 text-gray-900  shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
          />
          <p className="absolute top-3 left-3">
            <FiSearch size={20} />
          </p>
        </div>

        {loading ? (
          <>
            {" "}
            <TableLoading />{" "}
          </>
        ) : (
          <BrandsTable
            brands={filterBrand}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
};

export default Brands;
