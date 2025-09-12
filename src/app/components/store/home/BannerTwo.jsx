"use client";

import Link from "next/link";
import useSetting from "../dataFetching/useSetting";

const BannerTwo = ({ setting }) => {
  // const { setting, settingLoading } = useSetting();
  // console.log("setting..", setting);
  return (
    <>
      <section className="banner-section position-relative z-1 overflow-hidden bg-white py-20">
        <img
          src="/img/shapes/bg-shape-3.png"
          alt="bg shape"
          className="position-absolute start-0 bottom-0 z--1 w-100"
        />
        <div className="container">
          <div
            className="cta-box rounded text-center"
            style={{ background: `url(${setting?.home?.home_banner_two_img})` }}
          >
            <div className="d-flex align-items-center justify-content-center flex-wrap gap-2 mb-2">
              <h6 className="mb-0 text-secondary gshop-subtitle">
                {setting?.home?.hone_banner_two_title}
              </h6>
              <span>
                <svg
                  width="58"
                  height="10"
                  viewBox="0 0 58 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="-6.99382e-08"
                    y1="5.2"
                    x2="52"
                    y2="5.2"
                    stroke="#FF7C08"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M58 5L50.5 9.33013L50.5 0.669872L58 5Z"
                    fill="#FF7C08"
                  />
                </svg>
              </span>
            </div>
            <h3 className="mb-5"> {setting?.home?.hone_banner_two_des}</h3>
            <Link href="/coupons" className="btn btn-secondary">
              Shop Now
              <span className="ms-2">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerTwo;
