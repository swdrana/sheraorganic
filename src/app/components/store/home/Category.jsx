"use client";
import Link from "next/link";
import { optimizeCloudinaryUrl } from "@/app/utils/cloudinary";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Category = ({ categorys, products }) => {
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
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={categorys?.length > 6}
              grabCursor
              spaceBetween={16}
              style={{ paddingBottom: 8 }}
              breakpoints={{
                0: { slidesPerView: 2.2 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 5 },
                1200: { slidesPerView: 6 },
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
                      className={`gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden ${
                        category.colorClass || ""
                      }`}
                    >
                      <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                        <img
                          src={optimizeCloudinaryUrl(category.icon, 80)}
                          alt={category.name}
                          className="img-fluid"
                          width="62"
                          height="62"
                          loading="lazy"
                        />
                      </div>
                      <div className="text-dark fs-sm fw-bold d-block mt-3">
                        {category.name}
                      </div>
                      <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">
                        {
                          products?.filter(
                            (p) =>
                              p.category.replace(/\s+/g, "").toLowerCase() ===
                              category.name.replace(/\s+/g, "").toLowerCase()
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
