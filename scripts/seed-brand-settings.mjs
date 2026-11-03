#!/usr/bin/env node
import mongoose from "mongoose";
import { writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const emptyBrand = {
  site_name: "", meta_title: "", meta_description: "", og_image: "", login_welcome: "",
  whatsapp_number: "", messenger_username: "", messenger_greeting: "", email_brand_color: "",
  product_sidebar_banner_img: "", product_sidebar_banner_title: "", product_sidebar_banner_subtitle: "",
};
const emptyTracking = { enabled: false, gtm_id: "", ga4_id: "", fb_pixel_id: "", clarity_id: "", tiktok_pixel_id: "" };
export function brandPreset(store) {
  if (!["mehedi", "raihan"].includes(store)) throw new Error("Use --store=mehedi|raihan");
  return store === "mehedi" ? {
    brand: { ...emptyBrand, site_name: "Shera Organic", meta_title: "SheraOrganic Online Store",
      meta_description: "Welcome to SheraOrganic - Safe and Organic Food Store", login_welcome: "Shera Organic Shop.",
      whatsapp_number: "8801793143054", messenger_username: "sheraorganicshop",
      messenger_greeting: "Hello! I'm coming from your Website.", email_brand_color: "#3d8b40",
      decoration_theme: "grocery", product_sidebar_banner_show: true },
    tracking: { ...emptyTracking, enabled: true, gtm_id: "GTM-MMLFB63S" },
  } : {
    brand: { ...emptyBrand, site_name: "Nobomukh", decoration_theme: "tech", product_sidebar_banner_show: false },
    tracking: { ...emptyTracking },
  };
}
export function missingSettings(doc, preset) {
  const update = {};
  for (const group of ["brand", "tracking"]) {
    for (const [key, value] of Object.entries(preset[group])) {
      if (!Object.hasOwn(doc?.setting?.[group] || {}, key)) update[`setting.${group}.${key}`] = value;
    }
  }
  return update;
}
async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("MONGO_URI=<uri> node scripts/seed-brand-settings.mjs --store=mehedi|raihan [--apply --backup=<new-file.json>]\nDefault is dry run. Only missing keys are added.");
    return;
  }
  if (args.some((arg) => !/^(--store=(mehedi|raihan)|--apply|--backup=.+)$/.test(arg))) throw new Error("Unknown option; use --help");
  const preset = brandPreset(args.find((arg) => arg.startsWith("--store="))?.split("=")[1]);
  const apply = args.includes("--apply");
  const backup = args.find((arg) => arg.startsWith("--backup="))?.slice(9);
  if (apply && !backup) throw new Error("--apply requires --backup=<new-file.json>");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is required (no dotenv or production fallback)");
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000, maxPoolSize: 1 });
    const settings = mongoose.connection.collection("settings");
    const doc = await settings.findOne({ name: "storeCustomizationSetting" }, { sort: { createdAt: 1 } });
    const $set = missingSettings(doc, preset);
    console.log(apply ? "APPLY (missing keys only):" : "DRY RUN (no writes):");
    for (const [key, value] of Object.entries($set)) console.log(`${key} = ${String(value).slice(0, 20)}…`);
    if (!apply) return;
    // Exclusive creation prevents accidentally destroying an earlier backup. Finish backup BEFORE DB write.
    await writeFile(backup, JSON.stringify(doc, null, 2), { flag: "wx", mode: 0o600 });
    if (!Object.keys($set).length) return;
    if (doc) {
      // Guard each leaf against a concurrent admin edit between the read and update.
      for (const [key, value] of Object.entries($set)) {
        await settings.updateOne({ _id: doc._id, [key]: { $exists: false } }, { $set: { [key]: value } });
      }
    } else {
      await settings.updateOne({ name: "storeCustomizationSetting" }, { $setOnInsert: { name: "storeCustomizationSetting", setting: preset } }, { upsert: true });
    }
    console.log("Saved. Settings cache refreshes within 5 minutes; seed before deployment where possible.");
  } finally {
    await mongoose.disconnect();
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
