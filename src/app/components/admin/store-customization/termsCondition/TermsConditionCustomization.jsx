"use client";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { updateStoreCustomizationSetting } from "../../../../backend/controllers/storecustomize.controller";
import useSetting from "../../../store/dataFetching/useSetting";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const TermsConditionCustomization = () => {
  const { setting, settingLoading } = useSetting();
  useEffect(() => {
    if (setting?.terms?.value) {
      setTermsValue(setting.terms.value);
    }
  }, [setting]);
  console.log("setting in ", setting);
  const [termsValue, setTermsValue] = useState("");
  const handleSave = async () => {
    // console.log("termsValue", termsValue);
    const storeCustomizationSettingData = {
      name: "storeCustomizationSetting",
      setting: {
        terms: {
          value: termsValue,
        },
      },
    };
    const res = await updateStoreCustomizationSetting(
      storeCustomizationSettingData
    );

    console.log("res in terms condition", res);
    if (res?.message) {
      toast.success("Update successfully");
    }
  };

  // console.log("values........", termsValue);
  return (
    <>
      {" "}
      <div className="bg-white pt-2 pb-5 px-8 rounded-lg mt-8">
        <h3 className="my-7">
          {" "}
          <label htmlFor="description">Terms Condition</label>
        </h3>
        <ReactQuill
          value={termsValue}
          onChange={setTermsValue}
          style={{ height: "500px", overflowY: "auto" }}
          modules={{
            toolbar: [
              ["bold", "italic", "underline"], // Text styles
              [{ font: [] }], // Font selector
              [{ list: "ordered" }, { list: "bullet" }], // Lists
              [{ align: [] }], // Text alignment
              ["link", "image"], // Insert options
              ["clean"], // Clear formatting
            ],
          }}
          formats={[
            "bold",
            "italic",
            "underline",
            "font",
            "list",
            "bullet",
            "align",
            "link",
            "image",
          ]}
        />
        <button className="rounded-md bg-dark px-4 py-1 text-sm font-semibold text-white shadow-sm mt-5" onClick={handleSave}>
          Save
        </button>
      </div>
    </>
  );
};

export default TermsConditionCustomization;
