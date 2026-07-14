"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";

const HeroSwiper = dynamic(() => import("./HeroSwiper"), { ssr: false });

const StaticHero = ({ setting }) => {
  return (
    <div className="swiper-wrapper">
      <div className="swiper-slide gshop-hero-single">
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
                src={optimizeCloudinaryUrl(setting?.home?.slider_one_img, 600, 80)}
                alt="fruits"
                className="img-fluid position-absolute end-0 top-50 hero-img"
                width="500"
                height="400"
                fetchpriority="high"
              />
              <img src="/img/shapes/tree.png" alt="tree" className="img-fluid position-absolute tree z-1" width="80" height="411" loading="lazy" />
              <img src="/img/shapes/orange-1.png" alt="orange" className="position-absolute orange-1 z-1" width="80" height="80" loading="lazy" />
              <img src="/img/shapes/orange-2.png" alt="orange" className="position-absolute orange-2 z-1" width="133" height="81" loading="lazy" />
              <img src="/img/shapes/hero-circle-lg.webp" alt="" className="img-fluid hero-circle" width="400" height="400" aria-hidden="true" fetchpriority="high" loading="eager" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = ({ setting }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
            {mounted ? (
              <HeroSwiper setting={setting} />
            ) : (
              <StaticHero setting={setting} />
            )}
          </div>
        </div>

        {/* Social links */}
        <div className="gs-hero-social">
          <ul className="list-unstyled">
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_facebook_link || "#"} aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </Link>
            </li>
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_twitter_link || "#"} aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_linkdin_link || "#"} aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </li>
            <li>
              <Link target="_blank" rel="noopener noreferrer" href={setting?.home?.hero_youtube_link || "#"} aria-label="YouTube">
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
