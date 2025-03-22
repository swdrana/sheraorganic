import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import ShopGridBody from "@/app/components/store/shopGrid/ShopGridBody";

const page = () => {
  return (
    <>
      <Breadcrumb title="Shop Layout" page="Shop Grid" />
      <ShopGridBody />
    </>
  );
};

export default page;
