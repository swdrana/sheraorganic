"use client";

import BlogListingSidebar from "../blogListing/BlogListingSidebar";
import Loading from "../common/others/Loading";
import PreLoader from "../common/others/PreLoader";
import useBlog from "../dataFetching/useBlog";
import usebrands from "../dataFetching/useBrand";
import useCategory from "../dataFetching/useCategory";
import useProducts from "../dataFetching/useProducts";
import BlogDetailsBlog from "./BlogDetailsBlog";

const BlogDetailsBody = ({ id }) => {
  const { blogs, blogLoading } = useBlog();
  const { categorys } = useCategory();
  const { brands } = usebrands();
  const { products } = useProducts();
  // console.log("blogsLoading", blogLoading);
  return (
    <>
      {blogLoading ? (
        <PreLoader />
      ) : (
        <section className="blog-details pb-100">
          <div className="container">
            <div className="row g-4">
              {blogLoading ? (
                <Loading />
              ) : (
                <BlogDetailsBlog id={id} blogs={blogs} />
              )}

              {/* blog detilas sidebar */}
              <BlogListingSidebar
                blogs={blogs}
                categorys={categorys}
                brands={brands}
                products={products}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogDetailsBody;
