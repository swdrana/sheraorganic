"use client";
import { usePathname } from "next/navigation";
import SelectStatus from "../form/selectOption/SelectStatus";
import Pagination from "../shared/Pagination";
import dayjs from "dayjs";
import { BiSolidShow } from "react-icons/bi";
import Link from "next/link";
const OrderTable = ({ orders, pageCount, handlePageChange }) => {
  // console.log('orders in order table..',orders)
  const pathname = usePathname();
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
                      Order Code
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark "
                    >
                      ORDER TIME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      CUSTOMER NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      METHOD
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      AMOUNT
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      STATUS
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      VIEW
                    </th>

                    {pathname === "/admin/order" && (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                      >
                        ACTION
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders?.map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        #G-Store:{item?.orderCode}
                      </td>
                      <td className="px-3 py-2 text-xs text-gray-800">
                        <div className="bg-primary-2 inline-block px-2 py-1 rounded">
                          {dayjs(item?.createdAt).format("YYYY-MM-DD")}
                        </div>
                      </td>
                      <td className="px-3 pb-1 pt-5 text-sm text-gray-600 line-clamp-1 max-w-[24ch]">
                        {item?.user_info?.name}
                      </td>

                      <td className="px-3 py-2 text-sm text-gray-600">
                        {item?.paymentMethod}
                      </td>
                      <td className="px-3 py-2 text-sm text-brand">
                        ${item?.total?.toFixed(2)}
                      </td>

                      <td className="px-3 py-2 text-xs text-gray-800">
                        <div
                          className={`${
                            item.status === "Cancel" ? "bg-red-400" : ""
                          } ${
                            item.status === "Processing" ? "bg-green-300 " : ""
                          }  ${
                            item.status === "Pending" ? "bg-yellow-800 " : ""
                          }  ${
                            item.status === "Delivered" ? "bg-green-800 " : ""
                          } inline-block px-2 text-white py-[2px] rounded-xl`}
                        >
                          {item?.status}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-sm text-gray-500">
                        <div className="cursor-pointer">
                          <Link href={`/admin/order/${item?.orderCode}`}>
                            <BiSolidShow className="fs-18" />
                          </Link>
                        </div>
                      </td>

                      {pathname === "/admin/order" && (
                        <td className="px-3 py-2 text-xs text-gray-800">
                          <div className="bg-primary-2 inline-block px-2 py-[2px] rounded">
                            <SelectStatus order={item} />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* pagination */}
              {pathname === "/admin/orders" && (
                <Pagination
                  pageCount={pageCount}
                  handlePageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTable;
