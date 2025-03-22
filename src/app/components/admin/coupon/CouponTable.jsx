"use client";
import dayjs from "dayjs";

import { RiDeleteBin5Fill } from "react-icons/ri";
import useUtilsFunction from "@/app/hooks/useUtilsFunction";
import { LiaEdit } from "react-icons/lia";
import Pagination from "../shared/Pagination";
import { useMainContext } from "../context/mainContext";
import SwitchToggleStatus from "../form/switch/SwitchToggleStatus";
const CouponTable = ({
  coupons,
  handelCouponUpdate,
  pageCount,
  handlePageChange,
}) => {
  const { showDateFormat } = useUtilsFunction();
  const today = dayjs().tz("Asia/Dhaka").format("MMMM D, YYYY");
  // console.log('today',today)

  const { setCouponId, setIsDeleteModal } = useMainContext();

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
                      CAMPAIGN NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      CODE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      DISCOUNT
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      START DATE
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                    >
                      END DATE
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
                      PUBLISHED
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
                  {coupons?.map((item) => (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                        {/* {item?.title} */}
                        <div className="flex items-center gap-x-4">
                          <img
                            src={item.bannerImage}
                            alt=""
                            className="h-8 w-8 rounded-full "
                          />
                          <div className="truncate text-sm font-medium leading-6 ">
                            {item?.title}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {item?.couponCode}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {item?.discountPercentage}%
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {today}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {showDateFormat(item?.endTime)}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {dayjs().isAfter(dayjs(item.endTime)) ? (
                          <span className="text-red-700 font-bold">
                            Expired
                          </span>
                        ) : (
                          <span className="text-green-500 font-bold">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        <SwitchToggleStatus item={item} />
                      </td>

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                        <div className="inline-flex items-center justify-center gap-2">
                          <button
                            onClick={() => handelCouponUpdate(item)}
                            className="text-green-500 cursor-pointer mr-2 "
                          >
                            <LiaEdit />
                            <span className="sr-only"> {item.name}</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsDeleteModal(true),
                                setCouponId(item._id.toString());
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

export default CouponTable;
