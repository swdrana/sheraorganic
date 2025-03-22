const FeaturedBrandProductLoader = () => {
  return (
    <>
      <div className="container pt-120 pb-200">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="section-title text-center mb-4">
              <div
                className="pulse rounded mb-2"
                style={{ width: "60%", height: "24px", margin: "0 auto" }}
              ></div>
              <div
                className="pulse rounded"
                style={{ width: "80%", height: "16px", margin: "0 auto" }}
              ></div>
            </div>
          </div>
        </div>

        <div className="row g-4 justify-content-center">
          {/* First Column */}
          <div className="col-xxl-4 col-lg-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="pulse rounded mb-4"
                style={{ height: "120px", backgroundColor: "#e9ecef" }}
              ></div>
            ))}
          </div>

          {/* Middle Card */}
          <div className="col-xxl-4 col-lg-6 order-3 order-xxl-2">
            <div className="product-card-lg  rounded-2 d-flex flex-column h-100">
              <div className="card-content position-relative z-2 p-3">
                <div
                  className="pulse rounded mb-2"
                  style={{ width: "50%", height: "12px" }}
                ></div>
                <div
                  className="pulse rounded mb-2"
                  style={{ width: "75%", height: "24px" }}
                ></div>
                <div
                  className="pulse rounded mb-3"
                  style={{ width: "60%", height: "20px" }}
                ></div>
                <div
                  className="pulse rounded mb-4"
                  style={{ width: "70%", height: "16px" }}
                ></div>
                <div
                  className="pulse rounded btn "
                  style={{ height: "36px", width: "120px" }}
                ></div>
              </div>

              <div className="thumbnail position-relative z-1">
                <div
                  className="pulse rounded"
                  style={{ height: "200px", width: "100%" }}
                ></div>
                <div
                  className="pulse rounded position-absolute end-0 bottom-0 z--1 d-none d-sm-block"
                  style={{ height: "80px", width: "80px" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="col-xxl-4 col-lg-6 order-2 order-xxl-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="pulse rounded mb-4"
                style={{ height: "120px", backgroundColor: "#e9ecef" }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedBrandProductLoader;
