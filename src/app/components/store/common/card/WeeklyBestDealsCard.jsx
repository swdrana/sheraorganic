"use client";
import Link from "next/link";
import StarRating from "../others/StartRating";
import useAddToCart from "../../hooks/useAddToCart";
import { useMainContext } from "../../provider/MainContextStore";
import useAddWishlist from "../../hooks/useAddWishlist";

const WeeklyBestDealsCard = ({ product }) => {
  const { handleWishlist, wishlist } = useAddWishlist();
  const { handelAddItem, addToCardLoading } = useAddToCart();
  //   console.log("addToCardLoading", addToCardLoading);
  const { setOpenProductModal, setProductDetails } = useMainContext();
  return (
    <>
      <div key={product._id} className="col-lg-6">
        <div className="horizontal-product-card next_style d-sm-flex align-items-center p-3 bg-white rounded-2 shadow gap-4">
          <div className="thumbnail position-relative rounded-2">
            <a href="product-details.html">
              <img
                src={product?.image[0]}
                alt="product"
                className="img-fluid"
              />
            </a>
            <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
              <a
                type="button"
                onClick={() => handleWishlist(product)}
                className="rounded-btn"
              >
                {wishlist?.some((item) => item._id === product._id) ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </a>
              <a
                type="button"
                onClick={() => {
                  setOpenProductModal(true), setProductDetails(product);
                }}
                className="rounded-btn"
              >
                <i className="fa-solid fa-eye"></i>
              </a>
            </div>
          </div>
          <div className="card-content mt-4 mt-sm-0">
            <div className="d-flex align-items-center flex-nowrap star-rating">
              <StarRating rating={product?.averageRating} />
              <span className="flex-shrink-0">
                ({product?.ratings?.length} Reviews)
              </span>
            </div>
            <Link
              href={`/product-details/${product._id}`}
              className="fw-bold text-heading title tt-line-clamp tt-clamp-1"
            >
              {product?.name}
            </Link>
            <div className="pricing mt-2">
              <span className="fw-bold h4 deleted me-1">
                ৳{product?.prices?.originalPrice}.00
              </span>
              <span className="fw-bold h4 text-danger">
                ৳{product?.prices?.price}.00
              </span>
            </div>
            <a
              type="button"
              onClick={() => handelAddItem({ ...product, id: product._id })}
              className="fs-xs fw-bold mt-3 d-inline-block explore-btn"
            >
              Shop Now
              <span className="ms-1">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeeklyBestDealsCard;
