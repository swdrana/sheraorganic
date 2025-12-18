"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import Swiper styles
import { Autoplay, EffectCoverflow, Navigation, Controller } from "swiper";
import useSetting from "../dataFetching/useSetting";

const FeedbackSection = ({ setting }) => {
  // const { setting, settingLoading } = useSetting();
  //   console.log("setting", setting);
  const feedbacks = [
    {
      text: `${setting?.home?.client_one_comment}`,
      name: `${setting?.home?.client_one_name}`,
      image: `${setting?.home?.client_one_img}`,
    },
    {
      text: `${setting?.home?.client_two_comment}`,
      name: `${setting?.home?.client_two_name}`,
      image: `${setting?.home?.client_two_img}`,
    },
    {
      text: `${setting?.home?.client_three_comment}`,
      name: `${setting?.home?.client_three_name}`,
      image: `${setting?.home?.client_three_img}`,
    },
    {
      text: `${setting?.home?.client_four_comment}`,
      name: `${setting?.home?.client_four_name}`,
      image: `${setting?.home?.client_four_img}`,
    },
    {
      text: `${setting?.home?.client_five_comment}`,
      name: `${setting?.home?.client_five_name}`,
      image: `${setting?.home?.client_five_img}`,
    },
  ];

  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [feedbackSwiper, setFeedbackSwiper] = useState(null);

  return (
    <>
      <section className="ptb-120 bg-shade position-relative overflow-hidden z-1 feedback-section">
        <img
          src="/img/shapes/bg-shape-5.png"
          alt="bg shape"
          className="position-absolute start-0 bottom-0 z--1 w-100"
        />
        <img
          src="/img/shapes/map-bg.png"
          alt="map"
          className="position-absolute start-50 top-50 translate-middle z--1"
        />
        <img
          src="/img/shapes/fd-1.png"
          alt="shape"
          className="position-absolute z--1 fd-1"
        />
        <img
          src="/img/shapes/fd-2.png"
          alt="shape"
          className="position-absolute z--1 fd-2"
        />
        <img
          src="/img/shapes/fd-3.png"
          alt="shape"
          className="position-absolute z--1 fd-3"
        />
        <img
          src="/img/shapes/fd-4.png"
          alt="shape"
          className="position-absolute z--1 fd-4"
        />
        <img
          src="/img/shapes/fd-5.png"
          alt="shape"
          className="position-absolute z--1 fd-5"
        />

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="section-title text-center">
                <h2 className="mb-6 fw-bold">{setting?.home?.our_client_say_title}</h2>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="gshop-feedback-slider-wrapper">
                <div className="swiper gshop-feedback-thumb-slider">
                  <Swiper
                    onSwiper={setThumbSwiper} // Set the instance for thumbnail slider
                    slidesPerView={5}
                    loop={true}
                    centeredSlides={true}
                    effect="coverflow"
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 90,
                      depth: 120,
                      modifier: 1.5,
                      slideShadows: false,
                    }}
                    modules={[
                      Navigation,
                      Autoplay,
                      EffectCoverflow,
                      Controller,
                    ]}
                    controller={{ control: feedbackSwiper }}
                  >
                    {feedbacks.map((feedback, index) => (
                      <SwiperSlide key={index} className="control-thumb">
                        <img
                          src={feedback.image}
                          alt="clients"
                          className="img-fluid rounded-circle"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="swiper gshop-feedback-slider mt-4">
                  <Swiper
                    onSwiper={setFeedbackSwiper} // Set the instance for feedback slider
                    slidesPerView={1}
                    centeredSlides={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    speed={700}
                    loop={true}
                    loopedSlides={6}
                    controller={{ control: thumbSwiper }} // Sync with thumb slider
                    modules={[Navigation, Autoplay, Controller]}
                  >
                    {feedbacks.map((feedback, index) => (
                      <SwiperSlide
                        key={index}
                        className="feedback-single text-center"
                      >
                        <p className="mb-5">{feedback.text}</p>
                        <span className="clients_name text-dark fw-bold d-block mb-1">
                          {feedback.name}
                        </span>
                        {/* <ul className="star-rating fs-sm d-inline-flex align-items-center text-warning">
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                      <li>
                        <i className="fas fa-star"></i>
                      </li>
                    </ul> */}
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedbackSection;
