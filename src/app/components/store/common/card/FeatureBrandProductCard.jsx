"use client";

import Link from "next/link";
import StarRating from "../others/StartRating";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

import useAddWishlist from "../../hooks/useAddWishlist";
import { useMainContext } from "../../provider/MainContextStore";

const FeatureBrandProductCard = ({ product, i }) => {
  const { handleWishlist, wishlist } = useAddWishlist();
  const { setOpenProductModal, setProductDetails } = useMainContext();

  return (
    <>
      <div
        className={`horizontal-product-card next_style d-sm-flex align-items-center p-3 bg-white rounded-2 gap-4 position-relative ${
          i !== 0 && "mt-4"
        }`}
      >
        <Link href={`/product-details/${product._id}`} className="d-sm-flex align-items-center gap-4 text-decoration-none text-dark flex-grow-1">
          <div className="thumbnail position-relative rounded-2 flex-shrink-0">
            <img
              src={optimizeCloudinaryUrl(product.image[0], 200)}
              alt={product.name || "product"}
              className="img-fluid"
              width="200"
              height="200"
              loading="lazy"
            />
            <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2" style={{ zIndex: 10 }}>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleWishlist(product); }}
                className="rounded-btn"
                aria-label="Add to wishlist"
              >
                {wishlist?.some((item) => item._id === product._id) ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenProductModal(true); setProductDetails(product); }}
                className="rounded-btn"
                aria-label="Quick view"
              >
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
          <div className="card-content mt-4 mt-sm-0">
            <div className="d-flex align-items-center flex-nowrap star-rating">
              <StarRating rating={product?.averageRating} />
              <span className="flex-shrink-0 text-muted">
                ({product.ratings?.length} Reviews)
              </span>
            </div>
            <div className="fw-bold text-heading title tt-line-clamp tt-clamp-1 text-dark">
              {product.name}
            </div>
            <div className="pricing mt-2">
              {product?.prices?.discount > 0 && (
                <span className="fw-bold h4 deleted me-1 text-muted">
                  ৳{product.prices.originalPrice}.00
                </span>
              )}
              <span className="fw-bold h4 text-danger">
                ৳{product.prices.price}.00
              </span>
            </div>
            <div className="fs-xs fw-bold mt-3 d-inline-block explore-btn">
              Show Details
              <span className="ms-1">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FeatureBrandProductCard;
