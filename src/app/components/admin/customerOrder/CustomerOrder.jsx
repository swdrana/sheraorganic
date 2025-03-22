"use client";
import { useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import dayjs from "dayjs";
import SelectStatus from "../form/selectOption/SelectStatus";
import LoadingSkeleton from "../loader/TableLoading";
import { getUserOrders } from "@/app/backend/controllers/order.controller";

const CustomerOrder = ({ userId }) => {
  // console.log("user id..", userId);
  const [userOrders, setUserOrders] = useState({});
  const [userOrdersLoading, setUserOrdersLoading] = useState(true);
  //   console.log("id in single user//", id);
  // console.log("userOrders..", userOrders);
  useEffect(() => {
    const fetchData = async () => {
      // console.log("Fetching user data...");

      try {
        const res = await getUserOrders(userId);
        // console.log("User data response:", res);
        setUserOrders(res?.userOrder);
      } catch (error) {
        // console.error("Failed to fetch user:", error);
      } finally {
        setUserOrdersLoading(false);
      }
    };

    // Only fetch data when session?.data?.user?.id is available
    if (userId) {
      fetchData();
    }
  }, [userId]);
  return (
    <>
      <section className="mx-auto w-full px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="basis-1/2">
            <h2 className="text-lg font-semibold">Customer Order List</h2>
          </div>
        </div>

        {userOrdersLoading ? (
          <>
            {" "}
            <LoadingSkeleton />{" "}
          </>
        ) : (
          <>
            {" "}
            {userOrders?.length === 0 ? (
              <div className="py-10 w-full text-center">
                <p className="flex justify-center my-6 mb-7">
                  <FaBagShopping color="red" size={50} />
                </p>
                <p className="text-xl font-bold text-red-500">
                  This Customer has no order yet!
                </p>
              </div>
            ) : (
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full align-middle bg-white pt-11 pb-5 px-8 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                        <thead>
                          <tr className="bg-primary-2">
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-dark sm:pl-6 lg:pl-8"
                            >
                              ORDER ID
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                            >
                              ORDER TIME
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                            >
                              SHIPPING ADDRESS
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                            >
                              PHONE
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
                            {/* <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-dark"
                            >
                              ACTION
                            </th> */}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {userOrders?.map((item, index) => (
                            <tr key={index}>
                              <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                                #G-Store:{item?.orderCode}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-800">
                                <div className="bg-primary-2 inline-block px-2 py-1 rounded">
                                  {dayjs(item?.createdAt).format("YYYY-MM-DD")}
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 pb-1 pt-5 text-sm text-gray-600 line-clamp-1 max-w-[24ch]">
                                {item?.user_info?.address}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">
                                {item?.user_info.contact}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-600">
                                {item?.paymentMethod}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-sm text-brand">
                                ${item?.total.toFixed(2)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-800">
                                <div
                                  className={`${
                                    item.status === "Cancel" ? "bg-red-400" : ""
                                  } ${
                                    item.status === "Processing"
                                      ? "bg-green-300 "
                                      : ""
                                  }  ${
                                    item.status === "Pending"
                                      ? "bg-yellow-800 "
                                      : ""
                                  }  ${
                                    item.status === "Delivered"
                                      ? "bg-green-800 "
                                      : ""
                                  } inline-block px-2 text-white py-[2px] rounded-xl`}
                                >
                                  {item?.status}
                                </div>
                              </td>
                              {/* <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-800">
                                <div className="bg-primary-2 inline-block px-2 py-[2px] rounded">
                                  <SelectStatus order={item} />
                                </div>
                              </td> */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default CustomerOrder;
