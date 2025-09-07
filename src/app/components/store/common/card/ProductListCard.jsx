"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import useAddToCart from "../../hooks/useAddToCart";
import { trackAddToCart } from "@/app/utilities/facebookPixel";
const ProductListCard = ({ product }) => {
  const { handelAddItem, handleIncrement, handleDecrement } = useAddToCart();
  const { data: session } = useSession();

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
      <div className="col-xl-12">
        <div className="vertical-product-card rounded-2 position-relative d-md-flex align-items-center bg-white hr-product">
          <div className="thumbnail position-relative text-center p-4 flex-shrink-0">
            <img
              src={product.image[0]}
              alt="Rambutan Sweet Delicious Fruit"
              className="img-fluid"
            />
          </div>
          <div className="card-content w-100">
            <div className="mb-2 tt-category tt-line-clamp tt-clamp-1">
              <Link
                href={`/products/brands=${product.brand
                  .replace(/\s+/g, "")
                  .toLowerCase()}=${product._id}`}
                className="d-inline-block text-muted fs-xxs"
              >
                {product.brand}
              </Link>
            </div>

            <Link className="h5 mb-3" href={`/product-details/${product._id}`}>
              {product.name}
            </Link>

            <h6 className="price">
              <span className="fw-bold h4 text-danger">
                ${product.prices.price}.00
              </span>
            </h6>

            <form action="" className="direct-add-to-cart-form">
              <input
                type="hidden"
                name="_token"
                value="0NP7oZpmGL1Lo4F13enj33GcQhz8jJcLcu0L9k6w"
              />
              <input type="hidden" name="product_variation_id" value="47" />
              <input type="hidden" value="1" name="quantity" />

              <a
                type="button"
                onClick={() => handleAddToCartWithTracking(product)}
                className="btn btn-outline-secondary btn-sm border-secondary mt-4 direct-add-to-cart-btn add-to-cart-text"
              >
                Add to Cart
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListCard;
