"use client";
import Decor from "@/app/components/store/theme/Decor";


// `stats` = { products, orders, delivered, customers } counts from getStoreStats() (server).
const OurWorkingAbility = ({ stats }) => {
  const counters = [
    {
      id: 1,
      icon: "ability.icon-1",
      count: `${stats?.products ?? 0}`,
      label: "Total Products",
    },
    {
      id: 2,
      icon: "ability.icon-2",
      count: `${stats?.orders ?? 0}`,
      label: "Total Orders",
    },
    {
      id: 3,
      icon: "ability.icon-3",
      count: `${stats?.customers ?? 0}`,
      label: "Total Visitors",
    },
    {
      id: 4,
      icon: "ability.icon-4",
      count: `${stats?.delivered ?? 0}`,
      label: "Total Delivery",
    },
  ];

  return (
    <>
      <section className="about-section bg-shade position-relative z-1">
        <img
          src="/img/shapes/bg-shape-5.webp"
          alt="bg shape"
          className="position-absolute start-0 bottom-0 z--1 w-100"
        />
        <Decor
          slot="ability.roll-color"
          alt="roll"
          className="position-absolute roll-color z--1"
          // For parallax: data-parallax='{"y": -50}' can be managed by a parallax library if needed
        />
        <Decor
          slot="ability.roll-color-curve"
          alt="roll"
          className="position-absolute roll-color-curve z--1"
          // For parallax: data-parallax='{"y": 50}'
        />
        <Decor
          slot="ability.onion-color"
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
                    <Decor slot={counter.icon} reserveSpace alt="icon" className="img-fluid" />
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
