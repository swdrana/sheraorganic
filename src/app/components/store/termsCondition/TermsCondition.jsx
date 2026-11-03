"use client";

import React from "react";
import PreLoader from "../common/others/PreLoader";
import useSetting from "../dataFetching/useSetting";
import TermsContent from "./TermsContent";

const TermsCondition = () => {
  const { setting, settingLoading } = useSetting();
  return settingLoading ? <PreLoader /> : (
    <section className="blog-details py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <TermsContent html={setting?.terms?.value} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsCondition;
