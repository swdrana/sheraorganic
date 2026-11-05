"use client";

import React, { useEffect, useState } from "react";
import useSetting from "@/app/components/store/dataFetching/useSetting";
import { forgetShared } from "@/app/components/store/dataFetching/sharedFetch";
import { normalizeBrand, BRAND_TEXT_KEYS } from "@/app/utils/brand";
import { normalizeTracking, TRACKING_PATTERNS } from "@/app/utils/tracking";
import { toast } from "react-toastify";
import Uploader from "../imageUploader/Uploader";

const LABELS = {
  site_name: "সাইটের নাম", meta_title: "পেজের শিরোনাম (SEO)", meta_description: "সাইটের বর্ণনা (SEO)",
  og_image: "শেয়ার করার ছবি (OG)", login_welcome: "লগইনের স্বাগত বার্তা", whatsapp_number: "WhatsApp নম্বর (শুধু সংখ্যা)",
  messenger_username: "Messenger username", messenger_greeting: "Messenger স্বাগত বার্তা", email_brand_color: "ইমেইলের রং (#123456)",
  product_sidebar_banner_img: "পণ্যের পাশের ব্যানারের ছবি", product_sidebar_banner_title: "ব্যানারের শিরোনাম",
  product_sidebar_banner_subtitle: "ব্যানারের উপশিরোনাম",
};
const HINTS = { gtm_id: "GTM-ABC1234", ga4_id: "G-ABC1234567", fb_pixel_id: "10–20 digits", clarity_id: "6–12 lowercase letters/digits", tiktok_pixel_id: "15–25 uppercase letters/digits" };
export default function SiteSettings({ group }) {
  const { setting, settingLoading } = useSetting();
  const [values, setValues] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setValues(group === "brand" ? normalizeBrand(setting) : normalizeTracking(setting));
  }, [group, setting]);
  const change = (key, value) => setValues((prev) => ({ ...prev, [key]: value }));
  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/v1/store", {
        method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setting: { [group]: values } }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.invalidFields?.length
          ? `সঠিক মান দিন: ${error.invalidFields.join(", ")}`
          : error.message || "সেভ হয়নি। অনুমতি ও সংযোগ যাচাই করুন।");
      }
      forgetShared("settings");
      setMessage("সেভ হয়েছে।");
    } catch (error) {
      setMessage(error.message);
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }
  if (!values) return null;
  return (
    <form onSubmit={save} className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg p-3 p-md-4 mt-4" style={{ maxWidth: 850 }}>
      <h3 className="h5">{group === "brand" ? "Brand & Theme" : "Tracking"}</h3>
      <p className="text-muted">খালি রাখলে অন্য দোকানের নাম বা ট্র্যাকিং ব্যবহার হবে না।</p>
      <fieldset disabled={settingLoading || saving}>
        {group === "brand" ? <>
          {BRAND_TEXT_KEYS.map((key) => <div className="mb-4" key={key}>
            <label className="d-block mb-2" htmlFor={`brand-${key}`}>{LABELS[key]}</label>
            {key === "og_image" || key === "product_sidebar_banner_img" ? <>
              <Uploader imageUrl={values[key]} setImageUrl={(value) => change(key, value)} folder="site-settings" />
              <input id={`brand-${key}`} className="form-control dark:bg-gray-700 dark:text-gray-100 mt-2" value={values[key]} onChange={(e) => change(key, e.target.value)} placeholder="https://… অথবা /img/…" />
            </> : <input id={`brand-${key}`} className="form-control dark:bg-gray-700 dark:text-gray-100" value={values[key]} onChange={(e) => change(key, e.target.value)}
              pattern={key === "email_brand_color" ? "#[0-9a-fA-F]{6}" : key === "whatsapp_number" ? "[0-9]+" : key === "messenger_username" ? "[a-zA-Z0-9._\\-]+" : undefined} />}
          </div>)}
          <label className="d-block mb-4">সাজসজ্জার ধরন
            <select className="form-select dark:bg-gray-700 dark:text-gray-100 mt-2" value={values.decoration_theme} onChange={(e) => change("decoration_theme", e.target.value)}>
              <option value="grocery">Grocery</option><option value="tech">Tech</option><option value="none">None</option>
            </select>
          </label>
          <label className="d-flex gap-2 mb-4 align-items-center"><input type="checkbox" checked={values.product_sidebar_banner_show} onChange={(e) => change("product_sidebar_banner_show", e.target.checked)} />পণ্যের পাশের ব্যানার দেখান</label>
          <label className="d-flex gap-2 mb-1 align-items-center"><input type="checkbox" checked={values.customer_login} onChange={(e) => change("customer_login", e.target.checked)} />ক্রেতাদের Login/Registration দেখান</label>
          <p className="text-muted small mb-4">বন্ধ করলে ক্রেতারা লগইন ছাড়াই সরাসরি অর্ডার করবে; মেনু ও ফুটারে লগইন/রেজিস্ট্রেশন দেখাবে না। অ্যাডমিন লগইন /login-এ আগের মতোই কাজ করবে।</p>
        </> : <>
          <label className="d-flex gap-2 mb-4 align-items-center"><input type="checkbox" role="switch" checked={values.enabled} onChange={(e) => change("enabled", e.target.checked)} />ট্র্যাকিং চালু</label>
          {Object.entries(TRACKING_PATTERNS).map(([key, pattern]) => <label key={key} className="d-block mb-4">
            {key}<input className="form-control dark:bg-gray-700 dark:text-gray-100 mt-2" value={values[key]} pattern={pattern.source} onChange={(e) => change(key, e.target.value)} />
            <small>{HINTS[key]}</small>
          </label>)}
          <p>শুধু নির্ধারিত ID দিন; HTML বা JavaScript নয়। একই সেবা GTM-এ থাকলে এখানে আবার চালু করবেন না।</p>
        </>}
        <button type="submit" className="btn btn-primary">{saving ? "সেভ হচ্ছে…" : "সেভ করুন"}</button>
      </fieldset>
      <p role="status" className="mt-3">{message}</p>
    </form>
  );
}
