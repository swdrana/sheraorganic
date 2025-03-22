"use client";
import Link from "next/link";
import useProducts from "../dataFetching/useProducts";
import FeatureBrandProductCard from "../common/card/FeatureBrandProductCard";
import useSetting from "../dataFetching/useSetting";
import Loading from "../common/others/Loading";

import "react-loading-skeleton/dist/skeleton.css";
import FeaturedBrandProductLoader from "../common/skeletonLoader/FeaturedBrandProductLoader";
const FeatureProduct = ({ products, setting }) => {
  // const { products, productsLoading } = useProducts();
  // const { setting, settingLoading } = useSetting();

  // console.log("setting..", setting);
  const featureBrandProductOne = products?.filter(
    (p) =>
      p.brand.replace(/\s+/g, "").toLowerCase() ===
      setting?.home?.featured_brand_one.replace(/\s+/g, "").toLowerCase()
  );
  const featureBrandProductTwo = products?.filter(
    (p) =>
      p.brand.replace(/\s+/g, "").toLowerCase() ===
      setting?.home?.featured_brand_two.replace(/\s+/g, "").toLowerCase()
  );
  return (
    <>
      <section className="featured-products pt-120 pb-200 bg-shade position-relative overflow-hidden z-1">
        <img
          src="/img/shapes/roll-1.png"
          alt="roll"
          className="position-absolute roll-1 z--1"
          data-parallax='{"y": -120}'
        />
        <img
          src="/img/shapes/roll-2.png"
          alt="roll"
          className="position-absolute roll-2 z--1"
          data-parallax='{"y": 120}'
        />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="section-title text-center mb-4">
                <h3 className="mb-2">{setting?.home?.featured_brand_title}</h3>
                <p className="mb-0">
                  {setting?.home?.featured_brand_description}
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-xxl-4 col-lg-6">
              {featureBrandProductOne?.slice(0, 4).map((p, i) => (
                <FeatureBrandProductCard product={p} key={i} i={i} />
              ))}
            </div>
            <div className="col-xxl-4 col-lg-6 order-3 order-xxl-2">
              <div className="product-card-lg bg-white rounded-2 d-flex flex-coloumn h-100">
                <div>
                  <div className="card-content position-relative z-2">
                    <span className="fs-xs gshop-subtitle text-secondary">
                      {setting?.home?.featured_brand_banner_title}
                    </span>
                    <h4 className="mb-0">
                      {setting?.home?.featured_brand_one}
                    </h4>
                    <h3 className="mb-3">
                      {setting?.home?.featured_brand_two}
                    </h3>
                    <p className="mb-4">
                      {setting?.home?.featured_brand_banner_description}
                    </p>
                    <Link href="/products" className="btn btn-secondary">
                      Shop Now{" "}
                      <span className="ms-2">
                        <i className="fas fa-arrow-right"></i>
                      </span>{" "}
                    </Link>
                  </div>

                  <div className="thumbnail position-relative z-1">
                    <img
                      src="/img/pago.png"
                      alt="pago"
                      className="img-fluid p-4"
                    />
                    <img
                      src="/img/shapes/circle-md.png"
                      alt="circle"
                      className="position-absolute end-0 bottom-0 z--1 d-none d-sm-block"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-lg-6 order-2 order-xxl-3">
              {featureBrandProductTwo?.slice(0, 4).map((p, i) => (
                <FeatureBrandProductCard key={i} i={i} product={p} />
              ))}
            </div>
          </div>
        </div>

        <img
          src="/img/shapes/bg-shape-2.png"
          alt="bg shape"
          className="position-absolute start-0 bottom-0 w-100 z--1"
        />
      </section>
    </>
  );
};

export default FeatureProduct;
