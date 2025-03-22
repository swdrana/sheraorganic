import React from "react";

const CategorySkeletonLoader = () => {
  return (
    <section className=" bg-white pt-120 position-relative z-1 overflow-hidden">
      <div className="container">
        <div className="  rounded-3 bg-white">
          <div className="text-center section-title">
            <div
              className="pulse rounded mb-4"
              style={{ width: "180px", height: "32px", margin: "0 auto" }}
            ></div>
          </div>
          <div className="row justify-content-center g-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="col-xxl-2 col-lg-3 col-md-4 col-sm-6" key={index}>
                <div className="gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden pulse">
                  <div
                    className=" d-inline-flex align-items-center justify-content-center rounded-circle position-relative mb-3"
                    style={{ width: "64px", height: "64px" }}
                  >
                    <div
                      className="pulse rounded-circle"
                      style={{ width: "100%", height: "100%" }}
                    ></div>
                  </div>
                  <div
                    className="pulse rounded mb-2"
                    style={{ width: "80%", height: "16px", margin: "0 auto" }}
                  ></div>
                  <div
                    className="pulse rounded"
                    style={{ width: "40%", height: "12px", margin: "0 auto" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySkeletonLoader;
