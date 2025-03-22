"use client";
import PreLoader from "../common/others/PreLoader";
import useBlog from "../dataFetching/useBlog";
import usebrands from "../dataFetching/useBrand";
import useCategory from "../dataFetching/useCategory";
import useProducts from "../dataFetching/useProducts";
import BlogListingBlog from "./BlogListingBlog";
import BlogListingSidebar from "./BlogListingSidebar";

const BlogListingBody = () => {
  const { blogs, blogLoading } = useBlog();
  const { categorys } = useCategory();
  const { brands } = usebrands();
  const { products } = useProducts();
  return (
    <>
      {blogLoading ? (
        <PreLoader />
      ) : (
        <section className="blog-listing-section ptb-120">
          <div className="container">
            <div className="row g-4">
              <BlogListingBlog blogs={blogs} />
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

export default BlogListingBody;
