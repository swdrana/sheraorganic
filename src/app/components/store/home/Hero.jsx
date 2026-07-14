"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

// Dynamically import HeroSwiper — Swiper JS does NOT load on initial render
// This removes ~200 KiB from the initial JS bundle, drastically improving LCP
const HeroSwiper = dynamic(() => import("./HeroSwiper"), {
  ssr: false,
  loading: () => (
    // Static first-slide placeholder shown while Swiper loads
    // Renders immediately without any JS — critical for LCP
    <div className="swiper-wrapper">
      <div className="swiper-slide gshop-hero-single">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-5 col-lg-8">
            <div className="hero-left-content">
              <div className="pulse rounded mb-2" style={{ width: "180px", height: "24px", marginBottom: "16px" }}></div>
              <div className="pulse rounded mb-3" style={{ width: "60%", height: "48px", marginBottom: "16px" }}></div>
              <div className="pulse rounded mb-4" style={{ width: "80%", height: "20px", marginBottom: "32px" }}></div>
              <div className="d-flex align-items-center gap-3 gap-sm-5 flex-wrap">
                <div className="pulse rounded" style={{ width: "130px", height: "44px" }}></div>
                <div className="pulse rounded" style={{ width: "130px", height: "44px" }}></div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
              {/* Circle is always visible immediately — this is the LCP element */}
              <img
                src="/img/shapes/hero-circle-lg.webp"
                alt="circle shape"
                className="img-fluid hero-circle"
                width="400"
                height="400"
                fetchpriority="high"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});

const Hero = ({ setting }) => {
  return (
    <>
      <section className="gshop-hero pt-120 bg-white position-relative z-1 overflow-hidden">
        {/* Background shapes — load lazily (not LCP) */}
        <img
          src="/img/shapes/leaf-shadow.webp"
          alt="leaf"
          className="position-absolute leaf-shape z--1 rounded-circle"
          width="200"
          height="197"
          loading="lazy"
        />
        <img
          src="/img/shapes/mango.png"
          alt="mango"
          className="position-absolute mango z--1"
          data-parallax='{"y": -120}'
          width="114"
          height="114"
          loading="lazy"
        />
        <img
          src="/img/shapes/hero-circle-sm.png"
          alt="circle"
          className="position-absolute hero-circle circle-sm z--1"
          width="134"
          height="133"
          loading="lazy"
        />

        <div className="container">
          <div className="gshop-hero-slider swiper">
            {/* HeroSwiper loads Swiper JS only after initial paint */}
            <HeroSwiper setting={setting} />
          </div>
        </div>

        {/* Social links */}
        <div className="gs-hero-social">
          <ul className="list-unstyled">
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_facebook_link || "#"}>
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_twitter_link || "#"}>
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_linkdin_link || "#"}>
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </li>
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_youtube_link || "#"}>
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
