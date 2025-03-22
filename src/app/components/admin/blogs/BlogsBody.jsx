import { FiSearch } from "react-icons/fi";
import BlogTable from "./BlogTable";
import { useState } from "react";
import { useMainContext } from "../context/mainContext";
import useBlogFilter from "../../../hooks/useBlogFilter";
import useBlog from "../../store/dataFetching/useBlog";
import BlogDrawer from "../drawer/BlogDrawer";
import DeleteModal from "../modal/DeleteModal";
import TableLoading from "../loader/TableLoading";

const BlogsBody = () => {
  const { isOpenBlogDrawer, setIsOpenBlogDrawer, blogDetails, setBlogDetails } =
    useMainContext();
  const { blogs, blogLoading } = useBlog();
  const {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    handlePageChange,
    pageCount,
    filterBlog,
  } = useBlogFilter(blogs);

  return (
    <>
      <BlogDrawer />
      <DeleteModal blogId={blogDetails._id} />
      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Blogs</h2>
          </div>

          <div>
            <button
              onClick={() => {
                setIsOpenBlogDrawer(true), setBlogDetails({});
              }}
              type="button"
              className="rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add Blog
            </button>
          </div>
        </div>

        <div className=" relative my-10">
          <input
            type="text"
            placeholder="Search actegory"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="block w-full rounded-md border-0 py-2 text-gray-900  shadow-sm  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6 px-10 outline-none"
          />
          <p className="absolute top-3 left-3">
            <FiSearch size={20} />
          </p>
        </div>

        {blogLoading ? (
          <>
            {" "}
            <TableLoading />{" "}
          </>
        ) : (
          <BlogTable
            blogs={filterBlog}
            handlePageChange={handlePageChange}
            pageCount={pageCount}
          />
        )}
      </section>
    </>
  );
};

export default BlogsBody;
