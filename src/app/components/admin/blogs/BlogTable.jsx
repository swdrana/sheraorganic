"use client";

import { RiDeleteBin5Fill } from "react-icons/ri";

import { LiaEdit } from "react-icons/lia";

import Pagination from "../shared/Pagination";
import { useMainContext } from "../context/mainContext";
import SwitchToggleStatus from "../form/switch/SwitchToggleStatus";

const BlogTable = ({ handlePageChange, pageCount, blogs }) => {
  const {
    setIsDeleteModal,

    setIsOpenBlogDrawer,

    setBlogDetails,
  } = useMainContext();

  // console.log("blogs in blog cuztomizatin", blogs);

  return (
    <>
      <div className="">
        <div className="mt-8 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle bg-white pt-11 pb-5 px-8 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                <thead>
                  <tr className="bg-primary-2">
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      IMAGE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      TITLE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      DESCRIPTION
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      PUBLISHED
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {blogs?.map((blog) => (
                    <tr key={blog._id}>
                      <td className="whitespace-nowrap px-3 pb-1 pt-5 text-sm text-gray-600 line-clamp-1 max-w-[24ch]">
                        {blog?._id.toString().slice(18, 23)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-800">
                        <div className="bg-primary-2 inline-flex items-center justify-center w-10 h-10 p-1 rounded-full">
                          <img
                            className="rounded-full"
                            src={blog?.img}
                            alt="icon"
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 pb-1 pt-5 text-sm text-gray-600 line-clamp-1 max-w-[24ch]">
                        {blog?.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600 overflow-hidden text-ellipsis   max-w-[24ch]">
                        {blog?.description}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {/* swite status update */}
                        <SwitchToggleStatus item={blog} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                        <div className="inline-flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setBlogDetails(blog), setIsOpenBlogDrawer(true);
                            }}
                            className="text-green-500 cursor-pointer mr-2 "
                          >
                            <LiaEdit />
                          </button>

                          <button
                            onClick={() => {
                              setIsDeleteModal(true), setBlogDetails(blog);
                            }}
                            className="text-brand"
                          >
                            <RiDeleteBin5Fill className=" cursor-pointer " />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* pagination */}
              <Pagination
                pageCount={pageCount}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTable;
