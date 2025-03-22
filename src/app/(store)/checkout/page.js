import CheckoutBody from "@/app/components/store/checkout/CheckoutBody";
import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";

const page = () => {
  return (
    <>
      <Breadcrumb title="Checkout" />
      <CheckoutBody />
    </>
  );
};

export default page;
