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
// Tracking fields: Bengali name + format/where-to-find hint. Order = TRACKING_PATTERNS order.
const TRACKING_FIELDS = {
  gtm_id: { label: "Google Tag Manager (GTM) ID", hint: "যেমন GTM-ABC1234। tagmanager.google.com → container-এর ওপরে লেখা ID।" },
  ga4_id: { label: "Google Analytics 4 (GA4) ID", hint: "যেমন G-ABC1234567। Analytics → Admin → Data streams → Measurement ID।" },
  fb_pixel_id: { label: "Facebook Pixel ID", hint: "১০–২০ অঙ্কের সংখ্যা। Meta Events Manager → Data sources → Pixel-এর ID।" },
  fb_domain_verification: { label: "Facebook domain verification code", hint: "Meta Business settings → Brand safety → Domains → Meta-tag পদ্ধতি। পুরো tag নয়, শুধু content=\"…\"-এর ভিতরের লেখাটা দিন (ছোট হাতের অক্ষর ও সংখ্যা)।" },
  clarity_id: { label: "Microsoft Clarity ID", hint: "৬–১২ অক্ষর (ছোট হাতের অক্ষর/সংখ্যা)। clarity.microsoft.com → Settings → Project ID।" },
  tiktok_pixel_id: { label: "TikTok Pixel ID", hint: "১৫–২৫ অক্ষর (বড় হাতের অক্ষর/সংখ্যা)। TikTok Ads Manager → Events → Pixel ID।" },
};
const fieldName = (path) => {
  const [group, key] = String(path).split(".");
  return (group === "tracking" ? TRACKING_FIELDS[key]?.label : LABELS[key]) || path;
};
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
          ? `সঠিক মান দিন: ${error.invalidFields.map(fieldName).join(", ")}`
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
          <div className="d-flex gap-3 mb-1 align-items-center">
            <span id="customer-login-label">ক্রেতাদের Login/Registration</span>
            <button type="button" role="switch" aria-checked={values.customer_login} aria-labelledby="customer-login-label"
              onClick={() => change("customer_login", !values.customer_login)}
              style={{ position: "relative", width: 52, height: 28, borderRadius: 999, border: 0, padding: 0, flexShrink: 0, cursor: "pointer", transition: "background .2s", background: values.customer_login ? "#16a34a" : "#9ca3af" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: 3, left: values.customer_login ? 27 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.3)", transition: "left .2s" }} />
            </button>
            <strong style={{ color: values.customer_login ? "#16a34a" : "#6b7280" }}>{values.customer_login ? "চালু" : "বন্ধ"}</strong>
          </div>
          <p className="text-muted small mb-4">বন্ধ করলে ক্রেতারা লগইন ছাড়াই সরাসরি অর্ডার করবে; মেনু ও ফুটারে লগইন/রেজিস্ট্রেশন দেখাবে না। অ্যাডমিন লগইন /login-এ আগের মতোই কাজ করবে।</p>
        </> : <>
          <label className="d-flex gap-2 mb-1 align-items-center"><input type="checkbox" role="switch" checked={values.enabled} onChange={(e) => change("enabled", e.target.checked)} />ট্র্যাকিং চালু</label>
          <p className="text-muted small mb-4">বন্ধ থাকলে কোনো ট্র্যাকিং script লোড হয় না। Facebook domain verification বন্ধ অবস্থাতেও কাজ করে। অ্যাডমিন পাতায় কখনো ট্র্যাকিং চলে না।</p>
          <p className="small mb-4 p-2 rounded" style={{ background: "#eff6ff", color: "#1e3a8a" }}>আপনার Facebook Pixel যদি GTM-এর ভিতরে বসানো থাকে, এখানে Pixel ID দেবেন না — একই event দুবার গুনবে। GTM ব্যবহার না করলে শুধু Pixel ID দিলেই চলবে।</p>
          {Object.entries(TRACKING_PATTERNS).map(([key, pattern]) => <div key={key} className="mb-4">
            <label className="d-block mb-1" htmlFor={`tracking-${key}`}>{TRACKING_FIELDS[key]?.label || key}</label>
            <input id={`tracking-${key}`} aria-describedby={`tracking-${key}-hint`} className="form-control dark:bg-gray-700 dark:text-gray-100" value={values[key]} pattern={pattern.source} autoComplete="off" spellCheck={false} onChange={(e) => change(key, e.target.value)} />
            <small id={`tracking-${key}-hint`} className="d-block text-muted mt-1">{TRACKING_FIELDS[key]?.hint}</small>
          </div>)}
          {values.gtm_id.trim() && values.fb_pixel_id.trim() && <p role="alert" className="small mb-4 p-2 rounded" style={{ background: "#fef9c3", color: "#854d0e" }}>
            সতর্কতা: GTM আর Facebook Pixel দুটোই দেওয়া আছে। GTM-এর ভিতরেও এই Pixel থাকলে প্রতিটি event দুবার যাবে — তখন এখানকার Pixel ID মুছে দিন।
          </p>}
          <p className="small">শুধু নির্ধারিত ID দিন; HTML বা JavaScript নয়। খালি করে সেভ করলে সেই ট্র্যাকিং বন্ধ হয়।</p>
        </>}
        <button type="submit" className="btn btn-primary">{saving ? "সেভ হচ্ছে…" : "সেভ করুন"}</button>
      </fieldset>
      <p role="status" className="mt-3">{message}</p>
    </form>
  );
}
