"use client";

import { getStoreCustomizationSetting } from "../../../backend/controllers/storecustomize.controller";
import { useSharedData } from "./sharedFetch";

const EMPTY = {}; // stable reference so effects keyed on `setting` don't re-run every render

// Settings are read by Navbar, NavbarTop, Offcanvas, Footer and several pages; they all share
// one request.
const useSetting = (page) => {
  const [res, settingLoading] = useSharedData("settings", getStoreCustomizationSetting, null);
  const all = res?.storeCustomizationSetting?.setting;
  const setting = res ? (page === "faq" ? all?.faq : all) : EMPTY;
  return { setting, settingLoading };
};

export default useSetting;
