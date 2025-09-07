"use client";

import Link from "next/link";
import StarRating from "../others/StartRating";
import { useSession } from "next-auth/react";

import useAddToCart from "../../hooks/useAddToCart";
import useAddWishlist from "../../hooks/useAddWishlist";
import { useMainContext } from "../../provider/MainContextStore";
import { trackAddToCart } from "@/app/utilities/facebookPixel";

const ProductCard = ({ product }) => {
  const { handelAddItem } = useAddToCart();
  const { data: session } = useSession();

  const { handleWishlist, wishlist } = useAddWishlist();
  const { setOpenProductModal, setProductDetails } = useMainContext();

  const handleAddToCartWithTracking = (product) => {
    // Track Facebook Pixel AddToCart event
    trackAddToCart({
      content_ids: [product._id],
      contents: [{
        id: product._id,
        quantity: 1,
        item_price: product.prices.price
      }],
      currency: 'BDT',
      value: product.prices.price,
      user_data: {
        em: session?.user?.email || '',
        fn: session?.user?.name?.split(' ')[0] || '',
        ln: session?.user?.name?.split(' ')[1] || ''
      }
    });
    
    // Add to cart
    handelAddItem({ ...product, id: product._id });
  };
  return (
    <>
      <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10 group">
        <div className="vertical-product-card trend_style rounded-2 position-relative border-0 bg-white">
          {product.prices.discount >= 1 && (
            <span className="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">
              {product.prices.discount.toFixed(0)}% OFF
            </span>
          )}

          <div className="thumbnail position-relative text-center p-4 overflow-hidden">
            <Link href={`/product-details/${product._id}`}>
              <img
                src={product.image[0]}
                alt="apple"
                className="img-fluid group-hover:scale-105 transition-all ease-in-out transition-duration-500"
              />
            </Link>

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
                <i className="fa-regular fa-eye"></i>
              </a>
            </div>
          </div>
          <div className="card-content">
            <Link href={`/product-details/${product._id}`}>
              <div className="mb-2 tt-category tt-line-clamp tt-clamp-1">
                <a href="#" className="d-inline-block text-muted fs-xxs">
                  {product.category}
                </a>
              </div>
              <div className="card-title fw-medium d-block mb-2 tt-line-clamp tt-clamp-2">
                {product.name}
              </div>
              <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                <StarRating rating={product?.averageRating} />
                <span className="flex-shrink-0">
                  ({product.ratings?.length} Reviews)
                </span>
              </div>
              <div className="d-flex gap-3">
                <h6 className="price text-dark mb-4">
                  ৳{product.prices.price}.00
                </h6>
                {product.prices.discount >= 1 && (
                  <h6 className="price deleted text-danger mb-4">
                    ৳{product.prices.originalPrice}.00
                  </h6>
                )}
              </div>
            </Link>

            <a
              // type="button"
              onClick={() => handleAddToCartWithTracking(product)}
              className="btn btn-outline-secondary d-block btn-md hover:cursor-auto"
            >
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
