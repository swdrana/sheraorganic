import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import ProductDetailsBody from "@/app/components/store/productDetails/ProductDetailsBody";
import RelatatedProduct from "@/app/components/store/productDetails/RelatatedProduct";
import { getCachedProductById } from "@/app/data/cachedData";

const page = async ({ params }) => {
  const { id } = params;

  // Read straight from the shared data cache (no HTTP round-trip to our own API).
  const initialProduct = await getCachedProductById(id);

  return (
    <>
      <Breadcrumb title="Product Details" page="product details" />
      <ProductDetailsBody id={id} initialProduct={initialProduct} />
      <RelatatedProduct id={id} initialProduct={initialProduct} />
    </>
  );
};

export default page;
