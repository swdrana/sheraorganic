"use client";

import Link from "next/link";
import StarRating from "../common/others/StartRating";
import useProducts from "../dataFetching/useProducts";
import { useMainContext } from "../provider/MainContextStore";

const ProductDetailsSidebar = () => {
  const { products } = useProducts();
  const featureProducts = products.filter((p) => p.averageRating >= 3);
  const { setOpenProductModal, setProductDetails } = useMainContext();
  // console.log("featureProducts", featureProducts);
  return (
    <>
      <div className="col-xl-3 col-lg-6 col-md-8">
        <div className="gshop-sidebar">
          <div className="sidebar-widget info-sidebar bg-white rounded-3 py-3">
            <div className="sidebar-info-list d-flex align-items-center gap-3 p-4">
              <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle text-primary">
                <i className="fa-solid fa-truck-fast"></i>
              </span>
              <div className="info-right">
                <h6 className="mb-1 fs-md">Free Shipping</h6>
                <span className="fw-medium fs-xs">For orders from $50</span>
              </div>
            </div>
            <div className="sidebar-info-list d-flex align-items-center gap-3 p-4 border-top">
              <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle text-primary">
                <i className="fa-solid fa-circle-dollar-to-slot"></i>
              </span>
              <div className="info-right">
                <h6 className="mb-1 fs-md">100% Money Back</h6>
                <span className="fw-medium fs-xs">
                  Guaranteed Product Warranty
                </span>
              </div>
            </div>
            <div className="sidebar-info-list d-flex align-items-center gap-3 p-4 border-top">
              <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-circle text-primary">
                <i className="fa-regular fa-heart"></i>
              </span>
              <div className="info-right">
                <h6 className="mb-1 fs-md">Safety & Secure</h6>
                <span className="fw-medium fs-xs">
                  Call us Anytime & Anywhere
                </span>
              </div>
            </div>
          </div>
          <div className="sidebar-widget banner-widget mt-4 p-0 border-0">
            <div
              className="vertical-banner text-center bg-white rounded-2"
              data-background="/img/banner/banner-4.jpg"
              style={{ backgroundImage: 'url("/img/banner/banner-4.jpg")' }}
            >
              <h5 className="mb-1">Fresh &amp; Organic Spice</h5>
              <div className="d-flex align-items-center justify-content-center gap-2">
                <span className="hot-badge bg-danger fw-bold fs-xs position-relative text-white">
                  HOT
                </span>
                <span className="offer-title text-danger fw-bold">30% Off</span>
              </div>
              <Link
                href="/products"
                className="explore-btn text-primary fw-bold"
              >
                Shop Now
                <span className="ms-2">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
          <div className="sidebar-widget products-widget py-5 px-4 bg-white mt-4">
            <div className="widget-title d-flex">
              <h6 className="mb-0 flex-shrink-0">Featured Products</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>
            <div className="sidebar-products-list">
              {featureProducts?.slice(0, 4).map((p, i) => (
                <div
                  key={i}
                  className="horizontal-product-card card-md d-sm-flex align-items-center bg-white rounded-2 gap-3 mt-4"
                >
                  <div className="thumbnail position-relative rounded-2">
                    <a href="#">
                      <img
                        src={p?.image[0]}
                        alt="product"
                        className="img-fluid"
                      />
                    </a>
                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-2 rounded-2">
                      <a
                        type="button"
                        onClick={() => {
                          setOpenProductModal(true), setProductDetails(p);
                        }}
                        className="rounded-btn"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </a>
                    </div>
                  </div>
                  <div className="card-content mt-3 mt-sm-0">
                    <Link
                      href={`/product-details/${p._id}`}
                      className="d-block fs-sm fw-bold text-heading title tt-line-clamp tt-clamp-2 d-block"
                    >
                      {p.name}
                    </Link>
                    <div className="pricing mt-0">
                      <span className="fw-bold fs-xxs text-danger">
                        ${p.prices.price}.00
                      </span>
                    </div>
                    <div className="d-flex align-items-center flex-nowrap star-rating mt-1">
                      <StarRating rating={p.averageRating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsSidebar;
