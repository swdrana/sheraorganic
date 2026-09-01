"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
import Loading from "../common/others/Loading";
import useUserOrders from "../dataFetching/useUserOrders";
import ReviewModal from "./ReviewModal";

const OrderHistory = () => {
  const { userOrders, userOrdersLoading } = useUserOrders();
  const [reviewOrder, setReviewOrder] = useState(null);
  const [reviewProductId, setReviewProductId] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);

  if (userOrdersLoading) return <Loading />;

  return (
    <>
      <ReviewModal
        showModal={showReviewModal}
        setShowModal={setShowReviewModal}
        id={reviewProductId}
        setSuccessfullyReview={() => setReviewOrder(null)}
      />
      {reviewOrder && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">রিভিউ দিন</h5>
                <button type="button" className="btn-close" onClick={() => setReviewOrder(null)} />
              </div>
              <div className="modal-body">
                {(reviewOrder.cart || []).filter((item) => !item.isGift).map((item) => (
                  <div key={item._id || item.id} className="d-flex justify-content-between align-items-center gap-3 border-bottom py-3">
                    <span>{item.name}</span>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        setReviewProductId(String(item._id || item.productId));
                        setShowReviewModal(true);
                      }}
                    >
                      রিভিউ
                    </button>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setReviewOrder(null)}>বন্ধ করুন</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {Array.isArray(userOrders) && userOrders.length > 0 ? (
        <div className="recent-orders bg-white rounded">
          <h6 className="mb-4 px-4 pt-4">Your Orders</h6>
          <div className="table-responsive">
            <table className="order-history-table table">
              <thead>
                <tr>
                  <th>Order Number#</th><th>Placed on</th><th>Method</th><th>Status</th><th>Total</th><th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order) => (
                  <tr key={order._id || order.orderCode}>
                    <td>#G-Store: {order.orderCode}</td>
                    <td>{dayjs(order.createdAt).format("YYYY-MM-DD")}</td>
                    <td>{order.paymentMethod}</td><td>{order.status}</td>
                    <td className="text-secondary">৳{order.total}.00</td>
                    <td className="text-center">
                      <Link href={`/invoice/${order.orderCode}`} className="view-invoice fs-xs me-2"><i className="fas fa-eye"></i></Link>
                      {order.status === "Delivered" && (
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => setReviewOrder(order)}>রিভিউ দিন</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted bg-light border rounded p-3 shadow-sm mt-10">Not yet ordered</p>
      )}
    </>
  );
};

export default OrderHistory;
