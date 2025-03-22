"use client";
import { usePathname } from "next/navigation";

import { BiSolidShow } from "react-icons/bi";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { updateProduct } from "@/app/backend/controllers/product.controller";
import { useMainContext } from "../context/mainContext";
import Link from "next/link";
import Pagination from "../shared/Pagination";
import SwitchToggleStatus from "../form/switch/SwitchToggleStatus";

const ProductTable = ({ products, pageCount, handlePageChange }) => {
  const path = usePathname();
  const {
    setIsDeleteModal,
    setProductDetails,
    setProductSubmitting,
    setIsProductDrawerOpen,
    setUpdateProduct,
  } = useMainContext();

  const handelProductUpdate = async (data) => {
    setProductSubmitting(true);
    setUpdateProduct(false);
    const productData = {
      name: data.name,
      category: data.category,
      currentPrice: data.currentPrice,
      previousPrice: data.previousPrice,
      des: data.des,
      img: data.imgUrl,
      status: data.status === "show" ? "hide" : "show",
    };
    // const res = await updateProduct({ product: productData, path, id: productDetails?._id });
    // console.log("click", res);
    const res = await updateProduct({
      id: data._id,
      updateProductData: productData,
    });
    // console.log("res..in update porudct ", res);
    if (res?.status === 200) {
      setProductSubmitting(false);
      toast.success("product update successfully");
      setUpdateProduct(true);
    } else {
      setProductSubmitting(false);
    }
  };

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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark  sm:pl-6 lg:pl-8"
                    >
                      IMAGE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark "
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      CATEGORY
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      PRICE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      SALE PRICE
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      STOCK
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      VIEW
                    </th>
                    {path === "/product" && (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                      >
                        STATUS
                      </th>
                    )}
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products?.map((item) => (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        <div className="w-10 h-10 bg-primary-2 rounded-full p-2 d-flex items-center justify-center">
                          <img src={item.image[0]} className="w-full h-full" />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 pb-1 pt-5 text-sm text-gray-600 line-clamp-1 max-w-[24ch]">
                        {item?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-800">
                        <div className="bg-primary-2 bg-success bg-opacity-25 inline-block px-2 py-1 rounded">
                          {item?.category}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">
                        ${item?.prices?.originalPrice}.00
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-secondary">
                        ${item?.prices?.price}.00
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-800">
                        <div className="bg-primary-2 inline-block px-2 py-[2px] rounded">
                          {item?.stock}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        <div className="cursor-pointer">
                          <Link className="fs-18" href={`/admin/product/${item._id}`}>
                            <BiSolidShow />
                          </Link>
                        </div>
                      </td>
                      {path === "/product" && (
                        <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                          {/* swite status update */}
                          <SwitchToggleStatus
                            item={item}
                            handelProductUpdate={handelProductUpdate}
                          />
                        </td>
                      )}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                        <div className="inline-flex items-center justify-center gap-2">
                          {path === "/admin/product" && (
                            <button
                              onClick={() => {
                                setProductDetails(item),
                                  setIsProductDrawerOpen(true);
                              }}
                              className="text-green-500 fs-18 cursor-pointer mr-2 "
                            >
                              <LiaEdit />
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setIsDeleteModal(true), setProductDetails(item);
                            }}
                            className="text-danger fs-18"
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

export default ProductTable;
