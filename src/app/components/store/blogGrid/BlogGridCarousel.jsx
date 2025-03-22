"use client"
import React from 'react';
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Make sure to import Swiper styles

const BlogGridCarousel = () => {
  const blogPosts = [
    {
      id: 1,
      imgSrc: "/img/gallery/gallery-lg-5.jpg",
      title: "Ways To Choose Fruits & Seafoods Good For Pregnancy",
      content: "Professionally build unique markets via parallel total linkage. Monotonectally maximize corporate intellectual capital whereas granular catalysts for change. Assertively provide access to inexpensive technologies whereas virtual platforms.",
      author: "Wendell Carter",
      authorImg: "/img/authors/client-1.png",
      date: "May 24, 2022",
    },
    {
      id: 2,
      imgSrc: "/img/gallery/gallery-lg-4.jpg",
      title: "The Best Great Benefits Of Fresh Beef For Women's Health",
      content: "Assertively target market lorem ipsum is onsectetur noted et dolore.",
      author: "Wendell Carter",
      authorImg: "/img/authors/client-2.png",
      date: "May 24, 2022",
    },
    {
      id: 3,
      imgSrc: "/img/gallery/gallery-lg-1.jpg",
      title: "Healthy Eating Habits For A Better Lifestyle",
      content: "Transform your life with the right eating habits and nutrition.",
      author: "Wendell Carter",
      authorImg: "/img/authors/client-3.png",
      date: "May 24, 2022",
    },
  ];

  return (
    <section className="blog-carousel-section">
      <div className="container">
       <div className="blog-carousel">
       <Swiper
        modules={[Pagination, Autoplay]} // Include Pagination and Autoplay modules
        slidesPerView={1}
        speed={700}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={24}
        loop={true}
        pagination={{
          el: ".blog-carousel-control",
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 1,
          },
        }}
          
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="article-horizontal card-lg rounded-3 p-5 d-flex align-items-center gap-4 bg-white shadow">
                <div className="thumbnail overflow-hidden flex-shrink-0 rounded-2">
                  <a href="#">
                    <img src={post.imgSrc} alt="gallery" className="img-fluid" />
                  </a>
                </div>
                <div className="article-contents">
                  <div className="blog-meta d-flex align-items-center gap-3 flex-wrap mb-2">
                    <span className="fw-medium fs-xs">
                      <i className="fa-solid fa-tags me-2"></i>Organic Vegetable
                    </span>
                    <span className="fw-medium fs-xs">
                      <i className="fa-regular fa-clock me-2"></i>{post.date}
                    </span>
                  </div>
                  <a href="#">
                    <h3 className="mb-3">{post.title}</h3>
                  </a>
                  <p className="mb-4">{post.content}</p>
                  <div className="d-flex justify-content-between gap-3">
                    <div className="d-inline-flex align-items-center gap-3">
                      <div className="author-thumb">
                        <img src={post.authorImg} alt="author" className="rounded-circle" />
                      </div>
                      <div className="author-info">
                        <h6 className="mb-1">{post.author}</h6>
                        <span className="fs-xs">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
       </div>
        <div className="blog-carousel-control theme-slider-control text-center mt-6"></div>
      </div>
    </section>
  );
};

export default BlogGridCarousel;

