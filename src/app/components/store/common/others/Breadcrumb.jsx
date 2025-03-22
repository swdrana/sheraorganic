import Link from "next/link";

const Breadcrumb = ({ title, page }) => {
  return (
    <>
      <div className="gstore-breadcrumb position-relative z-1 overflow-hidden mt--50">
        <img
          src="/img/shapes/bg-shape-6.png"
          alt="bg-shape"
          className="position-absolute start-0 z--1 w-100 bg-shape"
        />
        <img
          src="/img/shapes/pata-xs.svg"
          alt="pata"
          className="position-absolute pata-xs z--1 vector-shape"
        />
        <img
          src="/img/shapes/onion.png"
          alt="onion"
          className="position-absolute z--1 onion start-0 top-0 vector-shape"
        />
        <img
          src="/img/shapes/frame-circle.svg"
          alt="frame circle"
          className="position-absolute z--1 frame-circle vector-shape"
        />
        <img
          src="/img/shapes/leaf.svg"
          alt="leaf"
          className="position-absolute z--1 leaf vector-shape"
        />
        <img
          src="/img/shapes/garlic-white.png"
          alt="garlic"
          className="position-absolute z--1 garlic vector-shape"
        />
        <img
          src="/img/shapes/roll-1.png"
          alt="roll"
          className="position-absolute z--1 roll vector-shape"
        />
        <img
          src="/img/shapes/roll-2.png"
          alt="roll"
          className="position-absolute z--1 roll-2 vector-shape"
        />
        <img
          src="/img/shapes/pata-xs.svg"
          alt="roll"
          className="position-absolute z--1 pata-xs-2 vector-shape"
        />
        <img
          src="/img/shapes/tomato-half.svg"
          alt="tomato"
          className="position-absolute z--1 tomato-half vector-shape"
        />
        <img
          src="/img/shapes/tomato-slice.svg"
          alt="tomato"
          className="position-absolute z--1 tomato-slice vector-shape"
        />
        <img
          src="/img/shapes/cauliflower.png"
          alt="cauliflower"
          className="position-absolute z--1 cauliflower vector-shape"
        />
        <img
          src="/img/shapes/leaf-gray.png"
          alt="leaf-gray"
          className="position-absolute z--1 leaf-gray vector-shape"
        />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2 className="mb-2 text-center">{title}</h2>
                <nav>
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item fw-bold" aria-current="page">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item fw-bold" aria-current="page">
                      Page
                    </li>
                    <li className="breadcrumb-item fw-bold" aria-current="page">
                      {page}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
