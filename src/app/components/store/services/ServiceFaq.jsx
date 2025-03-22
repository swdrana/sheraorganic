"use client"
import React, { useState } from 'react';

const ServiceFaq = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index); // Toggle between open and closed
  };

  const faqData = [
    {
      title: 'Why Need Organic Foods For Life',
      content:
        'Synergistically enable robust information before e-business leadership. Holisticly pursue worldwide methodologies without timely materials fabricate covalent internal.',
    },
    {
      title: 'Why Need Organic Foods For Life',
      content:
        'Synergistically enable robust information before e-business leadership. Holisticly pursue worldwide methodologies without timely materials fabricate covalent internal.',
    },
    {
      title: 'Why Need Organic Foods For Life',
      content:
        'Synergistically enable robust information before e-business leadership. Holisticly pursue worldwide methodologies without timely materials fabricate covalent internal.',
    },
    {
      title: 'Why Need Organic Foods For Life',
      content:
        'Synergistically enable robust information before e-business leadership. Holisticly pursue worldwide methodologies without timely materials fabricate covalent internal.',
    },
  ];

  return (
    <section className="faq-section ptb-120 position-relative overflow-hidden z-1">
      <img
        src="/img/shapes/frame-circle.svg"
        alt="circle shape"
        className="position-absolute frame-circle z--1"
      />
      <img
        src="/img/shapes/leaf.svg"
        alt="leaf shape"
        className="position-absolute leaf z--1"
      />
      <img
        src="/img/shapes/cauliflower.png"
        alt="cauliflower"
        className="position-absolute cauliflower z--1"
      />
      <div className="container">
        <div className="row g-5">
          <div className="col-xl-7">
            <div className="feature-image p-3 text-center">
              <img
                src="/img/about/girl.png"
                alt="girl"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-xl-5">
            <div className="faq-right">
              <h4 className="mb-4">
                We Care Your Family to Natural Products
              </h4>
              <p className="mb-5">
                Holisticly coordinate client-based applications flexible supply chains. Evolve leadership. Credibly whiteboard stand-alone.
              </p>
              <div className="accordion faq-accordion" >
                {faqData.map((item, index) => (
                  <div key={index} className="accordion-item">
                    <div className="accordion-header">
                      <a
                        href={`#acc-${index}`}
                        onClick={() => handleAccordionClick(index)}
                        className={activeIndex === index ? '' : 'collapsed'}
                      >
                        {item.title}
                        <i className="fas fa-angle-down float-end ms-1"></i>
                      </a>
                    </div>
                    <div
                     
                      className={`accordion-collapse collapse ${
                        activeIndex === index ? 'show' : ''
                      }`}
                      data-bs-parent="#faq-accordion"
                    >
                      <div className="accordion-body">
                        <p className="mb-0">{item.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
