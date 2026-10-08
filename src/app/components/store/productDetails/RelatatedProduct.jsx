"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { useRef } from "react";
import useProducts from "../dataFetching/useProducts";
import useSingleProduct from "../dataFetching/useSingleProduct";
import ProductCard from "../common/card/ProductCard";
import { productCategoryList } from "@/app/utils/productCategory";

const RelatatedProduct = ({ id, initialProduct }) => {
  // Refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { product } = useSingleProduct(id, initialProduct);
  const { products } = useProducts();
  const currentCategories = productCategoryList(product);
  const relatadeProducts = products.filter(
    (item) =>
      item._id !== product?._id &&
      productCategoryList(item).some((category) =>
        currentCategories.includes(category)
      )
  );
  // console.log("relatadeProducts", relatadeProducts);
  if (relatadeProducts?.length === 0) {
    return <div></div>;
  }
  return (
    <section className="related-product-slider pb-120">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-sm-8">
            <div className="section-title text-center text-sm-start">
              <h2 className="mb-0">You may be interested</h2>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="rl-slider-btns text-center text-sm-end mt-3 mt-sm-0">
              <button
                ref={prevRef}
                className="rl-slider-btn slider-btn-prev d-inline-block"
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <button
                ref={nextRef}
                className="rl-slider-btn slider-btn-next ms-3 d-inline-block"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="rl-products-slider swiper mt-8">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // when window width is >= 1440px
              1440: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            className="swiper-wrapper pb-10"
          >
            {relatadeProducts.map((relatedProduct) => (
              <SwiperSlide key={relatedProduct._id}>
                <div className="row h-100">
                  <ProductCard
                    product={relatedProduct}
                    columnClassName="col-12"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RelatatedProduct;
