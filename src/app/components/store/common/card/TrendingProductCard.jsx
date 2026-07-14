import Link from "next/link";
import StarRating from "../others/StartRating";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

import { RiDeleteBack2Line } from "react-icons/ri";

import { useWishlist } from "../../provider/WishlistProvider";
import useAddToCart from "../../hooks/useAddToCart";
import { useMainContext } from "../../provider/MainContextStore";

const TrendingProductCard = ({ product }) => {
  const { handleWishlist, wishlist } = useWishlist();
  const { handelAddItem } = useAddToCart();
  const { setOpenProductModal, setProductDetails } = useMainContext();
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-10 filter_item beans_peas">
        <div className="vertical-product-card trend_style rounded-2 position-relative h-100">
          <Link href={`/product-details/${product._id}`} className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }} prefetch={true} aria-label={product.name || "View product details"} />
          <div className="thumbnail position-relative text-center p-4 overflow-hidden">
            <Link href={`/product-details/${product._id}`}>
              <img
                src={optimizeCloudinaryUrl(product.image[0], 200)}
                alt={product.name || "product"}
                className="img-fluid"
                width="200"
                height="200"
                loading="lazy"
              />{" "}
            </Link>
            {product.discount && (
              <span className="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">
                {product.discount} OFF
              </span>
            )}
            <div className="product-btns position-absolute d-flex gap-2 flex-column" style={{ zIndex: 2 }}>
              <button
                type="button"
                onClick={() => handleWishlist(product)}
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
                onClick={() => {
                  setOpenProductModal(true); setProductDetails(product);
                }}
                className="rounded-btn"
                aria-label="Quick view"
              >
                <i className="fa-regular fa-eye"></i>{" "}
              </button>
            </div>
          </div>
          <div className="card-content">
            <Link
              href={`/products/brands=${product.brand
                .replace(/\s+/g, "")
                .toLowerCase()}=${product._id}`}
              className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs position-relative"
              style={{ display: "inline-block", padding: "6px 12px 6px 0", minWidth: "48px", zIndex: 2 }}
            >
              {product.brand}
            </Link>
            <Link
              href={`/product-details/${product._id}`}
              className="card-title fw-medium tt-line-clamp tt-clamp-2 mb-2"
            >
              {product.name}{" "}
            </Link>

            <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
              <StarRating rating={product?.averageRating} />
              <span className="flex-shrink-0">
                {" "}
                ({product.ratings?.length} Reviews)
              </span>
            </div>
            <div className="pricing mt-2">
              {product?.prices?.discount > 0 && (
                <span className="fw-bold  deleted me-1 text-muted">
                  ৳{product.prices.originalPrice}.00
                </span>
              )}
              <span className="fw-bold  text-danger">
                ৳{product.prices.price}.00
              </span>
            </div>
          </div>
          <div className="card-btn bg-white">
            <button
              type="button"
              onClick={() => handelAddItem({ ...product, id: product._id })}
              className="btn btn-secondary d-block btn-md rounded-1 position-relative"
              style={{ zIndex: 2 }}
            >
              Add to Cart{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingProductCard;
