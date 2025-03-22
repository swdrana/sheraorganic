"use client";

import useSetting from "../../components/store/dataFetching/useSetting";
import ReceivedMail from "../../components/store/contact/ReceivedMail";
import PreLoader from "../../components/store/common/others/PreLoader";

const page = () => {
  const { setting, settingLoading } = useSetting();

  return (
    <>
      {settingLoading ? (
        <PreLoader />
      ) : (
        <section className="contact-us-section position-relative overflow-hidden z-1 pt-80 pb-120">
          <img
            src="/img/shapes/frame-circle.svg"
            alt="frame circle"
            className="position-absolute frame z--1 d-none d-sm-block"
          />
          <img
            src="/img/shapes/roll-2.png"
            alt="roll"
            className="position-absolute roll-2 z--1"
          />
          <img
            src="/img/shapes/pata-xs.svg"
            alt="pata"
            className="position-absolute pata z--1"
          />
          <img
            src="/img/shapes/garlic-white.png"
            alt="garlic"
            className="position-absolute garlic z--1"
          />
          <img
            src="/img/shapes/roll-1.png"
            alt="roll"
            className="position-absolute roll-1 z--1"
          />
          <img
            src="/img/shapes/leaf.svg"
            alt="leaf"
            className="position-absolute leaf z--1"
          />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-12">
                <div className="breadcrumb-content">
                  <h2 className="mb-2 text-center">Get In Touch</h2>
                  <nav>
                    <ol className="breadcrumb justify-content-center">
                      <li
                        className="breadcrumb-item fw-bold"
                        aria-current="page"
                      >
                        <a href="index.html">Home</a>
                      </li>
                      <li
                        className="breadcrumb-item fw-bold"
                        aria-current="page"
                      >
                        Page
                      </li>
                      <li
                        className="breadcrumb-item fw-bold"
                        aria-current="page"
                      >
                        Contact Page
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="contact-box rounded-2 bg-white overflow-hidden mt-8">
              <div className="row g-4">
                <div className="col-xl-5">
                  <div
                    className="contact-left-box position-relative overflow-hidden z-1 bg-primary p-6 d-flex flex-column h-100"
                    data-background="/img/shapes/circle-half-fill.png"
                  >
                    <img
                      src="/img/shapes/texture-overlay.png"
                      alt="texture"
                      className="position-absolute w-100 h-100 start-0 top-0 z--1"
                    />
                    <h3 className="text-white mb-3">Contact Details</h3>
                    <p className="fs-sm text-white">
                      <strong>Office Address-1:</strong>{" "}
                      {setting?.contact?.contact_office_address_one}
                    </p>
                    <p className="fs-sm text-white mb-0">
                      <strong>Office Address-2:</strong>{" "}
                      {setting?.contact?.contact_office_address_two}
                    </p>
                    <span className="spacer my-5"></span>
                    <ul className="contact-list">
                      <li className="d-flex align-items-center gap-3 flex-wrap">
                        <span className="icon d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0">
                          <i className="fa-brands fa-whatsapp"></i>
                        </span>
                        <div className="info">
                          <span className="fw-medium text-white fs-xs">
                            Emergency Call
                          </span>
                          <h5 className="mb-0 mt-1 text-white">
                            {setting?.contact?.contact_emergency_call}
                          </h5>
                        </div>
                      </li>
                      <li className="d-flex align-items-center gap-3 flex-wrap mt-3">
                        <span className="icon d-inline-flex align-items-center justify-content-center rounded-circle flex-shrink-0">
                          <i className="fa-regular fa-envelope"></i>
                        </span>
                        <div className="info">
                          <span className="fw-medium text-white fs-xs">
                            General Communication
                          </span>
                          <p className="mb-0 mt-1 text-white fw-medium">
                            {setting?.contact?.contact_general_comunication}
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-5">
                      <span className="fw-bold text-white mb-3 d-block">
                        Social Share:
                      </span>
                      <div className="social-links d-flex align-items-center gap-2">
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-behance"></i>
                        </a>
                        <a href="#">
                          <i className="fab fa-discord"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* reciev user problem by gmail */}
                <ReceivedMail />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
