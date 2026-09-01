"use client";

import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { useSession } from "next-auth/react";
import ProductReviewForm from "../../productDetails/ProductReviewForm";
import { useMainContext } from "../../provider/MainContextStore";

const ReviewReminderModal = () => {
  const { data: session } = useSession();
  const { reviewReminder, setReviewReminder } = useMainContext();
  if (!reviewReminder.open) return null;

  const dismiss = () => {
    if (session?.user?.id) {
      localStorage.setItem(
        `reviewReminderDismissedAt:${session.user.id}`,
        String(Date.now())
      );
    }
    setReviewReminder({ open: false, items: [] });
  };
  const removeItem = (productId) => {
    const items = reviewReminder.items.filter((item) => item._id !== productId);
    setReviewReminder({ open: items.length > 0, items });
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">আপনার কেনা পণ্যের রিভিউ দিন</h5></div>
          <div className="modal-body">
            {reviewReminder.items.map((product) => (
              <div key={product._id} className="row g-3 border-bottom py-3">
                <div className="col-md-4 d-flex gap-3 align-items-center">
                  <img src={optimizeCloudinaryUrl(product.image?.[0], 80)} alt={product.name} width="64" height="64" style={{ objectFit: "contain" }} />
                  <strong>{product.name}</strong>
                </div>
                <div className="col-md-8">
                  <ProductReviewForm productId={product._id} onSubmitted={() => removeItem(product._id)} />
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={dismiss}>পরে</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ zIndex: -1 }} />
    </div>
  );
};

export default ReviewReminderModal;
