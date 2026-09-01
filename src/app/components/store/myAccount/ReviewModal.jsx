import { updateProductRating } from "@/app/backend/controllers/product.controller";
import React, { useState } from "react";
import Loading from "../common/others/Loading";
import { notifyError, notifySuccess } from "@/app/utils/toast";
import StarRatingInput from "../common/others/StarRatingInput";

const ReviewModal = ({
  showModal,
  setShowModal,
  id,
  setSuccessfullyReview,
}) => {
  const [reviewSubmit, setReviewSubmit] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const ratingData = {
    rating: Number(rating),
    comment: review,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmit(true);

    const res = await updateProductRating(id, ratingData);
    // console.log("res..in", res);
    if (res?.ok) {
      notifySuccess(res.message);
      setReviewSubmit(false);
      setShowModal(false);
      setReview("");
      setRating("");
      setSuccessfullyReview?.(true);
    } else {
      notifyError(res?.message || "রিভিউ দেওয়া যায়নি।");
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
                    <div className="mt-3">
                      <StarRatingInput
                        value={Number(rating) || 0}
                        onChange={setRating}
                      />
                    </div>
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
                    disabled={reviewSubmit || Number(rating) < 1 || !review.trim()}
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
