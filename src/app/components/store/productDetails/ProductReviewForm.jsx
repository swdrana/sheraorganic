"use client";

import { useEffect, useState } from "react";
import { updateProductRating } from "@/app/backend/controllers/product.controller";
import { notifyError, notifySuccess } from "@/app/utils/toast";
import StarRatingInput from "../common/others/StarRatingInput";

const ProductReviewForm = ({ productId, existingReview, onSubmitted }) => {
  const [rating, setRating] = useState(Number(existingReview?.rating) || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setRating(Number(existingReview?.rating) || 0);
    setComment(existingReview?.comment || "");
  }, [existingReview]);

  const submit = async (event) => {
    event.preventDefault();
    if (rating < 1 || !comment.trim()) return;
    setSubmitting(true);
    const response = await updateProductRating(productId, { rating, comment: comment.trim() });
    if (response?.ok) {
      notifySuccess(response.message);
      await onSubmitted?.();
    } else {
      notifyError(response?.message || "রিভিউ দেওয়া যায়নি।");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={submit} className="border rounded-3 p-4 mb-5">
      <h6 className="mb-3">{existingReview ? "রিভিউ আপডেট করুন" : "রিভিউ দিন"}</h6>
      <StarRatingInput value={rating} onChange={setRating} />
      <textarea
        className="form-control mt-3"
        rows="4"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="আপনার মতামত লিখুন..."
      />
      <button
        type="submit"
        className="btn btn-primary btn-sm mt-3"
        disabled={submitting || rating < 1 || !comment.trim()}
      >
        {submitting ? "জমা হচ্ছে..." : existingReview ? "আপডেট করুন" : "জমা দিন"}
      </button>
    </form>
  );
};

export default ProductReviewForm;
