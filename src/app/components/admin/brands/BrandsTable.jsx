"use client";
import { useMainContext } from "../context/mainContext";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiMagnifyingGlassPlus } from "react-icons/hi2";
import Link from "next/link";
import SwitchToggleStatus from "../form/switch/SwitchToggleStatus";
import Pagination from "../shared/Pagination";
import { LiaEdit } from "react-icons/lia";
const BrandsTable = ({ brands, pageCount,handlePageChange }) => {
  const { isOpenBrandDrawer, setIsOpenBrandDrawer,brandDetails, setBrandDetails,brandId, setBrandId,brandUpdate,setBrandUpdate,setIsDeleteModal } =
    useMainContext();

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
                      ICON
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      NAME
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
                  {brands?.map((brand) => (
                    <tr key={brand._id}>
                      <td className="whitespace-nowrap px-3 pb-1 pt-5 text-sm text-gray-600 line-clamp-1 max-w-[24ch]">
                        {brand?._id.toString().slice(18, 23)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-800">
                        <div className="bg-primary-2 inline-block px-2 py-1 rounded">
                          <img
                            src={brand?.icon}
                            alt="icon"
                            style={{ width: "80px", height: "15px" }}
                          />
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">
                        {brand?.name}
                      </td>
                     

                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {/* swite status update */}
                        <SwitchToggleStatus 
                          item={brand}
                          // handelProductUpdate={handelProductUpdate}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                        <div className="inline-flex items-center justify-center gap-2">
                        
                          <button
                            onClick={() => {
                              setBrandDetails(brand),
                                setIsOpenBrandDrawer(true);
                            }}
                            className="text-green-500 cursor-pointer mr-2 "
                          >
                            <LiaEdit />
                          </button>

                          <button
                            onClick={() => {
                              setIsDeleteModal(true),
                                setBrandDetails(brand);
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

export default BrandsTable;
