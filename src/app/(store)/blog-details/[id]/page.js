import BlogDetailsBody from "../../../components/store/blogDetails/BlogDetailsBody";
import Breadcrumb from "../../../components/store/common/others/Breadcrumb";

const page = ({ params }) => {
  const { id } = params;
  return (
    <>
      <Breadcrumb title="Blog Details" />
      <BlogDetailsBody id={id} />
    </>
  );
};

export default page;
