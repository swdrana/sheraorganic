"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { normalizeCategory, productMatchesCategory } from "@/app/utils/productCategory";

const Category = ({ categorys, products }) => {
  // Swiper's loop mode clones slides on the client only, so enabling it during hydration made the
  // server HTML mismatch and React re-rendered the whole page in the browser. Turn it on after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const loop = mounted && categorys?.length > 6;
  // const { categorys, categoryLoading } = useCategory();
  // const { products, productsLoading } = useProducts();
  return (
    <>
      <section className="gshop-category-section bg-white pt-120 position-relative z-1 overflow-hidden">
        <img
          src="/img/shapes/bg-shape.webp"
          alt="bg shape"
          className="position-absolute bottom-0 start-0 w-100 z--1"
        />
        <div className="container">
          <div className="gshop-category-box border-secondary rounded-3 bg-white">
            <div className="text-center section-title">
              <h2 className="d-inline-block px-2 bg-white mb-4 fw-bold">
                Our Top Category
              </h2>
            </div>
            <Swiper
              key={loop ? "loop" : "static"}
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={loop}
              grabCursor
              spaceBetween={10}
              style={{ paddingBottom: 8 }}
              breakpoints={{
                0: { slidesPerView: 3.3, spaceBetween: 8 },
                420: { slidesPerView: 3.8 },
                576: { slidesPerView: 4.5 },
                768: { slidesPerView: 5 },
                992: { slidesPerView: 6 },
                1200: { slidesPerView: 7 },
              }}
            >
              {categorys?.slice(0, 12).map((category, index) => (
                <SwiperSlide key={index}>
                  <Link
                    href={`/products/category=${category.name
                      .replace(/\s+/g, "")
                      .toLowerCase()}=${category._id}`}
                    className="d-block"
                  >
                    <div
                      className={`gshop-animated-iconbox py-3 px-2 py-md-4 px-md-3 text-center border rounded-3 position-relative overflow-hidden ${
                        category.colorClass || ""
                      }`}
                    >
                      <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                        <img
                          src={optimizeCloudinaryUrl(category.icon, 80)}
                          alt={category.name}
                          className="img-fluid"
                          width="48"
                          height="48"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-dark fs-xxs fs-md-sm fw-bold d-block mt-2 mt-md-3">
                        {category.name}
                      </div>
                      <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">
                        {
                          products?.filter((product) =>
                            productMatchesCategory(
                              product,
                              normalizeCategory(category.name)
                            )
                          ).length
                        }{" "}
                      </span>
                      <div className="explore-btn position-absolute">
                        <i className="fa-solid fa-arrow-up"></i>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
