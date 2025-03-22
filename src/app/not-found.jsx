import Link from "next/link";

export default async function NotFound() {
  return (
    <section className="section-404 ptb-120 position-relative overflow-hidden z-1">
      <img
        src="/img/shapes/frame-circle.svg"
        alt="frame circle"
        className="position-absolute z--1 frame-circle d-none d-sm-block"
      />
      {/* Add other images as needed */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="content-404 text-center">
              <img src="/img/404.png" alt="not found" className="img-fluid" />
              <h2 className="mt-4">Sorry, Something Went Wrong</h2>
              <p className="mb-6">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
              <Link href="/" className="btn btn-secondary btn-md rounded-1">
                Back to Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
