import Link from "next/link";

const ProductListing = () => {
  return (
    <>
      <section className="pt-80 pb-120">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-xxl-4 col-lg-6">
              <div className="product-listing-box bg-white">
                <div className="d-flex align-items-center justify-content-between gap-3 mb-5 flex-wrap">
                  <h4 className="mb-0">New Products</h4>
                  <a
                    href="shop-grid.html"
                    className="explore-btn text-secondary fw-bold"
                  >
                    View More
                    <span className="ms-2">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </a>
                </div>
                <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                  <div className="thumbnail position-relative rounded-2">
                    <a href="product-details.html">
                      <img
                        src="/img/products/p-sm-1.png"
                        alt="product"
                        className="img-fluid"
                      />
                    </a>
                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                      <a href="#" className="rounded-btn fs-xs">
                        <i className="fa-regular fa-heart"></i>
                      </a>
                      <a
                        href="#quickview_modal"
                        data-bs-toggle="modal"
                        className="rounded-btn fs-xs"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </a>
                      <a href="#" className="rounded-btn fs-xs">
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z"
                            fill="#5D6374"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="card-content mt-4 mt-sm-0">
                    <div className="d-flex align-items-center flex-nowrap star-rating">
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
                    <a
                      href="product-details.html"
                      className="fw-bold text-heading title d-block fs-sm"
                    >
                      European Lemon Zest
                    </a>
                    <div className="pricing mt-2">
                      <span className="fw-bold h4 deleted me-1">৳240.00</span>
                      <span className="fw-bold h4 text-danger">৳140.00</span>
                    </div>
                    <a
                      href="product-details.html"
                      className="fs-xs fw-bold mt-10 d-inline-block explore-btn"
                    >
                      Shop Now
                      <span className="ms-1">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                  <div className="thumbnail position-relative rounded-2">
                    <a href="product-details.html">
                      <img
                        src="/img/products/p-sm-2.png"
                        alt="product"
                        className="img-fluid"
                      />
                    </a>
                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                      <a href="#" className="rounded-btn fs-xs">
                        <i className="fa-regular fa-heart"></i>
                      </a>
                      <a
                        href="#quickview_modal"
                        data-bs-toggle="modal"
                        className="rounded-btn fs-xs"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </a>
                      <a href="#" className="rounded-btn fs-xs">
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z"
                            fill="#5D6374"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="card-content mt-4 mt-sm-0">
                    <div className="d-flex align-items-center flex-nowrap star-rating">
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
                    <a
                      href="product-details.html"
                      className="fw-bold text-heading title d-block fs-sm"
                    >
                      European Lemon Zest
                    </a>
                    <div className="pricing mt-2">
                      <span className="fw-bold h4 deleted me-1">৳240.00</span>
                      <span className="fw-bold h4 text-danger">৳140.00</span>
                    </div>
                    <a
                      href="product-details.html"
                      className="fs-xs fw-bold mt-10 d-inline-block explore-btn"
                    >
                      Shop Now
                      <span className="ms-1">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                  <div className="thumbnail position-relative rounded-2">
                    <a href="product-details.html">
                      <img
                        src="/img/products/p-sm-3.png"
                        alt="product"
                        className="img-fluid"
                      />
                    </a>
                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                      <a href="#" className="rounded-btn fs-xs">
                        <i className="fa-regular fa-heart"></i>
                      </a>
                      <a
                        href="#quickview_modal"
                        data-bs-toggle="modal"
                        className="rounded-btn fs-xs"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </a>
                      <a href="#" className="rounded-btn fs-xs">
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z"
                            fill="#5D6374"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="card-content mt-4 mt-sm-0">
                    <div className="d-flex align-items-center flex-nowrap star-rating">
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
                    <a
                      href="product-details.html"
                      className="fw-bold text-heading title d-block fs-sm"
                    >
                      European Lemon Zest
                    </a>
                    <div className="pricing mt-2">
                      <span className="fw-bold h4 deleted me-1">৳240.00</span>
                      <span className="fw-bold h4 text-danger">৳140.00</span>
                    </div>
                    <a
                      href="product-details.html"
                      className="fs-xs fw-bold mt-10 d-inline-block explore-btn"
                    >
                      Shop Now
                      <span className="ms-1">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-lg-6">
              <div className="product-listing-box bg-white">
                <div className="d-flex align-items-center justify-content-between gap-3 mb-5 flex-wrap">
                  <h4 className="mb-0">Organic Bestseller</h4>
                  <a href="#" className="explore-btn text-secondary fw-bold">
                    View More
                    <span className="ms-2">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </a>
                </div>
                <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                  <div className="thumbnail position-relative rounded-2">
                    <a href="product-details.html">
                      <img
                        src="/img/products/p-sm-4.png"
                        alt="product"
                        className="img-fluid"
                      />
                    </a>
                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                      <a href="#" className="rounded-btn fs-xs">
                        <i className="fa-regular fa-heart"></i>
                      </a>
                      <a
                        href="#quickview_modal"
                        data-bs-toggle="modal"
                        className="rounded-btn fs-xs"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </a>
                      <a href="#" className="rounded-btn fs-xs">
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z"
                            fill="#5D6374"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="card-content mt-4 mt-sm-0">
                    <div className="d-flex align-items-center flex-nowrap star-rating">
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
                    <a
                      href="product-details.html"
                      className="fw-bold text-heading title d-block fs-sm"
                    >
                      European Lemon Zest
                    </a>
                    <div className="pricing mt-2">
                      <span className="fw-bold h4 deleted me-1">৳240.00</span>
                      <span className="fw-bold h4 text-danger">৳140.00</span>
                    </div>
                    <a
                      href="product-details.html"
                      className="fs-xs fw-bold mt-10 d-inline-block explore-btn"
                    >
                      Shop Now
                      <span className="ms-1">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                  <div className="thumbnail position-relative rounded-2">
                    <a href="product-details.html">
                      <img
                        src="/img/products/p-sm-5.png"
                        alt="product"
                        className="img-fluid"
                      />
                    </a>
                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                      <a href="#" className="rounded-btn fs-xs">
                        <i className="fa-regular fa-heart"></i>
                      </a>
                      <a
                        href="#quickview_modal"
                        data-bs-toggle="modal"
                        className="rounded-btn fs-xs"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </a>
                      <a href="#" className="rounded-btn fs-xs">
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z"
                            fill="#5D6374"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="card-content mt-4 mt-sm-0">
                    <div className="d-flex align-items-center flex-nowrap star-rating">
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
                    <a
                      href="product-details.html"
                      className="fw-bold text-heading title d-block fs-sm"
                    >
                      European Lemon Zest
                    </a>
                    <div className="pricing mt-2">
                      <span className="fw-bold h4 deleted me-1">৳240.00</span>
                      <span className="fw-bold h4 text-danger">৳140.00</span>
                    </div>
                    <a
                      href="product-details.html"
                      className="fs-xs fw-bold mt-10 d-inline-block explore-btn"
                    >
                      Shop Now
                      <span className="ms-1">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
                <div className="horizontal-product-card d-sm-flex align-items-center p-3 bg-white rounded-2 mt-3 border card-md gap-4">
                  <div className="thumbnail position-relative rounded-2">
                    <a href="product-details.html">
                      <img
                        src="/img/products/p-sm-6.png"
                        alt="product"
                        className="img-fluid"
                      />
                    </a>
                    <div className="product-overlay position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center justify-content-center gap-1 rounded-2">
                      <a href="#" className="rounded-btn fs-xs">
                        <i className="fa-regular fa-heart"></i>
                      </a>
                      <a
                        href="#quickview_modal"
                        data-bs-toggle="modal"
                        className="rounded-btn fs-xs"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </a>
                      <a href="#" className="rounded-btn fs-xs">
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.86193 0.189422C9.62476 0.422214 9.62476 0.799637 9.86193 1.03243L10.6472 1.80311H7.25462C5.91292 1.80311 4.82521 2.87064 4.82521 4.18749V4.78359C4.82521 5.11281 5.09713 5.37968 5.43256 5.37968C5.768 5.37968 6.03991 5.11281 6.03991 4.78359V4.18749C6.03991 3.52906 6.58374 2.9953 7.25462 2.9953H10.6472L9.86193 3.76599C9.62476 3.99877 9.62476 4.37622 9.86193 4.60899C10.0991 4.84177 10.4837 4.84177 10.7208 4.60899L12.5429 2.82071C12.7801 2.58792 12.7801 2.2105 12.5429 1.9777L10.7208 0.189422C10.4837 -0.0433652 10.0991 -0.0433652 9.86193 0.189422ZM7.86197 4.18749C7.52653 4.18749 7.25462 4.45436 7.25462 4.78359V5.37968C7.25462 6.03813 6.7108 6.57187 6.03991 6.57187H2.64736L3.43261 5.80118C3.66979 5.5684 3.66979 5.19096 3.43261 4.95818C3.19542 4.72541 2.81087 4.72541 2.57368 4.95818L0.751618 6.74647C0.514435 6.97924 0.514435 7.35669 0.751618 7.58946L2.57368 9.37775C2.81087 9.61052 3.19542 9.61052 3.43261 9.37775C3.66979 9.14497 3.66979 8.76752 3.43261 8.53475L2.64736 7.76406H6.03991C7.38162 7.76406 8.46933 6.69651 8.46933 5.37968V4.78359C8.46933 4.45436 8.19742 4.18749 7.86197 4.18749Z"
                            fill="#5D6374"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="card-content mt-4 mt-sm-0">
                    <div className="d-flex align-items-center flex-nowrap star-rating">
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
                    <a
                      href="product-details.html"
                      className="fw-bold text-heading title d-block fs-sm"
                    >
                      European Lemon Zest
                    </a>
                    <div className="pricing mt-2">
                      <span className="fw-bold h4 deleted me-1">৳240.00</span>
                      <span className="fw-bold h4 text-danger">৳140.00</span>
                    </div>
                    <a
                      href="product-details.html"
                      className="fs-xs fw-bold mt-10 d-inline-block explore-btn"
                    >
                      Shop Now
                      <span className="ms-1">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-8 col-10">
              <div
                className="vertical-banner text-center bg-white rounded-2"
                style={{ backgroundImage: `url('/img/banner/banner-4.jpg')` }}
              >
                <h5 className="mb-1">Fresh & Organic Spice</h5>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <span className="hot-badge bg-danger fw-bold fs-xs position-relative text-white">
                    HOT
                  </span>
                  <span className="offer-title text-danger fw-bold">
                    30% Off
                  </span>
                </div>
                <Link
                  href="/products"
                  className="explore-btn text-primary fw-bold"
                >
                  Shop Now
                  <span className="ms-2">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
              <div className="counter-box bg-white rounded-2 mt-4">
                <div className="horizontal-counter d-flex align-items-center gap-3">
                  <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-2 bg-glimpse-pink flex-shrink-0">
                    <img
                      src="/img/icons/letter-box.svg"
                      alt="icon"
                      className="img-fluid"
                    />
                  </span>
                  <div className="numbers">
                    <h3 className="mb-1">
                      <span className="counter">456</span>k+
                    </h3>
                    <h6 className="mb-0 text-gray fs-sm">Total Products</h6>
                  </div>
                </div>
                <span className="gradient-spacer-2 d-block my-4"></span>
                <div className="horizontal-counter d-flex align-items-center gap-3">
                  <span className="icon-wrapper d-inline-flex align-items-center justify-content-center rounded-2 bg-azure-mist flex-shrink-0">
                    <img
                      src="/img/icons/thumbs-up.svg"
                      alt="icon"
                      className="img-fluid"
                    />
                  </span>
                  <div className="numbers">
                    <h3 className="mb-1">
                      <span className="counter">16</span>M+
                    </h3>
                    <h6 className="mb-0 text-gray fs-sm">
                      Customer Satisfaction
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;
