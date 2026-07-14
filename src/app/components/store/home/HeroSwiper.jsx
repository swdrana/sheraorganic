"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";
import Link from "next/link";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { useEffect } from "react";
import { loadStylesheet } from "@/app/utils/loadStylesheet";

const HeroSwiper = ({ setting }) => {
  useEffect(() => {
    loadStylesheet("/css/swiper-bundle.min.css");
  }, []);

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      autoplay={{ delay: 5000 }}
      speed={700}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      pagination={{
        el: ".gshop-hero-slider-pagination",
        type: "bullets",
        clickable: true,
      }}
      className="swiper-wrapper"
    >
      {/* Slide 1 */}
      <SwiperSlide className="swiper-slide gshop-hero-single">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-5 col-lg-8">
            <div className="hero-left-content">
              <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">
                {setting?.home?.slider_one_subtitle}
              </span>
              <h1 className="display-4 mb-3">{setting?.home?.slider_one_title}</h1>
              <p className="mb-7 fs-6">{setting?.home?.slider_one_description}</p>
              <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                <Link href="/products" className="btn btn-secondary">
                  Shop Now <span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
                <Link href="/about" className="btn btn-primary">
                  About Us <span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
              <img
                src={optimizeCloudinaryUrl(setting?.home?.slider_one_img, 400, 60)}
                alt="fruits"
                className="img-fluid position-absolute end-0 top-50 hero-img"
                width="500"
                height="400"
                fetchpriority="high"
              />
              <img src="/img/shapes/tree.png" alt="tree" className="img-fluid position-absolute tree z-1" width="80" height="411" loading="lazy" />
              <img src="/img/shapes/orange-1.png" alt="orange" className="position-absolute orange-1 z-1" width="80" height="80" loading="lazy" />
              <img src="/img/shapes/orange-2.png" alt="orange" className="position-absolute orange-2 z-1" width="133" height="81" loading="lazy" />
              {/* LCP element — rendered as part of static shell, this duplicate is hidden */}
              <img src="/img/shapes/hero-circle-lg.webp" alt="" className="img-fluid hero-circle" width="400" height="400" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide className="swiper-slide gshop-hero-single">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-5 col-lg-8">
            <div className="hero-left-content">
              <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">
                {setting?.home?.slider_two_subtitle}
              </span>
              <h1 className="display-4 mb-3">{setting?.home?.slider_two_title}</h1>
              <p className="mb-7 fs-6">{setting?.home?.slider_two_description}</p>
              <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                <Link href="/products" className="btn btn-secondary">
                  Shop Now <span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
                <Link href="/about" className="btn btn-primary">
                  About Us <span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
              <img src={optimizeCloudinaryUrl(setting?.home?.slider_two_img, 400, 60)} alt="fruits" className="img-fluid position-absolute end-0 top-50 hero-img" width="500" height="400" loading="lazy" />
              <img src="/img/shapes/tree.png" alt="tree" className="img-fluid position-absolute tree z-1" width="80" height="411" loading="lazy" />
              <img src="/img/shapes/orange-1.png" alt="orange" className="position-absolute orange-1 z-1" width="80" height="80" loading="lazy" />
              <img src="/img/shapes/orange-2.png" alt="orange" className="position-absolute orange-2 z-1" width="133" height="81" loading="lazy" />
              <img src="/img/shapes/hero-circle-lg.webp" alt="" className="img-fluid hero-circle" width="400" height="400" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide className="swiper-slide gshop-hero-single">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-5 col-lg-8">
            <div className="hero-left-content">
              <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">
                {setting?.home?.slider_three_subtitle}
              </span>
              <h1 className="display-4 mb-3">{setting?.home?.slider_three_title}</h1>
              <p className="mb-7 fs-6">{setting?.home?.slider_three_description}</p>
              <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                <Link href="/products" className="btn btn-secondary">
                  Shop Now <span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
                <Link href="/about" className="btn btn-primary">
                  About Us <span className="ms-2"><i className="fa-solid fa-arrow-right"></i></span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
              <img src={optimizeCloudinaryUrl(setting?.home?.slider_three_img, 400, 60)} alt="fruits" className="img-fluid position-absolute end-0 top-50 hero-img" width="500" height="400" loading="lazy" />
              <img src="/img/shapes/tree.png" alt="tree" className="img-fluid position-absolute tree z-1" width="80" height="411" loading="lazy" />
              <img src="/img/shapes/orange-1.png" alt="orange" className="position-absolute orange-1 z-1" width="80" height="80" loading="lazy" />
              <img src="/img/shapes/orange-2.png" alt="orange" className="position-absolute orange-2 z-1" width="133" height="81" loading="lazy" />
              <img src="/img/shapes/hero-circle-lg.webp" alt="" className="img-fluid hero-circle" width="400" height="400" aria-hidden="true" loading="lazy" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSwiper;
