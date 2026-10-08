"use client";

import { getStoreCustomizationSetting } from "../../../backend/controllers/storecustomize.controller";
import { useSharedData } from "./sharedFetch";

// Settings are read by Navbar, NavbarTop, Offcanvas, Footer and several pages; they all share
// one request.
const useSetting = (page) => {
  const [res, settingLoading] = useSharedData("settings", getStoreCustomizationSetting, null);
  const all = res?.storeCustomizationSetting?.setting;
  const setting = res ? (page === "faq" ? all?.faq : all) : {};
  return { setting, settingLoading };
};

export default useSetting;
