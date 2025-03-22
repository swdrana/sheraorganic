const AboutTop = ({ setting }) => {
  return (
    <>
      <section className="pt-120 ab-about-section position-relative z-1 overflow-hidden">
        <img
          src="/img/shapes/mango.png"
          alt="mango"
          className="position-absolute mango z--1"
        />
        <div className="container">
          <div className="row g-5 g-xl-4 align-items-center">
            <div className="col-xl-6">
              <div className="ab-left position-relative">
                <img
                  src={setting?.about_top_img}
                  alt="image"
                  className="img-fluid"
                />
                <div className="text-end">
                  <div className="ab-quote p-4 text-start">
                    <h4 className="mb-0 fw-normal text-white">
                      {setting?.about_top_quotes}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="ab-about-right">
                <div className="subtitle d-flex align-items-center gap-3 flex-wrap">
                  <span className="gshop-subtitle">
                    {setting?.about_top_sub_title}
                  </span>
                  <span>
                    <svg
                      width="78"
                      height="16"
                      viewBox="0 0 78 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="0.0138875"
                        y1="7.0001"
                        x2="72.0139"
                        y2="8.0001"
                        stroke="#FF7C08"
                        strokeWidth="2"
                      />
                      <path
                        d="M78 8L66 14.9282L66 1.0718L78 8Z"
                        fill="#FF7C08"
                      />
                    </svg>
                  </span>
                </div>
                <h2 className="mb-4">{setting?.about_top_title}</h2>
                <p className="mb-8">{setting?.about_top_description}</p>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="image-box py-6 px-4 image-box-border">
                      <div className="icon position-relative">
                        <img
                          src="/img/icons/hand-icon.svg"
                          alt="hand icon"
                          className="img-fluid"
                        />
                      </div>
                      <h4 className="mt-3">
                        {setting?.about_top_mission_title}
                      </h4>
                      <p className="mb-0">{setting?.about_top_mission}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="image-box py-6 px-4 image-box-border">
                      <div className="icon position-relative">
                        <img
                          src="/img/icons/hand-icon.svg"
                          alt="hand icon"
                          className="img-fluid"
                        />
                      </div>
                      <h4 className="mt-3">
                        {setting?.about_top_vision_title}
                      </h4>
                      <p className="mb-0">{setting?.about_top_vision}</p>
                    </div>
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

export default AboutTop;
