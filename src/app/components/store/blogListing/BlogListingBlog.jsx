import Link from "next/link";
import dayjs from "dayjs";
const BlogListingBlog = ({ blogs }) => {
  return (
    <>
      <div className="col-xl-8">
        <div className="blog-listing">
          {blogs.map((post, i) => (
            <article
              key={i}
              className="blog-card rounded-2 overflow-hidden bg-white p-5"
            >
              <div className="thumbnail overflow-hidden">
                <Link href={`/blog-details/${post._id}`}>
                  <img
                    src={post.img}
                    alt="blog thumb"
                    className="img-fluid rounded-top"
                  />
                </Link>
              </div>
              <div className="blog-card-content p-0 mt-4">
                <div className="blog-meta d-flex align-items-center gap-3 flex-wrap flex-sm-nowrap mb-2">
                  <span className="fs-xs fw-medium">
                    <i className="fa-solid fa-tags me-1"></i>
                    {post.category}
                  </span>
                  <span className="fs-xs fw-medium">
                    <i className="fa-regular fa-clock me-1"></i>
                    {dayjs(`${post?.updatedAt}`).format("MMMM D, YYYY h:mm A")}
                  </span>
                </div>
                <Link href={`/blog-details/${post._id}`}>
                  <h3 className="mb-3">{post.title}</h3>
                </Link>
                <p className="mb-5 overflow-hidden text-ellipsis   max-h-[10ch]">
                  {post.description}
                </p>
                <Link
                  href={`/blog-details/${post._id}`}
                  className="btn btn-outline-primary btn-md"
                >
                  Explore More{" "}
                  <span className="ms-2">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogListingBlog;
