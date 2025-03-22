"use client";
import CategoryTable from "./CategoryTable";
import CategoryDrawer from "../drawer/CategoryDrawer";
import DeleteModal from "../modal/DeleteModal";
import { FiSearch } from "react-icons/fi";
import { useMainContext } from "../context/mainContext";
import useCategoryFilter from "@/app/hooks/useCategoryFilter";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/app/backend/controllers/category.controller";
import TableLoading from "../loader/TableLoading";
const Category = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const {
    setIsOpenCategoryDrawer,
    setCategoryDetails,
    categoryDetails,
    updateCategory,
  } = useMainContext();
  const {
    currentCategory,
    setSearchText,
    searchText,
    pageCount,
    handlePageChange,
  } = useCategoryFilter(categories);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCategories();
      // console.log('res..in',res )
      setCategories(res);
      setLoading(false);
    };

    fetchData();
  }, [updateCategory]);

  return (
    <>
      <CategoryDrawer categories={categories} />
      <DeleteModal categoryId={categoryDetails._id} />

      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Categorys</h2>
          </div>

          <div>
            <button
              onClick={() => {
                setIsOpenCategoryDrawer(true), setCategoryDetails({});
              }}
              type="button"
              className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Category
            </button>
          </div>
        </div>

        <div className=" relative my-10">
          <input
            type="text"
            placeholder="Search actegory"
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
          <CategoryTable
            categories={categories}
            // catagoryList={categoryList[0]?.children ? categoryList[0]?.children : categoryList}
            catagoryList={currentCategory}
            pageCount={pageCount}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
};

export default Category;
