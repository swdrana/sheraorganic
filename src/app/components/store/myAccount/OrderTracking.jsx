"use client";

import { useState } from "react";
import useOrderCode from "../dataFetching/useOrderCode";
import { set } from "react-hook-form";
import Loading from "../common/others/Loading";
import useUserOrders from "../dataFetching/useUserOrders";

const OrderTracking = () => {
  const [code, setCode] = useState("");
  const { userOrders, userOrdersLoading } = useUserOrders();
  const [searchOrder, setSearchOrder] = useState({});
  // console.log("searchOrder..", searchOrder);
  // console.log("code ..", code);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cOrder = userOrders?.find(
      (o) => Number(o.orderCode) === Number(code)
    );
    // console.log(cOrder, "CORDERALSDKFLA");
    setSearchOrder(cOrder);
  };

  return (
    <>
      <div className="col-xl-12">
        <div className="order-tracking-wrap bg-white rounded py-5 px-4">
          <h6 className="mb-4">Order Tracking</h6>
          <form
            className="search-form d-flex align-items-center mb-5 justify-content-center"
            onSubmit={handleSubmit}
          >
            <div className="input-group mb-3 d-flex justify-content-center">
              <div className="input-group-prepend">
                <span className="input-group-text rounded-0 rounded-start">
                  #G-Store:
                </span>
              </div>
              <input
                type="text"
                className="w-50"
                placeholder="Code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit" className="btn btn-secondary px-3">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <>
        {" "}
        {searchOrder && Object.keys(searchOrder).length > 0 ? (
          <>
            <div className="order-tracking-wrap bg-white rounded py-5 px-4">
              <h6 className="mb-4">Order Tracking</h6>
              <ol id="progress-bar">
                <li className={`fs-xs tt-step tt-step-done`}>Order Placed</li>
                <li
                  className={`fs-xs tt-step ${
                    searchOrder?.status === "Pending"
                      ? "active"
                      : "tt-step-done"
                  }`}
                >
                  Pending
                </li>
                <li
                  className={`fs-xs tt-step ${
                    searchOrder?.status === "Processing"
                      ? "active"
                      : searchOrder?.status === "Delivered"
                      ? "tt-step-done"
                      : ""
                  }`}
                >
                  Processing
                </li>
                <li
                  className={`fs-xs tt-step ${
                    searchOrder?.status === "Delivered" ? " tt-step-done" : ""
                  }`}
                >
                  Delivered
                </li>
              </ol>

              <div className="table-responsive-md mt-5">
                <table className="table table-bordered fs-xs">
                  <thead>
                    <tr>
                      <th scope="col">Date & Time</th>
                      <th scope="col">Status Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td> 14 Feb 2023 - 13:19 </td>
                      <td>
                        Your package has been delivered. Thank you for shopping
                        at Grostore!
                      </td>
                    </tr>
                    <tr>
                      <td> 13 Feb 2023 - 13:39</td>
                      <td>
                        Your package has been handed over to Grostore Delivery.
                      </td>
                    </tr>
                    <tr>
                      <td> 12 Feb 2023 - 14:50</td>
                      <td>
                        Your package has been packed and is being handed over to
                        a logistics partner
                      </td>
                    </tr>
                    <tr>
                      <td>12 Feb 2023 - 13:05</td>
                      <td>Your order has been successfully verified.</td>
                    </tr>
                    <tr>
                      <td>12 Feb 2023 - 13:05</td>
                      <td>
                        Thank you for shopping at GroStore! Your order is being
                        verified.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-5 text-center">
              <p className="lead">No orders found for this code.</p>
              <p className="text-muted">
                Please check your code and try again.
              </p>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default OrderTracking;
