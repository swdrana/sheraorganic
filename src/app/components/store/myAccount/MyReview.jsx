import { useEffect, useState } from "react";
import useUserOrders from "../dataFetching/useUserOrders";
import ReviewModal from "./ReviewModal";

import Loading from "../common/others/Loading";
import { getProductByIds } from "../../../backend/controllers/product.controller";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const MyReview = () => {
  const [successfullyReview, setSuccessfullyReview] = useState(false);
  const session = useSession();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("review-pending");
  const { userOrders, userOrdersLoading } = useUserOrders();
  const [productId, setProductId] = useState("");
  const [loading, setLoading] = useState(false);
  //   console.log("userOrders..", userOrders);
  // console.log("users order", userOrders);

  const allCartItems = Array.isArray(userOrders)
    ? userOrders
        ?.filter((i) => i.status === "Delivered")
        .flatMap((order) => order?.cart || [])
    : [];

  console.log("allCartItems", allCartItems);

  const [reviewProducts, setReviewProducts] = useState([]);
  console.log("reviewProducts", reviewProducts);
  const productIdsFromCart = allCartItems.map((item) => item._id);
  // console.log("reviewProducts", reviewProducts);
  console.log("productIdsFromCart", productIdsFromCart);

  useEffect(() => {
    if (productIdsFromCart.length === 0) {
      return;
    }
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await getProductByIds(productIdsFromCart);
        // console.log("all review product", res);

        setReviewProducts(res?.products); // Set the fetched products to state
        setSuccessfullyReview(false);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [productIdsFromCart.length, successfullyReview]);

  return (
    <>
      <ReviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        id={productId}
        setSuccessfullyReview={setSuccessfullyReview}
      />

      <>
        <div className="col-12">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-white p-7 rounded-md">
                <h6 className="mb-4 pt-4">My Reviews</h6>
                <ul className="nav product-details-nav mb-5">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "review-pending"
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => setActiveTab("review-pending")}
                      type="button"
                    >
                      To be Reviewed
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "review-history"
                          ? "bg-primary text-white"
                          : ""
                      }`}
                      onClick={() => setActiveTab("review-history")}
                      type="button"
                    >
                      Reviewed History
                    </button>
                  </li>
                </ul>
                {userOrdersLoading ? (
                  <>
                    {" "}
                    <Loading />{" "}
                  </>
                ) : (
                  <>
                    <div className="tab-content product-details-nav-tab">
                      {activeTab === "review-pending" && (
                        <>
                          {reviewProducts?.filter((product) =>
                            product?.ratings?.every(
                              (rating) =>
                                rating.user !== session?.data?.user?.id
                            )
                          ).length < 1 && (
                            <p className="py-5 text-center text-red-500">
                              No review pending product
                            </p>
                          )}
                          <div
                            className="tab-pane fade show active"
                            id="review-pending"
                          >
                            {reviewProducts
                              ?.filter((product) =>
                                product?.ratings?.every(
                                  (rating) =>
                                    rating.user !== session?.data?.user?.id
                                )
                              )
                              .map((order, i) => (
                                <div
                                  key={i}
                                  className="background rounded py-4 shadow-1"
                                >
                                  <div className="border rounded-1 p-4 d-flex align-items-center justify-between gap-4">
                                    <div className="d-flex gap-4 align-items-center">
                                      <div className="w-7/12 flex items-center gap-3">
                                        <a
                                          href="#"
                                          className="link d-inline-block flex-shrink-0 w-30"
                                        >
                                          <img
                                            src={order?.image[0]}
                                            alt="image"
                                            className="img-fluid"
                                          />
                                        </a>
                                        <div className="flex-grow-1">
                                          <a
                                            href="#"
                                            className="fw-bold text-heading text-dark line-clamp-2"
                                          >
                                            {order?.name}
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                    <a
                                      type="button"
                                      onClick={() => {
                                        setShowModal(true),
                                          setProductId(order._id);
                                      }}
                                      className="link d-inline-block py-2 px-4 rounded-1 bg-primary text-white"
                                    >
                                      Review
                                    </a>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                      {activeTab === "review-history" && (
                        <>
                          {reviewProducts?.filter((o) => o.ratings?.length > 0)
                            .length < 1 && (
                            <p className="py-5 text-center text-red-500">
                              No review history product
                            </p>
                          )}
                          <div
                            className="tab-pane fade show active"
                            id="review-history"
                          >
                            {reviewProducts
                              ?.filter((product) =>
                                product?.ratings?.some(
                                  (rating) =>
                                    rating.user === session?.data?.user?.id
                                )
                              )
                              .map((order, i) => (
                                <div
                                  key={i}
                                  className="background rounded px-4 px-md-6 py-8 shadow-1"
                                >
                                  <h6 className="mb-2"> {order?.brand} </h6>
                                  <div className="border rounded-1 p-4 d-flex align-items-center flex-wrap gap-4">
                                    <div className="d-flex gap-4 align-items-center flex-grow-1">
                                      <a
                                        href="#"
                                        className="link d-inline-block flex-shrink-0 w-30"
                                      >
                                        <img
                                          src={order?.image[0]}
                                          alt="image"
                                          className="img-fluid"
                                        />
                                      </a>
                                      <div className="flex-grow-1">
                                        <a
                                          href="#"
                                          className="link d-inline-block fw-semibold clr-title"
                                        >
                                          {order?.name}
                                        </a>
                                      </div>
                                    </div>
                                    <a
                                      type="button"
                                      onClick={() => {
                                        setShowModal(true),
                                          setProductId(order._id);
                                      }}
                                      className="link d-inline-block py-2 px-4 rounded-1 border-primary"
                                    >
                                      Review
                                    </a>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default MyReview;
