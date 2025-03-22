"use client";

import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import TermsCondition from "../../components/store/termsCondition/TermsCondition";

const page = () => {
  return (
    <>
      <Breadcrumb title="Terms Condition" />
      <TermsCondition />
    </>
  );
};

export default page;
