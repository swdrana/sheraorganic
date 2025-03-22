"use client";
import Link from "next/link";
import useCategory from "../dataFetching/useCategory";
import usebrands from "../dataFetching/useBrand";
import useProducts from "../dataFetching/useProducts";
import dayjs from "dayjs";
const BlogListingSidebar = ({ blogs, categorys, brands, products }) => {
  return (
    <>
      <div className="col-xl-4">
        <div className="gshop-sidebar">
          <div className="sidebar-widget search-widget bg-white pt-5 pb-4 px-4 border-top">
            <div className="widget-title d-flex mb-3">
              <h6 className="mb-0 flex-shrink-0">Recent Post</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>
            <ul className="sidebar-posts">
              {blogs?.slice(0, 4).map((b, i) => (
                <li key={i} className="d-flex align-items-center gap-3">
                  <div className="thumbnail rounded-2 overflow-hidden">
                    <Link href={`/blog-details/${b._id}`}>
                      <img src={b.img} alt="blog thumb" className="img-fluid" />
                    </Link>
                  </div>
                  <div className="posts-content">
                    <span className="date d-block fw-medium fs-xs">
                      <i className="fa-regular fa-clock me-2"></i>{" "}
                      {dayjs(`${b?.updatedAt}`).format("MMMM D, YYYY h:mm A")}
                    </span>
                    <Link
                      href={`/blog-details/${b._id}`}
                      className="fw-bold d-block mt-2 blog-title"
                    >
                      {b?.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-widget category-widget bg-white py-5 px-4 border-top">
            <div className="widget-title d-flex">
              <h6 className="mb-0 flex-shrink-0">Categories</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>
            <ul
              className="widget-nav next_sidebar mt-4 pe-3"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {categorys.map((category, index) => (
                <li key={index}>
                  <Link
                    href={`/products/category=${category.name
                      .replace(/\s+/g, "")
                      .toLowerCase()}=${category._id}`}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {category.name}
                    <span className="fw-bold fs-xs total-count">
                      {
                        products?.filter(
                          (p) =>
                            p.category.replace(/\s+/g, "").toLowerCase() ===
                            `${category.name.replace(/\s+/g, "").toLowerCase()}`
                        ).length
                      }{" "}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-widget tags-widget py-5 px-4 bg-white">
            <div className="widget-title d-flex">
              <h6 className="mb-0">Brands</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>
            <div className="mt-4 d-flex gap-2 flex-wrap">
              {brands.map((brand, i) => (
                <Link
                  key={i}
                  href={`/products/brands=${brand.name
                    .replace(/\s+/g, "")
                    .toLowerCase()}=${brand._id}`}
                  className="btn btn-outline btn-sm"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogListingSidebar;
