"use client";
import AboutBrandSlider from "@/app/components/store/about/AboutBrandSlider";
import AboutCta from "@/app/components/store/about/AboutCta";
import AboutFeedback from "@/app/components/store/about/AboutFeedback";
import AboutTeam from "@/app/components/store/about/AboutTeam";
import AboutTop from "@/app/components/store/about/AboutTop";
import AboutUs from "@/app/components/store/about/AboutUs";
import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import OurWorkingAbility from "@/app/components/store/common/others/OurWorkingAbility";
import useSetting from "../../components/store/dataFetching/useSetting";
import usebrands from "../../components/store/dataFetching/useBrand";
import useOrders from "../../components/admin/featch/useOrder";
import useProducts from "../../components/store/dataFetching/useProducts";
import useUsers from "../../components/store/dataFetching/useUsers";
import PreLoader from "../../components/store/common/others/PreLoader";

const page = () => {
  const { setting, settingLoading } = useSetting();
  const { brands, brandLoading } = usebrands();
  const { orders, ordersLoading } = useOrders();
  const { products, productsProduct } = useProducts();
  const { users } = useUsers();
  console.log("setting..", setting);
  return (
    <>
      {settingLoading ? (
        <PreLoader />
      ) : (
        <>
          {" "}
          <Breadcrumb title="About Us" />
          <AboutTop setting={setting?.about} />
          <AboutBrandSlider brands={brands} setting={setting?.about} />
          <OurWorkingAbility
            setting={setting?.about}
            orders={orders}
            products={products}
            users={users}
          />
          <AboutUs setting={setting?.about} />
        </>
      )}
    </>
  );
};

export default page;
