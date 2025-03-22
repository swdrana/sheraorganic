import { updateProductRating } from "@/app/backend/controllers/product.controller";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../common/others/Loading";

const ReviewModal = ({
  showModal,
  setShowModal,
  id,
  setSuccessfullyReview,
}) => {
  const [reviewSubmit, setReviewSubmit] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const { data } = useSession();
  const ratingData = {
    user: data?.user?.id,
    rating: rating,
    comment: review,
    productId: id,
    name: data?.user?.name,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmit(true);

    const res = await updateProductRating(id, ratingData);
    // console.log("res..in", res);
    if (res?.message) {
      toast.success("Your review successfully submitted");
      setReviewSubmit(false);
      setShowModal(false);
      setReview("");
      setRating("");
      setSuccessfullyReview(true);
    } else {
      toast.error("Something is wronag");
      setReviewSubmit(false);
    }
  };

  return (
    <div className="">
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Submit a Review</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      className="form-control border border-success py-1 mt-3"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    >
                      <option value="">Select rating</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>
                  <div className="form-group mt-5">
                    <label htmlFor="review">Your Review</label>
                    <textarea
                      id="review"
                      className="form-control border-primary shadow-sm rounded my-4"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    disabled={reviewSubmit}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit Review
                  </button>
                  {reviewSubmit && <Loading />}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewModal;
