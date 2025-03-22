"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { Navigation } from 'swiper';


const AboutTeam = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Frances Gilmartin',
      title: 'CEO & Founder',
      image: '/img/authors/team-1.jpg',
    },
    {
      id: 2,
      name: 'Frances Gilmartin',
      title: 'CEO & Founder',
      image: '/img/authors/team-2.jpg',
    },
    {
      id: 3,
      name: 'Frances Gilmartin',
      title: 'CEO & Founder',
      image: '/img/authors/team-1.jpg',
    },
    {
      id: 4,
      name: 'Frances Gilmartin',
      title: 'CEO & Founder',
      image: '/img/authors/team-2.jpg',
    },
  ];

  return (
    <section className="grostore-team-section pt-6 bg-shade position-relative z-1 overflow-hidden">
      <img src="/img/shapes/bg-shape-5.png" alt="bg shape" className="position-absolute start-0 bottom-0 z--1 w-100" />
      <div className="container">
        <div className="row align-items-center g-3">
          <div className="col-xl-3">
            <div className="section-title">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h6 className="mb-0 gshop-subtitle text-secondary">Team Members</h6>
                <span>
                  <svg width="58" height="10" viewBox="0 0 58 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-6.99382e-08" y1="5.2" x2="52" y2="5.2" stroke="#FF7C08" strokeWidth="1.6" />
                    <path d="M58 5L50.5 9.33013L50.5 0.669872L58 5Z" fill="#FF7C08" />
                  </svg>
                </span>
              </div>
              <h2 className="mb-3">Our Online Customer Help! Member</h2>
              <p className="mb-7">Rationally encounter extremely painful there anyone.</p>
              <div className="d-flex align-items-center gap-3">
                                <button type="button" className="team-slider-prev-btn team-slider-btn"><i className="fas fa-angle-left"></i></button>
                                <button type="button" className="team-slider-next-btn team-slider-btn"><i className="fas fa-angle-right"></i></button>
                            </div>
            </div>
          </div>
          <div className="col-xl-9">
            <Swiper
            modules={[Navigation]}
              className="team-slider"
              spaceBetween={30}
              slidesPerView={3}
              navigation={{
                prevEl: '.team-slider-prev-btn',
                nextEl: '.team-slider-next-btn',
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
              }}
            >
              {teamMembers.map((member) => (
                <SwiperSlide key={member.id}>
                  <div className="team-card text-center bg-white rounded py-7 px-4">
                    <div className="team-thumb mb-5">
                      <img src={member.image} alt={member.name} className="img-fluid rounded-circle" />
                      <div className="team-social">
                      <a href="#"><i className="fab fa-facebook-f"></i></a>
                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                            <a href="#"><i className="fab fa-behance"></i></a>
                      </div>
                    </div>
                    <h5>{member.name}</h5>
                    <span>{member.title}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
