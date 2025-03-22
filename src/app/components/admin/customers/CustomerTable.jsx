"use client";
import { GrFormView } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useMainContext } from "../context/mainContext";
import Pagination from "../shared/Pagination";
import dayjs from "dayjs";
import Link from "next/link";

const CustomerTable = ({ users, pageCount, handlePageChange }) => {
  const { setIsDeleteModal, setStaffId } = useMainContext();

  // console.log("users in customer table..", users);

  return (
    <>
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
                      JOINING DATE
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
                      EMAIL
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      PHONE
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
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {/* <img src={user.image} alt="" width={40} height={40} /> */}

                        <div className="flex items-center gap-x-4">
                          <div className="truncate text-sm font-medium leading-6 ">
                            {user?._id.slice(18, 24)}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {dayjs(user.joiningDate).format("YYYY-MM-DD")}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {user?.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {user?.email}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500"></td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                        <div className="inline-flex items-center justify-center gap-3">
                          <Link href={`/admin/customer-order/${user._id}`}>
                            <GrFormView size={19} />
                          </Link>

                          <button
                            onClick={() => {
                              setIsDeleteModal(true),
                                setStaffId(user._id.toString());
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

export default CustomerTable;
