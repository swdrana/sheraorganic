import Link from "next/link";

const serviceData = [
    {
      iconColor: '/img/icons/cart-color.svg',
      iconWhite: '/img/icons/cart-white.svg',
      title: 'Agriculture Products',
      description: 'Based applications flexible supply chains. evolve principle-centered whiteboard stand-alone.',
      link: '/service-details'
    },
    {
      iconColor: '/img/icons/organic-color.svg',
      iconWhite: '/img/icons/organic-white.svg',
      title: 'Organic Products',
      description: 'Based applications flexible supply chains. evolve principle-centered whiteboard stand-alone.',
      link: '/service-details'
    },
    {
      iconColor: '/img/icons/milk-color.svg',
      iconWhite: '/img/icons/milk-white.svg',
      title: 'Milk Sweet Products',
      description: 'Based applications flexible supply chains. evolve principle-centered whiteboard stand-alone.',
      link: '/service-details'
    },
    {
      iconColor: '/img/icons/delivery-color.svg',
      iconWhite: '/img/icons/delivery-white.svg',
      title: 'Delivery Service',
      description: 'Based applications flexible supply chains. evolve principle-centered whiteboard stand-alone.',
      link: '/service-details'
    },
  ];
  
const ServicesTop = () => {
  return (
    <>
          <section className="service-section ptb-120 position-relative z-1 overflow-hidden">
      <img
        src="/img/shapes/bg-shape-4.png"
        alt="bg shape"
        className="position-absolute start-0 bottom-0 w-100 z--1 bg-shape"
      />
      <div className="container">
        <div className="row g-4">
          <div className="col-xl-6">
            <div className="section-title text-center text-xl-start">
              <h2 className="mb-0">We're Provide Natural & Organic Vegetable</h2>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="section-desc text-center text-xl-start">
              <p className="mb-3">
                Holisticly coordinate client-based applications flexible supply chains. evolve principle-centered process improvements through cost effective information. leadership. Credibly whiteboard stand-alone.
              </p>
              <Link href="#" className="text-secondary fw-bold fs-xs">
                Loading...
                <span className="ms-2">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-5">
          {serviceData.map((service, index) => (
            <div key={index} className="col-xxl-3 col-lg-4 col-md-6">
              <div className="icon-box rounded-3 py-7 px-4">
                <div className="icon-wrapper mb-4 position-relative">
                  <img
                    src={service.iconColor}
                    alt="icon"
                    className="img-fluid icon-color"
                  />
                  <img
                    src={service.iconWhite}
                    alt="icon"
                    className="img-fluid icon-white"
                  />
                </div>
                <Link href={service.link}>
                  <h5 className="mb-3">{service.title}</h5>
                </Link>
                <p className="mb-5">{service.description}</p>
                <Link href={service.link} className="explore-btn fw-bold">
                  Explore More
                  <span className="ms-2">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    </>
  )
};

export default ServicesTop
