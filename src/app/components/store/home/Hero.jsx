"use client";
import HeroSwiper from "./HeroSwiper";
import Link from "next/link";

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
