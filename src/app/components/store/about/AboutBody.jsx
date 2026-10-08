"use client";
import AboutBrandSlider from "@/app/components/store/about/AboutBrandSlider";
import AboutTop from "@/app/components/store/about/AboutTop";
import AboutUs from "@/app/components/store/about/AboutUs";
import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import OurWorkingAbility from "@/app/components/store/common/others/OurWorkingAbility";
import useSetting from "../dataFetching/useSetting";
import usebrands from "../dataFetching/useBrand";
import PreLoader from "../common/others/PreLoader";

// `stats` are aggregate counts computed on the server (the page used to download every order
// and every customer record into the browser just to count them).
const AboutBody = ({ stats }) => {
  const { setting, settingLoading } = useSetting();
  const { brands } = usebrands();
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
          <OurWorkingAbility setting={setting?.about} stats={stats} />
          <AboutUs setting={setting?.about} />
        </>
      )}
    </>
  );
};

export default AboutBody;
