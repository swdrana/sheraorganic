"use client";

import { useState, useEffect } from "react";
import { getStoreCustomizationSetting } from "../../../backend/controllers/storecustomize.controller";
// Adjust the import path according to your project structure

const useSetting = (page) => {
  // console.log("page", page);
  const [settingLoading, setSettingLoading] = useState(false);
  const [setting, setSetting] = useState({});
  useEffect(() => {
    setSettingLoading(true);
    const fetchData = async () => {
      const res = await getStoreCustomizationSetting();
      // console.log('res..in',res )

      setSetting(res?.storeCustomizationSetting?.setting);
      page === "faq" &&
        setSetting(res?.storeCustomizationSetting?.setting?.faq);
      setSettingLoading(false);
    };

    fetchData();
  }, []);

  return { setting, settingLoading };
};

export default useSetting;
