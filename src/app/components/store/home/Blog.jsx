"use client";
import Link from "next/link";
import useBlog from "../dataFetching/useBlog";
import dayjs from "dayjs";
const Blog = ({ blogs }) => {
  // const { blogs, blogLoading } = useBlog();
  // console.log("blogs", blogs);
  return (
    <>
      <section className="blog-section pt-120 pb-120 position-relative overflow-hidden z-1">
        <img
          src="/img/shapes/dal.png"
          alt="shape"
          className="position-absolute dal-shape z--1"
        />
        <img
          src="/img/shapes/frame-circle.svg"
          alt="frame circle"
          className="position-absolute frame-circle z--1 d-none d-md-block"
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-md-8">
              <div className="section-title text-center">
                <h2 className="mb-3">Browse Recent Post</h2>
                <p className="mb-0">
                  Interactivel product distinctive paradigms whereas one-to-one
                  intellectual capital. resource sucking services.
                </p>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center mt-3">
            {blogs?.slice(0, 3).map((blog, i) => (
              <div key={i} className="col-xl-4 col-md-6">
                <article className="blog-card rounded-2 overflow-hidden bg-white">
                  <div className="thumbnail overflow-hidden">
                    <Link href={`/blog-details/${blog._id}`}>
                      <img
                        src={blog?.img}
                        alt="blog thumb"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta d-flex align-items-center gap-3 mb-1">
                      <span className="fs-xs fw-medium">
                        <i className="fa-solid fa-tags me-1"></i>
                        {blog?.category}
                      </span>
                      <span className="fs-xs fw-medium">
                        <i className="fa-regular fa-clock me-1"></i>
                        {dayjs(`${blog?.updatedAt}`).format(
                          "MMMM D, YYYY h:mm A"
                        )}
                      </span>
                    </div>
                    <Link href={`/blog-details/${blog._id}`}>
                      <h4 className="mb-3">{blog?.title}</h4>
                    </Link>
                    <p className="mb-5 overflow-hidden text-ellipsis   max-h-[10ch]">
                      {blog?.description}
                    </p>
                    <Link
                      href={`/blog-details/${blog._id}`}
                      className="btn btn-primary-light btn-md"
                    >
                      Explore More
                      <span className="ms-2">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
