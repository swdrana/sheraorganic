"use client";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles and any additional modules you need
import { Autoplay, EffectFade, Navigation, Pagination, Parallax } from "swiper";
import Link from "next/link";
import useSetting from "../dataFetching/useSetting";
const Hero = ({ setting }) => {
  // const session = useSession();
  // console.log("session...", session);
  // const { setting, settingLoading } = useSetting();
  // console.log("setting", setting);
  return (
    <>
      <section className="gshop-hero pt-120 bg-white position-relative z-1 overflow-hidden">
        {/* Background shapes */}
        <img
          src="/img/shapes/leaf-shadow.png"
          alt="leaf"
          className="position-absolute leaf-shape z--1 rounded-circle"
        />
        <img
          src="/img/shapes/mango.png"
          alt="mango"
          className="position-absolute mango z--1"
          data-parallax='{"y": -120}'
        />
        <img
          src="/img/shapes/hero-circle-sm.png"
          alt="circle"
          className="position-absolute hero-circle circle-sm z--1"
        />

        <div className="container">
          <div className="gshop-hero-slider swiper">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              autoplay={{
                delay: 5000,
              }}
              speed={700}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              pagination={{
                el: ".gshop-hero-slider-pagination",
                type: "bullets",
                clickable: true,
              }}
              className="swiper-wrapper"
            >
              <SwiperSlide className="swiper-slide gshop-hero-single">
                <div className="row align-items-center justify-content-between">
                  {setting?.home ? (
                    <>
                      {/* Content when data is available */}
                      <div className="col-xl-5 col-lg-8">
                        <div className="hero-left-content">
                          <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">
                            {setting?.home?.slider_one_subtitle}
                          </span>
                          <h1 className="display-4 mb-3">
                            {setting?.home?.slider_one_title}
                          </h1>
                          <p className="mb-7 fs-6">
                            {setting?.home?.slider_one_description}
                          </p>
                          <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                            <Link
                              href="/products"
                              className="btn btn-secondary"
                            >
                              Shop Now
                              <span className="ms-2">
                                <i className="fa-solid fa-arrow-right"></i>
                              </span>
                            </Link>
                            <Link href="/about" className="btn btn-primary">
                              About Us
                              <span className="ms-2">
                                <i className="fa-solid fa-arrow-right"></i>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-7">
                        <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                          <img
                            src={setting?.home?.slider_one_img}
                            alt="fruits"
                            className="img-fluid position-absolute end-0 top-50 hero-img"
                          />
                          <img
                            src="/img/shapes/tree.png"
                            alt="tree"
                            className="img-fluid position-absolute tree z-1"
                          />
                          <img
                            src="/img/shapes/orange-1.png"
                            alt="orange"
                            className="position-absolute orange-1 z-1"
                          />
                          <img
                            src="/img/shapes/orange-2.png"
                            alt="orange"
                            className="position-absolute orange-2 z-1"
                          />
                          <img
                            src="/img/shapes/hero-circle-lg.png"
                            alt="circle shape"
                            className="img-fluid hero-circle"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Skeleton loading effect */}
                      <div className="col-xl-5 col-lg-8">
                        <div className="hero-left-content">
                          <div
                            className="pulse rounded mb-2"
                            style={{
                              width: "180px",
                              height: "24px",
                              marginBottom: "16px",
                            }}
                          ></div>
                          <div
                            className="pulse rounded mb-3"
                            style={{
                              width: "60%",
                              height: "32px",
                              marginBottom: "16px",
                            }}
                          ></div>
                          <div
                            className="pulse rounded mb-4"
                            style={{
                              width: "80%",
                              height: "20px",
                              marginBottom: "32px",
                            }}
                          ></div>
                          <div className="d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                            <div
                              className="pulse rounded mb-2"
                              style={{ width: "120px", height: "40px" }}
                            ></div>
                            <div
                              className="pulse rounded mb-2"
                              style={{ width: "120px", height: "40px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-7">
                        <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                          <div
                            className="pulse rounded-circle"
                            style={{
                              width: "200px",
                              height: "200px",
                              margin: "0 auto",
                            }}
                          ></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide gshop-hero-single">
                <div className="row align-items-center justify-content-between">
                  <div className="col-xl-5 col-lg-8">
                    <div className="hero-left-content">
                      <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">
                        {setting?.home?.slider_two_subtitle}
                      </span>
                      <h1 className="display-4 mb-3">
                        {setting?.home?.slider_two_title}
                      </h1>
                      <p className="mb-7 fs-6">
                        {setting?.home?.slider_two_description}
                      </p>
                      <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                        <Link href="/products" className="btn btn-secondary">
                          Shop Now
                          <span className="ms-2">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </Link>
                        <Link href="/about" className="btn btn-primary">
                          About Us
                          <span className="ms-2">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7">
                    <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                      <img
                        src={setting?.home?.slider_two_img}
                        alt="fruits"
                        className="img-fluid position-absolute end-0 top-50 hero-img"
                      />
                      <img
                        src="/img/shapes/tree.png"
                        alt="tree"
                        className="img-fluid position-absolute tree z-1"
                      />
                      <img
                        src="/img/shapes/orange-1.png"
                        alt="orange"
                        className="position-absolute orange-1 z-1"
                      />
                      <img
                        src="/img/shapes/orange-2.png"
                        alt="orange"
                        className="position-absolute orange-2 z-1"
                      />
                      <img
                        src="/img/shapes/hero-circle-lg.png"
                        alt="circle shape"
                        className="img-fluid hero-circle"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide gshop-hero-single">
                <div className="row align-items-center justify-content-between">
                  <div className="col-xl-5 col-lg-8">
                    <div className="hero-left-content">
                      <span className="gshop-subtitle fs-5 text-secondary mb-2 d-block">
                        {setting?.home?.slider_three_subtitle}
                      </span>
                      <h1 className="display-4 mb-3">
                        {setting?.home?.slider_three_title}
                      </h1>
                      <p className="mb-7 fs-6">
                        {setting?.home?.slider_three_description}
                      </p>
                      <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                        <Link href="/products" className="btn btn-secondary">
                          Shop Now
                          <span className="ms-2">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </Link>
                        <Link href="/about" className="btn btn-primary">
                          About Us
                          <span className="ms-2">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7">
                    <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                      <img
                        src={setting?.home?.slider_three_img}
                        alt="fruits"
                        className="img-fluid position-absolute end-0 top-50 hero-img"
                      />
                      <img
                        src="/img/shapes/tree.png"
                        alt="tree"
                        className="img-fluid position-absolute tree z-1"
                      />
                      <img
                        src="/img/shapes/orange-1.png"
                        alt="orange"
                        className="position-absolute orange-1 z-1"
                      />
                      <img
                        src="/img/shapes/orange-2.png"
                        alt="orange"
                        className="position-absolute orange-2 z-1"
                      />
                      <img
                        src="/img/shapes/hero-circle-lg.png"
                        alt="circle shape"
                        className="img-fluid hero-circle"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="gs-hero-social">
          <ul className="list-unstyled">
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={setting?.home?.hero_facebook_link || "#"}
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={setting?.home?.hero_twitter_link || "#"}
              >
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={setting?.home?.hero_linkdin_link || "#"}
              >
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={setting?.home?.hero_youtube_link || "#"}
              >
                <i className="fab fa-youtube"></i>
              </Link>
            </li>
          </ul>
          <span className="title fw-medium">Follow on</span>
        </div>
        <div className="gshop-hero-slider-pagination theme-slider-control position-absolute top-50 translate-middle-y z-5"></div>
      </section>
    </>
  );
};

export default Hero;
