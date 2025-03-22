"use client";

import { RiDeleteBack2Line } from "react-icons/ri";
import useAddWishlist from "../hooks/useAddWishlist";
import Link from "next/link";
import StarRating from "../common/others/StartRating";
import { useMainContext } from "../provider/MainContextStore";
import ProductModal from "../common/others/ProductModal";

const Wishlist = () => {
  const { handleWishlist, wishlist, removeWishlist } = useAddWishlist();
  // console.log("wishlist...", wishlist);
  const { setOpenProductModal, setProductDetails } = useMainContext();
  return (
    <>
      <ProductModal />
      {wishlist?.length === 0 ? (
        <div className="mt-5 text-center">
          <p className="lead text-muted">No wishlist products found.</p>
          <p className="text-secondary">
            Start adding items to your wishlist to view them here.
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div className="bg-white p-7 rounded-md">
            <div className="row justify-content-center g-4 filter_group">
              {wishlist?.map((product, i) => (
                <div
                  key={i}
                  className="col-xxl-3 col-lg-4 col-md-6 col-sm-10 filter_item beans_peas"
                >
                  <div className="vertical-product-card trend_style rounded-2 position-relative">
                    <div
                      className="position-absolute top-0 start-0 p-4  z-1"
                      style={{ cursor: "pointer" }}
                    >
                      <RiDeleteBack2Line
                        onClick={() => removeWishlist(product)}
                        className="text-danger  "
                        size={24}
                      />
                    </div>
                    <div className="thumbnail position-relative text-center p-4">
                      <Link href={`/product-details/${product._id}`}>
                        <img
                          src={product.image[0]}
                          alt="apple"
                          className="img-fluid"
                        />{" "}
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
                          {wishlist?.some(
                            (item) => item._id === product._id
                          ) ? (
                            <i className="fa-solid fa-heart"></i>
                          ) : (
                            <i className="fa-regular fa-heart"></i>
                          )}
                        </a>

                        <a
                          type="button"
                          onClick={() => {
                            setOpenProductModal(true),
                              setProductDetails(product);
                          }}
                          className="rounded-btn"
                        >
                          <i className="fa-regular fa-eye"></i>{" "}
                        </a>
                      </div>
                    </div>
                    <div className="card-content">
                      <Link
                        href={`/product-details/${product._id}`}
                        className="card-title tt-line-clamp tt-clamp-2 fw-bold d-block mb-2"
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
                    </div>
                    <div className="card-btn bg-white">
                      <a
                        href="#"
                        className="btn btn-secondary d-block btn-md rounded-1"
                      >
                        Add to Cart{" "}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Wishlist;
