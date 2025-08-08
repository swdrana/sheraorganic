const page = () => {
  return (
    <>
      <div
        className="gstore-breadcrumb position-relative z-1 overflow-hidden mt--50 tt-campaign-single-bg"
        style={{
          background:
            "url('/img/banner/cta-banner-2.jpg') no-repeat center center / cover",
        }}
      >
        <img
          src="/img/shapes/bg-shape-6.png"
          alt="bg-shape"
          className="position-absolute start-0 z--1 w-100 bg-shape"
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="breadcrumb-content">
                <h2 className="mb-2 text-center text-light">
                  Business Development Representative
                </h2>
                <ul
                  className="timing-countdown countdown-timer d-flex align-items-center gap-2 mt-3 justify-content-center"
                  data-date="06/30/2023 23:59:59"
                >
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 days fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 hours fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 minutes fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                  <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                    <h5 className="mb-1 seconds fs-sm">00</h5>
                    <span className="gshop-subtitle fs-xxs d-block">Days</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-100 pt-80 position-relative overflow-hidden z-1 trending-products-area">
        <img
          src="/img/shapes/garlic.png"
          alt="garlic"
          className="position-absolute garlic z--1"
          data-parallax='{"y": 100}'
        />
        <img
          src="/img/shapes/carrot.png"
          alt="carrot"
          className="position-absolute carrot z--1"
          data-parallax='{"y": -100}'
        />
        <img
          src="/img/shapes/mashrom.png"
          alt="mashrom"
          className="position-absolute mashrom z--1"
          data-parallax='{"x": 100}'
        />
        <div className="container">
          <div className="row justify-content-center g-4 mt-5">
            <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10">
              <div className="vertical-product-card rounded-2 position-relative bg-white">
                <div className="thumbnail position-relative text-center p-4">
                  <a href="product-details.html">
                    <img
                      src="/img/products/apple.png"
                      alt="apple"
                      className="img-fluid"
                    />
                  </a>
                  <div className="product-btns position-absolute d-flex gap-2 flex-column">
                    <a href="#" className="rounded-btn">
                      <i className="fa-regular fa-heart"></i>
                    </a>
                    <a href="#" className="rounded-btn">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z"
                          fill="#AEB1B9"
                        />
                      </svg>
                    </a>
                    <a
                      href="#quickview_modal"
                      data-bs-toggle="modal"
                      className="rounded-btn"
                    >
                      <i className="fa-regular fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <a
                    href="shop-grid.html"
                    className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
                  >
                    Fresh Organic
                  </a>
                  <a
                    href="product-details.html"
                    className="card-title fw-bold d-block mb-2"
                  >
                    Popped Rice Crisps Snacks Chocolate.
                  </a>
                  <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                    <ul className="d-flex align-items-center me-2">
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                    </ul>
                    <span className="flex-shrink-0">(5.2k Reviews)</span>
                  </div>
                  <h6 className="price text-danger mb-3">৳140.00</h6>
                  <div className="card-progressbar mb-2 rounded-pill">
                    <span
                      className="card-progress bg-primary"
                      data-progress="60%"
                    ></span>
                  </div>
                  <p className="mb-0 fw-semibold">
                    Available:{" "}
                    <span className="fw-bold text-secondary">40/100</span>
                  </p>
                </div>
                <div className="card-btn bg-white">
                  <a
                    href="#"
                    className="btn btn-secondary d-block btn-md rounded-1"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10">
              <div className="vertical-product-card rounded-2 position-relative bg-white">
                <span className="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">
                  -12% OFF
                </span>
                <div className="thumbnail position-relative text-center p-4">
                  <a href="product-details.html">
                    <img
                      src="/img/products/apple-black.png"
                      alt="apple"
                      className="img-fluid"
                    />
                  </a>
                  <div className="product-btns position-absolute d-flex gap-2 flex-column">
                    <a href="#" className="rounded-btn">
                      <i className="fa-regular fa-heart"></i>
                    </a>
                    <a href="#" className="rounded-btn">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z"
                          fill="#AEB1B9"
                        />
                      </svg>
                    </a>
                    <a
                      href="#quickview_modal"
                      data-bs-toggle="modal"
                      className="rounded-btn"
                    >
                      <i className="fa-regular fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <a
                    href="shop-grid.html"
                    className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
                  >
                    Fresh Organic
                  </a>
                  <a
                    href="product-details.html"
                    className="card-title fw-bold d-block mb-2"
                  >
                    Popped Rice Crisps Snacks Chocolate.
                  </a>
                  <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                    <ul className="d-flex align-items-center me-2">
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                    </ul>
                    <span className="flex-shrink-0">(5.2k Reviews)</span>
                  </div>
                  <h6 className="price text-danger mb-3">৳140.00</h6>
                  <div className="card-progressbar mb-2 rounded-pill">
                    <span
                      className="card-progress bg-primary"
                      data-progress="60%"
                    ></span>
                  </div>
                  <p className="mb-0 fw-semibold">
                    Available:{" "}
                    <span className="fw-bold text-secondary">40/100</span>
                  </p>
                </div>
                <div className="card-btn bg-white">
                  <a
                    href="#"
                    className="btn btn-secondary d-block btn-md rounded-1"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10">
              <div className="vertical-product-card rounded-2 position-relative bg-white">
                <div className="thumbnail position-relative text-center p-4">
                  <a href="product-details.html">
                    <img
                      src="/img/products/pinut.png"
                      alt="apple"
                      className="img-fluid"
                    />
                  </a>
                  <div className="product-btns position-absolute d-flex gap-2 flex-column">
                    <a href="#" className="rounded-btn">
                      <i className="fa-regular fa-heart"></i>
                    </a>
                    <a href="#" className="rounded-btn">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z"
                          fill="#AEB1B9"
                        />
                      </svg>
                    </a>
                    <a
                      href="#quickview_modal"
                      data-bs-toggle="modal"
                      className="rounded-btn"
                    >
                      <i className="fa-regular fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <a
                    href="shop-grid.html"
                    className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
                  >
                    Fresh Organic
                  </a>
                  <a
                    href="product-details.html"
                    className="card-title fw-bold d-block mb-2"
                  >
                    Popped Rice Crisps Snacks Chocolate.
                  </a>
                  <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                    <ul className="d-flex align-items-center me-2">
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                    </ul>
                    <span className="flex-shrink-0">(5.2k Reviews)</span>
                  </div>
                  <h6 className="price text-danger mb-3">৳140.00</h6>
                  <div className="card-progressbar mb-2 rounded-pill">
                    <span
                      className="card-progress bg-primary"
                      data-progress="60%"
                    ></span>
                  </div>
                  <p className="mb-0 fw-semibold">
                    Available:{" "}
                    <span className="fw-bold text-secondary">40/100</span>
                  </p>
                </div>
                <div className="card-btn bg-white">
                  <a
                    href="#"
                    className="btn btn-secondary d-block btn-md rounded-1"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10">
              <div className="vertical-product-card rounded-2 position-relative bg-white">
                <div className="thumbnail position-relative text-center p-4">
                  <a href="product-details.html">
                    <img
                      src="/img/products/apple.png"
                      alt="apple"
                      className="img-fluid"
                    />
                  </a>
                  <div className="product-btns position-absolute d-flex gap-2 flex-column">
                    <a href="#" className="rounded-btn">
                      <i className="fa-regular fa-heart"></i>
                    </a>
                    <a href="#" className="rounded-btn">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z"
                          fill="#AEB1B9"
                        />
                      </svg>
                    </a>
                    <a
                      href="#quickview_modal"
                      data-bs-toggle="modal"
                      className="rounded-btn"
                    >
                      <i className="fa-regular fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <a
                    href="shop-grid.html"
                    className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
                  >
                    Fresh Organic
                  </a>
                  <a
                    href="product-details.html"
                    className="card-title fw-bold d-block mb-2"
                  >
                    Popped Rice Crisps Snacks Chocolate.
                  </a>
                  <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                    <ul className="d-flex align-items-center me-2">
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                    </ul>
                    <span className="flex-shrink-0">(5.2k Reviews)</span>
                  </div>
                  <h6 className="price text-danger mb-3">৳140.00</h6>
                  <div className="card-progressbar mb-2 rounded-pill">
                    <span
                      className="card-progress bg-primary"
                      data-progress="60%"
                    ></span>
                  </div>
                  <p className="mb-0 fw-semibold">
                    Available:{" "}
                    <span className="fw-bold text-secondary">40/100</span>
                  </p>
                </div>
                <div className="card-btn bg-white">
                  <a
                    href="#"
                    className="btn btn-secondary d-block btn-md rounded-1"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10">
              <div className="vertical-product-card rounded-2 position-relative bg-white">
                <span className="offer-badge text-white fw-bold fs-xxs bg-danger position-absolute start-0 top-0">
                  -12% OFF
                </span>
                <div className="thumbnail position-relative text-center p-4">
                  <a href="product-details.html">
                    <img
                      src="/img/products/apple-black.png"
                      alt="apple"
                      className="img-fluid"
                    />
                  </a>
                  <div className="product-btns position-absolute d-flex gap-2 flex-column">
                    <a href="#" className="rounded-btn">
                      <i className="fa-regular fa-heart"></i>
                    </a>
                    <a href="#" className="rounded-btn">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z"
                          fill="#AEB1B9"
                        />
                      </svg>
                    </a>
                    <a
                      href="#quickview_modal"
                      data-bs-toggle="modal"
                      className="rounded-btn"
                    >
                      <i className="fa-regular fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <a
                    href="shop-grid.html"
                    className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
                  >
                    Fresh Organic
                  </a>
                  <a
                    href="product-details.html"
                    className="card-title fw-bold d-block mb-2"
                  >
                    Popped Rice Crisps Snacks Chocolate.
                  </a>
                  <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                    <ul className="d-flex align-items-center me-2">
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                    </ul>
                    <span className="flex-shrink-0">(5.2k Reviews)</span>
                  </div>
                  <h6 className="price text-danger mb-3">৳140.00</h6>
                  <div className="card-progressbar mb-2 rounded-pill">
                    <span
                      className="card-progress bg-primary"
                      data-progress="60%"
                    ></span>
                  </div>
                  <p className="mb-0 fw-semibold">
                    Available:{" "}
                    <span className="fw-bold text-secondary">40/100</span>
                  </p>
                </div>
                <div className="card-btn bg-white">
                  <a
                    href="#"
                    className="btn btn-secondary d-block btn-md rounded-1"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4 col-md-6 col-sm-10">
              <div className="vertical-product-card rounded-2 position-relative bg-white">
                <div className="thumbnail position-relative text-center p-4">
                  <a href="product-details.html">
                    <img
                      src="/img/products/pinut.png"
                      alt="apple"
                      className="img-fluid"
                    />
                  </a>
                  <div className="product-btns position-absolute d-flex gap-2 flex-column">
                    <a href="#" className="rounded-btn">
                      <i className="fa-regular fa-heart"></i>
                    </a>
                    <a href="#" className="rounded-btn">
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.705 0.201222C10.4317 0.469526 10.4317 0.904522 10.705 1.17283L11.6101 2.06107H7.70001C6.15364 2.06107 4.90001 3.29144 4.90001 4.80917V5.49619C4.90001 5.87564 5.21341 6.18322 5.60001 6.18322C5.98662 6.18322 6.30001 5.87564 6.30001 5.49619V4.80917C6.30001 4.0503 6.92679 3.43512 7.70001 3.43512H11.6101L10.705 4.32337C10.4317 4.59166 10.4317 5.02668 10.705 5.29496C10.9784 5.56325 11.4216 5.56325 11.695 5.29496L13.795 3.2339C14.0683 2.96559 14.0683 2.5306 13.795 2.26229L11.695 0.201222C11.4216 -0.0670741 10.9784 -0.0670741 10.705 0.201222ZM8.40001 4.80917C8.0134 4.80917 7.70001 5.11675 7.70001 5.49619V6.18322C7.70001 6.9421 7.07323 7.55726 6.30001 7.55726H2.38995L3.29498 6.66901C3.56835 6.40073 3.56835 5.9657 3.29498 5.69742C3.02161 5.42914 2.5784 5.42914 2.30503 5.69742L0.205023 7.75849C-0.0683411 8.02678 -0.0683411 8.4618 0.205023 8.73008L2.30503 10.7912C2.5784 11.0594 3.02161 11.0594 3.29498 10.7912C3.56835 10.5229 3.56835 10.0878 3.29498 9.81957L2.38995 8.93131H6.30001C7.84638 8.93131 9.10001 7.70092 9.10001 6.18322V5.49619C9.10001 5.11675 8.78662 4.80917 8.40001 4.80917Z"
                          fill="#AEB1B9"
                        />
                      </svg>
                    </a>
                    <a
                      href="#quickview_modal"
                      data-bs-toggle="modal"
                      className="rounded-btn"
                    >
                      <i className="fa-regular fa-eye"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <a
                    href="shop-grid.html"
                    className="mb-2 d-inline-block text-secondary fw-semibold fs-xxs"
                  >
                    Fresh Organic
                  </a>
                  <a
                    href="product-details.html"
                    className="card-title fw-bold d-block mb-2"
                  >
                    Popped Rice Crisps Snacks Chocolate.
                  </a>
                  <div className="d-flex align-items-center flex-nowrap star-rating fs-xxs mb-2">
                    <ul className="d-flex align-items-center me-2">
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                      <li className="text-warning">
                        <i className="fa-solid fa-star"></i>
                      </li>
                    </ul>
                    <span className="flex-shrink-0">(5.2k Reviews)</span>
                  </div>
                  <h6 className="price text-danger mb-3">৳140.00</h6>
                  <div className="card-progressbar mb-2 rounded-pill">
                    <span
                      className="card-progress bg-primary"
                      data-progress="60%"
                    ></span>
                  </div>
                  <p className="mb-0 fw-semibold">
                    Available:{" "}
                    <span className="fw-bold text-secondary">40/100</span>
                  </p>
                </div>
                <div className="card-btn bg-white">
                  <a
                    href="#"
                    className="btn btn-secondary d-block btn-md rounded-1"
                  >
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
