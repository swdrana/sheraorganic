"use client";

import dayjs from "dayjs";
import useUserOrders from "../dataFetching/useUserOrders";
import Loading from "../common/others/Loading";
import Link from "next/link";

const OrderHistory = () => {
  const { userOrders, userOrdersLoading } = useUserOrders();
  if (userOrdersLoading) {
    return <Loading />;
  }
  return (
    <>
      {userOrders?.length > 0 ? (
        <>
          <div className="recent-orders bg-white rounded">
            <h6 className="mb-4 px-4 pt-4">Your Orders</h6>
            <div className="table-responsive">
              {" "}
              <table className="order-history-table table">
                <tr>
                  <th>Order Number#</th>
                  <th>Placed on</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th className="text-center">Action</th>
                </tr>

                {Array.isArray(userOrders) &&
                  userOrders.map((order, i) => (
                    <tr key={i}>
                      <td>#G-Store: {order?.orderCode}</td>
                      <td> {dayjs(order?.createdAt).format("YYYY-MM-DD")}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.status}</td>
                      <td className="text-secondary">${order.total}.00</td>
                      <td className="text-center">
                        <Link
                          href={`/invoice/${order.orderCode}`}
                          className="view-invoice fs-xs"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <p className="text-center text-muted bg-light border rounded p-3 shadow-sm mt-10">
            Not yet ordered
          </p>
        </>
      )}
    </>
  );
};

export default OrderHistory;
