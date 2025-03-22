import BlogListingBody from "@/app/components/store/blogListing/BlogListingBody";
import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";

const page = () => {
  return (
    <>
      <Breadcrumb title="Blog Listing" />
      <BlogListingBody />
    </>
  );
};

export default page;
