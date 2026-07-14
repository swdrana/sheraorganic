import dynamic from 'next/dynamic';
import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";

// Dynamically import ShopGridBody without SSR to reduce initial bundle size
const ShopGridBody = dynamic(() => import("@/app/components/store/shopGrid/ShopGridBody"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const page = () => {
  return (
    <>
      <Breadcrumb title="Shop Layout" page="Shop Grid" />
      <ShopGridBody />
    </>
  );
};

export default page;
