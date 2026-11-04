"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { productMedia } from "@/app/utils/productMedia";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function ProductMediaGallery({ product }) {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const media = productMedia(product);

  if (!media.length) return <div className="ratio ratio-1x1 bg-light" aria-label="পণ্যের ছবি নেই" />;

  return (
    <div className="quickview-double-slider">
      <div className="quickview-product-slider">
        <Swiper
          modules={[Thumbs]}
          thumbs={{ swiper: thumbSwiper && !thumbSwiper.destroyed ? thumbSwiper : null }}
          slidesPerView={1}
          centeredSlides
          speed={700}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {media.map((item, index) => (
            <SwiperSlide key={`${item.type}-${index}`} className="swiper-slide text-center">
              {item.type === "image" ? (
                <img src={item.src} alt={product.name} className="img-fluid" />
              ) : (
                <div className="ratio ratio-16x9">
                  <ReactPlayer
                    url={item.src}
                    width="100%"
                    height="100%"
                    controls
                    light
                    playing={activeIndex === index}
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="product-thumbnail-slider mt-2">
        <Swiper
          onSwiper={setThumbSwiper}
          watchSlidesProgress
          slideToClickedSlide
          slidesPerView={4}
          speed={700}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2 },
            380: { slidesPerView: 3 },
            576: { slidesPerView: 4 },
          }}
        >
          {media.map((item, index) => (
            <SwiperSlide
              key={`${item.type}-${index}`}
              className="swiper-slide product-thumb-single rounded-2 d-flex align-items-center justify-content-center"
            >
              {item.type === "image" ? (
                <img src={item.src} alt={product.name} className="img-fluid" />
              ) : (
                <span className="d-flex align-items-center justify-content-center w-100 h-100 bg-light" aria-label="পণ্যের ভিডিও">
                  <i className="fa-solid fa-play fa-2x text-danger" aria-hidden="true"></i>
                </span>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
