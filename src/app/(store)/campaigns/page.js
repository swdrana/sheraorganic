// import Breadcrumb from "@/components/store/common/others/Breadcrumb";

const page = () => {
  return (
    <>
      {/* <Breadcrumb title="Campaign" page="campaign" /> */}
      <section className="tt-campaigns ptb-100">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6 col-md-6">
              <div
                className="card shadow-sm border-0 tt-single-campaign tt-gradient-right"
                style={{
                  background:
                    "url('/img/banner/cta-banner-2.jpg') no-repeat center center / cover",
                }}
              >
                <div className="card-body p-5 w-75">
                  <h3 className="h5 text-light">
                    Business Development Representative
                  </h3>
                  <ul
                    className="timing-countdown countdown-timer d-flex align-items-center gap-2 mt-3"
                    data-date="06/30/2023 23:59:59"
                  >
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 days fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 hours fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 minutes fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 seconds fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                  </ul>
                  <a
                    href="campaign-single.html"
                    className="btn btn-secondary btn-md mt-5"
                  >
                    View Products
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div
                className="card shadow-sm border-0 tt-single-campaign tt-gradient-right"
                style={{
                  background:
                    "url('/img/banner/cta-banner-2.jpg') no-repeat center center / cover",
                }}
              >
                <div className="card-body p-5 w-75">
                  <h3 className="h5 text-light">
                    Business Development Representative
                  </h3>
                  <ul
                    className="timing-countdown countdown-timer d-flex align-items-center gap-2 mt-3"
                    data-date="06/30/2023 23:59:59"
                  >
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 days fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 hours fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 minutes fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                    <li className="position-relative z-1 d-flex align-items-center justify-content-center flex-column rounded-2">
                      <h5 className="mb-1 seconds fs-sm">00</h5>
                      <span className="gshop-subtitle fs-xxs d-block">
                        Days
                      </span>
                    </li>
                  </ul>
                  <a
                    href="campaign-single.html"
                    className="btn btn-secondary btn-md mt-5"
                  >
                    View Products
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
