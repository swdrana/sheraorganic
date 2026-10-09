"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { trackAddToCart } from "@/app/utilities/facebookPixel";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { productCategoryList } from "@/app/utils/productCategory";
import useAddToCart from "../../hooks/useAddToCart";
import useAddWishlist from "../../hooks/useAddWishlist";
import StarRating from "../others/StartRating";
import { productPath } from "@/app/utils/productUrl";

const ProductCard = ({
  product,
  columnClassName = "col-6 col-lg-4 col-xxl-3",
}) => {
  const { handelAddItem } = useAddToCart();
  const { data: session } = useSession();
  const { handleWishlist, wishlist } = useAddWishlist();

  const handleAddToCartWithTracking = () => {
    trackAddToCart({
      content_ids: [product._id],
      contents: [
        { id: product._id, quantity: 1, item_price: product.prices?.price },
      ],
      currency: "BDT",
      value: product.prices?.price,
      user_data: {
        em: session?.user?.email || "",
        fn: session?.user?.name?.split(" ")[0] || "",
        ln: session?.user?.name?.split(" ")[1] || "",
      },
    });
    handelAddItem({ ...product, id: product._id });
  };

  const discounted = Number(product?.prices?.discount) >= 1;

  return (
    <div className={columnClassName}>
      <div className="product-card-v2 h-100 d-flex flex-column position-relative bg-white">
        {discounted && (
          <span className="pcv2-badge">
            {Math.round(product.prices.discount)}% OFF
          </span>
        )}
        <button
          type="button"
          className="pcv2-wish"
          aria-label="Wishlist"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleWishlist(product);
          }}
        >
          <i
            className={
              wishlist?.some((item) => item._id === product._id)
                ? "fa-solid fa-heart"
                : "fa-regular fa-heart"
            }
          ></i>
        </button>
        <Link
          href={productPath(product)}
          className="pcv2-body text-decoration-none text-dark d-flex flex-column flex-grow-1"
        >
          <span className="pcv2-thumb">
            <img
              src={optimizeCloudinaryUrl(product.image?.[0], 500)}
              alt={product.name}
              width="500"
              height="500"
              loading="lazy"
            />
          </span>
          <span className="pcv2-cat">
            {productCategoryList(product)[0] || product.brand}
          </span>
          <span className="pcv2-title">{product.name}</span>
          <span className="pcv2-rating d-flex align-items-center">
            <StarRating rating={product?.averageRating} />
            <small className="text-muted ms-1">
              ({product?.ratings?.length || 0})
            </small>
          </span>
          <span className="pcv2-price">
            ৳{product.prices?.price}
            {discounted && (
              <del className="text-muted ms-2">
                ৳{product.prices?.originalPrice}
              </del>
            )}
          </span>
        </Link>
        <button
          type="button"
          className="pcv2-add btn btn-secondary w-100"
          aria-label={`Add ${product.name} to cart`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleAddToCartWithTracking();
          }}
        >
          <i className="fa-solid fa-cart-plus me-2"></i>Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
