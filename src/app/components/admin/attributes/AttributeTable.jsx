"use client";
import Link from "next/link";
import { useMainContext } from "../context/mainContext";
import { FiEdit } from "react-icons/fi";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Pagination from "../shared/Pagination";
import SwitchToggleStatus from "../form/switch/SwitchToggleStatus";

const AttributeTable = ({ attributes, pageCount, handlePageChange }) => {
  const {
    setIsDeleteModal,
    setAttributeDetails,
    setIsOpenAttributeDrawer,
    setAttributeId,
  } = useMainContext();

  return (
    <>
      {/* ============ */}
      <div className="">
        <div className="mt-8 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle bg-white py-11 px-8 rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                <thead>
                  <tr className="bg-primary-2">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-dark sm:pl-6 lg:pl-8"
                    >
                      ID
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
                      DISPLAY NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      OPTION
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
                      VALUES
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {attributes?.map((item) => (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-semibold uppercase text-gray-900 sm:pl-6 lg:pl-8">
                        {item?._id.toString().slice(18, 23)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm capitalize text-gray-500">
                        {item?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm font-semibold capitalize text-brand">
                        {item?.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {item?.option}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        <SwitchToggleStatus item={item} />
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <Link href={`/admin/attributes/${item._id}`}>
                          {" "}
                          <span className="text-green-500">
                            <FiEdit size={14} />
                          </span>{" "}
                        </Link>
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                        <div className="inline-flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setAttributeDetails(item),
                                setIsOpenAttributeDrawer(true);
                            }}
                            className="text-green-500 cursor-pointer mr-2 "
                          >
                            <LiaEdit />
                            <span className="sr-only"> {item.name}</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsDeleteModal(true),
                                setAttributeId(item._id.toString());
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

export default AttributeTable;
