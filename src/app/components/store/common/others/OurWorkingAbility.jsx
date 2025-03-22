"use client";

import useOrders from "../../../admin/featch/useOrder";
import useProducts from "../../dataFetching/useProducts";
import useUsers from "../../dataFetching/useUsers";

const OurWorkingAbility = ({ orders, products, users }) => {
  // console.log("orders", orders);
  const counters = [
    {
      id: 1,
      icon: "/img/icons/icon-1.png",
      count: `${products?.length}`,
      label: "Total Products",
    },
    {
      id: 2,
      icon: "/img/icons/icon-2.png",
      count: `${orders?.length}`,
      label: "Total Orders",
    },
    {
      id: 3,
      icon: "/img/icons/icon-3.png",
      count: `${users?.length}`,
      label: "Total Visitors",
    },
    {
      id: 4,
      icon: "/img/icons/icon-4.png",
      count: `${orders?.filter((o) => o.status === "Delivered")?.length}`,
      label: "Total Delivery",
    },
  ];

  return (
    <>
      <section className="about-section bg-shade position-relative z-1">
        <img
          src="/img/shapes/bg-shape-5.png"
          alt="bg shape"
          className="position-absolute start-0 bottom-0 z--1 w-100"
        />
        <img
          src="/img/shapes/roll-color.png"
          alt="roll"
          className="position-absolute roll-color z--1"
          // For parallax: data-parallax='{"y": -50}' can be managed by a parallax library if needed
        />
        <img
          src="/img/shapes/roll-color-curve.png"
          alt="roll"
          className="position-absolute roll-color-curve z--1"
          // For parallax: data-parallax='{"y": 50}'
        />
        <img
          src="/img/shapes/onion-color.png"
          alt="onion"
          className="position-absolute onion-color z--1"
          // For parallax: data-parallax='{"x": -30}'
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="section-title text-center">
                <h2 className="mb-3">Our Working Ability</h2>
                <p className="mb-0">
                  Assertively target market lorem ipsum is simply free text
                  available dolor incididunt simply free ut labore et dolore.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center g-4 mt-4">
            {counters.map((counter) => (
              <div key={counter.id} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="horizontal-counter d-flex align-items-center gap-3 bg-white rounded p-4">
                  <span className="icon-wrapper d-inline-flex align-items-center justify-content-center flex-shrink-0">
                    <img src={counter.icon} alt="icon" className="img-fluid" />
                  </span>
                  <div className="numbers">
                    <h3 className="mb-1">
                      <span className="counter">{counter.count}</span>
                    </h3>
                    <h6 className="mb-0 text-gray fs-sm">{counter.label}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OurWorkingAbility;
