"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { Autoplay, Pagination } from "swiper";
import usebrands from "../dataFetching/useBrand";

const AboutBrandSlider = ({ setting, brands }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="brands-section ptb-120 position-relative z-1 overflow-hidden service-section">
      <img
        src="/img/shapes/bg-shape-4.png"
        alt="bg shape"
        className="position-absolute start-0 bottom-0 w-100 z--1 bg-shape"
      />
      {isClient && (
        <div className="container">
          <div className="brand-wrapper px-5 rounded-4">
            <h4 className="section-title mb-0">
              {setting?.about_top_brand_title}
            </h4>
            <div className="brands-slider swiper px-2 pt-4 pb-7">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                autoplay={{ delay: 3000 }}
                loop={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 5,
                  },
                }}
              >
                {brands.map((brand) => (
                  <SwiperSlide
                    key={brand._id}
                    className="swiper-slide brand-item rounded"
                  >
                    <img
                      src={brand.icon}
                      alt={brand.name}
                      className="img-fluid"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutBrandSlider;
