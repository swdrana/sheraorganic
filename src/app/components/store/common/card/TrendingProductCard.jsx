import Link from "next/link";
import StarRating from "../others/StartRating";

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
          <div className="thumbnail position-relative text-center p-4 overflow-hidden">
            <Link href={`/product-details/${product._id}`}>
              <img src={product.image[0]} alt="apple" className="img-fluid" />{" "}
            </Link>
            {product.discount && (
              <span className="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">
                {product.discount} OFF
              </span>
            )}
            <div className="product-btns position-absolute d-flex gap-2 flex-column">
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
                <i className="fa-regular fa-eye"></i>{" "}
              </a>
            </div>
          </div>
          <div className="card-content">
            <Link
              href={`/products/brands=${product.brand
                .replace(/\s+/g, "")
                .toLowerCase()}=${product._id}`}
              className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
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
                  ${product.prices.originalPrice}.00
                </span>
              )}
              <span className="fw-bold  text-danger">
                ${product.prices.price}.00
              </span>
            </div>
          </div>
          <div className="card-btn bg-white">
            <a
              type="button"
              onClick={() => handelAddItem({ ...product, id: product._id })}
              className="btn btn-secondary d-block btn-md rounded-1"
            >
              Add to Cart{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrendingProductCard;
