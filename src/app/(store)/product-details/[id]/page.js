import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import ProductDetailsBody from "@/app/components/store/productDetails/ProductDetailsBody";
import RelatatedProduct from "@/app/components/store/productDetails/RelatatedProduct";

const page = ({ params }) => {
  const { id } = params;
  // console.log("id...", id);
  return (
    <>
      <Breadcrumb title="Product Detailos" page="product details" />
      <ProductDetailsBody id={id} />
      <RelatatedProduct id={id} />
    </>
  );
};

export default page;
