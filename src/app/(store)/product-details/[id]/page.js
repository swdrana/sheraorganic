import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import ProductDetailsBody from "@/app/components/store/productDetails/ProductDetailsBody";
import RelatatedProduct from "@/app/components/store/productDetails/RelatatedProduct";
import { getProductById } from "@/app/backend/controllers/product.controller";

const page = async ({ params }) => {
  const { id } = params;
  
  // Server-side prefetch for instant loading
  const initialProduct = await getProductById(id);

  return (
    <>
      <Breadcrumb title="Product Details" page="product details" />
      <ProductDetailsBody id={id} initialProduct={initialProduct} />
      <RelatatedProduct id={id} />
    </>
  );
};

export default page;
