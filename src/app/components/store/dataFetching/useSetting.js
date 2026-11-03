"use client";

import { getStoreCustomizationSetting } from "../../../backend/controllers/storecustomize.controller";
import { createContext, useContext } from "react";
import { useSharedData } from "./sharedFetch";

export const SettingsContext = createContext(null);
const EMPTY = {}; // stable reference so effects keyed on `setting` don't re-run every render

// Settings are read by Navbar, NavbarTop, Offcanvas, Footer and several pages; they all share
// one request.
const useSetting = (page) => {
  const initial = useContext(SettingsContext);
  const [res, settingLoading] = useSharedData("settings", getStoreCustomizationSetting, null);
  const all = res?.storeCustomizationSetting?.setting ?? initial;
  const setting = all ? (page === "faq" ? all?.faq : all) : EMPTY;
  return { setting, settingLoading };
};

export default useSetting;
